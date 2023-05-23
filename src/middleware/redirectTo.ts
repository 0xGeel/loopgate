export const redirectTo = (url: string, isPermanent: boolean = false) => {
  return {
    redirect: {
      destination: url,
      permanent: isPermanent,
    },
  };
};
