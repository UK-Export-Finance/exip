import { Request, Response } from '../../../types';
import isHighRiskCountryEligible from '../../helpers/is-high-risk-country-eligible-for-quote';
import { PAGES } from '../../content-strings';
import { ROUTES } from '../../constants';

const {
  TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT: {
    CONTACT_EFM: {
      REASON: { HIGH_RISK_COUNTRY_COVER_ABOVE_THRESHOLD },
    },
  },
} = PAGES;

const RELEVANT_ROUTES = [
  ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
  ROUTES.QUOTE.CHECK_YOUR_ANSWERS,
  ROUTES.QUOTE.YOUR_QUOTE,
];

/**
 * Express middleware to check if the selected buyer country is classified as `high risk`
 * and if the requested percentage of cover exceeds the allowed threshold (90%).
 *
 * If the country is high risk and the cover percentage is above `90%`, the user is redirected
 * to the Export Finance Manager (EFM) exit page with an appropriate exit reason.
 * Otherwise, the request proceeds to the next middleware.
 *
 * @param req - Express request object, expected to contain session.submittedData.quoteEligibility
 * @param res - Express response object, used for redirection
 * @param next - Callback to pass control to the next middleware
 */
export const isHighRiskCountry = (req: Request, res: Response, next: () => void) => {
  const { originalUrl: url, session } = req;

  const isRelevantRoute = (route: string) => RELEVANT_ROUTES.includes(route);

  if (!session?.submittedData || !isRelevantRoute(url)) {
    return next();
  }

  const {
    submittedData: { quoteEligibility },
  } = session;
  const { buyerCountry, percentageOfCover } = quoteEligibility;
  const submittedPercentageOfCover = Number(percentageOfCover);

  if (!isHighRiskCountryEligible(buyerCountry?.isHighRisk, submittedPercentageOfCover)) {
    console.info('High risk country %s with high cover %i - cannot get a quote', buyerCountry?.name, submittedPercentageOfCover);

    req.flash('exitReason', HIGH_RISK_COUNTRY_COVER_ABOVE_THRESHOLD);

    return res.redirect(ROUTES.QUOTE.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
  }

  return next();
};
