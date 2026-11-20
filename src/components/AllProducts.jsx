import ProductCard from "./ProductCard";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

async function getProducts() {
    try {
        const res = await fetch(API_URL, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("Products fetch failed:", err);
        return [];
    }
}

export default async function AllProducts() {
    const products = await getProducts();

    return (
        <section
            id="all-products"
            aria-labelledby="all-products-title"
            className="mx-auto w-full max-w-[1120px] scroll-mt-20 px-4 pt-10 pb-12"
        >
            <div className="mb-4">
                <h2
                    id="all-products-title"
                    className="text-xl leading-tight font-bold text-gray-900"
                >
                    সব পণ্য
                </h2>
                {products.length > 0 && (
                    <p className="mt-1 text-xs text-gray-500">
                        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                    </p>
                )}
            </div>

            {products.length === 0 ? (
                <p className="rounded-xl border border-[#e4ebe6] bg-[#fbfdfb] p-6 text-center text-sm text-gray-500">
                    পণ্যের তথ্য এই মুহূর্তে লোড করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    );
}