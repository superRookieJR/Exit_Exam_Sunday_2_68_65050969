import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma.lib';
import { CreateComplaintTypeDto } from '@/types/dtos/complaint_types.dto';

export async function GET() {
    try {
        const data = await prisma.complaint_types.findMany();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body: CreateComplaintTypeDto = await request.json();
        const data = await prisma.complaint_types.create({
            data: body,
        });
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
