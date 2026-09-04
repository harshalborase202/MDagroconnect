// pull-repo.js
// Script to pull all latest files directly from https://github.com/harshalborase202/MDagroconnect.git

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_TREE_URL = 'https://api.github.com/repos/harshalborase202/MDagroconnect/git/trees/main?recursive=1';
const RAW_BASE_URL  = 'https://raw.githubusercontent.com/harshalborase202/MDagroconnect/main/';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'User-Agent': 'Node-GitHub-Pull-Script' }
    };
    https.get(url, options, (res) => {
      let data = '';
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadFile(rawUrl, destPath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'User-Agent': 'Node-GitHub-Pull-Script' }
    };
    https.get(rawUrl, options, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} downloading ${rawUrl}`));
      }
      // Read as buffer to support images and binary files
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.writeFileSync(destPath, buffer);
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔄 Fetching repository file list from GitHub (harshalborase202/MDagroconnect)...');
  try {
    const treeData = await fetchJson(REPO_TREE_URL);
    if (!treeData.tree || !Array.isArray(treeData.tree)) {
      throw new Error('Invalid response from GitHub API');
    }

    const files = treeData.tree.filter(item => item.type === 'blob');
    console.log(`📦 Found ${files.length} files to sync.\n`);

    let count = 0;
    for (const file of files) {
      // Preserve local .env and exclude git internal objects
      if (file.path.endsWith('.env') || file.path.startsWith('.git/')) {
        continue;
      }

      const rawUrl   = RAW_BASE_URL + file.path;
      const localPath = path.join(__dirname, file.path);

      process.stdout.write(`  ⬇️ Downloading: ${file.path} ... `);
      await downloadFile(rawUrl, localPath);
      console.log('✅ Done');
      count++;
    }

    console.log(`\n🎉 Successfully pulled and updated ${count} files from GitHub!`);
  } catch (err) {
    console.error('\n❌ Failed to pull files:', err.message);
  }
}

main();
