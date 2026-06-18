import "./skeleton.css";

export const Skeleton = ({
  borderRadius = 8,
  width,
  height,
  className,
  style,
}) => {
  return (
    <div
      className={`skeleton ${className || ""}`}
      style={{
        borderRadius,
        width,
        height,
        ...style,
      }}
    ></div>
  );
};
