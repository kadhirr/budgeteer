import React from 'react'
import { getAllMatchingItems, deleteItem, createExpense } from '../helper'
import { useLoaderData } from 'react-router-dom';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import { toast } from 'react-toastify';

export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });


    if (!budget) {
        throw new Error("The Budget does not Exist!")
    }

    return { budget, expenses };
}

export async function budgetAction({ request }){
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    if (_action === "deleteExpense") {
        try {
            deleteItem({ key: "expenses", id: values.expenseId });
            return toast.success("Expense Deleted Successfully!")
        } catch (e) {
          console.log(e)
            throw new Error("There was an error deleting your expense")
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
}

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData();
    return (
        <div className='grid-lg' style={{"--accent": budget.color}}>
            <h1 className="h2">
                <span className="accent">{budget.name}</span>
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name}</span>
                        </h2>
                        <Table expenses={expenses} showBudget={false}   />
                    </div>
                )
            }
        </div>
    )
}

export default BudgetPage