import {
  SHOW_ADD_PROJECT_MODAL,
  HIDE_ADD_PROJECT_MODAL,
  ARCHIVE_PROJECT,
  DELETE_PROJECT,
  DUPLICATE_PROJECT,
  ADD_PROJECT,
} from './actionTypes';
const reducer = (state, action) => {
  let { projects } = state;
  let project,
    last_project = null;
  switch (action.type) {
    case SHOW_ADD_PROJECT_MODAL:
      return { ...state, addProject: true };
    case HIDE_ADD_PROJECT_MODAL:
      return { ...state, addProject: false };
    case ARCHIVE_PROJECT:
      projects = projects.map(project => {
        if (project.id === action.id) {
          return { ...project, archived: true };
        }
        return project;
      });
      return { ...state, projects };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => {
          return project.id !== action.id;
        }),
      };
    case DUPLICATE_PROJECT:
      project = projects.find(project => project.id === action.id);
      last_project = projects[projects.length - 1];
      const project_copied = {
        ...project,
        name: `Copy of ${project.name}`,
        id: last_project.id + 1,
      };
      return { ...state, projects: [...projects, project_copied] };
    case ADD_PROJECT:
      last_project = projects[projects.length - 1];
      project = { ...action.project, id: last_project.id + 1 };
      return { ...state, projects: [...projects, project] };
    default:
      return state;
  }
};

export default reducer;
