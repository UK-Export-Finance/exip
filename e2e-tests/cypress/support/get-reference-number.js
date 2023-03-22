const getReferenceNumber = () => cy.url().then((url) => {
  const splitUrl = url.split('/');
  const referenceNumber = splitUrl[4];

  return referenceNumber;
});

export default getReferenceNumber;
