import { Outlet, useLocation } from "react-router-dom";
import Footer from "./pages/Footer";
import Banner from "./pages/Banner";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      {isHomePage && <Banner />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
