import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./features/user";
import Auth from "./features/auth";
import AuthLayout from "./layouts/auth.layout";
import MainLayout from "./layouts/main.layout";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="/user/*" element={<User />} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="auth/*" element={<Auth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
