"use client"

import { useState } from "react"
import { MessageSquare, ChevronLeft, ChevronRight, History } from "lucide-react"

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} bg-gray-950 border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full p-1 border border-gray-700 transition-colors z-10"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    {/* History Info Card */}
        {!isCollapsed && (
          <div className="m-2 p-4 bg-gray-900 rounded-lg border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <History className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-200">History</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your generated animations will appear here once its implemented. Coming soon!
            </p>
          </div>
        )}  
      {/* Content */}
      <div className="flex-1 p-2 overflow-y-auto">
        {/* Recent Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <h3 className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Recent</h3>
          )}

          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <button
                key={item}
                className={`w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors group ${isCollapsed ? "justify-center" : "justify-start"}`}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm truncate text-left">Animation {item}</span>}
                {isCollapsed && (
                  <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    Animation {item}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 text-center">Manim Animator v1.0</div>
        </div>
      )}
    </div>
  )
}

export default AppSidebar
