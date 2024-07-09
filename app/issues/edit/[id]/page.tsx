import axios from "axios";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await axios.get(
    `http://localhost:3000/api/issues/${parseInt(params.id)}`
  );

  const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  });

  return (
    <div>
      <IssueForm issue={issue.data} />
    </div>
  );
};

export default EditIssuePage;
