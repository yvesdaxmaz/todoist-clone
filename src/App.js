import React, { useEffect, useContext } from 'react';
import Layout from './containers/Layout';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Modal from './components/Modal/Modal';
import { useStateValue } from './StateProvider';

function App() {
  const [state, dispatch] = useStateValue();
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
        {state.addProject ? <Modal /> : null}
        {state.editProject ? <Modal edit /> : null}
      </div>
    </Layout>
  );
}

export default App;
