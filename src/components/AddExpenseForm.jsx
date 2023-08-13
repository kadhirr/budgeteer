import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React, {useRef, useEffect} from 'react'
import { useFetcher } from 'react-router-dom'

const AddExpenseForm = ({budgets}) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    },[isSubmitting])
  return (
    <div className='form-wrapper'>
        <h2 className='h3'>Add new <span className='accent'>{budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}</span>{" "}Expense</h2>
        <fetcher.Form
            method="post"
            className="grid-sm"
            ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input type="text" name="newExpense" id="newExpense" ref={focusRef} required placeholder='Hotel' />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input type="number" name="newExpenseAmount" id="newExpenseAmount" step="0.01" inputMode='decimal' placeholder='5.00' required />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name='newExpenseBudget' id="newExpenseBudget" required>
                        {budgets.sort((a,b) => a.createdAt - b.createdAt)
                            .map((budget) => (<option key={budget.id} value={budget.id}>{budget.name}</option>))}
                    </select>
                </div>
                <input type='hidden' name="_action" value="createExpense"></input>
                <button className='btn btn--dark' disabled={isSubmitting}>
                    <span>Add Expense</span>
                    <PlusCircleIcon width={20} />
                </button>
        </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm