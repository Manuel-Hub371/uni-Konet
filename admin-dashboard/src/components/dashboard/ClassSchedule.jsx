const ClassSchedule = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
    <div className="p-6 border-b border-slate-100">
      <h3 className="text-lg font-bold text-slate-800">Class Schedule</h3>
    </div>
    <div className="p-6 space-y-6">
       <div className="space-y-4">
         <div className="flex items-center gap-3 text-slate-500">
           <span className="text-sm font-bold text-slate-800">Today:</span>
           <span className="text-sm font-medium italic">Monday, April 15</span>
         </div>
         
         <div className="grid grid-cols-2 gap-y-4 pt-2">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Course</div>
            <div className="text-sm font-bold text-slate-800 tracking-tight">Data Structures</div>
            
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Time</div>
            <div className="text-sm font-bold text-slate-800 tracking-tight">10:00 AM – 12:00 PM</div>
            
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Room</div>
            <div className="text-sm font-bold text-slate-800 tracking-tight">Lab 204</div>
         </div>
       </div>
    </div>
  </div>
);

export default ClassSchedule;
