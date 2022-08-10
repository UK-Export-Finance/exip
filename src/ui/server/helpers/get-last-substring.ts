const getLastSubstring = (str: string) =>
  str.substring(str.lastIndexOf('/') + 1);

export default getLastSubstring;
