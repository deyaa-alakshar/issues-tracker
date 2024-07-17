import { Table } from "@radix-ui/themes";
import axios from "axios";
import { Issue, Status } from "@prisma/client";
import delay from "delay";
import IssuesActions from "./issuesActions";
import { IssueStatusBadge } from "../../components";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../_components/pagination";

interface Issues {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
}

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await axios.get(
    `http://localhost:3000/api/issues?status=${
      searchParams.status || "all"
    }&orderBy=${searchParams.orderBy}&page=${page}&pageSize=${pageSize}`
  );

  const columns: { label: string; value: keyof Issues; className?: string }[] =
    [
      { label: "Issue", value: "title" },
      { label: "Status", value: "status", className: "hidden md:table-cell" },
      {
        label: "Created",
        value: "createdAt",
        className: "hidden md:table-cell",
      },
    ];

  await delay(2000);

  return (
    <div>
      <IssuesActions />
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
          {issues.data.issues.map((issue: Issues) => (
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issues.data.issuesCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
