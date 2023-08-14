import React from 'react'
import { fetchData, deleteItem, createExpense } from '../helper';
import { useLoaderData } from 'react-router-dom';
import Table from '../components/Table';
import { toast } from 'react-toastify';

export function expensesLoader() {
  const username = fetchData('username');
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { username, budgets, expenses }
}

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  console.log(_action, values)
  if (_action === "deleteExpense") {
    try {
      deleteItem({ key: "expenses", id: values.expenseId });
      return toast.success("Expense Deleted Successfully!")
    } catch (e) {
      console.log(e)
      throw new Error("There was an error deleting your expense")
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {
        expenses && expenses.length > 0 ?
          (
            <div className="grid-md">
              <h2>Recent Expenses <small>({expenses.length} Total)</small></h2>
              <Table expenses={expenses} />
            </div>
          ) : <p>No Expenses to Show</p>
      }
    </div>
  )
}

export default ExpensesPage