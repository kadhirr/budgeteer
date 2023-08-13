import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import { Error } from "./layouts/Error";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage,{expensesLoader} from "./pages/ExpensesPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction
        },
        {
          path: 'logout',
          action: logoutAction
        },
        {
          path: 'expenses',
          element: <ExpensesPage />,
          loader: expensesLoader
        }
      ]
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
