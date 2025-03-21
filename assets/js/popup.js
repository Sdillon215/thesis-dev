import { createFocusTrap } from 'focus-trap';
import { bodyOverflow } from './utils/body-overflow';

const { body } = document;
const { on, trigger } = window.ivent;
const { getComputedStyle } = window;

const popupMap = new Map();
let zIndex = 0;
let hasShowPopup = true;

function initPopup(popup, popupId, content) {
	const computedStyle = getComputedStyle(popup);

	popupMap.set(popupId, {
		popupId,
		popup,
		popupDuration: parseFloat(computedStyle.transitionDuration) * 1000,
		popupIndex: parseFloat(computedStyle.zIndex),
		hasOverflow: popup.getAttribute('data-popup-overflow') || true,
		content,
		focusTrap: createFocusTrap(popup),
		focusTimeout: null,
		hideTimeout: null,
		hasShow: true,
	});
}

function showPopup(popupId) {
	const data = popupMap.get(popupId);
	const {
		popup,
		popupDuration,
		focusTrap,
		popupIndex,
		hideTimeout,
		hasOverflow,
	} = data;

	trigger(document, 'thesis.popup.show', { data });

	// Show.
	popup.classList.remove('popup-hide');
	popup.offsetHeight;
	popup.classList.add('popup-open');

	// Focus trap.
	const focusTimeout = setTimeout(() => {
		focusTrap?.activate();
	}, popupDuration / 2);

	// z-index.
	clearTimeout(hideTimeout);
	zIndex += 1;
	popup.style.setProperty('z-index', popupIndex + zIndex);

	data.show = true;
	data.focusTimeout = focusTimeout;
	if (hasOverflow !== 'false') {
		bodyOverflow();
	}
}

function hidePopup(popupId, data) {
	const { popup, popupDuration, focusTrap, focusTimeout } = data;

	trigger(document, 'thesis.popup.hide', { data });

	popup.classList.remove('popup-open');
	popup.offsetHeight;
	popup.classList.add('popup-hide');

	// Deactivate focus trap.
	clearTimeout(focusTimeout);
	focusTrap?.deactivate();

	// Remove z-index.
	data.show = false;
	data.hideTimeout = setTimeout(() => {
		popup.style.setProperty('z-index', '');
		popup.classList.remove('popup-hide');
	}, popupDuration);
}

function onHidePopup(popupId) {
	if (!popupMap.size) return;

	hasShowPopup = false;

	// Hide visible popup.
	if (popupId) {
		hidePopup(popupId, popupMap.get(popupId));

		popupMap.forEach(({ show }) => {
			if (show) hasShowPopup = true;
		});

		// Hide all popups.
	} else {
		popupMap.forEach((data, popupId) => {
			hidePopup(popupId, data);
		});
	}

	// Disable overflow when all popups are hidden.
	if (!hasShowPopup) {
		bodyOverflow(false);
		zIndex = 0;
	}
}

// Init and open popup.
on(document, 'click', '[href^="#popup"]', (e) => {
	e.preventDefault();
	const toggle = e.delegateTarget;
	const href = toggle.getAttribute('href');
	const popupId = href.slice(1);

	// Init popup.
	if (!popupMap.has(popupId)) {
		const findPopup = document.querySelector(`.popup[data-id="${popupId}"]`);
		if (findPopup) {
			initPopup(findPopup, popupId, findPopup.children[0]);
			showPopup(popupId);
			return;
		}

		// Create popup.
		const popup = document.createElement('div');
		popup.dataset.id = popupId;
		popup.classList.add('popup', popupId);

		// Create content.
		const content = document.querySelector(href);
		const newContent = document.createElement('div');
		newContent.className = content.className;
		newContent.innerHTML = content.innerHTML;

		// Append popup.
		popup.append(newContent);
		body.append(popup);
		popup.offsetHeight;

		initPopup(popup, popupId, newContent);
	}

	showPopup(popupId);
});

// Hide popup.
on(document, 'click', '.popup-close', (e) => {
	e.preventDefault();
	const popup = e.delegateTarget.closest('.popup');

	if (popup) {
		onHidePopup(popup.getAttribute('data-id'));
		return;
	}

	onHidePopup();
});

on(document, 'keyup', (e) => {
	if (e.key === 'Escape') onHidePopup();
});

on(document, 'pvs.navigation.loading pvs.navigation.content-render', () => {
	onHidePopup();
});
