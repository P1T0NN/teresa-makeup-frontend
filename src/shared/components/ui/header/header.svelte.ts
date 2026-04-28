export const navItems = [
	{ href: '/#services', label: 'Services' },
	{ href: '/#gallery', label: 'Gallery' },
	{ href: '/#about', label: 'About' },
	{ href: '/#contact', label: 'Contact' },
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
