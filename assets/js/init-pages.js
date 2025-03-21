const { on, trigger } = window.ivent;
const { body, head } = document;

const loader = document.querySelector('.loader-page');
let progress = 0;
let pageLoad = true;
let animationId;

function updateProgressTick() {
	// Stop animation when page load.
	if (!pageLoad && progress >= 90) {
		progress = 90;
	}

	// Smooth progress.
	progress += pageLoad ? 6 :
		progress < 20 ? 2 :
		progress > 80 ? 0.03 :
		progress > 70 ? 0.05 :
		progress > 60 ? 0.08 :
		progress > 30 ? 0.1 : 0.2;

	loader.style.setProperty('--loader-progress', `${Math.min(100, progress).toFixed(2)}%`);

	animationId = requestAnimationFrame(updateProgressTick);

	// Hide loader when page load.
	if (progress >= 100) {
		loader.classList.remove('loading');
		cancelAnimationFrame(animationId);
	}
}

function loaderShow() {
	loader.classList.add('loading');
	progress = 0;
	pageLoad = false;
	animationId = requestAnimationFrame(updateProgressTick);
}

function loaderHide() {
	pageLoad = true;
}

// Ajax.
let currentHref = document.location.href;
let clicked = false;
let xhr;

const getNavLinks = () => Array.from(document.querySelectorAll('.sidebar-navigation .nav-link, .navigation-mobile .nav-link'));
const getNavPosts = () => Array.from(document.querySelectorAll('.sidebar-posts .card-link'));

const currContent = document.querySelector('.content');
const currCta = currContent.querySelector('.section-cta');
const currBreadcrumbs = currContent.querySelector('.breadcrumbs');
const curr = {
	content: currContent,
	contentAjax: currContent.querySelector('.content-ajax'),
	metaTags: Array.from(head.querySelectorAll('meta[content]')),
	headerLogo: currContent.querySelector('.header-logo'),
	hasCta: !!currCta,
	hasBreadcrumbs: !!currBreadcrumbs,
	linksNav: getNavLinks(),
	linksPost: getNavPosts(),
};

const cache = {
	[currentHref]: {
		title: document.title,
		metaTags: curr.metaTags,
		contentAjax: curr.contentAjax,
		bodyClass: body.getAttribute('class'),
		cta: currCta,
		breadcrumbs: currBreadcrumbs,
		hasScripts: true,
	},
};

// Return the `href` component of given URL object with the hash portion removed.
function stripHash(href) {
	return href.replace(/#.*/, '');
}

function getCache(key = false) {
	if (!key || !cache[key]) {
		return false;
	}
	return cache[key];
}

function toggleActivePost(href) {
	curr.linksPost.forEach((link) => {
		const item = link.parentNode;
		if (link.href === href) {
			item.classList.add('card-post-active');
		} else {
			item.classList.remove('card-post-active');
		}
	});
}

function renderPage(href) {
	const { title, metaTags, contentAjax, bodyClass, cta, breadcrumbs, hasScripts } = cache[href];

	currentHref = href;
	document.title = title;
	body.setAttribute('class', bodyClass);

	// Replace content.
	curr.contentAjax.replaceWith(contentAjax);

	// Update ghost scripts.
	if (!hasScripts) {
		const keywords = ['cards', 'comments-ui', 'portal'];
		const scripts = Array.from(document.querySelectorAll('script[src]'));
		keywords.forEach(keyword => {
			const oldScript = scripts.find(script => script.src.includes(keyword));
			if (oldScript) {
				const newScript = document.createElement('script');
				Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
				oldScript.replaceWith(newScript);
			}
		});

		cache[href].hasScripts = true;
	}

	// Save content.
	curr.contentAjax = contentAjax;

	// Replace meta tags.
	if (curr.metaTags) {
		// Remove meta tags that are not present in newMetaTags.
		curr.metaTags.forEach((oldTag) => {
			const existsInNewTags = metaTags.some((newTag) =>
				oldTag.getAttribute('name') === newTag.getAttribute('name') &&
				oldTag.getAttribute('property') === newTag.getAttribute('property')
			);
			if (!existsInNewTags) {
				oldTag.remove();
			}
		});

		// Replace existing meta tags with new meta tags.
		metaTags.forEach((newTag) => {
			const existingTag = curr.metaTags.find((oldTag) =>
				oldTag.getAttribute('name') === newTag.getAttribute('name') &&
				oldTag.getAttribute('property') === newTag.getAttribute('property')
			);
			if (existingTag) {
				existingTag.replaceWith(newTag);
			} else {
				head.appendChild(newTag);
			}
		});

		curr.metaTags = metaTags.slice();
	}

	// Add cta.
	if (!curr.hasCta && cta) {
		curr.contentAjax.after(cta.cloneNode(true));
		curr.hasCta = true;
	}

	// Add breadcrumbs.
	if (!curr.hasBreadcrumbs && breadcrumbs) {
		curr.headerLogo.after(breadcrumbs.cloneNode(true));
		curr.hasBreadcrumbs = true;
	}

	// Change active class in the navigation links.
	curr.linksNav.forEach((link) => {
		if (link.href === href) {
			link.classList.add('nav-link-current');
		} else {
			link.classList.remove('nav-link-current');
		}
	});

	// Change active class in the navigation posts.
	toggleActivePost(href);

	// Add class in the navigation blog link.
	if (body.classList.contains('post-template')) {
		curr.linksNav.filter((link) => link.classList.contains('nav-link-blog') && link.classList.add('nav-link-current'));
	}

	// Push state for new page.
	if (typeof history !== 'undefined' && clicked) {
		history.pushState({ page: href }, title, href);
	}

	loaderHide();
	trigger(document, 'onRenderPage', { page: href });
}

function onError(href) {
	window.location = href;
	loaderHide();
}

function onLoadPage(href) {
	// Return when click on current link.
	if (currentHref === href) return;

	// Render with cache.
	if (getCache(href)) {
		renderPage(href);
		return;
	}

	loaderShow();

	// Scroll to top.
	window.scroll({ top: 0, behavior: 'smooth' });

	// Stop previous request.
	if (xhr && xhr.abort) {
		xhr.abort();
		xhr = {};
	}

	// Render with ajax.
	xhr = new XMLHttpRequest();
	xhr.responseType = 'document';
	on(xhr, 'load', function() {
		if (this.status === 404) {
			onError(href);
			return;
		};

		// Set new cache.
		const page = this.response;
		cache[href] = {
			title: page.title,
			metaTags: Array.from(page.head.querySelectorAll('meta[content]')),
			contentAjax: page.querySelector('.content-ajax'),
			bodyClass: page.body.getAttribute('class'),
			cta: page.querySelector('.section-cta'),
			breadcrumbs: page.querySelector('.breadcrumbs'),
			hasScripts: false,
		};

		renderPage(href);
	});
	on(xhr, 'error', () => onError(href));
	xhr.open('GET', href);
	xhr.send(null);
}

on(document, 'click', 'a:not(.no-ajax, .button-load, [target="_blank"], [href^="#"], [href^="mailto"], [href^="javascript:"], [data-pagination])', (e) => {
	const link = e.delegateTarget;
	const { href } = link;

	// Middle click, cmd click, and ctrl click should open
	// links in a new tab as normal.
	if (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
		return;
	}

	// Ignore cross origin links
	if (window.location.protocol !== link.protocol || window.location.hostname !== link.hostname) {
		return;
	}

	// Ignore case when a hash is being tacked on the current URL.
	const cached = getCache(href);
	if (href.indexOf('#') > -1 && cached && stripHash(href) === stripHash(cached.href)) {
		return;
	}

	// Ignore if local file protocol
	if (window.location.protocol === 'file:') {
		return;
	}

	// Ignore e with default prevented
	if (e.defaultPrevented) {
		return;
	}

	e.preventDefault();
	clicked = true;

	onLoadPage(href);
});

// On state change.
on(window, 'popstate', () => {
	clicked = false;
	onLoadPage(location.origin + location.pathname + location.search);
});

// On init popup.
on(document, 'pvs.popup.init', (e) => {
	const { content } = e;
	if (content.classList.contains('sidebar')) {
		curr.linksNav = getNavLinks();
	} else {
		curr.linksPost = getNavPosts();
	}
});

// On update sidebar posts.
on(document, 'pvs.pagination.rendered', () => {
	curr.linksPost = getNavPosts();
	toggleActivePost(currentHref);
});
