import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "https://api.abcz.workers.dev/api/bazardor"
    }/products`;

// Newer emojis (🫘 🫙 🫚) don't render on many Windows setups, so swap in older ones.
const EMOJI_FALLBACK = { "🫘": "🌰", "🫙": "🛢️", "🫚": "🌿" };

async function getCategoryProducts(slug) {
    try {
        const res = await fetch(`${API_URL}?category=${encodeURIComponent(slug)}`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("Category fetch failed:", err);
        return [];
    }
}

export default async function CategoryPage({ params }) {
    const { slug } = await params; // params is a Promise in Next.js 15+
    const products = await getCategoryProducts(slug);

    if (products.length === 0) notFound();

    const { categoryNameBn, categoryIcon } = products[0];
    const icon = EMOJI_FALLBACK[categoryIcon] ?? categoryIcon;

    return (
        <main className="mx-auto w-full max-w-[1120px] px-4 pt-6 pb-12">
            <header className="flex items-center gap-4 rounded-xl border border-[#e4ebe6] bg-[#fbfdfb] p-5">
                <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f4f2] text-3xl"
                    aria-hidden="true"
                >
                    {icon}
                </div>
                <div>
                    <h1 className="text-2xl leading-tight font-bold text-gray-900">
                        {categoryNameBn}
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </header>

            <CategoryProducts products={products} />
        </main>
    );
}