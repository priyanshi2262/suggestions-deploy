import { Button } from '../components/Button.js';

export function ServerCard(server) {
  // Tag label (badge)
  let tagHTML = "";
  if (server.tag_type === "server_of_the_month") {
    tagHTML = `
      <span class="absolute top-4 left-4 bg-[#F05556] text-white px-3 py-1.5 rounded-md text-xs font-semibold z-20 shadow-sm">
        ${server.tag_label}
      </span>`;
  } else if (server.tag_type === "new") {
    tagHTML = `
      <span class="absolute top-4 left-4 bg-yellow-400 text-[#232954] px-3 py-1.5 rounded-md text-xs font-semibold z-20 shadow-sm">
        ${server.tag_label}
      </span>`;
  }

  // Border highlight
  const highlightBorder =
    server.tag_type === "server_of_the_month"
      ? "border-2 border-[#1473E6]"
      : "border border-gray-200";

  // Price formatting
  let priceTagHtml = server.price_tag;
  const match = /^First\s+(\d+)(\s+\w+)?/i.exec(server.price_tag || "");
  if (match) {
    priceTagHtml = `First <span class="text-[#E65342] font-semibold">${match[1]}</span>${match[2] || ""}`;
  }

  let priceLine = `
    <span class="text-3xl text-[#F05556] font-bold">${server.price_month}</span>
    <span class="text-sm text-gray-600 ml-1">/month</span>
  `;
  if (server.tag_type === "server_of_the_month") {
    priceLine = `
      <span class="text-3xl text-[#F05556] font-bold" style="text-shadow: 2px 2px 8px rgba(240,85,86,0.3);">${server.price_month}</span>
      <span class="text-sm text-gray-600 ml-1">/month</span>
    `;
  }

  // Card container
  const card = document.createElement("div");
  card.className = `
    group relative bg-white rounded-xl overflow-hidden
    shadow-xl hover:shadow-2xl transition-all duration-300
    flex flex-col justify-between text-center
    p-7 ${highlightBorder}
    w-full max-w-[340px] mx-auto h-full
    transform hover:-translate-y-2 hover:scale-105
  `.replace(/\s+/g, " ");

  // Create the single CONFIGURE button
  const normalButton = document.createElement("button");
  normalButton.textContent = "CONFIGURE";
  normalButton.className = `
    w-full bg-[#1473E6] hover:bg-[#0d5fc2] text-white font-semibold
    py-3 rounded-lg shadow-md transition-colors duration-200
  `.replace(/\s+/g, " ");

  // Card content
  card.innerHTML = `
    ${tagHTML}

    <!-- Top Section -->
    <div class="flex flex-col items-center mb-6 pt-6">
      <img src="${server.logo}" alt="${server.brand || 'Provider'}"
        class="h-12 w-auto mb-4 object-contain drop-shadow-md" />
      <div class="text-lg font-bold text-[#031A4A] uppercase tracking-wide mb-1">${server.model}</div>
      <div class="text-xs text-gray-500">${server.cpu}</div>
    </div>

    <!-- Specs -->
    <div class="grid grid-cols-3 gap-6 text-sm text-[#031A4A] mb-6 w-full">
      <div class="flex flex-col items-center">
        <span class="font-semibold">${server.cores_info}</span>
        <span class="text-xs text-gray-500">Cores</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold">${server.ram}</span>
        <span class="text-xs text-gray-500">${server.ram_type || "RAM"}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold">${server.storage}</span>
        <span class="text-xs text-gray-500">${server.storage_detail || "Storage"}</span>
      </div>
    </div>

    <!-- Price -->
    <div class="mb-6">
      <div class="text-xs text-gray-500 mb-1">${priceTagHtml || ""}</div>
      <div>${priceLine}</div>
      <div class="text-xs text-gray-500 mt-1">${server.price_note || ""}</div>
    </div>

    <!-- Button container -->
    <div class="mt-auto flex flex-col gap-3 w-full button-slot"></div>
  `;

  // Append only the normal button
  const btnContainer = card.querySelector(".button-slot");
  btnContainer.appendChild(normalButton);

  return card;
}
