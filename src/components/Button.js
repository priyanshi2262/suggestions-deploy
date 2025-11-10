export function Button(text, style='primary', ) {
  let classes = "text-xs font-semibold px-8 py-3 rounded-lg shadow transition";
  if (style === "primary") classes += " bg-[#2980fa] text-white hover:bg-[#1761cc]";
  if (style === "white") classes += " bg-white text-[#031A4A] border border-[#031A4A] hover:bg-gray-100";
  if (style === "dark") classes += " bg-[#232954] text-white";
  return `<button class="${classes}">${text}</button>`;
}

export function ButtonRow() {
  const row = document.createElement("div");
  row.className = "grid grid-cols-3 gap-2 bg-[#eaeaec] p-6 rounded-xl border-[2px] border-dashed border-[#bbaaff]";
  row.innerHTML = `
    ${Button("BUTTON", "white")}
    ${Button("BUTTON", "primary")}
    ${Button("BUTTON", "white")}
    ${Button("BUTTON", "dark")}
    ${Button("BUTTON", "primary")}
    ${Button("BUTTON", "white")}
  `;
  return row;
}
