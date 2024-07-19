import getPopulatedBuyer from '.';
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
      const invalidId = 'invalid-id';

      try {
        await getPopulatedBuyer(context, invalidId);
      } catch (err) {
        const expected = `Getting populated buyer ${invalidId}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when a country is not found', () => {
    it('should throw an error', async () => {
      const buyerNoCountry = (await buyer.create(context)) as ApplicationBuyer;

      try {
        await getPopulatedBuyer(context, buyerNoCountry.id);
      } catch (err) {
        const expected = `Getting populated buyer ${buyerNoCountry.id}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when a relationship is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      const buyerObject = {
        country: buyerCountryConnectObject,
        relationship: {
          connect: {
            id: invalidId,
          },
        },
      };

      const buyerNoRelationship = (await buyer.create(context, buyerObject)) as ApplicationBuyer;

      try {
        await getPopulatedBuyer(context, buyerNoRelationship.id);
      } catch (err) {
        const expected = `Getting populated buyer ${buyerNoRelationship.id}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when a tradingHistory is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      const buyerObject = {
        country: buyerCountryConnectObject,
        relationship: buyerRelationshipConnectObject,
        buyerTradingHistory: {
          connect: {
            id: invalidId,
          },
        },
      };

      const buyerNoRelationship = (await buyer.create(context, buyerObject)) as ApplicationBuyer;

      try {
        await getPopulatedBuyer(context, buyerNoRelationship.id);
      } catch (err) {
        const expected = `Getting populated buyer ${buyerNoRelationship.id}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });
});
