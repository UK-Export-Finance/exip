import { Application } from '../types';

/**
 * Collate an object of IDs in an application.
 * This is then used in "getPopulatedApplication".
 * @param {Application} Application
 * @returns {Object} IDs in an application
 */
export const mapApplicationIds = (application: Application) => {
  const { company, business, broker, buyer, declaration, eligibility, exportContract, id, owner, policy, policyContact, nominatedLossPayee, sectionReview } =
    application;

  const ids = {
    companyId: company.id,
    businessId: business.id,
    brokerId: broker.id,
    buyerId: buyer.id,
    declarationId: declaration.id,
    eligibilityId: eligibility.id,
    exportContractId: exportContract.id,
    id,
    ownerId: owner.id,
    policyId: policy.id,
    policyContactId: policyContact.id,
    nominatedLossPayeeId: nominatedLossPayee.id,
    sectionReviewId: sectionReview.id,
  };

  return ids;
};

export default mapApplicationIds;
