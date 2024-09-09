import * as React from "react";
import { SVGProps } from "react";
const TumblrIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.9 11.018h-.89c-.831 0-1.01-.168-1.01-1V8.266c0-.655-.012-.654.653-.975 1.706-.823 3.207-2.408 3.609-4.298.109-.513.163-.77.302-.881.14-.112.364-.112.813-.112h1.375c.477 0 .715 0 .863.146.148.147.148.383.148.854v3.565c0 .831.179 1 1.01 1h1.86c.832 0 1.011.168 1.011 1v1.453c0 .832-.18 1-1.011 1h-1.86c-.832 0-1.01.169-1.01 1v4.242c0 1.76 1.56 2.34 2.932 1.733.477-.212.484-.198.63.246l.575 1.75c.19.575.137.79-.394 1.095-3.932 2.26-8.595.285-8.595-5.316v-3.75c0-.831-.179-1-1.01-1"
      color="currentColor"
    />
  </svg>
);
export default TumblrIcon;
