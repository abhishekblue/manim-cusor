"use client";
import { SignUp } from "@clerk/nextjs";

export default function AuthPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white text-black p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-md">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black transition-colors"
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

        <div className="text-center mb-5">
        <h2 className="text-2xl font-extrabold tracking-wide text-gray-800">NO CREDITS LEFT</h2>
        <p className="text-sm text-gray-600 mt-1">
            You’ve used all your free generations. <br />
            <span className="font-bold">Log in or sign up</span> to unlock more!
        </p>
        </div>

        <SignUp
          routing="hash"
          appearance={{
            elements: {
              card: "shadow-xl rounded-xl border border-gray-200",
            },
          }}
        />
      </div>
    </div>
  );
}
