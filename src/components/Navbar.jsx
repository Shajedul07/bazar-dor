"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown, Label, buttonVariants } from "@heroui/react";
import { ArrowRightFromSquare, ChevronDown, Persons } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client"; // 👉 change to your auth-client path
import Image from 'next/image'
import { useEffect, useState } from "react";
/* Bangla date → মঙ্গলবার, ৬ অক্টোবর, ২০২৬ */
function getBanglaDate() {
    const parts = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).formatToParts(new Date());

    const get = (type) => parts.find((p) => p.type === type)?.value;
    return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

/* Sign in / Sign up */
function AuthButtons() {
    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <Link
                href="/sign-in"
                className={buttonVariants({
                    variant: "ghost",
                    className: "h-9 px-3 text-sm font-semibold sm:h-10 sm:px-4",
                })}
            >
                সাইন ইন
            </Link>

            <Link
                href="/sign-up"
                className={buttonVariants({
                    variant: "primary",
                    className:
                        "h-9 bg-green-600 px-4 text-sm font-semibold text-white shadow-md hover:bg-green-700 sm:h-10 sm:px-5",
                })}
            >
                সাইন আপ
            </Link>
        </div>
    );
}

/* User dropdown */
function UserMenu({ user, onAction }) {
    const firstName = user.name?.split(" ")[0] ?? "";

    return (
        <Dropdown>
            <Dropdown.Trigger className="flex cursor-pointer items-center gap-2 rounded-full p-1 pr-2 outline-none transition-colors hover:bg-default data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-green-600">
                <Avatar size="sm">
                    {/* 👉 User image goes here: <Avatar.Image src={user.image} alt={user.name} /> */}
                    <Avatar.Fallback>{firstName.charAt(0).toUpperCase()}</Avatar.Fallback>
                </Avatar>

                {/* Name is hidden on very small screens to save space */}
                <span className="hidden max-w-28 truncate text-sm font-medium text-foreground sm:inline">
                    {firstName}
                </span>
                <ChevronDown className="size-3 text-muted" />
            </Dropdown.Trigger>

            <Dropdown.Popover placement="bottom end" className="min-w-56 rounded-2xl">
                {/* Name + email */}
                <div className="px-3 pt-3 pb-1">
                    <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                </div>

                <Dropdown.Menu onAction={onAction}>
                    <Dropdown.Item id="profile" textValue="আমার প্রোফাইল">
                        <Persons className="size-4 shrink-0 text-muted" />
                        <Label>আমার প্রোফাইল</Label>
                    </Dropdown.Item>

                    <Dropdown.Item id="sign-out" textValue="সাইন আউট" variant="danger">
                        <ArrowRightFromSquare className="size-4 shrink-0 text-danger" />
                        <Label>সাইন আউট</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}

/* Navbar */
export default function Navbar() {
    const [categories, setCategories] = useState([])
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                    router.refresh();
                },
            },
        });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            const data = await res.json();
            setCategories(data);
        }
        fetchCategories();
    }, [])
    const handleMenuAction = (key) => {
        if (key === "profile") router.push("/profile");
        if (key === "sign-out") handleSignOut();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white backdrop-blur-md">
            {/* ───── Top row ───── */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[70px] sm:px-6 lg:px-8">
                {/* Left: logo + name + date */}
                <Link href="/" className="flex min-w-0 items-center gap-3">
                    <div className="flex items-center justify-center size-10 shrink-0 rounded-xl sm:size-11 bg-[#00a63e]">

                        <Image
                            src="/logo-icon.png"
                            alt="Logo_image"
                            height="20"
                            width="20"
                        />
                    </div>

                    <div className="flex min-w-0 flex-col leading-tight">
                        <span className="truncate text-lg font-bold text-foreground sm:text-xl">
                            বাজার দর
                        </span>
                        <span
                            suppressHydrationWarning
                            className="truncate text-[11px] text-muted sm:text-xs"
                        >
                            {getBanglaDate()}
                        </span>
                    </div>
                </Link>

                {/* auth area */}
                <div className="flex shrink-0 items-center">
                    {isPending ? (
                        <div className="h-10 w-28 animate-pulse rounded-full bg-default" />
                    ) : user ? (
                        <UserMenu user={user} onAction={handleMenuAction} />
                    ) : (
                        <AuthButtons />
                    )}
                </div>
            </div>

            {/* Category row */}
            <nav
                aria-label="Categories"
                className="border-t border-border/60 bg-green-50/60 dark:bg-green-950/20"
            >
                <div className="mx-auto flex min-h-11 max-w-7xl items-center gap-5 overflow-x-auto px-4 sm:gap-6 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap py-2 text-[13px] font-semibold text-foreground transition-colors hover:text-green-600 sm:text-sm"
                        >
                            <span className="text-base leading-none" aria-hidden="true">
                                {cat.icon}
                            </span>
                            <span>{cat.nameBn}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}