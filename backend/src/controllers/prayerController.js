const pool = require('../config/db')
const { store, nextId } = require('../data/store')

async function createPrayerRequest(req, res) {
  const { name, email, phone, request, category } = req.body || {}

  if (!request || !category) {
    return res.status(400).json({ message: 'Prayer request and category are required.' })
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO prayer_requests (name, email, phone, request, category, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [name || null, email || null, phone || null, request, category]
    )

    return res.status(201).json({ message: 'Prayer request submitted successfully.', requestId: result.insertId })
  } catch (error) {
    const item = {
      id: nextId('prayerRequests'),
      name: name || 'Anonymous',
      email: email || '',
      phone: phone || '',
      request,
      category,
      handled: false,
    }

    store.prayerRequests.unshift(item)
    return res.status(201).json({
      message: 'Prayer request submitted successfully. Saved locally because MySQL is unavailable.',
      requestId: item.id,
      fallback: true,
    })
  }
}

async function getPrayerRequests(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM prayer_requests ORDER BY created_at DESC')
    return res.json(rows)
  } catch (error) {
    return res.json(store.prayerRequests)
  }
}

module.exports = { createPrayerRequest, getPrayerRequests }
