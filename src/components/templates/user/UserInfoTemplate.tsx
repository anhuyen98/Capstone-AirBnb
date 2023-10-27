import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getUserByIdThunk } from "store/user";

export const UserInfoTemplate = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const params = useParams()
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserByIdThunk(Number(params.userId)))
  }, [dispatch, params])
  return (
    <div>
      <h1>UserInfoTemplate</h1>
      <div>
        <p>{user?.name}</p>
        <p>{user?.id}</p>
        <p>{user?.email}</p>
        <p>{user?.birthday}</p>
        <p>{user?.phone}</p>
        <p>{user?.role}</p>
      </div>

    </div>
  );
};
