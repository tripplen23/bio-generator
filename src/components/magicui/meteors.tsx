"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
}
export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => {
      const randomLeftPosition = Math.floor(Math.random() * 85); // Limit to viewport width percentage
      return {
        top: -5,
        left: `${randomLeftPosition}%`, // Position meteors within 0% to 100% of the viewport width
        animationDelay: Math.random() * 1 + 0.2 + "s",
        animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
      };
    });
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="hidden lg:block fixed inset-0">
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
