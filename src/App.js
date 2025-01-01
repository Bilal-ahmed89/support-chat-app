import './App.css';
import CustomerSupportChat from './components/CustomerSupportChat';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './context/authContext/Auth';
import Register from './components/Register';
import Header from './components/Header';
import ReplyPage from './components/ReplyPage';
import MyRequests from './components/MyRequests';

const AppRoutes = () => {
  const routesArray = [
    {
      path: '/',
      element: <CustomerSupportChat />,
    },
    {
      path: '/Dashboard',
      element: <AdminPanel />,
    },
    {
      path: '/signin',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: <Header />,
    },
    {
      path: '/reply/:id',
      element: <ReplyPage />
    },
    {
      path: 'my-requests',
      element: <MyRequests  />
    },
  ];

  return useRoutes(routesArray);
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
