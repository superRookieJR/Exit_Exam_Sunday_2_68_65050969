import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma.lib';
import { CreateResponseDto } from '@/types/dtos/responses.dto';
import { randomUUID } from 'crypto';

export async function GET() {
    try {
        const data = await prisma.responses.findMany({
            include: {
                users: true,
                complaints: true
            }
        });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body: CreateResponseDto = await request.json();
        const data = await prisma.responses.create({
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
