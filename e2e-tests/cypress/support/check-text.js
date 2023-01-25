export default (selector, expectedMessage) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(expectedMessage);
  });
};
