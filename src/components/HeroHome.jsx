import React from 'react';

export default function HeroHome() {
  return (
    <section id="home" dir="rtl" className="bg-black text-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600" />
            <div className="leading-tight">
              <h1 className="text-xl font-semibold tracking-wide">Vertex33</h1>
              <p className="text-xs text-gray-300">Event Management</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
            <a href="#home" className="hover:text-yellow-400 transition">الرئيسية</a>
            <a href="#events" className="hover:text-yellow-400 transition">الفعاليات</a>
            <a href="#booking" className="hover:text-yellow-400 transition">حجز البوثات</a>
            <a href="#admin" className="hover:text-yellow-400 transition">لوحة التحكم</a>
            <a href="#contact" className="hover:text-yellow-400 transition">تواصل معنا</a>
          </nav>
        </header>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.3]">
              منصّة عربية فاخرة لإدارة الفعاليات ورفع مستوى التجربة
              <span className="block text-yellow-400">Vertex33 Event Management</span>
            </h2>
            <p className="mt-6 text-gray-300 leading-8">
              Vertex33 هي شركة متخصصة في تصميم وتنظيم الفعاليات الاستثنائية، تقدم حلولاً مبتكرة تجمع بين الفخامة والإبداع والاحترافية.
              نؤمن بأن كل تفصيلة تصنع فرقًا، وأن كل فعالية هي فرصة لخلق تجربة لا تُنسى.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="border border-yellow-500/40 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">10+</div>
                <div className="text-xs text-gray-300 mt-1">فعاليات سنويًا</div>
              </div>
              <div className="border border-yellow-500/40 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">98%</div>
                <div className="text-xs text-gray-300 mt-1">رضا العملاء</div>
              </div>
              <div className="border border-yellow-500/40 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">30K+</div>
                <div className="text-xs text-gray-300 mt-1">زائر سنويًا</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-yellow-500/30 p-6">
              <div className="text-lg font-semibold text-yellow-400">قيمنا الأساسية</div>
              <ul className="mt-4 space-y-2 text-gray-200 text-sm leading-7 list-disc pr-5">
                <li>الفخامة في التفاصيل</li>
                <li>الإبداع في التصميم والتجربة</li>
                <li>الاحترافية والالتزام</li>
                <li>الشراكات الفعالة وبناء مجتمع من العلامات</li>
              </ul>
              <div className="mt-6 border-t border-yellow-500/20 pt-4">
                <div className="text-yellow-400 font-semibold">الرؤية</div>
                <p className="text-gray-200 text-sm mt-1">
                  “أن نكون الشريك الأول في صناعة الفعاليات الاستثنائية…”
                </p>
                <div className="text-yellow-400 font-semibold mt-4">الرسالة</div>
                <p className="text-gray-200 text-sm mt-1">
                  “كل فعالية هي قصة فريدة تستحق أن تُروى بإبداع واحترافية…”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
