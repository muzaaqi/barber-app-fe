import { Suspense } from "react";
import AddHaircut from "@/components/admin/add-haircut";
import HaircutsTable from "@/components/admin/haircuts-table";
import { Spinner } from "@/components/ui/spinner";

export const dynamic = "force-dynamic";
type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const HaircutsDashboard = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams; 
  
  const page = typeof resolvedSearchParams.page === "string" 
    ? resolvedSearchParams.page 
    : "1";

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Haircut Models</h1>
        <AddHaircut />
      </div>
      <Suspense key={page} fallback={<div><Spinner/></div>}>
        <HaircutsTable page={page} />
      </Suspense>
    </div>
  );
};

export default HaircutsDashboard;