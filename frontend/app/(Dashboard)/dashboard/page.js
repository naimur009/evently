import React from 'react';

// Mock Data
const mockData = {
  totalSales: '$2.4M',
  totalEvents: '150+',
  ticketsSold: '120,450',
  totalUsers: '50k',
  eventDistribution: { active: 50, soldOut: 30, upcoming: 20, cancelled: 5 },
  salesChart: [
    { name: 'Jan', sales: 4200 },
    { name: 'Feb', sales: 3800 },
    { name: 'Mar', sales: 2500 },
    { name: 'Apr', sales: 3100 },
    { name: 'May', sales: 2100 },
    { name: 'Jun', sales: 2800 },
    { name: 'Jul', sales: 4100 },
  ],
  recentEvents: [
    { id: 1, name: 'Summer Music Fest', sales: 8500, status: 'Active' },
    { id: 2, name: 'Tech Conference 2024', sales: 12000, status: 'Sold Out' },
    { id: 3, name: 'Art & Wine Expo', sales: 6000, status: 'Upcoming' },
  ],
  recentUsers: [
    { id: 1, name: 'Alice Johnson', date: '2 days ago' },
    { id: 2, name: 'Bob Smith', date: '5 days ago' },
    { id: 3, name: 'Charlie Brown', date: '1 week ago' },
  ],
};

// Icons as SVG components
const SalesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const EventsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const TicketsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h7c4 0 5-2 5-5s-1-5-5-5H9s-5 1-5 5 1 5 5 5z" />
    <line x1="16" y1="18" x2="16" y2="15" />
    <line x1="8" y1="6" x2="8" y2="9" />
  </svg>
);

// InfoCard component
const InfoCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
    <div className={`p-3 rounded-full flex items-center justify-center bg-${color}-100`}>
      <Icon className={`text-${color}-500`} />
    </div>
    <div>
      <p className="text-gray-500 text-xs uppercase font-medium">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// SalesChart component
const SalesChart = ({ data }) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Sales</h2>
    <div className="w-full h-64 md:h-72 relative">
      <svg viewBox="0 0 100 80" className="w-full h-full">
        {data.map((d, i) => {
          const barHeight = (d.sales / 5000) * 80;
          return (
            <g key={i} className="cursor-pointer">
              <rect
                x={i * 13}
                y={80 - barHeight}
                width="8"
                height={barHeight}
                rx="2"
                fill="#4f46e5"
                className="transition-all duration-500 hover:fill-indigo-400 hover:scale-105 transform origin-bottom"
              />
              <text
                x={i * 13 + 4}
                y="85"
                textAnchor="middle"
                fontSize="5"
                fill="#4b5563"
                className="transition-colors duration-300"
              >
                {d.name}
              </text>
              <title>{`Sales: ${d.sales}`}</title>
            </g>
          );
        })}
      </svg>
    </div>
  </div>
);

const Dashboard = () => {
  const totalEvents = Object.values(mockData.eventDistribution).reduce((a, b) => a + b, 0);
  const getPercentage = (count) => ((count / totalEvents) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-500 text-sm md:text-base">Insights and analytics at a glance</p>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
          <InfoCard title="Total Sales" value={mockData.totalSales} icon={SalesIcon} color="blue" />
          <InfoCard title="Total Events" value={mockData.totalEvents} icon={EventsIcon} color="green" />
          <InfoCard title="Tickets Sold" value={mockData.ticketsSold} icon={TicketsIcon} color="rose" />
          <InfoCard title="Total Users" value={mockData.totalUsers} icon={UsersIcon} color="sky" />
          <InfoCard title="Completed Events" value={mockData.eventDistribution.active + mockData.eventDistribution.soldOut} icon={EventsIcon} color="lime" />
          <InfoCard title="Upcoming Events" value={mockData.eventDistribution.upcoming} icon={EventsIcon} color="amber" />
        </div>

        {/* Charts & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <SalesChart data={mockData.salesChart} />

            {/* Event Distribution */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Distribution</h2>
              <div className="flex justify-center mb-4">
                <svg width="120" height="120" viewBox="0 0 40 40" className="rotate-90">
                  {['active','soldOut','upcoming'].map((key, i) => (
                    <circle
                      key={i}
                      cx="20"
                      cy="20"
                      r="15.915"
                      fill="transparent"
                      stroke={i===0?'#4f46e5':i===1?'#0d9488':'#be185d'}
                      strokeWidth="8"
                      strokeDasharray={`${getPercentage(mockData.eventDistribution[key])} ${100 - getPercentage(mockData.eventDistribution[key])}`}
                      strokeDashoffset={`-${['active','soldOut'].slice(0,i).reduce((a,k)=>a+parseInt(getPercentage(mockData.eventDistribution[k])),0)}`}
                    />
                  ))}
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500"><span className="inline-block w-3 h-3 rounded-full bg-indigo-600 mr-2"></span>Active: {getPercentage(mockData.eventDistribution.active)}%</p>
                <p className="text-sm text-gray-500"><span className="inline-block w-3 h-3 rounded-full bg-teal-500 mr-2"></span>Sold Out: {getPercentage(mockData.eventDistribution.soldOut)}%</p>
                <p className="text-sm text-gray-500"><span className="inline-block w-3 h-3 rounded-full bg-rose-500 mr-2"></span>Upcoming: {getPercentage(mockData.eventDistribution.upcoming)}%</p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-6">
            {/* Recent Events */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h2>
              <ul className="divide-y divide-gray-200">
                {mockData.recentEvents.map(event => (
                  <li key={event.id} className="py-3 flex justify-between items-center hover:bg-gray-50 transition-colors rounded-md px-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.name}</p>
                      <p className="text-xs text-gray-500">Sales: ${event.sales.toLocaleString()}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full
                      ${event.status==='Active'?'bg-green-100 text-green-800':
                        event.status==='Sold Out'?'bg-rose-100 text-rose-800':'bg-blue-100 text-blue-800'}`}>
                      {event.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">New Users</h2>
              <ul className="divide-y divide-gray-200">
                {mockData.recentUsers.map(user => (
                  <li key={user.id} className="py-3 hover:bg-gray-50 transition-colors rounded-md px-2">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
