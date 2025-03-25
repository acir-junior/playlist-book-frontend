"use client";

import { useTheme } from "next-themes";
import { ThreeDot } from "react-loading-indicators";

export function Loading() {
    const { theme } = useTheme();

    return (
        <ThreeDot color={theme === 'dark' ? '#FFF' : '#000'} size="medium" />
    )
}