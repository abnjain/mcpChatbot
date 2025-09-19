import React from 'react'

const ToggleIcon = ({ chatOpen, toggleChat }) => {
  return (
    <div>
        <div
          id="container-svg"
          style={{ cursor: 'pointer' }}
          role="button"
          aria-label={chatOpen ? "Close chatbot" : "Open chatbot"}
          tabIndex={0}
          onClick={toggleChat}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleChat()}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 308 308"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_0_1)">
              <rect x="4" width="300" height="300" rx="32" fill="white" />
              <g filter="url(#filter1_n_0_1)">
                <rect x="14" y="10" width="280" height="280" rx="32" fill="white" />
                <rect
                  x="18"
                  y="14"
                  width="272"
                  height="272"
                  rx="28"
                  stroke="url(#paint0_linear_0_1)"
                  strokeWidth="8"
                />
              </g>
              <g filter="url(#filter2_d_0_1)">
                <path
                  d="M83.5795 211H65.1136L118.523 65.5455H136.705L190.114 211H171.648L128.182 88.5568H127.045L83.5795 211ZM90.3977 154.182H164.83V169.807H90.3977V154.182Z"
                  fill="url(#paint1_linear_0_1)"
                />
              </g>
            </g>

            {/* Purple lane */}
            <rect
              x="214"
              y="65"
              width="24"
              height="146"
              rx="1"
              fill="#5832FF"
              style={{ mixBlendMode: "darken" }}
            />

            {/* Bouncing ball */}
            <circle cx="226" cy="77" r="10" fill="white">
              <animate
                attributeName="cy"
                values="77;199;77"
                dur="2s"
                keyTimes="0;0.5;1"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1;0.25 0.1 0.25 1"
                repeatCount="indefinite"
              />
            </circle>

            <defs>
              <filter
                id="filter0_d_0_1"
                x="0"
                y="0"
                width="308"
                height="308"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_0_1"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_0_1"
                  result="shape"
                />
              </filter>

              <filter
                id="filter1_n_0_1"
                x="14"
                y="10"
                width="280"
                height="280"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="2 2"
                  stitchTiles="stitch"
                  numOctaves="3"
                  result="noise"
                  seed="1151"
                />
                <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                  <feFuncA
                    type="discrete"
                    tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                  />
                </feComponentTransfer>
                <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                <feMerge result="effect1_noise_0_1">
                  <feMergeNode in="shape" />
                  <feMergeNode in="color1" />
                </feMerge>
              </filter>

              <filter
                id="filter2_d_0_1"
                x="61.1138"
                y="65.5454"
                width="133"
                height="153.455"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_0_1"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_0_1"
                  result="shape"
                />
              </filter>

              <linearGradient
                id="paint0_linear_0_1"
                x1="170.268"
                y1="80"
                x2="7.61591"
                y2="259.696"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5832FF" />
                <stop offset="1" stopColor="#991E8D" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_0_1"
                x1="169.5"
                y1="17"
                x2="169.5"
                y2="243"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5832FF" />
                <stop offset="1" stopColor="#991E8D" />
              </linearGradient>
            </defs>
          </svg>
        </div>
    </div>
  )
}

export default ToggleIcon