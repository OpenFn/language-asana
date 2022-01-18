/** @module Adaptor */
import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
  http,
} from '@openfn/language-common';

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
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Get the list of tasks for a given project.
 * @public
 * @example
 * getTasks("project_gid")
 * @function
 * @param {string} project_gid - Globally unique identifier for the project
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getTasks(project_gid, callback) {
  return state => {
    project_gid = expandReferences(project_gid)(state);

    const { baseUrl, token } = state.configuration;

    const url = `${baseUrl}/projects/${project_gid}/tasks`;

    const config = {
      url,
      headers: { Authorization: `Bearer ${token}` },
    };

    return http
      .get(config)(state)
      .then(response => {
        console.log(response);
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

export {
  alterState,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
