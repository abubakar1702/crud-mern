import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Users } from './components/Users';
import Create from './components/Create';
import Update from './components/Update';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Users/>,
    },
    {
      path: "/add",
      element: <Create />
    },
    {
      path: "/edit/:id",
      element: <Update />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
