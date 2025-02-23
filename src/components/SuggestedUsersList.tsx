import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getSuggestedUsers } from "@/actions/suggest.action";
import React from "react";

export default async function SuggestedUsersList() {
  const users = await getSuggestedUsers();

  return <div>SuggestedUsersList</div>;
}
