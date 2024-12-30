import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../store.ts";
import { getSingleTodo } from "../Slices/userAsyncThunk.ts";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { todoActions } from "../Slices/userSlices.ts";
import { showAlert, showYesNoPopup } from "./Alert.tsx";

const View = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, singleTodo } = useSelector(
    (state: RootState) => state.userState
  );

  useEffect(() => {
    if (param?.id) {
      dispatch(getSingleTodo(+param.id)).then(({ payload }) => {
        const res = payload as { status: boolean; message: string };
        if (!res?.status) {
          showAlert({
            message: res?.message,
            isSuccess: res?.status,
          }).then(({ isConfirmed }) => {
            if (isConfirmed) navigate("/");
          });
        }
      });
    }
  }, [param.id]);
  return (
    <div className="w-50 card p-4 mx-auto placeholder-glow d-flex flex-column gap-3">
      {loading ? (
        <>
          <div className="row justify-content-between">
            <div className="col-3 p-3 placeholder rounded"></div>
            <div className="col-8 p-3 placeholder rounded"></div>
          </div>
          <div className="row justify-content-between">
            <div className="col-3 p-3 placeholder rounded"></div>
            <div className="col-8 p-3 placeholder rounded"></div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="fs-5 col-4 fw-semibold">Title:</div>
            <div className="col-8 fs-5 fw-semibold">{singleTodo?.title}</div>
          </div>
          <div className="row">
            <div className="fs-5 col-4 fw-semibold">Status:</div>
            <div className="col-8 ">
              <span
                className={`fs-6 fw-semibold badge bg-${
                  singleTodo?.completed ? "success" : "danger"
                } align-self-start`}
              >
                {singleTodo?.completed ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Link
              to={`/edit/${singleTodo?.id}`}
              className="btn btn-sm border border-warning btn-warning d-flex fs-6 gap-2 align-items-center"
            >
              Edit
              <FontAwesomeIcon icon={faPen} color="inherit" size="sm" />
            </Link>
            <button
              onClick={() => {
                showYesNoPopup().then(({ isConfirmed }) => {
                  if (isConfirmed) {
                    showAlert({
                      message: "Todo is deleted successfully",
                      isSuccess: true,
                    }).then(({ isConfirmed }) => {
                      if (isConfirmed) navigate("/");
                    });
                    dispatch(todoActions.deleteTodo(singleTodo?.id));
                  } else {
                    showAlert({
                      message: "Deleteing todo is cancelled ",
                      isSuccess: false,
                    });
                  }
                });
              }}
              type="button"
              className="btn btn-sm border border-danger btn-danger d-flex fs-6 gap-2 align-items-center"
            >
              Delete
              <FontAwesomeIcon icon={faTrash} color="inherit" size="sm" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default View;
