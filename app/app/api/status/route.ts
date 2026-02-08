import { prisma } from '@/libs/prisma.lib';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. ลองดึงข้อมูลสรุปสถานะการร้องเรียน
    const statusCounts = await prisma.complaints.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    // 2. ดึงสถิติจำนวนรวมของโรงอาหารและร้านค้า
    const [canteenCount, stallCount, totalComplaints] = await Promise.all([
      prisma.canteens.count(),
      prisma.stalls.count(),
      prisma.complaints.count(),
    ]);

    return NextResponse.json({
      success: true,
      database: "Connected",
      stats: {
        canteens: canteenCount,
        stalls: stallCount,
        total_complaints: totalComplaints,
        breakdown: statusCounts,
      },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, error: "Database connection failed" },
      { status: 500 }
    );
  }
}