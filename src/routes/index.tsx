import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import mapImg from "@/assets/park-map.jpg";
import { locations, homePond, homeQuest } from "@/lib/locations";

export default function Index() {
  useEffect(() => {
    document.title = "Александровский парк — современное городское пространство";
  }, []);
  return (
    <div className="bg-background text-ink">
      <Nav />
      <main>
        <Hero />
        <About />
        <MapSection />
        <Places />
        <Quest />
      </main>
      <Footer />
    </div>
  );
}

function scrollToId(id: string, after?: () => void) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    after?.();
  };
}

function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-black/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={scrollToId("top")}
          className="flex items-center gap-2 font-display text-[15px] font-700"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--forest)]" />
          А · ПАРК
        </button>
        <nav className="hidden md:flex items-center gap-9 text-sm text-ink/70">
          <button type="button" onClick={scrollToId("about")} className="hover:text-ink transition-colors">О парке</button>
          <button type="button" onClick={scrollToId("map")} className="hover:text-ink transition-colors">Карта</button>
          <button type="button" onClick={scrollToId("places")} className="hover:text-ink transition-colors">Локации</button>
          <Link to="/quest" className="hover:text-ink transition-colors">Квест</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/quest"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 h-10 text-sm font-500 hover:bg-[var(--forest-deep)] transition-colors"
          >
            Начать квест
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            aria-label="Открыть меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-10 w-10 inline-flex flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15"
          >
            <span className={`block h-[2px] w-5 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-5 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/5 bg-background/95 backdrop-blur">
          <nav className="mx-auto max-w-[1400px] px-6 py-4 flex flex-col gap-1 text-base">
            <button type="button" onClick={scrollToId("about", close)} className="text-left py-3 border-b border-ink/5">О парке</button>
            <button type="button" onClick={scrollToId("map", close)} className="text-left py-3 border-b border-ink/5">Карта</button>
            <button type="button" onClick={scrollToId("places", close)} className="text-left py-3 border-b border-ink/5">Локации</button>
            <Link to="/quest" onClick={close} className="py-3 border-b border-ink/5">Квест</Link>
            <Link
              to="/quest"
              onClick={close}
              className="mt-3 inline-flex items-center justify-between rounded-full bg-ink text-white px-5 h-12 font-500"
            >
              Начать квест <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


function Hero() {
  return (
    <section id="top" className="relative pt-10 lg:pt-16 overflow-hidden">
      {/* декоративные графические элементы */}
      <span className="blob" style={{ top: "-80px", left: "-60px", width: 360, height: 360, background: "var(--violet-soft)" }} />
      <span className="blob" style={{ top: "120px", right: "-100px", width: 420, height: 420, background: "var(--forest)", opacity: 0.18, animationDelay: "4s" }} />
      <span className="grain" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink/60">
            <span className="h-px w-10 bg-ink/30" />
            Санкт-Петербург · с 1845
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-ink/60">
            2026 · Открыто ежедневно
          </div>
        </div>

        <h1 className="font-display text-[clamp(2.75rem,9vw,9rem)] font-800 text-ink leading-[0.95] tracking-[-0.035em] reveal">
          Александровский
          <br />
          <span className="italic font-400 text-[var(--forest-deep)]">парк</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-5 text-lg lg:text-xl text-ink/70 max-w-xl text-balance reveal delay-1">
            Александровский парк — пространство для прогулок, где природа, архитектура и история соединяются в едином маршруте. Исследуйте локации, изучайте карту и откройте парк по-новому.
          </p>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3 reveal delay-2">
            <button
              type="button"
              onClick={scrollToId("map")}
              className="inline-flex items-center justify-between rounded-full bg-[var(--forest-deep)] text-white px-7 h-14 text-base font-500 hover:bg-ink transition-colors"
            >
              Откройте карту парка
              <span aria-hidden>↗</span>
            </button>
            <button
              type="button"
              onClick={scrollToId("places")}
              className="inline-flex items-center justify-between rounded-full border border-ink/15 px-7 h-14 text-base font-500 hover:border-ink transition-colors"
            >
              10 локаций
              <span aria-hidden>→</span>
            </button>
          </div>

        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mt-16">
        <div className="relative overflow-hidden rounded-[28px] reveal delay-3">
          <img
            src={homePond}
            alt="Александровский парк — Шапельный пруд"
            width={1920}
            height={1280}
            className="w-full h-[60vh] lg:h-[78vh] object-cover"
          />
          <div className="absolute left-6 bottom-6 lg:left-10 lg:bottom-10 text-white">
            <div className="text-xs uppercase tracking-[0.2em] opacity-80">Шапельный пруд</div>
            <div className="font-display text-xl lg:text-2xl mt-2">59.714231, 30.378149</div>
          </div>
          <div className="absolute right-6 top-6 lg:right-10 lg:top-10 rounded-full bg-white/90 backdrop-blur px-4 h-9 inline-flex items-center text-xs font-500">
            ● Прямо сейчас · +14°
          </div>
          {/* вращающийся знак-печать */}
          <div className="absolute right-6 bottom-6 lg:right-10 lg:bottom-10 h-28 w-28 lg:h-36 lg:w-36 rounded-full bg-[var(--violet-soft)]/95 backdrop-blur flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="badge-spin absolute inset-0 w-full h-full">
              <defs>
                <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="9" fill="var(--ink)" fontFamily="Unbounded" letterSpacing="2">
                <textPath href="#circlePath">ALEXANDROVSKY · PARK · 2026 · </textPath>
              </text>
            </svg>
            <span className="font-display font-700 text-2xl">А·П</span>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 border-y border-ink/10 py-6 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap font-display text-3xl lg:text-5xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 pr-10 shrink-0">
              <span>Александровский</span>
              <span className="text-[var(--violet-mute)]">●</span>
              <span className="italic font-400">парк</span>
              <span className="text-[var(--violet-mute)]">●</span>
              <span>маршрут</span>
              <span className="text-[var(--violet-mute)]">●</span>
              <span className="italic font-400">квест</span>
              <span className="text-[var(--violet-mute)]">●</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="dot-grid absolute top-10 right-10 w-48 h-48 opacity-[0.12] pointer-events-none" />
      <span className="blob" style={{ bottom: "-100px", left: "10%", width: 320, height: 320, background: "var(--forest)", opacity: 0.15 }} />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] text-ink/60">— О парке</div>
        </div>
        <div className="lg:col-span-9">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-700 text-ink text-balance">
            180 лет городской истории —<br />
            <span className="text-[var(--forest-deep)] italic font-400">пересобранной заново.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <Stat n="200" label="гектаров территории" />
            <Stat n="20+" label="исторических объектов" />
            <Stat n="XVIII–XIX" label="формирование паркового ансамбля" />
          </div>
          <p className="mt-12 max-w-2xl text-lg text-ink/70">
            Александровский парк — часть музея-заповедника «Царское Село», расположенная в городе Пушкин. Здесь сочетаются пейзажные аллеи, водоёмы, мосты и исторические павильоны, создавая одно из самых живописных пространств для прогулок.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-t border-ink/15 pt-5">
      <div className="font-display text-4xl lg:text-5xl font-700 text-ink">{n}</div>
      <div className="mt-2 text-sm text-ink/60">{label}</div>
    </div>
  );
}

function MapSection() {
  const mapItems = locations.slice(0, 5);
  return (
    <section id="map" className="bg-[var(--neutral-soft)] py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60 mb-4">— Карта</div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-700 text-balance">
              Найди свое место<br /> в парке
            </h2>
          </div>
          <button
            type="button"
            onClick={scrollToId("places")}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 h-12 text-sm font-500 hover:bg-ink hover:text-white hover:border-ink transition-colors"
          >
            Список локаций <span aria-hidden>↗</span>
          </button>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 relative overflow-hidden rounded-[24px] bg-white border border-ink/5">
            <img
              src={mapImg}
              alt="Карта Александровского парка"
              width={1600}
              height={1200}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none">
              {PIN_POSITIONS.map((p, i) => (
                <Pin key={i} top={p.top} left={p.left} label={p.label} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            {mapItems.map((p) => (
              <Link
                key={p.id}
                to={`/locations/${p.id}`}
                className="group flex items-center gap-4 rounded-[20px] bg-white border border-ink/5 p-5 hover:border-ink/30 transition-all hover:-translate-y-0.5"
              >
                <div className="h-10 w-10 rounded-full bg-[var(--violet-soft)] inline-flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-[var(--violet-mute)]" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-600 text-base">{p.title}</div>
                  <div className="text-xs text-ink/60">{p.meta}</div>
                </div>
                <span className="text-ink/30 group-hover:text-ink transition-colors" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Произвольные позиции пинов — поправь руками под свою карту
const PIN_POSITIONS = [
  { top: "28%", left: "28%", label: "Плотина" },
  { top: "35%", left: "5%", label: "Испанский ДОТ" },
  { top: "20%", left: "52%", label: "Пенсионерские конюшни" },
  { top: "34%", left: "85%", label: "Детский домик" },
  { top: "50%", left: "50%", label: "Грот-родник" },
  { top: "58%", left: "72%", label: "Китайский театр" },
  { top: "70%", left: "22%", label: "Слоновьи ворота" },
  { top: "78%", left: "35%", label: "Башня Шапель" },
];

function Pin({ top, left, label }: { top: string; left: string; label?: string }) {
  return (
    <div
      className="map-pin absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
      style={{ top, left }}
    >
      <div className="relative h-9 w-9 flex items-center justify-center">
        <span className="pin-pulse absolute inset-0 rounded-full bg-[var(--violet-mute)]" />
        <span className="pin-ring absolute inset-0 rounded-full border-2 border-[var(--violet-mute)]" />
        <span className="pin-dot relative h-4 w-4 rounded-full bg-[var(--violet-mute)] ring-4 ring-white shadow-md" />
      </div>
      {label && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-9 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap rounded-full bg-ink text-white text-[11px] font-500 px-3 h-7 inline-flex items-center pointer-events-none">
          {label}
        </div>
      )}
    </div>
  );
}

function Places() {
  return (
    <section id="places" className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-700 max-w-3xl text-balance">
            Локации, которые<br /> стоит посетить.
          </h2>
          <div className="text-sm text-ink/60 max-w-sm">
            Исследуйте многочисленные локации, собирайте собственный маршрут и возвращайтесь снова — каждый раз парк раскрывается с новой стороны.
          </div>
        </div>
      </div>

      {/* Horizontal scroller */}
      <div className="relative">
        <div
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:thin]"
        >
          <ul className="flex gap-5 px-6 lg:px-10 min-w-max">
            {locations.map((it) => (
              <li
                key={it.id}
                className="snap-start w-[280px] sm:w-[320px] lg:w-[360px] shrink-0"
              >
                <Link
                  to={`/locations/${it.id}`}
                  className="group rounded-[24px] overflow-hidden border border-ink/5 bg-white hover:-translate-y-1 transition-transform duration-500 block h-full"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={it.image}
                      alt={it.title}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur px-3 h-7 inline-flex items-center text-xs font-500">
                      {it.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg lg:text-xl font-600 leading-tight">{it.title}</h3>
                    <div className="mt-2 text-xs text-ink/60 line-clamp-2">{it.meta}</div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm font-500">Подробнее</span>
                      <span className="h-9 w-9 rounded-full bg-[var(--neutral-soft)] inline-flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-colors" aria-hidden>↗</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mt-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/50">
          <span>← листай →</span>
          <span>{locations.length} локаций</span>
        </div>
      </div>
    </section>
  );
}

function Quest() {
  return (
    <section id="quest" className="py-12 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-[var(--forest-deep)] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[520px]">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70">
                <span className="h-2 w-2 rounded-full bg-[var(--violet-soft)]" />
                Авторский квест
              </div>

              <div>
                <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-700 text-balance">
                  Открой парк<br />
                  <span className="italic font-400 text-[var(--violet-soft)]">по-новому.</span>
                </h2>
                <p className="mt-8 max-w-lg text-lg text-white/75">
                  10 точек и одна задача — пройди маршрут и собери свою версию парка.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/quest"
                  className="inline-flex items-center gap-3 rounded-full bg-white text-ink px-7 h-14 text-base font-600 hover:bg-[var(--violet-soft)] transition-colors"
                >
                  Начать квест
                  <span className="h-7 w-7 rounded-full bg-ink text-white inline-flex items-center justify-center text-xs" aria-hidden>→</span>
                </Link>
                <span className="text-sm text-white/60">~ 90–120 мин · любая погода</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[320px]">
              <img
                src={homeQuest}
                alt="Цифровой квест по парку"
                width={1600}
                height={1100}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 rounded-full bg-[var(--violet-mute)] text-white px-4 h-9 inline-flex items-center text-xs font-500">
                NEW · 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white mt-12">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="font-display text-5xl md:text-7xl font-700 text-balance leading-[0.95]">
              Александровский<br />
              <span className="italic font-400 text-[var(--violet-soft)]">парк</span>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 leading-[0.95]">Навигация</div>
            <ul className="space-y-2 text-sm">
              <li><button type="button" onClick={scrollToId("about")} className="hover:text-[var(--violet-soft)]">О парке</button></li>
              <li><button type="button" onClick={scrollToId("map")} className="hover:text-[var(--violet-soft)]">Карта</button></li>
              <li><button type="button" onClick={scrollToId("places")} className="hover:text-[var(--violet-soft)]">Локации</button></li>
              <li><Link to="/quest" className="hover:text-[var(--violet-soft)]">Квест</Link></li>
            </ul>

          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <div>© Зайцев Ю. А.</div>
          <div>Сделано с уважением к городу</div>
        </div>
      </div>
    </footer>
  );
}

