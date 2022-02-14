# language-asana [![Build Status](https://travis-ci.org/OpenFn/language-asana.svg?branch=master)](https://travis-ci.org/OpenFn/language-asana)

Language Pack for connecting with Asana.

## Documentation

### sample configuration

```json
{
  "apiVersion": "1.0",
  "token": "shhhhhhhh"
}
```

### Sample expression

## Find a single task of a given project using the task id.

```js
getTask('1234', {
  opt_fields: 'name,assignee',
});
```

## Find the list of tasks of a given project using the project id.

```js
getTasks('22889593722', {
  opt_fields: 'name,notes,assignee',
});
```

## Update a specific task

```js
updateTask('12344', {
  name: 'test',
  approval_status: 'pending',
  assignee: '12345',
});
```

## Create a task

```js
createTask({
  name: 'test',
  approval_status: 'pending',
  assignee: '12345',
});
```

## Update a task or create a new one

You can use a field name literal as `externalId` to match a specific task. If
the task does not exist, a new one will be created. The first parameter in this
function should be the `project_id`.

```js
upsertTask('12344', {
  externalId: 'name',
  data: {
    name: 'A new task',
    projects: ['12344'],
    notes: 'This is a new task',
  },
});
```

## Development

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `npm run build`.
