// /* eslint-disable react/no-unescaped-entities */
// interface Props {
//   videoPath : string
//   isDisplayPlayer : boolean
// }

// export default function VideoDisplay({videoPath, isDisplayPlayer} : Props) {
//   return (
//     <div className="w-full max-w-3xl">
//         <div className="text-center pt-20 text-gray-500">
//           { isDisplayPlayer ? <video className="w-full h-full object-contain" src={videoPath} autoPlay controls /> : 
//             <div className="bg-gray-800 text-white p-4 rounded shadow max-w-3xl w-full mb-6">
//               <h2 className="text-lg font-semibold mb-2">How to Use</h2>
//               <p className="mb-2">Enter your animation idea as a prompt in plain English.</p>

//               <p className="font-semibold py-1">Example prompts:</p>
//               <ul className="list-inside mb-4 text-md text-gray-300 space-y-1">
//                 <li>"Show text 'Calculus Sucks!' and surround it with an ellipse"</li>
//                 <li>"Draw a circle and write 'Hello World' inside it"</li>
//                 <li>"Animate a rectangle transforming into a circle"</li>
//                 <li>"Plot a graph of sin(x) from -2π to 2π with labelled axes"</li>
//               </ul>
//               <div className="text-md text-yellow-300 flex text-center max-w-2xl">
//                 <span className="font-bold min-w-[60px]">Note :</span>
//                 <p className="text-justify">
//                   AI models sometimes generate unexpected results. If your animation doesn’t match what you had in mind, it's LLM's fault not mine. In that case, try rephrasing your prompt, simplifying it, or just try again.
//                 </p>
//               </div>
//             </div>
//           }
//         </div>
//     </div>
//   )
// }

/* eslint-disable react/no-unescaped-entities */

import { GoDotFill } from "react-icons/go";

interface Props {
  videoPath: string
  isDisplayPlayer: boolean
}

export default function VideoDisplay({ videoPath, isDisplayPlayer }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="pt-8 lg:pt-8">
        {isDisplayPlayer ? (
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-2">
            <video className="w-full h-full object-contain rounded-xl" src={videoPath} autoPlay controls />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  How to Use
                </h2>
                <p className="text-gray-300 text-lg">Enter your animation idea as a prompt in plain English.</p>
              </div>

              {/* Examples Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-300 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Example prompts:
                </h3>
                <div className="grid gap-4">
                  {[
                    "Show text 'Calculus Sucks!' and surround it with an ellipse",
                    "Draw a circle and write 'Hello World' inside it",
                    "Animate a rectangle transforming into a circle",
                    "Plot a graph of sin(x) from -2π to 2π with labelled axes",
                  ].map((prompt, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-colors"
                    >
                      <div className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                          <GoDotFill />
                        </span>
                        <p className="text-gray-200 leading-relaxed">"{prompt}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note Section */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-2">Important Note</h4>
                    <p className="text-gray-300 leading-relaxed">
                      AI models sometimes generate unexpected results. If your animation doesn't match what you had in
                      mind, it's LLM's fault not mine. In that case, try rephrasing your prompt, simplifying it, or
                      just try again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
