import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  addTodo,
  getSingleTodo,
  updateTodo,
} from "../Slices/userAsyncThunk.ts";
import { RootState, useAppDispatch } from "../store.ts";
import { useSelector } from "react-redux";
import { showAlert } from "./Alert.tsx";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),
  completed: Yup.boolean(),
});

const Form = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list } = useSelector((state: RootState) => state.userState);
  console.log(list);

  const todoForm = useFormik({
    initialValues: {
      userId: 1,
      title: "",
      completed: false,
    },
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      if (param.id) {
        dispatch(updateTodo({ id: +param.id, ...values })).then(() => {
          showAlert({ message: "Todo Data Updated", isSuccess: true }).then(
            ({ isConfirmed }) => {
              navigate("/");
            }
          );
        });
      } else {
        dispatch(addTodo(values)).then(() => {
          showAlert({ message: "Todo Data Added", isSuccess: true }).then(
            ({ isConfirmed }) => {
              navigate("/");
            }
          );
        });
      }
      formikHelpers.setSubmitting(false);
    },
  });
  useEffect(() => {
    if (param?.id) {
      dispatch(getSingleTodo(+param.id)).then(({ payload }) => {
        const res = payload as { message: string; status: boolean; data: any };
        if (res.status) {
          todoForm.setValues(res.data);
        } else {
          showAlert({
            message: res?.message,
            isSuccess: res?.status,
          }).then(({ isConfirmed }) => {
            if (isConfirmed) navigate("/");
          });
        }
      });
    }
    return () => {
      todoForm.resetForm();
    };
  }, [param.id]);
  return (
    <div className="w-50 card p-4 mx-auto placeholder-glow">
      <form
        onSubmit={todoForm.handleSubmit}
        className="d-flex gap-2 flex-column"
      >
        <div className="row">
          <label htmlFor="title" className="fs-5 col-4">
            Title
          </label>
          <div className="col-8">
            <input
              className="form-control border-2 shadow"
              type="text"
              name="title"
              value={todoForm.values.title}
              onChange={todoForm.handleChange}
              onBlur={todoForm.handleBlur}
              placeholder="Default input"
              aria-label="default input example"
            />
            {todoForm.touched.title && todoForm.errors.title && (
              <div style={{ color: "red" }}>{todoForm.errors.title}</div>
            )}
          </div>
        </div>
        <div className="row">
          <label htmlFor="completed" className="fs-5 col-4">
            Completed
          </label>
          <div className="col-8">
            <input
              id="completed"
              name="completed"
              type="checkbox"
              onChange={todoForm.handleChange}
              onBlur={todoForm.handleBlur}
              checked={todoForm.values.completed}
            />
          </div>
        </div>
        <button
          type="submit"
          className="align-self-end btn btn-primary"
          disabled={!todoForm.isValid || todoForm.isSubmitting}
        >
          {param.id ? "Update" : "Submit"}
          {todoForm.isSubmitting && "ing..."}
        </button>
      </form>
    </div>
  );
};

export default Form;
