import { GraphQLClient, gql } from 'graphql-request'
import { Employee, UpdateEmployeeInput } from '../types.js'

const client = new GraphQLClient('http://localhost:4000/graphql')


export async function createEmployee(fullName: string, email: string) {
  const mutation = gql`
      mutation CreateEmployee($input: CreateEmployeeInput!) {
          employee: createEmployee(input:$input) {
              id
              fullName
              email
          }
      }
  `

  const { employee } : { employee: Employee } = await client.request(mutation, {
    input: {
      fullName,
      email,
    }
  })
  return employee
}

export async function updateEmployee(emp: UpdateEmployeeInput) {
  const mutation = gql`
      mutation UpdateEmployee($input: UpdateEmployeeInput!) {
          employee: updateEmployee(input:$input) {
              id
              fullName
              email
          }
      }
  `

  const { employee } : {employee: Employee} = await client.request(mutation, {
    input: {
      ...emp,
      id: Number(emp.id)
    },
  })
  return employee
}


export async function deleteEmployee(id: string) {
  const mutation = gql`
      mutation deleteEmployee($id: Float!) {
          deleteEmployee(id: $id)
      }
  `

  const success = await client.request(mutation, {
    id: Number(id),
  })
  return success
}
