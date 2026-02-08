import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma.lib';
import { UpdateCanteenDto } from '@/types/dtos/canteens.dto';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await prisma.canteens.findUnique({
            where: { id: Number(id) },
            include: {
                departments: true,
                stalls: true,
            }
        });
        if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body: UpdateCanteenDto = await request.json();
        const data = await prisma.canteens.update({
            where: { id: Number(id) },
            data: body,
        });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.canteens.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
