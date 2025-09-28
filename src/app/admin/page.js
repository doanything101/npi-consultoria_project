"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminFallback from "./components/fallback";

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o dashboard após um pequeno delay
    const timer = setTimeout(() => {
      router.replace("/admin/dashboard");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return <AdminFallback />;
}
