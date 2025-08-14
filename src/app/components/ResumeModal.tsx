"use client";
import React from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark rounded-lg shadow-lg w-[90%] max-w-4xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-white hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="w-full h-[85vh] rounded-lg overflow-hidden">
          <embed
            src="/Andrew_Tsai_Full_Stack_Software_Engineer.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}