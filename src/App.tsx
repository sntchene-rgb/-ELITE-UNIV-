import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProfessorContract from './pages/auth/ProfessorContract';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Users from './pages/dashboard/Users';
import Settings from './pages/dashboard/Settings';
import Contracts from './pages/dashboard/Contracts';
import Security from './pages/dashboard/Security';
import Messages from './pages/dashboard/Messages';
import Content from './pages/dashboard/Content';
import Packages from './pages/dashboard/Packages';
import Leaderboard from './pages/dashboard/Leaderboard';
import Subscriptions from './pages/dashboard/Subscriptions';
import ActivityLog from './pages/dashboard/ActivityLog';
import Tasks from './pages/dashboard/Tasks';
import Support from './pages/dashboard/Support';
import Profile from './pages/dashboard/Profile';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/professor-contract" element={<ProfessorContract />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="content" element={<Content />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="security" element={<Security />} />
            <Route path="messages" element={<Messages />} />
            <Route path="packages" element={<Packages />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="activity" element={<ActivityLog />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}
