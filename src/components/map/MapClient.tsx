"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { WaterSource } from "@/types";
import FeaturedMovie from "@/components/FeaturedMovie";

const WaterSourceMap = dynamic(() => import("./WaterSourceMap"), { ssr: false });

export default function MapClient({ sources }: { sources: WaterSource[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure we only initialize heavy client libs (Leaflet) after hydration
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8">
      {mounted ? (
        <WaterSourceMap sources={sources} />
      ) : (
        // Render a lightweight placeholder to preserve layout until mount
        <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-12 xl:px-60 py-4 lg:py-7 gap-4 lg:h-[calc(100vh-168px)]">
          <div className="relative h-[60vh] lg:flex-1 lg:h-full rounded-lg bg-gray-50/40" />
        </div>
      )}

      <FeaturedMovie videoId="lN8qscLj36E" />
    </div>
  );
}
