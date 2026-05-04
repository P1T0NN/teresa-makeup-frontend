import { UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants.js';
import { m } from '@/shared/lib/paraglide/messages';

/** Section anchors on `/` via {@link UNPROTECTED_PAGE_ENDPOINTS}. */
export const navItems = [
	{ href: UNPROTECTED_PAGE_ENDPOINTS.SERVICES, label: m['Header.services']() },
	{ href: UNPROTECTED_PAGE_ENDPOINTS.PORTFOLIO, label: m['Header.gallery']() },
	{ href: UNPROTECTED_PAGE_ENDPOINTS.ABOUT_ME, label: m['Header.about']() },
	{ href: UNPROTECTED_PAGE_ENDPOINTS.CONTACT, label: m['Header.contact']() }
] as const;

export const navLinkClass =
	'text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export const navLinkActiveClass =
	'text-primary bg-primary/10 font-semibold hover:bg-primary/15 hover:text-primary';

class NormalHeader {
	menuOpen = $state(false);

	closeMenu() {
		this.menuOpen = false;
	}
}

export const normalHeader = new NormalHeader();
