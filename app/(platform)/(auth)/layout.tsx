const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
