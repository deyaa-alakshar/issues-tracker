import { Box, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import EditIssueButton from "./editIssueButton";
import IssueDetails from "./issueDetails";
import DeleteIssueButton from "./deleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./assigneeSelect";
import { cache } from "react";

const fetchIssue = cache((issueId: number) =>
  axios.get(`http://localhost:3000/api/issues/${issueId}`)
);

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await fetchIssue(parseInt(params.id));

  const session = await getServerSession(authOptions);

  if (!issue.data) notFound();

  if (typeof params.id !== "number") notFound;

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue.data} />
      </Box>
      {session && (
        <Box>
          <Flex gap="4" direction="column">
            <AssigneeSelect issue={issue.data} />
            <EditIssueButton issueId={issue.data.id} />
            <DeleteIssueButton issueId={issue.data.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue.data?.title,
    description: issue?.data.description,
  };
}

export default IssueDetailPage;
