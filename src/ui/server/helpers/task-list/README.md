# Task list generation

:warning: WIP

This function can consume an object of task groups, add status tags and return a simplified data structure ready to consume in a custom nunjuck component that renders a [GOV design task list](https://design-system.service.gov.uk/patterns/task-list-pages/).

Each task has the following structure:

```js
{
  href: '/root-to-form',
  title: 'Eligibility',
  id: 'eligibility',
  fields: ['fieldC', 'fieldD'],
  dependencies: ['fieldA', 'fieldB']
};
```

- `fields` is a list of field IDs required for the task to be marked as "completed".
- `dependencies` is a list of field IDs required for the task to be unlocked and marked as "ready to start"/"start now".

With this in mind, a complete task list structure with multiple groups and tasks can be as follows:

```js
const exampleTaskList = {
  INITIAL_CHECKS: {
    title: 'Initial checks',
    tasks: {
      ELIGIBILITY: {
        href: '/root-to-form',
        title: 'Eligibility',
        id: 'eligibility',
        fields: ['fieldA', 'fieldB'],
      },
      ACCOUNT: {
        href: '/account/create',
        title: 'Create account',
        id: 'create-account',
        fields: ['userId', 'firstName', 'lastName'],
        dependencies: ['fieldA', 'fieldB'],
      },
    },
  },
  APPLICATION: {
    title: 'Prepare application',
    tasks: {
      COMPANY: {
        href: '/company',
        title: 'Company information',
        id: 'company',
        fields: ['companyName', 'companyId'],
        dependencies: ['fieldA', 'fieldB', 'userId', 'firstName', 'lastName'],
      },
      HISTORY: {
        href: '/historical-information',
        title: 'Historical information',
        id: 'historical',
        fields: ['companyName', 'companyId'],
        dependencies: [],
      },
    }
  },
};
```

This data structure generation can be split up (examples in the helpers directory) for easier maintenance.

The returned data structure is simpler and contains added statuses depending on the `fields` and `dependencies` checks. E.g:

```js
[
  {
    title: 'Group A',
    tasks: [
      {
        href: '/mock',
        title: 'Task 1',
        id: 'task1',
        status: 'Ready to start',
      },
      {
        href: '/mock',
        title: 'Task 2',
        id: 'task2',
        status: 'Cannot start yet',
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
]
```

With the original data structure, we can call `generateTaskList` in a controller and consume the simplified data (in an array type format) like so:

```js
// controller/task-list.js

const getTaskList = (req, res) => {
  const taskList = generateTaskList(exampleTaskList);

  return res.render('template.njk', {
    taskList,
  });
};
```

In this repository there is a [task-list nunjuck component](/src/ui/templates/components/task-list.njk) that can automatically render this data into a GOV design list. E.g:

```html
// template.njk

{% import '../components/task-list.njk' as taskList %}

{{ taskList.render({
  groups: taskList
}) }}
```

## TODO

- Review
- Investigate the capability of checking a field's validation from submitted data instead of just checking that data exists.
