import { getRequest, postRequest } from "@app/helpers/apiService";

export interface PermissionRequest {
  name: string;
  parentId: number;
}

export interface PermissionResponse {
  id: number;
  name: string;
  parentId: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  children: PermissionResponse[];
}

export interface Paginated {
  results: PermissionResponse[];
  page: number;
  total: number;
  totalPage: number;
}

export interface GetAllPermissionsResponse {
  label: string;
  value: number;
  extra: number | null;
}

export const paginatedWithConditions = async () => {
  try {
    const response = await getRequest<Paginated>("permissions/paginated");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPermissions = async (PermissionRequest: Object) => {
  try {
    const response = await postRequest<PermissionResponse>(
      "permissions",
      PermissionRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPermissionsById = async (Id: number) => {
  try {
    const response = await getRequest<PermissionResponse>(
      `permissions/ + ${Id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPermissions = async (): Promise<
  GetAllPermissionsResponse[]
> => {
  try {
    const response = await getRequest<GetAllPermissionsResponse[]>(
      "permissions/display"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
};
