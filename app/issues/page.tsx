import { Button, Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";

interface Issues {
  id: number;
  title: string;
  status: string;
  createdAt: Date;
}

const IssuesPage = async () => {
  const issues = await axios.get("http://localhost:3000/api/issues");

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
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
                {issue.title}{" "}
                <div className="block md:hidden">
                  <p>{issue.status}</p>
                  <p>{new Date(issue.createdAt).toDateString()}</p>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.status}
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

export default IssuesPage;
