import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ColorColumn } from "./components/columns"
import { ColorClient } from "./components/client";

const ColorsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
