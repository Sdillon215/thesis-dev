import round from "./utils/round";
import debounceResize from "./utils/debounce-resize";
import throttleScroll from "./utils/throttle-scroll";

const { on } = window.ivent;
const { documentElement } = document;

const progress = document.querySelector(".scroll-progress");
if (progress) {
	function getMaxHeight() {
		return documentElement.scrollHeight - documentElement.clientHeight;
	}

	let animationId;
	let hasStop = false;
	let maxHeight = getMaxHeight();
	let scrollProgress = window.scrollY;
	let scrollSmooth = scrollProgress + 1;

	function updateMaxHeight() {
		maxHeight = getMaxHeight();
		if (maxHeight < 500) {
			progress.classList.remove("scroll-progress-show");
		}
	}

	function updateAnimation() {
		if (!hasStop) return;

		hasStop = false;
		animationId = requestAnimationFrame(updateScrollProgress);
		scrollProgress = window.scrollY;
		scrollSmooth = scrollProgress + 1;
	}

	function lerp(start, end, amt) {
		return (1 - amt) * start + amt * end;
	}

	function updateScrollProgress() {
		scrollSmooth = lerp(scrollProgress, scrollSmooth, 0.8);

		if (scrollProgress === round(scrollSmooth) && !hasStop) {
			hasStop = true;
			cancelAnimationFrame(animationId);
			return;
		};

		progress.style.setProperty(
			"--scroll-progress",
			`${round(Math.min(100, (scrollSmooth / maxHeight) * 100).toFixed(2))}%`
		);

		animationId = requestAnimationFrame(updateScrollProgress);
	}
	animationId = requestAnimationFrame(updateScrollProgress);

	// On scroll.
	on(window, "scroll", () => {
		scrollProgress = window.scrollY;
	});

	// On render page.
	on(document, 'onRenderPage', () => {
		updateMaxHeight();
		updateAnimation();
	});

	// On update sidebar posts.
	on(document, 'pvs.pagination.rendered', (e) => {
		if (e.section === 'section-posts') {
			updateMaxHeight();
			updateAnimation();
		}
	});

	// On window resize.
	debounceResize(() => {
		updateMaxHeight();
		updateAnimation();
	});

	// Show or hide.
	throttleScroll((type, scroll) => {
		updateMaxHeight();

		if (100 < scroll && maxHeight > 500) {
			progress.classList.add("scroll-progress-show");

			updateAnimation();
		} else {
			progress.classList.remove("scroll-progress-show");
		}
	});
};
