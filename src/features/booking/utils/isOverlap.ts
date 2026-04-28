export type MsInterval = { start: number; end: number };

export function isOverlap(
	slotStart: number,
	slotEnd: number,
	intervals: readonly MsInterval[]
): boolean {
	for (const b of intervals) {
		if (slotStart < b.end && slotEnd > b.start) return true;
	}
	return false;
}
