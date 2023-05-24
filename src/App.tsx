import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import Friends from "./pages/Friends";
import PostDetail from "./pages/PostDetail";


const router = createBrowserRouter([
  {
    path: "/", element: <Login />
  },
  {
    path: "singup", element: <SingUp />
  },
  {
    path: "/home", element: <Home />
  },
  {
    path: "/profile", element: <ProfilePage />
  },
  {
    path: "/friends", element: <Friends />
  },
  {
    path: "/posts/:postId", element: <PostDetail />
  }

])

function App() {
  return <RouterProvider router={router} />
}

export default App
