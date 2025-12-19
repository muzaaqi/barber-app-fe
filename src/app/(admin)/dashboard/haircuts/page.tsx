import { Suspense } from "react";
import AddHaircut from "@/components/admin/add-haircut";
import HaircutsTable from "@/components/admin/haircuts-table";
import { Spinner } from "@/components/ui/spinner";

export const dynamic = "force-dynamic";
type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const HaircutsDashboard = ({ searchParams }: PageProps) => {
  const page = typeof searchParams.page === 'string' ? searchParams.page : '1';

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