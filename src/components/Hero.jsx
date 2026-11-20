"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Chip, buttonVariants } from "@heroui/react";

// 👇 Paste your image link in `src`. Width/height/alt are already set.
const HERO_IMAGE = {
    src: "YOUR_IMAGE_LINK",
    width: 240,
    height: 220,
    alt: "সবজি ও ফলে ভরা একটি বাজারের ঝুড়ি",
};

const dateFormatter = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
});

// Date is read on the client only, so server and browser never disagree.
const subscribe = () => () => { };
const getToday = () => dateFormatter.format(new Date());
const getServerToday = () => "";

const PLACEHOLDER_DATE = "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"; // keeps the chip's size before it loads

const ctaClass = buttonVariants({
    variant: "primary",
    size: "md",
    className:
        "h-10 rounded-lg bg-green-600 px-5 text-sm font-medium text-white shadow-md shadow-green-600/25 hover:bg-green-700",
});

export default function HeroSection() {
    const today = useSyncExternalStore(subscribe, getToday, getServerToday);

    return (
        <section
            aria-labelledby="hero-title"
            className="container mx-auto w-full  px-4 pt-6 md:pt-8"
        >
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#e4ebe6] bg-[#f8fbf9] p-6 md:flex-row md:items-center md:px-8 md:py-8">
                {/* Left: text */}
                <div className="max-w-[560px]">
                    <Chip
                        color="success"
                        variant="soft"
                        size="sm"
                        className={today ? undefined : "invisible"}
                    >
                        {today || PLACEHOLDER_DATE}
                    </Chip>

                    <h1
                        id="hero-title"
                        className="mt-4 text-3xl leading-tight font-bold text-gray-900 md:text-[40px]"
                    >
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-gray-500 md:text-[15px]">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <div className="mt-6">
                        {/* Add id="all-products" to your "সব পণ্য" section so this scrolls there */}
                        <Link href="#all-products" className={ctaClass}>
                            সব পণ্য দেখুন
                        </Link>
                    </div>
                </div>

                {/* Right: illustration */}
                <Image
                    src={"/bazar-hero.png"}
                    width={100}
                    height={100}
                    alt={"Bazar Hero Image"}
                    quality={100}
                    sizes="(min-width: 768px) 240px, 176px"
                    loading="eager"
                    className="h-auto w-50 shrink-0 self-center object-contain md:mr-10 md:w-80 sm:w-90"
                />
            </div>
        </section>
    );
}