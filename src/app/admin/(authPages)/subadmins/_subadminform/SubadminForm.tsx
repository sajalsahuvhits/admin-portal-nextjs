"use client";
import { doPost, doPut } from "@/config/DataService";
import Api from "@/lib/Api";
import { useFormik, FormikValues } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface SubadminFormType {
  editData?: any;
  formType: "create" | "edit";
}
const SubadminForm = ({ editData, formType }: SubadminFormType) => {
  const router = useRouter();
  const { id } = useParams();

  const handleSubmit = async (
    values: FormikValues,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);
    const resp =
      formType === "create"
        ? await doPost(Api.Admin.SUBADMIN, values)
        : await doPut(`${Api.Admin.SUBADMIN}/${id}`, values);
    console.log(resp);
    if ([201, 200].includes(resp?.status)) {
      router.push("/admin/subadmins");
    }
    setSubmitting(false);
  };

  const initialValues: FormikValues = {
    name: editData?.name || "",
    email: editData?.email || "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: adminLoginSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  return (
    <div className="max-w-screen mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">{formType === "create" ? "Add" : "Edit"} Subadmin</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="Enter name"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="Enter email"
            />
            {/* error */}
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          {formType === "create" && (
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Enter password"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className=" text-gray-900 px-4 py-2 rounded-md  border cursor-pointer border-gray-900"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer "
            disabled={formik.isSubmitting}
          >
            {formType === "create" ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubadminForm;
