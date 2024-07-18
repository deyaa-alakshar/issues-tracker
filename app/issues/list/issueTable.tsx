import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export interface issueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Issues {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
}

interface Props {
  searchParams: issueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  return (
    <Table.Root variant="surface" my="2">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.Cell key={column.value} className={column.className}>
              <Link
                href={{ query: { ...searchParams, orderBy: column.value } }}
              >
                {column.label}
              </Link>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue: Issues) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <p>{issue.status}</p>
                <p>{new Date(issue.createdAt).toDateString()}</p>
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {new Date(issue.createdAt).toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
