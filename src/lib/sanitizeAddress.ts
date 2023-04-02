export const sanitizeAddress = (address: string) => {
  const len = 7
  if (address.length <= 12) return address;
  return address.slice(0, len) + "..." + address.slice(-len);
};
