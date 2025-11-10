// components/Checkbox.js
export function Checkbox(label, checked = false, name = '', value = '') {
  return `
    <label class="flex items-center gap-2 text-xs mb-2 cursor-pointer select-none">
      <input type="checkbox" name="${name}" value="${value}" ${checked ? 'checked' : ''} class="accent-[#2980fa] w-5 h-5 transition">
      <span class="text-[#222024]">${label}</span>
    </label>
  `;
}

export function CheckboxRow() {
  const box = document.createElement("div");
  box.className = "bg-[#eaeaec] border-[2px] border-dashed border-[#bbaaff] rounded-xl py-7 px-5 flex flex-col";
  box.innerHTML = `
    ${Checkbox("Label", false)}
    ${Checkbox("Label", true)}
  `;
  return box;
}
