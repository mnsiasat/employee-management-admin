import { createContext, FC, ReactNode, Reducer, useCallback, useEffect, useReducer, useState } from 'react'
import { CreateEmployeeInput, Employee, UpdateEmployeeInput } from '../types'
import { getEmployees } from '../graphql/queries'
import { isEmployee } from '../utils'
import { EmployeeActionType, employeesReducer, EmployeesState } from './employees.reducer'
import { createEmployee, deleteEmployee as deleteEmployeeApi, updateEmployee } from '../graphql/mutations'

export type EmployeesContextType = {
  employeesState: EmployeesState
  fetchAllEmployees: () => void
  saveEmployee: (input: CreateEmployeeInput | UpdateEmployeeInput) => void
  editEmployee: (index: number) => void
  deleteEmployee: (id: string) => void
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
}

export const EmployeesContext = createContext<EmployeesContextType | null>(null)


const EmployeesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [employeesState, dispatch] = useReducer(employeesReducer,{
    employees: []
  })
  const [modalOpen, setModalOpen] = useState(false)


  const fetchAllEmployees = async () => {
    try {
      const employees = await getEmployees()
      dispatch({
        type: EmployeeActionType.FETCH_ALL,
        payload: {
          employeeInput: employees,
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error({ message: error.message || 'Failed to fetch employees.' })
      }
    }
  }

  const saveEmployee = async (input: CreateEmployeeInput | UpdateEmployeeInput) => {
    let savedEmployee: Employee = {
      id: '',
      fullName: '',
      email: ''
    }
    if (typeof employeesState.rowToEdit === 'number') {
      savedEmployee = await updateEmployee(input as UpdateEmployeeInput)
    } else if(input.fullName && input.email){
      savedEmployee = await createEmployee(input.fullName, input.email)
    }
    setModalOpen(false)
    dispatch({
      type: EmployeeActionType.SAVE,
      payload: {
        employeeInput: savedEmployee,
      }
    })
  }

  const editEmployee = (index: number) => {
    dispatch({
      type: EmployeeActionType.EDIT,
      payload: {
        rowToEdit: index,
      }
    })
  }

  const deleteEmployee = async (id: string) => {
    await deleteEmployeeApi(id)
    setModalOpen(false)
    if(employeesState.employees){
      dispatch({
        type: EmployeeActionType.DELETE,
        payload: {
          employeeInput: employeesState.employees.find((emp: Employee) => emp.id === id),
        }
      })
    }
  }

  return <EmployeesContext.Provider value={{
    employeesState,
    fetchAllEmployees,
    saveEmployee,
    editEmployee,
    deleteEmployee,
    modalOpen,
    setModalOpen,
  }}>{children}</EmployeesContext.Provider>
}

export default EmployeesProvider