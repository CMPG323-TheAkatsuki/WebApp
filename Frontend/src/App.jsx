import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/LoginPage';
import UserAdminPage from './Components/UserAdminPage/UserAdminPage';
import ListAssignmentsPage from './Components/ListAssignments/ListAssignmentsPage';
import CreateAssignmentsPage from './Components/CreateAssignments/CreateAssignmentsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<UserAdminPage />} />
        <Route path="/assignments" element={<ListAssignmentsPage />} />
        <Route path="/create-assignment" element={<CreateAssignmentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
