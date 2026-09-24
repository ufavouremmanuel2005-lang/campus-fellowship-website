const pool = require('../src/config/db')
const { store } = require('../src/data/store')

async function insertMembers() {
  if (!store.members || store.members.length === 0) return
  for (const m of store.members) {
    try {
      await pool.execute(
        `INSERT INTO members (full_name, email, phone_number, department, faculty, level, gender, whatsapp_number, how_heard, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [m.fullName, m.email, m.phoneNumber, m.department, m.faculty, m.level, m.gender || null, m.whatsappNumber, m.howHeard || null]
      )
    } catch (err) {
      if (err && err.errno === 1062) {
        // duplicate
      } else {
        throw err
      }
    }
  }
}

async function insertEvents() {
  if (!store.events || store.events.length === 0) return
  for (const e of store.events) {
    await pool.execute(
      `INSERT INTO events (title, date, time, venue, speaker, theme, description, image_url, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [e.title, e.date ? new Date(e.date) : null, e.time || null, e.venue || null, e.speaker || null, e.theme || null, e.description || null, e.imageUrl || null, e.status || 'upcoming']
    )
  }
}

async function insertAnnouncements() {
  if (!store.announcements || store.announcements.length === 0) return
  for (const a of store.announcements) {
    await pool.execute(
      `INSERT INTO announcements (title, category, summary, content, published, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [a.title, a.category || null, a.summary || null, a.content || null, a.published ? 1 : 0]
    )
  }
}

async function insertPrayerRequests() {
  if (!store.prayerRequests || store.prayerRequests.length === 0) return
  for (const p of store.prayerRequests) {
    await pool.execute(
      `INSERT INTO prayer_requests (name, email, phone, request, category, created_at, handled)
       VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
      [p.name || null, p.email || null, p.phone || null, p.request || null, p.category || null, p.handled ? 1 : 0]
    )
  }
}

async function insertTestimonials() {
  if (!store.testimonials || store.testimonials.length === 0) return
  for (const t of store.testimonials) {
    await pool.execute(
      `INSERT INTO testimonials (name, email, testimony, status, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [t.name || null, t.email || null, t.testimony || null, t.status || 'pending']
    )
  }
}

async function main() {
  try {
    console.log('Starting migration to MySQL...')
    await insertMembers()
    await insertEvents()
    await insertAnnouncements()
    await insertPrayerRequests()
    await insertTestimonials()
    console.log('Migration completed successfully.')
    process.exit(0)
  } catch (err) {
    console.error('Migration failed:', err.message)
    process.exit(1)
  }
}

main()
