interface Props {
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
}

const Button = ({ onClick, children }: Props): React.ReactElement => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center space-x-2 rounded-md bg-white/10 hover:bg-white/20 active:bg-white/10 duration-150 border border-white/10 px-4 py-2"
    >
      {children}
    </button>
  );
};

export default Button;
