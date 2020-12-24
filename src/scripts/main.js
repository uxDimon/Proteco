const activeClass = "active";

// data-active
const dataActiveControl = document.querySelectorAll("[data-active-control]");
if (dataActiveControl) {
	for (const activeControl of dataActiveControl) {
		const activeBlock = document.querySelector(`[data-active-block="${activeControl.dataset.activeControl}"]`);
		const activeControlList = document.querySelectorAll(`[data-active-control="${activeControl.dataset.activeControl}"]`);

		activeControl.addEventListener("click", () => {
			for (const activeControlItem of activeControlList) {
				activeControlItem.classList.toggle(activeClass);
			}
			activeBlock.classList.toggle(activeClass);
		});
	}
}

// collapse-control
const collapseControlAll = document.querySelectorAll("[data-collapse-control]");
if (collapseControlAll) {
	for (const collapseControl of collapseControlAll) {
		const collapseBlock = document.querySelector(`[data-collapse-block="${collapseControl.dataset.collapseControl}"]`);
		function collapse() {
			if (collapseControl.dataset.collapse === "true") {
				collapseBlock.style.height = collapseBlock.scrollHeight + "px";
				collapseBlock.classList.add(activeClass);
				collapseControl.classList.add(activeClass);
				collapseControl.dataset.collapse = "false";
			} else if (collapseControl.dataset.collapse === "false") {
				collapseBlock.style.height = 0;
				collapseBlock.classList.remove(activeClass);
				collapseControl.classList.remove(activeClass);
				collapseControl.dataset.collapse = "true";
			}
		}

		collapse();

		collapseControl.addEventListener("click", () => {
			collapse();
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

// https://flatpickr.js.org/
(function (global, factory) {
	typeof exports === "object" && typeof module !== "undefined"
		? factory(exports)
		: typeof define === "function" && define.amd
		? define(["exports"], factory)
		: ((global = typeof globalThis !== "undefined" ? globalThis : global || self), factory((global.ru = {})));
})(this, function (exports) {
	"use strict";

	var fp =
		typeof window !== "undefined" && window.flatpickr !== undefined
			? window.flatpickr
			: {
					l10ns: {},
			  };
	var Russian = {
		weekdays: {
			shorthand: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			longhand: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
		},
		months: {
			shorthand: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
			longhand: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		},
		firstDayOfWeek: 1,
		ordinal: function () {
			return "";
		},
		rangeSeparator: " — ",
		weekAbbreviation: "Нед.",
		scrollTitle: "Прокрутите для увеличения",
		toggleTitle: "Нажмите для переключения",
		amPM: ["ДП", "ПП"],
		yearAriaLabel: "Год",
		time_24hr: true,
	};
	fp.l10ns.ru = Russian;
	var ru = fp.l10ns;

	exports.Russian = Russian;
	exports.default = ru;

	Object.defineProperty(exports, "__esModule", { value: true });
});

const datepickerCont = document.querySelector(".datepicker-main");

let rawFile = new XMLHttpRequest();
rawFile.overrideMimeType("application/json");
rawFile.open("GET", "assets/scripts/main-date.json", false);
rawFile.send(null);
let markDate = JSON.parse(rawFile.responseText);

const markDateHtml = function (itemList) {
	const markDateIitem = function () {
		let allHtml = "";
		for (const item of itemList) {
			allHtml += `
				<div class="mark-date__item">
					<div class="mark-date__time">${item.time}</div>
					<div class="mark-date__tupe">${item.tupe}</div>
					<div class="mark-date__name">${item.name}</div>
				</div>
			`;
		}
		return allHtml;
	};

	return `
		<div class="mark-date">
			${markDateIitem()}
		</div>
		<div class="mark-date-point"></div>
	`;
};

flatpickr("#date-range", {
	mode: "range",
	inline: true,
	appendTo: datepickerCont,
	locale: "ru",
	onDayCreate: function (dObj, dStr, fp, dayElem) {
		const itemDate = flatpickr.formatDate(dayElem.dateObj, "Y-m-d");

		if (markDate[itemDate]) {
			dayElem.insertAdjacentHTML("beforeend", markDateHtml(markDate[itemDate]));
		}
	},
});
