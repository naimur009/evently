"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "@/app/libs/axios";

const Page = () => {
    const router = useRouter();

    useEffect(()=>{
        const logout = async ()=>{
            await api.post("/logout");
            router.push("/");
        }
        logout();
    }, [router])

    return
        <div>

        </div>
};

export default Page;