import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { locations } from "@/lib/locations";

export default function LocationPage() {
  const { id } = useParams<{ id: string }>();
  const location = locations.find((l) => l.id === id);

  useEffect(() => {
    document.title = location
      ? `${location.title} — Александровский парк`
      : "Локация — Александровский парк";
  }, [location]);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-display text-6xl font-700">404</div>
          <p className="mt-4 text-ink/60">Локация не найдена</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 h-11 text-sm font-500"
          >
            ← На главную
          </Link>
        </div>
      </div>
    );
  }

  const all = locations;
  const idx = all.findIndex((l) => l.id === location.id);
  const next = all[(idx + 1) % all.length];

  const gallery: { src: string; orientation: "h" | "v" }[] = [
    { src: location.image, orientation: "h" },
    { src: location.verticals[0], orientation: "v" },
    { src: location.verticals[1], orientation: "v" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-[15px] font-700">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--forest)]" />
            А · ПАРК
          </Link>
          <div className="text-xs uppercase tracking-[0.18em] text-ink/60 hidden md:block">
            Локация № {location.num}
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 h-9 text-sm font-500 hover:border-ink transition-colors"
          >
            ← Все локации
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-12 lg:pt-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8 reveal">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
              <span className="h-px w-10 bg-ink/30" />
              {location.tag} · № {location.num}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60">{location.meta}</div>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,9vw,7rem)] font-800 text-ink leading-[0.95] tracking-[-0.03em] reveal">
            {location.title}
            <span className="text-[var(--forest-deep)]">.</span>
          </h1>
        </section>

        <section className="mt-12">
          <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:thin]">
            <ul className="flex gap-5 px-6 lg:px-10 min-w-max items-stretch">
              {gallery.map((g, i) => (
                <li
                  key={i}
                  className={`snap-start shrink-0 ${
                    g.orientation === "h"
                      ? "w-[88vw] md:w-[70vw] lg:w-[920px]"
                      : "w-[55vw] md:w-[36vw] lg:w-[440px]"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-[24px] h-[58vh] lg:h-[68vh]">
                    <img
                      src={g.src}
                      alt={`${location.title} — фото ${i + 1}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/50">
            <span>← листай →</span>
            <span>{gallery.length} фото</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 lg:py-36 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60">— Описание</div>
          </div>
          <div className="lg:col-span-9 max-w-3xl">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-500 text-ink text-balance leading-tight">
              {location.description}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-24">
          <div className="rounded-[28px] bg-[var(--neutral-soft)] p-8 md:p-12 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-ink/60">— Дальше</div>
              <div className="mt-3 font-display text-3xl md:text-5xl font-700 text-balance">
                {next.title}
              </div>
              <div className="mt-2 text-sm text-ink/60">{next.meta}</div>
            </div>
            <Link
              to={`/locations/${next.id}`}
              className="inline-flex items-center gap-3 rounded-full bg-ink text-white px-7 h-14 text-base font-600 hover:bg-[var(--forest-deep)] transition-colors"
            >
              Следующая локация
              <span
                className="h-7 w-7 rounded-full bg-white text-ink inline-flex items-center justify-center text-xs"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
