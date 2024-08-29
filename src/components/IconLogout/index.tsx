interface Props {
  width?: string | number;
  height?: string | number;
  fill?: string;
}

export const Logout = ({
  height = 24,
  width = 24,
  fill = "#F9F9F9",
}: Props) => {
  return (
    <div style={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="inherit"
        width="inherit"
        fill={fill}
        viewBox="0 -960 960 960"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
      </svg>
    </div>
  );
};
