import "./spinner.css";

/**
 * @param {{size: 'small' | 'medium' | 'large', color: string}} options
 */
export const Spinner = ({ size = "medium", color = "white" }) => {
  return (
    <div className={`spinner spinner__${size} spinner__${color}`}>
      <span className="spinner__visuallyhidden">Loading...</span>
    </div>
  );
};
