import * as EmployeeService from "./service"; // adjust path accordingly

export const employeeResolvers = {
  Query: {
    employees: async (_: unknown, { filter }: any) =>
      await EmployeeService.getAll(filter),

    employee: async (_: unknown, { id }: { id: string }) =>
      await EmployeeService.get(id),
  },

  Mutation: {
    createEmployee: async (
      _: unknown,
      { input }: { input: Parameters<typeof EmployeeService.create>[0] }
    ) => await EmployeeService.create(input),

    updateEmployee: async (
      _: unknown,
      { id, input }: { id: string; input: Parameters<typeof EmployeeService.update>[1] }
    ) => await EmployeeService.update(id, input),

    deleteEmployee: async (
      _: unknown,
      { id }: { id: string }
    ) => await EmployeeService.remove(id),
  },

  Employee: {
    company: async (parent: any) =>
      await EmployeeService.getCompany(parent.companyId),

    address: async (parent: any) =>
      await EmployeeService.getAddress(parent.addressId),
  },
};
