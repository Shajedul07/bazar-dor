
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ProfileView from "@/components/ProfileView";



const ProfilePage = async () => {

    // Get the logged-in user's session on the server
    const session = await auth.api.getSession({
        headers: await headers(),
    });


    // If the user is not logged in, send them to the sign in page
    if (!session) {
        redirect("/sign-in");
    }


    // Send only plain values to the client component
    const { name, email, image } = session.user;


    return (
        <section className="min-h-screen w-full bg-[#f0f5f0]">

            {/* Centered content container */}
            <div className="mx-auto w-full max-w-4xl px-4 py-8">
                <ProfileView user={{ name, email, image }} />
            </div>

        </section>
    );
};

export default ProfilePage;