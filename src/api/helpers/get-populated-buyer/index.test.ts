import getPopulatedBuyer from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import country from '../../test-helpers/country';
import buyer from '../../test-helpers/buyer';
import buyerRelationship from '../../test-helpers/buyer-relationship';
import buyerTradingHistory from '../../test-helpers/buyer-trading-history';
import { Context, ApplicationBuyer, ApplicationBuyerRelationship, ApplicationBuyerTradingHistory, Country } from '../../types';

describe('helpers/get-populated-buyer', () => {
  let context: Context;
  let createdCountry: Country;
  let createdBuyer: ApplicationBuyer;
  let createdRelationship: ApplicationBuyerRelationship;
  let createdTradingHistory: ApplicationBuyerTradingHistory;
  let buyerCountryConnectObject = {};
  let buyerRelationshipConnectObject = {};

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdCountry = (await country.create(context)) as Country;

    buyerCountryConnectObject = {
      connect: {
        id: createdCountry.id,
      },
    };

    const initBuyer = {
      country: buyerCountryConnectObject,
    };

    createdBuyer = (await buyer.create(context, initBuyer)) as ApplicationBuyer;

    buyerRelationshipConnectObject = {
      connect: {
        id: createdBuyer.id,
      },
    };

    const buyerRelationshipObject = {
      buyer: buyerRelationshipConnectObject,
    };

    createdRelationship = (await buyerRelationship.create(context, buyerRelationshipObject)) as ApplicationBuyerRelationship;

    createdTradingHistory = (await buyerTradingHistory.create(context, buyerRelationshipObject)) as ApplicationBuyerTradingHistory;
  });

  it('should return a populated buyer', async () => {
    const result = await getPopulatedBuyer(context, createdBuyer.id);

    expect(result.id).toEqual(createdBuyer.id);

    expect(result.country).toEqual(createdCountry);

    expect(result.relationship).toEqual(createdRelationship);

    expect(result.buyerTradingHistory.id).toEqual(createdTradingHistory.id);
  });

  describe('when a buyer is not found', () => {
    it('should throw an error', async () => {
      const expectedErrorMessage = `Error getting populated buyer ${mockInvalidId}`;

      await expect(getPopulatedBuyer(context, mockInvalidId)).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe('when a country is not found', () => {
    it('should throw an error', async () => {
      const buyerNoCountry = (await buyer.create(context)) as ApplicationBuyer;

      const expectedErrorMessage = `Error getting populated buyer ${buyerNoCountry.id}`;

      await expect(getPopulatedBuyer(context, buyerNoCountry.id)).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe('when a relationship is not found', () => {
    it('should throw an error', async () => {
      const buyerObject = {
        ...createdBuyer,
        country: buyerCountryConnectObject,
        relationship: {
          connect: {
            id: mockInvalidId,
          },
        },
      };

      const buyerNoRelationship = (await buyer.create(context, buyerObject)) as ApplicationBuyer;

      const expectedErrorMessage = `Error getting populated buyer ${buyerNoRelationship.id}`;

      await expect(getPopulatedBuyer(context, buyerNoRelationship.id)).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe('when a tradingHistory is not found', () => {
    it('should throw an error', async () => {
      const buyerObject = {
        ...createdBuyer,
        country: buyerCountryConnectObject,
        relationship: buyerRelationshipConnectObject,
        buyerTradingHistory: {
          connect: {
            id: mockInvalidId,
          },
        },
      };

      const buyerNoRelationship = (await buyer.create(context, buyerObject)) as ApplicationBuyer;

      const expectedErrorMessage = `Error getting populated buyer ${buyerNoRelationship.id}`;

      await expect(getPopulatedBuyer(context, buyerNoRelationship.id)).rejects.toThrow(expectedErrorMessage);
    });
  });
});
