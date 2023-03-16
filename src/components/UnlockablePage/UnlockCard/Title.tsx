type Props = {
  text: string | undefined;
};

const Title = ({ text }: Props) => (
  <h1 className="font-display md:text-lg">
    {text ? text : "A mystery awaits..."}
  </h1>
);

export default Title;
