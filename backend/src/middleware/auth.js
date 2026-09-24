const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'demo-admin-token'

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : authHeader

  const validToken = token === ADMIN_TOKEN

  if (!validToken) {
    return res.status(401).json({ message: 'Unauthorized: admin access required.' })
  }

  return next()
}

module.exports = { requireAdmin }
