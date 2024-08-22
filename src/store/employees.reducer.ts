import { CreateEmployeeInput, Employee, UpdateEmployeeInput } from '../types'
import { isEmployee } from '../utils'
import { getEmployees } from '../graphql/queries'


export enum EmployeeActionType {
  SAVE = 'SAVE_EMPLOYEE',
  EDIT = 'EDIT_EMPLOYEE',
  DELETE = 'DELETE_EMPLOYEE',
  FETCH_ALL = 'FETCH_ALL',
}

export interface EmployeeAction {
  type: EmployeeActionType;
  payload: {
    rowToEdit?: number
    employeeInput?: Employee | Employee[],
  }
}

export interface EmployeesState {
  rowToEdit?: number
  employees?: Employee[]
}


export const employeesReducer = (state: EmployeesState, action: EmployeeAction): EmployeesState => {
  let newState: EmployeesState = {
    employees: [],
  }
  switch (action.type) {
    case EmployeeActionType.SAVE:
      if (action.payload.employeeInput && !Array.isArray(action.payload.employeeInput)) {
        const employee = action.payload.employeeInput as Employee
        if (typeof state.rowToEdit === 'number') {
          newState = {
            employees: state.employees?.filter((emp) => emp.email !== employee.email)
              .concat(action.payload.employeeInput),
          }
        } else {
          newState = {
            employees: state.employees ? [...state.employees, action.payload.employeeInput] : [action.payload.employeeInput],
          }
        }
      }
      break
    case EmployeeActionType.EDIT:
      newState = {
        ...state,
        rowToEdit: action.payload.rowToEdit,
      }
      break
    case EmployeeActionType.DELETE:
      const employee = action.payload.employeeInput as Employee
      newState = {
        employees: state.employees?.filter((emp: Employee) => emp.email !== employee.email),
      }
      break
    case EmployeeActionType.FETCH_ALL:
      if(Array.isArray(action.payload.employeeInput)){
        newState = {
          ...state,
          employees: action.payload.employeeInput,
        }
      }
      break
    default:
      break

  }
  return newState
}

