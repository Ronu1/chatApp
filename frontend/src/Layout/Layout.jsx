import { Outlet, useLocation } from "react-router-dom";
import Home from "../Pages/Home";

const Layout = () => {
  const location = useLocation();
  const excludedPaths = ["/login", "/signup", "*" ];
  const shouldRenderHeader = !excludedPaths.includes(location.pathname);
  return (
    <>
      {shouldRenderHeader && (<> <Home/></>)}
      <Outlet />
    </>
  );
};
export default Layout;
