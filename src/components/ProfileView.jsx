"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Card, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SignOutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M9 14 4 9l5-5" />
        <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
    </svg>
);

const ProfileView = ({ user }) => {
    const router = useRouter();

    const [name, setName] = useState(user.name ?? "");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [message, setMessage] = useState(null);

    // Sign out
    const handleSignOut = async () => {
        setIsSigningOut(true);

        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                    router.refresh();
                },
                onError: () => setIsSigningOut(false),
            },
        });
    };

    // Update name
    const handleUpdate = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setMessage({ type: "error", text: "নাম লিখুন" });
            return;
        }

        setIsUpdating(true);
        setMessage(null);

        const { error } = await authClient.updateUser({ name: trimmedName });

        setIsUpdating(false);

        if (error) {
            setMessage({
                type: "error",
                text: error.message || "নাম আপডেট করা যায়নি",
            });
            return;
        }

        setMessage({ type: "success", text: "নাম আপডেট হয়েছে" });

        router.refresh();
    };

    return (
        <div className="mx-auto w-full max-w-4xl px-3 sm:px-5 md:px-6">

            {/* Page heading */}
            <div className="mb-5 sm:mb-6">
                <h1 className="text-2xl font-bold text-[#1c2b21] sm:text-3xl">
                    আমার প্রোফাইল
                </h1>

                <p className="mt-1 text-sm text-[#5f6b63] sm:text-base">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            {/* Card 1: User info */}
            <Card className="mb-5 rounded-2xl border border-[#e2e7e0] bg-[#fafbf9] p-4 shadow-none sm:mb-6 sm:rounded-3xl sm:p-6 md:p-7">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* Avatar + name + email */}
                    <div className="flex min-w-0 items-center gap-3 sm:gap-5">

                        <Avatar className="size-16 shrink-0 rounded-2xl bg-[#f0f0f0] sm:size-20 md:size-24">
                            <Avatar.Image
                                src={user.image ?? undefined}
                                alt={user.name ?? "Profile"}
                                className="rounded-2xl"
                            />

                            <Avatar.Fallback className="rounded-2xl text-xl font-semibold text-[#1c2b21] sm:text-2xl">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </Avatar.Fallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-lg font-medium text-[#1c2b21] sm:text-xl md:text-2xl">
                                {user.name}
                            </p>

                            <p className="break-all text-sm text-[#6b7280] sm:text-base md:text-lg">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Sign out */}
                    <Button
                        variant="outline"
                        onPress={handleSignOut}
                        isDisabled={isSigningOut}
                        className="h-11 w-full shrink-0 rounded-xl border border-[#d64545] bg-transparent px-5 font-semibold text-[#c53030] hover:bg-[#fdf2f2] sm:w-auto"
                    >
                        <SignOutIcon />
                        {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </Button>

                </div>
            </Card>

            {/* Card 2: Update name */}
            <Card className="rounded-2xl border border-[#e2e7e0] bg-[#fafbf9] p-4 shadow-none sm:rounded-3xl sm:p-6">

                <h2 className="text-lg font-semibold text-[#1c2b21] sm:text-xl">
                    তথ্য
                </h2>

                <Form
                    onSubmit={handleUpdate}
                    className="mt-5 flex w-full flex-col gap-5 sm:mt-6 sm:gap-6"
                >

                    {/* Name field */}
                    <TextField
                        name="name"
                        value={name}
                        onChange={setName}
                        className="flex w-full flex-col gap-2"
                    >
                        <Label className="font-medium text-[#1c2b21]">
                            নাম
                        </Label>

                        <Input
                            placeholder="আপনার নাম লিখুন"
                            className="h-12 w-full rounded-xl border border-[#e2e7e0] bg-[#fafbf9] px-4 shadow-none"
                        />
                    </TextField>

                    {/* Update button */}
                    <Button
                        type="submit"
                        isDisabled={isUpdating}
                        className="h-12 w-full rounded-xl bg-[#058a40] font-semibold text-white shadow-md shadow-[#058a40]/30 hover:bg-[#047a39]"
                    >
                        {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </Button>

                    {/* Success / error message */}
                    {message && (
                        <p
                            className={`text-sm ${message.type === "success"
                                    ? "text-[#058a40]"
                                    : "text-[#c53030]"
                                }`}
                        >
                            {message.text}
                        </p>
                    )}

                </Form>
            </Card>

        </div>
    );
};

export default ProfileView;