"use client";
import { useRouter } from "next/navigation";

interface SubadminFormType {
  data?: any;
  formType: "create" | "edit";
}
const SubadminForm = ({ data, formType }: SubadminFormType) => {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Add Subadmin</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="Enter email"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full text-gray-900 px-4 py-2 rounded-md  border cursor-pointer border-gray-900"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer "
          >
            {formType === "create" ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubadminForm;
