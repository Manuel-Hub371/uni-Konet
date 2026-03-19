const StudentTable = () => {
  const students = [
    { id: '2023001', name: 'Michael Adams', program: 'Computer Science', status: 'Active' },
    { id: '2023002', name: 'Sarah Johnson', program: 'Business Admin', status: 'Active' },
    { id: '2023003', name: 'Ali Kareem', program: 'Electrical Engineering', status: 'Inactive' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="text-lg font-bold text-slate-800">Student Management</h3>
      </div>
      
      <div className="p-6">
        <div className="flex gap-3 mb-8">
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-100">All Students</button>
          <button className="bg-white text-slate-500 px-6 py-2.5 rounded-lg text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-colors">Add New Student</button>
          <button className="bg-white text-slate-500 px-6 py-2.5 rounded-lg text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-colors">Academic Records</button>
        </div>

        <h4 className="text-sm font-bold text-slate-700 mb-5 pl-1 italic">Recent Students</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-50 text-slate-400 font-medium">
                <th className="py-3 px-4 uppercase tracking-wider text-[11px]">ID</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px]">Name</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px]">Program</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px]">Status</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[11px]">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {students.map((s, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-slate-500">{s.id}</td>
                  <td className="py-4 px-4 font-bold">{s.name}</td>
                  <td className="py-4 px-4 font-medium">{s.program}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                       <button className="text-blue-600 font-bold text-[11px] underline hover:no-underline">View</button>
                       <button className="text-blue-600 font-bold text-[11px] underline hover:no-underline">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
