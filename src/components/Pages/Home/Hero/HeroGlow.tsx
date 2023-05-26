type Props = {
  className: string;
};

const HeroGlow = ({ className }: Props) => (
  <div className="absolute w-full max-w-full -z-10 -top-96 flex flex-col items-center overlfow-x-clip">
    <svg
      viewBox="0 0 714 496"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="357" cy="248" rx="357" ry="248" fill="currentColor" />
    </svg>
  </div>
);

export default HeroGlow;
