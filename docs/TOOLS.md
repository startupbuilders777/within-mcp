# The tools, in full

Read from `https://shopwithin.co/mcp` on 2026-11-10: within · luxury boutiques 0.3.0, 26 tools and 6 starter prompts. Every tool only reads. This page is written by `npm run tools-doc`, so it says what the server says.

## Contents

- [`search_pieces`](#search_pieces): Search clothes, shoes and bags in stock
- [`get_piece`](#get_piece): One item in full
- [`piece_fit`](#piece_fit): How an item fits
- [`find_notes`](#find_notes): Guides and answers from within
- [`trending_now`](#trending_now): What is trending this week
- [`similar_pieces`](#similar_pieces): Similar items at other boutiques
- [`list_boutiques`](#list_boutiques): Boutiques that sell on within
- [`boutique_shelf`](#boutique_shelf): One boutique's stock
- [`visual_search`](#visual_search): Find it from a photo
- [`convert_size`](#convert_size): Convert a size
- [`estimate_duty`](#estimate_duty): Estimate import duty and tax
- [`new_arrivals`](#new_arrivals): Just in: new arrivals
- [`on_sale`](#on_sale): On sale now
- [`gift_ideas`](#gift_ideas): Gift ideas
- [`outfit_ideas`](#outfit_ideas): Outfit ideas
- [`wear_with`](#wear_with): What to wear with it
- [`boutique_directory`](#boutique_directory): Find boutiques in a city
- [`boutique_details`](#boutique_details): One boutique: address, hours, designers
- [`delivery_and_returns`](#delivery_and_returns): Delivery, pickup and returns at a boutique
- [`delivered_price`](#delivered_price): What an item costs delivered
- [`pickup_today`](#pickup_today): Pick up in a shop
- [`designer_guide`](#designer_guide): Designer guide: facts, stock and stockists
- [`where_to_buy`](#where_to_buy): Where to buy it
- [`price_check`](#price_check): Price check: what it costs right now
- [`brands_like`](#brands_like): Similar brands: designers like this one
- [`compare_pieces`](#compare_pieces): Compare items side by side

## search_pieces

**Search clothes, shoes and bags in stock**

Search what is in stock right now at independent luxury boutiques: clothes, shoes, bags, jewellery, watches and home objects, new and pre-owned. Each result has the price in the boutique's currency, the sizes in stock, the shop that has it and the shopwithin.co page to buy it. Use this when someone wants to find or shop for an item, a designer's items, something in their size or under a price, or what is in stock in a city. A plain sentence works as the query (prices like 'under $400' and 'cheapest' are understood); designers, categories, sizes, women's or men's, boutiques, city and price narrow it. With no arguments it returns the front of the shop; lens browses new arrivals, most saved, or marked down. It reads only the boutiques on within, not mass market stores, and gives no style advice.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `query` | string | no | What the shopper wants, in plain words: 'black leather loafers', 'Lemaire', 'a birthday gift for my dad under $300'. |
| `brands` | list of string | no | Designer or house names to restrict to, exactly as they appear in results. |
| `categories` | list of string | no | Product types to restrict to, e.g. 'Sneakers', 'Bags'; take values from a previous result's facets. |
| `sizes` | list of string | no | Sizes that must be in stock, as labelled on the shelf: 'M', '42', 'US 9', 'IT 38'. |
| `boutiques` | list of string | no | Boutique domains to restrict to, as shown on boutiques and pieces (e.g. 'wdlt117.myshopify.com'). |
| `city` | string | no | The city the boutiques are in, e.g. 'Toronto': a place to shop, not the shopper's own location. If within has no boutiques there yet, the answer says so and names the cities that have them. |
| `department` | `women`, `men` | no | Only women's or only men's. |
| `price_min` | number | no | Lowest price to include, in the boutique's currency. |
| `price_max` | number | no | Highest price to include, in the boutique's currency. |
| `sort` | `relevance`, `newest`, `price_low_to_high`, `price_high_to_low` | no |  |
| `lens` | `new`, `trending`, `sale` | no | Browse a shelf instead of searching: 'new' = just arrived, 'trending' = what people are saving, 'sale' = marked down. Ignored when a query or filters are given. |
| `limit` | integer | no | Pieces per page, default 12. |
| `offset` | integer | no | Pieces to skip; use next_offset from the previous page. |

## get_piece

**One item in full**

One item in full: its description, every size with live stock, photographs, the price and any markdown, whether it can be picked up in the shop or delivered, the boutique, the page to buy it, and a few similar items. Use this when someone asks about one item from a result, pastes a shopwithin.co link, or wants to know whether a size is in stock before buying. Name the item by url, or by boutique_domain and id from a result. The url is a shopwithin.co product page link; the tool reads within's own catalog, documented at https://shopwithin.co/agents.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `url` | string | no | A shopwithin.co piece link, e.g. https://shopwithin.co/product/<boutique>/<id>. |
| `boutique_domain` | string | no | The piece's boutique_domain from a previous result. |
| `id` | string | no | The piece's id from a previous result. |

## piece_fit

**How an item fits**

How one item fits: its own measurements (the boutique's, or the designer's chart for this style), the designer's body chart, fit notes and whether it runs small or large, the model's size and height, and a line for each size in stock. Use this when someone asks what size to take, whether an item runs big or small, or whether to size up or down. Name the item by url, or by boutique_domain and id from a result; give the size the person usually wears, in any system, so the answer points at the rows that matter. The url is a shopwithin.co product page link; the tool reads within's own catalog, documented at https://shopwithin.co/agents.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `url` | string | no | A shopwithin.co piece link, e.g. https://shopwithin.co/product/<boutique>/<id>. |
| `boutique_domain` | string | no | The piece's boutique_domain from a previous result. |
| `id` | string | no | The piece's id from a previous result. |
| `usual_size` | string | no | The size the person usually wears, as they say it: 'M', 'IT 48', 'US 9', '32 waist'. |

## find_notes

**Guides and answers from within**

within's own guides for a question: journal notes (how a designer's sizes run, where to shop in a city, what to wear to an occasion, how to tell real from fake) and edits (items picked around one idea). Give the question in plain words; up to five come back, each with its title, one line and its shopwithin.co link. Use this when someone asks a how, which or is-it-worth-it question about designer fashion.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `query` | string | yes | The question in plain words: 'how do Margiela tabis run', 'Ossington shops', 'winter wedding coat'. |
| `limit` | integer | no |  |

## trending_now

**What is trending this week**

within's chart of the designer items trending at independent boutiques this week, updated daily: the ten leading items in order, each with its reason (Google searches, Pinterest searches, what boutiques worldwide are stocking, what people look at on within), its place last week and its weeks on the list, plus the designers of the week. Use this when someone asks what is trending in designer or luxury fashion right now, which designers, sneakers or bags are popular this week, or what is trending in one kind of item (sneakers, bags, jackets, boots, jewelry). dept narrows to women or men; kind to one kind of item. Each item has a url to buy it. It covers this week, not past years, and not mass market stores.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `dept` | `women`, `men` | no | The women's or the men's chart; leave out for everyone's. |
| `kind` | `sneakers`, `boots`, `loafers`, `sandals`, `heels`, `jackets`, `hoodies`, `knitwear`, `t-shirts`, `shirts`, `pants`, `jeans`, `shorts`, `dresses`, `skirts`, `suits`, `activewear`, `bags`, `jewelry`, `watches`, `eyewear`, `hats`, `scarves`, `wallets`, `belts` | no | One kind of piece, e.g. 'sneakers', 'bags', 'jackets', 'boots', 'jewelry', 'dresses'. |
| `limit` | integer | no | How many places to return, up to ten, default 10. |

## similar_pieces

**Similar items at other boutiques**

Items like one item: the same look, the same department, across every boutique, in stock now. Use this when someone likes an item but wants alternatives, a lower price, another size, or another shop. Name the item by url, or by boutique_domain and id. The url is a shopwithin.co product page link; the tool reads within's own catalog, documented at https://shopwithin.co/agents.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `url` | string | no | A shopwithin.co piece link. |
| `boutique_domain` | string | no |  |
| `id` | string | no |  |
| `limit` | integer | no | Default 8. |

## list_boutiques

**Boutiques that sell on within**

The independent luxury boutiques whose stock within sells, with neighbourhood, city, how many items each has live, opening hours, and whether a shopper can pick up in the shop or have items delivered. Use this when someone asks which shops sell on within, or which of them are in a city. The returned domain identifies a boutique in the other tools.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `city` | string | no | The city the boutiques are in, e.g. 'Toronto': a place to shop, not the shopper's own location. |

## boutique_shelf

**One boutique's stock**

One boutique's stock right now, newest first, with sizes and prices; a query searches inside that shop only. Use this when someone names a boutique ('what does WDLT117 have', 'show me Utopia's sneakers') or wants to browse one shop. boutique_domain is the domain shown on any boutique or item.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `boutique_domain` | string | yes | The boutique's domain, as shown on boutiques and pieces (e.g. 'utopia-kicks.myshopify.com'). |
| `query` | string | no | Search inside this boutique only. |
| `limit` | integer | no | Default 12. |
| `offset` | integer | no |  |

## visual_search

**Find it from a photo**

Items in the boutiques' stock that look like a photo: a screenshot, a street style shot, a product photo, or a TikTok or Pinterest link. It answers in two groups: items close enough to be the same or nearly the same, and items with a similar look. Use this when someone shares a picture of something they want to find, asks where to buy what is in a photo, or wants 'something like this'. Pass image_url for a direct image, image_base64 with media_type for an uploaded file, or post_url for a TikTok or Pinterest link. Photos are matched in memory and never stored. Instagram links cannot be read; a screenshot works instead.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `image_url` | string | no | A direct, publicly reachable JPEG, PNG or WebP URL (under 1.5 MB). |
| `image_base64` | string | no | The image bytes, base64 encoded (under 1.5 MB decoded). |
| `media_type` | `image/jpeg`, `image/png`, `image/webp` | no | Required with image_base64. |
| `post_url` | string | no | A TikTok or Pinterest post link; the photograph is read from the post. |
| `image_file` | object | no | A photograph the shopper uploaded in the chat; the host passes the file here. |

## convert_size

**Convert a size**

Turn a size in one system into every other system: rings, shoes, clothing, suits, belts and hats, or one designer's own chart (pass designer as its slug, e.g. 'nike'). Answers only from the size tables on shopwithin.co/sizes, where every row comes from a named source with the day it was read, and returns the page that shows the answer. Use this when someone asks what their size is in another country's system (EU to US shoe size, a ring size chart), which size to take in a designer, or how a designer's sizes run. Call it without from and size to list the systems and tables a kind or a designer has.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `kind` | `rings`, `shoes`, `clothing`, `suits`, `belts`, `hats` | no | What is being sized: rings, shoes, clothing, suits, belts or hats. |
| `designer` | string | no | A designer's slug, as in shopwithin.co/designers/<slug>, to read that designer's own charts instead of a kind. |
| `from` | string | no | The system the size is written in, as a key this tool lists, e.g. 'us', 'uk', 'eu'. |
| `size` | string | no | The size as printed, e.g. '7', 'N 1/2', '42', 'M'. |
| `to` | string | no | Optional: one system key to lead the answer with. |
| `department` | `women`, `men` | no | Optional: only women's or men's tables. |
| `table` | string | no | Optional: one table or chart id this tool lists. |

## estimate_duty

**Estimate import duty and tax**

Work out what clothing, shoes, a bag, jewellery, a watch or an accessory costs at the door when it is shipped to the US, Canada, the UK or Australia: the duty, any extra tariff on the country it was made in, the tax, the government and carrier fees, and the total. Every line names its official source and the day it was read, and the answer links the page on shopwithin.co/duty-calculator that shows it. Use this when someone asks about customs, duty, tariffs or import tax on an order from another country, or wants an import duty calculator. It is an estimate; the carrier's bill is the final word.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `to` | `us`, `canada`, `uk`, `australia` | yes | Where the piece is shipped to. |
| `price` | number | yes | The price, without shipping. |
| `currency` | `CAD`, `USD`, `GBP`, `EUR`, `AUD` | yes | The currency of the price. |
| `kind` | string | yes | What the piece is, one of: coat-wool, coat-cotton, coat-polyester, puffer-down, jacket-wool, jacket-cotton, jacket-polyester, jacket-leather, blazer-wool, blazer-cotton, blazer-polyester, trousers-wool, trousers-cotton, trousers-polyester, dress-wool, dress-cotton, dress-silk, dress-polyester, skirt-wool, skirt-cotton, skirt-polyester, shirt-cotton, shirt-silk, shirt-polyester, tshirt-cotton, tshirt-polyester, sweater-cashmere, sweater-wool, sweater-cotton, sweater-polyester, shoes-leather, sneakers-leather, boots-leather, sneakers-textile, bag-leather, bag-textile, wallet-leather, jewellery-gold, jewellery-silver, jewellery-costume, watch-automatic, watch-gold, belt-leather, scarf-silk, scarf-wool, tie-silk, sunglasses. |
| `department` | `women`, `men` | no | Women's or men's; some duty rates differ. |
| `made_in` | string | yes | Two letter country code of where it was made, e.g. IT, FR, CA, US, JP. |
| `ships_from` | string | yes | Two letter country code of where it ships from. |
| `ship_by` | string | no | us: fedex, courier or post. canada: fedex, courier or post. uk: royalmail, parcelforce or courier. australia: courier or post. |
| `region` | string | no | Canada only: the province code, e.g. ON, QC, BC. |
| `shipping` | number | no | Optional shipping cost, in the price's currency. |
| `weight_kg` | number | no | Optional weight; a few US lines add a charge per kilogram. |
| `usmca` | boolean | no | US only: true if a piece made in Canada or Mexico qualifies under USMCA. |

## new_arrivals

**Just in: new arrivals**

The newest clothes, shoes, bags and jewellery to arrive at independent luxury boutiques, newest first, each with its price, the sizes in stock, the shop that has it and the shopwithin.co page to buy it. Use this when someone asks what is new, what just came in or just dropped, or wants the new arrivals from a designer, in a category, for women or men, at one boutique or in one city. It reads live stock, so an item that sold out is not in the answer.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `designers` | list of string | no | Designer or brand names, as they appear in results: 'Rick Owens', 'Chrome Hearts'. |
| `categories` | list of string | no | Kinds of item, e.g. 'Sneakers', 'Jackets', 'Bags'; take values from a search result's facets. |
| `department` | `women`, `men` | no | Only women's or only men's. |
| `boutiques` | list of string | no | Boutique domains to read, as shown on boutiques and items (e.g. 'wdlt117.myshopify.com'). |
| `city` | string | no | The city the boutiques are in, e.g. 'Toronto': a place to shop, not the shopper's own location. |
| `price_max` | number | no | Highest price to include, in the boutique's currency. |
| `limit` | integer | no | Items per page, default 12. |
| `offset` | integer | no | Items to skip; use next_offset from the page before. |

## on_sale

**On sale now**

Designer clothes, shoes and bags marked down right now at independent luxury boutiques, each with its old price, the price now, how much is off, the sizes in stock, the shop and the shopwithin.co page to buy it. Use this when someone asks for a designer sale, designer deals or a designer outlet, designer clothes on sale, a price drop, one brand on sale ("Canada Goose sale", "Rick Owens sale"), a kind of item on sale, or Black Friday and Cyber Monday prices. It narrows by designer, kind, women's or men's, size, boutique, city and a price cap, and gives within's sale page or Black Friday page for the designer when there is one. It only knows what the boutiques on within have marked down today.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `designers` | list of string | no | Designer or brand names: 'Canada Goose', 'Stussy', 'Rick Owens'. |
| `categories` | list of string | no | Kinds of item in plain words: 'jackets', 'hats', 'shorts', 'sneakers', 'bags', 'shoes'. |
| `department` | `women`, `men` | no | Women's or men's. Items made for anyone stay in. |
| `sizes` | list of string | no | Sizes that must be in stock, as the shops label them: 'M', '42', 'US 9', 'IT 38'. |
| `boutiques` | list of string | no | Boutique domains to read, as shown on boutiques and items (e.g. 'wdlt117.myshopify.com'). |
| `city` | string | no | The city the boutiques are in, e.g. 'Toronto': a place to shop, not the shopper's own location. |
| `price_max` | number | no | Highest price now, in the boutique's currency. |
| `order` | `biggest_drop`, `lowest_price`, `newest` | no | biggest_drop (the default): the biggest markdown first. lowest_price: the cheapest first. newest: among the marked-down items, the ones that arrived at the boutiques last come first. |
| `limit` | integer | no | Items per page, default 12. |
| `offset` | integer | no | Items to skip; use next_offset from the page before. |

## gift_ideas

**Gift ideas**

Gift ideas in stock at independent luxury boutiques: designer gifts for her, for him or for anyone, under a budget, each with its price, the shop and the shopwithin.co page to buy it, plus within's gift guides that fit. The gifts come from those guides, where every item is listed in one size: jewelry, wallets, bags, hats, scarves, sunglasses, watches and candles. Use this when someone asks for gift ideas or Christmas gift ideas, gifts for her or for him, a gift for a boyfriend, girlfriend, mom or dad, luxury gifts, designer gifts or gifts under 100. When the guides hold too little for the ask it returns plain stock under the budget and says so. It only knows the boutiques on within.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `recipient` | string | no | Who the gift is for, in plain words: 'her', 'him', 'my dad', 'girlfriend', 'mom', 'anyone'. Left out: gifts for anyone. |
| `budget` | number | no | The most to spend. Read in Canadian dollars, the boutiques' own prices. |
| `kind` | string | no | A kind of gift or a word to look for: 'jewelry', 'wallet', 'candle', 'sunglasses', 'made in Canada', 'sneakers'. |
| `limit` | integer | no | Most gifts to return, default 12. |

## outfit_ideas

**Outfit ideas**

Outfit ideas within has already put together, for a question or an occasion in plain words: its edits ("Christmas outfits", "What to Wear to the Ballet"), its outfit pages ("Guidi outfits", "Winter outfits for women") and its looks, each a whole outfit. Up to five come back, each with its name, one line on what it is, its shopwithin.co address and the items in it that are in stock at independent luxury boutiques, with price and link. Use this when someone asks for outfit ideas, what to wear to an event or in a season, how to style a kind of item or a designer, or for Christmas outfits, winter outfits, a date night outfit or streetwear outfits. It returns only what is on within and gives no advice of its own.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `query` | string | yes | The question or the occasion in plain words: 'christmas outfits', 'what to wear to the ballet', 'gym outfit men', 'guidi boots outfit'. |
| `department` | `women`, `men` | no | Only outfits for women or only for men. Outfits made for anyone stay in. |

## wear_with

**What to wear with it**

The clothes, shoes, bags and accessories in stock at independent luxury boutiques that go with one item: the same ones its shopwithin.co page shows in its "Wear with" row. Each comes with the part of the outfit it is (the coat, the jeans, the bag), its price, the sizes in stock, the shop that has it and the page to buy it. Use this when someone asks what to wear with an item, how to style it, what goes with it, or wants outfit ideas built around something they found or bought here. Name the item by url, or by boutique_domain and id from another result. The url is a shopwithin.co product page link; the tool reads within's own catalog, documented at https://shopwithin.co/agents.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `url` | string | no | The item's shopwithin.co product page link, e.g. https://shopwithin.co/product/<boutique>/<words>/<id>. |
| `boutique_domain` | string | no | The item's boutique_domain from another result. |
| `id` | string | no | The item's id from another result. |
| `department` | `women`, `men` | no | For an item made for anyone: keep the row to women's or to men's. An item made for women or for men keeps its own. |
| `limit` | integer | no | Most items to return, default 8. |

## boutique_directory

**Find boutiques in a city**

Independent boutiques and clothing stores in a city, from within's directory of about 8,700 shops in more than 140 cities. Each shop comes with the kind of shop it is, its street and neighbourhood, a few designers it stocks, its page on shopwithin.co, and whether it sells on within. Use this when someone asks for clothing stores or boutiques in a city or neighbourhood, for luxury boutiques, for vintage, consignment or sneaker stores, for the stores that stock a designer (stockists) in a city or country, or for a shop by a word in its name. The list is A to Z, not ranked, with no ratings or reviews. Most shops in it do not sell on within. With no city it lists the cities covered.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `city` | string | no | The city the shops are in, e.g. 'Toronto', 'New York', 'Melbourne': a place to shop, not the shopper's own location. A part of a city works too: 'Brooklyn'. |
| `country` | string | no | A country name or two letter code, e.g. 'Australia', to search every city in it or to list its cities. |
| `neighbourhood` | string | no | A neighbourhood in the city, e.g. 'Yorkville', 'SoHo', 'Le Marais'. |
| `kind` | string | no | The kind of shop, one of: vintage, consignment, archive, sneakers, streetwear, jewellery, watches, menswear, womenswear, concept. |
| `designer` | string | no | A designer or brand the shop stocks, e.g. 'Diesel', 'Goyard', 'Zoe Kratzmann'. |
| `name` | string | no | A word in the shop's name, e.g. 'archive', 'kith'. |
| `limit` | integer | no | Shops per page, default 12. |
| `offset` | integer | no | Shops to skip; use next_offset from the page before. |

## boutique_details

**One boutique: address, hours, designers**

One boutique from within's directory of independent shops in more than 140 cities: what kind of shop it is, its address and neighbourhood, its opening hours with the day they were read, its website and Instagram, the designers its own site lists, and its page on shopwithin.co. For a boutique that sells on within it adds how many items are live and the boutique's domain. Use this when someone asks about a shop by name: where it is, when it is open, what brands it carries, its store locations, or whether it sells online. If two shops share the name it lists them and asks for the city. It holds hours for some shops only, and no phone numbers, ratings or reviews. A url is the shop's own page on shopwithin.co; the tool reads within's own directory, documented at https://shopwithin.co/agents.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `name` | string | no | The shop's name, e.g. 'Miami Twice', 'SW3 Boutique', 'Mohawk General Store'. |
| `city` | string | no | The city the shop is in, when the name is not unique, e.g. 'Paris'. |
| `url` | string | no | The shop's directory page on shopwithin.co, in place of the name, e.g. 'https://shopwithin.co/directory/miami/boutiques/miami-twice'. |

## delivery_and_returns

**Delivery, pickup and returns at a boutique**

Delivery, pickup and returns at the independent boutiques that sell on within. For one boutique: what delivery to a country costs and how long it takes, the price an item ships free from, the countries it ships to, pickup in the shop, and its return policy (final sale, how many days, refund, exchange or store credit), read from the boutique's own pages. With no boutique: one line per boutique for the country. Use this when someone asks about a boutique's return policy or free returns, whether it ships to the USA, Canada or another country, what delivery costs, same day delivery, or pick up in store. Prices are in Canadian dollars, before duty and tax. It covers the boutiques on within only.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `boutique` | string | no | The boutique's domain or name, e.g. 'utopia-kicks.myshopify.com' or 'Due West'. Leave out for every boutique. |
| `country` | string | no | Where it is delivered: a country name or two letter code, e.g. 'Canada', 'US', 'Sweden'. Leave out for Canada and the United States. |

## delivered_price

**What an item costs delivered**

What one item on within costs delivered to a country: the item's price, the boutique's own delivery price, and an estimate of the duty, tariffs, tax and fees, added up to the landed cost at the door. The duty estimate covers the United States, the United Kingdom and Australia; Canada adds sales tax by province; for other countries it gives the item and delivery only and says what is missing. Use this when someone asks what an item really costs shipped to them, for the total with shipping and customs, or for an import duty, customs duty or landed cost calculator on one item. Name the item by its shopwithin.co link, or by boutique_domain and id. The url is a shopwithin.co product page link; the tool reads within's own catalog, documented at https://shopwithin.co/agents. It is an estimate; the carrier's bill is the final word.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `url` | string | no | The item's shopwithin.co link, e.g. https://shopwithin.co/product/<boutique>/<words>/<id>. |
| `boutique_domain` | string | no | The item's boutique_domain from a result, with id. |
| `id` | string | no | The item's id from a result, with boutique_domain. |
| `country` | string | yes | Where it is delivered: a country name or two letter code, e.g. 'US', 'Canada', 'United Kingdom'. |
| `region` | string | no | The province or state: a Canadian province by name or code ('ON', 'Quebec'), a US state by its two letter code ('NY'). Canada needs it for sales tax; some delivery prices differ by province or state. |
| `made_in` | string | no | Where the item was made, as a country name or two letter code (e.g. 'IT'), when the answer says it is missing. It is on the item's label or in its description. |
| `kind` | string | no | What the item is, for the duty rate, when the answer says it is missing. One of: coat-wool, coat-cotton, coat-polyester, puffer-down, jacket-wool, jacket-cotton, jacket-polyester, jacket-leather, blazer-wool, blazer-cotton, blazer-polyester, trousers-wool, trousers-cotton, trousers-polyester, dress-wool, dress-cotton, dress-silk, dress-polyester, skirt-wool, skirt-cotton, skirt-polyester, shirt-cotton, shirt-silk, shirt-polyester, tshirt-cotton, tshirt-polyester, sweater-cashmere, sweater-wool, sweater-cotton, sweater-polyester, shoes-leather, sneakers-leather, boots-leather, sneakers-textile, bag-leather, bag-textile, wallet-leather, jewellery-gold, jewellery-silver, jewellery-costume, watch-automatic, watch-gold, belt-leather, scarf-silk, scarf-wool, tie-silk, sunglasses. |

## pickup_today

**Pick up in a shop**

Clothes, shoes, bags and jewellery a shopper can buy on shopwithin.co and pick up in the shop: in stock now at independent boutiques that offer pickup, each with its price, the sizes in stock, the shop and its street, and the shop's hours where they are held. Where the hours are held it says whether the shop is open today. Use this when someone asks for pick up in store, buy online and pick up in store, same day pickup, or what they can collect today in a city, with a search, designer, category, size or price cap. It covers only the boutiques on within that offer pickup.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `city` | string | no | The city the shops are in, e.g. 'Toronto': a place to shop, not the shopper's own location. |
| `query` | string | no | What to look for, in plain words: 'black loafers', 'Rick Owens jacket'. |
| `designers` | list of string | no | Designer or brand names, as they appear in results: 'Rick Owens', 'Chrome Hearts'. |
| `categories` | list of string | no | Kinds of item, e.g. 'Sneakers', 'Jackets', 'Bags'; take values from a search result's facets. |
| `department` | `women`, `men` | no | Only women's or only men's. |
| `sizes` | list of string | no | Sizes that must be in stock, as they appear in results: 'M', '42', 'US 10'. |
| `price_max` | number | no | Highest price to include, in the boutique's currency. |
| `limit` | integer | no | Items per page, default 12. |
| `offset` | integer | no | Items to skip; use next_offset from the page before. |

## designer_guide

**Designer guide: facts, stock and stockists**

One designer or brand in one answer: who founded it, when, where it is from, who owns it and where it is made, each fact with its source; how many items independent luxury boutiques have in stock right now, which kinds, the price range, and how many are used, second hand or pre-owned; the boutiques that stock it and, with a city, the shops there that list it; the designer's own stores where known; how its sizes run; common questions; and its shopwithin.co pages. Use this when someone asks about a brand by name: who owns Chrome Hearts, where is Canada Goose made, does Supreme run big, Aime Leon Dore sizing, Lemaire locations. It only knows what shopwithin.co holds.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `designer` | string | yes | The designer or brand: its name ('Chrome Hearts', 'Canada Goose') or its shopwithin.co slug ('chrome-hearts'). |
| `city` | string | no | A city, e.g. 'Toronto' or 'New York': adds the boutiques there that list the designer on their own sites. A place to shop, not the shopper's own location. |

## where_to_buy

**Where to buy it**

Where to buy a designer, a named item or a style code. First the items in stock right now at independent luxury boutiques, each with the shop, the price, the sizes and the shopwithin.co page to buy it. Then, with a city, the boutiques there that list the designer on their own sites, with their streets. Then the designer's own stores where shopwithin.co holds a sourced answer. Use this when someone asks where to buy something, types a designer with 'store', or asks for stockists, authorized retailers or locations in a city: where to buy Chrome Hearts, Chrome Hearts store, Rick Owens in New York, Guidi stockists, Nike Mind slides. If nobody has it, the answer says so.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `query` | string | yes | What to find: a designer ('Guidi'), a named item ('Rick Owens Ramones', 'Nike Mind slides') or a style code ('GR02V'). |
| `designer` | string | no | The designer or brand, when the query names only the item. |
| `city` | string | no | A city, e.g. 'Toronto' or 'Paris': stock from boutiques there, and the shops there that list the designer. A place to shop, not the shopper's own location. |
| `country` | string | no | A two-letter country code, e.g. 'US' or 'GB': only boutiques whose own delivery list names that country. |
| `size` | string | no | A size that must be in stock, as a shop labels it: 'M', '42', 'US 9'. |

## price_check

**Price check: what it costs right now**

What a designer's item costs right now at independent luxury boutiques: how many are in stock, the lowest, middle and highest price, the used, second hand or pre-owned ones against the rest, the cheapest few with the shop and the shopwithin.co page for each, and shopwithin.co's own price page for the designer. Prices stay in each boutique's own currency and are never converted. Use this when someone asks how much something is, wants a price check or to compare prices, names a budget, or sets two designers against each other: how much is a Goyard tote, Chrome Hearts hoodie price, Louis Vuitton shoes under 1000, Moncler vs Canada Goose. It only knows today's stock at the boutiques on shopwithin.co.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `query` | string | yes | The designer and the item, in plain words: 'Chrome Hearts hoodie', 'Goyard tote', 'Jordan shoes under 500'. A price limit in the sentence is understood. |
| `designer` | string | no | The designer or brand, when the query names only the item. |
| `category` | string | no | The kind of item, e.g. 'hoodies', 'sneakers', 'bags', 'jewellery'. |
| `condition` | `pre-owned`, `new` | no | 'pre-owned': only items the boutique marked used, second hand or pre-owned. 'new': only items it did not mark that way. |
| `size` | string | no | A size that must be in stock, as a shop labels it: 'M', '42', 'US 9'. |
| `price_max` | number | no | The most to pay, in the boutique's own currency. |

## brands_like

**Similar brands: designers like this one**

Designers like a given one, counted from live stock at independent luxury boutiques: the brands that the same boutiques stock and whose items are the same kinds (sneakers, jackets, bags, jewellery), most alike first. Each comes with how many items are in stock, the boutiques and kinds it shares with the one asked about, and its shopwithin.co page. The list says what the same boutiques stock today; it is not a judgement of taste, price or look, and not a list of copies. Use this when someone asks for brands like Chrome Hearts, brands like Rick Owens, similar brands, or what else to look at if they like a designer. It only knows designers in stock at the boutiques on shopwithin.co.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `designer` | string | yes | The designer or brand to start from: 'Rick Owens', 'Chrome Hearts', or its shopwithin.co slug. |
| `limit` | integer | no | How many to list, default 6. |

## compare_pieces

**Compare items side by side**

Two to four items from independent luxury boutiques, side by side. For each: its name and designer, price and currency, condition, sizes in stock, the shop and its city, pickup and delivery, a line from its description, its shopwithin.co page, and any other boutique that has the same item, with its price. Then what differs: the price gap, which sizes each has, the condition and the shop. Use this when someone asks which of two items is cheaper or has their size, wants an 'X vs Y' on items they found (Samba vs Gazelle, Jordan 1 vs Dunk), or pastes two shopwithin.co links. Each item is named by its link, or by the boutique_domain and id from a search result. Prices are never converted.

| Input | Type | Needed | What it is |
| --- | --- | --- | --- |
| `pieces` | list of object | yes | Two to four items, each as a url, or as boutique_domain and id. |

## Starter prompts

| Prompt | What it starts |
| --- | --- |
| `find_in_my_size` | Find an item that is in stock in your size at independent boutiques, under a price if you give one. |
| `where_to_buy` | Who has a designer or an item in stock right now, and which boutiques stock it in a city. |
| `gift_ideas` | Gift ideas that are in stock at independent boutiques, for the person and the budget you give. |
| `shop_a_city` | The independent boutiques in a city, by kind, and which of them sell on within. |
| `what_is_my_size` | Your size in another country's system, or in one designer's own chart. |
| `price_at_my_door` | What one item on within costs delivered to your country, with delivery, duty and tax. |
