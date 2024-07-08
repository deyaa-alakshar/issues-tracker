import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await axios.get(
    `http://localhost:3000/api/issues/${parseInt(params.id)}`
  );

  if (!issue.data) notFound();

  if (typeof params.id !== "number") notFound;

  return (
    <div>
      <p>{issue.data.title}</p>
      <p>{issue.data.description}</p>
      <p>{issue.data.status}</p>
      <p>{issue.data.createdAt}</p>
    </div>
  );
};

export default IssueDetailPage;
