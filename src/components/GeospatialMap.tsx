"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiMapPin, FiStar, FiBookOpen, FiUser, FiAward } from 'react-icons/fi';
import { FaGraduationCap, FaMale, FaFemale } from 'react-icons/fa';

// Fix for default markers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WidyaiswaraData {
  id: number;
  nama: string;
  jenjang: string;
  gender: string;
  provinsi: string;
  kota: string;
  umur: number;
  pengalaman: number;
  totalPelatihan: number;
  rating: number;
  spesialisasi: string;
  lat: number;
  lng: number;
}

interface GeospatialMapProps {
  data: WidyaiswaraData[];
  onProvinceSelect?: (province: string) => void;
  selectedProvince?: string;
  height?: string;
}

// Color mapping for different levels
const JENJANG_COLORS = {
  "Pertama": "#3b82f6",  // blue
  "Muda": "#10b981",     // emerald
  "Madya": "#f59e0b",    // amber
  "Utama": "#8b5cf6"     // purple
};

const JENJANG_BADGE = {
  "Pertama": "bg-blue-100 text-blue-700 border-blue-300",
  "Muda": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Madya": "bg-amber-100 text-amber-700 border-amber-300",
  "Utama": "bg-purple-100 text-purple-700 border-purple-300",
};

// Custom marker icons for different levels
const createCustomIcon = (jenjang: string) => {
  const color = JENJANG_COLORS[jenjang as keyof typeof JENJANG_COLORS];
  return L.divIcon({
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        font-weight: bold;
      ">
        ${jenjang.charAt(0)}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
};

// Province bounds for better view
const PROVINCE_BOUNDS: { [key: string]: [[number, number], [number, number]] } = {
  "DKI Jakarta": [[-6.35, 106.65], [-6.05, 106.95]],
  "Jawa Barat": [[-7.2, 106.8], [-6.2, 108.8]],
  "Jawa Tengah": [[-8.5, 109.0], [-6.0, 111.5]],
  "Jawa Timur": [[-8.8, 111.0], [-6.8, 114.5]],
  "Yogyakarta": [[-8.2, 110.0], [-7.5, 110.8]],
  "Bali": [[-8.9, 114.4], [-8.0, 115.8]],
  "Sumatera Utara": [[1.0, 98.0], [5.0, 100.0]],
  "Sumatera Barat": [[-3.5, 98.5], [1.0, 102.0]],
  "Sumatera Selatan": [[-5.0, 102.0], [-1.0, 107.0]],
  "Riau": [[-2.0, 100.0], [3.0, 105.0]],
  "Lampung": [[-6.5, 103.0], [-3.5, 106.0]],
  "Aceh": [[2.0, 95.0], [6.5, 98.5]],
  "Jambi": [[-3.0, 101.0], [-0.5, 105.0]],
  "Kalimantan Timur": [[-3.0, 113.0], [3.0, 119.0]],
  "Kalimantan Selatan": [[-4.5, 114.0], [-1.5, 117.0]],
  "Sulawesi Selatan": [[-8.0, 116.0], [-1.0, 122.0]],
  "Nusa Tenggara Barat": [[-9.5, 115.0], [-8.0, 119.0]],
  "Papua": [[-9.0, 130.0], [-2.0, 141.0]],
  "Maluku": [[-9.0, 124.0], [-2.0, 132.0]]
};

// Map bounds adjuster component
const MapBoundsAdjuster: React.FC<{ bounds: [[number, number], [number, number]] | null }> = ({ bounds }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [bounds, map]);
  
  return null;
};

export const GeospatialMap: React.FC<GeospatialMapProps> = ({ 
  data, 
  onProvinceSelect, 
  selectedProvince,
  height = "600px" 
}) => {
  const [selectedBounds, setSelectedBounds] = useState<[[number, number], [number, number]] | null>(null);
  
  // Calculate province statistics
  const provinceStats = data.reduce((acc, trainer) => {
    const province = trainer.provinsi;
    if (!acc[province]) {
      acc[province] = {
        count: 0,
        totalRating: 0,
        totalPelatihan: 0,
        jenjangDistribution: {} as { [key: string]: number },
        genderDistribution: { "Laki-laki": 0, "Perempuan": 0 }
      };
    }
    
    acc[province].count++;
    acc[province].totalRating += trainer.rating;
    acc[province].totalPelatihan += trainer.totalPelatihan;
    
    if (!acc[province].jenjangDistribution[trainer.jenjang]) {
      acc[province].jenjangDistribution[trainer.jenjang] = 0;
    }
    acc[province].jenjangDistribution[trainer.jenjang]++;
    
    acc[province].genderDistribution[trainer.gender as keyof typeof acc[typeof province]['genderDistribution']]++;
    
    return acc;
  }, {} as { [key: string]: { 
    count: number; 
    jenjangDistribution: { [key: string]: number }; 
    genderDistribution: { [key: string]: number };
    totalRating: number;
    totalPelatihan: number;
  } });

  // Filter data based on selected province
  const filteredData = selectedProvince 
    ? data.filter(trainer => trainer.provinsi === selectedProvince)
    : data;

  // Handle province selection
  const handleProvinceChange = (province: string) => {
    if (province === "all") {
      setSelectedBounds(null);
      if (onProvinceSelect) onProvinceSelect("");
    } else {
      const bounds = PROVINCE_BOUNDS[province];
      if (bounds) {
        setSelectedBounds(bounds);
      }
      if (onProvinceSelect) onProvinceSelect(province);
    }
  };

  // Default center of Indonesia
  const defaultCenter: [number, number] = [-2.5, 118.0];
  const defaultZoom = 5;

  if (typeof window === 'undefined') {
    return (
      <div className="w-full bg-gray-100 rounded-lg flex items-center justify-center" style={{ height }}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping"></div>
            <h3 className="font-black text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🗺️ Peta Distribusi Widyaiswara
            </h3>
          </div>
          
          {/* Province selector */}
          <div className="flex items-center gap-3">
            <select
              value={selectedProvince || "all"}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">🌎 Semua Provinsi</option>
              {Object.keys(provinceStats).sort().map(province => (
                <option key={province} value={province}>
                  {province} ({provinceStats[province].count})
                </option>
              ))}
            </select>
            
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">
                {filteredData.length} widyaiswara
              </span>
            </div>
          </div>
        </div>

        {/* Map container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/30">
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            style={{ height, width: '100%' }}
            className="z-10"
            maxBounds={[[-11, 95], [6, 141]]}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Bounds adjuster */}
            <MapBoundsAdjuster bounds={selectedBounds} />
            
            {/* Markers */}
            {filteredData.map((trainer) => (
              <Marker
                key={trainer.id}
                position={[trainer.lat, trainer.lng]}
                icon={createCustomIcon(trainer.jenjang)}
              >
                <Popup className="custom-popup">
                  <div className="w-80 p-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {trainer.nama.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{trainer.nama}</h4>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${JENJANG_BADGE[trainer.jenjang as keyof typeof JENJANG_BADGE]}`}>
                          <FaGraduationCap className="text-xs" />
                          {trainer.jenjang}
                        </div>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-blue-500 text-sm" />
                          <span className="text-sm text-gray-600">{trainer.kota}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {trainer.gender === 'Laki-laki' ? (
                            <FaMale className="text-blue-500 text-sm" />
                          ) : (
                            <FaFemale className="text-pink-500 text-sm" />
                          )}
                          <span className="text-sm text-gray-600">{trainer.gender}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-green-500 text-sm" />
                          <span className="text-sm text-gray-600">{trainer.umur} tahun</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiAward className="text-purple-500 text-sm" />
                          <span className="text-sm text-gray-600">{trainer.pengalaman} tahun</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <FiBookOpen className="text-orange-500 text-sm" />
                          <span className="text-sm text-gray-600">{trainer.totalPelatihan} pelatihan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiStar className="text-yellow-500 text-sm" />
                          <span className="text-sm text-gray-600">{trainer.rating} ⭐</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Spesialisasi</div>
                        <div className="text-sm font-medium text-gray-700">{trainer.spesialisasi}</div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <div className="text-sm font-medium text-gray-600 mb-2">Legenda Jenjang:</div>
          {Object.entries(JENJANG_COLORS).map(([jenjang, color]) => (
            <div key={jenjang} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-sm font-medium text-gray-700">{jenjang}</span>
            </div>
          ))}
        </div>

        {/* Summary for selected province */}
        {selectedProvince && provinceStats[selectedProvince] && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <h4 className="font-bold text-lg text-blue-800 mb-3">📊 Ringkasan {selectedProvince}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/70 p-3 rounded-lg">
                <div className="text-blue-600 font-medium">Total Widyaiswara</div>
                <div className="text-2xl font-bold text-blue-800">{provinceStats[selectedProvince].count}</div>
              </div>
              <div className="bg-white/70 p-3 rounded-lg">
                <div className="text-emerald-600 font-medium">Rata-rata Rating</div>
                <div className="text-2xl font-bold text-emerald-800">
                  {(provinceStats[selectedProvince].totalRating / provinceStats[selectedProvince].count).toFixed(1)}
                </div>
              </div>
              <div className="bg-white/70 p-3 rounded-lg">
                <div className="text-purple-600 font-medium">Total Pelatihan</div>
                <div className="text-2xl font-bold text-purple-800">{provinceStats[selectedProvince].totalPelatihan}</div>
              </div>
              <div className="bg-white/70 p-3 rounded-lg">
                <div className="text-orange-600 font-medium">Jenjang Tertinggi</div>
                <div className="text-lg font-bold text-orange-800">
                  {Object.entries(provinceStats[selectedProvince].jenjangDistribution)
                    .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeospatialMap;
