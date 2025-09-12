"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "@/app/libs/axios";

const page = () => {
    const router = useRouter();

    useEffect(()=>{
        const logout = async ()=>{
            await api.post("/logout");
            router.push("/");
        }
        logout();
    }, [])

    return
        <div>

        </div>
};

export default page;