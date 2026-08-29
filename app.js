/* ================================================================
   SlopeIntel India — app.js
   Terrain Analysis · Soil Mapping · Landslide Susceptibility
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   1. STATE DATABASE — India states with slope/soil/risk data
   ---------------------------------------------------------------- */
const STATES_DB = {
  "Jammu & Kashmir": {
    region: "Northwestern Himalayas",
    soilType: "mountain",
    riskLevel: "High",
    riskClass: "risk-h",
    slopeRange: "30–70°",
    rainfall: "600–1200 mm/yr",
    elevation: "300–8,611 m",
    lithology: "Crystalline / metamorphic",
    majorTriggers: ["Snowmelt", "Cloudburst rainfall", "Seismic activity"],
    susceptScore: 68,
    seismicZone: "V",
    population: "12.5 M",
    area: "42,241 km²"
  },
  "Himachal Pradesh": {
    region: "Western Himalayas",
    soilType: "mountain",
    riskLevel: "Very High",
    riskClass: "risk-vh",
    slopeRange: "35–75°",
    rainfall: "800–3000 mm/yr",
    elevation: "350–6,975 m",
    lithology: "Sedimentary / shale",
    majorTriggers: ["Heavy monsoon", "Cloud bursts", "Seismic shocks"],
    susceptScore: 82,
    seismicZone: "V",
    population: "7.3 M",
    area: "55,673 km²"
  },
  "Uttarakhand": {
    region: "Central Himalayas",
    soilType: "mountain",
    riskLevel: "Very High",
    riskClass: "risk-vh",
    slopeRange: "30–75°",
    rainfall: "1000–3500 mm/yr",
    elevation: "210–7,817 m",
    lithology: "Phyllite / quartzite",
    majorTriggers: ["Cloudburst", "Glacial lake outburst", "Deforestation"],
    susceptScore: 88,
    seismicZone: "V",
    population: "11.1 M",
    area: "53,483 km²"
  },
  "Sikkim": {
    region: "Eastern Himalayas",
    soilType: "mountain",
    riskLevel: "Very High",
    riskClass: "risk-vh",
    slopeRange: "40–80°",
    rainfall: "2500–5000 mm/yr",
    elevation: "280–8,586 m",
    lithology: "Schist / gneiss",
    majorTriggers: ["Intense monsoon", "Earthquake", "GLOF events"],
    susceptScore: 91,
    seismicZone: "V",
    population: "0.66 M",
    area: "7,096 km²"
  },
  "Assam": {
    region: "Northeastern Plains & Hills",
    soilType: "alluvial",
    riskLevel: "High",
    riskClass: "risk-h",
    slopeRange: "5–30°",
    rainfall: "2000–4000 mm/yr",
    elevation: "50–1,200 m",
    lithology: "Alluvial / tertiary sediments",
    majorTriggers: ["Monsoon floods", "Bank erosion", "Flash floods"],
    susceptScore: 65,
    seismicZone: "V",
    population: "35.6 M",
    area: "78,438 km²"
  },
  "Meghalaya": {
    region: "Shillong Plateau",
    soilType: "laterite",
    riskLevel: "Very High",
    riskClass: "risk-vh",
    slopeRange: "20–55°",
    rainfall: "3000–12000 mm/yr",
    elevation: "50–1,966 m",
    lithology: "Granite / quartzite",
    majorTriggers: ["Extreme rainfall (Cherrapunji)", "Deforestation", "Mining"],
    susceptScore: 86,
    seismicZone: "V",
    population: "3.4 M",
    area: "22,429 km²"
  },
  "Manipur": {
    region: "Northeastern Hill Ranges",
    soilType: "mountain",
    riskLevel: "Very High",
    riskClass: "risk-vh",
    slopeRange: "25–60°",
    rainfall: "1500–3000 mm/yr",
    elevation: "55–2,994 m",
    lithology: "Shale / sandstone",
    majorTriggers: ["Monsoon", "Jhumming (shifting cultivation)", "Road cutting"],
    susceptScore: 80,
    seismicZone: "V",
    population: "3.2 M",
    area: "22,327 km²"
  },
  "Nagaland": {
    region: "Naga Hills",
    soilType: "mountain",
    riskLevel: "High",
    riskClass: "risk-h",
    slopeRange: "20–55°",
    rainfall: "1500–2500 mm/yr",
    elevation: "200–3,843 m",
    lithology: "Sandstone / shale",
    majorTriggers: ["Monsoon", "Jhumming", "Infrastructure development"],
    susceptScore: 72,
    seismicZone: "V",
    population: "2.2 M",
    area: "16,579 km²"
  },
  "Arunachal Pradesh": {
    region: "Eastern Himalayas",
    soilType: "mountain",
    riskLevel: "Very High",
    riskClass: "risk-vh",
    slopeRange: "30–75°",
    rainfall: "2000–5000 mm/yr",
    elevation: "50–7,090 m",
    lithology: "Crystalline / gneiss",
    majorTriggers: ["Heavy monsoon", "Glacial retreat", "Flash floods"],
    susceptScore: 85,
    seismicZone: "V",
    population: "1.6 M",
    area: "83,743 km²"
  },
  "Kerala": {
    region: "Western Ghats",
    soilType: "laterite",
    riskLevel: "High",
    riskClass: "risk-h",
    slopeRange: "15–45°",
    rainfall: "2500–5000 mm/yr",
    elevation: "0–2,695 m",
    lithology: "Laterite / crystalline",
    majorTriggers: ["Intense monsoon", "Deforestation", "Quarrying"],
    susceptScore: 75,
    seismicZone: "III",
    population: "35.0 M",
    area: "38,852 km²"
  },
  "Karnataka": {
    region: "Western Ghats / Deccan",
    soilType: "red_yellow",
    riskLevel: "Moderate",
    riskClass: "risk-m",
    slopeRange: "10–40°",
    rainfall: "600–3500 mm/yr",
    elevation: "0–1,925 m",
    lithology: "Granite / basalt",
    majorTriggers: ["Western Ghats monsoon", "Deforestation", "Agricultural terracing"],
    susceptScore: 50,
    seismicZone: "II-III",
    population: "67.6 M",
    area: "191,791 km²"
  },
  "Maharashtra": {
    region: "Deccan Plateau / Konkan",
    soilType: "black",
    riskLevel: "Moderate",
    riskClass: "risk-m",
    slopeRange: "5–35°",
    rainfall: "600–4000 mm/yr",
    elevation: "0–1,646 m",
    lithology: "Basalt / Deccan trap",
    majorTriggers: ["Heavy monsoon on Sahyadri", "Urbanisation", "Soil saturation"],
    susceptScore: 45,
    seismicZone: "III-IV",
    population: "123.1 M",
    area: "307,713 km²"
  },
  "Goa": {
    region: "Western Ghats / Coastal",
    soilType: "laterite",
    riskLevel: "Moderate",
    riskClass: "risk-m",
    slopeRange: "10–35°",
    rainfall: "2500–4000 mm/yr",
    elevation: "0–1,022 m",
    lithology: "Laterite",
    majorTriggers: ["Monsoon", "Mining", "Coastal erosion"],
    susceptScore: 48,
    seismicZone: "III",
    population: "1.5 M",
    area: "3,702 km²"
  },
  "Tamil Nadu": {
    region: "Peninsular / Nilgiris",
    soilType: "red_yellow",
    riskLevel: "Low",
    riskClass: "risk-l",
    slopeRange: "5–25°",
    rainfall: "800–1500 mm/yr",
    elevation: "0–2,695 m",
    lithology: "Charnockite / granite",
    majorTriggers: ["Northeast monsoon", "Nilgiris landslides", "Tea plantation terracing"],
    susceptScore: 32,
    seismicZone: "II-III",
    population: "77.8 M",
    area: "130,058 km²"
  },
  "Andhra Pradesh": {
    region: "Eastern Ghats / Coastal",
    soilType: "red_yellow",
    riskLevel: "Low",
    riskClass: "risk-l",
    slopeRange: "5–25°",
    rainfall: "800–1400 mm/yr",
    elevation: "0–1,680 m",
    lithology: "Granite / schist",
    majorTriggers: ["Cyclone rainfall", "Eastern Ghats erosion", "Agricultural slope cuts"],
    susceptScore: 28,
    seismicZone: "II-III",
    population: "53.9 M",
    area: "162,975 km²"
  },
  "Telangana": {
    region: "Deccan Plateau",
    soilType: "red_yellow",
    riskLevel: "Low",
    riskClass: "risk-l",
    slopeRange: "3–15°",
    rainfall: "700–1200 mm/yr",
    elevation: "100–1,200 m",
    lithology: "Granite / gneiss",
    majorTriggers: ["Flash floods", "Urban drainage issues"],
    susceptScore: 22,
    seismicZone: "II",
    population: "39.3 M",
    area: "112,077 km²"
  },
  "Odisha": {
    region: "Eastern Ghats",
    soilType: "red_yellow",
    riskLevel: "Moderate",
    riskClass: "risk-m",
    slopeRange: "10–35°",
    rainfall: "1200–1800 mm/yr",
    elevation: "0–1,672 m",
    lithology: "Khondalite / quartzite",
    majorTriggers: ["Cyclone-associated rainfall", "Tribal area deforestation", "Mining"],
    susceptScore: 42,
    seismicZone: "II-III",
    population: "46.4 M",
    area: "155,707 km²"
  },
  "Jharkhand": {
    region: "Chota Nagpur Plateau",
    soilType: "red_yellow",
    riskLevel: "Low",
    riskClass: "risk-l",
    slopeRange: "5–25°",
    rainfall: "900–1500 mm/yr",
    elevation: "100–1,365 m",
    lithology: "Granite / basalt",
    majorTriggers: ["Mining-induced instability", "Monsoon runoff", "Deforestation"],
    susceptScore: 30,
    seismicZone: "II",
    population: "38.6 M",
    area: "79,716 km²"
  },
  "Chhattisgarh": {
    region: "Central India Highlands",
    soilType: "red_yellow",
    riskLevel: "Low",
    riskClass: "risk-l",
    slopeRange: "5–20°",
    rainfall: "1000–1500 mm/yr",
    elevation: "100–1,225 m",
    lithology: "Sandstone / limestone",
    majorTriggers: ["Monsoon", "River bank erosion"],
    susceptScore: 25,
    seismicZone: "II",
    population: "32.2 M",
    area: "135,192 km²"
  },
  "Madhya Pradesh": {
    region: "Central India",
    soilType: "black",
    riskLevel: "Low",
    riskClass: "risk-l",
    slopeRange: "2–15°",
    rainfall: "700–1500 mm/yr",
    elevation: "100–1,350 m",
    lithology: "Basalt / sandstone",
    majorTriggers: ["Vindhya escarpment erosion", "River floods"],
    susceptScore: 20,
    seismicZone: "II-III",
    population: "84.3 M",
    area: "308,252 km²"
  },
  "Rajasthan": {
    region: "Thar Desert / Aravalli",
    soilType: "arid",
    riskLevel: "Very Low",
    riskClass: "risk-vl",
    slopeRange: "1–15°",
    rainfall: "100–600 mm/yr",
    elevation: "0–1,722 m",
    lithology: "Granite / quartzite",
    majorTriggers: ["Flash floods in Aravalli", "Wind erosion"],
    susceptScore: 12,
    seismicZone: "II-III",
    population: "79.5 M",
    area: "342,239 km²"
  },
  "Gujarat": {
    region: "Coastal / Kutch",
    soilType: "black",
    riskLevel: "Very Low",
    riskClass: "risk-vl",
    slopeRange: "1–10°",
    rainfall: "300–1800 mm/yr",
    elevation: "0–1,722 m",
    lithology: "Basalt / alluvium",
    majorTriggers: ["Coastal erosion", "Seismic activity (Kutch)"],
    susceptScore: 15,
    seismicZone: "III-V",
    population: "70.4 M",
    area: "196,024 km²"
  },
  "Punjab": {
    region: "Indo-Gangetic Plains",
    soilType: "alluvial",
    riskLevel: "Very Low",
    riskClass: "risk-vl",
    slopeRange: "1–5°",
    rainfall: "400–900 mm/yr",
    elevation: "170–400 m",
    lithology: "Deep alluvium",
    majorTriggers: ["Waterlogging", "River bank flooding"],
    susceptScore: 8,
    seismicZone: "III-IV",
    population: "30.1 M",
    area: "50,362 km²"
  },
  "Haryana": {
    region: "Indo-Gangetic Plains",
    soilType: "alluvial",
    riskLevel: "Very Low",
    riskClass: "risk-vl",
    slopeRange: "1–5°",
    rainfall: "400–800 mm/yr",
    elevation: "200–1,499 m",
    lithology: "Alluvium / quartzite",
    majorTriggers: ["Flash floods in Aravalli fringe", "Waterlogging"],
    susceptScore: 10,
    seismicZone: "III-IV",
    population: "28.2 M",
    area: "44,212 km²"
  },
  "Uttar Pradesh": {
    region: "Indo-Gangetic Plains",
    soilType: "alluvial",
    riskLevel: "Very Low",
    riskClass: "risk-vl",
    slopeRange: "1–5°",
    rainfall: "600–1200 mm/yr",
    elevation: "60–1,000 m",
    lithology: "Deep alluvium",
    majorTriggers: ["River bank erosion", "Flooding"],
    susceptScore: 10,
    seismicZone: "III-IV",
    population: "237.8 M",
    area: "240,928 km²"
  },
  "Bihar": {
    region: "Indo-Gangetic Plains",
    soilType: "alluvial",
    riskLevel: "Very Low",
    riskClass: "risk-vl",
    slopeRange: "1–5°",
    rainfall: "900–1500 mm/yr",
    elevation: "40–2,880 m",
    lithology: "Alluvium",
    majorTriggers: ["Kosi/Ganga floods", "River bank collapse"],
    susceptScore: 12,
    seismicZone: "III-IV",
    population: "128.5 M",
    area: "94,163 km²"
  },
  "West Bengal": {
    region: "Darjeeling Hills / Gangetic Plain",
    soilType: "alluvial",
    riskLevel: "High",
    riskClass: "risk-h",
    slopeRange: "5–60°",
    rainfall: "1000–3500 mm/yr",
    elevation: "0–3,636 m",
    lithology: "Schist / alluvium",
    majorTriggers: ["Darjeeling landslides", "Monsoon", "Tea garden terracing"],
    susceptScore: 60,
    seismicZone: "III-IV",
    population: "99.6 M",
    area: "88,752 km²"
  },
  "Tripura": {
    region: "Northeastern Hills",
    soilType: "laterite",
    riskLevel: "High",
    riskClass: "risk-h",
    slopeRange: "15–45°",
    rainfall: "2000–3000 mm/yr",
    elevation: "10–939 m",
    lithology: "Sandstone / shale",
    majorTriggers: ["Monsoon", "Deforestation", "Jhumming"],
    susceptScore: 62,
    seismicZone: "V",
    population: "4.2 M",
    area: "10,486 km²"
  },
  "Mizoram": {
    region: "Northeastern Hills",
    soilType: "mountain",
    riskLevel: "Very High",
    riskClass: "risk-vh",
    slopeRange: "25–65°",
    rainfall: "2000–4000 mm/yr",
    elevation: "30–2,210 m",
    lithology: "Sandstone / shale",
    majorTriggers: ["Extreme monsoon", "Jhumming", "Road cuts"],
    susceptScore: 82,
    seismicZone: "V",
    population: "1.3 M",
    area: "21,081 km²"
  },
  "Himalayas (General)": {
    region: "Greater Himalayas",
    soilType: "mountain",
    riskLevel: "Very High",
    riskClass: "risk-vh",
    slopeRange: "40–80°",
    rainfall: "800–5000 mm/yr",
    elevation: "300–8,848 m",
    lithology: "Mixed Himalayan geology",
    majorTriggers: ["Monsoon", "Seismicity", "Glacial lake outburst"],
    susceptScore: 90,
    seismicZone: "V",
    population: "N/A",
    area: "N/A"
  }
};

/* ----------------------------------------------------------------
   2. SOIL DATABASE — NBSS&LUP Soil Profiles
   ---------------------------------------------------------------- */
const SOIL_DB = {
  alluvial: {
    name: "Alluvial Soils",
    usda: "Entisols / Inceptisols",
    uscs: "SP-SM / CL",
    uscsDesc: "Poorly graded sand-silt mix / Low plasticity clay",
    distribution: "Indo-Gangetic plains, river deltas, coastal areas — covers ~46% of India",
    states: ["Uttar Pradesh", "Bihar", "West Bengal", "Punjab", "Haryana", "Assam", "Odisha"],
    sand: 52, silt: 28, clay: 20,
    permClass: "Moderate to High",
    horizons: [
      { label: "Ap (0–20 cm)", cls: "hz-a", color: "#8B6914", desc: "Dark brown plough layer; high organic matter, fine sandy-loam texture" },
      { label: "A (20–40 cm)", cls: "hz-a", color: "#9B7A20", desc: "Brown; structured, moderate fertility; fine-medium texture" },
      { label: "B (40–90 cm)", cls: "hz-b", color: "#B09040", desc: "Yellowish-brown; Fe-Mn concretions possible; silty clay loam" },
      { label: "C (90–200+ cm)", cls: "hz-c", color: "#C8B070", desc: "Pale/sandy; stratified; parent alluvium; slight calcareous" }
    ],
    geoProps: [
      { prop: "Cohesion (c)", sym: "c", val: "5–20 kPa" },
      { prop: "Friction Angle", sym: "φ", val: "25–35°" },
      { prop: "Unit Weight", sym: "γ", val: "17–20 kN/m³" },
      { prop: "Liquid Limit", sym: "LL", val: "25–40%" },
      { prop: "Plasticity Index", sym: "PI", val: "8–18%" },
      { prop: "SPT (N-value)", sym: "N", val: "8–30" },
      { prop: "Compressibility", sym: "Cc", val: "0.1–0.3 (Low–Mod)" },
      { prop: "Shear Strength", sym: "Su", val: "30–80 kPa" }
    ],
    implications: "Alluvial soils are generally stable on flat ground but susceptible to <strong>riverbank erosion, liquefaction during earthquakes (Zone IV/V)</strong>, and piping. On sloped terrain near hill-foot zones, they can fail rapidly when saturated during monsoon. Shallow foundations often adequate on dense alluvium; deep alluvium requires SPT-based pile design."
  },
  black: {
    name: "Black Soils (Regur / Vertisols)",
    usda: "Vertisols",
    uscs: "CH",
    uscsDesc: "High plasticity clay (swelling)",
    distribution: "Deccan Plateau, Malwa, Gujarat — ~15% of India; formed from Deccan basalt",
    states: ["Maharashtra", "Madhya Pradesh", "Gujarat", "Telangana", "Karnataka", "Andhra Pradesh"],
    sand: 20, silt: 28, clay: 52,
    permClass: "Very Low (slickenside structure)",
    horizons: [
      { label: "A (0–30 cm)", cls: "hz-a", color: "#2A2A2A", desc: "Deep black; high clay (smectite); cracks up to 1m deep in dry season" },
      { label: "B (30–80 cm)", cls: "hz-b", color: "#3A3030", desc: "Dark brown-black; blocky structure; slickensides; high shrink-swell" },
      { label: "Bss (80–150 cm)", cls: "hz-b", color: "#4A3A28", desc: "Olive-brown; prominent slickensides; carbonate nodules (kankars)" },
      { label: "C (150–200+ cm)", cls: "hz-c", color: "#6A5040", desc: "Weathered basalt; CaCO3 rich; gypsum possible" }
    ],
    geoProps: [
      { prop: "Cohesion (c)", sym: "c", val: "20–60 kPa" },
      { prop: "Friction Angle", sym: "φ", val: "10–20°" },
      { prop: "Unit Weight", sym: "γ", val: "18–22 kN/m³" },
      { prop: "Liquid Limit", sym: "LL", val: "50–80%" },
      { prop: "Plasticity Index", sym: "PI", val: "25–50%" },
      { prop: "Swell Pressure", sym: "Ps", val: "50–400 kPa" },
      { prop: "Free Swell Index", sym: "FSI", val: "60–200%" },
      { prop: "Shear Strength (wet)", sym: "Su", val: "15–50 kPa" }
    ],
    implications: "Black soils (Vertisols) pose major challenges due to <strong>extreme shrink-swell behaviour</strong>. Dry cracks cause differential settlement; wet conditions reduce bearing capacity dramatically. On slopes, they are susceptible to <strong>rotational slips and mudflows</strong>. Raft or under-reamed pile foundations recommended. Avoid cutting slopes in wet seasons."
  },
  red_yellow: {
    name: "Red & Yellow Soils",
    usda: "Alfisols / Ultisols",
    uscs: "SC / CL",
    uscsDesc: "Sandy clay / Low-medium plasticity clay",
    distribution: "Deccan Plateau, Eastern Ghats, Odisha, Chhattisgarh, Karnataka — ~10.6% of India",
    states: ["Tamil Nadu", "Andhra Pradesh", "Karnataka", "Odisha", "Chhattisgarh", "Jharkhand"],
    sand: 45, silt: 25, clay: 30,
    permClass: "Moderate",
    horizons: [
      { label: "O/A (0–15 cm)", cls: "hz-o", color: "#8B4513", desc: "Reddish-brown; porous; low organic; prone to erosion" },
      { label: "B (15–60 cm)", cls: "hz-b", color: "#C87941", desc: "Red (Fe2O3); clay-enriched B horizon; blocky structure" },
      { label: "BC (60–120 cm)", cls: "hz-b", color: "#D4955A", desc: "Yellow mottling; mixed oxidation states; Fe-Mn nodules" },
      { label: "C (120–200+ cm)", cls: "hz-c", color: "#E0B080", desc: "Weathered crystalline/metamorphic parent rock; saprolite" }
    ],
    geoProps: [
      { prop: "Cohesion (c)", sym: "c", val: "10–30 kPa" },
      { prop: "Friction Angle", sym: "φ", val: "25–35°" },
      { prop: "Unit Weight", sym: "γ", val: "16–19 kN/m³" },
      { prop: "Liquid Limit", sym: "LL", val: "28–45%" },
      { prop: "Plasticity Index", sym: "PI", val: "10–22%" },
      { prop: "CBR Value", sym: "CBR", val: "5–20%" },
      { prop: "Void Ratio", sym: "e", val: "0.5–0.9" },
      { prop: "Compression Index", sym: "Cc", val: "0.15–0.35" }
    ],
    implications: "Red soils have moderate stability. Key concern is <strong>high erodibility</strong> — exposed slopes show severe rill and gully erosion under monsoon. On steep terrain, colluvium buildup at slope base creates slide risk. Foundation design requires investigation of saprolite thickness; shallow foundations on rock-cut plateaus generally safe."
  },
  laterite: {
    name: "Laterite Soils",
    usda: "Ultisols / Oxisols",
    uscs: "SC / GC",
    uscsDesc: "Silty-gravelly clay; sesquioxide-rich",
    distribution: "Western Ghats, Eastern Ghats, Kerala, Goa, Meghalaya — tropical leaching zones",
    states: ["Kerala", "Goa", "Karnataka (coast)", "Meghalaya", "West Bengal (N)", "Tripura"],
    sand: 30, silt: 20, clay: 50,
    permClass: "Low to Moderate (laterite crust hard)",
    horizons: [
      { label: "Laterite Crust (0–20 cm)", cls: "hz-o", color: "#8B2200", desc: "Hard vesicular ironstone crust; concretionary; brittle when dried" },
      { label: "Mottled Zone (20–80 cm)", cls: "hz-b", color: "#A03520", desc: "Red-white mottling; kaolinite + Fe-oxides; soft when wet" },
      { label: "Pallid Zone (80–200 cm)", cls: "hz-b", color: "#C06040", desc: "Bleached; reduced zone; pipe-collapse risk in wet seasons" },
      { label: "Parent Rock (200+ cm)", cls: "hz-c", color: "#D09070", desc: "Weathered gneiss / schist; boundary often irregular" }
    ],
    geoProps: [
      { prop: "Cohesion (c)", sym: "c", val: "15–40 kPa" },
      { prop: "Friction Angle", sym: "φ", val: "20–32°" },
      { prop: "Unit Weight", sym: "γ", val: "15–18 kN/m³" },
      { prop: "Liquid Limit", sym: "LL", val: "35–60%" },
      { prop: "Plasticity Index", sym: "PI", val: "15–30%" },
      { prop: "Point Load Index", sym: "Is50", val: "0.5–3 MPa" },
      { prop: "Bearing Capacity", sym: "qu", val: "100–500 kPa" },
      { prop: "Water Absorption", sym: "WA", val: "High (>5%)" }
    ],
    implications: "Laterite soils on the Western Ghats are a <strong>critical landslide concern</strong>. The hard crust conceals a soft, saturated pallid zone underneath. During intense rainfall, the crust fails suddenly — triggering <strong>debris avalanches and mudflows</strong>. Road cuts into laterite slopes are particularly dangerous. Drainage design is critical; do not disturb crust cover on slopes >20°."
  },
  arid: {
    name: "Arid / Desert Soils",
    usda: "Aridisols",
    uscs: "SP / SM",
    uscsDesc: "Poorly graded sand / silty sand",
    distribution: "Rajasthan (Thar Desert), western Gujarat, parts of Punjab — ~4.4% of India",
    states: ["Rajasthan", "Gujarat (west)", "Punjab (parts)"],
    sand: 78, silt: 14, clay: 8,
    permClass: "Very High",
    horizons: [
      { label: "A (0–10 cm)", cls: "hz-a", color: "#D4A855", desc: "Light sandy; loose aeolian deposit; low organic content" },
      { label: "B (10–40 cm)", cls: "hz-b", color: "#C49845", desc: "Sandy with CaCO3 accumulation; calcretes/hardpan possible" },
      { label: "Bk (40–90 cm)", cls: "hz-b", color: "#B48835", desc: "Calcium carbonate horizon (kankar); limits root penetration" },
      { label: "C (90+ cm)", cls: "hz-c", color: "#A07830", desc: "Sandy parent material; windblown in origin" }
    ],
    geoProps: [
      { prop: "Cohesion (c)", sym: "c", val: "0–5 kPa" },
      { prop: "Friction Angle", sym: "φ", val: "30–40°" },
      { prop: "Unit Weight", sym: "γ", val: "14–17 kN/m³" },
      { prop: "Relative Density", sym: "Dr", val: "30–60%" },
      { prop: "Permeability", sym: "k", val: "10⁻³–10⁻⁵ m/s" },
      { prop: "Collapse Potential", sym: "Ic", val: "Moderate–High" },
      { prop: "CBR (dry)", sym: "CBR", val: "8–20%" },
      { prop: "Liquefaction Risk", sym: "LR", val: "Moderate (water table)"}
    ],
    implications: "Arid soils present <strong>low landslide risk</strong> due to gentle terrain and high drainage, but pose <strong>collapse and settlement risks</strong> on wetting. Wind erosion is a major process. Foundations must account for collapsible soil behavior. Road embankments need compaction specifications for loose sand. Flash flood channels in Aravalli foothills can cause rapid erosion events."
  },
  mountain: {
    name: "Mountain / Forest Soils",
    usda: "Inceptisols / Entisols",
    uscs: "GC / SC / SM",
    uscsDesc: "Gravelly clay / silty sand; immature profile",
    distribution: "Himalayas, Northeastern Hills, Western & Eastern Ghats upper zones — ~8% of India",
    states: ["Himachal Pradesh", "Uttarakhand", "J&K", "Sikkim", "Arunachal Pradesh", "Manipur", "Nagaland", "Meghalaya"],
    sand: 38, silt: 32, clay: 30,
    permClass: "Moderate (varies with bedrock)",
    horizons: [
      { label: "O (0–5 cm)", cls: "hz-o", color: "#4A3020", desc: "Organic litter; leaf mould; forest humus; high porosity" },
      { label: "A (5–25 cm)", cls: "hz-a", color: "#5A4030", desc: "Dark brown; high humus; cobbly; root-reinforced; thin under conifers" },
      { label: "B (25–70 cm)", cls: "hz-b", color: "#7A6040", desc: "Brown; fragmented rock in matrix; angular gravels; variable texture" },
      { label: "C (70–120 cm)", cls: "hz-c", color: "#9A8060", desc: "Weathered colluvium / bedrock fragments; shallow to bedrock typical" },
      { label: "R (120+ cm)", cls: "hz-r", color: "#6A6A6A", desc: "Fractured/intact bedrock; phyllite/schist/gneiss/granite" }
    ],
    geoProps: [
      { prop: "Cohesion (c)", sym: "c", val: "5–25 kPa" },
      { prop: "Friction Angle", sym: "φ", val: "28–40°" },
      { prop: "Unit Weight", sym: "γ", val: "15–19 kN/m³" },
      { prop: "Depth to Bedrock", sym: "z", val: "0.5–3 m (typically)" },
      { prop: "Saturated Permeability", sym: "ks", val: "10⁻⁴–10⁻⁶ m/s" },
      { prop: "Root Cohesion (cr)", sym: "cr", val: "2–15 kPa" },
      { prop: "Rock Mass Rating", sym: "RMR", val: "20–60" },
      { prop: "FS (critical)", sym: "FS", val: "1.0–1.3 (marginal)" }
    ],
    implications: "Mountain soils in the Himalayas and NE hills are <strong>India's highest-risk terrain for landslides</strong>. Thin soil mantles (often &lt;2 m) over fractured bedrock become fully saturated quickly during monsoon — Factor of Safety can drop below 1.0 in minutes. Root cohesion from forest is critical (cr ~5–12 kPa). <strong>Any deforestation or road cutting immediately elevates failure risk</strong>. Slope angles >35° with thin soil should be treated as landslide-critical zones."
  },
  saline: {
    name: "Saline & Alkaline Soils",
    usda: "Aridisols (Solonetz/Solonchak)",
    uscs: "CL / CH",
    uscsDesc: "Low-high plasticity clay; dispersive",
    distribution: "Waterlogged areas of Indo-Gangetic plains, Rann of Kutch, coastal belts — ~6.7 M ha",
    states: ["Rajasthan", "Uttar Pradesh", "Haryana", "Gujarat", "Punjab", "Bihar"],
    sand: 25, silt: 35, clay: 40,
    permClass: "Very Low (dispersive)",
    horizons: [
      { label: "A (0–15 cm)", cls: "hz-a", color: "#C0C080", desc: "White salt crust (solonchak); high Na+; crusted surface" },
      { label: "B (15–50 cm)", cls: "hz-b", color: "#A0A060", desc: "Columnar/prismatic structure (Solonetz); high Na:Ca ratio" },
      { label: "C (50–120 cm)", cls: "hz-c", color: "#909050", desc: "Gypsum / calcite accumulation; transition to parent material" },
      { label: "D (120+ cm)", cls: "hz-c", color: "#A0A070", desc: "Saline groundwater zone; waterlogged in many areas" }
    ],
    geoProps: [
      { prop: "Cohesion (c)", sym: "c", val: "10–30 kPa" },
      { prop: "Friction Angle", sym: "φ", val: "15–25°" },
      { prop: "Unit Weight", sym: "γ", val: "16–19 kN/m³" },
      { prop: "Electrical Conductivity", sym: "EC", val: ">4 dS/m (saline)" },
      { prop: "ESP (Sodicity)", sym: "ESP", val: ">15 (alkaline)" },
      { prop: "Dispersivity", sym: "D", val: "High" },
      { prop: "Bearing Capacity", sym: "qu", val: "50–150 kPa" },
      { prop: "Settlement Risk", sym: "S", val: "Moderate–High" }
    ],
    implications: "Saline/alkaline soils are generally on flat terrain with <strong>low landslide risk</strong>, but pose severe <strong>foundation engineering challenges</strong>. High sodium causes clay dispersion — piping erosion in embankments is common. Corrosion of steel and concrete foundations is a critical concern (aggressive soil). Treat with lime stabilisation before construction."
  },
  peaty: {
    name: "Peaty & Marshy Soils",
    usda: "Histosols / Aquepts",
    uscs: "Pt / OH",
    uscsDesc: "Peat / Organic high-plasticity silt",
    distribution: "Coastal deltas (Sunderbans), Kerala backwaters, humid Northeast — ~0.5 M ha",
    states: ["West Bengal", "Kerala", "Odisha (coastal)", "Assam", "Manipur"],
    sand: 10, silt: 30, clay: 60,
    permClass: "Variable (fibrous peat = high; amorphous = low)",
    horizons: [
      { label: "O/H (0–30 cm)", cls: "hz-o", color: "#3A2A15", desc: "Black peat / organic muck; fibrous or amorphous; very compressible" },
      { label: "A (30–60 cm)", cls: "hz-a", color: "#4A3520", desc: "Organic-mineral mix; dark; anaerobic; high water retention" },
      { label: "Cg (60–150 cm)", cls: "hz-c", color: "#506840", desc: "Gleyed; reduced blue-grey; permanently saturated" },
      { label: "R/D (150+ cm)", cls: "hz-c", color: "#607050", desc: "Marine clay / deltaic sediment / bedrock depending on setting" }
    ],
    geoProps: [
      { prop: "Cohesion (c)", sym: "c", val: "0–10 kPa (very low)" },
      { prop: "Friction Angle", sym: "φ", val: "10–20°" },
      { prop: "Unit Weight", sym: "γ", val: "10–14 kN/m³" },
      { prop: "Natural Moisture", sym: "w", val: "100–600%" },
      { prop: "Compression Index", sym: "Cc", val: "0.5–3.0 (very high)" },
      { prop: "Undrained Shear", sym: "Su", val: "5–25 kPa" },
      { prop: "Organic Content", sym: "OC", val: "20–80%" },
      { prop: "Settlement (total)", sym: "S", val: "Very High (0.5–3 m)" }
    ],
    implications: "Peaty/marshy soils present the <strong>most severe foundation engineering challenge in India</strong>. Extremely high compressibility, low bearing capacity, and high secondary consolidation mean heavy structures <strong>must use deep pile foundations</strong> going through peat to competent strata. Slope stability on peat is marginal — embankments on peat have failed catastrophically. Land reclamation requires staged loading with surcharge preloading or vacuum consolidation."
  }
};

/* State → Soil Type mapping */
const STATE_SOIL_MAP = {};
Object.entries(STATES_DB).forEach(([state, data]) => {
  STATE_SOIL_MAP[state] = data.soilType;
});

/* ----------------------------------------------------------------
   3. HISTORICAL LANDSLIDE DATA
   ---------------------------------------------------------------- */
const HIST_DATA = [
  { region: "Uttarakhand Himalayas", zone: "Very High", trigger: "Cloudburst + Glacial", slope: "45–70°", risk: "Very High", color: "#b91c1c" },
  { region: "Darjeeling–Sikkim", zone: "Very High", trigger: "Intense Monsoon", slope: "40–65°", risk: "Very High", color: "#b91c1c" },
  { region: "Himachal Pradesh", zone: "Very High", trigger: "Cloudburst + Seismic", slope: "35–70°", risk: "Very High", color: "#b91c1c" },
  { region: "Northeast India (Assam Hills)", zone: "High", trigger: "Prolonged Monsoon", slope: "20–50°", risk: "High", color: "#c2410c" },
  { region: "Western Ghats – Kerala", zone: "High", trigger: "Extreme Monsoon (2018)", slope: "20–40°", risk: "High", color: "#c2410c" },
  { region: "Nilgiris – Tamil Nadu", zone: "Moderate–High", trigger: "NE Monsoon", slope: "15–35°", risk: "Moderate", color: "#b45309" },
  { region: "Aravalli – Rajasthan", zone: "Low", trigger: "Flash floods", slope: "5–20°", risk: "Low", color: "#166534" },
  { region: "Deccan Plateau – Maharashtra", zone: "Low–Moderate", trigger: "Monsoon + Basalt", slope: "5–25°", risk: "Low", color: "#166534" },
];

/* ----------------------------------------------------------------
   4. INFRASTRUCTURE TEMPLATES by Risk Level
   ---------------------------------------------------------------- */
function getInfraGuidance(score, soilType, slope) {
  const s = SOIL_DB[soilType] || SOIL_DB.mountain;
  const zone = getSusceptZone(score);

  const guides = [
    {
      title: "🏛️ Foundation Type",
      icon: "🏛️",
      prio: score >= 70 ? "critical" : score >= 45 ? "high" : "medium",
      items: score >= 70 ? [
        "Deep pile foundation (bored/driven) through unstable soil to rock",
        "Minimum pile depth: 15–25 m or to bedrock, whichever is shallower",
        "Under-reamed piles for expansive soils (black soils)",
        "Avoid strip/pad foundations on slopes >30° with thin soil",
        "Rock anchor systems for structures near cliff faces",
        "Caisson or well foundations near river banks"
      ] : score >= 45 ? [
        "Raft foundation recommended for uniform load distribution",
        "Combined raft-pile system for heavy structures",
        "Isolated pad footings only on competent laterite/rock >2 m deep",
        "Consider stepped foundations on sloped terrain",
        "Minimum founding depth 2.5–3 m below natural surface"
      ] : [
        "Strip/pad foundations suitable on dense alluvium or rock",
        "Raft foundation for soft soils or variable ground",
        "Minimum founding depth 1.5 m; account for seasonal water table",
        "Standard NBC foundation requirements apply",
        "Confirm with site-specific soil investigation"
      ]
    },
    {
      title: "⛰️ Slope Stabilisation",
      icon: "⛰️",
      prio: score >= 70 ? "critical" : score >= 45 ? "high" : "medium",
      items: score >= 70 ? [
        "Rock bolting and anchoring on fractured rock faces",
        "Wire mesh + shotcrete on loose scree/debris slopes",
        "Soil nailing (SN-15–25 m length) for cut slopes >6 m",
        "Gabion retaining walls at slope toe (minimum 3 m height)",
        "Geo-textile reinforced earth retaining systems",
        "Counterfort/cantilever RC retaining walls for critical sections",
        "Install inclinometers and piezometers for real-time monitoring"
      ] : score >= 45 ? [
        "Dry stone masonry retaining walls (1.5–3 m height)",
        "Rubble pitching on slopes >25°",
        "Surface drainage with properly designed catch drains",
        "Benching / stepping of cut slopes (1:1 riser:tread ratio)",
        "Geo-grid reinforcement for embankment slopes",
        "Planting deep-rooted vegetation on exposed slopes"
      ] : [
        "Nominal slope protection with stone pitching",
        "Contour drainage channels to intercept runoff",
        "Vegetation cover maintenance on embankment slopes",
        "Standard road side drains per IRC:SP:48",
        "Periodic inspection of natural slopes"
      ]
    },
    {
      title: "🚗 Road & Highway Infrastructure",
      icon: "🚗",
      prio: score >= 70 ? "critical" : score >= 45 ? "high" : "low",
      items: score >= 70 ? [
        "Alignment to avoid steep slopes >35° — use tunnels where necessary",
        "Retaining structures mandatory for all cut-slopes >4 m",
        "Design drainage for 100-year return period rainfall",
        "Install debris-flow catchment barriers at toe of slopes",
        "Real-time slope monitoring with automated alerts along highway",
        "Landslide-resilient bridges with deep pile abutments",
        "Emergency bypass routes planned for critical sections"
      ] : score >= 45 ? [
        "Cut slopes limited to 1:1 in weathered rock, 1:1.5 in soil",
        "Slope reinforcement for cuts >5 m height per IRC:SP:48",
        "Cross-drainage works (culverts) at every natural drainage line",
        "Side drains with proper outfalls every 50 m",
        "Traffic restriction during heavy rainfall periods",
        "Periodic slope condition surveys twice yearly"
      ] : [
        "Standard hill-road construction per IRC:SP:48 guidelines",
        "Regular maintenance of roadside drains",
        "Vegetation on embankment slopes",
        "Standard cross-drainage design per traffic load"
      ]
    },
    {
      title: "🏘️ Building & Urban Planning",
      icon: "🏘️",
      prio: score >= 70 ? "critical" : score >= 45 ? "high" : "medium",
      items: score >= 70 ? [
        `Mandatory setback: ${Math.round(slope * 1.5)} m from slope crest; ${Math.round(slope)} m from slope toe`,
        "No construction permitted on slopes >35° (NDMA guidelines)",
        "Structural design for seismic Zone V requirements (IS 1893)",
        "All buildings require site-specific geotechnical investigation",
        "Restrict building density to max 2 floors in high-risk zones",
        "Mandatory Early Warning System (EWS) for settlements",
        "Regular building safety audits every 3 years",
        "Disaster-resilient construction with RC frame + shear walls"
      ] : score >= 45 ? [
        `Setback: ${Math.round(slope * 1.0)} m from slope edge`,
        "Limit building height to G+4 without detailed slope study",
        "Site investigation mandatory for plots >500 m² or >3 floors",
        "Design for applicable seismic zone per IS 1893",
        "Drainage infrastructure mandatory before plot development",
        "Retain existing trees wherever possible for slope protection"
      ] : [
        "Standard NBC 2016 zoning regulations apply",
        "Routine geotechnical investigation for large buildings",
        "Maintain natural drainage patterns during construction",
        "Standard seismic design as per zone classification"
      ]
    },
    {
      title: "💧 Drainage & Water Management",
      icon: "💧",
      prio: score >= 70 ? "critical" : score >= 45 ? "high" : "medium",
      items: score >= 70 ? [
        "Deep sub-surface horizontal drains (every 20 m on slope)",
        "Trenchless drainage galleries to lower water table on slopes",
        "Surface concrete lined drain channels (V-notch minimum 0.3 m)",
        "French drains with geofabric filter around foundation",
        "Piezometer monitoring network for pore pressure control",
        "Prohibit septic tanks/ponds near slope crests",
        "Divert all stormwater away from slope failure zones"
      ] : score >= 45 ? [
        "Install catch water drains above cut-slope top",
        "Slope toe drains to capture seepage",
        "Vegetated filter strips along drainage channels",
        "Check dams in gullies to reduce flow velocity",
        "Design for 50-year storm return period drainage"
      ] : [
        "Standard storm-water drainage design",
        "Maintain natural drainage channels",
        "Regular clearing of culverts and drains",
        "Roof-water recharge pits in flood-prone areas"
      ]
    },
    {
      title: "📡 Early Warning & Monitoring",
      icon: "📡",
      prio: score >= 70 ? "critical" : score >= 45 ? "high" : "low",
      items: score >= 70 ? [
        "Real-time rainfall monitoring (tipping bucket rain gauges)",
        "Automatic piezometers for pore pressure thresholds",
        "Extensometers / crack gauges on visible slope cracks",
        "Inclinometers at 30 m spacing on monitored slopes",
        "GSM-connected automated alert system to local authority",
        "NDMA-approved community-level landslide EWS protocol",
        "Satellite-based InSAR monitoring for large-scale movements",
        "Trained community disaster response teams in villages"
      ] : score >= 45 ? [
        "Community rain-gauge network with threshold alerts",
        "Crack monitoring on buildings near slopes",
        "Periodic slope inspection after each monsoon season",
        "Maintain GSI/NDMA landslide hazard zone maps",
        "Community awareness and evacuation drills"
      ] : [
        "Standard NDMA disaster preparedness plans",
        "Seasonal inspection of natural slopes",
        "Community-level flood/landslide awareness"
      ]
    }
  ];

  return guides;
}

/* Mitigation table data */
const MITIGATION_DATA = [
  { measure: "Rock Bolting & Anchoring", when: "Rock slope >45°; fractured bedrock", prio: "Critical", cost: "₹2,000–8,000 /m²", eff: "★★★★★" },
  { measure: "Soil Nailing", when: "Cut slopes >6 m in soil/weathered rock", prio: "Critical", cost: "₹1,500–5,000 /m²", eff: "★★★★★" },
  { measure: "Retaining Walls (RC)", when: "Slope toe or cut >4 m height", prio: "High", cost: "₹8,000–25,000 /m²", eff: "★★★★☆" },
  { measure: "Gabion Structures", when: "River bank erosion; slope toe", prio: "High", cost: "₹3,000–8,000 /m³", eff: "★★★★☆" },
  { measure: "Geo-textile Reinforcement", when: "Embankment slopes; fill slopes", prio: "Medium", cost: "₹200–800 /m²", eff: "★★★☆☆" },
  { measure: "Wire Mesh & Shotcrete", when: "Loose scree; rockfall protection", prio: "High", cost: "₹1,200–4,000 /m²", eff: "★★★★☆" },
  { measure: "Sub-surface Drainage", when: "High TWI; water-table near surface", prio: "Critical", cost: "₹500–2,000 /m", eff: "★★★★★" },
  { measure: "Bio-engineering (Vetiver)", when: "Exposed soil slopes <35°", prio: "Medium", cost: "₹50–200 /m²", eff: "★★★☆☆" },
  { measure: "Check Dams in Gullies", when: "Active gully erosion in drainage", prio: "Medium", cost: "₹50,000–5 L/dam", eff: "★★★☆☆" },
  { measure: "Slope Re-profiling", when: "Over-steepened cut/fill slopes", prio: "High", cost: "₹500–2,500 /m³", eff: "★★★★☆" },
  { measure: "Debris Flow Barriers", when: "Channelised debris flow paths", prio: "Critical", cost: "₹10–50 L/structure", eff: "★★★★★" },
  { measure: "Reforestation", when: "Deforested slopes; scarp areas", prio: "Low", cost: "₹20–80/plant", eff: "★★★☆☆ (long-term)" },
];

/* ----------------------------------------------------------------
   5. INDIA SVG MAP DATA (simplified state polygons as path data)
      Coordinate system: ViewBox "80 40 520 580"
   ---------------------------------------------------------------- */
const INDIA_STATES_SVG = [
  // J&K
  { id: "jk", name: "Jammu & Kashmir", d: "M155,60 L210,55 L230,80 L215,100 L185,110 L160,95 Z", risk: "risk-h" },
  // Himachal Pradesh
  { id: "hp", name: "Himachal Pradesh", d: "M185,110 L215,100 L225,120 L210,145 L190,140 L175,130 Z", risk: "risk-vh" },
  // Punjab
  { id: "pb", name: "Punjab", d: "M155,115 L185,110 L175,130 L160,145 L145,135 Z", risk: "risk-vl" },
  // Haryana
  { id: "hr", name: "Haryana", d: "M160,145 L175,130 L190,140 L185,165 L168,170 L153,160 Z", risk: "risk-vl" },
  // Uttarakhand
  { id: "uk", name: "Uttarakhand", d: "M210,145 L225,120 L250,130 L248,155 L225,160 L210,155 Z", risk: "risk-vh" },
  // Delhi
  { id: "dl", name: "Delhi", d: "M168,165 L178,160 L180,170 L170,173 Z", risk: "risk-vl" },
  // Uttar Pradesh
  { id: "up", name: "Uttar Pradesh", d: "M180,170 L210,155 L248,155 L260,175 L255,200 L235,215 L200,220 L180,210 L168,195 Z", risk: "risk-vl" },
  // Rajasthan
  { id: "rj", name: "Rajasthan", d: "M115,145 L153,140 L168,165 L168,195 L155,220 L135,240 L110,230 L98,200 L100,170 Z", risk: "risk-vl" },
  // Bihar
  { id: "br", name: "Bihar", d: "M260,175 L300,168 L308,190 L295,210 L265,215 L255,200 Z", risk: "risk-vl" },
  // Sikkim
  { id: "sk", name: "Sikkim", d: "M310,155 L322,150 L328,162 L316,168 Z", risk: "risk-vh" },
  // West Bengal
  { id: "wb", name: "West Bengal", d: "M308,190 L330,172 L340,192 L338,225 L320,245 L305,240 L295,215 Z", risk: "risk-h" },
  // Arunachal Pradesh
  { id: "ar", name: "Arunachal Pradesh", d: "M328,130 L390,122 L395,148 L360,158 L330,155 Z", risk: "risk-vh" },
  // Assam
  { id: "as", name: "Assam", d: "M330,155 L360,158 L368,172 L350,185 L328,188 L316,178 Z", risk: "risk-h" },
  // Nagaland
  { id: "nl", name: "Nagaland", d: "M368,172 L382,168 L385,185 L370,190 L355,187 Z", risk: "risk-h" },
  // Manipur
  { id: "mn", name: "Manipur", d: "M368,190 L382,188 L386,205 L372,213 L358,208 Z", risk: "risk-vh" },
  // Mizoram
  { id: "mz", name: "Mizoram", d: "M358,210 L372,213 L370,232 L355,234 L348,218 Z", risk: "risk-vh" },
  // Tripura
  { id: "tr", name: "Tripura", d: "M338,218 L352,215 L350,232 L338,235 Z", risk: "risk-h" },
  // Meghalaya
  { id: "ml", name: "Meghalaya", d: "M328,188 L350,185 L352,200 L335,207 L320,202 Z", risk: "risk-vh" },
  // Jharkhand
  { id: "jh", name: "Jharkhand", d: "M265,215 L295,210 L305,230 L295,250 L268,248 L255,235 Z", risk: "risk-l" },
  // Odisha
  { id: "od", name: "Odisha", d: "M295,250 L320,245 L328,270 L315,295 L290,290 L275,268 Z", risk: "risk-m" },
  // Madhya Pradesh
  { id: "mp", name: "Madhya Pradesh", d: "M155,220 L200,220 L235,215 L255,235 L268,248 L260,275 L230,290 L195,285 L165,270 L148,248 Z", risk: "risk-vl" },
  // Chhattisgarh
  { id: "cg", name: "Chhattisgarh", d: "M268,248 L295,250 L290,290 L275,310 L255,305 L248,278 Z", risk: "risk-l" },
  // Gujarat
  { id: "gj", name: "Gujarat", d: "M98,200 L110,230 L118,258 L130,280 L118,300 L95,295 L75,272 L78,240 L88,218 Z", risk: "risk-vl" },
  // Maharashtra
  { id: "mh", name: "Maharashtra", d: "M148,248 L165,270 L195,285 L230,290 L248,278 L255,305 L240,325 L220,340 L192,340 L165,320 L140,305 L125,280 L118,258 Z", risk: "risk-m" },
  // Goa
  { id: "ga", name: "Goa", d: "M155,340 L168,338 L168,350 L155,352 Z", risk: "risk-m" },
  // Karnataka
  { id: "ka", name: "Karnataka", d: "M140,305 L165,320 L192,340 L200,365 L192,390 L175,405 L152,402 L135,380 L128,350 L130,320 Z", risk: "risk-m" },
  // Andhra Pradesh
  { id: "ap", name: "Andhra Pradesh", d: "M240,325 L275,310 L295,325 L298,355 L280,380 L255,390 L230,378 L210,360 L200,340 L220,340 Z", risk: "risk-l" },
  // Telangana
  { id: "tg", name: "Telangana", d: "M220,290 L248,280 L255,305 L240,325 L220,340 L200,330 L200,310 Z", risk: "risk-l" },
  // Kerala
  { id: "kl", name: "Kerala", d: "M152,402 L175,405 L178,435 L165,460 L148,455 L142,425 Z", risk: "risk-h" },
  // Tamil Nadu
  { id: "tn", name: "Tamil Nadu", d: "M192,390 L230,378 L242,405 L235,440 L215,460 L192,468 L172,455 L165,430 L175,405 Z", risk: "risk-l" },
];

/* ----------------------------------------------------------------
   6. MODULE SWITCHING
   ---------------------------------------------------------------- */
function switchTab(tabId) {
  document.querySelectorAll('.module-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + tabId).classList.add('active');
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

  if (tabId === 'terrain') { setTimeout(updateTerrain, 100); }
  if (tabId === 'soil')    { setTimeout(loadSoilProfile, 100); }
  if (tabId === 'susceptibility') { setTimeout(updateSusceptibility, 100); }
  if (tabId === 'infra')   { setTimeout(renderInfraGuidance, 100); }
}

/* ----------------------------------------------------------------
   7. INDIA MAP — Draw SVG states
   ---------------------------------------------------------------- */
function buildIndiaMap() {
  const svg = document.getElementById('indiaMap');
  const tooltip = document.getElementById('mapTooltip');
  const container = document.getElementById('mapContainer');

  // Background gradient
  svg.innerHTML = `
    <defs>
      <radialGradient id="mapBg" cx="50%" cy="50%">
        <stop offset="0%" stop-color="#0d1a36"/>
        <stop offset="100%" stop-color="#060b14"/>
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#mapBg)"/>
  `;

  INDIA_STATES_SVG.forEach(state => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', state.d);
    path.setAttribute('class', `state-path ${state.risk}`);
    path.setAttribute('data-name', state.name);

    // Hover
    path.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const db = STATES_DB[state.name] || {};
      tooltip.style.display = 'block';
      tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
      tooltip.style.top  = (e.clientY - rect.top - 60) + 'px';
      tooltip.innerHTML = `
        <div class="tt-name">${state.name}</div>
        <div class="tt-row"><span>Risk</span><span class="tt-val">${db.riskLevel || '—'}</span></div>
        <div class="tt-row"><span>Soil</span><span class="tt-val">${db.soilType ? SOIL_DB[db.soilType]?.name.split(' ')[0] : '—'}</span></div>
        <div class="tt-row"><span>Score</span><span class="tt-val">${db.susceptScore || '—'}/100</span></div>
      `;
    });

    path.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });

    path.addEventListener('click', () => {
      document.querySelectorAll('.state-path').forEach(p => p.classList.remove('selected'));
      path.classList.add('selected');
      showStateInfo(state.name);
    });

    svg.appendChild(path);

    // State label
    const bbox = getPathCenter(state.d);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', bbox.x);
    text.setAttribute('y', bbox.y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'rgba(255,255,255,0.6)');
    text.setAttribute('font-size', '5');
    text.setAttribute('font-family', 'Segoe UI, sans-serif');
    text.setAttribute('pointer-events', 'none');
    text.textContent = state.id.toUpperCase();
    svg.appendChild(text);
  });
}

function getPathCenter(d) {
  const nums = d.match(/[\d.]+/g).map(Number);
  let xs = [], ys = [];
  for (let i = 0; i < nums.length - 1; i += 2) { xs.push(nums[i]); ys.push(nums[i + 1]); }
  return {
    x: xs.reduce((a, b) => a + b, 0) / xs.length,
    y: ys.reduce((a, b) => a + b, 0) / ys.length
  };
}

function showStateInfo(stateName) {
  const data = STATES_DB[stateName];
  if (!data) return;

  const soilData = SOIL_DB[data.soilType] || {};
  const riskColors = {
    "Very High": { bg: "rgba(185,28,28,0.2)", color: "#ef4444", border: "#b91c1c" },
    "High":      { bg: "rgba(194,65,12,0.2)", color: "#f97316", border: "#c2410c" },
    "Moderate":  { bg: "rgba(180,83,9,0.2)",  color: "#f59e0b", border: "#b45309" },
    "Low":       { bg: "rgba(22,101,52,0.2)", color: "#22c55e", border: "#166534" },
    "Very Low":  { bg: "rgba(3,105,161,0.2)", color: "#38bdf8", border: "#0369a1" },
  };
  const rc = riskColors[data.riskLevel] || riskColors["Low"];

  document.getElementById('stateName').textContent = stateName;
  document.getElementById('stateRegion').textContent = data.region;

  const triggers = data.majorTriggers.map(t => `<span class="tag">${t}</span>`).join('');

  document.getElementById('stateInfoBody').innerHTML = `
    <div class="risk-badge-large" style="background:${rc.bg};color:${rc.color};border-color:${rc.border};">
      ⚠️ ${data.riskLevel} Risk Zone
    </div>
    <div class="info-row"><span class="info-label">Soil Type</span><span class="info-value">${soilData.name || '—'}</span></div>
    <div class="info-row"><span class="info-label">Slope Range</span><span class="info-value">${data.slopeRange}</span></div>
    <div class="info-row"><span class="info-label">Elevation</span><span class="info-value">${data.elevation}</span></div>
    <div class="info-row"><span class="info-label">Annual Rainfall</span><span class="info-value">${data.rainfall}</span></div>
    <div class="info-row"><span class="info-label">Lithology</span><span class="info-value">${data.lithology}</span></div>
    <div class="info-row"><span class="info-label">Seismic Zone</span><span class="info-value">Zone ${data.seismicZone}</span></div>
    <div class="info-row"><span class="info-label">Population</span><span class="info-value">${data.population}</span></div>
    <div class="info-row"><span class="info-label">USDA Soil Order</span><span class="info-value">${soilData.usda || '—'}</span></div>
    <div class="info-row"><span class="info-label">Susceptibility Score</span><span class="info-value" style="color:${rc.color}">${data.susceptScore}/100</span></div>
    <div class="divider"></div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">MAJOR TRIGGERS</div>
    <div class="tags">${triggers}</div>
    <div class="divider"></div>
    <div style="display:flex;gap:8px;margin-top:4px;">
      <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="loadRegionToTerrain('${stateName}')">📐 Open in Terrain</button>
      <button class="btn btn-primary btn-sm" style="flex:1;" onclick="loadRegionFull('${stateName}')">📊 Full Analysis</button>
    </div>
  `;
}

function loadRegionToTerrain(stateName) {
  const data = STATES_DB[stateName];
  if (!data) return;
  // Set approximate slope mid-range
  const slopeMatch = data.slopeRange.match(/(\d+)/);
  const slopeMid = slopeMatch ? (parseInt(slopeMatch[1]) + 10) : 30;
  document.getElementById('sSlope').value = Math.min(80, slopeMid);
  // Set soil params from DB
  const soil = SOIL_DB[data.soilType];
  if (soil) {
    const c = parseInt(soil.geoProps.find(p => p.sym === 'c')?.val) || 10;
    const phi = parseInt(soil.geoProps.find(p => p.sym === 'φ')?.val) || 28;
    const gamma = parseInt(soil.geoProps.find(p => p.sym === 'γ')?.val) || 18;
    document.getElementById('sCohesion').value = Math.min(80, c);
    document.getElementById('sFriction').value = Math.min(45, phi);
    document.getElementById('sGamma').value = Math.min(25, gamma);
  }
  switchTab('terrain');
}

function loadRegionFull(stateName) {
  const data = STATES_DB[stateName];
  if (!data) return;
  // Load soil
  document.getElementById('soilTypeSelect').value = data.soilType;
  // Load susceptibility
  const slopeMatch = data.slopeRange.match(/(\d+)/);
  const slopeMid = slopeMatch ? parseInt(slopeMatch[1]) + 10 : 25;
  document.getElementById('ss-slope').value = Math.min(80, slopeMid);
  document.getElementById('ss-rain').value = parseInt(data.rainfall) || 1500;
  document.getElementById('ss-soil').value = data.soilType;
  const seismicNum = data.seismicZone.replace('V','5').replace('IV','4').replace('III','3').replace('II','2');
  document.getElementById('ss-seismic').value = isNaN(seismicNum) ? 3 : Math.min(5, parseInt(seismicNum));
  switchTab('susceptibility');
}

/* ----------------------------------------------------------------
   8. TERRAIN DERIVATIVES — Live Computation
   ---------------------------------------------------------------- */
function updateTerrain() {
  const beta   = parseFloat(document.getElementById('sSlope').value);
  const z      = parseFloat(document.getElementById('sDepth').value);
  const c      = parseFloat(document.getElementById('sCohesion').value);
  const phi    = parseFloat(document.getElementById('sFriction').value);
  const gamma  = parseFloat(document.getElementById('sGamma').value);
  const hw     = parseFloat(document.getElementById('sWater').value);
  const A      = parseFloat(document.getElementById('sArea').value);
  const aspect = document.getElementById('sAspect').value;
  const curv   = document.getElementById('sCurvature').value;

  // Update labels
  document.getElementById('vSlope').textContent   = beta + '°';
  document.getElementById('vDepth').textContent   = z.toFixed(1) + ' m';
  document.getElementById('vCohesion').textContent = c + ' kPa';
  document.getElementById('vFriction').textContent = phi + '°';
  document.getElementById('vGamma').textContent    = gamma + ' kN/m³';
  document.getElementById('vWater').textContent    = hw.toFixed(1) + ' m';
  document.getElementById('vArea').textContent     = A + ' m²';

  const betaRad = beta * Math.PI / 180;
  const phiRad  = phi  * Math.PI / 180;
  const gammaW  = 9.81; // kN/m³

  // --- Factor of Safety (infinite slope, with water table) ---
  const numerator   = c + (gamma * z * Math.cos(betaRad) ** 2 * Math.tan(phiRad))
                      - (gammaW * hw * Math.cos(betaRad) ** 2);
  const denominator = gamma * z * Math.sin(betaRad) * Math.cos(betaRad);
  const FS = denominator > 0 ? Math.max(0, numerator / denominator) : 99;

  // --- TWI ---
  const TWI = beta > 0 ? Math.log(A / Math.tan(betaRad)) : 0;

  // --- Pore Water Pressure ---
  const u = gammaW * hw * Math.cos(betaRad) ** 2;

  // --- Shear Stress ---
  const tau = gamma * z * Math.sin(betaRad) * Math.cos(betaRad);

  // --- Critical slope angle ---
  const critAngle = Math.atan(Math.tan(phiRad) + c / (gamma * z)) * 180 / Math.PI;

  // Update metrics
  const fsEl = document.getElementById('mv-fs');
  const fsMc = document.getElementById('mc-fs');
  const fsStatus = document.getElementById('ms-fs');
  fsEl.textContent = FS > 9.99 ? '>9.9' : FS.toFixed(2);

  if (FS >= 1.5) {
    fsMc.className = 'metric-card hl-green'; fsStatus.textContent = '✓ STABLE'; fsStatus.className = 'metric-status status-safe';
    document.getElementById('fsInterpretBox').className = 'info-box good';
    document.getElementById('fsInterpretBox').innerHTML = `<span class="info-box-icon">✅</span><div class="info-box-text"><strong>Stable Slope</strong> — FS = ${FS.toFixed(2)} ≥ 1.5. Gravitational forces well below resisting capacity. Low immediate failure risk.</div>`;
  } else if (FS >= 1.0) {
    fsMc.className = 'metric-card hl-amber'; fsStatus.textContent = '⚠ MARGINALLY STABLE'; fsStatus.className = 'metric-status status-warn';
    document.getElementById('fsInterpretBox').className = 'info-box warn';
    document.getElementById('fsInterpretBox').innerHTML = `<span class="info-box-icon">⚠️</span><div class="info-box-text"><strong>Marginally Stable</strong> — FS = ${FS.toFixed(2)} (1.0–1.5). Slope is stable under current conditions but additional rainfall or seismic loading may trigger failure.</div>`;
  } else {
    fsMc.className = 'metric-card hl-red'; fsStatus.textContent = '✗ FAILURE ZONE'; fsStatus.className = 'metric-status status-danger';
    document.getElementById('fsInterpretBox').className = 'info-box danger';
    document.getElementById('fsInterpretBox').innerHTML = `<span class="info-box-icon">🚨</span><div class="info-box-text"><strong>Active Failure Risk</strong> — FS = ${FS.toFixed(2)} < 1.0! Driving forces exceed resisting forces. Immediate slope stabilisation required.</div>`;
  }

  document.getElementById('mv-twi').textContent   = TWI > 0 ? TWI.toFixed(2) : 'N/A';
  document.getElementById('mv-slope').textContent  = beta;
  document.getElementById('ms-slope').textContent  = beta < 10 ? 'Gentle' : beta < 25 ? 'Moderate' : beta < 40 ? 'Steep' : 'Very Steep';
  document.getElementById('mv-aspect').textContent  = aspect;
  document.getElementById('mv-curv').textContent    = curv.charAt(0).toUpperCase() + curv.slice(1);
  document.getElementById('ms-curv').textContent    = curv === 'concave' ? 'Water converges ↗' : curv === 'convex' ? 'Water diverges ↘' : 'Neutral flow';
  document.getElementById('mv-pore').textContent    = u.toFixed(1);
  document.getElementById('mv-crit').textContent    = critAngle.toFixed(1);
  document.getElementById('mv-shear').textContent   = tau.toFixed(1);

  // Draw canvases
  drawTerrainCanvas(beta, z, hw, phi, FS, curv);
  drawHillshadeCanvas(beta, aspect, curv);
}

function drawTerrainCanvas(beta, z, hw, phi, FS, curv) {
  const canvas = document.getElementById('terrainCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.55);
  sky.addColorStop(0, '#060b14');
  sky.addColorStop(1, '#0d1a36');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H * 0.55);

  const betaRad = beta * Math.PI / 180;
  const baseY = H - 30;
  const slopeW = W * 0.65;
  const slopeH = slopeW * Math.tan(betaRad);
  const clampH = Math.min(slopeH, H * 0.75);

  const x0 = W * 0.05, y0 = baseY;
  const x1 = W * 0.05 + slopeW, y1 = Math.max(20, baseY - clampH);

  // === Soil body gradient ===
  const soil = ctx.createLinearGradient(x0, y0, x1, y1);
  soil.addColorStop(0, '#5a3e20');
  soil.addColorStop(0.3, '#7a5a30');
  soil.addColorStop(1, '#9a7a50');
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x1, H);
  ctx.lineTo(x0, H);
  ctx.closePath();
  ctx.fillStyle = soil;
  ctx.fill();

  // === Water table line ===
  const hwFrac = Math.min(0.95, hw / (z || 1));
  const wtY = y0 - (y0 - y1) * hwFrac;
  const wtX = x0 + (x1 - x0) * hwFrac;
  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x0, wtY);
  ctx.lineTo(wtX, y1 - (y0 - wtY) * 0.5);
  ctx.stroke();
  ctx.restore();

  // Label water table
  ctx.fillStyle = '#38bdf8';
  ctx.font = '10px Segoe UI';
  ctx.fillText('Water Table', x0 + 8, wtY - 4);

  // === Slope surface ===
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.strokeStyle = '#22d97c';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // === Failure plane ===
  const phiRad = phi * Math.PI / 180;
  const failAngle = Math.max(5, beta - phi * 0.4);
  const failRad = failAngle * Math.PI / 180;
  const failLen = slopeW * 0.5;
  const fx = x0 + failLen * Math.cos(failRad);
  const fy = y0 - failLen * Math.sin(failRad);
  ctx.save();
  ctx.setLineDash([8, 4]);
  ctx.strokeStyle = FS < 1 ? '#ef4444' : FS < 1.5 ? '#f59e0b' : '#22d97c';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(fx, fy);
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = FS < 1 ? '#ef4444' : '#f59e0b';
  ctx.font = '10px Segoe UI';
  ctx.fillText('Failure Plane', fx + 4, fy - 4);

  // === Slope angle arc ===
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x0, y0, 38, -betaRad, 0);
  ctx.stroke();
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 11px Segoe UI';
  ctx.fillText(`β=${beta}°`, x0 + 22, y0 - 10);

  // === Curvature indicator ===
  if (curv === 'concave') {
    ctx.strokeStyle = 'rgba(168,85,247,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.quadraticCurveTo((x0 + x1) / 2, y0 + 20, x1, y1);
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + 20, x1, y1);
    ctx.stroke();
  }

  // === FS label ===
  const fsColor = FS >= 1.5 ? '#22d97c' : FS >= 1.0 ? '#f59e0b' : '#ef4444';
  ctx.fillStyle = 'rgba(6,11,20,0.8)';
  ctx.beginPath();
  ctx.roundRect(W - 100, 8, 92, 32, 6);
  ctx.fill();
  ctx.fillStyle = fsColor;
  ctx.font = 'bold 13px Courier New';
  ctx.fillText(`FS = ${FS > 9.99 ? '>9.9' : FS.toFixed(2)}`, W - 96, 29);

  // === Base rock ===
  const rock = ctx.createLinearGradient(0, H - 32, 0, H);
  rock.addColorStop(0, '#2a2a2a');
  rock.addColorStop(1, '#404040');
  ctx.fillStyle = rock;
  ctx.fillRect(0, H - 32, W, 32);

  // === Grid lines ===
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < W; i += 40) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
  }
}

function drawHillshadeCanvas(beta, aspect, curv) {
  const canvas = document.getElementById('hillshadeCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const sunDir = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
  const sunAz = (sunDir[aspect] || 180) * Math.PI / 180;
  const sunAlt = 45 * Math.PI / 180;

  const img = ctx.createImageData(W, H);
  const betaRad = beta * Math.PI / 180;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Simulate small elevation bumps
      const freq = curv === 'concave' ? 0.05 : curv === 'convex' ? 0.08 : 0.06;
      const ex = Math.sin(x * freq) * Math.cos(y * 0.04);
      const ey = Math.sin(y * freq) * Math.cos(x * 0.04);
      const slope = betaRad + ex * 0.3;
      const aspect2 = sunAz + ey * 0.5;
      const hillshade = Math.max(0, Math.cos(sunAlt) * Math.cos(slope) +
        Math.sin(sunAlt) * Math.sin(slope) * Math.cos(sunAz - aspect2));

      const v = Math.round(hillshade * 200);
      const ri = (y * W + x) * 4;
      img.data[ri]     = Math.min(255, v * 0.3 + 20);   // R
      img.data[ri + 1] = Math.min(255, v * 0.6 + 15);   // G
      img.data[ri + 2] = Math.min(255, v * 0.2 + 30);   // B
      img.data[ri + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // Label
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '11px Segoe UI';
  ctx.fillText(`Sun Azimuth: ${aspect} | Slope: ${beta}° | Curvature: ${curv}`, 10, 20);
}

/* ----------------------------------------------------------------
   9. SOIL PROFILE MODULE
   ---------------------------------------------------------------- */
function populateStateDropdown() {
  const sel = document.getElementById('stateForSoil');
  Object.keys(STATES_DB).sort().forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

function loadSoilFromState() {
  const st = document.getElementById('stateForSoil').value;
  if (!st) return;
  const soilType = STATES_DB[st]?.soilType;
  if (soilType) {
    document.getElementById('soilTypeSelect').value = soilType;
    loadSoilProfile();
  }
}

function loadSoilProfile() {
  const type = document.getElementById('soilTypeSelect').value;
  const soil = SOIL_DB[type];
  if (!soil) return;

  // Title & distribution
  document.getElementById('soilCardTitle').textContent = soil.name;
  document.getElementById('soilDistrib').textContent   = soil.distribution;

  // State tags
  const tagsEl = document.getElementById('soilStateTags');
  tagsEl.innerHTML = soil.states.map(s => `<span class="tag">📍 ${s}</span>`).join('');

  // USCS / USDA
  document.getElementById('uscsSymbol').textContent = soil.uscs;
  document.getElementById('uscsDesc').textContent   = soil.uscsDesc;
  document.getElementById('usdaOrder').textContent  = soil.usda;
  document.getElementById('permClass').textContent  = soil.permClass;

  // Horizons
  const horizEl = document.getElementById('soilHorizons');
  horizEl.innerHTML = soil.horizons.map(h => `
    <div class="soil-horizon ${h.cls}" style="border-color:${h.color}">
      <div class="horizon-label" style="color:${h.color}">${h.label}</div>
      <div class="horizon-desc">${h.desc}</div>
    </div>
  `).join('');

  // Geotechnical props
  const tbody = document.getElementById('geoPropsBody');
  tbody.innerHTML = soil.geoProps.map(p => `
    <tr>
      <td>${p.prop}</td>
      <td><code style="color:var(--accent-amber);font-size:12px;">${p.sym}</code></td>
      <td>${p.val}</td>
    </tr>
  `).join('');

  // Implications
  document.getElementById('soilImplText').innerHTML = soil.implications;

  // Update texture triangle
  document.getElementById('tSand').value = soil.sand;
  document.getElementById('tSilt').value = soil.silt;
  document.getElementById('tClay').value = soil.clay;
  updateTextureTriangle();
}

/* ---- Soil Texture Triangle ---- */
function updateTextureTriangle() {
  let sand = parseFloat(document.getElementById('tSand').value) || 0;
  let silt = parseFloat(document.getElementById('tSilt').value) || 0;
  let clay = parseFloat(document.getElementById('tClay').value) || 0;
  const total = sand + silt + clay;
  if (total !== 100 && total > 0) {
    const scale = 100 / total;
    sand = Math.round(sand * scale);
    silt = Math.round(silt * scale);
    clay = 100 - sand - silt;
  }

  const canvas = document.getElementById('textureCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Triangle vertices (ternary diagram)
  const pad = 28;
  const ax = W / 2, ay = pad;                 // top = Clay
  const bx = pad, by = H - pad;               // bottom-left = Sand
  const cx = W - pad, cy = H - pad;           // bottom-right = Silt

  // Draw filled triangle
  const triGrad = ctx.createLinearGradient(bx, by, ax, ay);
  triGrad.addColorStop(0, 'rgba(180,140,60,0.15)');
  triGrad.addColorStop(1, 'rgba(100,60,30,0.25)');
  ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.lineTo(cx, cy); ctx.closePath();
  ctx.fillStyle = triGrad; ctx.fill();
  ctx.strokeStyle = 'rgba(15,240,192,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();

  // Grid lines at 25% intervals
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.8;
  [25, 50, 75].forEach(pct => {
    const t = pct / 100;
    // Clay lines (horizontal)
    const p1x = ax * (1 - t) + bx * t, p1y = ay * (1 - t) + by * t;
    const p2x = ax * (1 - t) + cx * t, p2y = ay * (1 - t) + cy * t;
    ctx.beginPath(); ctx.moveTo(p1x, p1y); ctx.lineTo(p2x, p2y); ctx.stroke();
    // Sand lines
    const s1x = bx * (1 - t) + cx * t, s1y = by * (1 - t) + cy * t;
    const s2x = bx * (1 - t) + ax * t, s2y = by * (1 - t) + ay * t;
    ctx.beginPath(); ctx.moveTo(s1x, s1y); ctx.lineTo(s2x, s2y); ctx.stroke();
    // Silt lines
    const sl1x = cx * (1 - t) + ax * t, sl1y = cy * (1 - t) + ay * t;
    const sl2x = cx * (1 - t) + bx * t, sl2y = cy * (1 - t) + by * t;
    ctx.beginPath(); ctx.moveTo(sl1x, sl1y); ctx.lineTo(sl2x, sl2y); ctx.stroke();
  });

  // Vertex labels
  ctx.fillStyle = 'rgba(15,240,192,0.9)';
  ctx.font = 'bold 11px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Clay %', ax, ay - 10);
  ctx.fillStyle = 'rgba(245,158,11,0.9)';
  ctx.fillText('Sand %', bx, by + 16);
  ctx.fillStyle = 'rgba(168,85,247,0.9)';
  ctx.fillText('Silt %', cx, cy + 16);

  // Convert to barycentric → canvas coords
  const clayF  = clay / 100;
  const sandF  = sand / 100;
  const siltF  = silt / 100;
  const px = ax * clayF + bx * sandF + cx * siltF;
  const py = ay * clayF + by * sandF + cy * siltF;

  // Crosshair
  ctx.strokeStyle = '#ff4040'; ctx.lineWidth = 1;
  ctx.setLineDash([3, 2]);
  ctx.beginPath(); ctx.moveTo(px - 20, py); ctx.lineTo(px + 20, py); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(px, py - 20); ctx.lineTo(px, py + 20); ctx.stroke();
  ctx.setLineDash([]);

  // Point
  ctx.fillStyle = '#ff4040';
  ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();

  // Pct labels near point
  ctx.fillStyle = '#fff'; ctx.font = '10px Segoe UI'; ctx.textAlign = 'left';
  ctx.fillText(`S:${sand}% Si:${silt}% C:${clay}%`, Math.min(W - 90, px + 8), py - 6);

  // Determine texture class
  const cls = getTextureClass(sand, silt, clay);
  document.getElementById('textureClass').textContent = cls;
}

function getTextureClass(sand, silt, clay) {
  if (clay >= 40) return clay >= 60 ? 'Heavy Clay' : 'Clay';
  if (clay >= 27 && silt >= 28) return 'Clay Loam';
  if (clay >= 35 && sand >= 45) return 'Sandy Clay';
  if (clay >= 27 && silt >= 50) return 'Silty Clay';
  if (clay >= 20 && silt >= 40) return 'Silty Clay Loam';
  if (clay >= 20 && sand >= 45) return 'Sandy Clay Loam';
  if (silt >= 50 && clay < 27) return silt >= 80 ? 'Silt' : 'Silt Loam';
  if (sand >= 85 && silt < 10) return 'Sand';
  if (sand >= 70 && clay < 15) return 'Loamy Sand';
  if (sand >= 52 && silt < 30) return 'Sandy Loam';
  return 'Loam';
}

/* ----------------------------------------------------------------
   10. LANDSLIDE SUSCEPTIBILITY ANALYSER
   ---------------------------------------------------------------- */
function updateSusceptibility() {
  const slope    = parseFloat(document.getElementById('ss-slope').value);
  const twi      = parseFloat(document.getElementById('ss-twi').value);
  const rain     = parseFloat(document.getElementById('ss-rain').value);
  const litho    = parseInt(document.getElementById('ss-litho').value);
  const ndvi     = parseInt(document.getElementById('ss-ndvi').value);
  const fault    = parseFloat(document.getElementById('ss-fault').value);
  const drain    = parseFloat(document.getElementById('ss-drain').value);
  const soilT    = document.getElementById('ss-soil').value;
  const seismic  = parseInt(document.getElementById('ss-seismic').value);

  // Update labels
  document.getElementById('sv-slope').textContent = slope + '°';
  document.getElementById('sv-twi').textContent   = twi.toFixed(1);
  document.getElementById('sv-rain').textContent  = rain + ' mm';
  document.getElementById('sv-fault').textContent = fault + ' km';
  document.getElementById('sv-drain').textContent = drain + ' m';

  // === Weighted scoring (0–100) ===
  // Weights based on GSI/NRSC multi-criteria approach
  const slopeScore  = Math.min(100, (slope / 75) * 100) * 0.25;         // 25%
  const twiScore    = Math.min(100, (twi / 14) * 100) * 0.15;           // 15%
  const rainScore   = Math.min(100, ((rain - 100) / 4900) * 100) * 0.20;// 20%
  const lithoScore  = ((5 - litho) / 4) * 100 * 0.12;                   // 12%
  const ndviScore   = ((5 - ndvi) / 4) * 100 * 0.10;                    // 10%
  const faultScore  = Math.max(0, (1 - fault / 50)) * 100 * 0.08;       // 8%
  const drainScore  = Math.max(0, (1 - drain / 2000)) * 100 * 0.05;     // 5%
  const seismicScore= ((seismic - 2) / 3) * 100 * 0.05;                 // 5%

  const soilBonuses = { mountain: 5, laterite: 3, peaty: 4, alluvial: 1, black: 2, red_yellow: 0, arid: -5, saline: -2 };
  const soilBonus   = soilBonuses[soilT] || 0;

  const raw   = slopeScore + twiScore + rainScore + lithoScore + ndviScore + faultScore + drainScore + seismicScore + soilBonus;
  const score = Math.round(Math.max(0, Math.min(100, raw)));

  // Store globally for infra module
  window._lastScore   = score;
  window._lastSoilType = soilT;
  window._lastSlope    = slope;

  // === Draw gauge ===
  drawGauge(score);

  // === Factor breakdown chart ===
  const factors = [
    { name: 'Slope Angle',    val: slopeScore,  pct: 25 },
    { name: 'TWI',            val: twiScore,     pct: 15 },
    { name: 'Rainfall',       val: rainScore,    pct: 20 },
    { name: 'Lithology',      val: lithoScore,   pct: 12 },
    { name: 'Land Cover',     val: ndviScore,    pct: 10 },
    { name: 'Fault Proximity',val: faultScore,   pct: 8  },
    { name: 'Drainage',       val: drainScore,   pct: 5  },
    { name: 'Seismicity',     val: seismicScore, pct: 5  },
  ];
  drawFactorChart(factors);

  // === Risk interpretation ===
  const zone = getSusceptZone(score);
  const interps = {
    "Very Low":  "The selected site shows <strong>Very Low landslide susceptibility</strong>. Terrain is gentle, well-drained, with stable lithology and low rainfall. Standard construction practices are adequate with routine geotechnical investigation.",
    "Low":       "The area has <strong>Low susceptibility</strong> to landslides. Moderate slopes with reasonable drainage. Standard slope protection and drainage design is sufficient. Periodic slope monitoring recommended during monsoon.",
    "Moderate":  "This zone shows <strong>Moderate susceptibility</strong>. Multiple conditioning factors are at medium-to-high levels. Engineering investigations are mandatory. Slope stabilisation works and controlled development required. Monsoon-season construction moratorium advised.",
    "High":      "⚠️ <strong>High Landslide Susceptibility</strong> detected. Combination of steep slopes, high rainfall, and unfavorable soil/lithology creates significant risk. Detailed geotechnical investigation required. Retaining structures, drainage, and slope monitoring are essential. Restrict infrastructure on slopes >35°.",
    "Very High": "🚨 <strong>Very High Landslide Susceptibility!</strong> This area has all major risk factors elevated simultaneously. Construction should be strictly regulated or avoided. Any development requires NDMA/GSI approval with full geotechnical investigation, real-time monitoring, and robust slope stabilisation. Community evacuation plans must be in place."
  };
  document.getElementById('susceptInterp').innerHTML = interps[zone] || '';

  // === Historical table ===
  renderHistTable();
}

function getSusceptZone(score) {
  if (score >= 75) return 'Very High';
  if (score >= 55) return 'High';
  if (score >= 35) return 'Moderate';
  if (score >= 15) return 'Low';
  return 'Very Low';
}

function drawGauge(score) {
  const canvas = document.getElementById('gaugeCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const cx = W / 2, cy = H - 10;
  const r = Math.min(W, H * 1.5) / 2 - 10;
  const startAngle = Math.PI;
  const endAngle   = 2 * Math.PI;

  // Background arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 18;
  ctx.stroke();

  // Coloured segments
  const segments = [
    { pct: 0.15, color: '#0284c7' },  // Very Low
    { pct: 0.20, color: '#16a34a' },  // Low
    { pct: 0.20, color: '#b45309' },  // Moderate
    { pct: 0.20, color: '#c2410c' },  // High
    { pct: 0.25, color: '#b91c1c' },  // Very High
  ];

  let startA = startAngle;
  segments.forEach(seg => {
    const span = seg.pct * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, r, startA, startA + span);
    ctx.strokeStyle = seg.color + '88';
    ctx.lineWidth = 18;
    ctx.stroke();
    startA += span;
  });

  // Value arc
  const valueFrac = score / 100;
  const valueEnd  = startAngle + valueFrac * Math.PI;
  const zoneColor = score >= 75 ? '#b91c1c' : score >= 55 ? '#c2410c' : score >= 35 ? '#b45309' : score >= 15 ? '#16a34a' : '#0284c7';

  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, valueEnd);
  ctx.strokeStyle = zoneColor;
  ctx.lineWidth = 18;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Needle
  const needleAngle = startAngle + valueFrac * Math.PI;
  const nx = cx + (r - 9) * Math.cos(needleAngle);
  const ny = cy + (r - 9) * Math.sin(needleAngle);
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(nx, ny);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Score label
  document.getElementById('gaugeScore').textContent = score;
  const zone = getSusceptZone(score);
  document.getElementById('gaugeZone').textContent = zone;
  document.getElementById('gaugeZone').style.color = zoneColor;
}

function drawFactorChart(factors) {
  const canvas = document.getElementById('factorChart');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const pad = { top: 15, right: 20, bottom: 20, left: 130 };
  const chartW = W - pad.left - pad.right;
  const barH   = (H - pad.top - pad.bottom) / factors.length - 4;
  const maxVal = 25; // max possible for highest-weight factor

  factors.forEach((f, i) => {
    const y = pad.top + i * (barH + 4);
    const pctFilled = Math.min(1, f.val / maxVal);
    const barWidth  = pctFilled * chartW;

    // Background bar
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.roundRect(pad.left, y, chartW, barH, 3); ctx.fill();

    // Filled bar gradient
    const grad = ctx.createLinearGradient(pad.left, 0, pad.left + barWidth, 0);
    grad.addColorStop(0, '#0ff0c088');
    grad.addColorStop(1, '#22d97c');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(pad.left, y, barWidth, barH, 3); ctx.fill();

    // Factor name
    ctx.fillStyle = 'rgba(200,220,255,0.8)';
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'right';
    ctx.fillText(f.name, pad.left - 6, y + barH * 0.67);

    // Weight badge
    ctx.fillStyle = 'rgba(245,158,11,0.6)';
    ctx.font = '10px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText(`(${f.pct}%)`, pad.left - 44, y + barH * 0.67);

    // Value
    ctx.fillStyle = '#0ff0c0';
    ctx.font = 'bold 11px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText(f.val.toFixed(1), pad.left + barWidth + 4, y + barH * 0.67);
  });
}

function renderHistTable() {
  const tbody = document.getElementById('histTableBody');
  tbody.innerHTML = HIST_DATA.map(row => `
    <tr>
      <td><strong>${row.region}</strong></td>
      <td>${row.zone}</td>
      <td>${row.trigger}</td>
      <td>${row.slope}</td>
      <td><span class="risk-pill" style="background:${row.color}22;color:${row.color};border:1px solid ${row.color}88;">${row.risk}</span></td>
    </tr>
  `).join('');
}

/* ----------------------------------------------------------------
   11. INFRASTRUCTURE GUIDANCE MODULE
   ---------------------------------------------------------------- */
function renderInfraGuidance() {
  const score    = window._lastScore    !== undefined ? window._lastScore : 55;
  const soilType = window._lastSoilType || 'mountain';
  const slope    = window._lastSlope    || 35;

  // Update summary banner
  const zone = getSusceptZone(score);
  const bannerClass = score >= 75 ? 'danger' : score >= 55 ? 'warn' : score >= 35 ? 'note' : 'good';
  const bannerIcon  = score >= 75 ? '🚨' : score >= 55 ? '⚠️' : score >= 35 ? '📋' : '✅';
  document.getElementById('infraSummaryBanner').className = `info-box ${bannerClass}`;
  document.getElementById('infraSummaryBanner').innerHTML = `
    <span class="info-box-icon">${bannerIcon}</span>
    <div class="info-box-text">
      <strong>Infrastructure Guidance for Susceptibility Score: ${score}/100 — ${zone} Risk</strong><br>
      Soil Type: ${SOIL_DB[soilType]?.name || soilType} | Slope: ${slope}° | 
      <a style="color:var(--accent-teal);cursor:pointer;" onclick="switchTab('susceptibility')">Modify parameters →</a>
    </div>
  `;

  // Render guidance cards
  const guides = getInfraGuidance(score, soilType, slope);
  const grid = document.getElementById('infraCardsGrid');
  grid.innerHTML = guides.map(g => `
    <div class="infra-card prio-${g.prio}">
      <div class="infra-card-title">
        ${g.title}
        <span class="infra-badge ${g.prio}">${g.prio.toUpperCase()}</span>
      </div>
      <ul class="infra-list">
        ${g.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Mitigation table
  const tbody = document.getElementById('mitigationBody');
  tbody.innerHTML = MITIGATION_DATA.map(row => {
    const prioColor = row.prio === 'Critical' ? '#ef4444' : row.prio === 'High' ? '#f97316' : row.prio === 'Medium' ? '#f59e0b' : '#22c55e';
    return `
      <tr>
        <td><strong>${row.measure}</strong></td>
        <td>${row.when}</td>
        <td><span class="risk-pill" style="background:${prioColor}22;color:${prioColor};border:1px solid ${prioColor}66;">${row.prio}</span></td>
        <td style="font-family:var(--font-mono);font-size:11px;">${row.cost}</td>
        <td style="color:var(--accent-amber);">${row.eff}</td>
      </tr>
    `;
  }).join('');
}

/* ----------------------------------------------------------------
   12. INITIALISATION
   ---------------------------------------------------------------- */
function init() {
  buildIndiaMap();
  populateStateDropdown();
  loadSoilProfile();
  updateTerrain();
  updateSusceptibility();
  renderInfraGuidance();
  // Small delay so canvases have proper size
  setTimeout(() => {
    updateTerrain();
    updateTextureTriangle();
    drawGauge(55);
  }, 200);
}

document.addEventListener('DOMContentLoaded', init);
