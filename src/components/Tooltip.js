/**
 * Renders a tooltip that matches your image reference.
 * @param {string} text Tooltip text
 * @returns {HTMLElement}
 */
export function Tooltip(text) {
  const wrapper = document.createElement('span');
  wrapper.className = "relative inline-block align-middle";

  wrapper.innerHTML = `
    <button type="button" class="align-middle focus:outline-none group">
      <img src="/assets/icons/tooltip.png" alt="Tooltip Icon"
        class="w-[19px] h-[19px] align-middle cursor-pointer inline-block" />
      <span
        class="absolute z-20 left-1/2 -translate-x-1/2 mt-3 min-w-[320px] max-w-[380px] text-white text-md rounded-[14px] font-normal px-6 py-5 bg-[#001950] shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity text-left"
        style="top: 130%; font-family: inherit; line-height: 1.18;">
        ${text}
      </span>
    </button>
  `;
  return wrapper;
}
