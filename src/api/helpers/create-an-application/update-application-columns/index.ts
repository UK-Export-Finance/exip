import { UpdateApplicationRelationshipParams } from '../../../types';

/**
 * updateApplicationColumns
 * Update the application with relationships for:
 * 1) Broker
 * 2) Business
 * 3) Buyer
 * 4) Company
 * 5) Decalaration
 * 6) Eligibility
 * 7) Export contract
 * 8) Nominated loss payee
 * 9) Policy
 * 10) Policy contact
 * 11) Reference number
 * 12) Section review
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @param {string} brokerId: Broker ID
 * @param {string} businessId: Business ID
 * @param {string} buyerId: Buyer ID
 * @param {string} companyId: Company ID
 * @param {string} declarationId: Declaration ID
 * @param {string} eligibilityId: Eligibility ID
 * @param {string} exportContractId: Export contract ID
 * @param {string} nominatedLossPayeeId: Nominated loss payee ID
 * @param {string} policyId: Policy ID
 * @param {string} policyContactId: Policy contact ID
 * @param {string} referenceNumberId: Reference number ID
 * @param {string} sectionReviewId: Section review ID
 */
const updateApplicationColumns = async ({
  context,
  applicationId,
  brokerId,
  businessId,
  buyerId,
  companyId,
  declarationId,
  eligibilityId,
  exportContractId,
  nominatedLossPayeeId,
  policyId,
  policyContactId,
  referenceNumber,
  sectionReviewId,
}: UpdateApplicationRelationshipParams) => {
  try {
    console.info('Updating application relationship columns (updateApplicationColumns helper) for application %s', applicationId);

    const updatedApplication = await context.db.Application.updateOne({
      where: {
        id: applicationId,
      },
      data: {
        broker: {
          connect: { id: brokerId },
        },
        business: {
          connect: { id: businessId },
        },
        buyer: {
          connect: { id: buyerId },
        },
        company: {
          connect: { id: companyId },
        },
        declaration: {
          connect: { id: declarationId },
        },
        eligibility: {
          connect: { id: eligibilityId },
        },
        exportContract: {
          connect: { id: exportContractId },
        },
        nominatedLossPayee: {
          connect: { id: nominatedLossPayeeId },
        },
        policy: {
          connect: { id: policyId },
        },
        policyContact: {
          connect: { id: policyContactId },
        },
        referenceNumber,
        sectionReview: {
          connect: { id: sectionReviewId },
        },
      },
    });

    return updatedApplication;
  } catch (error) {
    console.error('Error updating application relationship columns (updateApplicationColumns helper) for application %s %o', applicationId, error);

    throw new Error(`Updating application relationship columns (updateApplicationColumns helper) for application ${applicationId} ${error}`);
  }
};

const applicationColumns = {
  update: updateApplicationColumns,
};

export default applicationColumns;
