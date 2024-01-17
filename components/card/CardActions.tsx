"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Link from "next/link";

type CardActionProps = {
  type: "question" | "answer";
  typeId: string;
  authorId: string;
  onEditRedirect?: string;
};

const CardActions = ({
  type,
  typeId,
  authorId,
  onEditRedirect,
}: CardActionProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();

  const handleDelete = () => {
    setIsDeleting(true);
    if (type === "answer") {
      deleteAnswer({ answerId: typeId, path: pathname }).finally(() => {
        setIsDeleting(false);
      });
    } else {
      deleteQuestion({ questionId: typeId, path: pathname }).finally(() => {
        setIsDeleting(false);
      });
    }
  };

  return (
    <div className="flex-center">
      {type === "question" && (
        <Link href={onEditRedirect ?? ""}>
          <Button className="pr-[2px]">
            <Image
              src="/assets/icons/edit.svg"
              width={16}
              height={16}
              alt="Edit"
            />
          </Button>
        </Link>
      )}

      <Button className="pl-[2px]" onClick={handleDelete} disabled={isDeleting}>
        <Image
          src="/assets/icons/trash.svg"
          width={21}
          height={21}
          alt="Delete"
        />
      </Button>
    </div>
  );
};

export default CardActions;
