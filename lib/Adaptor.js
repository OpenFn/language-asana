"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;
exports.getTask = getTask;
exports.getTasks = getTasks;
exports.updateTask = updateTask;
exports.createTask = createTask;
exports.upsertTask = upsertTask;
Object.defineProperty(exports, "alterState", {
  enumerable: true,
  get: function () {
    return _languageCommon.alterState;
  }
});
Object.defineProperty(exports, "dataPath", {
  enumerable: true,
  get: function () {
    return _languageCommon.dataPath;
  }
});
Object.defineProperty(exports, "dataValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.dataValue;
  }
});
Object.defineProperty(exports, "dateFns", {
  enumerable: true,
  get: function () {
    return _languageCommon.dateFns;
  }
});
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function () {
    return _languageCommon.each;
  }
});
Object.defineProperty(exports, "field", {
  enumerable: true,
  get: function () {
    return _languageCommon.field;
  }
});
Object.defineProperty(exports, "fields", {
  enumerable: true,
  get: function () {
    return _languageCommon.fields;
  }
});
Object.defineProperty(exports, "fn", {
  enumerable: true,
  get: function () {
    return _languageCommon.fn;
  }
});
Object.defineProperty(exports, "http", {
  enumerable: true,
  get: function () {
    return _languageCommon.http;
  }
});
Object.defineProperty(exports, "lastReferenceValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.lastReferenceValue;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _languageCommon.merge;
  }
});
Object.defineProperty(exports, "sourceValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.sourceValue;
  }
});

var _languageCommon = require("@openfn/language-common");

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @function
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
function execute(...operations) {
  const initialState = {
    references: [],
    data: null
  };
  return state => {
    return (0, _languageCommon.execute)(...operations)({ ...initialState,
      ...state
    });
  };
}
/**
 * Get a single task of a given project.
 * @public
 * @example
 * getTask("task_gid",
 *  {
 *    opt_fields: "name,notes,assignee"
 *  })
 * @function
 * @param {string} task_gid - Globally unique identifier for the task
 * @param {object} params - Query params to include.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function getTask(task_gid, params, callback) {
  return state => {
    task_gid = (0, _languageCommon.expandReferences)(task_gid)(state);
    const {
      opt_fields
    } = (0, _languageCommon.expandReferences)(params)(state);
    const {
      baseUrl,
      token
    } = state.configuration;
    const url = `${baseUrl}/tasks/${task_gid}`;
    const config = {
      url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        opt_fields
      }
    };
    return _languageCommon.http.get(config)(state).then(response => {
      const nextState = { ...(0, _languageCommon.composeNextState)(state, response.data),
        response
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}
/**
 * Get the list of tasks for a given project.
 * @public
 * @example
 * getTasks("project_gid",
 *  {
 *    opt_fields: "name,notes,assignee"
 *  })
 * @function
 * @param {string} project_gid - Globally unique identifier for the project
 * @param {object} params - Query params to include.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function getTasks(project_gid, params, callback) {
  return state => {
    project_gid = (0, _languageCommon.expandReferences)(project_gid)(state);
    const {
      opt_fields
    } = (0, _languageCommon.expandReferences)(params)(state);
    const {
      baseUrl,
      token
    } = state.configuration;
    const url = `${baseUrl}/projects/${project_gid}/tasks`;
    const config = {
      url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        opt_fields
      }
    };
    return _languageCommon.http.get(config)(state).then(response => {
      const nextState = { ...(0, _languageCommon.composeNextState)(state, response.data),
        response
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}
/**
 * Update a specific task.
 * @public
 * @example
 * updateTask("task_gid",
 *  {
 *    name: 'test', "approval_status": "pending", "assignee": "12345"
 *  }
 * )
 * @function
 * @param {string} task_gid - Globally unique identifier for the task
 * @param {object} params - Body parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function updateTask(task_gid, params, callback) {
  return state => {
    task_gid = (0, _languageCommon.expandReferences)(task_gid)(state);
    params = (0, _languageCommon.expandReferences)(params)(state);
    const {
      baseUrl,
      token
    } = state.configuration;
    const url = `${baseUrl}/tasks/${task_gid}/`;
    const config = {
      url,
      data: {
        data: params
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return _languageCommon.http.put(config)(state).then(response => {
      const nextState = { ...(0, _languageCommon.composeNextState)(state, response.data),
        response
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}
/**
 * Create a task.
 * @public
 * @example
 * createTask(
 *  {
 *    name: 'test', "approval_status": "pending", "assignee": "12345"
 *  }
 * )
 * @function
 * @param {object} params - Body parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function createTask(params, callback) {
  return state => {
    params = (0, _languageCommon.expandReferences)(params)(state);
    const {
      baseUrl,
      token
    } = state.configuration;
    const url = `${baseUrl}/tasks/`;
    const config = {
      url,
      data: {
        data: params
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return _languageCommon.http.post(config)(state).then(response => {
      const nextState = { ...(0, _languageCommon.composeNextState)(state, response.data),
        response
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}
/**
 * Update or create a task.
 * @public
 * @example
 * upsertTask(
 *  {
 *    "externalId": "name",
 *    "data": {
 *      name: 'test', "approval_status": "pending", "assignee": "12345"
 *    }
 *
 *  }
 * )
 * @function
 * @param {string} project_gid - Globally unique identifier for the project
 * @param {object} params - an object with an externalId and some task data.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function upsertTask(project_gid, params, callback) {
  return state => {
    project_gid = (0, _languageCommon.expandReferences)(project_gid)(state);
    const {
      externalId,
      data
    } = (0, _languageCommon.expandReferences)(params)(state);
    const {
      baseUrl,
      token
    } = state.configuration;
    const url = `${baseUrl}/projects/${project_gid}/tasks`;
    const config = {
      url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        opt_fields: `${externalId}`
      }
    };
    return _languageCommon.http.get(config)(state).then(response => {
      const matchingTask = response.data.data.find(task => task[externalId] === data[externalId]);

      if (matchingTask) {
        console.log('Matching task found. Performing update.'); // projects and workspace ids should ne be included to update

        delete data.projects;
        delete data.workspace;
        return updateTask(matchingTask.gid, data, callback)(state);
      } else {
        console.log('No matching task found. Performing create.');
        return createTask(data, callback)(state);
      }
    });
  };
}