/* eslint-disable react/no-unescaped-entities */
interface Props {
  videoPath : string
  isDisplayPlayer : boolean
}

export default function VideoDisplay({videoPath, isDisplayPlayer} : Props) {
  return (
    <div className="w-full max-w-3xl">
        <div className="text-center pt-20 text-gray-500">
          { isDisplayPlayer ? <video className="w-full h-full object-contain" src={videoPath} autoPlay controls /> : 
            <div className="bg-gray-800 text-white p-4 rounded shadow max-w-3xl w-full mb-6">
              <h2 className="text-lg font-semibold mb-2">How to Use</h2>
              <p className="mb-2">Enter your animation idea as a prompt in plain English.</p>

              <p className="font-semibold py-1">Example prompts:</p>
              <ul className="list-disc list-inside mb-4 text-sm text-gray-300 space-y-1">
                <li>"Show text 'Calculus Rocks!' and surround it with an ellipse"</li>
                <li>"Draw a circle and write 'Hello World' inside it"</li>
                <li>"Animate a rectangle transforming into a circle"</li>
                <li>"Plot a graph of sin(x) from -2π to 2π"</li>
              </ul>

              <p className="text-md text-yellow-300">
                Note: AI models sometimes generate unexpected results. If your animation doesn’t match what you had in mind, its LLM's fault not mine.
                In that case, try rephrasing your prompt, simplifying it, or just try again.
              </p>
            </div>
          }
        </div>
    </div>
  )
}
