'use client'

import axios from "axios";
import { useState } from "react"

function SubmitPrompt() {
  const [prompt, setPrompt] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [codePath, setCodePath] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);

  async function SendPrompt() {
    setIsDataLoading(true);
    try {
      const {data} = await axios.post('http://localhost:8000/generate', {prompt})
      console.log(data);
      setVideoPath(data.video_path.split('\\').pop().split('.')[0])
      setCodePath(data.py_path.split('\\').pop().split('.')[0])
      const res = await fetch(`http://localhost:8000/code/${codePath}.py`);
      const text = await res.text();
      setCodeOutput(text);
    } catch (error) {
    console.error(error); 
    } finally {
      setIsDataLoading(false);
    }
    console.log("CODE PATH: ", codePath)
  }
return (
  <div className="flex h-screen w-screen text-white bg-gray-900">
    <div className="w-[60px] bg-gray-900 border-r border-gray-800 p-2 flex flex-col items-center space-y-4">
      <span className="text-xs">🔧</span>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-4">
      <input
        placeholder="Enter prompt"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className="w-full max-w-xl p-2 rounded bg-gray-800 text-white border border-gray-700"
      />
      {isDataLoading
        ? <button className="bg-gray-700 px-4 py-2 rounded opacity-50" disabled>Loading...</button>
        : <button onClick={SendPrompt} className="bg-white text-black px-4 py-2 rounded">Submit</button>
      }
      {isDataLoading && (
        <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
      )}
      {videoPath && (
        <div className="aspect-video w-full max-w-4xl bg-gray-800 rounded overflow-hidden">
          <video
            controls
            autoPlay
            className="w-full h-full object-contain"
            src={`http://localhost:8000/videos/${videoPath}/480p15/${videoPath}.mp4`}
          />
        </div>
      )}
    </div>
    {codePath && (
      <div className="w-[400px] bg-gray-950 border-l border-gray-800 p-4 overflow-auto">
        <h1 className="underline py-2"><p className="py-2">MANIM CODE USED FOR THIS VIDEO: </p></h1>
        <div className="text-sm font-mono whitespace-pre-wrap text-green-300">
          <code>{codeOutput}</code>
        </div>
      </div>
    )}
  </div>
);
}

export default SubmitPrompt;