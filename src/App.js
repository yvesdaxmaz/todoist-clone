import Layout from './containers/Layout';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
function App() {
  return (
    <Layout>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="relative flex-grow">
          <div className="flex relative">
            <Sidebar />
            <div className="ml-auto w-4/5 bg-green-600">
              <div className="mx-auto w-3/5 bg-gray-600">Content</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
