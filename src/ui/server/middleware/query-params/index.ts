import { replaceCharactersWithCharacterCode } from '../../helpers/sanitise-data';
import { Request, Response } from '../../../types';

const ALLOWED_PARAMS = ['id', 'token'];
const MAXIMUM_PARAMS = 1;

/**
 * Global middleware, ensures that only allowed query parameters are consumed and sanitised.
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {String} next Callback function name
 */
export const queryParams = (req: Request, res: Response, next: () => void) => {
  const arr = Object.keys(req.query);

  if (arr.length) {
    /**
     * Filter out any params that are not in the allowed list.
     * We do not need to care or consume any params that are not used.
     */
    const filtered = arr.filter((key) => ALLOWED_PARAMS.includes(key));

    if (filtered.length) {
      /**
       * If the filtered list is above MAXIMUM_PARAMS,
       * this indicates that someone could be trying to tamper with the system.
       * Therefore, reject the request.
       */
      if (filtered.length > MAXIMUM_PARAMS) {
        return res.status(400);
      }

      /**
       * Only one allowed query param has been provided.
       * 1) Get the key.
       * 2) Get the value.
       * 3) Santise the value
       * 4) Construct a fresh query object.
       */
      const [firstKey] = filtered;
      const firstValue = req.query[firstKey];

      const sanitisedValue = replaceCharactersWithCharacterCode(firstValue);

      req.query = {
        [firstKey]: sanitisedValue,
      };

      return next();
    }

    /**
     * Filtered query params do not match anything in the allowed list.
     * this indicates that someone could be trying to tamper with the system.
     * Therefore, reject the request.
     */
    return res.status(400);
  }

  next();
};
