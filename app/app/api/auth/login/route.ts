import { prisma } from '@/libs/prisma.lib';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.users.findUnique({
      where: { email },
      include: { roles: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      role: user.roles.name
    });

  } catch (error) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}