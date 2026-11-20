"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
    { value: "default", label: "ডিফল্ট" },
    { value: "name", label: "নাম অনুযায়ী" },
    { value: "price-asc", label: "দাম: কম থেকে বেশি" },
    { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

const SORTERS = {
    default: null, // keep the order from the API
    name: (a, b) => a.nameBn.localeCompare(b.nameBn, "bn"),
    "price-asc": (a, b) => a.today - b.today,
    "price-desc": (a, b) => b.today - a.today,
};

export default function CategoryProducts({ products }) {
    const [sort, setSort] = useState("default");

    const sorter = SORTERS[sort];
    const items = sorter ? [...products].sort(sorter) : products;

    return (
        <div className="mt-6">
            {/* Sort bar */}
            <div className="flex items-center justify-end gap-2 rounded-xl border border-[#e4ebe6] bg-[#fbfdfb] p-4">
                <label htmlFor="sort-products" className="text-xs text-gray-500">
                    সাজান
                </label>
                <div className="relative">
                    <select
                        id="sort-products"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="h-9 cursor-pointer appearance-none rounded-lg border border-[#e4ebe6] bg-white pr-8 pl-3 text-xs text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                    <svg
                        className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-gray-500"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                    >
                        <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
                মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}