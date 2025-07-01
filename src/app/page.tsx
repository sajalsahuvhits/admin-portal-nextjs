'use client'
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // router.push('/admin/login')
    router.push('/admin/dashboard')
  }, [])
  return null;
}
