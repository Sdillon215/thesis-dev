const { on, trigger } = window.ivent;

let currentHref = document.location.href;
let filter;
let oldFilter;
let cache = {};

function renderPosts(data) {
	const { posts, buttonPrev, buttonNext } = data;
	const sidebars = document.querySelectorAll('.sidebar-posts');

	posts.filter((item) => item.querySelector('.card-link').href === currentHref && item.classList.add('card-post-active'));
	sidebars.forEach((sidebar) => {
		const sidebarBody = sidebar.querySelector('.sidebar-body');
		const feedElement = sidebarBody.querySelector('.navigation-posts');
		const oldPosts = sidebarBody.querySelectorAll('.card-post');

		oldPosts.forEach((item) => item.remove());
		posts.forEach((item) => {
			feedElement.appendChild(item.cloneNode(true));
		});

		sidebarBody.querySelector('.next-posts')?.remove();
		sidebarBody.querySelector('.prev-posts')?.remove();
		if (buttonNext) {
			sidebarBody.append(buttonNext.cloneNode(true));
		};
		if (buttonPrev) {
			sidebarBody.prepend(buttonPrev.cloneNode(true));
		}

		sidebar.classList.remove('loading');
		trigger(document, 'onUpdateListPosts', { section: 'sidebar-posts', sectionEl: sidebar });
	});
}

on(document, 'change', '.sidebar-posts-filter', (e) => {
	const select = e.delegateTarget;
	filter = select.value;
	const sidebars = document.querySelectorAll('.sidebar-posts');
	const sidebar = select.closest('.sidebar-posts');

	sidebars.forEach((item) => {
		item.querySelector('.sidebar-posts-filter').value = filter;
		item.classList.add('loading');
	});

	// Update cache.
	cache[oldFilter || 'all'] = {
		posts: Array.from(sidebar.querySelectorAll('.card-post')),
		buttonPrev: sidebar.querySelector('.prev-posts'),
		buttonNext: sidebar.querySelector('.next-posts'),
	};
	oldFilter = filter;

	// Render with cache.
	if (cache[filter]) {
		renderPosts(cache[filter]);
		return;
	}

	if (filter === 'all') return;

	console.log(filter);

	let xhr = new XMLHttpRequest();
	xhr.responseType = 'document';
	on(xhr, 'load', function() {
		if (this.status === 404) return;

		const resSection = this.response.querySelector('.section-posts');

		cache[filter] = {
			posts: Array.from(resSection.querySelectorAll('.card-post')),
			buttonPrev: null,
			buttonNext: resSection.querySelector('.next-posts'),
		};
		sidebar.scroll({ top: 0, behavior: 'smooth' });

		renderPosts(cache[filter]);
	});
	xhr.open('GET', filter);
	xhr.send(null);
});
