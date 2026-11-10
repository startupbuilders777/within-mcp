#!/usr/bin/env node
// within-mcp: a small local bridge to within's hosted MCP server.
//
// Some apps only start an MCP server as a local command (stdio) and cannot take a web
// address. This runs on your computer, speaks MCP over stdio, and passes every request to
// https://shopwithin.co/mcp. It holds no data and needs no key.
//
// Ways this could go wrong, written before the code:
//  - Anything printed to stdout that is not MCP breaks the app: every log line goes to stderr.
//  - The hosted server cannot be reached when the app starts: say why on stderr and exit 1,
//    so the app shows a clear error and not a server with no tools.
//  - The hosted server gains or drops a feature: the bridge offers only what the hosted
//    server says it has, read at start.
//  - The hosted server adds a tool later: nothing is cached, every list goes to the server.
//  - A slow answer (a photo search): each request gets 120 seconds, not the library's 60.
import { readFileSync } from "node:fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  CallToolResultSchema,
  GetPromptRequestSchema,
  GetPromptResultSchema,
  ListPromptsRequestSchema,
  ListPromptsResultSchema,
  ListResourcesRequestSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesRequestSchema,
  ListResourceTemplatesResultSchema,
  ListToolsRequestSchema,
  ListToolsResultSchema,
  ReadResourceRequestSchema,
  ReadResourceResultSchema,
} from "@modelcontextprotocol/sdk/types.js";

const ENDPOINT = process.env.WITHIN_MCP_URL || "https://shopwithin.co/mcp";
const VERSION = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).version;
const WAIT = { timeout: 120_000 };
const log = (...words) => console.error("[within-mcp]", ...words);

if (process.argv.includes("--version")) {
  console.log(VERSION);
  process.exit(0);
}
if (process.argv.includes("--help")) {
  console.log(
    [
      "within-mcp: a local bridge to within's hosted MCP server.",
      "",
      "Start it from an MCP app's settings as a local command:",
      '  { "mcpServers": { "within": { "command": "npx", "args": ["-y", "github:startupbuilders777/within-mcp"] } } }',
      "",
      "If your app takes a web address, skip the bridge and give it https://shopwithin.co/mcp",
      "",
      "WITHIN_MCP_URL  another address to pass requests to (default https://shopwithin.co/mcp)",
      "Docs: https://shopwithin.co/agents",
    ].join("\n"),
  );
  process.exit(0);
}

const hosted = new Client({ name: "within-mcp-bridge", version: VERSION });
try {
  await hosted.connect(new StreamableHTTPClientTransport(new URL(ENDPOINT)));
} catch (error) {
  log(`could not reach ${ENDPOINT}: ${error?.message || error}`);
  process.exit(1);
}

const has = hosted.getServerCapabilities() || {};
const capabilities = {};
if (has.tools) capabilities.tools = {};
if (has.prompts) capabilities.prompts = {};
if (has.resources) capabilities.resources = {};

const local = new Server(hosted.getServerVersion() || { name: "within", version: VERSION }, {
  capabilities,
  instructions: hosted.getInstructions(),
});

/** Pass one kind of request straight through to the hosted server. */
const pass = (requestSchema, method, resultSchema) =>
  local.setRequestHandler(requestSchema, (request) => hosted.request({ method, params: request.params }, resultSchema, WAIT));

if (has.tools) {
  pass(ListToolsRequestSchema, "tools/list", ListToolsResultSchema);
  pass(CallToolRequestSchema, "tools/call", CallToolResultSchema);
}
if (has.prompts) {
  pass(ListPromptsRequestSchema, "prompts/list", ListPromptsResultSchema);
  pass(GetPromptRequestSchema, "prompts/get", GetPromptResultSchema);
}
if (has.resources) {
  pass(ListResourcesRequestSchema, "resources/list", ListResourcesResultSchema);
  pass(ListResourceTemplatesRequestSchema, "resources/templates/list", ListResourceTemplatesResultSchema);
  pass(ReadResourceRequestSchema, "resources/read", ReadResourceResultSchema);
}

local.onclose = () => {
  hosted.close().finally(() => process.exit(0));
};
await local.connect(new StdioServerTransport());
log(`ready: passing requests to ${ENDPOINT}`);
