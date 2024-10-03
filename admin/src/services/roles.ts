import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@app/helpers/apiService";
import { PermissionResponse } from "./permissions";

export interface RoleRequest {
  name: string;
  description: string;
  isDefault: boolean;
  permissionIds: Set<number>;
}

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  createdBy: number;
  createdAt: String;
  updatedAt: String;
  deletedAt: string;
  permissions: PermissionResponse[];
}

export interface Paginated {
  results: PaginateRoleResponse[];
  page: number;
  total: number;
  totalPage: number;
}

export interface GetRoleRequest {
  name: string;
}

export interface PaginateRoleResponse {
  id: number;
  name: string;
  description: string;
  createdByName: String;
  createdBy: number;
  createdAt: String;
  deletedAt: string;
}

export interface GetAllRolesResponse {
  label: string;
  value: number;
  extra: number | null;
}

export const paginatedWithConditions = async (param?: any) => {
  try {
    const response = await getRequest<Paginated>(`roles/paginated?${param}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRoles = async (RoleRequest: Object) => {
  try {
    const response = await postRequest<RoleResponse>("roles", RoleRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneById = async (id: number) => {
  try {
    const response = await getRequest<RoleResponse>(`roles/ + ${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRole = async (RoleRequest: Object, id: number) => {
  try {
    const response = await putRequest<RoleResponse>(
      `roles/ + ${id}`,
      RoleRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRole = async (id: number) => {
  try {
    const response = await deleteRequest<RoleResponse>(`roles/ + ${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRoles = async (): Promise<GetAllRolesResponse[]> => {
  try {
    const response = await getRequest<GetAllRolesResponse[]>("roles/display");
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};
