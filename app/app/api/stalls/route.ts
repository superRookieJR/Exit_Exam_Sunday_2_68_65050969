import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma.lib';
import { CreateStallDto } from '@/types/dtos/stalls.dto';

export async function GET() {
    try {
        const data = await prisma.stalls.findMany({
            include: {
                canteens: true
            }
        });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body: CreateStallDto = await request.json();
        const data = await prisma.stalls.create({
            data: body,
        });
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
