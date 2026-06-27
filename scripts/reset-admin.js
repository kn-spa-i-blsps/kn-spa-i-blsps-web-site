#!/usr/bin/env node
/**
 * Awaryjny reset hasła admina w bazie SQLite.
 * Użycie: ADMIN_PASSWORD=nowe-haslo node scripts/reset-admin.js
 */
import bcrypt from 'bcryptjs';
import { ensureAdminUser, syncAdminFromEnv } from '../server/auth.js';
import { getSetting } from '../server/db.js';

ensureAdminUser();
syncAdminFromEnv();

const password = process.env.ADMIN_PASSWORD;
if (!password) {
  console.error('Ustaw ADMIN_PASSWORD, np.: ADMIN_PASSWORD=moje-haslo node scripts/reset-admin.js');
  process.exit(1);
}

console.log(`[reset-admin] Login: ${getSetting('admin_username') || 'admin'}`);
console.log('[reset-admin] Hasło zaktualizowane z ADMIN_PASSWORD.');
