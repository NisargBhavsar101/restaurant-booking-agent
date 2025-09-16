import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Menu,
  X,
  Home,
  BarChart3,
  Settings,
  Utensils
} from 'lucide-react';

interface Slot {
  id: string;
  date: string;
  time: string;
  guests: number;
  available: boolean;
}

interface CallLog {
  id: string;
  callerName: string;
  callerNumber: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  notes: string;
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'slots' | 'calls'>('slots');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - in a real app, this would come from an API
  const [slots, setSlots] = useState<Slot[]>([
    { id: '1', date: '2025-01-15', time: '18:00', guests: 4, available: true },
    { id: '2', date: '2025-01-15', time: '19:00', guests: 2, available: false },
    { id: '3', date: '2025-01-15', time: '20:00', guests: 6, available: true },
    { id: '4', date: '2025-01-16', time: '18:30', guests: 4, available: true },
    { id: '5', date: '2025-01-16', time: '19:30', guests: 8, available: false },
  ]);

  const [callLogs, setCallLogs] = useState<CallLog[]>([
    {
      id: '1',
      callerName: 'John Smith',
      callerNumber: '+1-555-0123',
      date: '2025-01-14',
      time: '14:30',
      status: 'confirmed',
      notes: 'Table for 4, anniversary dinner'
    },
    {
      id: '2',
      callerName: 'Sarah Johnson',
      callerNumber: '+1-555-0456',
      date: '2025-01-14',
      time: '15:45',
      status: 'pending',
      notes: 'Requested window table'
    },
    {
      id: '3',
      callerName: 'Mike Davis',
      callerNumber: '+1-555-0789',
      date: '2025-01-13',
      time: '16:20',
      status: 'cancelled',
      notes: 'Cancelled due to weather'
    },
  ]);

  const filteredSlots = slots.filter(slot => {
    const matchesSearch = slot.date.includes(searchTerm) || slot.time.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'available' && slot.available) ||
      (filterStatus === 'booked' && !slot.available);
    return matchesSearch && matchesFilter;
  });

  const filteredCallLogs = callLogs.filter(log => {
    const matchesSearch = log.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.callerNumber.includes(searchTerm) ||
      log.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteSlot = (id: string) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const toggleSlotAvailability = (id: string) => {
    setSlots(slots.map(slot => 
      slot.id === id ? { ...slot, available: !slot.available } : slot
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <Utensils className="h-8 w-8 text-orange-600" />
            <h1 className="text-xl font-bold text-gray-900">Spice Garden</h1>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-6 mb-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Restaurant Management
            </h2>
          </div>
          
          <div className="space-y-1 px-3">
            <button
              onClick={() => setActiveTab('slots')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'slots' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Slot Management
            </button>
            
            <button
              onClick={() => setActiveTab('calls')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'calls' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Phone className="h-5 w-5 mr-3" />
              Call Logs
            </button>
          </div>
          
          <div className="mt-8 px-6">
            <div className="border-t pt-6">
              <a 
                href="/"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="h-5 w-5 mr-3" />
                Back to Homepage
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6 text-gray-500" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'slots' ? 'Slot Management' : 'Call Logs'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {activeTab === 'slots' ? (
                  <>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                  </>
                ) : (
                  <>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'slots' ? (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Table Slots</h2>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Slot</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slot ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guests
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Availability
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSlots.map((slot) => (
                      <tr key={slot.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{slot.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(slot.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {slot.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {slot.guests}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleSlotAvailability(slot.id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              slot.available 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {slot.available ? 'Available' : 'Booked'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-orange-600 hover:text-orange-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteSlot(slot.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Call Logs</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Automatically populated from Omnidim webhook
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Call ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Caller Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCallLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{log.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.callerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.callerNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div>{new Date(log.date).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-400">{log.time}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {log.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;