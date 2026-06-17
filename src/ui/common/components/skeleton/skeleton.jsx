import "./skeleton.css";

export const Skeleton = ({ borderRadius = 8, width, height, className }) => {
  return (
    <div
      className={`skeleton ${className || ""}`}
      style={{
        borderRadius,
        width,
        height,
      }}
    ></div>
  );
};
