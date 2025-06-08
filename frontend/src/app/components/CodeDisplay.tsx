// 'use client'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// interface Props {
//   codeOutput: string;
// }

// export default function CodeDisplay({ codeOutput }: Props) {
//   return (
//     <aside className="w-1/4 min-w-[300px] bg-gray-800 border-l rounded-xs border-gray-700 p-4 overflow-y-auto hidden lg:block">
//       <h2 className="text-lg font-semibold mb-2">Generated Code</h2>
//       <SyntaxHighlighter language="python" style={vscDarkPlus} wrapLongLines>
//         {codeOutput}
//       </SyntaxHighlighter>
//           </aside>
//   );
// }

"use client"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface Props {
  codeOutput: string
}

export default function CodeDisplay({ codeOutput }: Props) {
  return (
    <aside className="w-1/3 min-w-[350px] max-w-[500px] bg-gradient-to-b from-gray-900 to-gray-800 border-l border-gray-700/50 overflow-hidden hidden lg:flex flex-col shadow-2xl">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r  from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Generated Code
            </h2>
          </div>

          {/* Copy Button */}
        <button
          onClick={(e) => {
            navigator.clipboard.writeText(codeOutput);

            const copiedText = document.createElement("span");
            copiedText.innerText = "Copied!";
            copiedText.className =
              "absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 transition-opacity duration-300 pointer-events-none";

            e.currentTarget.appendChild(copiedText);

            // Trigger fade-in
            requestAnimationFrame(() => {
              copiedText.style.opacity = "1";
            });

            // Remove after 1.5s
            setTimeout(() => {
              copiedText.style.opacity = "0";
              setTimeout(() => copiedText.remove(), 500); // match transition duration
            }, 1500);
          }}
          className="relative p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-200 group"
        >
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
      </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <div className="p-4">
            {codeOutput ? (
              <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/30">
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  wrapLongLines
                  customStyle={{
                    margin: 0,
                    padding: "1.5rem",
                    background: "transparent",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                  }}
                >
                  {codeOutput}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="w-16 h-16 bg-gray-700/30 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <p className="text-center text-sm">Generated code will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/30 border-t border-gray-700/50 p-4">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Python • Manim</span>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
