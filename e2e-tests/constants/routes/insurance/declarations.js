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
  },
};
