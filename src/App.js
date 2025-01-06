import './App.css';
import CustomerSupportChat from './components/CustomerSupportChat';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext/Auth';
import Register from './components/Register';
import Header from './components/Header';
import ReplyPage from './components/ReplyPage';
import MyRequests from './components/MyRequests';

const AppRoutes = () => {
  const { userLoggedIn } = useAuth(); 
  const routesArray = [
    {
      path: '/signin',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/reply/:id',
      element: userLoggedIn ? <ReplyPage /> : <Navigate to="/signin" />,
    },
    {
      path: '/my-requests',
      element: userLoggedIn ? <MyRequests /> : <Navigate to="/signin" />,
    },
    {
      path: '/Dashboard',
      element: userLoggedIn ? <AdminPanel /> : <Navigate to="/signin" />,
    },
    {
      path: '/',
      element: userLoggedIn ? <CustomerSupportChat /> : <Navigate to="/signin" />,
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
