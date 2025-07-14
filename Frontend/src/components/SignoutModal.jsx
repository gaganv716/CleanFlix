// src/components/SignoutModal.jsx
import React from "react";

const SignoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/60">
      <div className="bg-gray-900 text-white rounded-md p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Sign Out</h2>
        <p className="mb-6">Are you sure you want to sign out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            Yes, Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignoutModal;
