# KN SPA redesigned production website

The redesigned website is served at the domain root. The former /test route redirects to /. Admin edits are saved in SQLite and rendered into the public website. All public media are stored in Cloudinary.

Private environment configuration, credentials, database files and contact messages are deliberately excluded from GitHub backups. For a full private recovery use the protected server database backup. Public website data is exported in content-snapshot/website.json.
