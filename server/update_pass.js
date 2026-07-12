const bcrypt = require('bcryptjs');
const { PGlite } = require('@electric-sql/pglite');

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  console.log('New hash for admin123:', hash);
  
  const db = new PGlite('./pgdata');
  await db.waitReady;
  
  await db.query('UPDATE users SET password = $1 WHERE email = $2', [hash, 'admin@transitops.com']);
  console.log('Password updated in DB');
}

main();
