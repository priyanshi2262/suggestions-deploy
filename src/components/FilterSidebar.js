import { Heading, P } from '../components/Typography.js';
import { Button } from '../components/Button.js';
import { Checkbox } from '../components/Checkbox.js';

export function FilterSidebar(onChange, cpuOptions = [], storageOptions = []) {
  const el = document.createElement('section');
  el.className = `
    bg-white rounded-xl px-6 py-4 text-[#192042]
    w-full flex flex-col md:flex-row md:items-center md:justify-between
    gap-5 shadow-md hover:shadow-lg transition-all duration-300 border border-[#E3E8F0]
  `;

  const displayLabel = val => val.replace(/_/g, ' ').toUpperCase();

  const cpuOptionsHtml = cpuOptions
    .map(opt => Checkbox(displayLabel(opt), false, 'cpu', opt))
    .join('');

  const storageOptionsHtml = storageOptions
    .map(opt => Checkbox(displayLabel(opt), false, 'storage', opt))
    .join('');

  el.innerHTML = `
    <!-- Left Section -->
    <div class="flex flex-col md:flex-row items-center justify-center md:justify-start gap-5 flex-wrap w-full">
      <!-- Filters Label -->
      <div class="flex items-center gap-2 text-center md:text-left">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#1473E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 14.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 018 18v-3.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        <span class="font-semibold text-[#031A4A] text-[16px]">Filters</span>
      </div>

      <!-- Divider -->
      <div class="hidden md:block w-px h-6 bg-[#E3E8F0]"></div>

      <!-- CPU -->
      <div class="flex items-center gap-2 flex-wrap justify-center">
        ${P("CPU", "desc", "text-[15px] text-[#192042] font-medium")}
        <div class="flex items-center gap-2 justify-center">${cpuOptionsHtml}</div>
      </div>

      <!-- Divider -->
      <div class="hidden md:block w-px h-6 bg-[#E3E8F0]"></div>

      <!-- Storage -->
      <div class="flex items-center gap-2 flex-wrap justify-center">
        ${P("STORAGE", "desc", "text-[15px] text-[#192042] font-medium")}
        <div class="flex items-center gap-2 justify-center">${storageOptionsHtml}</div>
      </div>
    </div>

    <!-- Right: Clear Filters -->
    <div id="clear-btn-wrapper" class="flex justify-center md:justify-end w-full md:w-auto">
      ${Button("CLEAR FILTERS", "white")}
    </div>
  `;

  // --- Event Logic ---
  function getCurrentFilters() {
    const cpu = Array.from(el.querySelectorAll('input[name=cpu]:checked')).map(cb => cb.value);
    const storage = Array.from(el.querySelectorAll('input[name=storage]:checked')).map(cb => cb.value);
    return { cpu, storage };
  }

  function updateClearCount() {
    const count = el.querySelectorAll('input[type=checkbox]:checked').length;
    const btnWrapper = el.querySelector('#clear-btn-wrapper');
    btnWrapper.innerHTML = Button(
      count ? `CLEAR FILTERS (${count})` : 'CLEAR FILTERS',
      count ? 'primary' : 'white'
    );
  }

  el.addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      onChange(getCurrentFilters());
      updateClearCount();
    }
  });

  el.addEventListener('click', e => {
    if (e.target.closest('button')) {
      el.querySelectorAll('input[type=checkbox]').forEach(cb => (cb.checked = false));
      onChange(getCurrentFilters());
      updateClearCount();
    }
  });

  updateClearCount();
  onChange(getCurrentFilters());

  return el;
}
