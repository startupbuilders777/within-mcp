# How many of one boutique’s Chrome Hearts rings were secondhand?

At 9:32 a.m. in Toronto on November 20, 2026, Utopia had 80 Chrome Hearts ring listings in stock. The shop marked 49 of them as used. For shirts the figure was 72 out of 177. Both answers come from the same shop and the same morning. Each product counted once, however many sizes it came in.

## Check today’s selection

Call `boutique_shelf` with the boutique’s domain and a search term. This example asks for twelve matches in Utopia’s current catalogue.

```json
{
  "boutique_domain": "utopia-kicks.myshopify.com",
  "query": "Chrome Hearts",
  "limit": 12
}
```

A page of twelve results is useful for browsing. To count the mix across a whole shop, take one snapshot of the complete public feed. Keep the time, shop, designer and unit of observation with the result. You can also [browse Chrome Hearts in Toronto](https://shopwithin.co/shop/toronto/designers/chrome-hearts) or [see how to call the live tools](../curl.md).

## Reproduce the November count

`product_listings.csv` has 804 rows. Each row records the observation time, catalogue product ID, category and condition. Utopia supplied the condition. To produce this table, Within selected in-stock Chrome Hearts listings from Utopia in its [public shopping feed](https://shopwithin.co/feeds/google-merchant.xml), removed URL queries and fragments, and grouped variants under one product ID. Every retained variant of a product agreed on category and condition. The category names preserve the shop feed’s distinctions, including separate groups for rings and bracelets.

From this directory, run the following with Python 3. It reads a local file and uses the standard library.

```sh
python3 reproduce.py product_listings.csv > counted.csv
diff -u category_counts.csv counted.csv
```

An empty diff means all 33 category rows match. The five largest categories account for 552 listings.

| Category | New | Used | Total |
| --- | ---: | ---: | ---: |
| Shirts | 105 | 72 | 177 |
| Hoodies and sweatshirts | 53 | 80 | 133 |
| Hats | 64 | 34 | 98 |
| Rings | 31 | 49 | 80 |
| Jewelry | 30 | 34 | 64 |

Across the whole sample, the shop listed 425 products as new and 379 as used. Those numbers describe its selection. A count of sales would require transaction records. One listing could also have several units available.

The [frozen data on Kaggle](https://www.kaggle.com/datasets/shopwithin/chrome-hearts-at-a-toronto-boutique-november-2026) includes the field definitions and collection method. The [browser notebook](https://colab.research.google.com/drive/1rax8u5KAo4FRL3VyDNAKMvfTE26Jd653) lets a reader run the count without installing Python.
