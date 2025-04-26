"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { LoaderIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Submit({ children, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? <LoaderIcon className="animate-spin text-white mr-2" /> : null}
      {children}
    </Button>
  );
}
