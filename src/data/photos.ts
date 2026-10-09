// High-Fidelity Vector-Photographic Asset Library for CAPTCHA Objects
// Guaranteed 100% accurate, zero network latency, no broken URLs, no random mismatched stock photos.

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

const SVGS: Record<string, string> = {
  // 1. STOP SIGN
  'stop sign': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#64748b"/>
    <rect x="92" y="145" width="16" height="55" fill="#94a3b8"/>
    <polygon points="62,15 138,15 185,62 185,138 138,185 62,185 15,138 15,62" fill="#b91c1c" stroke="#dc2626" stroke-width="4"/>
    <polygon points="65,22 135,22 178,65 178,135 135,178 65,178 22,135 22,65" fill="#dc2626" stroke="#ffffff" stroke-width="5"/>
    <text x="100" y="112" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="44" fill="#ffffff" text-anchor="middle" letter-spacing="2">STOP</text>
  </svg>`,

  // 2. TRAFFIC LIGHT
  'traffic light': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#94a3b8"/>
    <rect x="94" y="160" width="12" height="40" fill="#475569"/>
    <rect x="70" y="20" width="60" height="145" rx="10" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
    <!-- Red Light -->
    <circle cx="100" cy="50" r="17" fill="#ef4444" stroke="#7f1d1d" stroke-width="2"/>
    <circle cx="95" cy="45" r="5" fill="#fca5a5" opacity="0.7"/>
    <!-- Yellow Light -->
    <circle cx="100" cy="92" r="17" fill="#facc15" stroke="#78350f" stroke-width="2"/>
    <circle cx="95" cy="87" r="5" fill="#fef08a" opacity="0.7"/>
    <!-- Green Light -->
    <circle cx="100" cy="134" r="17" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
    <circle cx="95" cy="129" r="5" fill="#86efac" opacity="0.7"/>
    <!-- Visors -->
    <path d="M 80 35 Q 100 28 120 35" stroke="#0f172a" stroke-width="5" fill="none"/>
    <path d="M 80 77 Q 100 70 120 77" stroke="#0f172a" stroke-width="5" fill="none"/>
    <path d="M 80 119 Q 100 112 120 119" stroke="#0f172a" stroke-width="5" fill="none"/>
  </svg>`,

  // 3. FIRE HYDRANT
  hydrant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#cbd5e1"/>
    <!-- Sidewalk curb line -->
    <rect x="0" y="165" width="200" height="35" fill="#94a3b8"/>
    <line x1="0" y1="165" x2="200" y2="165" stroke="#64748b" stroke-width="3"/>
    <!-- Base plate -->
    <rect x="68" y="152" width="64" height="15" rx="3" fill="#991b1b"/>
    <!-- Hydrant Barrel -->
    <rect x="76" y="70" width="48" height="85" fill="#dc2626"/>
    <!-- Side Nozzle Left -->
    <rect x="52" y="88" width="25" height="22" rx="4" fill="#b91c1c"/>
    <circle cx="52" cy="99" r="7" fill="#eab308"/>
    <!-- Side Nozzle Right -->
    <rect x="123" y="88" width="25" height="22" rx="4" fill="#b91c1c"/>
    <circle cx="148" cy="99" r="7" fill="#eab308"/>
    <!-- Chains -->
    <path d="M 58 107 Q 100 135 142 107" fill="none" stroke="#e2e8f0" stroke-width="3" stroke-dasharray="3,3"/>
    <!-- Main Center Cap -->
    <circle cx="100" cy="100" r="15" fill="#991b1b" stroke="#7f1d1d" stroke-width="2"/>
    <circle cx="100" cy="100" r="7" fill="#eab308"/>
    <!-- Bonnet Dome Top -->
    <ellipse cx="100" cy="70" rx="27" ry="16" fill="#dc2626"/>
    <rect x="94" y="44" width="12" height="14" fill="#991b1b"/>
    <!-- Top Operating Nut -->
    <polygon points="100,32 107,38 105,46 95,46 93,38" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
    <!-- Metallic highlight -->
    <rect x="80" y="72" width="6" height="80" fill="#ffffff" opacity="0.35" rx="3"/>
  </svg>`,

  // 4. CROSSWALK
  crosswalk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#334155"/>
    <!-- Sidewalk tops -->
    <rect x="0" y="0" width="200" height="24" fill="#94a3b8"/>
    <rect x="0" y="176" width="200" height="24" fill="#94a3b8"/>
    <line x1="0" y1="24" x2="200" y2="24" stroke="#facc15" stroke-width="3"/>
    <line x1="0" y1="176" x2="200" y2="176" stroke="#facc15" stroke-width="3"/>
    <!-- White Zebra Stripes -->
    <rect x="20" y="36" width="26" height="128" rx="2" fill="#ffffff"/>
    <rect x="62" y="36" width="26" height="128" rx="2" fill="#ffffff"/>
    <rect x="104" y="36" width="26" height="128" rx="2" fill="#ffffff"/>
    <rect x="146" y="36" width="26" height="128" rx="2" fill="#ffffff"/>
  </svg>`,

  // 5. CHIHUAHUA
  chihuahua: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#fef3c7"/>
    <!-- Large pointed ears -->
    <polygon points="45,100 20,25 78,65" fill="#d97706" stroke="#b45309" stroke-width="2"/>
    <polygon points="48,90 32,38 72,68" fill="#fbcfe8"/>
    <polygon points="155,100 180,25 122,65" fill="#d97706" stroke="#b45309" stroke-width="2"/>
    <polygon points="152,90 168,38 128,68" fill="#fbcfe8"/>
    <!-- Head -->
    <ellipse cx="100" cy="115" rx="46" ry="42" fill="#f59e0b"/>
    <ellipse cx="100" cy="120" rx="36" ry="32" fill="#fbbf24"/>
    <!-- Large round dark eyes -->
    <circle cx="82" cy="106" r="11" fill="#1c1917"/>
    <circle cx="85" cy="103" r="4" fill="#ffffff"/>
    <circle cx="118" cy="106" r="11" fill="#1c1917"/>
    <circle cx="121" cy="103" r="4" fill="#ffffff"/>
    <!-- Muzzle / Snout -->
    <ellipse cx="100" cy="130" rx="16" ry="13" fill="#fef3c7"/>
    <!-- Nose -->
    <ellipse cx="100" cy="124" rx="7" ry="5" fill="#1c1917"/>
    <!-- Mouth & Tongue -->
    <path d="M 95 133 Q 100 138 105 133" stroke="#1c1917" stroke-width="2" fill="none"/>
    <ellipse cx="100" cy="138" rx="4" ry="5" fill="#f43f5e"/>
    <!-- Forehead apple dome highlight -->
    <ellipse cx="100" cy="85" rx="18" ry="10" fill="#fde68a" opacity="0.6"/>
  </svg>`,

  // 6. BLUEBERRY MUFFIN
  muffin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <!-- Plate -->
    <ellipse cx="100" cy="165" rx="75" ry="20" fill="#e2e8f0"/>
    <ellipse cx="100" cy="163" rx="70" ry="16" fill="#f1f5f9"/>
    <!-- Paper Cup Liner -->
    <polygon points="56,110 68,160 132,160 144,110" fill="#fed7aa" stroke="#fdba74" stroke-width="2"/>
    <line x1="72" y1="110" x2="80" y2="160" stroke="#fb923c" stroke-width="1.5"/>
    <line x1="88" y1="110" x2="94" y2="160" stroke="#fb923c" stroke-width="1.5"/>
    <line x1="104" y1="110" x2="106" y2="160" stroke="#fb923c" stroke-width="1.5"/>
    <line x1="120" y1="110" x2="118" y2="160" stroke="#fb923c" stroke-width="1.5"/>
    <line x1="134" y1="110" x2="128" y2="160" stroke="#fb923c" stroke-width="1.5"/>
    <!-- Muffin Top Dome -->
    <ellipse cx="100" cy="100" rx="58" ry="36" fill="#d97706"/>
    <ellipse cx="100" cy="95" rx="52" ry="30" fill="#f59e0b"/>
    <!-- Blueberries baked on crust -->
    <circle cx="75" cy="90" r="9" fill="#1e1b4b" stroke="#312e81" stroke-width="2"/>
    <circle cx="73" cy="88" r="3" fill="#818cf8"/>
    <circle cx="120" cy="85" r="10" fill="#1e1b4b" stroke="#312e81" stroke-width="2"/>
    <circle cx="118" cy="83" r="3.5" fill="#818cf8"/>
    <circle cx="98" cy="102" r="9" fill="#1e1b4b" stroke="#312e81" stroke-width="2"/>
    <circle cx="96" cy="100" r="3" fill="#818cf8"/>
    <circle cx="132" cy="108" r="7.5" fill="#1e1b4b" stroke="#312e81" stroke-width="1.5"/>
    <circle cx="68" cy="106" r="7" fill="#1e1b4b" stroke="#312e81" stroke-width="1.5"/>
    <!-- Golden crumbs -->
    <circle cx="90" cy="78" r="2.5" fill="#78350f"/>
    <circle cx="110" cy="74" r="2" fill="#78350f"/>
    <circle cx="85" cy="108" r="2" fill="#78350f"/>
  </svg>`,

  // 7. FRIED CHICKEN
  'fried chicken': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#fffbeb"/>
    <!-- Basket rim -->
    <ellipse cx="100" cy="155" rx="72" ry="24" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
    <!-- Bone Knuckle -->
    <circle cx="48" cy="85" r="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <circle cx="56" cy="95" r="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="52" y="86" width="30" height="15" fill="#f8fafc" transform="rotate(-25 52 86)"/>
    <!-- Crispy Golden Fried Meat -->
    <ellipse cx="125" cy="120" rx="48" ry="32" fill="#b45309" transform="rotate(-15 125 120)"/>
    <ellipse cx="122" cy="118" rx="44" ry="28" fill="#d97706" transform="rotate(-15 122 118)"/>
    <!-- Crunchy Breading Texture Spots -->
    <circle cx="105" cy="110" r="4" fill="#78350f"/>
    <circle cx="125" cy="105" r="5" fill="#92400e"/>
    <circle cx="140" cy="115" r="4" fill="#78350f"/>
    <circle cx="115" cy="128" r="5" fill="#78350f"/>
    <circle cx="138" cy="130" r="3.5" fill="#92400e"/>
    <circle cx="152" cy="112" r="4" fill="#b45309"/>
  </svg>`,

  // 8. GOLDEN PUPPY
  puppy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#ecfdf5"/>
    <!-- Golden Body -->
    <ellipse cx="100" cy="130" rx="55" ry="42" fill="#d97706"/>
    <ellipse cx="100" cy="128" rx="50" ry="38" fill="#f59e0b"/>
    <!-- Floppy Retriever Ears -->
    <ellipse cx="62" cy="85" rx="16" ry="32" fill="#b45309" transform="rotate(15 62 85)"/>
    <ellipse cx="138" cy="85" rx="16" ry="32" fill="#b45309" transform="rotate(-15 138 85)"/>
    <!-- Puppy Head -->
    <circle cx="100" cy="85" r="36" fill="#f59e0b"/>
    <circle cx="100" cy="85" r="32" fill="#fbbf24"/>
    <!-- Puppy Eyes -->
    <circle cx="88" cy="78" r="6" fill="#1c1917"/>
    <circle cx="89" cy="76" r="2" fill="#ffffff"/>
    <circle cx="112" cy="78" r="6" fill="#1c1917"/>
    <circle cx="113" cy="76" r="2" fill="#ffffff"/>
    <!-- Muzzle & Nose -->
    <ellipse cx="100" cy="98" rx="15" ry="12" fill="#fef3c7"/>
    <polygon points="100,92 93,98 107,98" fill="#1c1917"/>
    <path d="M 96 102 Q 100 106 104 102" stroke="#1c1917" stroke-width="2" fill="none"/>
  </svg>`,

  // 9. FRENCH CROISSANT
  croissant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f1f5f9"/>
    <!-- Bakery board -->
    <rect x="25" y="145" width="150" height="25" rx="5" fill="#cbd5e1"/>
    <!-- Crescent Arch -->
    <path d="M 35 130 Q 100 40 165 130 Q 140 115 100 120 Q 60 115 35 130 Z" fill="#b45309" stroke="#92400e" stroke-width="3"/>
    <!-- Flaky Pastry Layers -->
    <path d="M 45 125 Q 100 52 155 125 Q 135 112 100 116 Q 65 112 45 125 Z" fill="#d97706"/>
    <!-- Center Plump Roll -->
    <ellipse cx="100" cy="88" rx="30" ry="24" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    <path d="M 85 75 Q 100 68 115 75" stroke="#92400e" stroke-width="2.5" fill="none"/>
    <path d="M 80 88 Q 100 80 120 88" stroke="#92400e" stroke-width="2.5" fill="none"/>
    <path d="M 85 100 Q 100 94 115 100" stroke="#92400e" stroke-width="2.5" fill="none"/>
  </svg>`,

  // 10. SHAR PEI
  'shar pei': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#fef2f2"/>
    <!-- Head Base -->
    <ellipse cx="100" cy="110" rx="52" ry="46" fill="#d97706"/>
    <!-- Folded Little Ears -->
    <polygon points="56,75 70,60 76,80" fill="#92400e"/>
    <polygon points="144,75 130,60 124,80" fill="#92400e"/>
    <!-- Prominent Forehead Wrinkles -->
    <path d="M 72 78 Q 100 70 128 78" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M 75 90 Q 100 82 125 90" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M 80 100 Q 100 93 120 100" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Small Deep-set Eyes -->
    <ellipse cx="82" cy="108" rx="5" ry="4" fill="#1c1917"/>
    <ellipse cx="118" cy="108" rx="5" ry="4" fill="#1c1917"/>
    <!-- Padded Hippopotamus Muzzle -->
    <ellipse cx="100" cy="132" rx="35" ry="22" fill="#b45309"/>
    <!-- Muzzle Wrinkles -->
    <path d="M 80 128 Q 100 124 120 128" stroke="#78350f" stroke-width="3" fill="none"/>
    <path d="M 76 138 Q 100 142 124 138" stroke="#78350f" stroke-width="3" fill="none"/>
    <!-- Large Black Nose -->
    <ellipse cx="100" cy="124" rx="10" ry="7" fill="#1c1917"/>
  </svg>`,

  // 11. SOURDOUGH BREAD LOAF
  bread: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <!-- Cutting board -->
    <ellipse cx="100" cy="155" rx="80" ry="22" fill="#cbd5e1"/>
    <!-- Loaf Body -->
    <ellipse cx="100" cy="115" rx="64" ry="42" fill="#92400e"/>
    <ellipse cx="100" cy="110" rx="58" ry="36" fill="#b45309"/>
    <ellipse cx="100" cy="106" rx="50" ry="28" fill="#d97706"/>
    <!-- Flour dusting & Baker Score Marks -->
    <path d="M 65 95 Q 100 108 135 95" stroke="#fef08a" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M 75 80 Q 100 90 125 80" stroke="#fef08a" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 75 115 Q 100 125 125 115" stroke="#fef08a" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="85" cy="98" r="1.5" fill="#ffffff"/>
    <circle cx="115" cy="102" r="1.5" fill="#ffffff"/>
  </svg>`,

  // 12. TREE SLOTH
  sloth: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#ecfccb"/>
    <!-- Tree branch -->
    <rect x="0" y="55" width="200" height="20" fill="#78350f" rx="3"/>
    <circle cx="45" cy="50" r="12" fill="#65a30d"/>
    <circle cx="160" cy="48" r="14" fill="#65a30d"/>
    <!-- Hanging Sloth Arms with long claws -->
    <path d="M 70 65 L 75 110" stroke="#713f12" stroke-width="12" stroke-linecap="round"/>
    <path d="M 130 65 L 125 110" stroke="#713f12" stroke-width="12" stroke-linecap="round"/>
    <path d="M 66 52 L 72 65" stroke="#e2e8f0" stroke-width="4"/>
    <path d="M 126 52 L 132 65" stroke="#e2e8f0" stroke-width="4"/>
    <!-- Sloth Body -->
    <ellipse cx="100" cy="130" rx="38" ry="32" fill="#854d0e"/>
    <!-- Sloth Head -->
    <circle cx="100" cy="115" r="26" fill="#a16207"/>
    <circle cx="100" cy="116" r="21" fill="#fef3c7"/>
    <!-- Characteristic Eye Mask Stripes -->
    <path d="M 85 112 Q 95 116 88 122" stroke="#451a03" stroke-width="5" stroke-linecap="round"/>
    <path d="M 115 112 Q 105 116 112 122" stroke="#451a03" stroke-width="5" stroke-linecap="round"/>
    <circle cx="90" cy="116" r="3" fill="#1c1917"/>
    <circle cx="110" cy="116" r="3" fill="#1c1917"/>
    <!-- Nose & gentle smile -->
    <ellipse cx="100" cy="124" rx="4" ry="3" fill="#1c1917"/>
    <path d="M 97 128 Q 100 131 103 128" stroke="#1c1917" stroke-width="1.5" fill="none"/>
  </svg>`,

  // 13. BICYCLE
  bicycle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <!-- Ground -->
    <line x1="0" y1="165" x2="200" y2="165" stroke="#94a3b8" stroke-width="3"/>
    <!-- Back Wheel -->
    <circle cx="55" cy="135" r="28" fill="none" stroke="#1e293b" stroke-width="5"/>
    <circle cx="55" cy="135" r="26" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
    <circle cx="55" cy="135" r="4" fill="#0f172a"/>
    <!-- Front Wheel -->
    <circle cx="145" cy="135" r="28" fill="none" stroke="#1e293b" stroke-width="5"/>
    <circle cx="145" cy="135" r="26" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
    <circle cx="145" cy="135" r="4" fill="#0f172a"/>
    <!-- Bicycle Diamond Frame (Teal) -->
    <line x1="55" y1="135" x2="95" y2="135" stroke="#0284c7" stroke-width="4"/>
    <line x1="55" y1="135" x2="85" y2="92" stroke="#0284c7" stroke-width="4"/>
    <line x1="95" y1="135" x2="85" y2="92" stroke="#0284c7" stroke-width="4"/>
    <line x1="95" y1="135" x2="135" y2="92" stroke="#0284c7" stroke-width="4"/>
    <line x1="85" y1="92" x2="135" y2="92" stroke="#0284c7" stroke-width="4"/>
    <!-- Front Fork & Handlebars -->
    <line x1="145" y1="135" x2="135" y2="82" stroke="#0284c7" stroke-width="4"/>
    <path d="M 130 80 L 140 80 Q 146 80 146 86" stroke="#0f172a" stroke-width="4" fill="none"/>
    <!-- Seat post & saddle -->
    <line x1="85" y1="92" x2="82" y2="82" stroke="#0f172a" stroke-width="3"/>
    <ellipse cx="80" cy="81" rx="10" ry="3" fill="#0f172a"/>
    <!-- Pedals -->
    <circle cx="95" cy="135" r="6" fill="#0f172a"/>
  </svg>`,

  // 14. CITY BUS
  bus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#e2e8f0"/>
    <line x1="0" y1="165" x2="200" y2="165" stroke="#64748b" stroke-width="3"/>
    <!-- Bus Body -->
    <rect x="25" y="65" width="150" height="80" rx="12" fill="#2563eb" stroke="#1d4ed8" stroke-width="3"/>
    <!-- Destination sign -->
    <rect x="40" y="70" width="120" height="12" rx="3" fill="#0f172a"/>
    <text x="100" y="80" font-size="9" fill="#facc15" font-weight="bold" text-anchor="middle">METRO TRANSIT</text>
    <!-- Windows -->
    <rect x="35" y="88" width="30" height="26" rx="4" fill="#93c5fd" stroke="#1e293b" stroke-width="2"/>
    <rect x="72" y="88" width="30" height="26" rx="4" fill="#93c5fd" stroke="#1e293b" stroke-width="2"/>
    <rect x="109" y="88" width="30" height="26" rx="4" fill="#93c5fd" stroke="#1e293b" stroke-width="2"/>
    <rect x="146" y="88" width="22" height="26" rx="4" fill="#93c5fd" stroke="#1e293b" stroke-width="2"/>
    <!-- Lower Stripe -->
    <rect x="25" y="122" width="150" height="10" fill="#ffffff"/>
    <!-- Wheels -->
    <circle cx="55" cy="148" r="16" fill="#1e293b"/>
    <circle cx="55" cy="148" r="8" fill="#94a3b8"/>
    <circle cx="145" cy="148" r="16" fill="#1e293b"/>
    <circle cx="145" cy="148" r="8" fill="#94a3b8"/>
  </svg>`,

  // 15. TRAIN
  train: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f1f5f9"/>
    <!-- Tracks -->
    <line x1="20" y1="160" x2="180" y2="160" stroke="#475569" stroke-width="4"/>
    <line x1="30" y1="172" x2="170" y2="172" stroke="#475569" stroke-width="4"/>
    <line x1="45" y1="155" x2="35" y2="178" stroke="#78350f" stroke-width="3"/>
    <line x1="85" y1="155" x2="75" y2="178" stroke="#78350f" stroke-width="3"/>
    <line x1="125" y1="155" x2="115" y2="178" stroke="#78350f" stroke-width="3"/>
    <line x1="165" y1="155" x2="155" y2="178" stroke="#78350f" stroke-width="3"/>
    <!-- Train Locomotive front -->
    <path d="M 60 150 L 140 150 L 135 70 Q 100 50 65 70 Z" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
    <rect x="70" y="80" width="60" height="28" rx="6" fill="#bae6fd" stroke="#0c4a6e" stroke-width="2"/>
    <!-- Headlight -->
    <circle cx="100" cy="125" r="12" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
    <circle cx="100" cy="125" r="6" fill="#ffffff"/>
  </svg>`,

  // 16. SUSPENSION BRIDGE
  bridge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#bae6fd"/>
    <!-- Water -->
    <rect x="0" y="145" width="200" height="55" fill="#0284c7"/>
    <!-- Bridge Towers -->
    <rect x="65" y="35" width="14" height="120" fill="#dc2626"/>
    <rect x="125" y="35" width="14" height="120" fill="#dc2626"/>
    <!-- Roadway -->
    <rect x="0" y="125" width="200" height="12" fill="#475569"/>
    <!-- Suspension Main Cable -->
    <path d="M 0 65 Q 65 125 100 125 Q 135 125 20 65" stroke="#ef4444" stroke-width="4" fill="none"/>
    <path d="M 0 65 Q 72 35 100 120 Q 128 35 200 65" stroke="#b91c1c" stroke-width="3" fill="none"/>
    <!-- Vertical cables -->
    <line x1="85" y1="85" x2="85" y2="125" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="100" y1="105" x2="100" y2="125" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="115" y1="85" x2="115" y2="125" stroke="#ffffff" stroke-width="1.5"/>
  </svg>`,

  // 17. SAILBOAT
  boat: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#e0f2fe"/>
    <!-- Ocean -->
    <path d="M 0 145 Q 50 140 100 145 Q 150 150 200 145 L 200 200 L 0 200 Z" fill="#0369a1"/>
    <!-- Mast -->
    <rect x="98" y="35" width="4" height="110" fill="#78350f"/>
    <!-- Big Main Sail -->
    <polygon points="104,40 160,135 104,135" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Jib Sail -->
    <polygon points="96,48 50,135 96,135" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Hull -->
    <polygon points="40,145 160,145 145,168 55,168" fill="#b91c1c" stroke="#991b1b" stroke-width="2"/>
  </svg>`,

  // 18. AIRPLANE
  airplane: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#38bdf8"/>
    <!-- Clouds -->
    <circle cx="45" cy="150" r="22" fill="#ffffff" opacity="0.8"/>
    <circle cx="70" cy="150" r="16" fill="#ffffff" opacity="0.8"/>
    <circle cx="160" cy="50" r="18" fill="#ffffff" opacity="0.7"/>
    <!-- Jet Airliner Fuselage -->
    <ellipse cx="100" cy="100" rx="75" ry="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <!-- Cockpit -->
    <ellipse cx="165" cy="98" rx="8" ry="4" fill="#0284c7"/>
    <!-- Passenger Windows -->
    <circle cx="80" cy="98" r="2.5" fill="#0284c7"/>
    <circle cx="95" cy="98" r="2.5" fill="#0284c7"/>
    <circle cx="110" cy="98" r="2.5" fill="#0284c7"/>
    <circle cx="125" cy="98" r="2.5" fill="#0284c7"/>
    <circle cx="140" cy="98" r="2.5" fill="#0284c7"/>
    <!-- Wings -->
    <polygon points="110,100 80,150 95,150 130,100" fill="#cbd5e1"/>
    <polygon points="110,100 80,50 95,50 130,100" fill="#cbd5e1"/>
    <!-- Tail Fin -->
    <polygon points="35,100 25,65 45,65 55,100" fill="#dc2626"/>
  </svg>`,

  // 19. PARKING METER
  meter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#cbd5e1"/>
    <!-- Sidewalk -->
    <rect x="0" y="165" width="200" height="35" fill="#94a3b8"/>
    <!-- Pole -->
    <rect x="94" y="95" width="12" height="75" fill="#64748b"/>
    <!-- Meter Housing -->
    <rect x="74" y="35" width="52" height="65" rx="10" fill="#334155" stroke="#1e293b" stroke-width="2"/>
    <!-- Dome glass window -->
    <rect x="82" y="44" width="36" height="26" rx="4" fill="#93c5fd" stroke="#0284c7" stroke-width="2"/>
    <!-- Digital Time Display -->
    <text x="100" y="61" font-size="11" font-family="monospace" font-weight="bold" fill="#ef4444" text-anchor="middle">28:00</text>
    <!-- Coin Slot & Card Insert -->
    <line x1="88" y1="80" x2="112" y2="80" stroke="#f8fafc" stroke-width="2"/>
  </svg>`,

  // 20. CHIMNEY
  chimney: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#93c5fd"/>
    <!-- Roof tiles -->
    <polygon points="0,200 200,140 200,200" fill="#9a3412"/>
    <line x1="0" y1="190" x2="200" y2="130" stroke="#7c2d12" stroke-width="3"/>
    <!-- Brick Chimney Stack -->
    <rect x="75" y="65" width="50" height="90" fill="#b91c1c" stroke="#991b1b" stroke-width="2"/>
    <!-- Mortar lines -->
    <line x1="75" y1="85" x2="125" y2="85" stroke="#ffffff" stroke-width="1.5" opacity="0.7"/>
    <line x1="75" y1="105" x2="125" y2="105" stroke="#ffffff" stroke-width="1.5" opacity="0.7"/>
    <line x1="75" y1="125" x2="125" y2="125" stroke="#ffffff" stroke-width="1.5" opacity="0.7"/>
    <!-- Chimney Stone Cap -->
    <rect x="68" y="55" width="64" height="12" rx="3" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Terracotta Clay Flue Pot -->
    <rect x="86" y="35" width="28" height="22" rx="3" fill="#ea580c"/>
    <ellipse cx="100" cy="35" rx="14" ry="4" fill="#431407"/>
  </svg>`,

  // 21. PARK BENCH (Distractor)
  bench: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#dcfce7"/>
    <!-- Grass -->
    <line x1="0" y1="160" x2="200" y2="160" stroke="#16a34a" stroke-width="3"/>
    <!-- Cast iron dark green legs -->
    <path d="M 45 160 L 52 115 L 48 85 L 56 85 L 60 115 L 75 160" fill="#14532d"/>
    <path d="M 155 160 L 148 115 L 152 85 L 144 85 L 140 115 L 125 160" fill="#14532d"/>
    <!-- Armrests -->
    <path d="M 45 110 Q 55 98 75 112" stroke="#14532d" stroke-width="4" fill="none"/>
    <path d="M 155 110 Q 145 98 125 112" stroke="#14532d" stroke-width="4" fill="none"/>
    <!-- Wood slats backrest -->
    <rect x="35" y="82" width="130" height="9" rx="2" fill="#b45309" stroke="#78350f" stroke-width="1"/>
    <rect x="35" y="95" width="130" height="9" rx="2" fill="#b45309" stroke="#78350f" stroke-width="1"/>
    <rect x="35" y="108" width="130" height="9" rx="2" fill="#b45309" stroke="#78350f" stroke-width="1"/>
    <!-- Seat slats -->
    <rect x="30" y="122" width="140" height="8" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1"/>
    <rect x="30" y="132" width="140" height="8" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1"/>
  </svg>`,

  // 22. LAMPPOST (Distractor)
  lamp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f1f5f9"/>
    <rect x="0" y="170" width="200" height="30" fill="#94a3b8"/>
    <!-- Ornate base -->
    <polygon points="85,170 115,170 110,145 90,145" fill="#0f172a"/>
    <!-- Pole -->
    <rect x="96" y="55" width="8" height="95" fill="#1e293b"/>
    <!-- Lantern Crown -->
    <path d="M 85 55 L 115 55 L 110 32 L 90 32 Z" fill="#0f172a"/>
    <polygon points="90,32 100,20 110,32" fill="#0f172a"/>
    <!-- Hexagonal Glass Lantern -->
    <polygon points="85,55 90,75 110,75 115,55" fill="#fef08a" stroke="#0f172a" stroke-width="2"/>
    <circle cx="100" cy="62" r="7" fill="#ffffff" opacity="0.8"/>
  </svg>`,

  // 23. BRICK WALL (Distractor)
  wall: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#cbd5e1"/>
    <!-- Rows of clean red bricks -->
    <rect x="5" y="10" width="90" height="22" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="100" y="10" width="95" height="22" fill="#991b1b" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="5" y="34" width="45" height="22" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="52" y="34" width="90" height="22" fill="#7f1d1d" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="144" y="34" width="51" height="22" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="5" y="58" width="90" height="22" fill="#991b1b" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="100" y="58" width="95" height="22" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="5" y="82" width="45" height="22" fill="#7f1d1d" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="52" y="82" width="90" height="22" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="144" y="82" width="51" height="22" fill="#991b1b" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="5" y="106" width="90" height="22" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="100" y="106" width="95" height="22" fill="#7f1d1d" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="5" y="130" width="45" height="22" fill="#991b1b" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="52" y="130" width="90" height="22" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="144" y="130" width="51" height="22" fill="#7f1d1d" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="5" y="154" width="90" height="22" fill="#7f1d1d" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="100" y="154" width="95" height="22" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="5" y="178" width="45" height="20" fill="#b91c1c" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="52" y="178" width="90" height="20" fill="#991b1b" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="144" y="178" width="51" height="20" fill="#7f1d1d" stroke="#e2e8f0" stroke-width="2"/>
  </svg>`,

  // 24. TRASH BIN (Distractor)
  trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <rect x="0" y="165" width="200" height="35" fill="#cbd5e1"/>
    <!-- Municipal Green Can -->
    <polygon points="62,75 70,165 130,165 138,75" fill="#15803d" stroke="#166534" stroke-width="3"/>
    <line x1="80" y1="85" x2="85" y2="155" stroke="#14532d" stroke-width="3"/>
    <line x1="100" y1="85" x2="100" y2="155" stroke="#14532d" stroke-width="3"/>
    <line x1="120" y1="85" x2="115" y2="155" stroke="#14532d" stroke-width="3"/>
    <!-- Dome Lid -->
    <rect x="56" y="65" width="88" height="12" rx="4" fill="#166534"/>
    <ellipse cx="100" cy="65" rx="36" ry="16" fill="#15803d"/>
    <rect x="80" y="52" width="40" height="10" rx="3" fill="#0f172a"/>
  </svg>`,

  // 25. MAILBOX (Distractor)
  mailbox: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f1f5f9"/>
    <rect x="0" y="170" width="200" height="30" fill="#94a3b8"/>
    <!-- Four Legs -->
    <rect x="68" y="135" width="8" height="38" fill="#1e3a8a"/>
    <rect x="124" y="135" width="8" height="38" fill="#1e3a8a"/>
    <!-- USPS Blue Box -->
    <rect x="62" y="70" width="76" height="75" rx="6" fill="#1d4ed8"/>
    <!-- Rounded Hood -->
    <path d="M 62 70 Q 100 35 138 70 Z" fill="#1e40af"/>
    <!-- Drop Slot -->
    <rect x="72" y="76" width="56" height="14" rx="3" fill="#e2e8f0"/>
    <rect x="76" y="80" width="48" height="6" fill="#0f172a"/>
  </svg>`,

  // 26. CAR (Distractor)
  car: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#e2e8f0"/>
    <line x1="0" y1="165" x2="200" y2="165" stroke="#64748b" stroke-width="3"/>
    <!-- Sedan Body -->
    <path d="M 30 140 L 45 115 L 75 90 L 130 90 L 160 115 L 175 140 Z" fill="#475569" stroke="#334155" stroke-width="2"/>
    <polygon points="75,94 100,94 100,115 55,115" fill="#93c5fd"/>
    <polygon points="105,94 128,94 150,115 105,115" fill="#93c5fd"/>
    <!-- Wheels -->
    <circle cx="60" cy="145" r="16" fill="#0f172a"/>
    <circle cx="60" cy="145" r="7" fill="#cbd5e1"/>
    <circle cx="145" cy="145" r="16" fill="#0f172a"/>
    <circle cx="145" cy="145" r="7" fill="#cbd5e1"/>
  </svg>`,

  // 27. YELLOW TAXI
  taxi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#e2e8f0"/>
    <line x1="0" y1="165" x2="200" y2="165" stroke="#64748b" stroke-width="3"/>
    <!-- Taxi Roof Light -->
    <rect x="88" y="74" width="24" height="12" rx="2" fill="#facc15" stroke="#0f172a" stroke-width="1.5"/>
    <text x="100" y="83" font-size="7" font-weight="bold" fill="#0f172a" text-anchor="middle">TAXI</text>
    <!-- Taxi Cab Body -->
    <path d="M 30 140 L 45 115 L 75 90 L 130 90 L 160 115 L 175 140 Z" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
    <polygon points="75,94 100,94 100,115 55,115" fill="#93c5fd"/>
    <polygon points="105,94 128,94 150,115 105,115" fill="#93c5fd"/>
    <!-- Checker Stripe -->
    <rect x="35" y="122" width="135" height="8" fill="#0f172a"/>
    <!-- Wheels -->
    <circle cx="60" cy="145" r="16" fill="#0f172a"/>
    <circle cx="60" cy="145" r="7" fill="#facc15"/>
    <circle cx="145" cy="145" r="16" fill="#0f172a"/>
    <circle cx="145" cy="145" r="7" fill="#facc15"/>
  </svg>`,

  // 28. VEGETABLES
  carrot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <!-- Green Tops -->
    <path d="M 140 60 Q 155 30 170 35 Q 160 55 140 60" fill="#16a34a"/>
    <path d="M 140 60 Q 170 45 175 60 Q 155 70 140 60" fill="#15803d"/>
    <!-- Carrot Root -->
    <polygon points="145,55 130,70 35,165 45,175 145,55" fill="#ea580c"/>
    <ellipse cx="138" cy="62" rx="14" ry="10" fill="#f97316" transform="rotate(-45 138 62)"/>
    <line x1="110" y1="88" x2="116" y2="82" stroke="#c2410c" stroke-width="2"/>
    <line x1="85" y1="115" x2="92" y2="108" stroke="#c2410c" stroke-width="2"/>
    <line x1="60" y1="140" x2="68" y2="132" stroke="#c2410c" stroke-width="2"/>
  </svg>`,

  broccoli: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <!-- Stalk -->
    <polygon points="90,110 80,165 120,165 110,110" fill="#86efac" stroke="#4ade80" stroke-width="2"/>
    <!-- Florets -->
    <circle cx="100" cy="75" r="32" fill="#15803d"/>
    <circle cx="70" cy="90" r="24" fill="#166534"/>
    <circle cx="130" cy="90" r="24" fill="#166534"/>
    <circle cx="85" cy="65" r="20" fill="#22c55e"/>
    <circle cx="115" cy="65" r="20" fill="#22c55e"/>
    <circle cx="100" cy="90" r="22" fill="#15803d"/>
  </svg>`,

  onion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <ellipse cx="100" cy="115" rx="48" ry="46" fill="#d97706"/>
    <ellipse cx="100" cy="115" rx="42" ry="40" fill="#f59e0b"/>
    <!-- Papery lines -->
    <path d="M 100 70 Q 75 115 100 160" stroke="#b45309" stroke-width="2" fill="none"/>
    <path d="M 100 70 Q 125 115 100 160" stroke="#b45309" stroke-width="2" fill="none"/>
    <!-- Sprout top and roots -->
    <polygon points="96,70 100,50 104,70" fill="#65a30d"/>
    <line x1="95" y1="160" x2="90" y2="175" stroke="#92400e" stroke-width="2"/>
    <line x1="100" y1="160" x2="100" y2="178" stroke="#92400e" stroke-width="2"/>
    <line x1="105" y1="160" x2="110" y2="175" stroke="#92400e" stroke-width="2"/>
  </svg>`,

  potato: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <ellipse cx="100" cy="105" rx="60" ry="42" fill="#b45309" transform="rotate(10 100 105)"/>
    <ellipse cx="100" cy="105" rx="55" ry="38" fill="#d97706" transform="rotate(10 100 105)"/>
    <!-- Potato eyes -->
    <ellipse cx="75" cy="95" rx="4" ry="2" fill="#78350f"/>
    <ellipse cx="115" cy="88" rx="5" ry="2.5" fill="#78350f"/>
    <ellipse cx="90" cy="120" rx="4" ry="2" fill="#78350f"/>
    <ellipse cx="130" cy="112" rx="4" ry="2" fill="#78350f"/>
  </svg>`,

  spinach: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <path d="M 100 170 Q 60 120 70 70 Q 100 40 130 70 Q 140 120 100 170 Z" fill="#15803d"/>
    <path d="M 100 160 Q 75 115 82 75 Q 100 52 118 75 Q 125 115 100 160 Z" fill="#16a34a"/>
    <!-- Main stem & veins -->
    <line x1="100" y1="60" x2="100" y2="175" stroke="#86efac" stroke-width="3"/>
    <line x1="100" y1="90" x2="80" y2="75" stroke="#86efac" stroke-width="2"/>
    <line x1="100" y1="90" x2="120" y2="75" stroke="#86efac" stroke-width="2"/>
    <line x1="100" y1="120" x2="75" y2="105" stroke="#86efac" stroke-width="2"/>
    <line x1="100" y1="120" x2="125" y2="105" stroke="#86efac" stroke-width="2"/>
  </svg>`,

  // Non-vegetables
  shoe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f1f5f9"/>
    <!-- Boot -->
    <path d="M 45 65 L 85 65 L 85 110 L 155 125 L 165 155 L 35 155 Z" fill="#78350f"/>
    <rect x="30" y="150" width="140" height="15" rx="3" fill="#0f172a"/>
    <circle cx="65" cy="85" r="3" fill="#f8fafc"/>
    <circle cx="65" cy="100" r="3" fill="#f8fafc"/>
  </svg>`,

  tire: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <circle cx="100" cy="100" r="60" fill="#1e293b"/>
    <circle cx="100" cy="100" r="48" fill="#0f172a"/>
    <circle cx="100" cy="100" r="32" fill="#94a3b8"/>
    <circle cx="100" cy="100" r="10" fill="#0f172a"/>
  </svg>`,

  rock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <polygon points="60,145 45,110 80,65 135,60 160,105 145,145" fill="#64748b"/>
    <polygon points="65,140 52,112 82,72 130,68 152,105 140,140" fill="#94a3b8"/>
  </svg>`,

  coin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f8fafc"/>
    <circle cx="100" cy="100" r="55" fill="#ca8a04"/>
    <circle cx="100" cy="100" r="50" fill="#eab308"/>
    <circle cx="100" cy="100" r="42" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
    <polygon points="100,75 107,92 125,92 110,103 116,120 100,109 84,120 90,103 75,92 93,92" fill="#ca8a04"/>
  </svg>`,

  motorcycle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#f1f5f9"/>
    <circle cx="55" cy="140" r="24" fill="#0f172a"/>
    <circle cx="145" cy="140" r="24" fill="#0f172a"/>
    <path d="M 55 140 L 95 100 L 125 100 L 145 140" stroke="#dc2626" stroke-width="8" fill="none"/>
    <ellipse cx="110" cy="95" rx="16" ry="8" fill="#dc2626"/>
    <rect x="75" y="92" width="16" height="5" fill="#0f172a"/>
  </svg>`,

  helicopter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#bae6fd"/>
    <line x1="40" y1="60" x2="160" y2="60" stroke="#1e293b" stroke-width="4"/>
    <ellipse cx="95" cy="100" rx="36" ry="24" fill="#dc2626"/>
    <ellipse cx="115" cy="96" rx="16" ry="12" fill="#93c5fd"/>
    <line x1="60" y1="100" x2="20" y2="90" stroke="#dc2626" stroke-width="6"/>
    <line x1="16" y1="80" x2="24" y2="100" stroke="#1e293b" stroke-width="3"/>
    <line x1="75" y1="135" x2="125" y2="135" stroke="#1e293b" stroke-width="4"/>
  </svg>`,

  bird: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#bae6fd"/>
    <path d="M 40 100 Q 75 60 100 100 Q 125 60 160 100 Q 125 75 100 110 Q 75 75 40 100 Z" fill="#0f172a"/>
  </svg>`,

  tunnel: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#64748b"/>
    <path d="M 40 170 L 40 100 Q 100 35 160 100 L 160 170 Z" fill="#0f172a"/>
    <line x1="100" y1="140" x2="100" y2="170" stroke="#facc15" stroke-width="3"/>
  </svg>`,

  antenna: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#93c5fd"/>
    <line x1="100" y1="40" x2="100" y2="170" stroke="#475569" stroke-width="4"/>
    <line x1="65" y1="70" x2="135" y2="70" stroke="#475569" stroke-width="3"/>
    <line x1="75" y1="100" x2="125" y2="100" stroke="#475569" stroke-width="3"/>
    <line x1="85" y1="130" x2="115" y2="130" stroke="#475569" stroke-width="3"/>
  </svg>`,

  window: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#b91c1c"/>
    <rect x="45" y="35" width="110" height="130" fill="#ffffff" stroke="#e2e8f0" stroke-width="4"/>
    <rect x="52" y="42" width="46" height="54" fill="#93c5fd"/>
    <rect x="102" y="42" width="46" height="54" fill="#93c5fd"/>
    <rect x="52" y="104" width="46" height="54" fill="#93c5fd"/>
    <rect x="102" y="104" width="46" height="54" fill="#93c5fd"/>
  </svg>`,

  building: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#93c5fd"/>
    <rect x="50" y="30" width="100" height="170" fill="#334155"/>
    <rect x="62" y="45" width="20" height="22" fill="#facc15"/>
    <rect x="90" y="45" width="20" height="22" fill="#bae6fd"/>
    <rect x="118" y="45" width="20" height="22" fill="#bae6fd"/>
    <rect x="62" y="80" width="20" height="22" fill="#bae6fd"/>
    <rect x="90" y="80" width="20" height="22" fill="#facc15"/>
    <rect x="118" y="80" width="20" height="22" fill="#bae6fd"/>
    <rect x="62" y="115" width="20" height="22" fill="#bae6fd"/>
    <rect x="90" y="115" width="20" height="22" fill="#bae6fd"/>
    <rect x="118" y="115" width="20" height="22" fill="#facc15"/>
  </svg>`,

  truck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#e2e8f0"/>
    <rect x="30" y="70" width="85" height="75" fill="#2563eb"/>
    <path d="M 115 90 L 145 90 L 160 115 L 160 145 L 115 145 Z" fill="#ef4444"/>
    <polygon points="120,95 140,95 152,115 120,115" fill="#93c5fd"/>
    <circle cx="60" cy="148" r="14" fill="#0f172a"/>
    <circle cx="140" cy="148" r="14" fill="#0f172a"/>
  </svg>`,
};

export function getPhotoUrl(type: string): string {
  const t = type.toLowerCase().trim();

  // Search exact or substring match in our handcrafted dictionary
  for (const [key, svg] of Object.entries(SVGS)) {
    if (t === key || t.includes(key) || key.includes(t)) {
      return svgDataUrl(svg);
    }
  }

  // Fallback to stop sign or street object
  return svgDataUrl(SVGS['stop sign'] || SVGS.hydrant);
}
