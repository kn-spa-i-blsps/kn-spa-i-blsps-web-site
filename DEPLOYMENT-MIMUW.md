# Current MIMUW deployment

Snapshot of the running website, including the protected /test preview.

The root contains the Node application and public assets. Apache uses .htaccess, gateway.cgi and test-gate.cgi to proxy the application at 127.0.0.1:31847 and protect all /test files with the existing admin session. CGI files must be executable.

content-snapshot contains public API content only. It is an archival export, not an automatic database import. Database files, credentials, environment files, sessions, dependencies and server backups are excluded.
