import Sidebar from "../_components/Sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex">
      <div className="w-[350px] shrink-0 hidden xl:block">
        <Sidebar />
      </div>
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default OrganizationLayout;
