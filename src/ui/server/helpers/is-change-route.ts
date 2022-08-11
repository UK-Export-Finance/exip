import getLastSubstring from './get-last-substring';

const isChangeRoute = (url: string) => {
  const lastSubstring = getLastSubstring(url);

  if (lastSubstring === 'change') {
    return true;
  }

  return false;
};

export default isChangeRoute;
