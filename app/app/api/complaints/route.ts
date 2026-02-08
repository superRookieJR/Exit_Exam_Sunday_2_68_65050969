import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma.lib';
import { CreateComplaintDto } from '@/types/dtos/complaints.dto';
import { randomUUID } from 'crypto';

export async function GET() {
    try {
        const data = await prisma.complaints.findMany({
            include: {
                canteens: true,
                stalls: true,
                complaint_types: true,
                users: true
            }
        });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body: CreateComplaintDto = await request.json();
        const data = await prisma.complaints.create({
            data: {
                ...body,
                id: randomUUID(),
            },
        });
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
