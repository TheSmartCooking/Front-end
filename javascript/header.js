const header = document.querySelector("header");

const h1 = document.createElement("h1");
h1.innerHTML = "Smart Cooking &copy;";

const nav = document.createElement("nav");

const a = document.createElement("a");
a.id = "home";
a.title = "Home";

function createHomeIcon() {
    const svgNS = "http://www.w3.org/2000/svg"; // SVG namespace

    // Create the SVG element
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('viewBox', '0 0 24 24');

    // Create the path element
    const path1 = document.createElementNS(svgNS, 'path');
    const path2 = document.createElementNS(svgNS, 'path');
    path1.setAttribute('fill', 'none');
    path2.setAttribute('fill', 'none');
    path1.setAttribute('stroke-linecap', 'round');
    path2.setAttribute('stroke-linecap', 'round');
    path1.setAttribute('stroke-linejoin', 'round');
    path2.setAttribute('stroke-linejoin', 'round');
    path1.setAttribute('stroke-width', '2');
    path2.setAttribute('stroke-width', '2');
    path1.setAttribute("d", "M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7");
    path2.setAttribute("d", "M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6");

    // Append the path to the SVG
    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg;
}

const homeIcon = createHomeIcon();

a.appendChild(homeIcon);
nav.appendChild(a);
header.appendChild(h1);
header.appendChild(nav);
