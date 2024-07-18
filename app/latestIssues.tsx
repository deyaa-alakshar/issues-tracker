import { Status, User } from "@prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  assignedToUserId: string;
  assignedToUser: User | null;
}

const LatestIssues = async () => {
  const issues = await axios.get(
    `http://localhost:3000/api/issues?latest=true`
  );

  return (
    <Card>
        <Heading size="2">Latest issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.data?.map((issue: Issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
