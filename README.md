# within MCP server: shop independent luxury boutiques

within is a marketplace of independent luxury boutiques. Its MCP server gives an assistant, an agent or your own code 26 read only tools for shopping them.

Each answer is what a real shop has in stock right now: designer clothes, shoes, sneakers, bags, jewellery and watches, new and pre-owned. It comes with the sizes left, the price in the shop's own currency and the page to buy.

| | |
| --- | --- |
| **Address** | `https://shopwithin.co/mcp` (remote, Streamable HTTP) |
| **Cost** | Free. No account, no key, no login |
| **What it does** | Reads only. 26 tools and 6 starter prompts. Nothing is bought, held or charged through the tools |
| **Registry name** | `co.shopwithin/within` in the official MCP registry |
| **Docs** | https://shopwithin.co/agents |
| **Every tool in full** | [docs/TOOLS.md](docs/TOOLS.md) |

## Contents

- [Connect](#connect)
- [What you can ask](#what-you-can-ask)
- [The 26 tools](#the-26-tools)
- [What an answer looks like](#what-an-answer-looks-like)
- [What is in it today](#what-is-in-it-today)
- [How a shopper buys](#how-a-shopper-buys)
- [Limits and privacy](#limits-and-privacy)
- [The same tools over plain HTTPS](#the-same-tools-over-plain-https)
- [Common questions](#common-questions)
- [What is in this repo](#what-is-in-this-repo)
- [Where it is listed](#where-it-is-listed)

## Connect

### With the address (remote)

Most apps take a remote MCP server by its address. Open the app's settings, add a custom connector or a remote MCP server, and paste:

```
https://shopwithin.co/mcp
```

Name it `within` if the app asks, and choose no login.

Apps and code editors with an MCP settings file read this shape:

```json
{
  "mcpServers": {
    "within": { "url": "https://shopwithin.co/mcp" }
  }
}
```

Some also want `"type": "http"` beside the url. The server answers the same way.

Most command line agents take one line of this shape:

```bash
<your-agent> mcp add --transport http within https://shopwithin.co/mcp
```

### As a local command (stdio)

Some apps only start an MCP server as a local command. This repo is a small bridge for them.

The bridge runs on your computer and passes each request to the hosted server. It needs Node 18 or newer, and nothing else.

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

You get the same 26 tools either way. The bridge holds no data and needs no key.

### From your own code

Any MCP client library connects to the address. You can also send JSON-RPC yourself. To list the tools:

```bash
curl -s https://shopwithin.co/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

To call one:

```bash
curl -s https://shopwithin.co/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_pieces","arguments":{"query":"black leather loafers","sizes":["42"],"price_max":600}}}'
```

More examples are in [examples/](examples/).

## What you can ask

Ask in plain words. These all return real answers today.

| Someone asks | The tool that answers |
| --- | --- |
| "Jordan 4s in a size 10 under 500 dollars in Toronto" | `search_pieces` |
| "Where can I buy Chrome Hearts?" | `where_to_buy` |
| "How much is a Chrome Hearts hoodie right now?" | `price_check` |
| "What just came in from Rick Owens?" | `new_arrivals` |
| "What does Canada Goose have on sale?" | `on_sale` |
| "What is trending this week?" | `trending_now` |
| "Find something like the bag in this photo" | `visual_search` |
| "Does this run small? I usually wear a medium" | `piece_fit` |
| "What would this cost delivered to the US, with duty and tax?" | `delivered_price` |
| "I wear a UK 8 shoe. What is that in EU and US sizes?" | `convert_size` |
| "What duty will I pay on a 1,295 dollar coat shipped to the US?" | `estimate_duty` |
| "Which vintage shops are in Paris?" | `boutique_directory` |
| "Tell me about Rick Owens: who owns it, where it is made, who stocks it" | `designer_guide` |
| "Gift ideas for him under 200 dollars" | `gift_ideas` |
| "What can I pick up in a shop in Toronto today?" | `pickup_today` |
| "What do I wear with these boots?" | `wear_with` |

## The 26 tools

Every tool only reads. The names say `pieces` where the answers say items; they are the same thing. Inputs and full descriptions are in [docs/TOOLS.md](docs/TOOLS.md).

**Finding things in stock**

| Tool | What it returns |
| --- | --- |
| `search_pieces` | Items in stock now, from a plain sentence or by designer, category, size, boutique, city and price |
| `new_arrivals` | The newest items to arrive, newest first |
| `on_sale` | Items marked down now, with the old price, the new price and how much is off |
| `trending_now` | within's chart of the designer items trending this week, with the reason for each |
| `visual_search` | Items that look like a photo, a screenshot or a social post |
| `similar_pieces` | Items like one item, at every boutique |
| `pickup_today` | Items a shopper can buy online and pick up in the shop |

**One item**

| Tool | What it returns |
| --- | --- |
| `get_piece` | One item in full: every size with live stock, photographs, the price and the page to buy |
| `piece_fit` | How an item fits: its measurements, the designer's chart, whether it runs small or large |
| `wear_with` | What goes with one item, from stock |
| `delivered_price` | What one item costs delivered to a country, with delivery, duty and tax |
| `compare_pieces` | Two to four items side by side |

**Designers**

| Tool | What it returns |
| --- | --- |
| `designer_guide` | A designer's facts with sources, what is in stock, the price range and who stocks it |
| `where_to_buy` | Where to buy a designer, a named item or a style code, in stock and by city |
| `price_check` | What a designer's item costs right now: lowest, middle and highest price |
| `brands_like` | Designers like a given one, counted from what the same boutiques stock |

**Boutiques**

| Tool | What it returns |
| --- | --- |
| `list_boutiques` | The boutiques that sell on within, with city, hours and how much each has in stock |
| `boutique_shelf` | One boutique's stock, newest first, or a search inside that shop |
| `boutique_directory` | Independent boutiques in a city, from a directory of about 8,700 shops in more than 140 cities |
| `boutique_details` | One boutique's address, hours, website and the designers it lists |
| `delivery_and_returns` | A boutique's delivery prices, pickup and return terms |

**Sizes and customs**

| Tool | What it returns |
| --- | --- |
| `convert_size` | A ring, shoe, clothing, suit, belt or hat size in every other system, from named charts |
| `estimate_duty` | The duty, tax and fees on an order shipped to the US, Canada, the UK or Australia |

**Ideas**

| Tool | What it returns |
| --- | --- |
| `gift_ideas` | Gift ideas in stock, for her, for him or for anyone, under a budget |
| `outfit_ideas` | Whole outfits within has put together, for a question or an occasion |
| `find_notes` | within's own guides: how a designer's sizes run, where to shop in a city, how to tell real from fake |

The server also has six starter prompts: find it in my size, where to buy, gift ideas, boutiques in a city, what is my size, and price at my door.

## What an answer looks like

Every answer comes twice: a short text a person could read whole, and structured data with the same facts in fields. This is the text for "Jordan 4s in a size 10 under 500 dollars in Toronto", asked on 10 November 2026 and shortened here (since 11 November the first line says "items"):

```
3 items in Toronto, on the shelves right now:
1. Air Jordan 4 Retro OG "White Cement 2025", CAD 450, sizes in stock: US M 8 / W 9.5 · EU 41,
   ... US M 10 / W 11.5 · EU 44, ... US M 13 / W 14.5 · EU 47.5, at Outlined (Etobicoke).
   https://shopwithin.co/product/outlined/air-jordan-4-retro-og-white-cement-2025/8206119796936
```

What to count on in every answer:

- Each item names the shop that has it, the sizes in stock and the price in the shop's own currency. Prices are never converted without saying so.
- Each item, shop, designer and guide carries its page on shopwithin.co.
- Nothing is invented. A size, a price, an hour or an address is in the answer only if within holds it.
- When nothing matches, the answer says so plainly and says what would match.

## What is in it today

As of 10 November 2026:

- Five boutiques in and around Toronto sell on within: Utopia, Due West, WDLT117, parlor23 and Outlined. Between them they have about 8,300 items in stock.
- The boutique directory lists about 8,700 independent shops in more than 140 cities. It is for finding a shop, with its address, its hours and the designers it lists. Most of these shops do not sell through within yet.
- The size charts cover rings, shoes, clothing, suits, belts and hats, and many designers' own charts.
- The duty estimate covers orders shipped to the US, Canada, the UK and Australia.

Ask `list_boutiques` for the live list. More boutiques are joining, and the numbers above will age.

## How a shopper buys

1. The assistant or agent searches and shows the items, each with its page on shopwithin.co.
2. The shopper opens the page. Stock is read fresh when the page opens.
3. The shopper buys there, through the boutique's own checkout, and picks up in the shop or has it delivered.

No tool adds to a bag, holds an item, takes a payment or places an order. This is the finding half of shopping through an agent. The paying stays between the shopper and the boutique.

## Limits and privacy

- The rate limit is a burst of 60 requests from one address, then one a second.
- The server never asks for a name, an email or a login. It cannot see anyone's saved items, bag or orders.
- `visual_search` matches a photo in memory and drops it. Nothing is saved.
- We count each call to the tools: which tool, when, how long it took, whether it worked, how many results, which app called and the country of the computer that called. We never keep what was asked, a photo or an IP address.
- The privacy policy is at https://shopwithin.co/privacy and the terms are at https://shopwithin.co/terms.

## The same tools over plain HTTPS

If your platform takes an API and not an MCP server, the same tools answer at `https://shopwithin.co/api/v1`. The OpenAPI document is at https://shopwithin.co/openapi.json.

```bash
curl -s "https://shopwithin.co/api/v1/pieces?query=black+leather+loafers&price_max=600&limit=3"
```

The server card is at https://shopwithin.co/mcp/server-card.

## Common questions

### Is the within MCP server free?

Yes. There is no account, no key and no charge. The only limit is the rate: a burst of 60 requests from one address, then one a second.

### What is a remote MCP server?

It is an MCP server you reach at a web address, not one you install. You give your assistant or app the address, `https://shopwithin.co/mcp`, and it can call the tools. Nothing has to run on your own computer.

### Can an agent buy an item for me?

No. The tools only read. Every answer carries the item's page on shopwithin.co, and you buy there, through the boutique's own checkout.

### How fresh are the sizes and prices?

Each item carries `stock_checked_at`, the time within last read the boutique's own stock. Stock moves by the hour, so the product page, read fresh when you open it, is the final word.

### Which shops and cities does it cover?

Items you can buy come from the boutiques that sell on within, which today are in and around Toronto. The directory of independent shops covers more than 140 cities.

### What can I shop for?

Designer clothes, shoes, sneakers, bags, jewellery, watches and home objects, new and pre-owned, from independent boutiques. It does not cover department stores or mass market shops.

### Does it keep the photos I send?

No. `visual_search` matches the photo in memory and drops it.

### Do I need to sign in or share my details?

No.

### Is the server's code in this repo?

No. This repo holds the docs, the local bridge, the registry file and the plugin. The server itself runs at shopwithin.co, and its code is not published.

## What is in this repo

| Path | What it is |
| --- | --- |
| `bin/within-mcp.mjs` | The local bridge: MCP over stdio on your computer, passed to the hosted server |
| `docs/TOOLS.md` | Every tool with its full description and inputs, written from the live server |
| `examples/` | Settings files and curl calls to copy |
| `server.json` | The file published to the official MCP registry |
| `plugins/within/` | The within plugin: the server's address and one skill on how to shop the boutiques well |
| `.mcp.json`, `skills/` | The same server address and skill at the root, for plugin directories that read a repo's root |
| `scripts/check.mjs` | An end to end check of the bridge against the live server: `npm run check` |
| `scripts/build-tools-doc.mjs` | Rewrites `docs/TOOLS.md` from the live server: `npm run tools-doc` |

## Where it is listed

It is in the official MCP registry as `co.shopwithin/within`, and on these lists:

[![within MCP server](https://glama.ai/mcp/servers/startupbuilders777/within-mcp/badges/score.svg)](https://glama.ai/mcp/servers/startupbuilders777/within-mcp)
[![Listed on clauderules.net](https://clauderules.net/api/badge/within-hku1)](https://clauderules.net/mcp/within-hku1)

## Contact

Questions, a problem with an answer, or a boutique that wants to be listed: hello@shopwithin.co or https://shopwithin.co/contact.

## Licence

MIT, for everything in this repo. See [LICENSE](LICENSE).
