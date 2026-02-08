"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useComplaints } from "@/hooks/complaints.hook";
import { useStalls } from "@/hooks/stalls.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, ClipboardList, Store } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { data: complaints, findAll: findAllComplaints } = useComplaints();
  const { data: stalls, findAll: findAllStalls } = useStalls();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    if (!email) {
      router.push("/auth");
    } else {
      setUserEmail(email);
      findAllComplaints();
      findAllStalls();
    }
  }, [router, findAllComplaints, findAllStalls]);

  const activeComplaints = complaints.filter(c => c.status !== "COMPLETED" && c.status !== "REJECTED").length;
  const completedComplaints = complaints.filter(c => c.status === "COMPLETED").length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Overview</h1>
          <p className="text-muted-foreground">Welcome back, <span className="text-foreground font-medium">{userEmail}</span></p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-4"
          onClick={() => {
            localStorage.removeItem("user_email");
            router.push("/auth");
          }}
        >
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <CardDescription className="font-medium">Active Tasks</CardDescription>
              <ClipboardList className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold">{activeComplaints}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Currently being processed</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <CardDescription className="font-medium">Completed</CardDescription>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </div>
            <CardTitle className="text-4xl font-bold">{completedComplaints}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Successfully resolved issues</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <CardDescription className="font-medium">Total Stalls</CardDescription>
              <Store className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-4xl font-bold">{stalls.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Managed food stalls</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Button
          size="lg"
          variant="default"
          className="h-32 rounded-2xl flex flex-col items-center justify-center gap-2 group shadow-lg shadow-primary/5 hover:translate-y-[-2px] transition-all"
          onClick={() => router.push("/complaints")}
        >
          <span className="text-lg font-bold">Manage Complaints</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="h-32 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:translate-y-[-2px] transition-all"
          onClick={() => router.push("/stalls")}
        >
          <span className="text-lg font-bold">View Food Stalls</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
