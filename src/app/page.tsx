import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CreatePost from "@/components/CreatePost";
import { currentUser } from "@clerk/nextjs/server";
import { getPosts } from "@/actions/post.action";
import SuggestedUsersList from "@/components/SuggestedUsersList";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();

  return (
    <div className="grid gird-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">{user ? <CreatePost /> : null}</div>
      <div className="hidden lg:block lg:col-span-4">
        <SuggestedUsersList />
      </div>
    </div>
  );
}
