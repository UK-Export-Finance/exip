interface TaskListDataTask {
  href?: string;
  title: string;
  id: string;
  fields: Array<string>;
  dependencies: Array<string>;
  status?: string;
}

type TaskListTask = {
  href?: string;
  title: string;
  id: string;
  status: string;
};

type TaskListDataGroup = {
  title: string;
  hint?: string;
  id: string;
  tasks: Array<TaskListDataTask>;
};

type TaskListGroup = {
  title: string;
  tasks: Array<TaskListTask>;
};

type TaskListData = Array<TaskListDataGroup>;

type TaskList = Array<TaskListGroup>;

export { TaskListData, TaskListDataTask, TaskListDataGroup, TaskListGroup, TaskListTask, TaskList };
