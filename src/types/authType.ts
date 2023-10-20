export type UserLogin = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone?: number;
  birthday?: string;
  avatar?: string;
  gender?: boolean;
  role?: string;
};

export type UserByAccessToken<Q> = {
    user?: Q,
    token?: string
}
