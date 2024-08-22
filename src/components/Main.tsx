import { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import EmployeesProvider, { EmployeesContext, EmployeesContextType } from '../store/EmployeesContext'
import { Employee } from '../types'
import { Employees } from './employees/Employees'
import { EmployeeModal } from './employees/modal/EmployeeModal'
import { getEmployees } from '../graphql/queries'

function Main() {
  const context = useContext(EmployeesContext) as EmployeesContextType

  useEffect(() => {
    context.fetchAllEmployees()
    return () => {
    }
  }, [])

  return (
    <>
      <Employees />
      <button className="btn" onClick={() => context.setModalOpen(true)}>Add Employee</button>
      {context.modalOpen
        && <EmployeeModal />}
    </>
  )
}

export default Main