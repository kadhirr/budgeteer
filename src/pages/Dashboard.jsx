import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Intro from '../components/Intro';
import { createBudget, createExpense, deleteItem, fetchData } from '../helper';
import Table from '../components/Table';

export function dashboardLoader() {
    const username = fetchData('username');
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { username, budgets, expenses }
}

export async function dashboardAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    if (_action === "newUser") {
        try {
            localStorage.setItem("username", JSON.stringify(values.username));
            return toast.success(`Welcome, ${values.username}!`)
        } catch (e) {
            throw new Error("There was an error in creating your account")
        }
    }

    if (_action === "createBudget") {
        try {
            createBudget({ name: values.newBudget, amount: values.newBudgetAmount })
            return toast.success("Budget Created Successfully!")
        } catch (e) {
            throw new Error("There was an error creating your budget")
        }
    }

    if (_action === "createExpense") {
        try {
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget })
            return toast.success("Expense Added Successfully!")
        } catch (e) {
            throw new Error("There was an error creating your expense")
        }
    }
    if (_action === "deleteExpense") {
        try {
            deleteItem({ key: "expenses", id: values.expenseId })
            return toast.success("Expense Deleted Successfully!")
        } catch (e) {
            throw new Error("There was an error creating your expense")
        }
    }

    

}

const Dashboard = () => {
    const { username, budgets, expenses } = useLoaderData();
    return (
        <div>
            {username ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{username}</span></h1>
                    <div className='grid-sm'>
                        {budgets && budgets.length > 0 ? (
                            <div className='grid-lg'>
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget) => (
                                            <BudgetItem key={budget.id} budget={budget}/>
                                        ))
                                    }
                                </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md">
                                            <h2>Recent Expenses</h2>
                                            <Table expenses={expenses.sort((a,b) => b.createdAt - a.createdAt).slice(0,8)} />
                                            {expenses.length > 8 && (
                                                <Link to="expenses" className='btn btn--dark'>View All Expenses</Link>
                                            )}
                                        </div>
                                    )
                                }
                            </div>
                            
                        ) : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )}
                    </div>
                </div>
            ) : (<Intro />)}
        </div>
    )
}

export default Dashboard