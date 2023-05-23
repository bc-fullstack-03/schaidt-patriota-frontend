import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import SingUp from "./pages/SingUp";


const router = createBrowserRouter([
  {
    path: "/", element: <Login />
  },
  {
    path: "singup", element: <SingUp />
  }

])

function App() {
  return <RouterProvider router={router} />
}

export default App
