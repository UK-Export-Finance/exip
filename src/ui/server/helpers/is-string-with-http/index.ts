const isStringWithHttp = (url: string) => {
  if (url.includes('http')) {
    return url;
  }

  return `http://${url}`;
};

export default isStringWithHttp;
