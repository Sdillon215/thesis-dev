const { on } = window.ivent;

const sidebar = document.querySelector('.sidebar-posts');
let activePost = document.querySelector('.card-post-active');

function scrollToPost() {
	const { scrollHeight, clientHeight, scrollTop } = sidebar;
	if (!activePost || scrollHeight <= clientHeight) return;

	const itemOffsetTop = activePost.offsetTop;
	const itemHeight = activePost.clientHeight;
	const a = itemOffsetTop - clientHeight + itemHeight;

	if (scrollTop > itemOffsetTop || scrollTop < a) {
		sidebar.scroll({
			top: itemOffsetTop - clientHeight / 2 + itemHeight / 2,
			behavior: 'smooth',
		});
	}
}

scrollToPost();

// On render page.
on(document, 'pvs.navigation.content-rendered', () => {
	activePost = document.querySelector('.card-post-active');

	scrollToPost();
});

// On update list posts.
on(document, 'pvs.pagination.rendered', () => {
	activePost = document.querySelector('.card-post-active');
});
