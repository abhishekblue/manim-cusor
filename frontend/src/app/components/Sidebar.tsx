import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
        open ? 'w-64' : 'w-16'
      } overflow-hidden relative`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-4 focus:outline-none absolute top-0 right-0"
      >
        <FaBars />
      </button>

      {open && (
        <div>
          <h2 className="text-lg font-semibold center px-4 mt-2">History</h2>
          <p  className="p-4 text-gray-400">Generated video History will be displayed here</p>
        </div>
      )}
    </aside>
  );
}