import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@app/helpers/apiService";

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarId: number;
  superUser: boolean;
  manageSupers: boolean;
  active: boolean;
  roleId: number | null;
  roleName: string;
  emailVerifiedAt: String | null;
  createdAt: String;
  updatedAt: String;
  lastLogin: String | null;
}

export interface Paginated {
  results: UserResponse[];
  page: number;
  total: number;
  totalPage: number;
}

export interface Filters {
  key: string;
  operator: "ILIKE" | "EQUAL" | "MORE_THAN" | "LESS_THAN";
  value: Object;
}

export const paginateWithFilters = async (param?: any, Filters?: Object) => {
  console.log(Filters, "filter post");
  try {
    const response = await postRequest<Paginated>(
      `users/paginate?${param}`,
      Filters
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (UserRequest: Object) => {
  try {
    const response = await postRequest<UserResponse>(
      "users/create",
      UserRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await getRequest<UserResponse>(`users/ + ${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await deleteRequest<UserResponse>(`users/delete/ + ${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeSuper = async (id: number) => {
  try {
    const response = await putRequest<UserResponse>(
      `users/${id}/remove-super`,
      null
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  id: number,
  ChangePasswordRequest: Object
) => {
  try {
    const response = await putRequest<String>(
      `users/${id}/change-password`,
      ChangePasswordRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: number, UserRequest: Object) => {
  try {
    const respone = await putRequest<UserResponse>(
      `users/update/ + ${id}`,
      UserRequest
    );
    return respone.data;
  } catch (error) {
    throw error;
  }
};
