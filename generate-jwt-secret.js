const crypto = require('crypto');

// Generate NEXTAUTH_SECRET
const nextAuthSecret = crypto.randomBytes(64).toString('hex');
console.log('Generated NEXTAUTH_SECRET:', nextAuthSecret);
