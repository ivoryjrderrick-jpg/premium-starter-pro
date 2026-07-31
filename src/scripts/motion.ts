/**
 * The three approved motions, ported from the reference concepts.
 *
 *  1. Scroll reveal  — sections fade up 22px, once, threshold .12
 *  2. Stat count-up  — 1.5s easeOutCubic, threshold .6, once, gold meter fills alongside
 *  3. Price drop     — standard -> current over 1.1s after a 350ms beat, then
 *                      gold, struck standard rate, then badge. ~2.2s total.
 *                      Both figures come from `pricing` in config/site.ts via
 *                      data-from/data-to, so a price change needs no edit here.
 *
 * Under prefers-reduced-motion every one renders its FINAL state immediately
 * with no transition — the count-ups show their target, the price shows the
 * current rate with the struck standard rate already in place.
 */

const reduce =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ---- 1. Scroll reveal ---------------------------------------------------- */

function initReveal() {
  const rises = document.querySelectorAll<HTMLElement>('.rise');
  if (reduce || !('IntersectionObserver' in window)) {
    rises.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);

        // Start on the next frame so the browser has a paint to promote the
        // layer before the transition begins — without it the first frame of
        // the reveal can hitch on slower devices.
        requestAnimationFrame(() => el.classList.add('in'));

        // Release the compositing hint once the movement is over. Staggered
        // children finish after the parent, so wait for the last one.
        const release = (ev: TransitionEvent) => {
          if (ev.target !== el && !el.contains(ev.target as Node)) return;
          window.setTimeout(() => el.classList.add('settled'), 700);
          el.removeEventListener('transitionend', release);
        };
        el.addEventListener('transitionend', release);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  rises.forEach((el) => io.observe(el));
}

/* ---- 2. Stat count-up + meter -------------------------------------------- */

function countUp(el: HTMLElement) {
  const to = parseFloat(el.dataset.to ?? '0');
  const suffix = el.dataset.suffix ?? '';
  if (reduce) {
    el.textContent = to + suffix;
    return;
  }
  const dur = 1500;
  let start: number | null = null;
  function step(ts: number) {
    if (start === null) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.round(easeOutCubic(p) * to) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initStats() {
  const stats = document.querySelectorAll<HTMLElement>('.count');
  const meters = document.querySelectorAll<HTMLElement>('.meter i');

  if (reduce || !('IntersectionObserver' in window)) {
    stats.forEach(countUp);
    meters.forEach((m) => (m.style.width = `${m.dataset.fill}%`));
    return;
  }

  const statIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          countUp(e.target as HTMLElement);
          statIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 },
  );
  stats.forEach((el) => statIO.observe(el));

  const meterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.width = `${el.dataset.fill}%`;
          meterIO.unobserve(el);
        }
      });
    },
    { threshold: 0.6 },
  );
  meters.forEach((el) => meterIO.observe(el));
}

/* ---- 3. Price drop ------------------------------------------------------- */

function initPrice() {
  const box = document.getElementById('pricebox');
  const num = document.getElementById('priceNum');
  if (!box || !num) return;

  const from = parseFloat(box.dataset.from ?? '0');
  const to = parseFloat(box.dataset.to ?? '0');

  // The markup ships the current rate so the box is correct without JS. Once
  // the count-up is going to run, wind it back to the standard rate first.
  if (!reduce) num.textContent = String(from);

  function run() {
    if (reduce) {
      num!.textContent = String(to);
      box!.classList.add('go');
      return;
    }
    const dur = 1100;
    let start: number | null = null;
    function step(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      num!.textContent = String(Math.round(from - easeOutCubic(p) * (from - to)));
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        num!.textContent = String(to);
        // `go` drives the colour shift, the rising struck standard rate, and
        // the badge — all sequenced by CSS transition delays.
        box!.classList.add('go');
      }
    }
    requestAnimationFrame(step);
  }

  if (reduce || !('IntersectionObserver' in window)) {
    run();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(run, 350);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  io.observe(box);
}

initReveal();
initStats();
initPrice();
