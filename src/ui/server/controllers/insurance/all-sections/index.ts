import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import api from '../../../api';
import generateGroupsAndTasks from '../../../helpers/task-list/generate-groups-and-tasks';
import generateTaskList from '../../../helpers/task-list';
import flattenApplicationData from '../../../helpers/flatten-application-data';

export const TEMPLATE = TEMPLATES.INSURANCE.ALL_SECTIONS;

const get = async (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  try {
    const application = await api.keystone.getApplication(Number(referenceNumber));

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const flatApplicationData = flattenApplicationData(application);

    const taskListStructure = generateGroupsAndTasks();

    const taskListData = generateTaskList(taskListStructure, flatApplicationData);

    return res.render(TEMPLATES.INSURANCE.ALL_SECTIONS, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ALL_SECTIONS,
        BACK_LINK: req.headers.referer,
      }),
      application,
      taskListData,
    });
  } catch (err) {
    console.error('Error getting application ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { get };
