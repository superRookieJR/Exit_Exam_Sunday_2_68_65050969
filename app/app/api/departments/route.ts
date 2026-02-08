import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma.lib';
import { CreateDepartmentDto } from '@/types/dtos/departments.dto';

export async function GET() {
    try {
        const data = await prisma.departments.findMany();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body: CreateDepartmentDto = await request.json();
        const data = await prisma.departments.create({
            data: body,
        });
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
