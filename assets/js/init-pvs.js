/**
 * Init features from our PVS framework.
 */

const { pvs } = window;

if (pvs) {
	pvs.initDarkMode();
	pvs.initLightbox({ zIndex: 9999 });
	pvs.initScrollProgress();
	pvs.initFilter();
	pvs.initPagination();
	pvs.initDropdown();

	// It is required to init navigation after filter and pagination.
	pvs.initNavigation();
}
