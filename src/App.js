import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./features/user";
import Auth from "./features/auth";
import AuthLayout from "./layouts/auth.layout";
import MainLayout from "./layouts/main.layout";
import PrivateRoute from "./privateRoute";
import QuestionType from "./features/questionType";
import GamesControler from "./features/gamesControler";
import Dashboard from "./features/dashboard";
import QuestionTime from "./features/questionTime";

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
            <Route index element={<GamesControler />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/user/*" element={<User />} />
            <Route path="/question-type/*" element={<QuestionType />} />
            <Route path="/question-time/*" element={<QuestionTime />} />
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
