import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";
import prisma from "@/lib/prisma";
import { getUserByClerkId } from "@/actions/user.action";

export async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;

  const userInfo = await getUserByClerkId(authUser.id);

  if (!userInfo) {
    console.error(`User with Clerk ID ${authUser.id} not found in database`);
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${userInfo.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
                <AvatarImage src={userInfo.image || "/avatar.png"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{userInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{userInfo.username}</p>
              </div>
            </Link>

            {userInfo.bio && <p className="mt-3 text-sm text-muted-foreground">{userInfo.bio}</p>}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{userInfo._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{userInfo._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {userInfo.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {userInfo.website ? (
                  <a
                    href={`${userInfo.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                  >
                    {userInfo.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">Welcome Back!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Login to access your profile and connect with others.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="w-full mt-2" variant="default">
            Sign Up
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);
