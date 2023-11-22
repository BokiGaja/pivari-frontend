export const truncateString = (string, size) => (string.length > size ? string.slice(0, size - 1) + '…' : string);
