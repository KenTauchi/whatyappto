"use client";

import { Button } from "./ui/button";
import { DialogHeader, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useGenerateContent } from "@/hooks/useGenerateContent";
import { useState } from "react";

export const ClaudeAI = ({
  handleAcceptSuggestion,
}: {
  handleAcceptSuggestion: (values: string) => void;
}) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [prompt, setPrompt] = useState("");
  const { mutateAsync: generateContent, isLoading: isGenerating } = useGenerateContent();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
    setPrompt("");
  };

  const handleGeneratePrompt = async () => {
    try {
      const result = await generateContent(textAreaValue);
      setTextAreaValue("");
      setPrompt(result.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = () => {
    handleAcceptSuggestion(prompt);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ask AI to generate a post for you!</DialogTitle>
        <DialogDescription className="flex flex-col gap-4 items-end">
          <Textarea
            placeholder="eg. Create a post about my ..."
            className="my-4"
            onChange={handleTextAreaChange}
            value={prompt || textAreaValue}
          />
          <div className="flex flex-row gap-4">
            {!!prompt && (
              <Button type="button" disabled={isGenerating || !prompt} onClick={handleAccept}>
                Use it!
              </Button>
            )}
            <Button
              type="button"
              disabled={isGenerating || !textAreaValue}
              onClick={handleGeneratePrompt}
            >
              Ask
            </Button>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};
