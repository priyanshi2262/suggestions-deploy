import { Heading, P } from '../components/Typography.js';
import { FilterSidebar } from '../components/FilterSidebar.js';
import { ServerCard } from '../components/ServerCard.js';
import { Tooltip } from '../components/Tooltip.js';
import { getServers } from '../services/api.js';

export async function renderHomePage(appRoot) {
  const servers = await getServers();

  // --- Options for filters ---
  const cpuOptions = [...new Set(servers.map(s => s.brand).filter(Boolean))];
  const storageOptions = [
    ...new Set(
      servers
        .map(s =>
          (s.storage || "").toLowerCase().includes("nvme")
            ? "nvme"
            : (s.storage || "").toLowerCase().includes("hdd")
            ? "hdd"
            : null
        )
        .filter(Boolean)
    ),
  ];

  const acronisTooltipText =
    "Get 2GB of Cyber Protect Basic free with all of our Dedicated Servers if you don't already have Cyber Protect.";

  // --- Render HTML ---
  appRoot.innerHTML = `
    <div class="min-h-screen bg-white flex flex-col items-center px-4 sm:px-6 md:px-8 py-8">
      
      <!-- Heading Section -->
      <div class="max-w-4xl w-full mx-auto mb-6 text-center">
        ${Heading(1, "Our Intel Dedicated Servers", "font-light mb-4")}
        ${P(
          "Explore our Intel Dedicated Servers. Whichever you choose, it’s completely yours – no more competing for<br/> resources and you get all that power to yourself.",
          "desc",
          "text-[#031A4A] mb-2"
        )}
        <div class="flex flex-col items-center justify-center">
          ${P("All our Dedicated Servers include", "small", "font-medium")}
          <div class="mt-2 flex flex-wrap justify-center items-center gap-2 text-base select-none">
            <svg class="inline-block text-[#1976d2]" width="19" height="19" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11" stroke="#1976d2" stroke-width="2" fill="white"></circle>
              <polyline points="8.5,12.1 11,14.7 16,9.7" style="fill:none;stroke:#1976d2;stroke-width:2"/>
            </svg>
            <span class="text-[#031A4A] px-2 py-1 rounded-lg font-normal text-sm sm:text-base">
              <span class="font-medium">FREE 2GB Cyber Protect Basic</span> powered by Acronis
            </span>
            <span id="acronis-tooltip-mount"></span>
          </div>
        </div>
      </div>

      <!-- Filters Row -->
      <div id="filter-bar" class="max-w-7xl w-full mb-6"></div>

      <!-- Server Cards -->
      <main class="max-w-7xl w-full">
        <div id="server-list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full"></div>
      </main>
    </div>
  `;

  // Mount tooltip
  document.getElementById("acronis-tooltip-mount").appendChild(Tooltip(acronisTooltipText));

  // Mount filter bar
  document
    .getElementById("filter-bar")
    .appendChild(FilterSidebar(onFilterChange, cpuOptions, storageOptions));

  // --- Initial Render ---
  renderServers(servers);

  // --- Filter Change Handler ---
  function onFilterChange(filters) {
    const filtered = servers.filter(
      server =>
        (filters.cpu.length === 0 ||
          filters.cpu.includes(server.brand.toLowerCase())) &&
        (filters.storage.length === 0 ||
          filters.storage.some(selected =>
            (server.storage || "").toLowerCase().includes(selected)
          ))
    );
    renderServers(filtered);
  }

  // --- Render Servers ---
  function renderServers(list) {
    const listRoot = document.getElementById("server-list");
    listRoot.innerHTML = "";
    listRoot.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full"; // Proper rows & columns

    if (!list.length) {
      listRoot.innerHTML = P(
        "No servers match these filters.",
        "desc",
        "text-center p-8 text-gray-400"
      );
      return;
    }

    list.forEach(server => {
      const card = ServerCard(server);
      card.classList.add(
        "w-full",
        "max-w-[360px]", // Slightly wider
        "flex",
        "flex-col",
        "mx-auto"
      );
      listRoot.appendChild(card);
    });
  }
}
