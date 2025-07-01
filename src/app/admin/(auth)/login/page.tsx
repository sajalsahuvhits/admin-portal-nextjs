"use client";

import { useRouter } from "next/navigation";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormik,
  FormikConfig,
} from "formik";
import { toast } from "sonner";
import { adminLoginSchema } from "@/lib/YupSchema";
import { LoginFormValues } from "@/types/types";

export default function Login() {
  const router = useRouter();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);
    try {
      // login api call handle

      toast.success("Login successfully");
    //   router.push("/admin/dashboard");
    } catch (err: any) {
      setErrors({ password: err.message });
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: adminLoginSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-[calc(100vh-67px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border rounded-md p-5 bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-3">
            <div>
              <label>Enter Email</label>
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter email"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              {formik.touched.email && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label>Enter Password</label>
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              {formik.touched.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
            >
              {formik.isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
