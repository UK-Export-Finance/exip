import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS, PRODUCT, PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { generateQuote } from '../../../generate-quote';
import { quoteSummaryList } from '../../../helpers/summary-lists/quote-summary-list';
import mapQuoteToContent from '../../../helpers/data-content-mappings/map-quote-to-content';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) => {
  const { submittedData } = req.session;

  const quote = generateQuote(submittedData);

  req.session.quote = quote;

  const quoteContent = mapQuoteToContent(quote);

  return res.render(TEMPLATES.QUOTE.YOUR_QUOTE, {
    CONTENT_STRINGS: {
      COOKIES_CONSENT,
      BUTTONS,
      FOOTER,
      LINKS,
      PRODUCT,
      ...PAGES.YOUR_QUOTE_PAGE,
    },
    SUMMARY_LIST: quoteSummaryList(quoteContent),
  });
};

export default get;
