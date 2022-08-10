// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortArrayAlphabetically = (arr: Array<any>, field: string) => arr.sort((a, b) => a[field].localeCompare(b[field]));

export default sortArrayAlphabetically;
