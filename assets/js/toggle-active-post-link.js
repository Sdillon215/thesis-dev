const { on } = window.ivent;

// Toggle active post link when content and sidebar updated.
on(document, 'pvs.navigation.content-rendered pvs.pagination.rendered', () => {
	const currentHref = location.origin + location.pathname + location.search;

	document
		.querySelectorAll(
			'.sidebar-posts .card-link, .popup-content-posts .card-link',
		)
		.forEach((link) => {
			const item = link.parentNode;

			if (link.href === currentHref) {
				item.classList.add('card-post-active');
			} else {
				item.classList.remove('card-post-active');
			}
		});
});
