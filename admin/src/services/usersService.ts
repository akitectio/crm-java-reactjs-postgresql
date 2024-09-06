import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@app/helpers/apiService";
export interface UserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarId: number;
  superUser: boolean;
  manageSupers: boolean;
  permissions: string;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarId: number;
  superUser: boolean;
  manageSupers: boolean;
  permissions: string;
  active: boolean;
  emailVerifiedAt: String | null; // Date type for timestamps
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

export const paginateWithFilters = async () => {
  try {
    const response = await getRequest<Paginated>("users/paginate");
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
