import * as React from "react";
import { SVGProps } from "react";
const SteamIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      fill="#fff"
      d="M42 38a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z"
    />
    <g fill="#455a64">
      <path d="M18.459 33.645c-.288 0-.56-.057-.822-.141l-.005.02-3.67-1.062c.644 1.878 2.406 3.237 4.5 3.237 2.641 0 4.776-2.136 4.776-4.776s-2.135-4.777-4.776-4.777c-1.141 0-2.175.418-2.998 1.087L19 28.255c.029.007.055.018.084.024l.049.016v.002a2.715 2.715 0 0 1-.674 5.348m12.464-9.346a5.84 5.84 0 0 0 5.837-5.838 5.84 5.84 0 0 0-5.837-5.837 5.84 5.84 0 0 0-5.837 5.837 5.84 5.84 0 0 0 5.837 5.838m-.003-9.89a4.053 4.053 0 1 1 .005 8.107 4.053 4.053 0 0 1-.005-8.107" />
      <path d="M38 6H10a4 4 0 0 0-4 4v14.495l7.027 2.033c1.287-1.59 3.229-2.626 5.434-2.626.07 0 .135.02.204.021l3.876-5.355c0-.035-.005-.072-.005-.105a8.387 8.387 0 1 1 8.387 8.385c-.044 0-.087-.006-.132-.007l-5.33 3.871c.002.07.021.14.021.211a7.02 7.02 0 0 1-7.021 7.021c-3.593 0-6.52-2.707-6.937-6.188L6 30.158V38a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4" />
    </g>
  </svg>
);
export default SteamIcon;
