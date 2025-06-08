'use client'
import axios from 'axios'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import VideoDisplay from './components/VideoDisplay'
import CodeDisplay from './components/CodeDisplay'
import PromptInput from './components/PromptInput'

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [videoPath, setVideoPath] = useState("");
    const [codePath, setCodePath] = useState("");
    const [codeOutput, setCodeOutput] = useState("");
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isDisplayPlayer, setisDisplayPlayer] = useState(false);
    
    const backendAPI = 'http://15.207.223.225:8000' 
    async function generateAnimation() {
    setIsDataLoading(true);
    setisDisplayPlayer(true);
    try {
      const {data} = await axios.post(`${backendAPI}/generate`, {prompt})
      console.log(data);
      setVideoPath(data.video_path)
      const pyPath = data.py_path
      const filename = pyPath.split("/").pop()
      const url = `${backendAPI}/code/${filename}`;
      setCodePath(url)
      const res = await fetch(url);
      const text = await res.text();
      setCodeOutput(text);
    } catch (error) {
    console.error(error); 
    } finally {
      setIsDataLoading(false);
    }
  }
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-start overflow-y-auto p-4">
        <PromptInput
          isDataLoading={isDataLoading}
          onClick={generateAnimation}
          setPrompt={setPrompt}
        />
          <VideoDisplay
            isDisplayPlayer = {isDisplayPlayer}
            videoPath={`${backendAPI}${videoPath}`}
          />
        </main>
        { codePath &&
        <CodeDisplay
          codeOutput={codeOutput}
        />}
      </div>
    </div>
  </>
  )
}