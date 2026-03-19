const AdmissionsOverview = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
    <div className="p-6 pb-4 border-b border-slate-100">
      <h3 className="text-lg font-bold text-slate-800">Admissions Overview</h3>
    </div>
    <div className="p-6 flex-1 flex flex-col">
       <div className="flex p-1 bg-slate-50 rounded-xl mb-8 border border-slate-100">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[13px] font-bold shadow-md w-full">Applications</button>
          <button className="text-slate-500 px-4 py-2 rounded-lg text-[13px] font-bold w-full hover:text-slate-800">Approvals</button>
          <button className="text-slate-500 px-4 py-2 rounded-lg text-[13px] font-bold w-full hover:text-slate-800 whitespace-nowrap">Admission Letters</button>
        </div>

        <h4 className="text-sm font-bold text-slate-700 mb-8 italic">Application Statistics</h4>

        <div className="flex-1 flex items-end justify-between px-4 pb-4 gap-8 mb-4 border-b border-slate-100">
          <div className="flex flex-col items-center gap-3 w-full group">
            <span className="text-xs font-black text-blue-600">820</span>
            <div className="w-full bg-blue-600 rounded-md shadow-sm transition-all duration-500 hover:scale-x-110" style={{ height: '140px' }}></div>
          </div>
          <div className="flex flex-col items-center gap-3 w-full group">
            <span className="text-xs font-black text-green-600">540</span>
            <div className="w-full bg-green-500 rounded-md shadow-sm transition-all duration-500 hover:scale-x-110" style={{ height: '100px' }}></div>
          </div>
          <div className="flex flex-col items-center gap-3 w-full group">
            <span className="text-xs font-black text-red-500">110</span>
            <div className="w-full bg-red-500 rounded-md shadow-sm transition-all duration-500 hover:scale-x-110" style={{ height: '40px' }}></div>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
           <span>Grad</span>
           <span>UG</span>
           <span>Other</span>
        </div>
    </div>
  </div>
);

export default AdmissionsOverview;
