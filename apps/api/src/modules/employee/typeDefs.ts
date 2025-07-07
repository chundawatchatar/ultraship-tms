export const employeeTypeDefs = /* GraphQL */ `
  type Employee {
    id: ID!
    name: String!
    email: String!
    phone: String!
    website: String!
    department: String
    position: String
    salary: String
    status: String
    company: Company!
    address: Address!
    createdAt: String!
    updatedAt: String!
  }

  type Company {
    id: Int!
    name: String!
    catchPhrase: String!
  }

  type Address {
    id: Int!
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    lat: Float!
    lng: Float!
  }

  input EmployeeInput {
    name: String!
    email: String!
    phone: String!
    website: String!
    department: String
    position: String
    salary: String
    status: String
    companyId: Int!
    addressId: Int!
  }

  input EmployeeFilter {
    name: String
    email: String
    department: String
    position: String
    status: String
    companyId: Int
    addressId: Int
    page: Int
    limit: Int
  }

  type EmployeeList {
    data: [Employee!]!
    total: Int!
  }

  type Query {
    employees(filter: EmployeeFilter): EmployeeList!
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee!
    deleteEmployee(id: ID!): Employee!
  }
`;
