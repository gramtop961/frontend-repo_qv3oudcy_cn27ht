import React, { useMemo, useState } from 'react';

function Booth({ id, label, status, price, onSelect }) {
  const isBooked = status === 'booked';
  const isHeld = status === 'held';
  return (
    <button
      onClick={() => onSelect(id)}
      disabled={isBooked}
      className={`rounded-lg border p-2 text-xs md:text-sm transition w-full text-center h-10 flex items-center justify-center ${
        isBooked
          ? 'bg-zinc-800 border-zinc-700 text-zinc-400 line-through'
          : isHeld
          ? 'bg-yellow-900/20 border-yellow-600 text-yellow-300'
          : 'bg-black border-yellow-700/40 hover:border-yellow-400 hover:bg-zinc-900 text-white'
      }`}
      title={isBooked ? 'محجوز' : 'متاح'}
    >
      <div className="flex flex-col items-center leading-none">
        <span>{label}</span>
        {!isBooked && (
          <span className="text-[10px] text-yellow-300/80 mt-0.5">{price.toLocaleString()} ر.س</span>
        )}
        {isBooked && <span className="text-[10px] text-zinc-400 mt-0.5">محجوز</span>}
      </div>
    </button>
  );
}

export default function BoothBooking({
  events,
  prices,
  holds,
  booked,
  onHold,
  onRelease,
  onConfirmPayment,
}) {
  const [vendor, setVendor] = useState({ name: '', logged: false });
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || null);
  const [crFile, setCrFile] = useState(null);

  const currentEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId),
    [events, selectedEventId]
  );

  const allBooths = useMemo(() => {
    const res = [];
    // Entrance (3)
    for (let i = 1; i <= 3; i++) {
      res.push({ key: `Entrance-${i}`, label: `المدخل ${i}`, price: prices.entrance, area: 'entrance' });
    }
    // Outdoor (8 sample)
    for (let i = 1; i <= 8; i++) {
      res.push({ key: `Outdoor-${i}`, label: `خارجي ${i}`, price: prices.outdoor, area: 'outdoor' });
    }
    // Indoor A-D
    const sections = [
      ['A', 10],
      ['B', 20],
      ['C', 20],
      ['D', 5],
    ];
    sections.forEach(([sec, count]) => {
      for (let i = 1; i <= count; i++) {
        res.push({ key: `${sec}-${i}`, label: `داخلي ${sec}-${i}`, price: prices.indoor[sec], area: 'indoor' });
      }
    });
    return res;
  }, [prices]);

  const statusOf = (key) => {
    const holdKey = `${selectedEventId}:${key}`;
    if (booked.has(holdKey)) return 'booked';
    if (holds[holdKey]) return 'held';
    return 'available';
  };

  const handleSelect = (key) => {
    if (!vendor.logged) {
      alert('يرجى تسجيل الدخول كمالك علامة تجارية أولاً');
      return;
    }
    if (!crFile) {
      alert('يرجى رفع السجل التجاري للتحقق');
      return;
    }
    const status = statusOf(key);
    if (status !== 'available') return;
    const booth = allBooths.find((b) => b.key === key);
    onHold({
      eventId: selectedEventId,
      boothKey: key,
      vendorName: vendor.name,
      price: booth.price,
      crFileName: crFile?.name || '',
    });
  };

  const myHold = useMemo(() => {
    const items = Object.entries(holds).filter(([k]) => k.startsWith(`${selectedEventId}:`));
    const item = items.find(([, v]) => v.vendorName === vendor.name);
    if (!item) return null;
    const [key, value] = item;
    return { key, value };
  }, [holds, selectedEventId, vendor.name]);

  const remaining = () => {
    if (!myHold) return null;
    const diff = Math.max(0, Math.floor((new Date(myHold.value.expiresAt).getTime() - Date.now()) / 1000));
    const mm = String(Math.floor(diff / 60)).padStart(2, '0');
    const ss = String(diff % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <section id="booking" dir="rtl" className="bg-black text-white py-16 border-t border-yellow-500/10">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-8">
          <span className="text-yellow-400">حجز</span> البوثات
        </h3>

        {/* Vendor Login */}
        <div className="rounded-xl border border-yellow-500/30 p-6 bg-gradient-to-b from-zinc-900 to-black">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">اسم المالك / العلامة</label>
              <input
                type="text"
                className="w-full bg-black border border-yellow-700/40 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
                placeholder="أدخل الاسم"
                value={vendor.name}
                onChange={(e) => setVendor((v) => ({ ...v, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">السجل التجاري</label>
              <input
                type="file"
                accept="application/pdf,image/*"
                className="w-full bg-black border border-yellow-700/40 rounded-lg px-3 py-2"
                onChange={(e) => setCrFile(e.target.files?.[0] || null)}
              />
              {crFile && (
                <p className="text-xs text-gray-400 mt-1">تم اختيار: {crFile.name}</p>
              )}
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  if (!vendor.name) return alert('يرجى إدخال الاسم');
                  setVendor((v) => ({ ...v, logged: true }));
                }}
                className={`w-full rounded-lg px-4 py-2 font-semibold transition border ${
                  vendor.logged
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500'
                    : 'bg-yellow-500/10 text-yellow-300 border-yellow-500 hover:bg-yellow-500/20'
                }`}
              >
                {vendor.logged ? 'تم تسجيل الدخول' : 'تسجيل الدخول'}
              </button>
            </div>
          </div>
        </div>

        {/* Event Select */}
        <div className="mt-6 grid md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-2">اختر الفعالية</label>
            <select
              value={selectedEventId || ''}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full bg-black border border-yellow-700/40 rounded-lg px-3 py-2 text-white"
            >
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} - {e.venue}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-gray-400">
            • منطقة خارجية مخصصة للأطعمة (حجم مؤقت)
            <br />• جميع البوثات الداخلية 2×2 متر
          </div>
        </div>

        {/* Layout */}
        <div className="mt-8 grid gap-6">
          {/* Entrance */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-yellow-300">المدخل</h4>
              <span className="text-xs text-gray-400">السعر: {prices.entrance.toLocaleString()} ر.س / يوم</span>
            </div>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-6 gap-2">
              {allBooths
                .filter((b) => b.area === 'entrance')
                .map((b) => (
                  <Booth
                    key={b.key}
                    id={b.key}
                    label={b.label}
                    price={b.price}
                    status={statusOf(b.key)}
                    onSelect={handleSelect}
                  />
                ))}
            </div>
          </div>
          {/* Outdoor */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-yellow-300">منطقة خارجية (أطعمة)</h4>
              <span className="text-xs text-gray-400">السعر: {prices.outdoor.toLocaleString()} ر.س / يوم</span>
            </div>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-8 gap-2">
              {allBooths
                .filter((b) => b.area === 'outdoor')
                .map((b) => (
                  <Booth
                    key={b.key}
                    id={b.key}
                    label={b.label}
                    price={b.price}
                    status={statusOf(b.key)}
                    onSelect={handleSelect}
                  />
                ))}
            </div>
          </div>
          {/* Indoor */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-300">المنطقة الداخلية</h4>
            <div className="text-xs text-gray-400 mt-1">جميع البوثات 2×2 متر</div>
            {(['A', 'B', 'C', 'D']).map((sec) => (
              <div key={sec} className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-200">القسم {sec}</div>
                  <span className="text-xs text-gray-400">السعر: {prices.indoor[sec].toLocaleString()} ر.س / يوم</span>
                </div>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-10 gap-2">
                  {allBooths
                    .filter((b) => b.label.includes(`داخلي ${sec}`))
                    .map((b) => (
                      <Booth
                        key={b.key}
                        id={b.key}
                        label={b.label}
                        price={b.price}
                        status={statusOf(b.key)}
                        onSelect={handleSelect}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hold Actions */}
        <div className="mt-8">
          {myHold ? (
            <div className="rounded-xl border border-yellow-500/30 p-4 bg-gradient-to-b from-zinc-900 to-black flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm">
                تم حجز البوث مؤقتًا باسم <span className="text-yellow-300 font-semibold">{vendor.name}</span>
                <span className="mx-2">|</span>
                الوقت المتبقي لإتمام الدفع: <span className="font-mono text-yellow-300">{remaining()}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onConfirmPayment(myHold.key)}
                  className="rounded-lg px-4 py-2 bg-emerald-600/20 text-emerald-300 border border-emerald-500 hover:bg-emerald-600/30"
                >
                  الدفع عبر Apple Pay
                </button>
                <button
                  onClick={() => onRelease(myHold.key)}
                  className="rounded-lg px-4 py-2 bg-red-600/20 text-red-300 border border-red-500 hover:bg-red-600/30"
                >
                  إلغاء الحجز
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-400">اختر بوثًا لبدء الحجز المؤقت (30 دقيقة)</div>
          )}
        </div>
      </div>
    </section>
  );
}
