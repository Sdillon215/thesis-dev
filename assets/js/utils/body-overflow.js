const { body } = document;

export function bodyOverflow($overflow = true) {
	if ($overflow) {
		body.style.setProperty('overflow', 'hidden');
		body.style.setProperty('padding-right', 'var(--scrollbar-width)');
	} else {
		body.style.setProperty('overflow', '');
		body.style.setProperty('padding-right', '');
	}
}
