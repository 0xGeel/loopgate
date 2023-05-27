export const redirectTo = (url: string, isPermanent = false) => {
  return {
    redirect: {
      destination: url,
      permanent: isPermanent,
    },
  };
};
