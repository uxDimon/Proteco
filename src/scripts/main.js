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
	let mainSlider = new Swiper(".main-slider", {
		speed: 500,
		loop: true,
	});
}

let reviewsSlider = new Swiper(".reviews-slider", {
	speed: 400,
	loop: true,
	pagination: {
		el: ".reviews-slider__pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".reviews-slider__next",
		prevEl: ".reviews-slider__prev",
	},
	breakpoints: {
		1024: {
			slidesPerView: 3,
			spaceBetween: 22,
		},
		768: {
			slidesPerView: 2,
		},
		280: {
			slidesPerView: 1.15,
			spaceBetween: 20,
		},
	},
});

let articlePageSlider = new Swiper(".article-page__slider", {
	speed: 300,
	loop: true,
	slidesPerView: 1,
	spaceBetween: 30,
	pagination: {
		el: ".article-page__slider-pagination ",
		type: "fraction",
	},
	navigation: {
		nextEl: ".reviews-slider__next",
		prevEl: ".reviews-slider__prev",
	},
});
