const Announcements = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
      <h3 className="text-lg font-bold text-slate-800">Announcements</h3>
      <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
    </div>
    <div className="p-6 space-y-6">
       {[
         'Exam Schedule Posted',
         'Course Registration Deadline',
         'Campus Event: Tech Conference'
       ].map((item, i) => (
         <div key={i} className="flex items-center gap-4 group cursor-pointer">
           <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-0.5 group-hover:scale-125 transition-transform"></div>
           <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item}</p>
         </div>
       ))}
    </div>
  </div>
);

export default Announcements;
