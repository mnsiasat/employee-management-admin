import { GraphQLClient, gql } from 'graphql-request'
import { Employee } from '../types.js'

const client = new GraphQLClient('http://localhost:4000/graphql')

export async function getEmployees() {
  const query = gql`
      query {
          employees {
              id
              fullName
              email
          }
      }
  `

  const  { employees } : { employees: Employee[] }  = await client.request(query)
  return employees
}