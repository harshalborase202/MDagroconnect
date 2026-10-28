// backend/update_product_images.js
// Downloads real agricultural images and updates PRODUCT_IMAGES in app.js & frontend/app.js

const fs = require('fs');
const path = require('path');
const https = require('https');

const REAL_IMAGES = {
  // ── SEEDS ─────────────────────────────────────────────────────────────
  "cotton-seed": {
    fallback: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&auto=format&fit=crop&q=80",
    alt: "Real Bollgard-II hybrid cotton bolls and seeds"
  },
  "wheat-seed": {
    fallback: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
    alt: "Real golden wheat grain and certified seeds"
  },
  "corn-seed": {
    fallback: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80",
    alt: "Real sweet hybrid F1 corn cobs"
  },
  "paddy-seed": {
    fallback: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
    alt: "Real basmati rice paddy field and grains"
  },
  "soybean-seed": {
    fallback: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&auto=format&fit=crop&q=80",
    alt: "Real certified high oil soybean pods"
  },
  "millet-seed": {
    fallback: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    alt: "Real hybrid pearl millet bajra heads"
  },
  "sunflower-seed": {
    fallback: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop&q=80",
    alt: "Real hybrid sunflower head with oil seeds"
  },
  "tomato-seed": {
    fallback: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    alt: "Real firm red hybrid tomatoes on vine"
  },
  "chilli-seed": {
    fallback: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80",
    alt: "Real hot red Teja chillies harvest"
  },
  "onion-seed": {
    fallback: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    alt: "Real Nashik red onions with tight skins"
  },
  "chana-seed": {
    fallback: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop&q=80",
    alt: "Real bold Bengal gram chana pulses"
  },
  "mustard-seed": {
    fallback: "https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80",
    alt: "Real yellow mustard flowers and seeds"
  },
  "groundnut-seed": {
    fallback: "https://images.unsplash.com/photo-1567892328001-c806283b9a06?w=600&auto=format&fit=crop&q=80",
    alt: "Real fresh groundnuts in pod"
  },
  "okra-seed": {
    fallback: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=600&auto=format&fit=crop&q=80",
    alt: "Real tender dark green bhindi okra pods"
  },
  "marigold-seed": {
    fallback: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=600&auto=format&fit=crop&q=80",
    alt: "Real dense golden African marigold blossoms"
  },
  "pea-seed": {
    fallback: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&auto=format&fit=crop&q=80",
    alt: "Real sweet green pea pods on vine"
  },
  "karela-seed": {
    fallback: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&auto=format&fit=crop&q=80",
    alt: "Real fresh long pale green bitter gourd karela"
  },
  "watermelon-seed": {
    fallback: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
    alt: "Real sweet juicy crimson watermelon slice"
  },

  // ── FERTILIZERS ───────────────────────────────────────────────────────
  "vermicompost": {
    fallback: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    alt: "Real dark rich organic vermicompost castings"
  },
  "npk": {
    fallback: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80",
    alt: "Real 100% water soluble NPK 19:19:19"
  },
  "crop-booster": {
    fallback: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&auto=format&fit=crop&q=80",
    alt: "Real liquid bio-fertilizer and plant tonic"
  },
  "micronutrient": {
    fallback: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80",
    alt: "Real Grade 2 chelated micronutrient mixture"
  },
  "npk-00-52-34": {
    fallback: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&auto=format&fit=crop&q=80",
    alt: "Real mono potassium phosphate flowering booster"
  },
  "npk-13-00-45": {
    fallback: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=600&auto=format&fit=crop&q=80",
    alt: "Real potassium nitrate fruit development spray"
  },
  "humic-acid": {
    fallback: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
    alt: "Real shiny 98% potassium humate flakes"
  },
  "seaweed-extract": {
    fallback: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80",
    alt: "Real marine Ascophyllum nodosum bio-zyme"
  },
  "calcium-nitrate": {
    fallback: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
    alt: "Real calcium nitrate with boron for anti-cracking"
  },
  "magnesium-sulphate": {
    fallback: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&auto=format&fit=crop&q=80",
    alt: "Real agricultural epsom salt magnesium crystals"
  },
  "bio-npk": {
    fallback: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
    alt: "Real bacterial liquid consortia nitrogen fixer"
  },
  "neem-cake": {
    fallback: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80",
    alt: "Real pure cold pressed neem seed cake powder"
  },
  "zinc-edta": {
    fallback: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    alt: "Real 12% chelated zinc EDTA micronutrient"
  },
  "ferrous-sulphate": {
    fallback: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
    alt: "Real green vitriol iron chlorosis corrector"
  },
  "nano-urea": {
    fallback: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
    alt: "Real IFFCO nano urea liquid fertilizer bottle"
  },
  "npk-12-61-00": {
    fallback: "https://images.unsplash.com/photo-1592417817098-8f3d69104a47?w=600&auto=format&fit=crop&q=80",
    alt: "Real mono ammonium phosphate starter fertilizer"
  },
  "organic-potash": {
    fallback: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=80",
    alt: "Real natural potash derived from molasses"
  },

  // ── CROP PROTECTION ───────────────────────────────────────────────────
  "neem-shield": {
    fallback: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80",
    alt: "Real 10,000 PPM pure neem oil bio-pesticide"
  },
  "fungicide": {
    fallback: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=600&auto=format&fit=crop&q=80",
    alt: "Real systemic and contact agricultural fungicide"
  },
  "herbicide": {
    fallback: "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=600&auto=format&fit=crop&q=80",
    alt: "Real selective post-emergence weed killer"
  },
  "imidacloprid": {
    fallback: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
    alt: "Real systemic sucking pest insecticide"
  },
  "chlorpyrifos": {
    fallback: "https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?w=600&auto=format&fit=crop&q=80",
    alt: "Real soil termite and root grub protector"
  },
  "trichoderma": {
    fallback: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop&q=80",
    alt: "Real bio-fungicide antagonistic fungal powder"
  },
  "mancozeb": {
    fallback: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
    alt: "Real multi-site contact fungicide shield"
  },
  "emamectin": {
    fallback: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80",
    alt: "Real fast-acting caterpillar buster granules"
  },
  "sticky-trap": {
    fallback: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
    alt: "Real yellow and blue insect glue sticky traps"
  },
  "pheromone-trap": {
    fallback: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80",
    alt: "Real pink bollworm funnel pheromone trap"
  },
  "nitrobenzene": {
    fallback: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80",
    alt: "Real plant flowering booster and growth regulator"
  },
  "copper-oxychloride": {
    fallback: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80",
    alt: "Real copper oxychloride bactericide powder"
  },
  "pseudomonas": {
    fallback: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
    alt: "Real beneficial rhizobacteria PGPR liquid culture"
  },
  "chlorantraniliprole": {
    fallback: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
    alt: "Real 21-day systemic borer and caterpillar defense"
  },
  "acetamiprid": {
    fallback: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    alt: "Real translaminar whitefly and aphid specialist"
  },
  "gibberellic-acid": {
    fallback: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&auto=format&fit=crop&q=80",
    alt: "Real GA-3 crop growth and fruit elongator"
  },
  "super-spreader": {
    fallback: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80",
    alt: "Real organosilicone rain-fast super spreader"
  },

  // ── TOOLS & IRRIGATION ────────────────────────────────────────────────
  "trowel": {
    fallback: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80",
    alt: "Real forged aluminum ergonomic hand trowel"
  },
  "sprayer": {
    fallback: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
    alt: "Real 16-litre 12V battery knapsack sprayer"
  },
  "ph-meter": {
    fallback: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    alt: "Real 3-in-1 soil moisture and pH tester"
  },
  "sprayer-20l": {
    fallback: "https://images.unsplash.com/photo-1592417817098-8f3d69104a47?w=600&auto=format&fit=crop&q=80",
    alt: "Real 20-litre hybrid manual and battery sprayer"
  },
  "spray-lance": {
    fallback: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
    alt: "Real 9-foot extendable brass spray wand"
  },
  "pruner": {
    fallback: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&auto=format&fit=crop&q=80",
    alt: "Real SK-5 high carbon steel bypass pruning shears"
  },
  "drip-pipe": {
    fallback: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&auto=format&fit=crop&q=80",
    alt: "Real 16mm inline drip irrigation lateral roll"
  },
  "solar-trap": {
    fallback: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    alt: "Real automatic solar-powered insect pest trap"
  },
  "mulching-film": {
    fallback: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
    alt: "Real silver-black 25 micron mulching film roll"
  },
  "tds-meter": {
    fallback: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    alt: "Real digital EC and TDS fertigation water tester"
  },
  "tarpaulin": {
    fallback: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
    alt: "Real heavy-duty 250 GSM waterproof tarpaulin"
  },
  "drip-master-kit": {
    fallback: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&auto=format&fit=crop&q=80",
    alt: "Real complete 1-acre drip irrigation installation"
  },
  "shade-net": {
    fallback: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80",
    alt: "Real 50% UV treated agro green shade netting"
  },
  "mini-tiller": {
    fallback: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
    alt: "Real rotary inter-row battery power weeder tiller"
  },
  "cocopeat": {
    fallback: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    alt: "Real low-EC compressed coconut coir 5kg block"
  }
};

// Function to update app.js & frontend/app.js
function updateAppJs() {
  const imagesObj = {};
  for (const [key, data] of Object.entries(REAL_IMAGES)) {
    imagesObj[key] = {
      local: `images/${key}.jpg`,
      fallback: data.fallback,
      alt: data.alt
    };
  }

  const generatedBlock = 'const PRODUCT_IMAGES = ' + JSON.stringify(imagesObj, null, 4) + ';';

  ['app.js', 'frontend/app.js'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/const PRODUCT_IMAGES = \{[\s\S]*?\n\};/, generatedBlock);
    fs.writeFileSync(file, content);
    console.log(`✅ Updated PRODUCT_IMAGES in ${file} with ${Object.keys(imagesObj).length} real image definitions.`);
  });
}

// Download image helper with redirects
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      return resolve(false); // Already exists
    }

    const file = fs.createWriteStream(destPath);
    const request = https.get(url, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return resolve(false);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    });

    request.on('error', err => {
      fs.unlink(destPath, () => {});
      resolve(false);
    });

    request.setTimeout(10000, () => {
      request.destroy();
      fs.unlink(destPath, () => {});
      resolve(false);
    });
  });
}

async function run() {
  updateAppJs();

  const imgDirs = [
    path.join(__dirname, '..', 'images'),
    path.join(__dirname, '..', 'frontend', 'images')
  ];

  imgDirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  console.log('🖼️  Downloading real images to disk...');
  let downloaded = 0;

  for (const [key, data] of Object.entries(REAL_IMAGES)) {
    const filename = `${key}.jpg`;
    for (const dir of imgDirs) {
      const dest = path.join(dir, filename);
      const ok = await downloadImage(data.fallback, dest);
      if (ok) downloaded++;
    }
  }

  console.log(`🎉 Finished! Downloaded ${downloaded} local image files.`);
}

run().catch(console.error);
