"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStalls } from "@/hooks/stalls.hook";
import { useComplaints } from "@/hooks/complaints.hook";
import { ChevronLeft, Store, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";

export default function StallsPage() {
    const router = useRouter();
    const { data: stalls, loading: stallsLoading, findAll: findAllStalls } = useStalls();
    const { data: complaints, loading: complaintsLoading, findAll: findAllComplaints } = useComplaints();

    useEffect(() => {
        findAllStalls();
        findAllComplaints();
    }, [findAllStalls, findAllComplaints]);

    const getComplaintCount = (stallId: number) => {
        return complaints.filter((c) => c.stall_id === stallId).length;
    };

    const isLoading = stallsLoading || complaintsLoading;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Button
                        onClick={() => router.push("/")}
                        variant="ghost"
                        size="sm"
                        className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <h1 className="text-4xl font-extrabold tracking-tight">Food Stalls</h1>
                </div>
            </div>

            {isLoading && (
                <div className="flex justify-center py-12">
                    <p className="text-muted-foreground animate-pulse font-medium">Loading stalls...</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stalls.map((stall) => {
                    const count = getComplaintCount(stall.id);
                    return (
                        <Card key={stall.id} className="group hover:shadow-lg transition-all duration-200 border-border/50 overflow-hidden rounded-2xl">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                                        <Store className="w-5 h-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl font-bold">{stall.name}</CardTitle>
                                </div>
                                <CardDescription className="flex items-center gap-1.5 text-sm">
                                    <MapPin className="w-3.5 h-3.5" />
                                    Canteen: {stall.canteens?.name || "Unknown"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${count > 0
                                        ? "bg-destructive/5 border-destructive/10 text-destructive"
                                        : "bg-green-50/50 border-green-100 text-green-700"
                                    }`}>
                                    <div className="flex items-center gap-2">
                                        {count > 0 ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                        <span className="text-sm font-semibold uppercase tracking-wider">Reports</span>
                                    </div>
                                    <span className="text-2xl font-black">{count}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {!isLoading && stalls.length === 0 && (
                <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted mt-8">
                    <p className="text-muted-foreground font-medium">No stalls found.</p>
                </div>
            )}
        </div>
    );
}
