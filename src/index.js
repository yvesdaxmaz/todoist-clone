import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider';
import reducer from './reducer';

let initialState = {
  addProject: false,
  editProject: false,
  delete_project: false,
  quickTask: false,
  labels: [
    { id: 1, name: 'social', bg: 'text-yellow-500', counter: 1 },
    { id: 2, name: 'urgent', bg: 'text-blue-300', counter: 2 },
    { id: 3, name: 'important', bg: 'text-red-500', counter: 2 },
  ],
  tasks: [
    {
      id: 1,
      project_id: 2,
      description: 'Tap the checkbox to complete this task ✅',
      created_at: new Date(),
    },
    {
      id: 2,
      project_id: 2,
      description: 'Swipe left to schedule this task 📅',
      created_at: new Date(),
    },
    {
      id: 3,
      project_id: 2,
      description: 'reate your own project 🗒',
      created_at: new Date(),
    },
  ],
  projects: [
    {
      id: 1,
      name: 'Inbox',
      color: 'bg-gray-300',
      favorited: false,
      view: 'list',
      archived: false,
    },
    {
      id: 2,
      name: 'Welcome 👋',
      color: 'bg-gray-300',
      favorited: false,
      view: 'list',
      archived: false,
    },
    {
      id: 3,
      name: 'Learning',
      color: 'bg-blue-300',
      favorited: false,
      view: 'list',
      archived: false,
    },
    {
      id: 4,
      name: 'Machine learning',
      color: 'bg-purple-500',
      favorited: false,
      view: 'list',
      archived: true,
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
