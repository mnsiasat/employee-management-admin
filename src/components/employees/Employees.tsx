import './Employees.css'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { EmployeeModal } from './modal/EmployeeModal.js'
import { Employee } from '../../types'
import { FormEvent, useContext } from 'react'
import { EmployeesContext, EmployeesContextType } from '../../store/EmployeesContext'

 export function Employees () {
   const context = useContext(EmployeesContext) as EmployeesContextType

   const handleEditEmployee = (e: FormEvent, index: number) => {
     e.preventDefault()
     context.editEmployee(index)
     context.setModalOpen(true)
   }

   const handleDeleteEmployee = (e: FormEvent, id: string) => {
     e.preventDefault()
     context.deleteEmployee(id)
   }

     return <div className="container">
         <h2>EMPLOYEE MANAGEMENT</h2>
         <ul className="responsive-table">
             <li className="table-header">
                 <div className="col col-1">Employee ID</div>
                 <div className="col col-2">Full Name</div>
                 <div className="col col-3">Email</div>
                 <div className="col col-4">Actions</div>
             </li>
             {
                 context.employeesState.employees  && context.employeesState.employees.map((emp, index: number) => {
                     return <li className="table-row" key={index}>
                         <div className="col col-1">{emp.id}</div>
                         <div className="col col-2">{emp.fullName}</div>
                         <div className="col col-3">{emp.email}</div>
                         <div className="col col-4 actions">
                             <BsFillTrashFill className="delete-btn" onClick={(event)=> handleDeleteEmployee(event, emp.id)}/>
                             <BsFillPencilFill onClick={(event)=> handleEditEmployee(event, index)}/>
                         </div>
                     </li>
                 })
             }
         </ul>
     </div>
 }