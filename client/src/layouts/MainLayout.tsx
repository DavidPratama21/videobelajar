import type { ReactElement } from "react";
import Header from "../components/organisems/Header";
import Footer from "../components/organisems/Footer"

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="bg-[#FFFDF3]">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
