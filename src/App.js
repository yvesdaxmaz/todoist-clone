import React from 'react';
import Layout from './containers/Layout';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Modal from './components/Modal/Modal';
import { useStateValue } from './StateProvider';
import QuickTask from './components/QuickTask/QuickTask';

function App() {
  const [
    { selectedProject, addProject, editProject, quickTask },
    dispatch,
  ] = useStateValue();
  return (
    <Layout>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="relative flex-grow">
          <div className="flex relative">
            <Sidebar />
            <div className="w-full md:w-4/5 md:ml-auto bg-green-600">
              <div className="w-full md:ml-auto md:w-4/5 md:pl-4 bg-gray-600">
                Content
              </div>
            </div>
          </div>
        </div>
        {addProject ? <Modal /> : null}
        {editProject ? <Modal edit selectedProject={selectedProject} /> : null}
        {quickTask ? (
          <div className="fixed h-screen w-full bg-gray-800 bg-opacity-50">
            <div className="w-full h-screen flex items-center justify-center">
              <div className="max-w-xl w-full py-8">
                <QuickTask />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default App;
