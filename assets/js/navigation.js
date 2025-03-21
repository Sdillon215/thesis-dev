// Remove category navigation item label prefix `- `
document.querySelectorAll('.nav-category').forEach((el) => {
	el.textContent = el.textContent.replace(/^-\s?/, '');
});
