import { Outlet } from "react-router-dom";
import Footer from "../pages/footer";
import Logo from "../pages/logo";

function App() {
  return (
    <div >
      <Logo />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
