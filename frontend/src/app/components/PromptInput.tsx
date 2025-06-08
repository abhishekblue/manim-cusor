// interface Props {
//   setPrompt: (value: string) => void;
//   onClick: () => void;
//   isDataLoading: boolean;
// }

// export default function PromptInput({ setPrompt, onClick, isDataLoading }: Props) {
//   return (
//     <div className="flex gap-2 items-center justify-center w-full max-w-md my-4">
//       <input
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter animation prompt..."
//         className="flex-1 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
//       />
//       {isDataLoading ? (
//         <button className="px-4 py-2 bg-gray-500 rounded cursor-not-allowed" disabled>
//           Loading...
//         </button>
//       ) : (
//         <button onClick={onClick} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
//           Generate
//         </button>
//       )}
//     </div>
//   );
// }


"use client"

interface Props {
  setPrompt: (value: string) => void
  onClick: () => void
  isDataLoading: boolean
}

export default function PromptInput({ setPrompt, onClick, isDataLoading }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Input Container */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700/50 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Input Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your animation prompt..."
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-lg"
              />
            </div>

            {/* Generate Button */}
            {isDataLoading ? (
              <button
                className="px-8 py-4 bg-gray-600 text-gray-300 rounded-xl cursor-not-allowed flex items-center justify-center min-w-[140px] transition-all duration-200"
                disabled
              >
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="font-medium">Loading...</span>
              </button>
            ) : (
              <button
                onClick={onClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center min-w-[140px] group"
              >
                <span>Generate</span>
                <svg
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500/20 rounded-full blur-sm"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}
