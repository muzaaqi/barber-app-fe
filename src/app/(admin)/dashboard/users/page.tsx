import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import UsersTable from "@/components/admin/user-table";

export const dynamic = "force-dynamic";
type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const HaircutsDashboard = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;

  const page =
    typeof resolvedSearchParams.page === "string"
      ? resolvedSearchParams.page
      : "1";

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="mb-4 text-3xl font-bold">Manajemen User</h1>
      </div>
      <Suspense
        key={page}
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <UsersTable page={page} />
      </Suspense>
    </div>
  );
};

export default HaircutsDashboard;
