import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get, post } from '../../../test-mocks/mock-router';
import { get as buyerRootGet } from '../../../controllers/insurance/your-buyer';
import { get as getCompanyOrOrganisation, post as postCompanyOrOrganisation } from '../../../controllers/insurance/your-buyer/company-or-organisation';
import { post as postCompanyOrOrganisationSaveAndBack } from '../../../controllers/insurance/your-buyer/company-or-organisation/save-and-back';

import { get as getConnectionWithBuyer, post as postConnectionWithBuyer } from '../../../controllers/insurance/your-buyer/connection-with-buyer';
import { post as postConnectionToTheBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/connection-with-buyer/save-and-back';

import { get as getTradedWithBuyer, post as postTradedWithBuyer } from '../../../controllers/insurance/your-buyer/traded-with-buyer';
import { post as postTradedWithBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/traded-with-buyer/save-and-back';

import { get as getTradingHistory, post as postTradingHistory } from '../../../controllers/insurance/your-buyer/trading-history';

import { get as getAlternativeCurrency, post as postAlternativeCurrency } from '../../../controllers/insurance/your-buyer/alternative-currency';

import { get as getCreditInsuranceCover } from '../../../controllers/insurance/your-buyer/credit-insurance-cover';

import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/your-buyer/check-your-answers';

describe('routes/insurance/your-buyer', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(14);
    expect(post).toHaveBeenCalledTimes(15);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.ROOT}`, buyerRootGet);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, getCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, postCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`, postCompanyOrOrganisationSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHANGE}`, getCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHANGE}`, postCompanyOrOrganisation);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, getCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, postCompanyOrOrganisation);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER}`, getConnectionWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER}`, postConnectionWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_SAVE_AND_BACK}`, postConnectionToTheBuyerSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHANGE}`, getConnectionWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHANGE}`, postConnectionWithBuyer);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, getConnectionWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, postConnectionWithBuyer);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER}`, getTradedWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER}`, postTradedWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_SAVE_AND_BACK}`, postTradedWithBuyerSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHANGE}`, getTradedWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHANGE}`, postTradedWithBuyer);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHECK_AND_CHANGE}`, getTradedWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHECK_AND_CHANGE}`, postTradedWithBuyer);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY}`, getTradingHistory);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY}`, postTradingHistory);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.ALTERNATIVE_CURRENCY}`, getAlternativeCurrency);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.ALTERNATIVE_CURRENCY}`, postAlternativeCurrency);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER}`, getCreditInsuranceCover);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);
  });
});
