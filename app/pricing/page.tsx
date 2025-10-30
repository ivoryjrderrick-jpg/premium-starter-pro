"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PricingTable from "@/components/PricingTable";

export const revalidate = 0;                 // no ISR
export const dynamic = "force-dynamic";      // no static HTML
export const fetchCache = "force-no-store";  // no fetch cache

export default function PricingPage() {
  const router = useRouter();

  useEffect(() => {
    // If user returns via back/forward cache, force a refresh
    try {
      // @ts-ignore
      const navType = performance.getEntriesByType("navigation")[0]?.type;
      if (navType === "back_forward") router.refresh();
    } catch {}
  }, [router]);

  return <PricingTable />;
}
