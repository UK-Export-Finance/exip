const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');
const { mapAnswersToContent } = require('../../helpers/map-answers-to-content');
const { generateQuoteSummaryList } = require('../../helpers/generate-quote-summary-list');
const {
  mockReq,
  mockRes,
  mockSession,
} = require('../../test-mocks');

describe('controllers/your-quote', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render template', () => {
    req.session.submittedData = mockSession.submittedData;

    controller(req, res);

    const answers = mapAnswersToContent(req.session.submittedData);
    const expectedSummaryList = generateQuoteSummaryList(answers);

    const expectedVariables = {
      CONTENT_STRINGS: {
        PRODUCT: CONTENT_STRINGS.PRODUCT,
        FOOTER: CONTENT_STRINGS.FOOTER,
        BUTTONS: CONTENT_STRINGS.BUTTONS,
        LINKS: CONTENT_STRINGS.LINKS,
        ...CONTENT_STRINGS.PAGES.YOUR_QUOTE_PAGE,
      },
      SUMMARY_LIST: expectedSummaryList,
    };

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.YOUR_QUOTE, expectedVariables);
  });
});
