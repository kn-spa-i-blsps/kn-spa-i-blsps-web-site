import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db, { getSetting, setSetting } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production-kn-spa';
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export function ensureAdminUser() {
  const existing = getSetting('admin_password_hash');
  if (existing) return;

  const defaultPassword = process.env.ADMIN_PASSWORD || 'kn-admin-2026';
  const hash = bcrypt.hashSync(defaultPassword, 12);
  setSetting('admin_password_hash', hash);
  setSetting('admin_username', process.env.ADMIN_USERNAME || 'admin');
  console.log('[auth] Default admin account created. Change ADMIN_PASSWORD in env!');
}

export function verifyLogin(username, password) {
  const storedUser = getSetting('admin_username') || 'admin';
  const hash = getSetting('admin_password_hash');
  if (!hash || username !== storedUser) return false;
  return bcrypt.compareSync(password, hash);
}

export function createToken(username) {
  return jwt.sign({ sub: username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  const cookieToken = req.cookies?.admin_token;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : cookieToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function setAuthCookie(res, token) {
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

export function clearAuthCookie(res) {
  res.clearCookie('admin_token', { path: '/' });
}

export function changePassword(currentPassword, newPassword) {
  const hash = getSetting('admin_password_hash');
  if (!bcrypt.compareSync(currentPassword, hash)) {
    return { ok: false, error: 'Nieprawidłowe obecne hasło' };
  }
  setSetting('admin_password_hash', bcrypt.hashSync(newPassword, 12));
  return { ok: true };
}
