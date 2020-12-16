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
