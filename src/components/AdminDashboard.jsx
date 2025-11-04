import React, { useState } from 'react';

export default function AdminDashboard({
  events,
  bookings,
  prices,
  setPrices,
  booked,
  forceUnbook,
  addEvent,
}) {
  const [eventForm, setEventForm] = useState({ name: '', venue: '', city: '', date: '', time: '', description: '' });

  return (
    <section id="admin" dir="rtl" className="bg-[#0a0a0a] text-white py-16 border-t border-yellow-500/10">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-8"><span className="text-yellow-400">لوحة</span> التحكم</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bookings */}
          <div className="rounded-xl border border-yellow-500/30 p-6 bg-gradient-to-b from-zinc-900 to-black">
            <h4 className="text-lg font-semibold">الحجوزات والمدفوعات</h4>
            <div className="mt-4 space-y-3 max-h-80 overflow-auto pr-2">
              {bookings.length === 0 && (
                <div className="text-sm text-gray-400">لا توجد حجوزات حتى الآن</div>
              )}
              {bookings.map((b, idx) => (
                <div key={idx} className="border border-yellow-500/20 rounded-lg p-3 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="font-semibold text-yellow-300">{b.vendorName}</div>
                    <div className="text-gray-300">{b.eventName} • {b.boothKey}</div>
                    <div className="text-xs text-gray-400">السجل التجاري: {b.crFileName || '—'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">المبلغ</div>
                    <div className="font-mono">{b.amount.toLocaleString()} ر.س</div>
                    <div className={`text-xs mt-1 ${b.paid ? 'text-emerald-300' : 'text-yellow-300'}`}>{b.paid ? 'مدفوع' : 'قيد الانتظار'}</div>
                    {b.paid && (
                      <button
                        onClick={() => forceUnbook(`${b.eventId}:${b.boothKey}`)}
                        className="mt-2 text-xs rounded px-2 py-1 border border-red-500 text-red-300 hover:bg-red-600/20"
                      >
                        إلغاء تأكيد البوث
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing and Events */}
          <div className="space-y-6">
            <div className="rounded-xl border border-yellow-500/30 p-6 bg-gradient-to-b from-zinc-900 to-black">
              <h4 className="text-lg font-semibold">أسعار البوثات</h4>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <label className="flex items-center justify-between gap-2">المدخل
                  <input type="number" value={prices.entrance}
                    onChange={(e)=> setPrices((p)=>({...p, entrance: Number(e.target.value)||0}))}
                    className="w-28 bg-black border border-yellow-700/40 rounded px-2 py-1"/>
                </label>
                <label className="flex items-center justify-between gap-2">الخارجي
                  <input type="number" value={prices.outdoor}
                    onChange={(e)=> setPrices((p)=>({...p, outdoor: Number(e.target.value)||0}))}
                    className="w-28 bg-black border border-yellow-700/40 rounded px-2 py-1"/>
                </label>
                {(['A','B','C','D']).map((sec)=> (
                  <label key={sec} className="flex items-center justify-between gap-2">داخلي {sec}
                    <input type="number" value={prices.indoor[sec]}
                      onChange={(e)=> setPrices((p)=>({ ...p, indoor: { ...p.indoor, [sec]: Number(e.target.value)||0 } }))}
                      className="w-28 bg-black border border-yellow-700/40 rounded px-2 py-1"/>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-yellow-500/30 p-6 bg-gradient-to-b from-zinc-900 to-black">
              <h4 className="text-lg font-semibold">إضافة/تحديث فعالية</h4>
              <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                <input className="bg-black border border-yellow-700/40 rounded px-2 py-2" placeholder="اسم الفعالية" value={eventForm.name} onChange={(e)=>setEventForm({...eventForm, name:e.target.value})} />
                <input className="bg-black border border-yellow-700/40 rounded px-2 py-2" placeholder="الموقع" value={eventForm.venue} onChange={(e)=>setEventForm({...eventForm, venue:e.target.value})} />
                <input className="bg-black border border-yellow-700/40 rounded px-2 py-2" placeholder="المدينة" value={eventForm.city} onChange={(e)=>setEventForm({...eventForm, city:e.target.value})} />
                <input className="bg-black border border-yellow-700/40 rounded px-2 py-2" placeholder="التاريخ" value={eventForm.date} onChange={(e)=>setEventForm({...eventForm, date:e.target.value})} />
                <input className="bg-black border border-yellow-700/40 rounded px-2 py-2" placeholder="الوقت" value={eventForm.time} onChange={(e)=>setEventForm({...eventForm, time:e.target.value})} />
                <input className="bg-black border border-yellow-700/40 rounded px-2 py-2 col-span-2" placeholder="وصف مختصر" value={eventForm.description} onChange={(e)=>setEventForm({...eventForm, description:e.target.value})} />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    if (!eventForm.name) return;
                    addEvent(eventForm);
                    setEventForm({ name: '', venue: '', city: '', date: '', time: '', description: '' });
                  }}
                  className="rounded-lg px-4 py-2 bg-yellow-500/10 text-yellow-300 border border-yellow-500 hover:bg-yellow-500/20"
                >
                  حفظ الفعالية
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
