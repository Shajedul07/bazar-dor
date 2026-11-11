import Link from "next/link";

export default function SignUpPage() {
    return (
        <main className="min-h-screen bg-[#F2F6F1] px-4 py-6">

            <div className="mx-auto w-full max-w-[344px]">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#222B24]">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        বিনা খরচে সাইন আপ করে সব নির্বাচিত দামের পণ্য।
                    </p>
                </div>

                {/* Sign Up Card */}
                <div className="rounded-xl border border-[#DDE6DD] bg-[#FBFDFB] p-5 shadow-sm">

                    <form className="space-y-3">

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium text-[#26332A]"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="যেমন: রহিম উদ্দিন"
                                autoComplete="name"
                                className="h-[34px] w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium text-[#26332A]"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="h-[34px] w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-[#26332A]"
                            >
                                পাসওয়ার্ড
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                autoComplete="new-password"
                                className="h-[34px] w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1 block text-sm font-medium text-[#26332A]"
                            >
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="আবার লিখুন"
                                autoComplete="new-password"
                                className="h-[34px] w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="button"
                            className="h-[35px] w-full rounded-lg bg-[#078B43] text-sm font-semibold text-white shadow-md transition hover:bg-[#067738] active:scale-[0.98]"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="my-4 flex items-center gap-3">

                        <div className="h-px flex-1 bg-[#DFE6DF]" />

                        <span className="text-xs text-gray-500">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-[#DFE6DF]" />

                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-2">

                        {/* Google Button */}
                        <button
                            type="button"
                            className="flex h-[34px] items-center justify-center gap-1.5 rounded-lg border border-[#E1E8E1] text-xs font-medium text-[#303B32] transition hover:bg-gray-50"
                        >
                            <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0">
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.73 7.18l7.3 5.66c4.25-3.92 7.47-9.72 7.47-17.31z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.54 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.98 23.98 0 0 0 0 21.56l7.98-6.19z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.47 0 11.9-2.13 15.87-5.79l-7.3-5.66c-2.02 1.35-4.61 2.15-8.57 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                />
                            </svg>

                            Google দিয়ে চালিয়ে যান
                        </button>

                        {/* GitHub Button */}
                        <button
                            type="button"
                            className="flex h-[34px] items-center justify-center gap-1.5 rounded-lg border border-[#E1E8E1] text-xs font-medium text-[#303B32] transition hover:bg-gray-50"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4 shrink-0"
                            >
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.87 10.93.58.1.79-.25.79-.56v-2.05c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.46.12-3.04 0 0 .98-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.74.11 3.04.75.8 1.2 1.82 1.2 3.08 0 4.43-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                            </svg>

                            GitHub দিয়ে চালিয়ে যান
                        </button>

                    </div>

                    {/* Sign In Link */}
                    <p className="mt-4 text-center text-xs text-[#374238]">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/sign-in"
                            className="font-medium text-[#078B43] hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>

                </div>

                {/* Back to Home */}
                <div className="mt-5 text-center">
                    <Link
                        href="/"
                        className="text-xs text-gray-500 transition hover:text-green-700"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>

            </div>

        </main>
    );
}