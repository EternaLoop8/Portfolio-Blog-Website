export function htmlToText(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText; // preserves line breaks
}