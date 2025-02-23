import { Button } from "@/components/ui/button";
import {
  Dialog as RadixDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Dialog({
  title,
  description,
  triggerText,
  open,
  handleDialogVisibility,
  children,
}: {
  title: string;
  description: string;
  triggerText: string;
  open: boolean;
  handleDialogVisibility: (visibility: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <RadixDialog open={open} onOpenChange={handleDialogVisibility}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </RadixDialog>
  );
}
