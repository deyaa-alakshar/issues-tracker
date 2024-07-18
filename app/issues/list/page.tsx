import { Issue, Status } from "@prisma/client";
import axios from "axios";
import delay from "delay";
import Pagination from "../_components/pagination";
import IssuesActions from "./issuesActions";
import IssueTable, { issueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: issueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await axios.get(
    `http://localhost:3000/api/issues?status=${
      searchParams.status || "all"
    }&orderBy=${searchParams.orderBy}&page=${page}&pageSize=${pageSize}`
  );

  await delay(2000);

  return (
    <Flex gap="4" direction="column">
      <IssuesActions />
      <IssueTable searchParams={searchParams} issues={issues.data.issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issues.data.issuesCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
