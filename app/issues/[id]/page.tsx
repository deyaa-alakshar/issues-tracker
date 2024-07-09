import { Box, Grid } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import EditIssueButton from "./editIssueButton";
import IssueDetails from "./issueDetails";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await axios.get(
    `http://localhost:3000/api/issues/${parseInt(params.id)}`
  );

  if (!issue.data) notFound();

  if (typeof params.id !== "number") notFound;

  return (
    <Grid columns={{ initial: "1", sm: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue.data} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.data.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
