const checkText = (selector, expectedMessage) =>
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(expectedMessage);
  });

export default checkText;
