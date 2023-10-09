import generate from '.';
import getPopulatedApplication from '../helpers/get-populated-application';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../test-helpers';
import fileSystem from '../file-system';

describe('api/generate-xlsx/index', () => {
  it('should return an XLSX file path', async () => {
    const context = getKeystoneContext();
    const application = await createFullApplication(context);

    const applicationIds = mapApplicationIds(application);
    const populatedApplication = await getPopulatedApplication(context, applicationIds);

    const submittedApplication = {
      ...populatedApplication,
      submissionDate: new Date(),
    };

    const result = await generate.XLSX(submittedApplication);

    const expected = `XLSX/${submittedApplication.referenceNumber}.xlsx`;

    expect(result).toEqual(expected);

    // delete the file so we don't create a file during unit tests.

    await fileSystem.unlink(expected);
  });
});
