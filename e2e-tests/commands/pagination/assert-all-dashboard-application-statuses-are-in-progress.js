import { APPLICATION } from '../../constants';
import dashboardPage from '../../pages/insurance/dashboard';

const { IN_PROGRESS } = APPLICATION.STATUS;

/**
 * assertAllDashboardApplicationStatusesAreInProgress
 * asserts that all applications on dashboard page are IN_PROGRESS
 */
const assertAllDashboardApplicationStatusesAreInProgress = () => {
  dashboardPage.table.body.firstColumn().each(($el) => {
    expect($el.text().trim()).to.eq(IN_PROGRESS);
  });
};

export default assertAllDashboardApplicationStatusesAreInProgress;
