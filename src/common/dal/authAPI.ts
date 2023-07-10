import { instance, LoginParamsType } from "common/dal/tasksAPI";
import { ResponseType } from "common/types";

export const authAPI = {
  authMe() {
    return instance.get<
      ResponseType<{
        id: number;
        email: string;
        login: string;
      }>
    >("/auth/me");
  },
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>(`auth/login`, data);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};
