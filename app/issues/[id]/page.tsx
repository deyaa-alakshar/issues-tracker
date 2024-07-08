import { IssueStatusBadge } from "@/app/components";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";


const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await axios.get(
    `http://localhost:3000/api/issues/${parseInt(params.id)}`
  );

  if (!issue.data) notFound();

  if (typeof params.id !== "number") notFound;

  return (
    <Box>
      <Heading>{issue.data.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.data.status} />
        <Text>{issue.data.createdAt}</Text>
      </Flex>
      <Card className="prose">
        <Markdown>{issue.data.description}</Markdown>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;
