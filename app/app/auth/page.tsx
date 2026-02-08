"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (!email) return;
        localStorage.setItem("user_email", email);
        router.push("/");
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <Card className="w-full max-w-md shadow-2xl shadow-primary/5 border-border/50 rounded-3xl overflow-hidden">
                <CardHeader className="pt-10 pb-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-4">
                        <LogIn className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-extrabold tracking-tight">Welcome</CardTitle>
                    <CardDescription className="text-base mt-2">
                        Enter your email to access your workspace
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pb-12 px-8">
                    <div className="space-y-2">
                        <Input
                            placeholder="name@example.com"
                            type="email"
                            className="h-12 rounded-xl border-border/60 focus-visible:ring-primary/20"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        />
                    </div>
                    <Button onClick={handleLogin} className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/10 hover:translate-y-[-1px] transition-all">
                        Sign In
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        By continuing, you agree to our Terms of Service.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
