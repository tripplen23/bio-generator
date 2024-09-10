import { cn } from "@/lib/utils";

export default function RetroGrid({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed size-full overflow-hidden opacity-50 [perspective:200px]",
        className
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="fixed inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",

            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

            // Retro neon grid (day mode)
            "[background-image:linear-gradient(to_right,rgba(255,0,150,0.6)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,255,255,0.6)_1px,transparent_0)]",

            // Retro neon grid (night mode)
            "dark:[background-image:linear-gradient(to_right,rgba(255,0,150,0.8)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,255,255,0.8)_1px,transparent_0)]"
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-t from-purple-800 via-pink-500 to-orange-300 dark:from-purple-900 dark:via-purple-700 dark:to-black opacity-20" />
    </div>
  );
}
