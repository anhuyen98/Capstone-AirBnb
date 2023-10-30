import { Footer, Header } from "components";
import { Outlet } from "react-router-dom";
export const MainLayouts = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
