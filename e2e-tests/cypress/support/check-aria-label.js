export default (selector, expectedMessage) => {
  selector.invoke('attr', 'aria-label').then((text) => {
    expect(text.trim()).equal(expectedMessage);
  });
};
