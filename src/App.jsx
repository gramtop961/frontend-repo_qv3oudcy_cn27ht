import React, { useEffect, useMemo, useState } from 'react';
import HeroHome from './components/HeroHome';
import EventsSection from './components/EventsSection';
import BoothBooking from './components/BoothBooking';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [events, setEvents] = useState([
    {
      id: 'ev-queens',
      name: 'فعالية الملكات',
      venue: 'قاعة الملكات',
      city: 'الرياض',
      date: '15 ديسمبر 2025',
      time: '5:00 م - 11:00 م',
      description:
        'فعالية فاخرة تجمع العلامات المميزة مع تجارب راقية للزوار، بتنظيم Vertex33 وبأعلى معايير الجودة.'
    },
  ]);

  const [prices, setPrices] = useState({
    entrance: 7000,
    outdoor: 6000,
    indoor: { A: 3500, B: 3000, C: 3000, D: 4500 },
  });

  // holds: key -> { eventId, boothKey, vendorName, price, crFileName, expiresAt }
  const [holds, setHolds] = useState({});
  // booked: Set of `${eventId}:${boothKey}`
  const [booked, setBooked] = useState(new Set());
  // bookings list
  const [bookings, setBookings] = useState([]);

  // cleanup interval for holds expiration
  useEffect(() => {
    const t = setInterval(() => {
      setHolds((prev) => {
        const next = { ...prev };
        const now = Date.now();
        Object.entries(prev).forEach(([k, v]) => {
          if (new Date(v.expiresAt).getTime() <= now) {
            delete next[k];
          }
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const onHold = ({ eventId, boothKey, vendorName, price, crFileName }) => {
    const key = `${eventId}:${boothKey}`;
    setHolds((prev) => ({
      ...prev,
      [key]: {
        eventId,
        boothKey,
        vendorName,
        price,
        crFileName,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      },
    }));
  };

  const onRelease = (holdKey) => {
    setHolds((prev) => {
      const n = { ...prev };
      delete n[holdKey];
      return n;
    });
  };

  const onConfirmPayment = (holdKey) => {
    const hold = holds[holdKey];
    if (!hold) return;
    const event = events.find((e) => e.id === hold.eventId);
    setBookings((prev) => [
      ...prev,
      {
        eventId: hold.eventId,
        eventName: event?.name || '',
        boothKey: hold.boothKey,
        vendorName: hold.vendorName,
        crFileName: hold.crFileName,
        amount: hold.price,
        paid: true,
        createdAt: new Date().toISOString(),
      },
    ]);
    setBooked((prev) => new Set([...Array.from(prev), holdKey]));
    onRelease(holdKey);
  };

  const forceUnbook = (holdKey) => {
    setBooked((prev) => {
      const next = new Set(Array.from(prev));
      if (next.has(holdKey)) next.delete(holdKey);
      return next;
    });
  };

  const addEvent = (data) => {
    const id = `ev-${Date.now()}`;
    setEvents((prev) => [
      ...prev,
      { id, ...data },
    ]);
  };

  const contact = useMemo(() => ({
    phone: '+966 50 375 0668',
    email: '33.event.management@gmail.com',
    address: 'الرياض - جدة، المملكة العربية السعودية',
  }), []);

  return (
    <div dir="rtl" className="bg-black text-white">
      <HeroHome />
      <EventsSection events={events} />
      <BoothBooking
        events={events}
        prices={prices}
        holds={holds}
        booked={booked}
        onHold={onHold}
        onRelease={onRelease}
        onConfirmPayment={onConfirmPayment}
      />
      <AdminDashboard
        events={events}
        bookings={bookings}
        prices={prices}
        setPrices={setPrices}
        booked={booked}
        forceUnbook={forceUnbook}
        addEvent={addEvent}
      />

      {/* Contact */}
      <section id="contact" className="bg-[#0a0a0a] py-12 border-t border-yellow-500/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-xl font-bold">تواصل معنا</div>
            <div className="text-sm text-gray-300 mt-2">للاستفسارات والشراكات</div>
          </div>
          <div className="text-sm text-gray-200">
            <div className="mb-1">📞 {contact.phone}</div>
            <div className="mb-1">📧 {contact.email}</div>
            <div>📍 {contact.address}</div>
          </div>
          <div className="text-right">
            <a href="#booking" className="inline-block rounded-lg px-4 py-2 bg-yellow-500/10 text-yellow-300 border border-yellow-500 hover:bg-yellow-500/20">احجز بوثك الآن</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} Vertex33 Event Management — جميع الحقوق محفوظة
        </div>
      </section>
    </div>
  );
}

export default App;
