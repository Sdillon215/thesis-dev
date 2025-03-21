import { debounce } from 'throttle-debounce';

const { on } = window.ivent;

/**
 * Debounce resize.
 */
const resizeArr = [];
const debounceResized = debounce(100, () => {
	if (resizeArr.length) {
		for (let k = 0; k < resizeArr.length; k += 1) {
			resizeArr[k]();
		}
	}
});

on(window, 'load', debounceResized);
on(window, 'resize', debounceResized);
on(window, 'orientationchange', debounceResized);

debounceResized();

export function debounceResize(func) {
	if (typeof func === 'function') {
		resizeArr.push(func);
	} else {
		window.dispatchEvent(new Event('resize'));
	}
}
