#!/usr/bin/env node
// Writes docs/TOOLS.md from the live server, so the page always says what the server says.
// Run: npm run tools-doc
import { writeFileSync } from "node:fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const ENDPOINT = process.env.WITHIN_MCP_URL || "https://shopwithin.co/mcp";
const client = new Client({ name: "within-mcp-docs", version: "1" });
await client.connect(new StreamableHTTPClientTransport(new URL(ENDPOINT)));
const { tools } = await client.listTools();
const { prompts } = await client.listPrompts();
const server = client.getServerVersion();
await client.close();

const cell = (text) => String(text ?? "").replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ").trim();
const typeOf = (schema) => {
  if (!schema) return "";
  if (schema.enum) return schema.enum.map((v) => `\`${v}\``).join(", ");
  if (schema.type === "array") return `list of ${typeOf(schema.items) || "values"}`;
  if (schema.anyOf) return [...new Set(schema.anyOf.map(typeOf).filter(Boolean))].join(" or ");
  return Array.isArray(schema.type) ? schema.type.join(" or ") : (schema.type ?? "");
};

const day = new Date().toISOString().slice(0, 10);
const out = [
  "# The tools, in full",
  "",
  `Read from \`${ENDPOINT}\` on ${day}: ${server?.title ?? server?.name} ${server?.version}, ${tools.length} tools and ${prompts.length} starter prompts. Every tool only reads. This page is written by \`npm run tools-doc\`, so it says what the server says.`,
  "",
  "## Contents",
  "",
  ...tools.map((t) => `- [\`${t.name}\`](#${t.name}): ${t.title ?? ""}`),
  "",
];
for (const t of tools) {
  out.push(`## ${t.name}`, "", `**${t.title ?? t.name}**`, "", t.description.trim(), "");
  const props = Object.entries(t.inputSchema?.properties ?? {});
  if (props.length) {
    const required = new Set(t.inputSchema?.required ?? []);
    out.push("| Input | Type | Needed | What it is |", "| --- | --- | --- | --- |");
    for (const [name, schema] of props) out.push(`| \`${name}\` | ${cell(typeOf(schema))} | ${required.has(name) ? "yes" : "no"} | ${cell(schema.description)} |`);
    out.push("");
  } else {
    out.push("It takes no input.", "");
  }
}
out.push("## Starter prompts", "", "| Prompt | What it starts |", "| --- | --- |");
for (const p of prompts) out.push(`| \`${p.name}\` | ${cell(p.description ?? p.title)} |`);
out.push("");

writeFileSync(new URL("../docs/TOOLS.md", import.meta.url), out.join("\n"));
console.log(`docs/TOOLS.md: ${tools.length} tools, ${prompts.length} prompts, read ${day}`);
