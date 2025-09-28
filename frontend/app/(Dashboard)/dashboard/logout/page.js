"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/libs/axios";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const logout = async () => {
            try {
                // Call backend logout
                await api.post("/logout");
                
                // Clear frontend tokens
                const { tokenManager } = await import('@/app/libs/tokenManager');
                tokenManager.removeToken();
                
                // Also clear using traditional method
                if (typeof window !== 'undefined') {
                    document.cookie = 'Token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
                
                // Force redirect to home
                window.location.href = "/";
            } catch (error) {
                console.error('Logout error:', error);
                
                // Even if backend fails, clear frontend tokens
                const { tokenManager } = await import('@/app/libs/tokenManager');
                tokenManager.removeToken();
                
                if (typeof window !== 'undefined') {
                    document.cookie = 'Token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
                    localStorage.removeItem('token');
                }
                
                window.location.href = "/";
            } finally {
                setIsLoading(false);
            }
        }
        logout();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Logging out...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <p className="text-gray-600">Logout completed. Redirecting...</p>
            </div>
        </div>
    );
};

export default Page;