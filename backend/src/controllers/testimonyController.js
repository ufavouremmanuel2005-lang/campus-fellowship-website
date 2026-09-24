const pool = require('../config/db')
const { store, nextId } = require('../data/store')

async function createTestimony(req, res) {
  const { name, email, testimony } = req.body || {}

  if (!name || !testimony) {
    return res.status(400).json({ message: 'Name and testimony are required.' })
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO testimonials (name, email, testimony, status, created_at)
       VALUES (?, ?, ?, 'pending', NOW())`,
      [name, email || null, testimony]
    )

    return res.status(201).json({ message: 'Testimony submitted successfully and awaiting admin approval.', testimonyId: result.insertId })
  } catch (error) {
    const item = {
      id: nextId('testimonials'),
      name,
      email: email || '',
      testimony,
      status: 'pending',
    }

    store.testimonials.unshift(item)
    return res.status(201).json({
      message: 'Testimony submitted successfully and awaiting admin approval. Saved locally because MySQL is unavailable.',
      testimonyId: item.id,
      fallback: true,
    })
  }
}

async function getTestimonials(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC')
    return res.json(rows)
  } catch (error) {
    return res.json(store.testimonials)
  }
}

module.exports = { createTestimony, getTestimonials }
