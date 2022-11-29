const getApplicationId = () => cy.url().then((url) => {
  const splitUrl = url.split('/');
  const applicationId = splitUrl[4];

  return applicationId;
});

export default getApplicationId;
