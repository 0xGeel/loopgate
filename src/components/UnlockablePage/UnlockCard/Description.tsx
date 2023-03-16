type Props = { text: string | undefined };

const Description = ({ text }: Props) => (
  <p className={"text-white/60 text-sm mt-2"}>
    {text
      ? text
      : "The owner of this unlockable has not (yet) specified a description for this content. We are sure it kicks ass though."}
  </p>
);

export default Description;
