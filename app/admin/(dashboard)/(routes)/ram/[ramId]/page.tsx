import prismadb from "@/lib/prismadb";

import { RamForm } from "./components/ram-form";

const RamPage = async ({ params }: { params: { ramId: string } }) => {
  const size = await prismadb.ram.findUnique({
    where: {
      id: params.ramId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RamForm initialData={size} />
      </div>
    </div>
  );
};

export default RamPage;
