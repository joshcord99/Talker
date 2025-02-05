import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/footer";
import Banner from "../pages/banner";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/createaccount";

  return (
    <div>
      {(isHomePage || isAuthPage) && <Banner />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
