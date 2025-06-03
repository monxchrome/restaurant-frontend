"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiService } from "@/lib/apiService";
import { motion, AnimatePresence } from "framer-motion";
import {urls} from "@/lib/config";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiService.post(urls.login, { email, password });
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            router.push("/dashboard");
        } catch {
            setErrorVisible(true);
            setTimeout(() => setErrorVisible(false), 3000);
        }
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4"

            >
                <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-6 text-2xl font-semibold">Вход</h1>
                    <div className="mb-4">
                        <Label htmlFor="email" className="pb-2">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="password" className="pb-2">Пароль</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Войти</Button>
                </form>
            </div>

            <AnimatePresence>
                {errorVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-6 left-6 z-50"
                    >
                        <Alert variant="destructive">
                            <AlertDescription>Неверный логин или пароль</AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
