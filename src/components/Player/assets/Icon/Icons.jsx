const defaultFontSize = "54px";
export function ArrowLeft({
  className = "",
  fontSize = defaultFontSize,
  color = "#fff",
  bg = "none",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );
}

export function PlayIcon({
  className = "",
  fontSize = defaultFontSize,
  color = "#fff",
  bg = "none",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-play ${className}`}
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
}

export function PauseIcon({
  className = "",
  fontSize = defaultFontSize,
  color = "#fff",
  bg = "none",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-pause ${className}`}
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  );
}

export function VolumeHigh({
  className = "",
  fontSize = defaultFontSize,
  color = "#fff",
  bg = "none",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-volume-2 ${className}`}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  );
}

export function VolumeMd({
  className = "",
  fontSize = defaultFontSize,
  color = "#fff",
  bg = "none",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-volume-1 ${className}`}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  );
}

export function VolumeLow({
  className = "",
  fontSize = defaultFontSize,
  color = "#fff",
  bg = "none",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-volume ${className}`}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    </svg>
  );
}

export function VolumeMuted({
  className = "",
  fontSize = defaultFontSize,
  color = "#fff",
  bg = "none",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-volume-x ${className}`}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
  );
}

export function Episodes({
  className = "",
  fontSize = defaultFontSize,
  color = "#fff",
  bg = "none",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-menu ${className}`}
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

export function NextEpi({
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      width={fontSize}
      height={fontSize}
      viewBox="0 0 17 16"
      fill={bg}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.00299 3.002C2.003 2.8186 2.05344 2.63874 2.1488 2.48208C2.24415 2.32543 2.38075 2.19801 2.54366 2.11377C2.70656 2.02953 2.8895 1.99171 3.07245 2.00445C3.25541 2.01719 3.43133 2.08 3.58099 2.186L10.581 7.149C10.711 7.24095 10.8172 7.36262 10.8907 7.50389C10.9642 7.64516 11.0029 7.80195 11.0036 7.9612C11.0043 8.12045 10.967 8.27756 10.8947 8.41946C10.8224 8.56136 10.7172 8.68394 10.588 8.777L3.58799 13.814C3.43866 13.9217 3.26248 13.9861 3.07889 14.0001C2.89529 14.0141 2.7114 13.9771 2.54748 13.8932C2.38357 13.8093 2.24599 13.6818 2.14991 13.5248C2.05384 13.3677 2.003 13.1871 2.00299 13.003V3.002ZM14.003 2.5C14.003 2.36739 13.9503 2.24021 13.8565 2.14645C13.7628 2.05268 13.6356 2 13.503 2C13.3704 2 13.2432 2.05268 13.1494 2.14645C13.0557 2.24021 13.003 2.36739 13.003 2.5V13.5C13.003 13.6326 13.0557 13.7598 13.1494 13.8536C13.2432 13.9473 13.3704 14 13.503 14C13.6356 14 13.7628 13.9473 13.8565 13.8536C13.9503 13.7598 14.003 13.6326 14.003 13.5V2.5Z"
        fill={color}
      />
    </svg>
  );
}

export function CC({
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
  ...rest
}) {
  return (
    <svg
      {...rest}
      width={fontSize}
      height={fontSize}
      viewBox="0 0 16 12"
      fill={bg}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2L0 10C0 10.5304 0.210714 11.0391 0.585786 11.4142C0.960859 11.7893 1.46957 12 2 12H14C14.5304 12 15.0391 11.7893 15.4142 11.4142C15.7893 11.0391 16 10.5304 16 10V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0H2ZM5.027 4.002C4.197 4.002 3.708 4.644 3.708 5.755V6.498C3.708 7.605 4.188 8.225 5.027 8.225C5.717 8.225 6.165 7.79 6.213 7.175H7.36V7.289C7.303 8.436 6.332 9.227 5.018 9.227C3.405 9.227 2.5 8.199 2.5 6.498V5.751C2.5 4.051 3.414 3 5.018 3C6.336 3 7.308 3.813 7.36 5V5.11H6.213C6.165 4.472 5.708 4.002 5.027 4.002V4.002ZM11.167 4.002C10.336 4.002 9.848 4.644 9.848 5.755V6.498C9.848 7.605 10.328 8.225 11.166 8.225C11.856 8.225 12.305 7.79 12.353 7.175H13.5V7.289C13.443 8.436 12.472 9.227 11.158 9.227C9.545 9.227 8.64 8.199 8.64 6.498V5.751C8.64 4.051 9.554 3 11.158 3C12.476 3 13.448 3.813 13.5 5V5.11H12.353C12.305 4.472 11.848 4.002 11.166 4.002H11.167Z"
        fill={color}
      />
    </svg>
  );
}

export function Maximize({
  className = "",
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} feather feather-maximize`}
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
    </svg>
  );
}

export function Minimize({
  className = "",
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-minimize ${className}`}
    >
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
    </svg>
  );
}

export function P10({
  className = "",
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13C6 9.69 8.69 7 12 7V11L17 6L12 1V5C7.58 5 4 8.58 4 13C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13H18Z"
        fill={color}
      />
      <path
        d="M10.9 16V11.73H10.81L9.03998 12.36V13.05L10.05 12.74V16H10.9ZM14.32 11.78C14.14 11.71 13.95 11.68 13.73 11.68C13.51 11.68 13.32 11.71 13.14 11.78C12.96 11.85 12.81 11.96 12.69 12.11C12.57 12.26 12.46 12.45 12.4 12.68C12.34 12.91 12.3 13.18 12.3 13.5V14.24C12.3 14.56 12.34 14.84 12.41 15.06C12.48 15.28 12.58 15.48 12.71 15.63C12.84 15.78 12.99 15.89 13.17 15.96C13.35 16.03 13.54 16.06 13.76 16.06C13.98 16.06 14.17 16.03 14.35 15.96C14.53 15.89 14.68 15.78 14.8 15.63C14.92 15.48 15.02 15.29 15.09 15.06C15.16 14.83 15.19 14.56 15.19 14.24V13.5C15.19 13.18 15.15 12.9 15.08 12.68C15.01 12.46 14.91 12.26 14.78 12.11C14.65 11.96 14.49 11.85 14.32 11.78ZM14.33 14.35C14.33 14.54 14.32 14.7 14.29 14.83C14.26 14.96 14.23 15.07 14.18 15.15C14.13 15.23 14.07 15.29 13.99 15.32C13.91 15.35 13.83 15.37 13.74 15.37C13.65 15.37 13.56 15.35 13.49 15.32C13.42 15.29 13.35 15.23 13.3 15.15C13.25 15.07 13.21 14.96 13.18 14.83C13.15 14.7 13.14 14.54 13.14 14.35V13.38C13.14 13.19 13.15 13.03 13.18 12.9C13.21 12.77 13.24 12.67 13.3 12.59C13.36 12.51 13.41 12.45 13.49 12.42C13.57 12.39 13.65 12.37 13.74 12.37C13.83 12.37 13.92 12.39 13.99 12.42C14.06 12.45 14.13 12.51 14.18 12.59C14.23 12.67 14.27 12.77 14.3 12.9C14.33 13.03 14.34 13.19 14.34 13.38V14.35H14.33Z"
        fill={color}
      />
    </svg>
  );
}

export function M10({
  className = "",
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.99 5V1L6.98999 6L11.99 11V7C15.3 7 17.99 9.69 17.99 13C17.99 16.31 15.3 19 11.99 19C8.67999 19 5.98999 16.31 5.98999 13H3.98999C3.98999 17.42 7.56999 21 11.99 21C16.41 21 19.99 17.42 19.99 13C19.99 8.58 16.41 5 11.99 5V5ZM10.89 16H10.04V12.74L9.02999 13.05V12.36L10.8 11.73H10.89V16ZM15.17 14.24C15.17 14.56 15.14 14.84 15.07 15.06C15 15.28 14.9 15.48 14.78 15.63C14.66 15.78 14.5 15.89 14.33 15.96C14.16 16.03 13.96 16.06 13.74 16.06C13.52 16.06 13.33 16.03 13.15 15.96C12.97 15.89 12.82 15.78 12.69 15.63C12.56 15.48 12.46 15.29 12.39 15.06C12.32 14.83 12.28 14.56 12.28 14.24V13.5C12.28 13.18 12.31 12.9 12.38 12.68C12.45 12.46 12.55 12.26 12.67 12.11C12.79 11.96 12.95 11.85 13.12 11.78C13.29 11.71 13.49 11.68 13.71 11.68C13.93 11.68 14.12 11.71 14.3 11.78C14.48 11.85 14.63 11.96 14.76 12.11C14.89 12.26 14.99 12.45 15.06 12.68C15.13 12.91 15.17 13.18 15.17 13.5V14.24V14.24ZM14.32 13.38C14.32 13.19 14.31 13.03 14.28 12.9C14.25 12.77 14.21 12.67 14.16 12.59C14.11 12.51 14.05 12.45 13.97 12.42C13.89 12.39 13.81 12.37 13.72 12.37C13.63 12.37 13.54 12.39 13.47 12.42C13.4 12.45 13.33 12.51 13.28 12.59C13.23 12.67 13.19 12.77 13.16 12.9C13.13 13.03 13.12 13.19 13.12 13.38V14.35C13.12 14.54 13.13 14.7 13.16 14.83C13.19 14.96 13.23 15.07 13.28 15.15C13.33 15.23 13.39 15.29 13.47 15.32C13.55 15.35 13.63 15.37 13.72 15.37C13.81 15.37 13.9 15.35 13.97 15.32C14.04 15.29 14.11 15.23 14.16 15.15C14.21 15.07 14.25 14.96 14.27 14.83C14.29 14.7 14.31 14.54 14.31 14.35V13.38H14.32Z"
        fill={color}
      />
    </svg>
  );
}

export function ReportIcon({
  className = "",
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      width={fontSize}
      height={fontSize}
      viewBox="0 0 16 16"
      fill={bg}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 1H14.5L15 1.5V11.5L14.5 12H7.707L4.854 14.854L4 14.5V12H1.5L1 11.5V1.5L1.5 1ZM7.5 11H14V2H2V11H4.5L5 11.5V13.293L7.146 11.146L7.5 11ZM7.5 3H8.5V8H7.5V3ZM7.5 10H8.5V9H7.5V10Z"
        fill={color}
      />
    </svg>
  );
}

export function ClockIcon({
  className = "",
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fontSize}
      height={fontSize}
      viewBox="0 0 24 24"
      fill={bg}
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-clock"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

export function DownloadIcon({
  className = "",
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 122.88"
    >
      <path
        className="cls-1"
        d="M25.2,0H97.68a25.27,25.27,0,0,1,25.2,25.2V97.68a25.27,25.27,0,0,1-25.2,25.2H25.2A25.27,25.27,0,0,1,0,97.68V25.2A25.27,25.27,0,0,1,25.2,0ZM72.92,49.32a3.83,3.83,0,0,1,5.37,5.46L63.75,69.14a3.84,3.84,0,0,1-5.37,0L44.05,55a3.83,3.83,0,1,1,5.36-5.46l7.89,7.82.08-27.53a3.83,3.83,0,0,1,7.66.06L65,57.19l8-7.87ZM31,84.48l.05-15a3.83,3.83,0,0,1,7.66.07l0,10.91q22.82,0,45.61,0l0-11a3.83,3.83,0,0,1,7.66.07l-.05,14.91h0A3.83,3.83,0,0,1,88,88.13q-26.66,0-53.28,0A3.83,3.83,0,0,1,31,84.48Z"
      />
    </svg>
  );
}

export function ResumeIcon({
  className = "",
  fontSize = defaultFontSize,
  bg = "none",
  color = "#fff",
}) {
  return (
    <svg
      width={fontSize}
      height={fontSize}
      viewBox="0 0 31 31"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.0705 5.21914C24.2369 2.02227 20.1137 0 15.5 0C6.93867 0 0 6.93867 0 15.5H3.875C3.875 9.07598 9.07598 3.875 15.5 3.875C19.042 3.875 22.1844 5.47949 24.3096 7.98008L20.6646 11.625H31V1.28965L27.0705 5.21914ZM15.5 27.125C11.958 27.125 8.81562 25.5205 6.69043 23.0199L10.3354 19.375H0V29.7104L3.92949 25.7809C6.76309 28.9777 10.8924 31 15.5 31C24.0613 31 31 24.0613 31 15.5H27.125C27.125 21.924 21.924 27.125 15.5 27.125V27.125Z"
        fill={color}
      />
    </svg>
  );
}
