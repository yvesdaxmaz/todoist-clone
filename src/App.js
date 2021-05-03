import React from 'react';
import Layout from './containers/Layout';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Modal from './components/Modal/Modal';
import { useStateValue } from './StateProvider';
import QuickTask from './components/QuickTask/QuickTask';
import ConfirmDeleteModal from './components/ConfirmDeleteModal/ConfirmDeleteModal';
import Project from './components/Project/Project';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

function App() {
  const [
    {
      selectedProject,
      addProject,
      editProject,
      quickTask,
      projects,
      tasks,
      delete_project,
      delete_comment,
      delete_task,
    },
    // eslint-disable-next-line no-unused-vars
    dispatch,
  ] = useStateValue();
  return (
    <Router>
      <Layout>
        <div className="h-screen flex flex-col">
          <Header />
          <div className="relative flex-grow">
            <div className="flex relative">
              <Sidebar />
              {/*<!--<div className="w-full md:w-4/5 md:ml-auto bg-green-600"> */}
              <div className="w-full md:w-4/5 md:ml-auto">
                <div className="w-full ml-auto md:mx-auto md:w-2/3 px-4">
                  <Switch>
                    <Route
                      path="/app/today"
                      render={routeProps => {
                        return <div>Today</div>;
                      }}
                    />
                    <Route
                      path="/app/project/:project_id"
                      render={routeParams => {
                        let {
                          params: { project_id },
                        } = routeParams.match;
                        const current_project = projects.find(
                          project => project.id === parseInt(project_id),
                        );
                        if (current_project === -1) {
                          routeParams.history.push('/app/today');
                        }

                        let current_project_tasks = [...tasks].filter(
                          currentTask =>
                            currentTask.parent_type === undefined &&
                            currentTask.project_id === parseInt(project_id),
                        );
                        return (
                          <Project
                            project={current_project}
                            tasks={current_project_tasks}
                          />
                        );
                      }}
                    />
                    <Redirect to="/app/today" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          {addProject ? <Modal /> : null}
          {editProject ? (
            <Modal edit selectedProject={selectedProject} />
          ) : null}
          {quickTask ? (
            <div className="fixed h-screen w-full bg-gray-800 bg-opacity-50">
              <div className="w-full h-screen flex items-center justify-center">
                <div className="max-w-xl w-full py-8">
                  <QuickTask />
                </div>
              </div>
            </div>
          ) : null}

          {delete_project || delete_comment || delete_task ? (
            <ConfirmDeleteModal />
          ) : null}
        </div>
      </Layout>
    </Router>
  );
}

export default App;
