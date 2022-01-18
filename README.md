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
getTasks('22889593722');
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

## Development

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `npm run build`.
