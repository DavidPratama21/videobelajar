interface ProgressBarProps {
  value: number; // nilai progress dalam persen (0 - 100)
  color?: string; // opsional, default bg-tertiary
  backgroundColor?: string; // opsional, default bg-tertiary-200
}

const ProgressBar = ({
  value,
  color = "bg-tertiary",
  backgroundColor = "bg-tertiary-200",
}: ProgressBarProps) => {
  return (
    <div className={`w-full h-1 rounded ${backgroundColor}`}>
      <div
        className={`h-1 rounded ${color} transition-all duration-300`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;
