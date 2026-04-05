import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'


const Input = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">{label}</label>}
    <input
      {...props}
      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
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
const TestPage = () => {
     const EMPTY_FORM = { name: "", emoji: "🎂", category: "Birthday", price: "", description: "", stock: true };
     const [form, setForm] = useState(EMPTY_FORM);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const testSet = (key)=> (e)=>{
    setForm((prev)=>({...prev, [key]:e.target.value}))
  }

  console.log(form)

 const CATEGORIES = ["Birthday", "Wedding", "Chocolate", "Fruit", "Custom", "Cupcakes", "Theme", "Cheesecake"];

    
  return (
    <div>
       <div className="grid grid-cols-2 gap-3">
                  <Select label="Category" value={form.category} onChange={set("category")}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </Select>
                  <Input
                    label="Base Price (৳)"
                    type="number"
                    value={form.price}
                    onChange={set("price")}
                    placeholder="850"
                  />
                </div>

                <input type="text"
                        onChange={testSet("name")}
                
                />
    </div>
  )
}

export default TestPage
