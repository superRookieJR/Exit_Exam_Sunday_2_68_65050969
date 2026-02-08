"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useComplaints } from "@/hooks/complaints.hook";
import { ChevronLeft, MessageSquare, History } from "lucide-react";

export default function ComplaintDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const { selected: complaint, loading, error, findOne } = useComplaints();

    useEffect(() => {
        if (id) {
            findOne(id);
        }
    }, [id, findOne]);

    if (loading) return (
        <div className="max-w-4xl mx-auto px-4 py-12 flex justify-center">
            <p className="text-muted-foreground animate-pulse font-medium">Loading details...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="p-4 rounded-xl bg-destructive/5 text-destructive border border-destructive/10">
                <p className="font-semibold text-sm">Error: {error}</p>
            </div>
        </div>
    );

    if (!complaint) return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <p className="text-muted-foreground font-medium">Complaint not found</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Button
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="shadow-sm border-border/50 rounded-2xl overflow-hidden">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-center mb-4">
                                <Badge variant={complaint.status === "COMPLETED" ? "default" : "secondary"} className="rounded-full">
                                    {complaint.status?.replace("_", " ")}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-medium flex items-center">
                                    <History className="w-3 h-3 mr-1" />
                                    {new Date(complaint.created_at || "").toLocaleDateString()}
                                </span>
                            </div>
                            <CardTitle className="text-3xl font-extrabold tracking-tight">{complaint.code}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Description</h3>
                                <p className="text-lg leading-relaxed">{complaint.details}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Responses
                        </h2>
                        <div className="space-y-4">
                            {complaint.responses && complaint.responses.length > 0 ? (
                                complaint.responses.map((response: any) => (
                                    <div key={response.id} className="relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/10 before:rounded-full">
                                        <Card className="border-border/40 shadow-none bg-muted/5">
                                            <CardContent className="pt-6">
                                                <p className="text-base text-foreground/90">{response.message}</p>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-3">
                                                    {new Date(response.created_at || "").toLocaleString()}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
                                    <p className="text-muted-foreground text-sm font-medium">No responses yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="sticky top-24 border-primary/10 bg-primary/5 shadow-none rounded-2xl overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Actions</CardTitle>
                            <CardDescription>Update this complaint</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => router.push(`/complaints/${id}/response`)}
                                className="w-full font-bold shadow-lg shadow-primary/20 rounded-xl py-6"
                                disabled={complaint.status === "COMPLETED"}
                            >
                                {complaint.status === "COMPLETED" ? "Case Resolved" : "Submit Response"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
