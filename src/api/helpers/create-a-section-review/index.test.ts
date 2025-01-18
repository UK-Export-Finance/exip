import createASectionReview from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { Application, Context, SectionReview } from '../../types';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating a section review')).toEqual(true);
};

describe('helpers/create-a-section-review', () => {
  let context: Context;
  let application: Application;
  let sectionReview: SectionReview;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;

    sectionReview = { eligibility: true };
  });

  it('should return a sectionReview with ID', async () => {
    const result = await createASectionReview(context, application.id, sectionReview);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  it('should return empty sectionReview fields apart from eligibility', async () => {
    const result = await createASectionReview(context, application.id, sectionReview);

    expect(result.applicationId).toEqual(application.id);
    expect(result.eligibility).toEqual(true);
    expect(result.business).toBeNull();
    expect(result.policy).toBeNull();
    expect(result.buyer).toBeNull();
  });

  describe('when an invalid sectionReview is passed', () => {
    it('should throw an error', async () => {
      try {
        await createASectionReview(context, application.id, {} as SectionReview);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    it('should throw an error', async () => {
      try {
        await createASectionReview(context, mockInvalidId, {} as SectionReview);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
