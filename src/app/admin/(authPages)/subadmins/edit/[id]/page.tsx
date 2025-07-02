"use client";
import { useParams } from "next/navigation";
import SubadminForm from "../../_subadminform/SubadminForm";
import { useEffect, useState } from "react";
import { ISubAdmin } from "@/types/types";
import { doGet } from "@/config/DataService";
import Api from "@/lib/Api";
import { PageLoader } from "@/components/Loader";

const EditSubadmin = () => {
  const { id } = useParams();
  const [subadmin, setSubadmin] = useState<ISubAdmin>();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    const resp = await doGet(`${Api.Admin.SUBADMIN}/${id}`);
    setSubadmin(resp.data || []);
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  if (loading) {
    return <PageLoader/>;
  }
  return <SubadminForm editData={subadmin} formType="edit" />;
};

export default EditSubadmin;
