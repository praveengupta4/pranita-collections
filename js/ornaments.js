/**
 * Vector mandala artwork for Pranita Collections, drawn in code so it can be recolored and scaled.
 * Referenced in the page with <use href="#mandala">.
 */
const Ornaments = (function () {
  "use strict";

  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const MANDALA_VIEWBOX = "0 0 200 200";
  const MANDALA_CENTER = 100;

  function round(value) {
    return value.toFixed(1);
  }

  function petalPath(innerRadius, outerRadius, halfWidth) {
    const c = MANDALA_CENTER;
    const middle = c - (innerRadius + outerRadius) / 2;
    return (
      "M" + c + " " + (c - innerRadius) +
      " Q" + (c + halfWidth) + " " + middle + " " + c + " " + (c - outerRadius) +
      " Q" + (c - halfWidth) + " " + middle + " " + c + " " + (c - innerRadius) + " Z"
    );
  }

  function petalRing(count, innerRadius, outerRadius, halfWidth, angleOffset) {
    const d = petalPath(innerRadius, outerRadius, halfWidth);
    const step = 360 / count;
    let markup = "";
    for (let index = 0; index < count; index += 1) {
      const angle = angleOffset + step * index;
      markup += '<path d="' + d + '" transform="rotate(' + angle + " " + MANDALA_CENTER + " " + MANDALA_CENTER + ')"/>';
    }
    return markup;
  }

  function dotRing(count, radius, dotRadius) {
    let markup = "";
    for (let index = 0; index < count; index += 1) {
      const angle = (2 * Math.PI * index) / count;
      const x = MANDALA_CENTER + radius * Math.cos(angle);
      const y = MANDALA_CENTER + radius * Math.sin(angle);
      markup += '<circle cx="' + round(x) + '" cy="' + round(y) + '" r="' + dotRadius + '"/>';
    }
    return markup;
  }

  function ring(radius) {
    return '<circle cx="' + MANDALA_CENTER + '" cy="' + MANDALA_CENTER + '" r="' + radius + '"/>';
  }

  function buildMandala() {
    return (
      '<g fill="none" stroke="currentColor" stroke-width="0.7">' +
        ring(97) + ring(93) +
        petalRing(32, 78, 93, 4, 0) +
        ring(76) +
        petalRing(16, 50, 75, 10, 0) +
        petalRing(16, 56, 70, 5, 11.25) +
        ring(48) + ring(36) +
        petalRing(8, 14, 35, 9, 0) +
        petalRing(8, 18, 30, 4, 22.5) +
        ring(12) +
      "</g>" +
      '<g fill="currentColor">' +
        dotRing(24, 42, 1.2) +
        dotRing(32, 95, 0.8) +
        ring(4) +
      "</g>"
    );
  }

  function injectSprite() {
    const sprite = document.createElementNS(SVG_NAMESPACE, "svg");
    sprite.setAttribute("aria-hidden", "true");
    sprite.setAttribute("focusable", "false");
    sprite.setAttribute("width", "0");
    sprite.setAttribute("height", "0");
    sprite.style.position = "absolute";
    sprite.innerHTML = '<symbol id="mandala" viewBox="' + MANDALA_VIEWBOX + '">' + buildMandala() + "</symbol>";
    document.body.prepend(sprite);
  }

  return {
    init: injectSprite,
  };
})();
