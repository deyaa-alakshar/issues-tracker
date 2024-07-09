import { Box, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import EditIssueButton from "./editIssueButton";
import IssueDetails from "./issueDetails";
import DeleteIssueButton from "./deleteIssueButton";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await axios.get(
    `http://localhost:3000/api/issues/${parseInt(params.id)}`
  );

  if (!issue.data) notFound();

  if (typeof params.id !== "number") notFound;

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue.data} />
      </Box>
      <Box>
        <Flex gap="4" direction="column">
          <EditIssueButton issueId={issue.data.id} />
          <DeleteIssueButton issueId={issue.data.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
