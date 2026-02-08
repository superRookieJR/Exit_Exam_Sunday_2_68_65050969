import { prisma } from "./prisma.lib";

export async function getAuthUser(request: Request) {
  const email = request.headers.get('x-user-email');
  
  if (!email) return null;

  return await prisma.users.findUnique({
    where: { email },
    include: { roles: true }
  });
}