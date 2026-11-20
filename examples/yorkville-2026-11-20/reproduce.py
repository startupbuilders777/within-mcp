"""Rebuild category_counts.csv from the Yorkville product snapshot."""

import argparse
import csv
import sys
from collections import Counter, defaultdict
from urllib.parse import urlsplit


def summarize(rows):
    products = {}
    counts = defaultdict(Counter)
    for line, row in enumerate(rows, start=2):
        product_id = row.get("catalogue_product_id")
        if product_id is None:
            product_id = urlsplit(row["product_url"]).path.rsplit("/", 1)[-1]
        category = row["category"]
        condition = row["listed_condition"]
        if not product_id.isdecimal() or not category or condition not in {"new", "used"}:
            raise ValueError(f"Invalid product, category or condition at line {line}")
        if product_id in products:
            if products[product_id] != (category, condition):
                raise ValueError(f"Product {product_id} has conflicting records at line {line}")
            continue
        products[product_id] = (category, condition)
        counts[category][condition] += 1
    return counts


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("listings", help="product_listings.csv from Kaggle or listings.csv from within")
    args = parser.parse_args()
    with open(args.listings, newline="", encoding="utf-8-sig") as source:
        counts = summarize(csv.DictReader(source))
    writer = csv.writer(sys.stdout, lineterminator="\n")
    writer.writerow(["category", "new_listings", "used_listings", "all_listings"])
    for category in sorted(counts, key=lambda name: (-sum(counts[name].values()), name)):
        new = counts[category]["new"]
        used = counts[category]["used"]
        writer.writerow([category, new, used, new + used])
