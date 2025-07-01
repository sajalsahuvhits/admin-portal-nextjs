'use client';

export default function Header() {
  return (
    <header className="w-full h-16 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-lg font-medium">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Welcome, Admin</span>
        {/* Add dropdown, avatar, logout button, etc. here */}
      </div>
    </header>
  );
}
