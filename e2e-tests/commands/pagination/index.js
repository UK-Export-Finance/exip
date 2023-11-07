import checkLink from '../shared-commands/assertions/check-link';
import pagination from '../../partials/pagination';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

const assertPaginationItemLink = (index) => {
  checkLink(
    pagination.listItemLink(index),
    `${DASHBOARD_PAGE}/${index}`,
    String(index),
  );
};

export default assertPaginationItemLink;
