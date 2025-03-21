import { debounceResize } from './utils/debounce-resize';

const { on } = window.ivent;
const { getComputedStyle } = window;
const { body } = document;

function setVariable() {
	// Padding right is needed if the popup is open.
	const width =
		window.innerWidth - body.offsetWidth ||
		parseFloat(getComputedStyle(body).paddingRight);
	body.style.setProperty('--scrollbar-width', `${width}px`);
}

on(document, 'pvs.navigation.content-rendered', () => {
	setVariable();
});

on(document, 'pvs.pagination.rendered', (e) => {
	if (e.section === 'section-posts') {
		setVariable();
	}
});

debounceResize(() => {
	setVariable();
});
