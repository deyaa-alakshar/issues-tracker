import dynamic from "next/dynamic";
import IssueFormSkeleton from "../[id]/edit/loading";


const NewIssue = () => {
  const IssueForm = dynamic(() => import("../_components/IssueForm"), {
    ssr: false, loading: () => <IssueFormSkeleton />
  });
  return (
    <div>
      <IssueForm />
    </div>
  );
};

export default NewIssue;
