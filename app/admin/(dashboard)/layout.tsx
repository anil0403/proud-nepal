import Navbar from "@/components/navbar"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  // const store = await prismadb.store.findFirst({
  //   where: {
  //     id: params.storeId,
  //     userId,
  //   }
  //  });

  // if (!store) {
  //   redirect('/');
  // };

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
