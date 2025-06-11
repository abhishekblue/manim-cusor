"use client";
import { SignUp } from "@clerk/nextjs";

export default function AuthPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white text-black p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-md">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black transition-colors"
          aria-label="Close login popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <SignUp
          routing="hash"
          appearance={{
            elements: {
              card: "shadow-xl rounded-xl border border-gray-200",
            },
          }}
          afterSignUpUrl="/"
        />
      </div>
    </div>
  );
}
