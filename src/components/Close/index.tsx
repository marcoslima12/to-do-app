interface Props {
  width?: string | number;
  height?: string | number;
  fill?: string;
}

export const Close = ({ height = 24, width = 24, fill = "#F9F9F9" }: Props) => {
  return (
    <div style={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill={fill}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </div>
  );
};
