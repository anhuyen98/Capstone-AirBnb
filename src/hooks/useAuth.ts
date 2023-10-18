import { RootState } from "store";
import { useSelector } from "react-redux";
export const useAuth = () => {
  const { userLogin, token } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    token,
    user: userLogin
  }
};
