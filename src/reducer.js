import {
  SHOW_ADD_PROJECT_MODAL,
  HIDE_ADD_PROJECT_MODAL,
  ARCHIVE_PROJECT,
  UNARCHIVE_PROJECT,
  DELETE_PROJECT,
  DELETE_PROJECT_CONFIRM,
  DELETE_PROJECT_CANCEL,
  DUPLICATE_PROJECT,
  ADD_PROJECT,
  FAVORITED_PROJECT,
  UNFAVORITED_PROJECT,
  SHOW_EDIT_PROJECT_MODAL,
  SAVE_EDIT_PROJECT,
  HIDE_EDIT_PROJECT_MODAL,
  SHOW_QUICK_TASK_MODAL,
  HIDE_QUICK_TASK_MODAL,
  ADD_TASK_TO_PROJECT,
  ADD_COMMENT_TO_PROJECT,
  DELETE_COMMENT_TO_PROJECT,
  DELETE_COMMENT_TO_PROJECT_CONFIRM,
  DELETE_COMMENT_TO_PROJECT_CANCEL,
  UPDATE_COMMENT_OF_PROJECT,
} from './actionTypes';
const reducer = (state, action) => {
  console.log(action);
  let { projects, comments } = state;
  let project,
    comment,
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
    case UNARCHIVE_PROJECT:
      projects = projects.map(project => {
        if (project.id === action.id) {
          return { ...project, archived: false };
        }
        return project;
      });
      return { ...state, projects };

    case DELETE_PROJECT:
      project = projects.find(project => project.id === action.id);
      return {
        ...state,
        delete_project: project,
      };

    case DELETE_PROJECT_CONFIRM:
      return {
        ...state,
        projects: state.projects.filter(project => {
          return project.id !== state.delete_project.id;
        }),
        delete_project: false,
      };
    case DELETE_PROJECT_CANCEL:
      return {
        ...state,
        delete_project: false,
      };
    case DUPLICATE_PROJECT:
      project = projects.find(project => project.id === action.id);
      last_project = projects[projects.length - 1];
      const project_copied = {
        ...project,
        name: `Copy of ${project.name}`,
        favorited: false,
        id: last_project.id + 1,
      };
      return { ...state, projects: [...projects, project_copied] };
    case ADD_PROJECT:
      last_project = projects[projects.length - 1];
      project = { ...action.project, id: last_project.id + 1 };
      return { ...state, projects: [...projects, project] };

    case FAVORITED_PROJECT:
      projects = projects.map(project => {
        if (project.id === action.id) {
          return { ...project, favorited: true };
        }
        return project;
      });
      return { ...state, projects };
    case UNFAVORITED_PROJECT:
      projects = projects.map(project => {
        if (project.id === action.id) {
          return { ...project, favorited: false };
        }
        return project;
      });
      return { ...state, projects };
    case SHOW_EDIT_PROJECT_MODAL:
      project = projects.find(
        currentProject => currentProject.id === action.id,
      );
      return { ...state, editProject: true, selectedProject: project };
    case HIDE_EDIT_PROJECT_MODAL:
      return { ...state, editProject: false, selectedProject: null };

    case SAVE_EDIT_PROJECT:
      projects = projects.map(project => {
        if (project.id === action.project.id) {
          return Object.assign({}, project, action.project);
          // return { id: action.id, ...action.project };
        }
        return project;
      });
      return { ...state, projects, editProject: false };
    case SHOW_QUICK_TASK_MODAL:
      return { ...state, quickTask: true };
    case HIDE_QUICK_TASK_MODAL:
      return { ...state, quickTask: false };

    case ADD_TASK_TO_PROJECT:
      let { tasks } = state;
      return {
        ...state,
        tasks: [
          ...tasks,
          {
            ...action.task,
          },
        ],
      };

    case ADD_COMMENT_TO_PROJECT:
      let last_comment = comments[comments.length - 1];

      return {
        ...state,
        comments: [
          ...state.comments,
          { id: last_comment + 1, ...action.comment },
        ],
      };

    case DELETE_COMMENT_TO_PROJECT:
      comment = comments.find(
        current_comment => current_comment.id === action.comment_id,
      );
      return {
        ...state,
        delete_comment: comment,
      };

    case DELETE_COMMENT_TO_PROJECT_CONFIRM:
      return {
        ...state,
        comments: state.comments.filter(comment => {
          return comment.id !== state.delete_comment.id;
        }),
        delete_comment: false,
      };
    case DELETE_COMMENT_TO_PROJECT_CANCEL:
      return {
        ...state,
        delete_comment: false,
      };
    case UPDATE_COMMENT_OF_PROJECT:
      comments = [...comments].map(current_comment => {
        if (current_comment.id === action.comment_id) {
          return { ...current_comment, comment: action.comment_text };
        } else {
          return current_comment;
        }
      });
      return {
        ...state,
        comments,
      };

    default:
      return state;
  }
};

export default reducer;
