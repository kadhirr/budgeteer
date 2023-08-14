import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import { Error } from "./layouts/Error";
import { deleteBudget } from "./actions/deleteBudget";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

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
          loader: expensesLoader,
          action: expensesAction,
          errorElement: <Error />,
        },
        {
          path: 'budget/:id',
          element: <BudgetPage />,
          loader: budgetLoader,
          action: budgetAction,
          errorElement: <Error />,
          children: [
            {
              path: "delete",
              action: deleteBudget
            }
          ]
        },
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
