const { PGlite } = require('@electric-sql/pglite');
const fs = require('fs');
const path = require('path');

// Store data in a local folder
const db = new PGlite('./pgdata');

// Fake a connection pool API so routes don't need changes
const pool = {
  query: async (text, params) => {
    return db.query(text, params);
  },
  connect: async () => {
    return {
      query: async (text, params) => db.query(text, params),
      release: () => {}
    };
  }
};

// Auto-run schema.sql on load
db.waitReady.then(async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);
    console.log('Database schema ensured.');
  } catch(err) {
    console.error('Error initializing schema:', err);
  }
});

module.exports = pool;
