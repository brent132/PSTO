import ProjectDetailHeader from "./components/project-detail-header";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <ProjectDetailHeader id={id} />
    </div>
  );
}
