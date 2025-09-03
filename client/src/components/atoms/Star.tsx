type StarProps = {
  color: string;
};

const Star = ({ color }: StarProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="14.25"
      viewBox="0 0 16 15"
      fill="none"
    >
      <path
        d="M8 11.4525L12.635 14.25L11.405 8.9775L15.5 5.43L10.1075 4.9725L8 0L5.8925 4.9725L0.5 5.43L4.595 8.9775L3.365 14.25L8 11.4525Z"
        fill={color}
      />
    </svg>
  );
};

export default Star;
