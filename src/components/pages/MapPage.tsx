import React, { useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { motion, AnimatePresence } from "motion/react";
import "leaflet/dist/leaflet.css";
import { type Language, getTranslation } from '../../utils/translations';

// Fix default marker icons for Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface RecyclingPoint {
  id: number;
  title: string;
  address: string;
  hours: string;
  type: "plastic" | "paper" | "metal" | "glass" | "general";
  lat: number;
  lng: number;
}

interface MapPageProps {
  isDarkMode: boolean;
  language: Language;
}

export function MapPage({ isDarkMode, language }: MapPageProps) {
  const t = (key: keyof typeof import('../../utils/translations').translations.az) => getTranslation(language, key);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "plastic",
    "paper",
    "metal",
    "glass",
    "general",
  ]);
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const recyclingPoints: RecyclingPoint[] = [
    {
      id: 1,
      title: "Plastik Təkrar Emal Mərkəzi",
      address: "Nizami küçəsi 12, Bakı",
      hours: "09:00 - 18:00",
      type: "plastic",
      lat: 40.4093,
      lng: 49.8671,
    },
    {
      id: 2,
      title: "Kağız Mərkəzi",
      address: "28 May küçəsi 45, Bakı",
      hours: "08:00 - 20:00",
      type: "paper",
      lat: 40.3953,
      lng: 49.8822,
    },
    {
      id: 3,
      title: "Metal Toplanma Mərkəzi",
      address: "Azadlıq prospekti 89, Bakı",
      hours: "10:00 - 17:00",
      type: "metal",
      lat: 40.3777,
      lng: 49.892,
    },
    {
      id: 4,
      title: "Şüşə Təkrar Emalı",
      address: "Neftçilər prospekti 23, Bakı",
      hours: "09:00 - 19:00",
      type: "glass",
      lat: 40.3669,
      lng: 49.835,
    },
    {
      id: 5,
      title: "Ümumi Tullantı Mərkəzi",
      address: "Həzi Aslanov küçəsi 7, Bakı",
      hours: "24 saat",
      type: "general",
      lat: 40.4125,
      lng: 49.8439,
    },
  ];

  const filters = [
    { value: "plastic", label: "Plastik", color: "#FFD700" },
    { value: "paper", label: "Kağız", color: "#00C57A" },
    { value: "metal", label: "Metal", color: "#808080" },
    { value: "glass", label: "Şüşə", color: "#4169E1" },
    { value: "general", label: "Ümumi", color: "#FFFFFF" },
  ];

  const getMarkerIcon = (type: string) => {
    const filterColor = filters.find((f) => f.value === type)?.color || "#00C57A";

    return new Icon({
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAzMiIgZmlsbD0i" +
        encodeURIComponent(filterColor) +
        '"><path d="M12 0C6.48 0 2 4.48 2 10c0 5.9 3 10.38 10 22.18C19 20.38 22 15.9 22 10 22 4.48 17.52 0 12 0z"/></svg>',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });
  };

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value]
    );
  };

  const filteredPoints = recyclingPoints.filter(
    (point) =>
      selectedFilters.includes(point.type) &&
      (searchQuery === "" ||
        point.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        point.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] flex flex-col md:flex-row ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      {/* Sidebar */}
      <motion.div 
        className={`w-full md:w-[280px] lg:w-[320px] p-4 sm:p-6 overflow-y-auto border-r transition-colors ${isDarkMode ? 'bg-[#1A2324] border-[#2F3B3C]' : 'bg-gray-50 border-gray-200'}`}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t('filterByType')}</h3>

        <motion.div 
          className="mb-6 relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'az' ? 'Ünvan ilə axtar...' : language === 'en' ? 'Search by address...' : 'Поиск по адресу...'}
            className={`w-full ${isDarkMode ? 'bg-[#2F3B3C] text-[#E1E1E1]' : 'bg-white text-[#101415] border border-gray-300'} px-4 py-3 pl-10 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all`}
          />
          <Search
            size={16}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-400'} opacity-50`}
          />
        </motion.div>

        <div className="space-y-3">
          {filters.map((f, index) => (
            <motion.label
              key={f.value}
              className="flex items-center gap-3 cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <input
                type="checkbox"
                checked={selectedFilters.includes(f.value)}
                onChange={() => toggleFilter(f.value)}
                className="w-5 h-5 rounded accent-[#00C57A]"
              />
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor: f.color,
                    borderColor: f.color,
                  }}
                  whileHover={{ scale: 1.2 }}
                />
                <span className={`group-hover:text-[#00C57A] transition-colors ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {f.label}
                </span>
              </div>
            </motion.label>
          ))}
        </div>

        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
            {language === 'az' ? 'Nəticələr' : language === 'en' ? 'Results' : 'Результаты'} ({filteredPoints.length})
          </h3>

          <div className="space-y-3">
            {filteredPoints.map((point, index) => (
              <motion.button
                key={point.id}
                onClick={() => setSelectedPoint(point)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedPoint?.id === point.id
                    ? "bg-[#00C57A] bg-opacity-20 border border-[#00C57A]"
                    : isDarkMode ? "bg-[#2F3B3C] hover:bg-opacity-80" : "bg-white border border-gray-200 hover:border-[#00C57A]"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-2">
                  <MapPin className="text-[#00C57A] mt-1 flex-shrink-0" size={16} />
                  <div>
                    <div className={`mb-1 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{point.title}</div>
                    <div className={`opacity-60 text-[11px] ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-600'}`}>
                      {point.address}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Map */}
      <motion.div 
        className="flex-1 relative min-h-[400px] md:min-h-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <MapContainer
          center={[40.4093, 49.8671]}
          zoom={12}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredPoints.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={getMarkerIcon(point.type)}
              eventHandlers={{
                click: () => setSelectedPoint(point),
              }}
            >
              <Popup>
                <strong>{point.title}</strong>
                <br />
                {point.address}
                <br />
                🕐 {point.hours}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <AnimatePresence>
          {selectedPoint && (
            <motion.div 
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md rounded-[16px] p-6 shadow-lg z-[1000] ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedPoint(null)}
                className={`absolute top-4 right-4 transition-colors ${isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-600 hover:text-[#00C57A]'}`}
              >
                <X size={20} />
              </button>

              <h3 className={`mb-3 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{selectedPoint.title}</h3>
              <div className={`space-y-2 opacity-80 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                <div className="flex items-start gap-2">
                  <MapPin className="text-[#00C57A] mt-0.5 flex-shrink-0" size={16} />
                  {selectedPoint.address}
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00C57A]">🕐</span>
                  {selectedPoint.hours}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
