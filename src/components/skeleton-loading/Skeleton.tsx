// src/components/skeleton-loading/Skeleton.tsx
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "light" | "dark" | "text" | "circle" | "button";
  width?: string;
  height?: string;
  rounded?: string;
}

export function Skeleton({
  className = "",
  variant = "default",
  width,
  height,
  rounded = "rounded-[7px]",
  style,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: "bg-[#F7F8F81A]",
    light: "bg-[#F7F8F805]",
    dark: "bg-[#F7F8F81C]",
    text: "bg-[#F7F8F81A]",
    circle: "bg-[#F7F8F81A] rounded-full",
    button: "bg-gradient-to-b from-[#F7F8F81A] to-[#F7F8F81C]",
  };

  const baseStyle = {
    width: width || "100%",
    height: height || "auto",
    ...style,
  };

  const variantClass = variantStyles[variant];
  const roundedClass = variant === "circle" ? "rounded-full" : rounded;
  const animationClass = "animate-pulse";

  return (
    <div
      className={`${animationClass} ${roundedClass} ${variantClass} ${className}`}
      style={baseStyle}
      {...props}
    />
  );
}