const generateArrayOfNumbers = (start: number, stop: number) => Array.from({ length: stop - start }, (value, index) => start + index);

export default generateArrayOfNumbers;
