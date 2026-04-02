export const EditCakeModal = ({ cake, onSave, onClose }) => {
  const [form, setForm] = useState(cake ?? EMPTY_FORM);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSave = () => {
    if (!form.name.trim() || !form.price) return;
    onSave({ ...form, id: cake?.id ?? Date.now(), price: Number(form.price) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-2xl z-10">
          <h2 className="text-base font-bold text-[#3D1C2C]"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Edit Cake
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#8B7070] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">
              Cake Emoji
            </label>
            <div className="flex gap-2 flex-wrap">
              {["🎂","🍫","💍","🍓","✨","🧁","🎭","🍰","🍊","🌈","🦋","🍋"].map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, emoji: e }))}
                  className={`w-10 h-10 text-xl rounded-xl border-2 transition-all ${
                    form.emoji === e
                      ? "border-[#E8627A] bg-[#FDEEF1] scale-110"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <Input label="Cake Name" value={form.name} onChange={set("name")} placeholder="e.g. Classic Vanilla Dream" />

          <div className="grid grid-cols-2 gap-3">
            <Select label="Category" value={form.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Base Price (৳)" type="number" value={form.price} onChange={set("price")} placeholder="850" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              placeholder="Describe the cake..."
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A] resize-none"
            />
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-[#E8627A]/40 transition-colors cursor-pointer">
            <UploadCloud size={22} className="text-gray-400" />
            <p className="text-xs text-[#8B7070]">Click to upload cake image</p>
            <p className="text-[10px] text-gray-400">JPG, PNG, WEBP · Max 5MB</p>
          </div>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-[#2A1A1A]">In Stock</p>
              <p className="text-xs text-[#8B7070]">Customers can order this cake</p>
            </div>
            <div
              onClick={() => setForm((f) => ({ ...f, stock: !f.stock }))}
              className={`w-11 h-6 rounded-full transition-colors relative ${form.stock ? "bg-[#E8627A]" : "bg-gray-300"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.stock ? "translate-x-6" : "translate-x-1"}`} />
            </div>
          </label>
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex gap-3 rounded-b-2xl">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-[#8B7070] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#E8627A] hover:bg-[#C04060] rounded-xl transition-colors active:scale-95">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};