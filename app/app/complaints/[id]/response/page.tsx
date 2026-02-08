"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResponses } from "@/hooks/responses.hook";
import { useComplaints } from "@/hooks/complaints.hook";
import { ChevronLeft, SendHorizontal } from "lucide-react";

export default function ResponsePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const { create: createResponse, isSubmitting } = useResponses();
    const { update: updateComplaint } = useComplaints();
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!message.trim()) return;

        try {
            await createResponse({
                complaint_id: id,
                message: message,
                user_id: undefined
            });

            await updateComplaint(id, { status: "COMPLETED" });
            router.push(`/complaints/${id}`);
        } catch (error) {
            console.error("Failed to response:", error);
            alert("Failed to submit response");
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Button
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
            >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Cancel
            </Button>

            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Submit Response</h1>
                    <p className="text-muted-foreground">Provide a detailed resolution or update for this complaint.</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-1">Message</label>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe the action taken or your response..."
                            rows={8}
                            className="rounded-2xl border-border/60 focus-visible:ring-primary/20 p-4 text-base resize-none bg-muted/5 shadow-inner"
                        />
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !message.trim()}
                        className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/10 hover:translate-y-[-2px] transition-all group"
                    >
                        {isSubmitting ? "Submitting..." : (
                            <span className="flex items-center gap-2">
                                Send Response
                                <SendHorizontal className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
