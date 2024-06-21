import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationBuyerMvp } from '../../types';

/**
 * NOTE: The buyer data we receive is raw database data.
 * In the database, boolean fields are TINYINT/integer values.
 * The KeystoneJS context/GraphQL API expects these fields to be booleans.
 * Therefore, since the TINYINT values will be 0 or 1,
 * we can safely transform any TINYINT fields to have a boolean value.
 * KeystoneJS will then automatically handle saving in the database as a TINYINT
 */

export const moveBuyerContactFields = async (buyers: Array<ApplicationBuyerMvp>, context: Context) => {
  const mappedBuyerContactData = buyers.map((buyer: ApplicationBuyerMvp) => {
    const mapped = {
      application: {
        connect: {
          id: buyer.application,
        },
      },
      canContactBuyer: Boolean(buyer.canContactBuyer),
      contactEmail: buyer.contactEmail,
      contactFirstName: buyer.contactFirstName,
      contactLastName: buyer.contactLastName,
      contactPosition: buyer.contactPosition,
    };

    return mapped;
  });

  const created = await context.db.BuyerContact.createMany({
    data: mappedBuyerContactData,
  });

  return created;
};

export const moveBuyerRelationshipFields = async (buyers: Array<ApplicationBuyerMvp>, context: Context) => {
  const mappedBuyerRelationshipData = buyers.map((buyer: ApplicationBuyerMvp) => {
    const mapped = {
      application: {
        connect: {
          id: buyer.application,
        },
      },
      exporterIsConnectedWithBuyer: Boolean(buyer.exporterIsConnectedWithBuyer),
    };

    return mapped;
  });

  const created = await context.db.BuyerRelationship.createMany({
    data: mappedBuyerRelationshipData,
  });

  return created;
};

export const moveBuyerTradingHistoryFields = async (buyers: Array<ApplicationBuyerMvp>, context: Context) => {
  const mappedBuyerTradingHistoryData = buyers.map((buyer: ApplicationBuyerMvp) => {
    const mapped = {
      application: {
        connect: {
          id: buyer.application,
        },
      },
      exporterHasTradedWithBuyer: Boolean(buyer.exporterHasTradedWithBuyer),
    };

    return mapped;
  });

  const created = await context.db.BuyerTradingHistory.createMany({
    data: mappedBuyerTradingHistoryData,
  });

  return created;
};
