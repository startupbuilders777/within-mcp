# Calls to copy

The server answers JSON-RPC over HTTPS at `https://shopwithin.co/mcp`. Each call below is whole: paste it in a terminal.

## List the tools

```bash
curl -s https://shopwithin.co/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Search what is in stock

```bash
curl -s https://shopwithin.co/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_pieces","arguments":{"query":"Jordan 4","sizes":["10"],"city":"Toronto","price_max":500,"limit":3}}}'
```

## Where to buy a designer

```bash
curl -s https://shopwithin.co/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"where_to_buy","arguments":{"query":"Chrome Hearts"}}}'
```

## Convert a size

```bash
curl -s https://shopwithin.co/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"convert_size","arguments":{"kind":"shoes","from":"UK","size":"8","department":"men"}}}'
```

## Boutiques in a city

```bash
curl -s https://shopwithin.co/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"boutique_directory","arguments":{"city":"Paris","kind":"vintage","limit":5}}}'
```

## The same over plain HTTPS

```bash
curl -s "https://shopwithin.co/api/v1/pieces?query=black+leather+loafers&price_max=600&limit=3"
curl -s "https://shopwithin.co/api/v1/sizes/convert?kind=shoes&from=UK&size=8&department=men"
curl -s "https://shopwithin.co/api/v1/where-to-buy?query=Chrome+Hearts"
```

The full list of paths is in https://shopwithin.co/openapi.json.
