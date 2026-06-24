import { SITE } from "@/lib/site";
import type { NavLink } from "@/types";

// /work is hidden for now (only representative/placeholder installs — no real projects yet). Flip to
// true (or remove the entry) once real case studies land. `?? true` keeps every other route visible.
const routeIsVisible: Record<string, boolean> = { "/work": false };

export const visibleNav: NavLink[] = SITE.nav.filter((link) => routeIsVisible[link.href] ?? true);
