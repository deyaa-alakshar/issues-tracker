import axios from "axios";
import LatestIssues from "./latestIssues";
import { Status, User } from "@prisma/client";
import IssueSummery from "./issueSummery";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./issueChart";

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  assignedToUserId: string;
  assignedToUser: User | null;
}

export default async function Home() {
  const { data } = await axios.get(
    `http://localhost:3000/api/issues?latest=true`
  );
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummery
          open={data.open}
          closed={data.closed}
          inProgress={data.inProgress}
        />
        <IssueChart
          open={data.open}
          closed={data.closed}
          inProgress={data.inProgress}
        />
      </Flex>
      <LatestIssues issues={data.issues} />
    </Grid>
  );
}
