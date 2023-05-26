const truncate0x = (address: string) => {
  const len = address.length;

  if (!address.startsWith("0x") || len != 42) {
    return address;
  }

  return `${address.slice(0, 6)}…${address.slice(len - 4, len)}`;
};

export default truncate0x;
