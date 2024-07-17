const contactDetails = {
  phone: () => cy.get('[data-cy="contact-details-phone"]'),
  openingTimes: () => cy.get('[data-cy="contact-details-opening-times"]'),
};

export default contactDetails;
