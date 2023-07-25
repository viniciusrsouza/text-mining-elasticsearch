import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
