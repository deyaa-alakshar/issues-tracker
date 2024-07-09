import axios from "axios";
import IssueForm from "../../_components/IssueForm";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await axios.get(
    `http://localhost:3000/api/issues/${parseInt(params.id)}`
  );

  return (
    <div>
      <IssueForm issue={issue.data} />
    </div>
  );
};

export default EditIssuePage;
