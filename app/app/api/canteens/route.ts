import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma.lib';
import { CreateCanteenDto } from '@/types/dtos/canteens.dto';

export async function GET() {
    try {
        const data = await prisma.canteens.findMany({
            include: {
                departments: true,
                stalls: true,
            }
        });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body: CreateCanteenDto = await request.json();
        const data = await prisma.canteens.create({
            data: body,
        });
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
