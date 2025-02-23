import prisma from "@/lib/prisma";
import { getDBUserId } from "./user.action";

export async function getSuggestedUsers() {
  const userId = await getDBUserId();
  const users = await prisma.user.findMany({
    where: {
      AND: [{ NOT: { id: userId } }, { NOT: { following: { some: { followingId: userId } } } }],
    },
  });

  return users;
}
