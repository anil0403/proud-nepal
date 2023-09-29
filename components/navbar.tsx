
import { ThemeToggle } from "@/components/theme-toggle"

import { MainNavAdmin } from "./main-nav_admin"

const Navbar =  () => {
  //   const { userId } = auth();

  //   if (!userId) {
  //     redirect('/sign-in');
  //   }

  //   const stores = await prismadb.store.findMany({
  //     where: {
  //       userId,
  //     }
  //   });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <StoreSwitcher items={stores} /> */}
        <MainNavAdmin />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
