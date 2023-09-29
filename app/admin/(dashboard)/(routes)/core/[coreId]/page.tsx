import prismadb from "@/lib/prismadb";

import { CoreForm } from "./components/core-form";

const CorePage = async ({ params }: { params: { coreId: string } }) => {
  const Core = await prismadb.core.findUnique({
    where: {
      id: params.coreId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CoreForm initialData={Core} />
      </div>
    </div>
  );
};

export default CorePage;
