import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUser = {
  id: number;
  email: string;
  username: string;
  password: string;
  identifier: object;
};

export type ILoginUserResponse = {
  accessToken: string;
  id: number;
  full_name: string;
  username: string;
  role: string;
  email: string;
  company?: string | null;
  bio?: string | null;
  profile_photo?: string | null;
  created_at: Date;
  updated_at: Date;
};

export type IRefreshTokenResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
