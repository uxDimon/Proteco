const activeClass = "active";

// data-active
const dataActiveControl = document.querySelectorAll("[data-active-control]");

if (dataActiveControl) {
	for (const activeControl of dataActiveControl) {
		const activeBlock = document.querySelector(`[data-active-block="${activeControl.dataset.activeControl}"]`);

		activeControl.addEventListener("click", () => {
			activeControl.classList.toggle(activeClass);
			activeBlock.classList.toggle(activeClass);
		});
	}
}

// Слайдер
// https://swiperjs.com/api

if (document.querySelectorAll(".main-slider .swiper-slide").length > 1) {
	let reviews = new Swiper(".main-slider", {
		speed: 500,
		loop: true,
	});
}

let reviews = new Swiper(".reviews-slider", {
	speed: 400,
	loop: true,
	slidesPerView: 3,
	spaceBetween: 22,
	pagination: {
		el: ".reviews-slider__pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".reviews-slider__next",
		prevEl: ".reviews-slider__prev",
	},
});
