import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TeacherCard } from '../components/TeacherCard';
import {
  Search,
  Filter,
  MapPin,
  Map,
  List,
  SlidersHorizontal,
  Compass,
  Star,
  CheckCircle2,
  Navigation,
  Crosshair
} from 'lucide-react';

export const TeacherDiscoveryPage: React.FC = () => {
  const { teachers } = useApp();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedMode, setSelectedMode] = useState('ALL');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [maxDistance, setMaxDistance] = useState<number>(30);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'price_low' | 'price_high'>('rating');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Simulated student location (Connaught Place / Central Delhi)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; name: string }>({
    lat: 28.6289,
    lng: 77.2185,
    name: 'Central Delhi (Your Location)'
  });

  // Haversine formula distance calculation
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredTeachers = useMemo(() => {
    return teachers
      .map(teacher => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          teacher.location.lat,
          teacher.location.lng
        );
        return { ...teacher, calculatedDistanceKm: distance };
      })
      .filter(t => {
        // Search query
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = t.name.toLowerCase().includes(q);
          const matchSub = t.subjects.some(s => s.toLowerCase().includes(q));
          const matchCity = t.location.city.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchCity) return false;
        }

        // Subject
        if (selectedSubject !== 'ALL') {
          if (!t.subjects.includes(selectedSubject)) return false;
        }

        // Mode
        if (selectedMode !== 'ALL') {
          if (t.mode !== selectedMode && t.mode !== 'hybrid') return false;
        }

        // Grade
        if (selectedGrade !== 'ALL') {
          if (!t.grade.includes(selectedGrade)) return false;
        }

        // Distance filter
        if (t.calculatedDistanceKm > maxDistance) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'distance') return a.calculatedDistanceKm - b.calculatedDistanceKm;
        if (sortBy === 'price_low') return a.hourlyRate - b.hourlyRate;
        if (sortBy === 'price_high') return b.hourlyRate - a.hourlyRate;
        return 0;
      });
  }, [teachers, searchQuery, selectedSubject, selectedMode, selectedGrade, maxDistance, sortBy, userLocation]);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            name: 'Device Current Location'
          });
        },
        () => {
          alert('Using default Delhi NCR coordinates for nearby teacher calculation.');
        }
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Tutor Discovery & Geolocation Services</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Find Qualified & Verified Mentors
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse teacher profiles, check background-verified credentials, and filter by distance for in-person or online classes.
          </p>
        </div>

        {/* View mode toggle & Location pill */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={handleUseCurrentLocation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-blue-500 text-xs text-slate-300 transition"
          >
            <Crosshair className="w-3.5 h-3.5 text-blue-400" />
            <span>{userLocation.name.split(' ')[0]} (Set Geo)</span>
          </button>

          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="p-4 rounded-2xl glass-panel space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Keyword Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by teacher name, subject, or locality..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          {/* Mode Filter */}
          <div>
            <select
              value={selectedMode}
              onChange={e => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Modes (Online & Offline)</option>
              <option value="online">Online Live Only</option>
              <option value="offline">In-Person Home Visit Only</option>
              <option value="hybrid">Hybrid (Both)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="rating">Sort: Highest Rated</option>
              <option value="distance">Sort: Nearest to Me</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Distance Range Slider */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Service Radius:</span>
            <input
              type="range"
              min="2"
              max="50"
              value={maxDistance}
              onChange={e => setMaxDistance(Number(e.target.value))}
              className="w-32 accent-blue-500"
            />
            <span className="text-blue-400 font-bold font-mono">Within {maxDistance} km</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Showing <strong>{filteredTeachers.length}</strong> matching educators</span>
            {filteredTeachers.length === 0 && (
              <button
                onClick={() => {
                  setSelectedSubject('ALL');
                  setSelectedMode('ALL');
                  setSelectedGrade('ALL');
                  setMaxDistance(50);
                  setSearchQuery('');
                }}
                className="text-blue-400 hover:underline font-semibold ml-2"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Display: List or Interactive Map View */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              userDistanceKm={teacher.calculatedDistanceKm}
            />
          ))}
        </div>
      ) : (
        /* Interactive Simulated Geolocation Map View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Canvas Simulation */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative h-[560px] shadow-2xl flex flex-col">
            <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 z-10">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <MapPin className="w-4 h-4 text-rose-500" />
                Delhi NCR Geolocation Grid ({filteredTeachers.length} active tutors in radius)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}
              </span>
            </div>

            {/* Visual Vector Grid Map Container */}
            <div className="relative flex-1 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] p-6 overflow-hidden">
              {/* Radar pulse around user */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-blue-500/20 bg-blue-500/5 pointer-events-none animate-ping duration-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-blue-500/10 pointer-events-none" />

              {/* Student Location Pin (Center) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group">
                <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/50 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
                <div className="mt-1 px-2 py-0.5 rounded bg-slate-900/95 border border-slate-700 text-[10px] text-blue-300 font-bold whitespace-nowrap shadow-md">
                  You (Connaught Place)
                </div>
              </div>

              {/* Teacher Pins scattered geographically */}
              {filteredTeachers.map((t, idx) => {
                // Offset calculation relative to center
                const offsetX = (t.location.lng - userLocation.lng) * 400;
                const offsetY = -(t.location.lat - userLocation.lat) * 400;

                return (
                  <div
                    key={t.id}
                    style={{
                      transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`
                    }}
                    className="absolute top-1/2 left-1/2 z-10 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110"
                  >
                    <div className="relative">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500 shadow-lg"
                      />
                      {t.verified && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px]">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="mt-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-white font-medium whitespace-nowrap shadow-xl">
                      {t.name.split(' ')[0]} • {t.calculatedDistanceKm.toFixed(1)} km
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Sidebar: Nearby List */}
          <div className="space-y-3 overflow-y-auto max-h-[560px] pr-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tutors within {maxDistance} km:
            </h3>
            {filteredTeachers.map(teacher => (
              <div
                key={teacher.id}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{teacher.name}</h4>
                    <p className="text-[11px] text-slate-400">{teacher.subjects.join(', ')}</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {teacher.calculatedDistanceKm.toFixed(1)} km from you
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white">₹{teacher.hourlyRate}/h</div>
                  <div className="text-[10px] text-amber-400 font-semibold">
                    ★ {teacher.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
