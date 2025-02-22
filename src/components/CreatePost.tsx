"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormTextarea from "./Form/FormTextarea";
import { Form as FormProvider } from "./ui/form";
import { toast } from "sonner";
import { createPost } from "@/actions/post.action";
export default function CreatePost() {
  const { user } = useUser();

  const formSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createPost(values.content);

      if (response.success) {
        toast.success("Post created successfully");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  if (!user) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-row gap-4 w-full">
              <Avatar>
                <AvatarImage src={user?.imageUrl || ""} />
              </Avatar>
              <FormTextarea
                name="content"
                label=""
                type="text"
                placeholder="What's on your mind?"
                inputClassName="border-none"
                itemClassName="w-full m-0"
              />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-row justify-end gap-4 w-full">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
