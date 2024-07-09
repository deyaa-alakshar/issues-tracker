import { IssueStatusBadge } from "@/app/components";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await axios.get(
    `http://localhost:3000/api/issues/${parseInt(params.id)}`
  );

  if (!issue.data) notFound();

  if (typeof params.id !== "number") notFound;

  return (
    <Grid columns={{ initial: "1", sm: "1", md: "2" }} gap="5">
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
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.data.id}/edit`}>Edit</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
