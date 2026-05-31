/**
 * The GUEST BOOK — pre-seeded and read-only (the studiodunbar nod). There is no
 * submission endpoint, by design: it keeps the view-only promise and removes the
 * only would-be input/XSS/CSRF vector. Entries are static, editorial, and a bit
 * silly. Dates are fixed strings (no runtime Date — deterministic + SSR-safe).
 */
export interface GuestEntry {
  readonly name: string;
  readonly date: string;
  readonly message: string;
}

export const GUEST_ENTRIES: readonly GuestEntry[] = [
  {
    name: "QUARTERMASTER_77",
    date: "1999-12-31",
    message: "still have a pocket full of tokens. where do i insert them",
  },
  {
    name: "pixelmom",
    date: "2001-03-14",
    message: "told the kids this is educational. it is. mostly.",
  },
  {
    name: "DOOMGUY",
    date: "1994-06-06",
    message: "great museum. does it run me? asking for a fridge.",
  },
  {
    name: "snake_no_nokia",
    date: "1998-08-08",
    message: "got to 9999. the tail won. it always wins.",
  },
  {
    name: "ABO_KICHA",
    date: "2000-01-01",
    message: "Y2K happened and the only thing that crashed was my high score :(",
  },
  {
    name: "frogger_irl",
    date: "1997-05-21",
    message: "do NOT try the river part in real life. learned the hard way.",
  },
  {
    name: "CRT_enjoyer",
    date: "2003-11-02",
    message: "i can hear this website. 15 kilohertz. beautiful.",
  },
  {
    name: "the_yeti",
    date: "1991-12-25",
    message: "skifree was fine until it wasnt. you know what you did.",
  },
];
