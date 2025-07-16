import StepDetail from "@/components/courses/Steps/StepDetail";


export default async function StepPage({ params }: { params: Promise<{ id: string, stepId: string }> }) {
  const resolvedParams = await params;
  
  console.log("hello", resolvedParams.stepId);
  return (
    <div className="min-h-screen bg-gray-50">
      <StepDetail params={resolvedParams} />
    </div>
  );
} 