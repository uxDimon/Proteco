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
			slidesPerView: 1.1,
			spaceBetween: 15,
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

let calendarConf = {
	mode: "range",
	// static: true,
	// inline: true,
	// appendTo: null,
	locale: "ru",
	onDayCreate: function (dObj, dStr, fp, dayElem) {
		const itemDate = flatpickr.formatDate(dayElem.dateObj, "Y-m-d");

		if (markDate[itemDate]) {
			dayElem.insertAdjacentHTML("beforeend", markDateHtml(markDate[itemDate]));
		}
	},
};

let calendar;
const calendarWrap = document.querySelector("#date-range");
function initCalendar() {
	if (calendarWrap) {
		if (document.body.clientWidth >= 768) {
			calendarConf.static = false;
			calendarConf.inline = false;
			calendarConf.appendTo = datepickerCont;
		}
		if (document.body.clientWidth < 768) {
			calendarConf.static = true;
			calendarConf.inline = true;
			calendarConf.appendTo = false;
		}
		calendar = flatpickr(calendarWrap, calendarConf);
	}
}

let calendarPage;
const calendarPageWrap = document.querySelector("#date-range-page");
function initCalendarPage() {
	if (calendarPageWrap) {
		if (document.body.clientWidth >= 768) {
			calendarConf.static = false;
			calendarConf.inline = false;
		}
		if (document.body.clientWidth < 768) {
			calendarConf.static = true;
			calendarConf.inline = true;
		}
		calendarPage = flatpickr(calendarPageWrap, calendarConf);
	}
}

window.onresize = function () {
	initCalendar();
	initCalendarPage();
};

initCalendar();
initCalendarPage();

// audio-player
const playerProgressList = document.querySelectorAll(".audio-player__progres");

function secInPers(now, end, element) {
	element.style.setProperty("--progres", (now * 100) / end + "%");
}

if (playerProgressList) {
	for (const playerProgress of playerProgressList) {
		const inputRange = playerProgress.querySelector('input[type="range"]');
		const mimicProgress = playerProgress.querySelector(".audio-player__progres-mimic");

		inputRange.addEventListener("input", () => {
			secInPers(inputRange.value, inputRange.max, mimicProgress);
		});
	}
}

const audioPlayerList = document.querySelectorAll(".audio-player");
function secondsToHms(d) {
	d = Number(d);
	const h = Math.floor(d / 3600),
		m = Math.floor((d % 3600) / 60),
		s = Math.floor((d % 3600) % 60),
		hDisplay = h > 0 ? h + ":" : "",
		mDisplay = m > 0 ? (m <= 9 ? (h > 0 ? "0" : "") : "") + m + ":" : "0:",
		sDisplay = s <= 9 ? "0" + s : s;
	return hDisplay + mDisplay + sDisplay;
}

if (audioPlayerList) {
	for (const audioPlayer of audioPlayerList) {
		const audio = audioPlayer.querySelector("audio"),
			progres = audioPlayer.querySelector(".audio-player__progres > input"),
			progresMimic = audioPlayer.querySelector(".audio-player__progres-mimic"),
			playPause = audioPlayer.querySelector(".audio-player__play-pause"),
			rewindBack = audioPlayer.querySelector(".audio-player__rewind_back"),
			rewindForward = audioPlayer.querySelector(".audio-player__rewind_forward"),
			volumebutton = audioPlayer.querySelector(".audio-player__volume-button"),
			volumeProgresInput = audioPlayer.querySelector(".audio-player__volume-progres > input"),
			volumeProgresMimic = audioPlayer.querySelector(".audio-player__volume-progres > .audio-player__progres-mimic"),
			timeNow = audioPlayer.querySelector(".audio-player__time-now"),
			timeEnd = audioPlayer.querySelector(".audio-player__time-end");

		let nowSeconds, maxSeconds;

		function setTimeNow() {
			nowSeconds = Math.floor(audio.currentTime);
			timeNow.innerHTML = secondsToHms(nowSeconds);
		}

		// Полная загрузка
		audio.addEventListener("durationchange", () => {
			// progres
			maxSeconds = Math.floor(audio.duration);
			progres.max = maxSeconds;
			timeEnd.innerHTML = secondsToHms(maxSeconds);
			setTimeNow();

			// progres
			progres.addEventListener("input", () => {
				audio.currentTime = progres.value;
				setTimeNow();
			});

			// control
			playPause.addEventListener("click", () => {
				if (audio.paused) {
					audio.play();
					playPause.classList.add(activeClass);
				} else {
					audio.pause();
					playPause.classList.remove(activeClass);
				}
			});
			rewindBack.addEventListener("click", () => {
				audio.currentTime -= 30;
			});
			rewindForward.addEventListener("click", () => {
				audio.currentTime += 30;
			});

			// volume
			let volumeNow = audio.volume;
			volumeProgresMimic.style.setProperty("--progres", volumeNow * 100 + "%");
			function muteIcon() {
				let iconOpacity = 1;
				if (audio.volume == 0) iconOpacity = 0;
				volumebutton.style.setProperty("--mute", Number(!iconOpacity));
				volumebutton.style.setProperty("--volume", iconOpacity);
			}

			volumebutton.addEventListener("click", () => {
				let mute = volumeNow;
				if (audio.volume > 0) mute = 0;
				audio.volume = mute;
				volumeProgresMimic.style.setProperty("--progres", mute * 100 + "%");
				muteIcon();
			});

			volumeProgresInput.addEventListener("input", () => {
				volumeNow = volumeProgresInput.value;
				audio.volume = volumeProgresInput.value;
				volumebutton.style.setProperty("--volume1", audio.volume);
				volumebutton.style.setProperty("--volume05", audio.volume + 0.33);
				// volumebutton.style.setProperty("--volume1", audio.volume / 0.5 - 1);
				// volumebutton.style.setProperty("--volume05", audio.volume / 0.5);
				muteIcon();
			});
		});
		// Воспроизведение
		audio.addEventListener("playing", () => {
			const tickInterval = 1000;
			// progres
			let addTimeNow = setTimeout(function tick() {
				setTimeNow();
				secInPers(nowSeconds, maxSeconds, progresMimic);
				if (!audio.paused) {
					addTimeNow = setTimeout(tick, tickInterval);
				}
			}, tickInterval);
		});
	}
}
