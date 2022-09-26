interface TaskListDataTask {
  href?: string;
  title: string;
  id: string;
  fields: Array<string>;
  dependencies?: Array<string>;
  status?: string;
}

type TaskListTask = {
  href?: string;
  title: string;
  id: string;
  status: string;
};

type TaskListDataGroupTasksPrepareApplication = {
  POLICY_TYPE: TaskListDataTask;
  EXPORTS_TO_INSURE: TaskListDataTask;
  ABOUT_BUSINESS: TaskListDataTask;
  BUYER: TaskListDataTask;
};

type TaskListDataGroupTasksInitialChecks = {
  ELIGIBILITY: TaskListDataTask;
  CONTACT_DETAILS: TaskListDataTask;
};

interface TaskListGroupInitialChecks {
  title: string;
  tasks: TaskListDataGroupTasksInitialChecks;
}

interface TaskListGroupPrepareApplication {
  title: string;
  tasks: TaskListDataGroupTasksPrepareApplication;
}

type TaskListData = {
  INITIAL_CHECKS: TaskListGroupInitialChecks;
  PREPARE_APPLICATION: TaskListGroupPrepareApplication;
  // SUBMIT_APPLICATION: string;
};

type TaskListGroup = {
  title: string;
  tasks: Array<TaskListTask>;
};

export { TaskListData, TaskListDataTask, TaskListGroup, TaskListDataGroupTasksInitialChecks, TaskListDataGroupTasksPrepareApplication, TaskListTask };
