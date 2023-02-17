export default (selector, textToType) => {
  selector.clear().type(textToType, { delay: 0 });
};
