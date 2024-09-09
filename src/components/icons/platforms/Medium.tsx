import * as React from "react";
import { SVGProps } from "react";
const MediumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      color="currentColor"
    >
      <circle cx={6.5} cy={12} r={4.5} />
      <ellipse cx={15.5} cy={12} rx={2.5} ry={4.5} />
      <ellipse cx={21} cy={12} rx={1} ry={4.5} />
    </g>
  </svg>
);
export default MediumIcon;
