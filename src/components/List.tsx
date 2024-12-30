import React, { useEffect } from "react";
import { todoActions } from "../Slices/userSlices.ts";
import { useAppDispatch, RootState } from "../store.ts";
import { getUserList } from "../Slices/userAsyncThunk.ts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import ListSkeleton from "./ListSkeleton.tsx";
import { showAlert } from "./Alert.tsx";

const List = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useSelector((state: RootState) => state.userState);
  useEffect(() => {
    dispatch(getUserList());
  }, []);
  return (
    <div className="d-flex flex-column gap-2 placeholder-glow">
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          {list?.map((item) => {
            return (
              <div
                className="p-2 border shadow card flex-row gap-2 align-items-center justify-content-between w-75 mx-auto"
                key={item.id}
              >
                <div className="d-flex gap-2 align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input border-secondary"
                    checked={item.completed}
                    disabled
                  />
                  <p className="m-0 fs-5">{item.title}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Link
                    to={`/view/${item.id}`}
                    className="btn btn-sm border border-warning btn-warning"
                  >
                    <FontAwesomeIcon icon={faEye} color="inherit" />
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default List;
