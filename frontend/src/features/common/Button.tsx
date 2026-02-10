interface Props {
	label: string;
  onClick: () => void;
}

function Button({ label, onClick }: Props) {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
