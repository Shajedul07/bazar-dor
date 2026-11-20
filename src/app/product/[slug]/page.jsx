import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "https://api.abcz.workers.dev/api/bazardor"
    }/products`;

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

// Newer emojis (🫘 🫙 🫚) don't render on many Windows setups, so swap in older ones.
const EMOJI_FALLBACK = { "🫘": "🌰", "🫙": "🛢️", "🫚": "🌿" };

const TREND = {
    up: { arrow: "▲", color: "text-red-600", word: "বেড়েছে" },
    down: { arrow: "▼", color: "text-green-600", word: "কমেছে" },
    flat: { arrow: "–", color: "text-gray-500", word: null },
};

const CARD = "rounded-xl border border-[#e4ebe6] bg-[#fbfdfb]";

const toBn = (n, options) => Number(n).toLocaleString("bn-BD", options);

// Whole numbers show as ৬২, others with two decimals like ৬৩.৫০
const money = (n) =>
    toBn(n, {
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2,
    });

async function getProduct(slug) {
    try {
        const res = await fetch(API_URL, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? (data.find((p) => p.slug === slug) ?? null) : null;
    } catch (err) {
        console.error("Product fetch failed:", err);
        return null;
    }
}

export default async function ProductPage({ params }) {
    const { slug } = await params; // params is a Promise in Next.js 15+
    const item = await getProduct(slug);

    if (!item) notFound();

    const trend = TREND[item.change?.dir] ?? TREND.flat;
    const unit = UNIT_BN[item.unit] ?? item.unit;
    const icon = EMOJI_FALLBACK[item.image] ?? item.image;
    const diff = Math.abs(item.today - item.yesterday);
    const pct = toBn(Math.abs(item.change?.pct ?? 0), {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    // Cheapest market first
    const rows = item.markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    const stats = [
        {
            label: "সর্বনিম্ন দাম",
            value: Math.min(...item.markets.map((m) => m.min)),
            note: "সবচেয়ে কম দামের বাজার",
            color: "text-green-600",
        },
        {
            label: "সর্বাধিক দাম",
            value: Math.max(...item.markets.map((m) => m.max)),
            note: "সবচেয়ে বেশি দামের বাজার",
            color: "text-red-600",
        },
        {
            label: "গড় দাম",
            value: item.today,
            note: `প্রতি ${unit}-এর হিসাবে`,
            color: "text-green-600",
        },
    ];

    return (
        <main className="mx-auto w-full max-w-[1120px] px-4 pt-6 pb-12">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="text-xs text-gray-500">
                <ol className="flex flex-wrap items-center gap-2">
                    <li>
                        <Link href="/" className="hover:text-green-700">
                            হোম
                        </Link>
                    </li>
                    <li aria-hidden="true">›</li>
                    <li>
                        <Link href={`/category/${item.category}`} className="hover:text-green-700">
                            {item.categoryNameBn}
                        </Link>
                    </li>
                    <li aria-hidden="true">›</li>
                    <li aria-current="page" className="text-gray-700">
                        {item.nameBn}
                    </li>
                </ol>
            </nav>

            {/* Header */}
            <section
                className={`${CARD} mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between`}
            >
                <div className="flex items-center gap-4">
                    <div
                        className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#f1f4f2] text-4xl"
                        aria-hidden="true"
                    >
                        {icon}
                    </div>
                    <div>
                        <h1 className="text-2xl leading-tight font-bold text-gray-900 sm:text-[28px]">
                            {item.nameBn}
                        </h1>
                        <p className="mt-1 text-xs text-gray-500">
                            প্রতি {unit} · {item.categoryNameBn}
                        </p>
                        <p className="mt-1.5 text-xs text-gray-600">
                            {trend.word ? (
                                <>
                                    গতকালের তুলনায় আজ দাম{" "}
                                    <strong className="font-bold text-gray-900">{trend.word}</strong> ·{" "}
                                    {money(diff)} টাকা
                                </>
                            ) : (
                                "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
                            )}
                        </p>
                    </div>
                </div>

                <div className="w-full shrink-0 rounded-xl border border-[#e4ebe6] bg-[#f3f6f4] px-6 py-3 text-center sm:w-auto">
                    <p className="text-[11px] text-gray-500">আজকের দাম</p>
                    <p className="text-[28px] leading-tight font-bold text-gray-900">
                        {toBn(item.today)}
                    </p>
                    <p className="text-[11px] text-gray-500">টাকা / {unit}</p>
                    <p className={`mt-1 text-xs font-bold ${trend.color}`}>
                        {trend.arrow} {pct}%
                    </p>
                </div>
            </section>

            {/* Price summary */}
            <section className={`${CARD} mt-5 p-5`}>
                <h2 className="text-[15px] font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="rounded-lg border border-[#e4ebe6] bg-white p-3.5"
                        >
                            <p className="text-[11px] text-gray-500">{s.label}</p>
                            <p className={`mt-1 ${s.color}`}>
                                <span className="text-[22px] font-bold">{money(s.value)}</span>{" "}
                                <span className="text-xs">টাকা</span>
                            </p>
                            <p className="mt-1 text-[10px] text-gray-500">{s.note}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Market table */}
            <section className={`${CARD} mt-5 p-5`}>
                <h2 className="text-[15px] font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
                <div className="mt-3 overflow-x-auto rounded-lg border border-[#e4ebe6]">
                    <table className="w-full min-w-[560px] text-left text-[13px]">
                        <thead className="bg-[#f7faf8] text-xs text-gray-500">
                            <tr>
                                <th scope="col" className="px-4 py-3 font-normal">
                                    বাজার
                                </th>
                                <th scope="col" className="px-4 py-3 font-normal">
                                    বিভাগ
                                </th>
                                <th scope="col" className="px-4 py-3 text-right font-normal">
                                    সর্বনিম্ন
                                </th>
                                <th scope="col" className="px-4 py-3 text-right font-normal">
                                    সর্বাধিক
                                </th>
                                <th scope="col" className="px-4 py-3 text-right font-normal">
                                    গড়
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((m) => (
                                <tr key={m.market} className="border-t border-[#dfe6e1] even:bg-[#f1f5f2]">
                                    <td className="px-4 py-3 text-gray-900">{m.market}</td>
                                    <td className="px-4 py-3 text-gray-600">{m.division}</td>
                                    <td className="px-4 py-3 text-right text-gray-600">{money(m.min)} টাকা</td>
                                    <td className="px-4 py-3 text-right text-gray-600">{money(m.max)} টাকা</td>
                                    <td className="px-4 py-3 text-right font-bold text-gray-900">
                                        {money(m.avg)} টাকা
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}