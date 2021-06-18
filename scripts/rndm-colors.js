const d = document;

export default function randomColors(element) {
  const $colorBoxes = d.querySelectorAll(element);

  setInterval(() => {
    function getRandomColor() {
      let letters = "0123456789ABCDEF",
        color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    $colorBoxes.forEach((e) => (e.style.background = `${getRandomColor()}`));
  }, 2000);
}
