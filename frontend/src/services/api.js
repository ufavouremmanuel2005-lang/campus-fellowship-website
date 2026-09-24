const API_BASE = 'http://localhost:5000/api'

function getAuthHeaders() {
  const token = localStorage.getItem('ccf-admin-token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

export const api = {
  get: async (path, includeAuth = false) => {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: includeAuth ? { ...getAuthHeaders() } : {},
    })
    return handleResponse(response)
  },

  post: async (path, payload, includeAuth = false) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(includeAuth ? getAuthHeaders() : {}),
      },
      body: JSON.stringify(payload),
    })
    return handleResponse(response)
  },

  put: async (path, payload, includeAuth = false) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(includeAuth ? getAuthHeaders() : {}),
      },
      body: JSON.stringify(payload),
    })
    return handleResponse(response)
  },

  patch: async (path, payload, includeAuth = false) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(includeAuth ? getAuthHeaders() : {}),
      },
      body: JSON.stringify(payload || {}),
    })
    return handleResponse(response)
  },

  delete: async (path, includeAuth = false) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers: includeAuth ? getAuthHeaders() : {},
    })
    return handleResponse(response)
  },

  loginAdmin: async (credentials) => api.post('/admin/login', credentials),
  submitMember: async (payload) => api.post('/members', payload),
  submitPrayer: async (payload) => api.post('/prayer-requests', payload),
  submitTestimony: async (payload) => api.post('/testimonies', payload),
  submitContact: async (payload) => api.post('/contact', payload),
  getDashboard: async () => api.get('/admin/dashboard', true),
  getMembers: async () => api.get('/admin/members', true),
  addMember: async (payload) => api.post('/admin/members', payload, true),
  updateMember: async (id, payload) => api.put(`/admin/members/${id}`, payload, true),
  deleteMember: async (id) => api.delete(`/admin/members/${id}`, true),
  getEvents: async () => api.get('/admin/events', true),
  addEvent: async (payload) => api.post('/admin/events', payload, true),
  updateEvent: async (id, payload) => api.put(`/admin/events/${id}`, payload, true),
  deleteEvent: async (id) => api.delete(`/admin/events/${id}`, true),
  getAnnouncements: async () => api.get('/admin/announcements', true),
  addAnnouncement: async (payload) => api.post('/admin/announcements', payload, true),
  updateAnnouncement: async (id, payload) => api.put(`/admin/announcements/${id}`, payload, true),
  deleteAnnouncement: async (id) => api.delete(`/admin/announcements/${id}`, true),
  toggleAnnouncement: async (id) => api.patch(`/admin/announcements/${id}/publish`, {}, true),
  getPrayerRequests: async () => api.get('/admin/prayer-requests', true),
  togglePrayerRequest: async (id) => api.patch(`/admin/prayer-requests/${id}/handled`, {}, true),
  deletePrayerRequest: async (id) => api.delete(`/admin/prayer-requests/${id}`, true),
  getTestimonials: async () => api.get('/admin/testimonies', true),
  updateTestimonyStatus: async (id, status) => api.patch(`/admin/testimonies/${id}/status`, { status }, true),
  deleteTestimony: async (id) => api.delete(`/admin/testimonies/${id}`, true),
}
