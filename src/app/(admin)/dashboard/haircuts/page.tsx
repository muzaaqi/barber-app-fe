import AddHaircut from "@/components/admin/add-haircut";
import HaircutsTable from "@/components/admin/haircuts-table";

const HaircutsDashboard = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Haircut Models</h1>
        <AddHaircut />
      </div>
      <HaircutsTable />
    </div>
  );
};

export default HaircutsDashboard;
