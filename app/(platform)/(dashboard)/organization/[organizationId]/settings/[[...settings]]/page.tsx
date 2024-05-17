import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div className="p-8 flex justify-center">
      <OrganizationProfile />
    </div>
  );
};

export default SettingsPage;
