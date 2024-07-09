import dynamic from "next/dynamic";
import IssueFormSkeleton from "../edit/[id]/loading";


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
