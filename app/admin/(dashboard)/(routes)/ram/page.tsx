import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { RamColumn } from "./components/columns";
import { RamClient } from "./components/client";

const RamPages = async ({ params }: { params: { storeId: string } }) => {
  const rams = await prismadb.ram.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: RamColumn[] = rams.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RamClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default RamPages;
