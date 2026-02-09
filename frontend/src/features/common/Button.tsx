interface Props {
	label: string;
  onClick: () => void;
}

function Button({ label, onClick }: Props) {
  return (
    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
