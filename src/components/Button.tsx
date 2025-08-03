interface Props {
  text: string;
  visible?: boolean;
  color?: "primary" | "secondary" | "warning" | "success";
  onClick: () => void;
}

function Button({ text, color = "primary", visible = true, onClick }: Props) {
  return (
    <button
      className={"me-2 mb-2 mt-2 btn btn-" + color}
      onClick={onClick}
      disabled={!visible}
    >
      {text}
    </button>
  );
}

export default Button;
