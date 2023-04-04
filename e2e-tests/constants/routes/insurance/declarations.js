const ROOT = '/declarations';

const ANTI_BRIBERY_ROOT = `${ROOT}/anti-bribery`;

export const DECLARATIONS = {
  ROOT,
  CONFIDENTIALITY: `${ROOT}/confidentiality`,
  CONFIDENTIALITY_SAVE_AND_BACK: `${ROOT}/confidentiality/save-and-go-back`,
  ANTI_BRIBERY: {
    ROOT: ANTI_BRIBERY_ROOT,
    ROOT_SAVE_AND_BACK: `${ANTI_BRIBERY_ROOT}/save-and-go-back`,
    CODE_OF_CONDUCT: `${ANTI_BRIBERY_ROOT}/code-of-conduct`,
    CODE_OF_CONDUCT_SAVE_AND_BACK: `${ANTI_BRIBERY_ROOT}/code-of-conduct/save-and-back`,
    EXPORTING_WITH_CODE_OF_CONDUCT: `${ANTI_BRIBERY_ROOT}/exporting-with-code-of-conduct`,
    EXPORTING_WITH_CODE_OF_CONDUCT_SAVE_AND_BACK: `${ANTI_BRIBERY_ROOT}/exporting-with-code-of-conduct/save-and-back`,
  },
  CONFIRMATION_AND_ACKNOWLEDGEMENTS: `${ROOT}/confirmation-and-acknowledgements`,
  CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK: `${ROOT}/confirmation-and-acknowledgements/save-and-back`,
  HOW_YOUR_DATA_WILL_BE_USED: `${ROOT}/data`,
  HOW_YOUR_DATA_WILL_BE_USED_SAVE_AND_BACK: `${ROOT}/data/save-and-back`,
};
