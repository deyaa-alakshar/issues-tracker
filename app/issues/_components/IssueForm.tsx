"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";
import SimpleMdeReact from "react-simplemde-editor";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
      setIsSubmiting(false);
    } catch (error) {
      setError("An unexpected error occurrd");
      setIsSubmiting(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className=" space-y-3">
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
          defaultValue={issue?.description}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmiting} type="submit">
          {issue ? "Update issue" : "Submit new Issue"}{" "}
          {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
