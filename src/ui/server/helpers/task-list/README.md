# Task list generation

This function consumes groups of tasks and submitted answers and returns a data structure ready for a [GOV design task list](https://design-system.service.gov.uk/patterns/task-list-pages/) UI component.

## How to use

1. Create an object of groups and tasks for your app.
2. Call the function with your groups and submitted answers. e.g `generateTaskList(groupsAndTasks, submittedAnswers);`

The function will:

- Map your tasks with submitted answers and any of the defined dependencies.
- Depending on the mappings/definition, a status will be added to each task.
- Return a simplified data structure.

The end result can then be consumed in a component (example below).

## Required data structure

Groups, tasks and answers expect a certain format.

### Task

Each task expects the following structure:

```js
{
  href: '/root-to-form',
  title: 'Eligibility',
  id: 'eligibility',
  fields: ['fieldC', 'fieldD'],
  dependencies: ['fieldA', 'fieldB']
};
```

- `fields` is a list of field IDs required for the task to be marked as "Completed".
- `dependencies` is a list of field IDs required for the task to be unlocked and marked as "Ready to start"/"Start now".

### Group(s)

A complete task list structure with multiple groups should be as follows:

```js
const exampleTaskList = [
  {
    title: 'Initial checks',
    id: 'initialChecks',
    tasks: [
      {
        href: '/root-to-form',
        title: 'Eligibility',
        id: 'eligibility',
        fields: ['fieldA', 'fieldB'],
        dependencies: [],
      },
      {
        href: '/account/create',
        title: 'Create account',
        id: 'create-account',
        fields: ['userId', 'firstName', 'lastName'],
        dependencies: ['fieldA', 'fieldB'],
      },
    ],
  },
  {
    title: 'Prepare application',
    id: 'prepareApplication',
    tasks: [
      {
        href: '/company',
        title: 'Company information',
        id: 'company',
        fields: ['companyName', 'companyId'],
        dependencies: ['fieldA', 'fieldB', 'userId', 'firstName', 'lastName'],
      },
      {
        href: '/historical-information',
        title: 'Historical information',
        id: 'historical',
        fields: ['companyName', 'companyId'],
        dependencies: [],
      },
    ],
  },
];
```

### Submitted answers

Submitted answers requires a flat structure - it does not currently handle nested structures.

:warning: The function assumes that any fields in submitted answers are valid. In other words, validate your field before saving it or passing to `generateTaskList`.

```js
{
  fieldA: true,
  fieldB: 'example',
  country: { name: 'United Kingdom' isoCode: 'GBR'},
}
```

### Data generation recommendation

The larger your tasks and groups become, the trickier management becomes. For easier maintenance, your data structure could be split up into single files/functions for each group. There are examples of this [here](/src/ui/server/helpers/task-list/generate-groups-and-tasks/index.ts).

### Returned data structure

The returned data structure is simpler and only contains the data that a UI needs, including automatically generated status tags:

```js
[
  {
    title: 'Group A',
    tasks: [
      {
        href: '/mock',
        title: 'Task 1',
        id: 'task1',
        status: 'In progress',
      },
      {
        href: '/mock',
        title: 'Task 2',
        id: 'task2',
        status: 'Ready to start',
      },
    ],
  },
  {
    title: 'Group B',
    tasks: [
      {
        href: '/mock',
        title: 'Task 3',
        id: 'task3',
        status: 'Cannot start yet',
      },
    ],
  },
];
```

## Example usage

Create groups and tasks, passing the result to a page/template:

```js
// controller/task-list.js
// const generateTaskList = require './task-list';

const getTaskList = (req, res) => {
  const groupsAndTasks = [
    {
      title: 'Initial checks',
      id: 'initialChecks',
      tasks: [
        {
          href: '/root-to-form',
          title: 'Eligibility',
          id: 'eligibility',
          fields: ['fieldA', 'fieldB'],
          dependencies: [],
        },
        {
          href: '/account/create',
          title: 'Create account',
          id: 'create-account',
          fields: ['userId', 'firstName', 'lastName'],
          dependencies: ['fieldA', 'fieldB'],
        },
      ],
    },
    {
      title: 'Second group',
      id: 'groupB',
      tasks: [ ... ],
    },
  ];

  // generate task list statuses and structure for UI component.
  const taskListData = generateTaskList(groupsAndTasks, req.session.submittedAnswers);

  return res.render('template.njk', {
    taskListData,
  });
};
```

Now, a task list can be rendered in a UI template or component.

In this repository there is a [task-list nunjuck component](/src/ui/templates/components/task-list.njk) that can automatically render the data into a GOV design list. Example:

```html
// template.njk {% import '../components/task-list.njk' as taskList %} {{ taskList.render({ groups: taskListData }) }}
```

---
