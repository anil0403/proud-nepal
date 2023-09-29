import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CoreColumns } from "./components/columns";
import { CoreClient } from "./components/client";

const CorePage = async ({ params }: { params: { storeId: string } }) => {
  const Core = await prismadb.core.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCores: CoreColumns[] = Core.map((item) => ({
    id: item.id,
    core: item.core,
    thread: item.thread,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CoreClient data={formattedCores} />
      </div>
    </div>
  );
};

export default CorePage;
