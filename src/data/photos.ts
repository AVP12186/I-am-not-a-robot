// High-Resolution Photographic Library for CAPTCHA Objects
// Real camera photography for reCAPTCHA challenges

const PHOTO_MAP: Record<string, string> = {
  // Vegetables & Produce
  carrot: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&auto=format&fit=crop&q=80',
  tomato: 'https://images.unsplash.com/photo-1546470427-227c7369a9b7?w=400&auto=format&fit=crop&q=80',
  broccoli: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&auto=format&fit=crop&q=80',
  avocado: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop&q=80',
  onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80',
  cucumber: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?w=400&auto=format&fit=crop&q=80',
  potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80',
  eggplant: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&auto=format&fit=crop&q=80',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80',

  // Bakery & Food
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80',
  bread: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
  loaf: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
  bagel: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&auto=format&fit=crop&q=80',
  donut: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80',
  muffin: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&auto=format&fit=crop&q=80',
  'fried chicken': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&auto=format&fit=crop&q=80',
  'ice cream': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&auto=format&fit=crop&q=80',
  cookies: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&auto=format&fit=crop&q=80',

  // Animals
  chihuahua: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
  dog: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80',
  puppy: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80',
  'shar pei': 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80',
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
  sloth: 'https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=400&auto=format&fit=crop&q=80',
  seal: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&auto=format&fit=crop&q=80',
  owl: 'https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=400&auto=format&fit=crop&q=80',

  // City Infrastructure & Transport
  'stop sign': 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400&auto=format&fit=crop&q=80',
  stop: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400&auto=format&fit=crop&q=80',
  'traffic light': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80',
  traffic: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80',
  hydrant: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop&q=80',
  crosswalk: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
  bicycle: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80',
  bike: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80',
  motorcycle: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80',
  bus: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
  train: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&auto=format&fit=crop&q=80',
  bridge: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
  boat: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
  sail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
  plane: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&auto=format&fit=crop&q=80',
  airplane: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&auto=format&fit=crop&q=80',
  meter: 'https://images.unsplash.com/photo-1584463699044-884d59a2f7c0?w=400&auto=format&fit=crop&q=80',
  parking: 'https://images.unsplash.com/photo-1584463699044-884d59a2f7c0?w=400&auto=format&fit=crop&q=80',
  chimney: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
  taxi: 'https://images.unsplash.com/photo-1549558549-415fe4c37b60?w=400&auto=format&fit=crop&q=80',
  cone: 'https://images.unsplash.com/photo-1584463699044-884d59a2f7c0?w=400&auto=format&fit=crop&q=80',
  firetruck: 'https://images.unsplash.com/photo-1584463699044-884d59a2f7c0?w=400&auto=format&fit=crop&q=80',
  helicopter: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&auto=format&fit=crop&q=80',
  tunnel: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=400&auto=format&fit=crop&q=80',
  subway: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=400&auto=format&fit=crop&q=80',

  // Distractors
  bench: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400&auto=format&fit=crop&q=80',
  trash: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&auto=format&fit=crop&q=80',
  box: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&auto=format&fit=crop&q=80',
  mailbox: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=400&auto=format&fit=crop&q=80',
  rock: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
  tire: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&auto=format&fit=crop&q=80',
  shoe: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
  coin: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&auto=format&fit=crop&q=80',
  mop: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
  lamp: 'https://images.unsplash.com/photo-1541888946425-d0fbb1866571?w=400&auto=format&fit=crop&q=80',
  wall: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
  tree: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&auto=format&fit=crop&q=80',
  sign: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop&q=80',
  chicken: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&auto=format&fit=crop&q=80',
};

export function getPhotoUrl(type: string): string {
  const t = type.toLowerCase().trim();

  // Search dictionary keys
  for (const [key, url] of Object.entries(PHOTO_MAP)) {
    if (t.includes(key)) {
      return url;
    }
  }

  // High quality street default
  return 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=400&auto=format&fit=crop&q=80';
}
