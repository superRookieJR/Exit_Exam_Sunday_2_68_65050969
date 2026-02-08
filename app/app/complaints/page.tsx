"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useComplaints } from "@/hooks/complaints.hook";
import { ChevronLeft, Plus } from "lucide-react";

export default function ComplaintsPage() {
    const router = useRouter();
    const { data, loading, error, findAll } = useComplaints();

    useEffect(() => {
        findAll();
    }, [findAll]);

    const sortedComplaints = useMemo(() => {
        return [...data].sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime();
            const dateB = new Date(b.created_at || 0).getTime();
            return dateB - dateA;
        });
    }, [data]);

    const getStatusVariant = (status: string | null): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case "COMPLETED": return "default";
            case "IN_PROGRESS": return "secondary";
            case "REJECTED": return "destructive";
            case "CANCELLED": return "outline";
            default: return "secondary";
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
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
                    <h1 className="text-4xl font-extrabold tracking-tight">Complaints</h1>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center py-12">
                    <p className="text-muted-foreground animate-pulse font-medium">Loading complaints...</p>
                </div>
            )}
            {error && <p className="text-destructive font-medium mb-6">Error: {error}</p>}

            <div className="grid gap-4">
                {sortedComplaints.map((complaint) => (
                    <Card
                        key={complaint.id}
                        className="group hover:shadow-md transition-all duration-200 border-border/50 overflow-hidden"
                    >
                        <div className="p-1 sm:p-0">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start gap-4">
                                    <Badge variant={getStatusVariant(complaint.status)} className="rounded-full px-3">
                                        {complaint.status?.replace("_", " ")}
                                    </Badge>
                                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                                        {new Date(complaint.created_at || "").toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                                        {complaint.code}
                                    </CardTitle>
                                    <CardDescription className="text-sm line-clamp-2 mt-1 leading-relaxed">
                                        {complaint.details}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0 flex justify-end">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="font-semibold text-primary hover:bg-primary/5"
                                    onClick={() => router.push(`/complaints/${complaint.id}`)}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </div>
                    </Card>
                ))}
                {!loading && sortedComplaints.length === 0 && (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted">
                        <p className="text-muted-foreground font-medium">No complaints found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
