import generate from '.';
import { generateSubmittedApplication } from '../test-helpers';
import fileSystem from '../file-system';
import dotenv from 'dotenv';

dotenv.config();

describe('api/generate-xlsx/index', () => {
  it('should return an XLSX file path', async () => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', String(process.env.DATABASE_URL_LOCAL))
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', String(process.env.DATABASE_URL))

    const submittedApplication = await generateSubmittedApplication();

    const result = await generate.XLSX(submittedApplication);

    const expected = `XLSX/${submittedApplication.referenceNumber}.xlsx`;

    expect(result).toEqual(expected);

    // delete the file so we don't create a file during unit tests.

    await fileSystem.unlink(expected);
  });
});
