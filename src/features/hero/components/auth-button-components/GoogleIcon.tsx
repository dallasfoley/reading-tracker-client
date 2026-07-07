interface GoogleIconProps {
  size?: number
  className?: string
  opacity?: number
  rotation?: number
  shadow?: number
  flipHorizontal?: boolean
  flipVertical?: boolean
  padding?: number
}

const GoogleIcon = ({
  size = 22,
  className,
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0,
}: GoogleIconProps) => {
  const transforms = []
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`)
  if (flipHorizontal) transforms.push('scaleX(-1)')
  if (flipVertical) transforms.push('scaleY(-1)')

  const viewBoxSize = 24 + padding * 2
  const viewBoxOffset = -padding
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      fill="none"
      style={{
        opacity,
        transform: transforms.join(' ') || undefined,
        filter:
          shadow > 0
            ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))`
            : undefined,
      }}
    >
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.62-.21-2.38H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v2.96h3.88c2.27-2.1 3.57-5.18 3.57-8.72Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.88-2.96c-1.08.72-2.46 1.14-4.06 1.14c-3.13 0-5.78-2.11-6.73-4.95H1.26v3.05A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.32A7.2 7.2 0 0 1 4.9 12c0-.8.13-1.58.37-2.32V6.63H1.26A12 12 0 0 0 0 12c0 1.94.46 3.77 1.26 5.37l4.01-3.05Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.73c1.76 0 3.34.61 4.58 1.8l3.44-3.44A11.51 11.51 0 0 0 12 0A12 12 0 0 0 1.26 6.63l4.01 3.05C6.22 6.84 8.87 4.73 12 4.73Z"
      />
    </svg>
  )
}

export default GoogleIcon
