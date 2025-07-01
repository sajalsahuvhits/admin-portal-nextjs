import * as Yup from "yup";

export const adminLoginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter valid email").required("Please enter email"),
  password: Yup.string()
    .required("Please enter password"),
});
