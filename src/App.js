import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from './redux/actions/accountActions';
import './styles/App.css';
import AuthPage from './components/AuthPage/AuthPage';
import EmailPage from './components/EmailPage/EmailPage';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.userReducer);

  // if a token exists, try to get the user data from the server,
  // if this fetch has succeeded, App will redirect us to the emails page
  // if this fetch failed, that means the token has expired and the user needs to login
  useEffect(() => {
    if (token) {
      dispatch(getUserAction());
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path='*' element={!isLoggedIn ?  <Navigate to="/account" /> : <EmailPage />} />


          <Route exact path="/account" element={!isLoggedIn ? <AuthPage /> : <Navigate to="/email/inbox" />} />



          <Route path="/email" element={isLoggedIn ? <EmailPage /> : <Navigate to="/account" />} />


          <Route exact path="/GitHub" element={() => (window.location.href = "https://github.com/Nagavshiva")} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
