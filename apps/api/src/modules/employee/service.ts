import db from "@tms/db";

export const getAll = async (filter: any) => {
  const {
    name,
    email,
    department,
    position,
    status,
    companyId,
    addressId,
    page = 1,
    limit = 10,
  } = filter || {};

  const where: any = {
    ...(name && { name: { contains: name, mode: "insensitive" } }),
    ...(email && { email: { contains: email, mode: "insensitive" } }),
    ...(department && { department }),
    ...(position && { position }),
    ...(status && { status }),
    ...(companyId && { companyId }),
    ...(addressId && { addressId }),
  };

  const [data, total] = await Promise.all([
    db.employee.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.employee.count({ where }),
  ]);

  return { data, total };
};

export const get = async (id: string) => {
  return await db.employee.findUnique({
    where: { id },
    include: {
      company: true,
      address: true,
    },
  });
};

export const create = async (data: {
  name: string;
  email: string;
  phone: string;
  website: string;
  department?: string;
  position?: string;
  salary?: string;
  status?: string;
  companyId: number;
  addressId: number;
}) => {
  return await db.employee.create({ data });
};

export const update = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    department?: string;
    position?: string;
    salary?: string;
    status?: string;
    companyId?: number;
    addressId?: number;
  }
) => {
  return await db.employee.update({
    where: { id },
    data,
  });
};

export const remove = async (id: string) => {
  return await db.employee.delete({
    where: { id },
  });
};

export const getCompany = async (companyId: number) => {
  return await db.company.findUnique({
    where: { id: companyId },
  });
};

export const getAddress = async (addressId: number) => {
  return await db.address.findUnique({
    where: { id: addressId },
  });
};
