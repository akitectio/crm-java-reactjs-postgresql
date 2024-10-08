import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@app/helpers/apiService";

export interface PermissionRequest {
  name: string;
  parentId: number;
}

export interface PermissionResponse {
  id: number;
  name: string;
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
  extra: number | any;
}
export const paginatedWithConditions = async (params?: any) => {
  try {
    const response = await getRequest<Paginated>(
      `permissions/paginated?${params}`
    );
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

export const getAllPermissionsWithKey = async (): Promise<
  GetAllPermissionsResponse[]
> => {
  try {
    const response = await getRequest<GetAllPermissionsResponse[]>(
      "permissions/displayWithKey"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
};

export const updatePermission = async (
  id: number,
  PermissionRequest: Object
) => {
  try {
    const response = await putRequest<PermissionResponse>(
      `permissions/ + ${id}`,
      PermissionRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePermission = async (id: number) => {
  try {
    const response = await deleteRequest<String>(`permissions/ + ${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
