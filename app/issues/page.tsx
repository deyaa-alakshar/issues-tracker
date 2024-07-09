import { Table } from "@radix-ui/themes";
import axios from "axios";
import { Status } from "@prisma/client";
import delay from "delay";
import IssuesActions from "./issuesActions";
import { IssueStatusBadge, Link } from "../components";

interface Issues {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
}

const IssuesPage = async () => {
  const issues = await axios.get("http://localhost:3000/api/issues");
  await delay(2000);

  return (
    <div>
      <IssuesActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.Cell>Issue</Table.Cell>
            <Table.Cell className="hidden md:table-cell">Status</Table.Cell>
            <Table.Cell className="hidden md:table-cell">Created</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.data.map((issue: Issues) => (
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
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
