const express = require('express')
const { createMember, getMembers } = require('../controllers/memberController')
const { createPrayerRequest, getPrayerRequests } = require('../controllers/prayerController')
const { createTestimony, getTestimonials } = require('../controllers/testimonyController')
const { requireAdmin } = require('../middleware/auth')
const { store, nextId } = require('../data/store')

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@campusfellowship.org'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'demo-admin-token'

const router = express.Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

router.post('/members', createMember)
router.get('/members', getMembers)

router.post('/prayer-requests', createPrayerRequest)
router.get('/prayer-requests', getPrayerRequests)

router.post('/testimonies', createTestimony)
router.get('/testimonies', getTestimonials)

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required.' })
  }

  return res.status(201).json({ message: 'Contact message sent successfully.' })
})

router.post('/admin/login', (req, res) => {
  const { email, password } = req.body || {}
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN, message: 'Login successful.' })
  }

  return res.status(401).json({ message: 'Invalid admin credentials.' })
})

router.get('/admin/dashboard', requireAdmin, (req, res) => {
  const activeRequests = store.prayerRequests.filter((item) => !item.handled).length
  const pendingTestimonials = store.testimonials.filter((item) => item.status === 'pending').length

  res.json({
    stats: [
      { label: 'Total Members', value: String(store.members.length) },
      { label: 'New Members', value: '48' },
      { label: 'Upcoming Events', value: String(store.events.length) },
      { label: 'Event Registrations', value: '184' },
      { label: 'Prayer Requests', value: String(store.prayerRequests.length) },
      { label: 'Pending Testimonials', value: String(pendingTestimonials) },
    ],
    members: store.members,
    events: store.events,
    announcements: store.announcements,
    prayerRequests: store.prayerRequests,
    testimonials: store.testimonials,
  })
})

router.get('/admin/members', requireAdmin, (req, res) => res.json(store.members))
router.post('/admin/members', requireAdmin, (req, res) => {
  const payload = req.body || {}
  const member = {
    id: nextId('members'),
    fullName: payload.fullName || '',
    email: payload.email || '',
    phoneNumber: payload.phoneNumber || '',
    department: payload.department || '',
    faculty: payload.faculty || '',
    level: payload.level || '',
    gender: payload.gender || '',
    whatsappNumber: payload.whatsappNumber || '',
    howHeard: payload.howHeard || '',
  }
  store.members.unshift(member)
  res.status(201).json(member)
})
router.put('/admin/members/:id', requireAdmin, (req, res) => {
  const member = store.members.find((item) => item.id === Number(req.params.id))
  if (!member) return res.status(404).json({ message: 'Member not found.' })
  Object.assign(member, req.body)
  res.json(member)
})
router.delete('/admin/members/:id', requireAdmin, (req, res) => {
  store.members = store.members.filter((item) => item.id !== Number(req.params.id))
  res.json({ success: true })
})

router.get('/admin/events', requireAdmin, (req, res) => res.json(store.events))
router.post('/admin/events', requireAdmin, (req, res) => {
  const payload = req.body || {}
  const event = {
    id: nextId('events'),
    title: payload.title || 'Untitled Event',
    date: payload.date || '',
    time: payload.time || '',
    venue: payload.venue || '',
    speaker: payload.speaker || '',
    theme: payload.theme || '',
    description: payload.description || '',
    imageUrl: payload.imageUrl || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    status: payload.status || 'upcoming',
  }
  store.events.unshift(event)
  res.status(201).json(event)
})
router.put('/admin/events/:id', requireAdmin, (req, res) => {
  const event = store.events.find((item) => item.id === Number(req.params.id))
  if (!event) return res.status(404).json({ message: 'Event not found.' })
  Object.assign(event, req.body)
  res.json(event)
})
router.delete('/admin/events/:id', requireAdmin, (req, res) => {
  store.events = store.events.filter((item) => item.id !== Number(req.params.id))
  res.json({ success: true })
})

router.get('/admin/announcements', requireAdmin, (req, res) => res.json(store.announcements))
router.post('/admin/announcements', requireAdmin, (req, res) => {
  const payload = req.body || {}
  const item = {
    id: nextId('announcements'),
    title: payload.title || 'New Announcement',
    category: payload.category || 'General',
    summary: payload.summary || '',
    published: Boolean(payload.published),
  }
  store.announcements.unshift(item)
  res.status(201).json(item)
})
router.put('/admin/announcements/:id', requireAdmin, (req, res) => {
  const item = store.announcements.find((entry) => entry.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: 'Announcement not found.' })
  Object.assign(item, req.body)
  res.json(item)
})
router.patch('/admin/announcements/:id/publish', requireAdmin, (req, res) => {
  const item = store.announcements.find((entry) => entry.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: 'Announcement not found.' })
  item.published = !item.published
  res.json(item)
})
router.delete('/admin/announcements/:id', requireAdmin, (req, res) => {
  store.announcements = store.announcements.filter((item) => item.id !== Number(req.params.id))
  res.json({ success: true })
})

router.get('/admin/prayer-requests', requireAdmin, (req, res) => res.json(store.prayerRequests))
router.patch('/admin/prayer-requests/:id/handled', requireAdmin, (req, res) => {
  const item = store.prayerRequests.find((entry) => entry.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: 'Prayer request not found.' })
  item.handled = !item.handled
  res.json(item)
})
router.delete('/admin/prayer-requests/:id', requireAdmin, (req, res) => {
  store.prayerRequests = store.prayerRequests.filter((item) => item.id !== Number(req.params.id))
  res.json({ success: true })
})

router.get('/admin/testimonies', requireAdmin, (req, res) => res.json(store.testimonials))
router.patch('/admin/testimonies/:id/status', requireAdmin, (req, res) => {
  const item = store.testimonials.find((entry) => entry.id === Number(req.params.id))
  if (!item) return res.status(404).json({ message: 'Testimony not found.' })
  item.status = req.body?.status || 'approved'
  res.json(item)
})
router.delete('/admin/testimonies/:id', requireAdmin, (req, res) => {
  store.testimonials = store.testimonials.filter((item) => item.id !== Number(req.params.id))
  res.json({ success: true })
})

module.exports = router
