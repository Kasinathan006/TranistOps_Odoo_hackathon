const { PGlite } = require('@electric-sql/pglite');

async function main() {
  const db = new PGlite('./pgdata');
  await db.waitReady;
  
  try {
    const res = await db.query('SELECT * FROM users');
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  }
}

main();
