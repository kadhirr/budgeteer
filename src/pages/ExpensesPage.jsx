import React from 'react'
import { fetchData } from '../helper';
import { useLoaderData } from 'react-router-dom';
import Table from '../components/Table';

export function expensesLoader() {
  const username = fetchData('username');
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { username, budgets, expenses }
}

const ExpensesPage = () => {
  const {expenses} = useLoaderData();
  
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