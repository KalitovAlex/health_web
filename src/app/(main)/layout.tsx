import { SideBar } from "@/features/side-bar/";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen mt-5 md:mt-0">
      <SideBar />
      <main className="h-screen flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
