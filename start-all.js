// start-all.js - Starts both the Backend API and Frontend Server
const { fork } = require('child_process');
const path = require('path');
const { exec } = require('child_process');

console.log('🌱 Starting MD Agro Connect servers...');

// 1. Start Backend API
const backendProcess = fork(path.join(__dirname, 'backend', 'server.js'), [], {
  cwd: path.join(__dirname, 'backend'),
});

backendProcess.on('error', (err) => {
  console.error('❌ Failed to start Backend Server:', err);
});

// 2. Start Frontend Server
const frontendProcess = fork(path.join(__dirname, 'serve-frontend.js'), [], {
  cwd: __dirname,
});

frontendProcess.on('error', (err) => {
  console.error('❌ Failed to start Frontend Server:', err);
});

// 3. Open the browser after 2 seconds
setTimeout(() => {
  console.log('\n=============================================');
  console.log('🎉 MD Agro Connect is RUNNING!');
  console.log('🛒 Store:       http://localhost:8080');
  console.log('📦 Admin Panel: http://localhost:8080/admin.html');
  console.log('⚙️ API & Store: http://localhost:3001');
  console.log('=============================================\n');

  // Automatically open default browser on Windows
  exec('start http://localhost:8080');
}, 2000);

// Keep alive and handle exit
process.on('SIGINT', () => {
  backendProcess.kill();
  frontendProcess.kill();
  process.exit();
});

