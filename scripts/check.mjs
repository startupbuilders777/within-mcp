#!/usr/bin/env node
// An end to end check of the bridge, against the live hosted server. Run: npm run check
//
// It starts bin/within-mcp.mjs the way an app would (a local command over stdio), then:
//  1. lists the tools through the bridge and straight from the hosted server, and compares them;
//  2. lists the starter prompts;
//  3. calls two tools through the bridge (a size conversion and a stock search) and prints the answers.
// It exits 1 if anything differs or fails.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const ENDPOINT = process.env.WITHIN_MCP_URL || "https://shopwithin.co/mcp";
let failed = 0;
const check = (ok, what, detail = "") => {
  console.log(`${ok ? "ok  " : "FAIL"} ${what}${detail ? `  ${detail}` : ""}`);
  if (!ok) failed += 1;
};

const bridge = new Client({ name: "within-mcp-check", version: "1" });
await bridge.connect(
  new StdioClientTransport({ command: process.execPath, args: [new URL("../bin/within-mcp.mjs", import.meta.url).pathname], stderr: "inherit" }),
);
const direct = new Client({ name: "within-mcp-check", version: "1" });
await direct.connect(new StreamableHTTPClientTransport(new URL(ENDPOINT)));

const info = bridge.getServerVersion();
check(info?.name === direct.getServerVersion()?.name && info?.version === direct.getServerVersion()?.version, "the bridge gives the hosted server's name and version", `${info?.name} ${info?.version}`);
check(Boolean(bridge.getInstructions()), "the bridge passes on the server's instructions");

const viaBridge = (await bridge.listTools()).tools;
const viaWeb = (await direct.listTools()).tools;
check(viaBridge.length > 0 && viaBridge.length === viaWeb.length, "the same number of tools both ways", String(viaBridge.length));
check(JSON.stringify(viaBridge) === JSON.stringify(viaWeb), "every tool is the same both ways (name, title, description, input and output shape)");

const prompts = (await bridge.listPrompts()).prompts;
check(prompts.length > 0, "the starter prompts come through", String(prompts.length));

const size = await bridge.callTool({ name: "convert_size", arguments: { kind: "shoes", from: "UK", size: "8", department: "men" } });
check(!size.isError && Boolean(size.content?.[0]?.text), "convert_size answers through the bridge");
console.log(`     ${String(size.content?.[0]?.text).split("\n")[0].slice(0, 200)}`);

const search = await bridge.callTool({ name: "search_pieces", arguments: { query: "black leather jacket", limit: 2 } });
check(!search.isError && Boolean(search.structuredContent), "search_pieces answers through the bridge, with structured data");
console.log(`     ${String(search.content?.[0]?.text).split("\n")[0].slice(0, 200)}`);

await bridge.close();
await direct.close();
console.log(failed ? `\n${failed} check(s) failed` : `\nall checks passed against ${ENDPOINT}`);
process.exit(failed ? 1 : 0);
