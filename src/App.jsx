import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
