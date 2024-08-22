import './EmployeeModal.css'
import React, { ChangeEventHandler, FormEvent, useContext, useEffect, useState } from 'react'
import { CreateEmployeeInput, Employee, UpdateEmployeeInput } from '../../../types.js'
import { EmployeesContext, EmployeesContextType } from '../../../store/EmployeesContext'
import { isEmployee } from '../../../utils'

export function EmployeeModal() {
  const [formState, setFormState] = useState<Employee | CreateEmployeeInput>({
    id: '',
    fullName: '',
    email: '',
  })
  const context = useContext(EmployeesContext) as EmployeesContextType
  const [errors, setErrors] = useState('')

  useEffect(() => {
    if (context.employeesState.employees && typeof context.employeesState.rowToEdit === 'number') {
      setFormState(context.employeesState.employees[context.employeesState.rowToEdit])
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  const validateForm = () => {
    if (formState?.fullName && formState?.email) {
      setErrors('')
      return true
    } else {
      let errorFields = []
      for (const [key, value] of Object.entries(formState || {})) {
        if (!value)
          errorFields.push(key)
      }
      setErrors(errorFields.join(', '))
      return false
    }
  }
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (validateForm() && formState) {
      context.saveEmployee(formState)
    }
  }
  return <div className="modal-container" onClick={(e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if (target.className === 'modal-container')
      context.setModalOpen(false)
  }}>
    <div className="modal">
      <form>
        <div className="form-group">
          <label htmlFor="id">Employee ID</label>
          <input name="id" readOnly={true} value={isEmployee(formState) ? (formState as Employee).id : ''}
                 onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input name="fullName" value={formState?.fullName || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input name="email" value={formState?.email || ''} onChange={handleChange} />
        </div>
        {errors && <div className="error">{`Please supply missing inputs for: ${errors}`}</div>}
        <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  </div>
}