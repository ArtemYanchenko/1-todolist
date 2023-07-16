import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikHelpers, useFormik } from "formik";
import { useAppSelector } from "common/hooks/hooks";
import { authThunks } from "features/login/authReducer";
import { Navigate } from "react-router-dom";
import { ResponseType } from "common/types";
import { useActions } from "common/hooks/useActions";
import { LoginParamsType } from "features/login/authAPI";

type FormikErrorType = Partial<Omit<LoginParamsType, "captcha">>;

export const Login = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { login } = useActions(authThunks);
  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more";
      }
      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((reason: ResponseType) => {
          const { fieldsErrors } = reason;
          if (fieldsErrors) {
            fieldsErrors.forEach((el) => {
              formikHelpers.setFieldError(el.field, el.error);
            });
          }
        });
    },
  });

  if (isLoggedIn) return <Navigate to={"/"} />;

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <form onSubmit={formik.handleSubmit}>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" name="email" onChange={formik.handleChange} value={formik.values.email} />
              {formik.errors.email && formik.touched.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
              <TextField type="password" label="Password" margin="normal" onChange={formik.handleChange} value={formik.values.password} name="password" />
              {formik.errors.password && formik.touched.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
              <FormControlLabel label={"Remember me"} control={<Checkbox />} onChange={formik.handleChange} value={formik.values.rememberMe} name="rememberMe" />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
};
