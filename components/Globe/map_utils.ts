// this function creates and returns a new marker element
export function createCustomMarker(image: any) {
  let chart = image.dataItem.component.chart;

  // create holder
  let holder = document.createElement("div");
  holder.className = "map-marker";
  holder.title = image.dataItem.dataContext.title;
  holder.style.position = "absolute";

  // maybe add a link to it?
  if (undefined != image.url) {
    holder.onclick = function () {
      window.location.href = image.url;
    };
    holder.className += " map-clickable";
  }

  // create dot
  let dot = document.createElement("div");
  dot.className = "dot";
  holder.appendChild(dot);

  // create pulse
  let pulse = document.createElement("div");
  pulse.className = "pulse";
  holder.appendChild(pulse);

  // append the marker to the map container
  chart.svgContainer.htmlElement.appendChild(holder);

  return holder;
}
