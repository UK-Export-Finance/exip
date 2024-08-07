import createADeclaration from '.';
import { Application, Context } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

describe('helpers/create-a-declaration', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
  });

  test('it should return a declaration', async () => {
    const result = await createADeclaration(context, application.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');

    expect(result.antiBribery).toEqual('');
    expect(result.confirmationAndAcknowledgements).toEqual('');
    expect(result.howDataWillBeUsed).toEqual('');
    expect(result.agreeToConfidentiality).toBeNull();
    expect(result.agreeToAntiBribery).toBeNull();
    expect(result.hasAntiBriberyCodeOfConduct).toBeNull();
    expect(result.willExportWithAntiBriberyCodeOfConduct).toBeNull();
    expect(result.agreeToConfirmationAndAcknowledgements).toBeNull();
    expect(result.agreeHowDataWillBeUsed).toBeNull();
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      await expect(createADeclaration(context, mockInvalidId)).rejects.toThrow('Creating a declaration');
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      await expect(createADeclaration({}, application.id)).rejects.toThrow('Creating a declaration');
    });
  });
});
