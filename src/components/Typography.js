export function Heading(level=1, text, extra="") {
  // For h1, use color #222B45, font-bold, text-3xl, tracking-tight
  const tag = `h${level}`;
  let classes = "";
  if (level === 1) classes = "text-[2rem] md:text-[2.5rem] leading-none text-[#031A4A] mb-1 tracking-tight";
  if (level === 2) classes = "text-2xl text-[#222B45] mb-1 tracking-tight";
  if (level === 3) classes = "text-lg text-[#222B45] mb-0 tracking-tight text-semibold";
  return `<${tag} class="${classes} ${extra}">${text}</${tag}>`;
}

export function P(text, variant="base", extra="") {
  let classes = "";
  if (variant === "desc") classes = "text-base text-[#031A4A] mb-2"; // subtitle
  if (variant === "small") classes = "text-md text-[#031A4A]";
  if (variant === "link") classes = "text-[#1761cc] text-base underline font-semibold cursor-pointer";
  return `<p class="${classes} ${extra}">${text}</p>`;
}
