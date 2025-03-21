const { on } = window.ivent;

on(document, 'click', '[data-copy-link]', async (e) => {
	e.preventDefault();

	try {
		await navigator.clipboard.writeText(
			e.delegateTarget.getAttribute('data-copy-link'),
		);
	} catch (err) {
		console.error(err);
	}
});
