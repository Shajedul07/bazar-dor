import Link from "next/link";
import { Chip } from "@heroui/react";

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

// Newer emojis (🫘 🫙 🫚) don't render on many Windows setups, so swap in older ones.
const EMOJI_FALLBACK = { "🫘": "🌰", "🫙": "🛢️", "🫚": "🌿" };

const TREND = {
    up: { arrow: "▲", color: "danger" },
    down: { arrow: "▼", color: "success" },
    flat: { arrow: "–", color: "default" },
};

const toBn = (n, options) => Number(n).toLocaleString("bn-BD", options);

export default function ProductCard({ item }) {
    const trend = TREND[item.change?.dir] ?? TREND.flat;
    const icon = EMOJI_FALLBACK[item.image] ?? item.image;
    const unit = UNIT_BN[item.unit] ?? item.unit;
    const pct = toBn(Math.abs(item.change?.pct ?? 0), {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    return (
        <Link
            href={`/product/${item.slug}`}
            className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
            <article className="rounded-xl border border-[#e4ebe6] bg-[#fbfdfb] p-3.5 shadow-sm transition-shadow group-hover:shadow-md">
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
                        <Chip color={trend.color} variant="soft" size="sm">
                            {`${trend.arrow} ${pct}%`}
                        </Chip>
                    </div>
                </div>
            </article>
        </Link>
    );
}