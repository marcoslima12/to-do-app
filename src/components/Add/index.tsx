interface Props {
  width?: string | number;
  height?: string | number;
  fill?: string;
}

export const Add = ({ height = 24, width = 24, fill = "#F9F9F9" }: Props) => {
  return (
    <div style={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="inherit"
        viewBox="0 -960 960 960"
        width="inherit"
        fill={fill}
      >
        <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" />
      </svg>
    </div>
  );
};
