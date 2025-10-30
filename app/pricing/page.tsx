"use client";
import { useEffect } from "react";
import PricingTable from "@/components/PricingTable";

export default function PricingPage() {
  useEffect(() => {
    // If user came via back/forward cache, force a refresh once
    if (performance && "navigation" in performance) {
      // @ts-ignore
      const type = performance.getEntriesByType("navigation")[0]?.type;
      if (type === "back_forward") {
        window.location.replace(window.location.href);
      }
    }
  }, []);

  return <PricingTable />;
}
