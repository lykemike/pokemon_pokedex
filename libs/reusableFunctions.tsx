export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const pokemonNationalId = (str: string): string =>
  str.length === 2 ? '0' + str : str.length === 1 ? '00' + str : str;

export const capitalizeAndReplaceHyphen = (str: string) => {
  if (!str) return ''; // if str is null or undefined, return an empty string

  // Replace hyphen with space
  str = str.replace(/-/g, ' ');

  // Capitalize first character of each word
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
