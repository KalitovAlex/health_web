import { SideBar } from "@/features/side-bar/";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <SideBar />
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
}
