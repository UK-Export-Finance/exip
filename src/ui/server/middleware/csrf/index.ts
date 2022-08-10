// @ts-ignore
export const csrf = () => function csrfToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
};
