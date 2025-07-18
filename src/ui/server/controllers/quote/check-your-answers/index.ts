import { Request, Response } from '../../../../types';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { mapAnswersToContent } from '../../../helpers/data-content-mappings/map-answers-to-content';
import { answersSummaryList } from '../../../helpers/summary-lists/answers-summary-list';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import isHighRiskCountryEligible from '../../../helpers/is-high-risk-country-eligible-for-quote';

export const TEMPLATE = TEMPLATES.QUOTE.CHECK_YOUR_ANSWERS;

export const get = (req: Request, res: Response) => {
  const {
    submittedData: { quoteEligibility },
  } = req.session;
  const { buyerCountry } = quoteEligibility;

  const answers = mapAnswersToContent(quoteEligibility);

  const summaryList = answersSummaryList(answers);

  const submittedPercentageOfCover = Number(quoteEligibility.percentageOfCover);

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

  return res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.CHECK_YOUR_ANSWERS, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
    userName: getUserNameFromSession(req.session.user),
    SUMMARY_LIST: summaryList,
  });
};

export const post = (req: Request, res: Response) => res.redirect(ROUTES.QUOTE.YOUR_QUOTE);
