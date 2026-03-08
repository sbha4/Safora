// Simple localStorage-based store for hackathon prototype

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface SafetyReport {
  id: string;
  lat: number;
  lng: number;
  rating: 'safe' | 'moderate' | 'unsafe';
  description: string;
  timestamp: number;
  userId: string;
}

export interface SOSEvent {
  id: string;
  lat: number;
  lng: number;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  points: number;
  reportsSubmitted: number;
  routesRated: number;
  verificationsCount: number;
  isPremium: boolean;
}

export interface PartnerLocation {
  id: string;
  name: string;
  type: 'cafe' | 'pharmacy' | 'store' | 'safe-space';
  lat: number;
  lng: number;
  safetyRating: number;
  sponsor: string;
}

export const LEVELS = [
  { name: 'Explorer', minPoints: 0, icon: '🔍' },
  { name: 'Guardian', minPoints: 50, icon: '🛡️' },
  { name: 'Protector', minPoints: 150, icon: '⚔️' },
  { name: 'Safety Champion', minPoints: 500, icon: '👑' },
];

export const REWARDS = [
  { id: '1', name: 'Safora Sticker Pack', points: 30, image: '🎨', category: 'Merchandise' },
  { id: '2', name: 'Safety Whistle', points: 75, image: '📣', category: 'Safety' },
  { id: '3', name: 'Safora T-Shirt', points: 150, image: '👕', category: 'Merchandise' },
  { id: '4', name: 'Personal Alarm Device', points: 200, image: '🚨', category: 'Safety' },
  { id: '5', name: 'Rs.500 Café Coupon', points: 100, image: '☕', category: 'Discount' },
  { id: '6', name: 'Pepper Spray Kit', points: 250, image: '🧴', category: 'Safety' },
  { id: '7', name: 'PickMe Ride Voucher', points: 120, image: '🚗', category: 'Discount' },
  { id: '8', name: 'Safora Tote Bag', points: 180, image: '👜', category: 'Merchandise' },
  { id: '9', name: 'Partner Café Rs.300 Off', points: 60, image: '🎟️', category: 'Discount' },
];

export const SAFETY_SHOP = [
  { id: 's1', name: 'Personal Safety Alarm', price: 'Rs.1,200', rating: 4.8, image: '🚨', partner: 'SafeGuard LK' },
  { id: 's2', name: 'LED Safety Flashlight', price: 'Rs.850', rating: 4.6, image: '🔦', partner: 'BrightPath' },
  { id: 's3', name: 'GPS Safety Keychain', price: 'Rs.3,500', rating: 4.9, image: '📍', partner: 'TrackSafe' },
  { id: 's4', name: 'Pepper Spray (Legal)', price: 'Rs.1,800', rating: 4.7, image: '🧴', partner: 'DefendHer LK' },
  { id: 's5', name: 'Safety Whistle Bracelet', price: 'Rs.650', rating: 4.5, image: '📿', partner: 'SafeStyle' },
  { id: 's6', name: 'Emergency Power Bank', price: 'Rs.2,200', rating: 4.4, image: '🔋', partner: 'ChargeSafe' },
];

export const PARTNER_LOCATIONS: PartnerLocation[] = [
  { id: 'p1', name: 'Café Kumbuk', type: 'cafe', lat: 6.8395, lng: 79.8665, safetyRating: 4.9, sponsor: 'Café Kumbuk' },
  { id: 'p2', name: 'Osu Sala Pharmacy', type: 'pharmacy', lat: 6.8370, lng: 79.8640, safetyRating: 4.8, sponsor: 'Osu Sala' },
  { id: 'p3', name: 'Cargills Food City', type: 'store', lat: 6.8410, lng: 79.8620, safetyRating: 4.7, sponsor: 'Cargills' },
  { id: 'p4', name: 'Women Safe Space - ML', type: 'safe-space', lat: 6.8350, lng: 79.8680, safetyRating: 5.0, sponsor: 'Safora Foundation' },
  { id: 'p5', name: 'Barista Coffee', type: 'cafe', lat: 6.9080, lng: 79.8610, safetyRating: 4.6, sponsor: 'Barista' },
  { id: 'p6', name: 'Guardian Pharmacy', type: 'pharmacy', lat: 6.9350, lng: 79.8440, safetyRating: 4.8, sponsor: 'Guardian' },
  { id: 'p7', name: 'Keells Super', type: 'store', lat: 6.8520, lng: 79.8640, safetyRating: 4.5, sponsor: 'Keells' },
  { id: 'p8', name: 'Safe Haven Colombo 7', type: 'safe-space', lat: 6.9100, lng: 79.8580, safetyRating: 5.0, sponsor: 'Safora Foundation' },
];

const LEADERBOARD_MOCK = [
  { name: 'Nishadi F.', points: 620, reports: 45, isPremium: true },
  { name: 'Tharushi W.', points: 480, reports: 38, isPremium: false },
  { name: 'Amaya P.', points: 390, reports: 29, isPremium: true },
  { name: 'Fathima Z.', points: 310, reports: 22, isPremium: false },
  { name: 'Kavindya S.', points: 250, reports: 18, isPremium: false },
  { name: 'Meenakshi R.', points: 190, reports: 14, isPremium: true },
  { name: 'Shanelle D.', points: 140, reports: 10, isPremium: false },
  { name: 'Hiruni J.', points: 95, reports: 7, isPremium: false },
];

// Demo safety reports for Mount Lavinia, Colombo & surrounding areas, Sri Lanka
export const DEMO_REPORTS: SafetyReport[] = [
  { id: 'ml1', lat: 6.8390, lng: 79.8660, rating: 'safe', description: 'Mount Lavinia Hotel beach front – always busy with tourists and well-lit', timestamp: Date.now() - 86400000, userId: 'demo' },
  { id: 'ml2', lat: 6.8365, lng: 79.8635, rating: 'safe', description: 'Galle Road near Mount Lavinia junction – busy main road, police post nearby', timestamp: Date.now() - 172800000, userId: 'demo' },
  { id: 'ml3', lat: 6.8420, lng: 79.8690, rating: 'moderate', description: 'Beach stretch past the hotel – dimly lit after 8 PM', timestamp: Date.now() - 259200000, userId: 'demo' },
  { id: 'ml4', lat: 6.8340, lng: 79.8610, rating: 'unsafe', description: 'Railway crossing area near station – poor lighting, isolated at night', timestamp: Date.now() - 345600000, userId: 'demo' },
  { id: 'ml5', lat: 6.8450, lng: 79.8720, rating: 'safe', description: 'De Saram Road residential area – quiet but well-lit neighborhood', timestamp: Date.now() - 432000000, userId: 'demo' },
  { id: 'ml6', lat: 6.8310, lng: 79.8580, rating: 'moderate', description: 'Back lanes behind Galle Road – narrow, moderate foot traffic', timestamp: Date.now() - 100000, userId: 'demo' },
  { id: 'ml7', lat: 6.8475, lng: 79.8645, rating: 'safe', description: 'Near St. Thomas College – security guards, CCTV cameras', timestamp: Date.now() - 200000, userId: 'demo' },
  { id: 'ml8', lat: 6.8295, lng: 79.8670, rating: 'unsafe', description: 'Isolated stretch near railway tracks – avoid after dark', timestamp: Date.now() - 300000, userId: 'demo' },
  { id: 'ml9', lat: 6.8380, lng: 79.8710, rating: 'moderate', description: 'Beach road towards Dehiwala – some stray dogs, moderate lighting', timestamp: Date.now() - 400000, userId: 'demo' },
  { id: 'ml10', lat: 6.8430, lng: 79.8600, rating: 'safe', description: 'Supermarket area on Galle Road – always crowded and safe', timestamp: Date.now() - 500000, userId: 'demo' },
  { id: 'dh1', lat: 6.8510, lng: 79.8630, rating: 'safe', description: 'Dehiwala Zoo entrance – busy area, well patrolled', timestamp: Date.now() - 86400000, userId: 'demo' },
  { id: 'dh2', lat: 6.8550, lng: 79.8680, rating: 'moderate', description: 'Dehiwala canal road – quiet after 9 PM', timestamp: Date.now() - 172800000, userId: 'demo' },
  { id: 'dh3', lat: 6.8480, lng: 79.8560, rating: 'unsafe', description: 'Under the railway bridge – very dark at night', timestamp: Date.now() - 259200000, userId: 'demo' },
  { id: 'cf1', lat: 6.9340, lng: 79.8428, rating: 'safe', description: 'Colombo Fort area – commercial hub, heavy police presence', timestamp: Date.now() - 86400000, userId: 'demo' },
  { id: 'cf2', lat: 6.9390, lng: 79.8510, rating: 'moderate', description: 'Pettah market – very crowded, watch your belongings', timestamp: Date.now() - 172800000, userId: 'demo' },
  { id: 'cf3', lat: 6.9420, lng: 79.8560, rating: 'unsafe', description: 'Back alleys behind Pettah bus stand – avoid at night', timestamp: Date.now() - 259200000, userId: 'demo' },
  { id: 'c7a', lat: 6.9070, lng: 79.8615, rating: 'safe', description: 'Independence Square – well-maintained, jogging area, safe', timestamp: Date.now() - 86400000, userId: 'demo' },
  { id: 'c7b', lat: 6.9110, lng: 79.8570, rating: 'safe', description: 'Viharamahadevi Park – families and joggers, good lighting', timestamp: Date.now() - 172800000, userId: 'demo' },
  { id: 'bw1', lat: 6.8870, lng: 79.8560, rating: 'safe', description: 'Bambalapitiya junction – busy with shops and three-wheelers', timestamp: Date.now() - 86400000, userId: 'demo' },
  { id: 'bw2', lat: 6.8740, lng: 79.8590, rating: 'moderate', description: 'Wellawatte beach road – moderate lighting, some loitering', timestamp: Date.now() - 172800000, userId: 'demo' },
  { id: 'bw3', lat: 6.8780, lng: 79.8520, rating: 'unsafe', description: 'Side lanes off Galle Road in Wellawatte – poorly lit', timestamp: Date.now() - 259200000, userId: 'demo' },
  { id: 'ng1', lat: 6.8720, lng: 79.8890, rating: 'safe', description: 'Nugegoda Super Market junction – always busy and safe', timestamp: Date.now() - 86400000, userId: 'demo' },
  { id: 'ng2', lat: 6.8690, lng: 79.8930, rating: 'moderate', description: 'Stanley Thilakaratne Mawatha – moderate after dark', timestamp: Date.now() - 172800000, userId: 'demo' },
  { id: 'rm1', lat: 6.8220, lng: 79.8780, rating: 'safe', description: 'Near Ratmalana Airport – security presence, well-lit road', timestamp: Date.now() - 86400000, userId: 'demo' },
  { id: 'rm2', lat: 6.8180, lng: 79.8650, rating: 'unsafe', description: 'Isolated lane near Ratmalana railway halt – no streetlights', timestamp: Date.now() - 172800000, userId: 'demo' },
  { id: 'mr1', lat: 6.7730, lng: 79.8810, rating: 'safe', description: 'University of Moratuwa area – security patrols, student-friendly', timestamp: Date.now() - 86400000, userId: 'demo' },
  { id: 'mr2', lat: 6.7800, lng: 79.8760, rating: 'moderate', description: 'Moratuwa town center – crowded market, watch belongings', timestamp: Date.now() - 172800000, userId: 'demo' },
];

function getItem<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function setItem(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getContacts(): Contact[] {
  return getItem('safora_contacts', []);
}

export function saveContact(c: Omit<Contact, 'id'>): Contact {
  const contacts = getContacts();
  const newContact = { ...c, id: crypto.randomUUID() };
  contacts.push(newContact);
  setItem('safora_contacts', contacts);
  return newContact;
}

export function deleteContact(id: string) {
  setItem('safora_contacts', getContacts().filter(c => c.id !== id));
}

export function getReports(): SafetyReport[] {
  return getItem('safora_reports', []);
}

export function getAllReports(): SafetyReport[] {
  return [...DEMO_REPORTS, ...getReports()];
}

export function addReport(r: Omit<SafetyReport, 'id' | 'timestamp' | 'userId'>): SafetyReport {
  const reports = getReports();
  const newReport = { ...r, id: crypto.randomUUID(), timestamp: Date.now(), userId: 'user1' };
  reports.push(newReport);
  setItem('safora_reports', reports);
  addPoints(10);
  incrementStat('reportsSubmitted');
  return newReport;
}

export function getSOSEvents(): SOSEvent[] {
  return getItem('safora_sos', []);
}

export function addSOSEvent(lat: number, lng: number): SOSEvent {
  const events = getSOSEvents();
  const e = { id: crypto.randomUUID(), lat, lng, timestamp: Date.now() };
  events.push(e);
  setItem('safora_sos', events);
  return e;
}

export function getProfile(): UserProfile {
  return getItem('safora_profile', { name: 'User', points: 0, reportsSubmitted: 0, routesRated: 0, verificationsCount: 0, isPremium: false });
}

export function setPremium(value: boolean) {
  const p = getProfile();
  p.isPremium = value;
  setItem('safora_profile', p);
}

export function addPoints(n: number) {
  const p = getProfile();
  p.points += n;
  setItem('safora_profile', p);
}

export function incrementStat(key: 'reportsSubmitted' | 'routesRated' | 'verificationsCount') {
  const p = getProfile();
  p[key] += 1;
  setItem('safora_profile', p);
}

export function getUserLevel(points: number) {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (points >= l.minPoints) level = l;
  }
  return level;
}

export function getLeaderboard() {
  const profile = getProfile();
  const all = [...LEADERBOARD_MOCK, { name: 'You', points: profile.points, reports: profile.reportsSubmitted, isPremium: profile.isPremium }];
  return all.sort((a, b) => b.points - a.points);
}
