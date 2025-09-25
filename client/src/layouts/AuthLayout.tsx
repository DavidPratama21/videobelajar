import type { ReactElement } from "react";
import Header from "../components/organisems/Header";

const AuthLayout = ({children}: {children: ReactElement}) => {
  return(
    <div className="bg-[#FFFDF3]">
      <Header />
      <main className="pt-20">{children}</main>
    </div>
  )
}

export default AuthLayout