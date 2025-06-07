interface Props {
  setPrompt: (value: string) => void;
  onClick: () => void;
  isDataLoading: boolean;
}

export default function PromptInput({ setPrompt, onClick, isDataLoading }: Props) {
  return (
    <div className="flex gap-2 items-center justify-center w-full max-w-md my-4">
      <input
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter animation prompt..."
        className="flex-1 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
      />
      {isDataLoading ? (
        <button className="px-4 py-2 bg-gray-500 rounded cursor-not-allowed" disabled>
          Loading...
        </button>
      ) : (
        <button onClick={onClick} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
          Generate
        </button>
      )}
    </div>
  );
}
