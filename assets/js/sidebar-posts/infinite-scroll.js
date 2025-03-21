import { throttle } from "throttle-debounce";
import throttleScroll from "../utils/throttle-scroll";
import debounceResize from "../utils/debounce-resize";

const { on, trigger } = window.ivent;

let scrolled = false;
const scrollBuffer = 300;
const scrollMap = new Map();

export const buttonLoading = (button) => {
	button.classList.remove('complete');
	button.classList.add('loading');
}
export const buttonDefault = (button) => {
	button.classList.remove('loading', 'complete');
}
const buttonEnd = (button) => {
	button.classList.remove('loading');
	button.classList.add('complete');
}

function setScrollMap(scrollElement, buttonEl) {
	const button = buttonEl || scrollElement.querySelector('.next-posts');
	const hasSidebar = scrollElement.classList.contains('sidebar-posts');
	const filterVal = hasSidebar ? scrollElement.querySelector('.sidebar-posts-filter').value : 'all';
	scrollElement.dataset.filter = filterVal;

	scrollMap.set(scrollElement, {
		button,
		href: button?.getAttribute('href'),
		hasLoading: button?.classList.contains('loading'),
		hasComplete: button?.classList.contains('complete'),
		clientHeight: hasSidebar ? scrollElement.clientHeight : document.documentElement.clientHeight,
		sectionClass: hasSidebar ? 'sidebar-posts' : 'section-posts',
		filter: filterVal,
		hasSidebar,
	});
}

function renderPosts(page, scrollElement, hasButtonPrev) {
	const { sectionClass, hasSidebar } = scrollMap.get(scrollElement);
	let resSection = page.querySelector(`.${sectionClass}`);
	let resPosts = Array.from(resSection.querySelectorAll('.card-post'));
	let resButton = resSection.querySelector(hasButtonPrev ? 'prev-posts' : '.next-posts');

	// If a filter is selected.
	// Get posts from a category.
	if (hasSidebar && !hasButtonPrev && scrollElement.querySelector('.sidebar-posts-filter').value !== 'all') {
		resSection = page.querySelector('.section-posts');
		resPosts = Array.from(resSection.querySelectorAll('.card-post'));
		resButton = resSection.querySelector('.next-posts');
	}

	const newPosts = hasButtonPrev ? resPosts.reverse() : resPosts;

	document.querySelectorAll(`.${sectionClass}`).forEach((section) => {
		// Update posts.
		const feedElement = section.querySelector('.posts-list');
		newPosts.forEach(function (item) {
			if (item.classList.contains('card-has-image')) {
				item.classList.remove('card-has-image');
				item.querySelector('.card-image').remove();
			};

			if (hasButtonPrev) {
				feedElement.prepend(item.cloneNode(true));
			} else {
				feedElement.append(item.cloneNode(true));
			}
		});

		// Update button load.
		const button = section.querySelector(hasButtonPrev ? '.prev-posts' : '.next-posts');
		if (!resButton) {
			if (hasButtonPrev) {
				button.remove();
			} else {
				button.removeAttribute('href');
				buttonEnd(button);
			}
		} else {
			button.setAttribute('href', resButton.href);
			buttonDefault(button);
		}
	});

	trigger(document, 'onUpdateListPosts', { section: sectionClass, sectionEl: scrollElement });
}

export function ajax(href, scrollElement, button) {
	scrolled = true;
	buttonLoading(button);

	const xhr = new XMLHttpRequest();
	xhr.responseType = 'document';
	on(xhr, 'load', function() {
		if (this.status === 404) {
			buttonDefault(button);
			return;
		};

		renderPosts(this.response, scrollElement, button.classList.contains('prev-posts'));
	});
	xhr.open('GET', href);
	xhr.send(null);
}

function onScroll(scrollElement) {
	const { button, href, hasLoading, hasComplete, clientHeight } = scrollMap.get(scrollElement);
	if (!button) return;

	// Return if already loading or complete.
	if (!href || hasLoading || hasComplete) {
		return;
	};

	// Get scroll position.
	const { top, height } = button.getBoundingClientRect();

	// Return if not scroll to the bottom.
	if (top + height - clientHeight - scrollBuffer > 0) {
		return;
	}

	ajax(href, scrollElement, button);
}

// On sidebar scroll.
on(document, 'scroll', '.sidebar-posts', throttle(100, (e) => {
	const scrollElement = e.delegateTarget;

	setScrollMap(scrollElement);
	onScroll(scrollElement);
}));

// On window scroll.
throttleScroll(() => {
	const scrollElement = document.querySelector('.section-posts');
  if (scrollElement) {
    setScrollMap(scrollElement);
    onScroll(scrollElement);
  }
});

// On window resize.
debounceResize(() => {
	// Return if not scroll.
 	if (!scrolled) return;

	const scrollElements = document.querySelectorAll('.sidebar-posts, .section-posts');
	scrollElements.forEach((scrollElement) => {
		setScrollMap(scrollElement);
	});
});

// On load more click.
on(document, 'click', '.next-posts, .prev-posts', function(e) {
	e.preventDefault();
	const button = e.delegateTarget;
	const { classList, href } = button;
	if (classList.contains('complete') || classList.contains('loading') || !href) {
		return;
	};

	const scrollElement = button.closest('.sidebar-posts') || button.closest('.section-posts');

	if (scrollElement) {
		setScrollMap(scrollElement, button);
		ajax(href, scrollElement, button);
	}
});

// On update posts list.
on(document, 'onUpdateListPosts', (e) => {
	setScrollMap(e.sectionEl);
});
