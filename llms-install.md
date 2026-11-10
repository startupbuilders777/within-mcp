# How to install the within MCP server

within's MCP server is hosted. There is nothing to build and no key to set.

## If the app takes a web address

Add a remote MCP server named `within` at:

```
https://shopwithin.co/mcp
```

Transport: Streamable HTTP. Sign-in: none.

```json
{
  "mcpServers": {
    "within": { "url": "https://shopwithin.co/mcp" }
  }
}
```

## If the app only starts a local command

Use the bridge in this repo. It needs Node 18 or newer. There are no environment variables to set.

```json
{
  "mcpServers": {
    "within": {
      "command": "npx",
      "args": ["-y", "github:startupbuilders777/within-mcp"]
    }
  }
}
```

## Check it works

Ask for the tool list. There should be 26 tools, the first of them `search_pieces`.

Then call `list_boutiques` with no input. It answers with the boutiques that sell on within.
