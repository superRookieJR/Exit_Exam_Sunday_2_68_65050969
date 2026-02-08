import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma.lib';
import { UpdateComplaintDto } from '@/types/dtos/complaints.dto';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await prisma.complaints.findUnique({
            where: { id },
            include: {
                canteens: true,
                stalls: true,
                complaint_types: true,
                users: true,
                responses: true // Include responses as they are related
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
        const body: UpdateComplaintDto = await request.json();
        const data = await prisma.complaints.update({
            where: { id },
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
        await prisma.complaints.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
