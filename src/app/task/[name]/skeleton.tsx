import Attachments from "./attachments/page";
import Submit from "./submit/page";
import Tags from "./tags/page";

type Props = {
  params: { name: string };
};

export function Skeleton({ params }: Props) {
  return (
    <div className="flex items-stretch gap-4">
      <div className="skeleton min-h-screen grow overflow-hidden rounded-lg" />
      <div className="basis-72 max-lg:hidden">
        <Submit params={params} />
        <Attachments params={params} />
        <Tags params={params} />
      </div>
    </div>
  );
}
