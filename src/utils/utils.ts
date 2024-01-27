export const getShortName = (name: string): string => {
  return name
    .split(" ")
    .splice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};
