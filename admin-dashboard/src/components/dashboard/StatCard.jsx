const StatCard = ({ title, value, icon: Icon, onClick, isActive }) => (
  <div 
    onClick={onClick}
    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-5 group ${
      isActive 
        ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/5' 
        : 'bg-white border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5'
    }`}
  >
    <div className={`p-4 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${
      isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-blue-50 text-blue-600'
    }`}>
      <Icon size={24} strokeWidth={2} />
    </div>
    <div>
      <p className={`text-[11px] font-black uppercase tracking-[0.1em] mb-1 ${
        isActive ? 'text-blue-600' : 'text-slate-400'
      }`}>{title}</p>
      <h3 className="text-2xl font-black tracking-tight text-slate-900">{value}</h3>
    </div>
  </div>
);

export default StatCard;
