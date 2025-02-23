import { useMutation } from "react-query";

const generateContent = async (message: string) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in generateContent:", error);
  }
};

export const useGenerateContent = () => {
  const mutation = useMutation({
    mutationFn: generateContent,
  });

  return mutation;
};
