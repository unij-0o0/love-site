const secretPassword = "13112024";

function checkPassword() {
  const input = document.getElementById("passcode").value.trim();
  if (input === secretPassword) {
    window.location.href = "game.html";
  } else {
    alert("รหัสผิดน้า ลองใหม่อีกทีน้าาาา 🥺");
  }
}

if (window.location.pathname.includes("game.html")) {
  const board = document.getElementById("game-board");
  const totalCards = 18;
  const imageSet = [];

  for (let i = 1; i <= totalCards / 2; i++) {
    imageSet.push(`images/couple${i}.jpg`);
    imageSet.push(`images/couple${i}.jpg`);
  }

  imageSet.sort(() => 0.5 - Math.random());

  let firstCard = null;
  let matched = 0;

  imageSet.forEach(src => {
    const card = document.createElement("div");
    card.className = "card";

    const inner = document.createElement("div");
    inner.className = "inner";

    const front = document.createElement("div");
    front.className = "front";

    const back = document.createElement("div");
    back.className = "back";
    back.style.backgroundImage = `url(${src})`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    board.appendChild(card);

    card.dataset.image = src;

    card.addEventListener("click", () => flipCard(card));
  });

  function flipCard(card) {
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      if (firstCard.dataset.image === card.dataset.image) {
        matched += 2;
        setTimeout(() => {
          card.classList.add("matched");
          firstCard.classList.add("matched");
          card.classList.remove("flipped");
          firstCard.classList.remove("flipped");
          firstCard = null;

          if (matched === totalCards) {
            setTimeout(() => {
              window.location.href = "message.html";
            }, 500);
          }
        }, 600);
      } else {
        setTimeout(() => {
          card.classList.remove("flipped");
          firstCard.classList.remove("flipped");
          firstCard = null;
        }, 500);
      }
    }
  }
}
