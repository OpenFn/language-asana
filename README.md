# language-asana [![Build Status](https://travis-ci.org/OpenFn/language-asana.svg?branch=master)](https://travis-ci.org/OpenFn/language-asana)

Language Pack for connecting with Asana.

## Documentation

### sample configuration

```json
{
  "baseUrl": "https://app.asana.com/api/1.0",
  "token": "shhhhh"
}
```

### Sample expression

## Find the list of tasks of a given project.

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
You can use a field name as `externalId` to match a specific task. If the task does not exist, 
a new one will be created.

```js
upsertTask('12344', {
  externalId: 'gid',
  data: {
    gid: '123456',
    name: 'A new task',
    projects: ['12344'],
  },
});
```

## Development

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `npm run build`.
