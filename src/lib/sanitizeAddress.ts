export const sanitizeAddress = (address: string) => {
  if (address.length <= 12) return address;
  return address.slice(0, 4) + "..." + address.slice(-4);
};
