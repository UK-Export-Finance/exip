export const get = jest.fn();
export const post = jest.fn();
export const use = jest.fn();

jest.doMock('express', () => ({
  Router: () => ({
    get,
    post,
    use,
  }),
}));
