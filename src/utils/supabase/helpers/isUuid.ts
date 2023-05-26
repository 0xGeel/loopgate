const uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const isUuid = (potentialUuid: string): boolean => {
  return uuidRegex.test(potentialUuid as string);
};

export default isUuid;
