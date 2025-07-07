import { gql, useQuery, useMutation } from "@apollo/client";

const EMPLOYEES_QUERY = gql`
  query Employees($filter: EmployeeFilter) {
    employees(filter: $filter) {
      data {
        id
        name
        email
        phone
        website
        department
        position
        salary
        status
        createdAt
        updatedAt
        company {
          id
          name
          catchPhrase
        }
        address {
          id
          street
          suite
          city
          zipcode
          lat
          lng
        }
      }
      total
    }
  }
`;

const EMPLOYEE_QUERY = gql`
  query Employee($id: ID!) {
    employee(id: $id) {
      id
      name
      email
      phone
      website
      department
      position
      salary
      status
      createdAt
      updatedAt
      company {
        id
        name
        catchPhrase
      }
      address {
        id
        street
        suite
        city
        zipcode
        lat
        lng
      }
    }
  }
`;

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      id
      name
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

  export const useEmployees = (filter = {}) => {
    return useQuery(EMPLOYEES_QUERY, {
      variables: { filter },
      fetchPolicy: "network-only",
    });
  };

export const useEmployee = (id: string) => {
  return useQuery(EMPLOYEE_QUERY, {
    variables: { id },
    skip: !id,
    fetchPolicy: "network-only",
  });
};

export const useCreateEmployee = () => {
  const [createEmployee, { data, loading, error }] = useMutation(CREATE_EMPLOYEE);
  return { createEmployee, data, loading, error };
};

export const useUpdateEmployee = () => {
  const [updateEmployee, { data, loading, error }] = useMutation(UPDATE_EMPLOYEE);
  return { updateEmployee, data, loading, error };
};

export const useDeleteEmployee = () => {
  const [deleteEmployee, { data, loading, error }] = useMutation(DELETE_EMPLOYEE);
  return { deleteEmployee, data, loading, error };
};
