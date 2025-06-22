"use client"

import Intro from "@/app/(home)/_components/intro";
import Stats from "@/app/(home)/_components/stats";
import Articles from "@/app/(home)/_components/articles";

export default function Page() {
    return (
        <>
            <Intro/>
            <Stats/>
            <Articles/>
        </>
    );
};