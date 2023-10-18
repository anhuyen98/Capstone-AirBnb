export type UserLogin = {
  id?: 3900;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthday?: string;
  avatar?: string;
  gender?: boolean;
  role?: string;
};

export type UserByAccessToken<Q> = {
    user?: Q,
    token?: string
}
