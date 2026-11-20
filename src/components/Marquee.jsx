"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

// Newer emojis (🫘 🫙 🫚) don't render on many Windows setups, so swap in older ones.
const EMOJI_FALLBACK = { "🍚": "🌰", "🍗": "🛢️", "🌶️": "🌿" };

const TREND = {
    up: { arrow: "▲", color: "text-red-600" },
    down: { arrow: "▼", color: "text-green-600" },
    flat: { arrow: "–", color: "text-gray-400" },
};

const toBn = (n, options) => Number(n).toLocaleString("bn-BD", options);

function TickerItem({ item }) {
    const trend = TREND[item.change?.dir] ?? TREND.flat;
    const pct = Math.abs(item.change?.pct ?? 0);
    const icon = EMOJI_FALLBACK[item.image] ?? item.image;

    return (
        <div className="flex items-center gap-2 border-r border-gray-200 px-6 py-2.5 text-[13px] whitespace-nowrap">
            <span className="text-base leading-none" aria-hidden="true">
                {icon}
            </span>
            <span className="font-medium text-gray-900">{item.nameBn}</span>
            <span className="text-gray-600">
                {toBn(item.today)} টাকা/{UNIT_BN[item.unit] ?? item.unit}
            </span>
            <span className={`font-medium ${trend.color}`}>
                {trend.arrow} {toBn(pct, { maximumFractionDigits: 1 })}%
            </span>
        </div>
    );
}

const Marque = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        fetch(API_URL, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => setProducts(Array.isArray(data) ? data : []))
            .catch((err) => {
                if (err.name !== "AbortError") console.error("Marquee fetch failed:", err);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, []);

    // Keep the strip's height while loading so the page doesn't jump.
    if (loading) {
        return <div className="h-[42px] border-y border-gray-200 bg-white" />;
    }

    if (products.length === 0) return null;

    return (
        <section
            aria-label="আজকের বাজার দর"
            className="border-y border-gray-200 bg-white"
        >
            <Marquee speed={40} pauseOnHover gradient={false}>
                {products.map((item) => (
                    <TickerItem key={item.id} item={item} />
                ))}
            </Marquee>
        </section>
    );
};

export default Marque;