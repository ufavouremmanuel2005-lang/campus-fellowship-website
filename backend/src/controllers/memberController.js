const pool = require('../config/db')
const { store, nextId } = require('../data/store')

async function createMember(req, res) {
  const { fullName, email, phoneNumber, department, faculty, level, gender, whatsappNumber, howHeard } = req.body || {}

  if (!fullName || !email || !phoneNumber || !department || !faculty || !level || !whatsappNumber) {
    return res.status(400).json({ message: 'Please complete all required fields.' })
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO members (full_name, email, phone_number, department, faculty, level, gender, whatsapp_number, how_heard, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [fullName, email, phoneNumber, department, faculty, level, gender || null, whatsappNumber, howHeard || null]
    )

    return res.status(201).json({ message: 'Member registered successfully.', memberId: result.insertId })
  } catch (error) {
    const member = {
      id: nextId('members'),
      fullName,
      email,
      phoneNumber,
      department,
      faculty,
      level,
      gender: gender || '',
      whatsappNumber,
      howHeard: howHeard || '',
    }

    store.members.unshift(member)
    return res.status(201).json({
      message: 'Member registered successfully. The form saved locally because MySQL is not available on this server.',
      memberId: member.id,
      fallback: true,
    })
  }
}

async function getMembers(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM members ORDER BY created_at DESC')
    return res.json(rows)
  } catch (error) {
    return res.json(store.members)
  }
}

module.exports = { createMember, getMembers }
