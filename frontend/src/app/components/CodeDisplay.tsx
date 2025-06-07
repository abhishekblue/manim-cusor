interface Props {
  codeOutput: string;
}

export default function CodeDisplay({ codeOutput } : Props ) {
  return (
    <aside className="w-1/4 min-w-[300px] bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto hidden lg:block">
      <h2 className="text-lg font-semibold mb-2">Generated Code</h2>
      <pre className="bg-gray-900 p-4 rounded text-sm font-mono whitespace-pre-wrap text-green-300 overflow-x-auto">
        { codeOutput }
      </pre>
    </aside>
  )
}
