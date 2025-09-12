"use client"
import api from "@/app/libs/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = ({ params }) => {

    const router = useRouter();

    useEffect(() => {
        const deleteFunc = async () => {
            try {
                const { eventID } = await params;
                const response = await api.delete(`/event/${eventID}`);
                router.push("/dashboard/events")
                return
            } catch (error) {
                console.log(error.message); 
                router.push("/dashboard/events")
                return;
            }
        }
        deleteFunc();
    }, [params, router])
};

export default Page;