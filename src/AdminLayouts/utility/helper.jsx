import { ChevronDown } from 'lucide-react';

export const Input = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">{label}</label>}
    <input
      {...props}
      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
    />
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div className="relative">
    {label && <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">{label}</label>}
    <select
      {...props}
      className="w-full appearance-none px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all text-[#2A1A1A] pr-10"
    >
      {children}
    </select>
    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7070] pointer-events-none" style={{ top: label ? "calc(50% + 10px)" : "50%" }} />
  </div>
);

export const DeleteConfirm = ({ cake, onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto text-3xl">
        {cake.emoji}
      </div>
      <div>
        <p className="text-base font-bold text-[#2A1A1A]">Delete "{cake.name}"?</p>
        <p className="text-sm text-[#8B7070] mt-1">This action cannot be undone.</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={() => { onConfirm(cake.id); onClose(); }}
          className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors">
          Delete
        </button>
      </div>
    </div>
  </div>
);