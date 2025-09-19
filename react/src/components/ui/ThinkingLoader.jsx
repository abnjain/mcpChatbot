export default function ThinkingDotsLoader() {
    return (
      <svg
        width="80"
        height="20"
        style={{
          padding: "16px 8px 8px 8px"
        }}
        viewBox="0 0 60 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="5" fill="black">
          <animate
            attributeName="cy"
            values="10;5;10"
            dur="0.6s"
            begin="0s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
            keySplines=".25,.1,.25,1; .25,.1,.25,1"
            calcMode="spline"
          />
        </circle>

        <circle cx="30" cy="10" r="5" fill="black">
          <animate
            attributeName="cy"
            values="10;5;10"
            dur="0.6s"
            begin="0.2s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
            keySplines=".25,.1,.25,1; .25,.1,.25,1"
            calcMode="spline"
          />
        </circle>

        <circle cx="50" cy="10" r="5" fill="black">
          <animate
            attributeName="cy"
            values="10;5;10"
            dur="0.6s"
            begin="0.4s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
            keySplines=".25,.1,.25,1; .25,.1,.25,1"
            calcMode="spline"
          />
        </circle>
      </svg>

    );
  }