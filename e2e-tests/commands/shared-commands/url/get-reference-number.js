const getReferenceNumber = () => cy.url().then((url) => {
  const splitUrl = url.split('/');
  const { 4: referenceNumber } = splitUrl;

  return referenceNumber;
});

export default getReferenceNumber;
