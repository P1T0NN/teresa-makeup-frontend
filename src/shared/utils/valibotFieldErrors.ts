import type { BaseIssue } from 'valibot';

/**
 * Reduces Valibot `safeParse` issues to a `{ field: message }` map keyed by the
 * top-level field name, taking the first issue per field. Designed for simple
 * client-side form validation where each input shows at most one message.
 */
export type FieldErrors<T extends string = string> = Partial<Record<T, string>>;

export function valibotFieldErrors<T extends string = string>(
	issues: readonly BaseIssue<unknown>[]
): FieldErrors<T> {
	const out: FieldErrors<T> = {};
	for (const issue of issues) {
		const key = issue.path?.[0]?.key;
		if (typeof key === 'string' && !(key in out)) {
			(out as Record<string, string>)[key] = issue.message;
		}
	}
	return out;
}

/**
 * Returns a copy of `fieldErrors` without `key`, or the same reference if the key was not set.
 * Assign back into state, e.g. `fieldErrors = clearValibotFieldError(fieldErrors, key)`.
 */
export function clearValibotFieldError<T extends string>(
	fieldErrors: FieldErrors<T>,
	key: T
): FieldErrors<T> {
	if (!(key in fieldErrors)) return fieldErrors;
	const next = { ...fieldErrors };
	delete next[key];
	return next;
}
