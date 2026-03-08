import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Layers, Navigation, MapPin, Search, Shield, X, Send, Crosshair, BadgeCheck } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { getAllReports, addReport, PARTNER_LOCATIONS, type SafetyReport, type PartnerLocation } from '@/lib/store';
import { useLanguage } from '@/i18n/LanguageContext';

const DEFAULT_CENTER: [number, number] = [6.8390, 79.8660];

const PARTNER_TYPE_LABELS: Record<string, string> = {
  cafe: '☕ Café',
  pharmacy: '💊 Pharmacy',
  store: '🏪 Store',
  'safe-space': '🛡️ Safe Space',
};

export default function MapPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const partnerLayer = useRef<L.LayerGroup | null>(null);
  const heatLayer = useRef<L.Layer | null>(null);
  const routeLayer = useRef<L.LayerGroup | null>(null);

  const [reports, setReports] = useState<SafetyReport[]>(getAllReports());
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<PartnerLocation | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [showRoutePanel, setShowRoutePanel] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routeInfo, setRouteInfo] = useState<{ safety: number; distance: string; time: string } | null>(null);

  const [reportPopup, setReportPopup] = useState<{ lat: number; lng: number } | null>(null);
  const [reportRating, setReportRating] = useState<'safe' | 'moderate' | 'unsafe' | null>(null);
  const [reportDesc, setReportDesc] = useState('');

  const RATING_CONFIG = {
    safe: { color: '#22c55e', label: t('safe'), icon: '🟢' },
    moderate: { color: '#eab308', label: t('moderate'), icon: '🟡' },
    unsafe: { color: '#ef4444', label: t('unsafe'), icon: '🔴' },
  };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, { center: DEFAULT_CENTER, zoom: 13, zoomControl: false, attributionControl: false });

    const isDark = document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('light');
    const tileUrl = isDark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);
    L.control.attribution({ position: 'bottomleft', prefix: '' }).addTo(map);

    markersLayer.current = L.layerGroup().addTo(map);
    partnerLayer.current = L.layerGroup().addTo(map);
    routeLayer.current = L.layerGroup().addTo(map);
    mapInstance.current = map;

    let pressTimer: ReturnType<typeof setTimeout>;
    map.on('mousedown', (e: L.LeafletMouseEvent) => {
      pressTimer = setTimeout(() => setReportPopup({ lat: e.latlng.lat, lng: e.latlng.lng }), 600);
    });
    map.on('mouseup', () => clearTimeout(pressTimer));
    map.on('mousemove', () => clearTimeout(pressTimer));
    map.on('contextmenu', (e: L.LeafletMouseEvent) => {
      e.originalEvent.preventDefault();
      setReportPopup({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(latlng);
        map.setView(latlng, 14);
        const pulseIcon = L.divIcon({
          className: '',
          html: `<div style="width:20px;height:20px;border-radius:50%;background:hsl(270,70%,55%);border:3px solid white;box-shadow:0 0 15px rgba(139,92,246,0.6);"></div>`,
          iconSize: [20, 20], iconAnchor: [10, 10],
        });
        L.marker(latlng, { icon: pulseIcon }).addTo(map).bindTooltip(t('you_are_here'), { direction: 'top', offset: [0, -12] });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 5000 }
    );

    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  const updateMarkers = useCallback(() => {
    if (!markersLayer.current) return;
    markersLayer.current.clearLayers();
    reports.forEach((report) => {
      const cfg = RATING_CONFIG[report.rating];
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${cfg.color};border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 8px ${cfg.color}80;cursor:pointer;"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7],
      });
      const marker = L.marker([report.lat, report.lng], { icon }).addTo(markersLayer.current!);
      marker.on('click', () => { setSelectedReport(report); setSelectedPartner(null); });
    });
  }, [reports]);

  const updatePartnerMarkers = useCallback(() => {
    if (!partnerLayer.current) return;
    partnerLayer.current.clearLayers();
    PARTNER_LOCATIONS.forEach((loc) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:18px;height:18px;border-radius:50%;background:#3b82f6;border:2px solid white;box-shadow:0 0 10px rgba(59,130,246,0.5);cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>`,
        iconSize: [18, 18], iconAnchor: [9, 9],
      });
      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(partnerLayer.current!);
      marker.on('click', () => { setSelectedPartner(loc); setSelectedReport(null); });
    });
  }, []);

  useEffect(() => { updateMarkers(); }, [updateMarkers]);
  useEffect(() => { updatePartnerMarkers(); }, [updatePartnerMarkers]);

  useEffect(() => {
    if (!mapInstance.current) return;
    if (heatLayer.current) { mapInstance.current.removeLayer(heatLayer.current); heatLayer.current = null; }
    if (showHeatmap) {
      const unsafeReports = reports.filter((r) => r.rating === 'unsafe' || r.rating === 'moderate');
      const heatData: [number, number, number][] = unsafeReports.map((r) => [r.lat, r.lng, r.rating === 'unsafe' ? 1.0 : 0.5]);
      if (heatData.length > 0) {
        heatLayer.current = L.heatLayer(heatData, {
          radius: 35, blur: 25, maxZoom: 17,
          gradient: { 0.2: '#22c55e', 0.5: '#eab308', 0.8: '#f97316', 1.0: '#ef4444' },
        }).addTo(mapInstance.current);
      }
    }
  }, [showHeatmap, reports]);

  const findRoute = () => {
    if (!mapInstance.current || !routeLayer.current) return;
    routeLayer.current.clearLayers();
    const start = userPos || DEFAULT_CENTER;
    const end: [number, number] = [start[0] + 0.015, start[1] + 0.02];
    const points: [number, number][] = [start, [start[0] + 0.004, start[1] + 0.006], [start[0] + 0.008, start[1] + 0.01], [start[0] + 0.011, start[1] + 0.014], end];
    const safetyScore = Math.floor(Math.random() * 30) + 65;
    const routeColor = safetyScore >= 80 ? '#22c55e' : safetyScore >= 60 ? '#eab308' : '#ef4444';
    L.polyline(points, { color: routeColor, weight: 5, opacity: 0.8, dashArray: '10, 8' }).addTo(routeLayer.current);
    const startIcon = L.divIcon({ className: '', html: `<div style="width:12px;height:12px;border-radius:50%;background:#22c55e;border:3px solid white;box-shadow:0 0 6px rgba(34,197,94,0.5);"></div>`, iconSize: [12, 12], iconAnchor: [6, 6] });
    const endIcon = L.divIcon({ className: '', html: `<div style="width:12px;height:12px;border-radius:50%;background:#8b5cf6;border:3px solid white;box-shadow:0 0 6px rgba(139,92,246,0.5);"></div>`, iconSize: [12, 12], iconAnchor: [6, 6] });
    L.marker(start, { icon: startIcon }).addTo(routeLayer.current);
    L.marker(end, { icon: endIcon }).addTo(routeLayer.current);
    mapInstance.current.fitBounds(L.latLngBounds(points), { padding: [50, 50] });
    setRouteInfo({ safety: safetyScore, distance: `${(Math.random() * 3 + 1).toFixed(1)} km`, time: `${Math.floor(Math.random() * 20 + 10)} min` });
  };

  const submitMapReport = () => {
    if (!reportPopup || !reportRating) return;
    const newReport = addReport({ lat: reportPopup.lat, lng: reportPopup.lng, rating: reportRating, description: reportDesc.trim() });
    setReports([...reports, newReport]);
    setReportPopup(null);
    setReportRating(null);
    setReportDesc('');
  };

  const centerOnUser = () => {
    if (userPos && mapInstance.current) mapInstance.current.setView(userPos, 15, { animate: true });
  };

  const ratingButtons = [
    { value: 'safe' as const, label: t('safe'), cls: 'bg-safora-green/20 text-safora-green border-safora-green' },
    { value: 'moderate' as const, label: t('moderate'), cls: 'bg-safora-yellow/20 text-safora-yellow border-safora-yellow' },
    { value: 'unsafe' as const, label: t('unsafe'), cls: 'bg-safora-red/20 text-safora-red border-safora-red' },
  ];

  return (
    <div className="fixed inset-0 z-40 bg-background">
      <div ref={mapRef} className="absolute inset-0" />

      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 flex items-center gap-2" style={{ paddingTop: 'env(safe-area-inset-top, 16px)' }}>
        <button onClick={() => navigate('/')} className="glass-card-strong p-2.5 rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex-1 glass-card-strong rounded-xl flex items-center px-3 gap-2">
          <Search size={16} className="text-muted-foreground" />
          <input placeholder={t('search_location')} className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground py-2.5 text-sm outline-none" />
        </div>
      </div>

      <div className="absolute right-4 top-20 z-[1000] flex flex-col gap-2" style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}>
        <button onClick={() => setShowHeatmap(!showHeatmap)} className={`glass-card-strong p-3 rounded-xl transition-colors ${showHeatmap ? 'border-primary/60' : ''}`}>
          <Layers size={18} className={showHeatmap ? 'text-primary' : 'text-foreground'} />
        </button>
        <button onClick={() => setShowRoutePanel(!showRoutePanel)} className={`glass-card-strong p-3 rounded-xl transition-colors ${showRoutePanel ? 'border-primary/60' : ''}`}>
          <Navigation size={18} className={showRoutePanel ? 'text-primary' : 'text-foreground'} />
        </button>
        <button onClick={centerOnUser} className="glass-card-strong p-3 rounded-xl">
          <Crosshair size={18} className="text-foreground" />
        </button>
      </div>

      <div className="absolute left-4 bottom-24 z-[1000] glass-card-strong p-3 rounded-xl">
        <p className="text-[10px] text-muted-foreground mb-2 font-medium">{t('safety')}</p>
        {Object.entries(RATING_CONFIG).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2 mb-1 last:mb-0">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color }} />
            <span className="text-[10px] text-foreground">{cfg.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-[10px] text-foreground">{t('partner')}</span>
        </div>
        <p className="text-[9px] text-muted-foreground mt-2">{t('long_press_report')}</p>
      </div>

      <AnimatePresence>
        {showRoutePanel && (
          <motion.div initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }}
            className="absolute top-20 left-4 right-14 z-[1000] glass-card-strong p-4 rounded-xl" style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-safora-green" />
              <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder={t('start_point')} className="flex-1 bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-lg px-3 py-2 text-sm outline-none" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <input value={to} onChange={(e) => setTo(e.target.value)} placeholder={t('destination')} className="flex-1 bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-lg px-3 py-2 text-sm outline-none" />
            </div>
            <button onClick={findRoute} className="w-full gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl text-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
              <Navigation size={14} /> {t('find_safest_route')}
            </button>
            {routeInfo && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex items-center gap-3 text-xs">
                <span className={`font-bold ${routeInfo.safety >= 80 ? 'text-safora-green' : routeInfo.safety >= 60 ? 'text-safora-yellow' : 'text-safora-red'}`}>
                  {t('safety')}: {routeInfo.safety}%
                </span>
                <span className="text-muted-foreground">{routeInfo.distance}</span>
                <span className="text-muted-foreground">{routeInfo.time}</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedReport && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-24 left-4 right-4 z-[1000] glass-card-strong p-4 rounded-2xl">
            <button onClick={() => setSelectedReport(null)} className="absolute top-3 right-3 text-muted-foreground"><X size={16} /></button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: RATING_CONFIG[selectedReport.rating].color + '20' }}>
                {RATING_CONFIG[selectedReport.rating].icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{RATING_CONFIG[selectedReport.rating].label}</p>
                <p className="text-[10px] text-muted-foreground">{selectedReport.lat.toFixed(4)}, {selectedReport.lng.toFixed(4)}</p>
              </div>
            </div>
            {selectedReport.description && <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{selectedReport.description}</p>}
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span>📋 {Math.floor(Math.random() * 10 + 1)} {t('reports')}</span>
              <span>🕐 {new Date(selectedReport.timestamp).toLocaleDateString()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPartner && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-24 left-4 right-4 z-[1000] glass-card-strong p-4 rounded-2xl">
            <button onClick={() => setSelectedPartner(null)} className="absolute top-3 right-3 text-muted-foreground"><X size={16} /></button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Shield size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{selectedPartner.name}</p>
                <p className="text-[10px] text-muted-foreground">{PARTNER_TYPE_LABELS[selectedPartner.type]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck size={14} className="text-blue-500" />
              <span className="text-xs font-semibold text-blue-500">{t('verified_safe_location')}</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span>⭐ {selectedPartner.safetyRating}/5.0 {t('safety')}</span>
              <span className="text-muted-foreground/60">{t('sponsored')}: {selectedPartner.sponsor}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reportPopup && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-24 left-4 right-4 z-[1000] glass-card-strong p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <p className="text-sm font-semibold text-foreground">{t('report_this_area')}</p>
              </div>
              <button onClick={() => { setReportPopup(null); setReportRating(null); setReportDesc(''); }} className="text-muted-foreground"><X size={16} /></button>
            </div>
            <p className="text-[10px] text-muted-foreground mb-3">{reportPopup.lat.toFixed(4)}, {reportPopup.lng.toFixed(4)}</p>
            <div className="flex gap-2 mb-3">
              {ratingButtons.map((r) => (
                <button key={r.value} onClick={() => setReportRating(r.value)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border-2 transition-all ${reportRating === r.value ? r.cls : 'border-border text-muted-foreground'}`}>
                  {r.label}
                </button>
              ))}
            </div>
            <textarea value={reportDesc} onChange={(e) => setReportDesc(e.target.value)} placeholder={t('optional_describe')}
              rows={2} maxLength={300} className="w-full bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/50 resize-none mb-3" />
            <button onClick={submitMapReport} disabled={!reportRating}
              className="w-full gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40 active:scale-[0.98] transition-transform">
              <Send size={14} /> {t('submit_report')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
