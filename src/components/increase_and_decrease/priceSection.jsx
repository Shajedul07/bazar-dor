import { Chip } from "@heroui/react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "https://api.abcz.workers.dev/api/bazardor"
    }/products`;

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

// Newer emojis (🫘 🫙 🫚) don't render on many Windows setups, so swap in older ones.
const EMOJI_FALLBACK = { "🫘": "🌰", "🫙": "🛢️", "🫚": "🌿" };

const CONFIG = {
    up: {
        title: "আজ দাম বেড়েছে",
        arrow: "▲",
        arrowColor: "text-red-600",
        chipColor: "danger",
    },
    down: {
        title: "আজ দাম কমেছে",
        arrow: "▼",
        arrowColor: "text-green-600",
        chipColor: "success",
    },
};

const toBn = (n, options) => Number(n).toLocaleString("bn-BD", options);

async function getProducts() {
    try {
        // Cached for 5 minutes; Increase and Decrease share this one request.
        const res = await fetch(API_URL, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("Products fetch failed:", err);
        return [];
    }
}

// Biggest movers first, top 6.
const pickMovers = (products, direction) =>
    products
        .filter((p) => p.change?.dir === direction)
        .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
        .slice(0, 6);

function PriceCard({ item, direction }) {
    const { arrow, chipColor } = CONFIG[direction];
    const icon = EMOJI_FALLBACK[item.image] ?? item.image;
    const unit = UNIT_BN[item.unit] ?? item.unit;
    const pct = toBn(Math.abs(item.change.pct), {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    return (
        <article className="rounded-xl border border-[#e4ebe6] bg-[#fbfdfb] p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
                <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#f1f4f2] text-xl"
                    aria-hidden="true"
                >
                    {icon}
                </div>
                <div className="min-w-0">
                    <h3 className="truncate text-[15px] leading-tight font-bold text-gray-900">
                        {item.nameBn}
                    </h3>
                    <p className="text-[11px] text-gray-500">প্রতি {unit}</p>
                </div>
            </div>

            <div className="mt-3">
                <p className="text-[11px] text-gray-600">আজকের দাম</p>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className="text-gray-900">
                        <span className="text-[17px] font-bold">{toBn(item.today)}</span>{" "}
                        <span className="text-[13px]">টাকা</span>
                    </p>
                    <Chip color={chipColor} variant="soft" size="sm">
                        {`${arrow} ${pct}%`}
                    </Chip>
                </div>
            </div>
        </article>
    );
}

export default async function PriceSection({ direction }) {
    const products = await getProducts();
    const items = pickMovers(products, direction);
    const { title, arrow, arrowColor } = CONFIG[direction];

    if (items.length === 0) return null;

    return (
        <section
            aria-labelledby={`price-${direction}-title`}
            className="mx-auto w-full max-w-[1120px] px-4 pt-10"
        >
            <h2
                id={`price-${direction}-title`}
                className="mb-3.5 flex items-center gap-2 text-lg font-bold text-gray-900"
            >
                <span className={`text-sm ${arrowColor}`} aria-hidden="true">
                    {arrow}
                </span>
                {title}
            </h2>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <PriceCard key={item.id} item={item} direction={direction} />
                ))}
            </div>
        </section>
    );
}