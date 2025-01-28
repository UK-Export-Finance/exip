import createADeclarationVersion from '.';
import DECLARATIONS from '../../constants/declarations';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import declarations from '../../test-helpers/declarations';
import { ApplicationDeclaration, Context } from '../../types';
import { mockInvalidId } from '../../test-mocks';

const { CONFIDENTIALITY, ANTI_BRIBERY, ANTI_BRIBERY_CODE_OF_CONDUCT, ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, CONFIRMATION_AND_ACKNOWLEDGEMENTS } =
  DECLARATIONS.LATEST_DECLARATIONS;

describe('helpers/create-a-declaration-version', () => {
  let context: Context;
  let declaration: ApplicationDeclaration;

  beforeAll(async () => {
    context = getKeystoneContext();

    declaration = (await declarations.create(context)) as ApplicationDeclaration;
  });

  it('should return a declaration version with ID', async () => {
    const result = await createADeclarationVersion(context, declaration.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  it('should return a declaration ID', async () => {
    const result = await createADeclarationVersion(context, declaration.id);

    expect(result.declarationId).toEqual(declaration.id);
  });

  it('should return declaration version fields with the latest versions', async () => {
    const result = await createADeclarationVersion(context, declaration.id);

    expect(result.agreeHowDataWillBeUsed).toEqual('');
    expect(result.agreeToAntiBribery).toEqual(ANTI_BRIBERY);
    expect(result.agreeToConfirmationAndAcknowledgements).toEqual(CONFIRMATION_AND_ACKNOWLEDGEMENTS);
    expect(result.agreeToConfidentiality).toEqual(CONFIDENTIALITY);
    expect(result.hasAntiBriberyCodeOfConduct).toEqual(ANTI_BRIBERY_CODE_OF_CONDUCT);
    expect(result.willExportWithAntiBriberyCodeOfConduct).toEqual(ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT);
  });

  describe('when an invalid declaration ID is passed', () => {
    it('should throw an error', async () => {
      await expect(createADeclarationVersion(context, mockInvalidId)).rejects.toThrow('Creating an application declaration version');
    });
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      await expect(createADeclarationVersion({}, declaration.id)).rejects.toThrow('Creating an application declaration version');
    });
  });
});
