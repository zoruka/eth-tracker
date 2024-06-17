import { forwardRef } from 'react';

export const Spinner = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        {...props}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 33 33;270 33 33"
            begin="0s"
            dur="1.4s"
            fill="freeze"
            repeatCount="indefinite"
          />
          <circle
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            stroke="currentColor"
            cx="33"
            cy="33"
            r="28"
            strokeDasharray="187"
            strokeDashoffset="610"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 33 33;135 33 33;450 33 33"
              begin="0s"
              dur="1.4s"
              fill="freeze"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="187;46.75;187"
              begin="0s"
              dur="1.4s"
              fill="freeze"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    );
  }
);
Spinner.displayName = 'Spinner';
