import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import {
  AboutPage,
  AdminDashboardPage,
  AdminLoginPage,
  ContactPage,
  EventDetailsPage,
  EventsPage,
  HomePage,
  JoinPage,
  LeadershipPage,
  MediaPage,
  MinistriesPage,
  NewsPage,
  PrayerPage,
  ResourcesPage,
  TestimoniesPage,
} from './pages/MainPages'
import './App.css'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('ccf-admin-token')
  return token ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/ministries" element={<MinistriesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/testimonies" element={<TestimoniesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/prayer" element={<PrayerPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
