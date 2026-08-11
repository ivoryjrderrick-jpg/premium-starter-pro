/**
 * Date/time helpers for the booking widget.
 *
 * The whole reason this file exists is that "2:00 PM" is meaningless on its
 * own. Availability is authored in DJ's wall-clock time (Mountain), the site
 * now serves clients nationwide, and a widget that shows a Denver time to
 * someone in Boston without saying so books the call at the wrong hour.
 *
 * Everything here works in terms of a real instant (a Date) and formats it into
 * whichever zone is being displayed, rather than doing arithmetic on strings.
 */

export interface SlotView {
  /** 'YYYY-MM-DD' in the host timezone. */
  date: string;
  /** 'HH:MM' wall clock in the host timezone. */
  time: string;
  /** The actual instant. */
  at: Date;
  /** '9:00 AM' as DJ sees it. */
  hostLabel: string;
  /** '11:00 AM' as the visitor sees it, or null when the zones agree. */
  localLabel: string | null;
}

/** The wall-clock parts of an instant, as read in a named timezone. */
function partsIn(instant: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const out: Record<string, number> = {};
  for (const p of fmt.formatToParts(instant)) {
    if (p.type !== 'literal') out[p.type] = Number(p.value);
  }
  // 24:00 shows up instead of 00:00 in some engines at midnight.
  if (out.hour === 24) out.hour = 0;
  return out;
}

/**
 * Turn a wall-clock time in a named zone into the instant it refers to.
 *
 * Two passes, because the offset you need depends on the answer you are looking
 * for. Each pass nudges the candidate instant by the gap between what the zone
 * currently reads and what we want it to read; the second pass settles the case
 * where the first landed on the other side of a DST change. This is why no
 * offset is hardcoded anywhere.
 *
 * The correction MUST be `utc += target - asRead`. Writing it the other way
 * round (`utc -= asRead - utc`) looks equivalent and is not: it diverges on the
 * second pass and shifts every result by a full UTC offset, which showed up as
 * a 9:00 AM slot rendering as 3:00 PM. Covered by the check in the block below.
 */
export function zonedToInstant(
  y: number,
  m: number,
  d: number,
  hh: number,
  mm: number,
  timeZone: string,
): Date {
  const target = Date.UTC(y, m - 1, d, hh, mm, 0);
  let utc = target;
  for (let i = 0; i < 2; i++) {
    const p = partsIn(new Date(utc), timeZone);
    const asRead = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    utc += target - asRead;
  }
  return new Date(utc);
}

/** 'YYYY-MM-DD' for an instant as read in a timezone. */
export function isoDateIn(instant: Date, timeZone: string): string {
  const p = partsIn(instant, timeZone);
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

/** Day of week (0=Sun) for an instant as read in a timezone. */
export function weekdayIn(instant: Date, timeZone: string): number {
  const name = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short' }).format(instant);
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(name);
}

export function timeLabel(instant: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(instant)
    .replace(/ /g, ' ');
}

export function dayLabel(instant: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(instant);
}

/** The visitor's IANA zone, or the host zone if the browser will not say. */
export function visitorZone(fallback: string): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || fallback;
  } catch {
    return fallback;
  }
}

/** Short zone name for the visitor, e.g. "EDT". */
export function zoneAbbr(instant: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' }).formatToParts(
    instant,
  );
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
}

export interface AvailabilityConfig {
  timezone: string;
  durationMins: number;
  leadTimeHours: number;
  horizonDays: number;
  slots: Record<number, readonly string[]>;
  blackouts: readonly string[];
}

/**
 * Bookable slots for one date, already filtered for lead time and blackouts.
 * Returns [] when the day is not bookable at all, which is what greys the date
 * out in the calendar — the calendar and the slot list read the same function,
 * so an enabled date can never turn out to have nothing behind it.
 */
export function slotsForDate(
  isoDate: string,
  cfg: AvailabilityConfig,
  visitorTz: string,
  now = new Date(),
): SlotView[] {
  if (cfg.blackouts.includes(isoDate)) return [];

  const [y, m, d] = isoDate.split('-').map(Number);
  // Midday avoids any chance of a DST transition moving the calendar day.
  const noon = zonedToInstant(y, m, d, 12, 0, cfg.timezone);
  const dow = weekdayIn(noon, cfg.timezone);
  const times = cfg.slots[dow];
  if (!times || times.length === 0) return [];

  const earliest = now.getTime() + cfg.leadTimeHours * 3600_000;
  const latest = now.getTime() + cfg.horizonDays * 86400_000;

  const out: SlotView[] = [];
  for (const time of times) {
    const [hh, mm] = time.split(':').map(Number);
    const at = zonedToInstant(y, m, d, hh, mm, cfg.timezone);
    if (at.getTime() < earliest || at.getTime() > latest) continue;

    const hostLabel = timeLabel(at, cfg.timezone);
    const local = timeLabel(at, visitorTz);
    out.push({
      date: isoDate,
      time,
      at,
      hostLabel,
      // Only worth showing when it actually differs.
      localLabel: local === hostLabel ? null : local,
    });
  }
  return out;
}

/** Whether a date has at least one bookable slot. */
export function dateIsOpen(
  isoDate: string,
  cfg: AvailabilityConfig,
  visitorTz: string,
  now = new Date(),
): boolean {
  return slotsForDate(isoDate, cfg, visitorTz, now).length > 0;
}

/** Calendar cells for a month: leading blanks, then each day of the month. */
export function monthGrid(year: number, monthIndex: number): (string | null)[] {
  const first = new Date(Date.UTC(year, monthIndex, 1));
  const lead = first.getUTCDay();
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const cells: (string | null)[] = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) {
    cells.push(`${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
  }
  return cells;
}
