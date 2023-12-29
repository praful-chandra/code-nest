import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotSignedInDialog = ({ children }: { children: React.ReactElement }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="background-light900_dark200 text-dark400_light900 ">
        <DialogHeader>
          <DialogTitle>This Action required you to Signin</DialogTitle>
          <DialogDescription className="flex-center h-24">
            <Link href="/signin">
              <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 ">
                Sign In
              </Button>
            </Link>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NotSignedInDialog;
