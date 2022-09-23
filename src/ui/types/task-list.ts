type TaskListData = {
  INITIAL_CHECKS: TaskListGroupInitialChecks;
  PREPARE_APPLICATION: TaskListGroupPrepareApplication;
  // SUBMIT_APPLICATION: String;
};

interface TaskListDataTask {
  href?: string;
  title: string;
  id: string;
  fields: Array<string>;
  dependencies?: Array<string>;
  status?: string;
}

type TaskListGroup = {
  title: String;
  tasks: Array<TaskListTask>;
};

interface TaskListGroupInitialChecks {
  title: String;
  tasks: TaskListDataGroupTasksInitialChecks;
}

interface TaskListGroupPrepareApplication {
  title: String;
  tasks: TaskListDataGroupTasksPrepareApplication;
}

type TaskListDataGroupTasksInitialChecks = {
  ELIGIBILITY: TaskListDataTask;
  CONTACT_DETAILS: TaskListDataTask;
};

type TaskListDataGroupTasksPrepareApplication = {
  POLICY_TYPE: TaskListDataTask;
  EXPORTS_TO_INSURE: TaskListDataTask;
  ABOUT_BUSINESS: TaskListDataTask;
  BUYER: TaskListDataTask;
};

type TaskListTask = {
  href?: string;
  title: string;
  id: string;
  status: string;
};

export {
  TaskListData,
  TaskListDataTask,
  TaskListGroup,
  TaskListDataGroupTasksInitialChecks,
  TaskListDataGroupTasksPrepareApplication,
  TaskListTask,
};
