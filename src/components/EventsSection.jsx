import React from 'react';

export default function EventsSection({ events = [] }) {
  return (
    <section id="events" dir="rtl" className="bg-[#0a0a0a] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-8"><span className="text-yellow-400">الفعاليات</span> القادمة</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div key={ev.id} className="rounded-xl border border-yellow-500/30 bg-gradient-to-b from-zinc-900 to-black p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold">{ev.name}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/30">{ev.city}</span>
              </div>
              <p className="text-sm text-gray-300 mt-2">الموقع: {ev.venue}</p>
              <p className="text-sm text-gray-300">التاريخ: {ev.date}</p>
              <p className="text-sm text-gray-300">الوقت: {ev.time}</p>
              <div className="mt-4 text-xs text-gray-400 leading-6">
                {ev.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
