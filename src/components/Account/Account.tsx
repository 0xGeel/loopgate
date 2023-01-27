import { useAccount, useEnsName } from "wagmi";

const Account = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <p>
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
    </p>
  );
};

export default Account;
