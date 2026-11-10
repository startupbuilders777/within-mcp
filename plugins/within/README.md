# The within plugin

Shop independent luxury boutiques from an agent. The plugin carries two things:

- the address of within's MCP server, `https://shopwithin.co/mcp` (remote, read only, free, no key), with its 26 tools;
- one skill, `skills/shop-the-boutiques`, that shows an agent how to shop the boutiques well: what to ask the shopper first, which tool to call, and how to show the items.

Every result carries the shopwithin.co page where the shopper buys, through the boutique's own checkout. Nothing is held or charged through the tools.

## The files

The folder carries the manifests for two plugin formats, so one folder works in both kinds of plugin directory.

| File | What it is |
| --- | --- |
| `.claude-plugin/plugin.json`, `.mcp.json` | The manifest and the server address in the first format |
| `plugin.json`, `mcp.json` | The manifest (Agent Plugins 1.0.0) and the server address in the second format |
| `skills/shop-the-boutiques/SKILL.md` | The skill, shared by both |
| `assets/` | The icon and the logo |

The repo's root holds `.claude-plugin/marketplace.json`, so the repo can be added as a plugin source and the plugin installed from it.

In an app that installs plugins from a GitHub repo, one line does it:

```
/plugin install within --marketplace startupbuilders777/within-mcp
```

Docs: https://shopwithin.co/agents. Every tool in full: [docs/TOOLS.md](../../docs/TOOLS.md).
