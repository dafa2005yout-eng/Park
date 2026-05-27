import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { questStages } from "@/lib/locations";

const norm = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/ё/g, "е")
    .replace(/[.,!?;:"'`«»\-]+/g, "")
    .replace(/\s+/g, " ");

export default function QuestPage() {
  useEffect(() => {
    document.title = "Цифровой квест — Александровский парк";
  }, []);

  const total = questStages.length;
  const [stageIdx, setStageIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const stage = questStages[stageIdx];
  const progress = Math.round(((stageIdx + (done ? 1 : 0)) / total) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (norm(answer) === norm(stage.answer)) {
      setError(false);
      if (stageIdx + 1 >= total) {
        setDone(true);
      } else {
        setStageIdx(stageIdx + 1);
        setAnswer("");
      }
    } else {
      setError(true);
    }
  };

  const handleSkip = () => {
    setError(false);
    if (stageIdx + 1 >= total) {
      setDone(true);
    } else {
      setStageIdx(stageIdx + 1);
      setAnswer("");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-soft)]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-[15px] font-700">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--forest)]" />
            А · ПАРК
          </Link>
          <div className="text-xs uppercase tracking-[0.18em] text-ink/60 hidden md:block">
            Цифровой квест · 2026
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 h-9 text-sm font-500 hover:border-ink transition-colors"
          >
            ← Выйти
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-10 lg:pt-16 pb-20">
        {done ? (
          <Finish total={total} onRestart={() => { setStageIdx(0); setAnswer(""); setDone(false); }} />
        ) : (
          <>
            {/* Stage indicator */}
            <section className="reveal">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
                  <span className="h-px w-10 bg-ink/30" />
                  Этап {String(stage.num).padStart(2, "0")} из {String(total).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-ink/60">
                  {progress}% пройдено
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 w-full bg-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--forest-deep)] transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Stage steps */}
              <div className="mt-5 flex flex-wrap gap-2">
                {questStages.map((s) => {
                  const passed = s.num < stage.num;
                  const active = s.num === stage.num;
                  return (
                    <div
                      key={s.num}
                      className={`h-9 min-w-9 px-3 rounded-full inline-flex items-center justify-center text-xs font-600 ${
                        active
                          ? "bg-ink text-white"
                          : passed
                            ? "bg-[var(--forest)] text-white"
                            : "bg-white border border-ink/10 text-ink/40"
                      }`}
                    >
                      {passed ? "✓" : String(s.num).padStart(2, "0")}
                    </div>
                  );
                })}
              </div>

              <h1 className="mt-10 font-display text-4xl md:text-5xl lg:text-6xl font-800 text-ink text-balance">
                {stage.title}
                <span className="text-[var(--forest-deep)]">.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base text-ink/70 text-balance">{stage.hint}</p>
            </section>

            {/* Question + answer */}
            <section className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch reveal delay-1">
              {/* Question */}
              <div className="lg:col-span-6 rounded-[28px] bg-white border border-ink/5 p-7 md:p-10 flex flex-col justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-ink/60">— Вопрос</div>
                <h2 className="mt-6 font-display text-2xl md:text-3xl font-700 text-ink text-balance">
                  {stage.question}
                </h2>
                <div className="mt-8 flex items-center gap-3 text-sm text-ink/60">
                  <span className="h-9 w-9 rounded-full bg-[var(--violet-soft)] text-[var(--violet-mute)] font-display font-700 inline-flex items-center justify-center">
                    ?
                  </span>
                  Ответ можно ввести в любом регистре
                </div>
              </div>

              {/* Answer form */}
              <div className="lg:col-span-6 rounded-[28px] bg-[var(--forest-deep)] text-white p-7 md:p-10 flex flex-col justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">— Твой ответ</div>

                <form onSubmit={handleSubmit} className="mt-8">
                  <label htmlFor="answer" className="sr-only">Ответ</label>
                  <input
                    id="answer"
                    type="text"
                    autoComplete="off"
                    value={answer}
                    onChange={(e) => { setAnswer(e.target.value); setError(false); }}
                    placeholder={stage.placeholder}
                    className={`w-full bg-transparent border-b-2 outline-none font-display text-xl md:text-2xl font-600 placeholder:text-white/30 pb-3 transition-colors ${
                      error ? "border-[var(--violet-soft)]" : "border-white/30 focus:border-white"
                    }`}
                  />

                  <div className="mt-3 h-5 text-sm">
                    {error ? (
                      <span className="text-[var(--violet-soft)]">Не угадал — попробуй ещё раз</span>
                    ) : (
                      <span className="text-white/55">Нажмите кнопку «Дальше», чтобы узнать следующую локацию</span>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 rounded-full bg-white text-ink px-7 h-12 text-sm font-600 hover:bg-[var(--violet-soft)] transition-colors"
                    >
                      Дальше
                      <span className="h-7 w-7 rounded-full bg-ink text-white inline-flex items-center justify-center text-xs" aria-hidden>→</span>
                    </button>
                  </div>
                </form>
              </div>
            </section>

            {/* Helper row */}
            <section className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/60">
              <button
                type="button"
                onClick={() => alert(`Подсказка: правильный ответ — «${stage.answer}»`)}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 h-11 font-500 hover:border-ink transition-colors"
              >
                <span aria-hidden>💡</span> Подсказка
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 h-11 font-500 hover:border-ink transition-colors"
              >
                Пропустить этап <span aria-hidden>→</span>
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function Finish({ total, onRestart }: { total: number; onRestart: () => void }) {
  const words = ["Маршрут", "пройден"];
  const colors = ["var(--forest-deep)", "var(--violet-mute)", "var(--violet-soft)", "var(--forest)", "#fff"];
  const confetti = Array.from({ length: 80 }).map((_, i) => ({
    left: Math.random() * 100,
    x: (Math.random() - 0.5) * 240,
    delay: Math.random() * 1.2,
    duration: 2.6 + Math.random() * 2.4,
    color: colors[i % colors.length],
    rotate: Math.random() * 360,
  }));

  return (
    <section className="relative reveal is-visible py-10 overflow-hidden min-h-[80vh]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${c.left}%`,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              transform: `rotate(${c.rotate}deg)`,
              ["--x" as string]: `${c.x}px`,
            }}
          />
        ))}
      </div>

      <div className="absolute left-1/2 top-32 -translate-x-1/2 w-[420px] h-[420px] pointer-events-none">
        <span className="finish-ring inset-0" style={{ animationDelay: "0s" }} />
        <span className="finish-ring inset-0" style={{ animationDelay: "0.8s" }} />
        <span className="finish-ring inset-0" style={{ animationDelay: "1.6s" }} />
      </div>

      <div className="relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] text-ink/60">— Финал</div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl font-800 text-ink text-balance">
          <span className="finish-headline">
            {words.map((w, i) => (
              <span
                key={i}
                style={{ animationDelay: `${0.15 + i * 0.18}s`, marginRight: "0.3em" }}
              >
                {w}
              </span>
            ))}
            <span style={{ animationDelay: "0.55s", color: "var(--forest-deep)" }}>.</span>
          </span>
        </h1>

        <div className="mt-8 flex items-center gap-4">
          <div className="relative h-20 w-20 rounded-full bg-[var(--forest-deep)] text-white flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="badge-spin absolute inset-0 w-full h-full">
              <defs>
                <path id="finishCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="9" fill="white" fontFamily="Unbounded" letterSpacing="2">
                <textPath href="#finishCircle">FINISH · 2026 · А·ПАРК · </textPath>
              </text>
            </svg>
            <span className="text-2xl">★</span>
          </div>
          <div>
            <div className="font-display text-2xl font-700">{total} из {total}</div>
            <div className="text-sm text-ink/60">этапов пройдено</div>
          </div>
        </div>

        <p className="mt-8 max-w-xl text-lg text-ink/70">
          Вы прошли все {total} этапов и собрали свою версию Александровского парка. Поделитесь маршрутом с теми, кто ещё не был.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-3 rounded-full bg-ink text-white px-7 h-12 text-sm font-600 hover:bg-[var(--forest-deep)] transition-colors"
          >
            Пройти ещё раз <span aria-hidden>↺</span>
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full border border-ink/15 px-7 h-12 text-sm font-600 hover:border-ink transition-colors"
          >
            На главную <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
