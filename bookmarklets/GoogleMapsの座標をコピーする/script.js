const ll = document.getElementsByClassName("ZqLNQd t9f27")[0].innerHTML;
const [lat, lng] = ll.split(", ");
const s = `longitude: ${lng},\nlatitude: ${lat},\n`;
navigator.clipboard.writeText(s);
