import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";


import { employeeTypeDefs } from "../modules/employee/typeDefs";
import { employeeResolvers } from "../modules/employee/resolver";

export const typeDefs = mergeTypeDefs([employeeTypeDefs]);
export const resolvers = mergeResolvers([employeeResolvers]);