"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Avatar,
    Button,
    Card,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

// Change this path if your auth client file is named differently
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


// Profile component
const ProfileView = ({ user }) => {
    const router = useRouter();

    // Input value (starts with the current name)
    const [name, setName] = useState(user.name ?? "");

    // Loading states for the two buttons
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    // Message shown under the update button: { type: "success" | "error", text }
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

        // Do not allow an empty name
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


    // UI
    return (
        <div className="flex flex-col">

            {/* Page heading */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#1c2b21]">আমার প্রোফাইল</h1>
                <p className="mt-1 text-[#5f6b63]">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>


            {/* Card 1: user info + sign out */}
            <Card className="mb-6 rounded-3xl border border-[#e2e7e0] bg-[#fafbf9] p-7.5 shadow-none">
                <div className="flex items-center justify-between gap-4">

                    {/* Avatar + name + email */}
                    <div className="flex items-center gap-5">
                        <Avatar className="size-24 rounded-[20px] bg-[#f0f0f0]">
                            <Avatar.Image
                                src={user.image ?? undefined}
                                alt={user.name ?? "Profile"}
                                className="rounded-[20px]"
                            />
                            <Avatar.Fallback className="rounded-[20px] text-2xl font-semibold text-[#1c2b21]">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </Avatar.Fallback>
                        </Avatar>

                        <div>
                            <p className="text-2xl font-medium text-[#1c2b21]">{user.name}</p>
                            <p className="text-lg text-[#6b7280]">{user.email}</p>
                        </div>
                    </div>

                    {/* Sign out button */}
                    <Button
                        variant="outline"
                        onPress={handleSignOut}
                        isDisabled={isSigningOut}
                        className="h-11 rounded-xl border border-[#d64545] bg-transparent px-5 font-semibold text-[#c53030] hover:bg-[#fdf2f2]"
                    >
                        <SignOutIcon />
                        সাইন আউট
                    </Button>

                </div>
            </Card>


            {/* Card 2: update name form */}
            <Card className="rounded-3xl border border-[#e2e7e0] bg-[#fafbf9] p-6 shadow-none">

                {/* Card title */}
                <h2 className="text-lg font-semibold text-[#1c2b21]">তথ্য</h2>

                {/* Form */}
                <Form
                    onSubmit={handleUpdate}
                    className="mt-6 flex flex-col gap-5 px-7 pb-4"
                >

                    {/* Name field */}
                    <TextField
                        name="name"
                        value={name}
                        onChange={setName}
                        className="flex w-full flex-col gap-2"
                    >
                        <Label className="font-medium text-[#1c2b21]">নাম</Label>
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
                            className={`text-sm ${message.type === "success" ? "text-[#058a40]" : "text-[#c53030]"
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