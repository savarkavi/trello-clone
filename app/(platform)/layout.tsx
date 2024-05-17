import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <main className="h-full">{children}</main>
    </ClerkProvider>
  );
};

export default PlatformLayout;
