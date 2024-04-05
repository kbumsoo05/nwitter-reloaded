import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import ProtectedRoute from "./components/protected-route"; // ProtectedRoute 컴포넌트를 임포트합니다.
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ResetPassword from "./routes/reset-password";
import Upload from "./routes/upload";

const GlobalStyles = createGlobalStyle`
  ${reset}
  body {     background-color: #DBF0FF;     color: black;     font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;   }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
      console.log(isLoggedIn);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <GlobalStyles />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />

            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="upload" element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            } />

          </Route>

          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
