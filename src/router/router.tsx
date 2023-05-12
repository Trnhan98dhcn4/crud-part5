import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Crud, Home } from "../features";

function Router() {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </Routers>
  );
}

export default Router;
