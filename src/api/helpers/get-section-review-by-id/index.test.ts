import getSectionReviewById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import sectionReview from '../../test-helpers/sectionReview';
import { Context, SectionReview } from '../../types';

describe('helpers/get-section-review-by-id', () => {
  let context: Context;
  let createdSectionReview: SectionReview;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdSectionReview = (await sectionReview.create(context)) as SectionReview;
  });

  it('should return a sectionReview by ID', async () => {
    const result = await getSectionReviewById(context, createdSectionReview.id);

    expect(result.id).toEqual(createdSectionReview.id);
  });

  describe('when a sectionReview is not found', () => {
    it('should throw an error', async () => {
      try {
        await getSectionReviewById(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting sectionReview by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
