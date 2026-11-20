"use client";

import { ProgressCircle } from "@heroui/react";

export default function Loading() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <ProgressCircle
                isIndeterminate
                aria-label="লোড হচ্ছে"
                color="success"
                size="lg"
            >
                <ProgressCircle.Track>
                    <ProgressCircle.TrackCircle />
                    <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
            </ProgressCircle>
        </div>
    );
}