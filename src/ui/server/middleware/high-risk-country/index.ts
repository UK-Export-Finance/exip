import { Request, Response } from '../../../types';
import isHighRiskCountryEligible from '../../helpers/is-high-risk-country-eligible-for-quote';
import { PAGES } from '../../content-strings';
import { ROUTES } from '../../constants';

export const isHighRiskCountry = (req: Request, res: Response, next: () => void) => {
  const { session } = req;

  const {
    submittedData: { quoteEligibility },
  } = session;

  const { buyerCountry, percentageOfCover } = quoteEligibility;

  const submittedPercentageOfCover = Number(percentageOfCover);

  /**
   * If the selected country is classified as high risk and
   * requested cover of percentage is over 90%,
   * then redirect the user to EFM.
   */

  if (!isHighRiskCountryEligible(buyerCountry?.isHighRisk, submittedPercentageOfCover)) {
    console.info('High risk country %s with high cover %i - cannot get a quote', buyerCountry?.name, submittedPercentageOfCover);

    const {
      TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT: {
        CONTACT_EFM: {
          REASON: { HIGH_RISK_COUNTRY_COVER_ABOVE_THRESHOLD },
        },
      },
    } = PAGES;

    req.flash('exitReason', HIGH_RISK_COUNTRY_COVER_ABOVE_THRESHOLD);

    return res.redirect(ROUTES.QUOTE.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
  }

  next();
};
