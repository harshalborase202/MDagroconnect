import json, os, re

# Load product data from seed_large_catalog
from seed_large_catalog import PRODUCTS_DATA

# Create JavaScript array representation for PRODUCTS
js_products = "const PRODUCTS = " + json.dumps(PRODUCTS_DATA, indent=4) + ";\n"

# Create JavaScript map for PRODUCT_IMAGES
images_map = {
    'cotton-seed': { 'local': 'images/cotton-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80', 'alt': 'Real hybrid cotton bolls and crop' },
    'wheat-seed': { 'local': 'images/wheat-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80', 'alt': 'Real golden wheat harvest seeds' },
    'corn-seed': { 'local': 'images/corn-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80', 'alt': 'Real sweet hybrid F1 corn' },
    'paddy-seed': { 'local': 'images/paddy-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80', 'alt': 'Real agricultural rice paddy grains' },
    'soybean-seed': { 'local': 'images/soybean-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80', 'alt': 'Real high oil hybrid soybean' },
    'millet-seed': { 'local': 'images/millet-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', 'alt': 'Real hybrid pearl millet bajra' },
    'sunflower-seed': { 'local': 'images/sunflower-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80', 'alt': 'Real hybrid sunflower head and seeds' },
    'tomato-seed': { 'local': 'images/tomato-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80', 'alt': 'Real deep red firm hybrid tomatoes' },
    'chilli-seed': { 'local': 'images/chilli-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80', 'alt': 'Real hot red chilli peppers' },
    'onion-seed': { 'local': 'images/onion-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80', 'alt': 'Real Nashik red onions' },
    'chana-seed': { 'local': 'images/chana-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80', 'alt': 'Real desi Bengal gram chana' },
    'mustard-seed': { 'local': 'images/mustard-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80', 'alt': 'Real hybrid yellow mustard seeds' },
    'groundnut-seed': { 'local': 'images/groundnut-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1567892328001-c806283b9a06?auto=format&fit=crop&w=800&q=80', 'alt': 'Real high oil groundnut pods' },
    'okra-seed': { 'local': 'images/okra-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=800&q=80', 'alt': 'Real tender dark green okra pods' },
    'marigold-seed': { 'local': 'images/marigold-seed.jpg', 'fallback': 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=80', 'alt': 'Real golden marigold flower harvest' },
    'vermicompost': { 'local': 'images/vermicompost.jpg', 'fallback': 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80', 'alt': 'Real organic dark vermicompost' },
    'npk': { 'local': 'images/npk.jpg', 'fallback': 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80', 'alt': 'Real water soluble NPK nutrients' },
    'liquid-booster': { 'local': 'images/liquid-booster.jpg', 'fallback': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80', 'alt': 'Real seaweed liquid crop booster bottle' },
    'micronutrient': { 'local': 'images/micronutrient.jpg', 'fallback': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80', 'alt': 'Real balanced soil micronutrients' },
    'dap-fert': { 'local': 'images/dap-fert.jpg', 'fallback': 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80', 'alt': 'Real DAP 18:46:0 granular fertilizer' },
    'mop-fert': { 'local': 'images/mop-fert.jpg', 'fallback': 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=800&q=80', 'alt': 'Real Muriate of Potash MOP' },
    'urea-fert': { 'local': 'images/urea-fert.jpg', 'fallback': 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=800&q=80', 'alt': 'Real neem-coated urea granules' },
    'mkp-fert': { 'local': 'images/mkp-fert.jpg', 'fallback': 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=800&q=80', 'alt': 'Real 00:52:34 MKP foliar nutrition' },
    'map-fert': { 'local': 'images/map-fert.jpg', 'fallback': 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80', 'alt': 'Real 12:61:00 MAP root fertilizer' },
    'calcium-nitrate': { 'local': 'images/calcium-nitrate.jpg', 'fallback': 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80', 'alt': 'Real water soluble calcium nitrate' },
    'potassium-schoenite': { 'local': 'images/potassium-schoenite.jpg', 'fallback': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80', 'alt': 'Real natural potassium schoenite' },
    'humic-acid': { 'local': 'images/humic-acid.jpg', 'fallback': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 'alt': 'Real concentrated humic acid flakes' },
    'chelated-zinc': { 'local': 'images/chelated-zinc.jpg', 'fallback': 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80', 'alt': 'Real chelated EDTA zinc powder' },
    'gypsum-fert': { 'local': 'images/gypsum-fert.jpg', 'fallback': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80', 'alt': 'Real agricultural soil conditioner gypsum' },
    'neem-shield': { 'local': 'images/neem-shield.jpg', 'fallback': 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80', 'alt': 'Real organic cold pressed neem shield' },
    'fungicide': { 'local': 'images/fungicide.jpg', 'fallback': 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80', 'alt': 'Real systemic and contact fungicide' },
    'herbicide': { 'local': 'images/herbicide.jpg', 'fallback': 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80', 'alt': 'Real selective field crop herbicide' },
    'imidacloprid': { 'local': 'images/imidacloprid.jpg', 'fallback': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80', 'alt': 'Real systemic insecticide imidacloprid' },
    'chlorpyrifos': { 'local': 'images/chlorpyrifos.jpg', 'fallback': 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80', 'alt': 'Real chlorpyrifos termite defense' },
    'trichoderma': { 'local': 'images/trichoderma.jpg', 'fallback': 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80', 'alt': 'Real bio-fungicide trichoderma viride' },
    'mancozeb': { 'local': 'images/mancozeb.jpg', 'fallback': 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80', 'alt': 'Real protective contact mancozeb' },
    'emamectin': { 'local': 'images/emamectin.jpg', 'fallback': 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=800&q=80', 'alt': 'Real emamectin caterpillar blast' },
    'sticky-trap': { 'local': 'images/sticky-trap.jpg', 'fallback': 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=800&q=80', 'alt': 'Real yellow and blue sticky traps' },
    'pheromone-trap': { 'local': 'images/pheromone-trap.jpg', 'fallback': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80', 'alt': 'Real bollworm pheromone trap lure' },
    'nitrobenzene': { 'local': 'images/nitrobenzene.jpg', 'fallback': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80', 'alt': 'Real nitrobenzene flowering stimulant' },
    'copper-oxychloride': { 'local': 'images/copper-oxychloride.jpg', 'fallback': 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80', 'alt': 'Real copper oxychloride bactericide' },
    'pseudomonas': { 'local': 'images/pseudomonas.jpg', 'fallback': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80', 'alt': 'Real pseudomonas bio-culture liquid' },
    'trowel': { 'local': 'images/trowel.jpg', 'fallback': 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80', 'alt': 'Real forged aluminum ergonomic trowel' },
    'sprayer': { 'local': 'images/sprayer.jpg', 'fallback': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80', 'alt': 'Real 16L electric knapsack sprayer' },
    'ph-meter': { 'local': 'images/ph-meter.jpg', 'fallback': 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=800&q=80', 'alt': 'Real 3-in-1 soil moisture and pH meter' },
    'sprayer-20l': { 'local': 'images/sprayer-20l.jpg', 'fallback': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80', 'alt': 'Real 20L dual manual & battery sprayer' },
    'spray-lance': { 'local': 'images/spray-lance.jpg', 'fallback': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', 'alt': 'Real 9-foot brass telescopic lance' },
    'secateurs': { 'local': 'images/secateurs.jpg', 'fallback': 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80', 'alt': 'Real SK-5 bypass pruning secateurs' },
    'drip-kit': { 'local': 'images/drip-kit.jpg', 'fallback': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80', 'alt': 'Real complete 50 plants drip irrigation kit' },
    'garden-rake': { 'local': 'images/garden-rake.jpg', 'fallback': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', 'alt': 'Real 14-teeth forged steel soil rake' },
    'chemical-duster': { 'local': 'images/chemical-duster.jpg', 'fallback': 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80', 'alt': 'Real rotary chemical sulfur duster' },
    'seed-dibbler': { 'local': 'images/seed-dibbler.jpg', 'fallback': 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80', 'alt': 'Real manual stand-up planter dibbler' },
    'md-agro-store': { 'local': 'images/md-agro-store.jpg', 'fallback': 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80', 'alt': 'MD Agro Krishi Kendra store' }
}

js_images = "const PRODUCT_IMAGES = " + json.dumps(images_map, indent=4) + ";\n"

print("Product count:", len(PRODUCTS_DATA))
print("Image count:", len(images_map))
