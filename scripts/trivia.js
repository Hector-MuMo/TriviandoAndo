import randomColors from "./rndm-colors.js";

const d = document,
  $numQ = d.getElementById("num-qstn"),
  $category = d.getElementById("category"),
  $difficulty = d.getElementById("difficulty"),
  $triviaType = d.getElementById("trivia-type"),
  $formTrivia = d.querySelector(".form-trivia"),
  $formCard = d.querySelector(".main-card"),
  $cardQ = d.querySelector(".card"),
  $timer = d.querySelector(".timer");

let triviaData,
  triviaPosition = 0,
  counter = 0;

//Obtener Trivia
const getURL = (e) => {
  e.preventDefault();

  const url = `https://opentdb.com/api.php?amount=${$numQ.value}&category=${$category.value}&difficulty=${$difficulty.value}&type=${$triviaType.value}`;

  let triviaFetch = async () => {
    try {
      let result = await fetch(url),
        jsonData = await result.json();
      triviaData = jsonData.results;
      showData();
      d.addEventListener("click", buttonSelect);
    } catch (error) {
      console.log(error);
    }
  };

  triviaFetch();
};

//Mostrar trivia en el DOM
const showData = () => {
  tempo();

  //Cambiando de cards
  $formCard.style.display = "none";
  $cardQ.style.display = "flex";

  const $cardQuestion = $cardQ.querySelector(".info-q p"),
    $cardCategory = $cardQ.querySelector(".category"),
    $cardDificulty = $cardQ.querySelector(".dificulty"),
    $ans1 = $cardQ.querySelector(".grid-btns #btn1"),
    $ans2 = $cardQ.querySelector(".grid-btns #btn2"),
    $ans3 = $cardQ.querySelector(".grid-btns #btn3"),
    $ans4 = $cardQ.querySelector(".grid-btns #btn4");

  let trivia = triviaData[triviaPosition];

  $cardQuestion.textContent = trivia.question;
  $cardCategory.textContent = `Category: ${trivia.category}`;
  $cardDificulty.textContent = `Difficulty: ${trivia.difficulty.toUpperCase()}`;

  /* Color según dificultad */
  if ($cardDificulty.textContent === "Difficulty: EASY")
    $cardDificulty.style.background = "green";
  else if ($cardDificulty.textContent === "Difficulty: MEDIUM")
    $cardDificulty.style.background = "orange";
  else $cardDificulty.style.background = "red";

  /* Distribucion de preguntas */
  if (trivia.type === "boolean") {
    if (trivia.correct_answer === "True") {
      $ans1.textContent = trivia.correct_answer;
      $ans2.textContent = "False";
      counter++;
    } else {
      $ans1.textContent = "True";
      $ans2.textContent = trivia.correct_answer;
      counter++;
    }
    $ans3.style.display = "none";
    $ans4.style.display = "none";
  } else {
    let randmNum = Math.ceil(Math.random() * 4);
    $ans3.style.display = "block";
    $ans4.style.display = "block";
    d.getElementById(`btn${randmNum}`).textContent = trivia.correct_answer;
    d.getElementById(`btn${randmNum}`).dataset.id = "counter";

    let j = 0;
    for (let i = 1; i <= 4; i++) {
      if (i === randmNum) continue;
      document.getElementById(`btn${i}`).textContent =
        trivia.incorrect_answers[j];
      j++;
    }
  }
};

//EventoClick
const buttonSelect = (e) => {
  if (e.target.matches("button") && e.target.hasAttribute("data-id")) {
    counter++;
    if (triviaPosition < triviaData.length - 1) {
      triviaPosition++;
      console.log(counter);
      console.log(triviaPosition);
      console.log(triviaData.length);
      showData();
    } else {
      $formCard.style.display = "none";
      $cardQ.style.display = "flex";

      const $cardQuestion = $cardQ.querySelector(".info-q p"),
        $cardCategory = $cardQ.querySelector(".category"),
        $cardDificulty = $cardQ.querySelector(".dificulty"),
        $ans1 = $cardQ.querySelector(".grid-btns #btn1"),
        $ans2 = $cardQ.querySelector(".grid-btns #btn2"),
        $ans3 = $cardQ.querySelector(".grid-btns #btn3"),
        $ans4 = $cardQ.querySelector(".grid-btns #btn4"),
        $gridBtns = $cardQ.querySelector(".grid-btns");

      $ans1.addEventListener("click", (e) => {
        location.reload();
      });

      $cardQuestion.textContent = `Your score is ${counter}/${triviaData.length}`;
      $cardQuestion.classList.add("rndm-colors");
      $cardCategory.textContent = '"TRIVIANDO ANDO"';
      $cardCategory.classList.add("rndm-colors");
      $cardDificulty.textContent = "Push the button to play again";
      $cardDificulty.classList.add("rndm-colors");
      $ans1.textContent = "Play Again";
      $ans2.style.display = "none";
      $ans3.style.display = "none";
      $ans4.style.display = "none";
      $gridBtns.style.display = "flex";
      $gridBtns.style.justifyContent = "center";
      $timer.style.display = "none";

      randomColors(".rndm-colors");
    }
  } else {
    if (triviaPosition < triviaData.length - 1) {
      triviaPosition++;
      console.log(counter);
      console.log(triviaPosition);
      console.log(triviaData.length);
      showData();
    } else {
      $formCard.style.display = "none";
      $cardQ.style.display = "flex";

      const $cardQuestion = $cardQ.querySelector(".info-q p"),
        $cardCategory = $cardQ.querySelector(".category"),
        $cardDificulty = $cardQ.querySelector(".dificulty"),
        $ans1 = $cardQ.querySelector(".grid-btns #btn1"),
        $ans2 = $cardQ.querySelector(".grid-btns #btn2"),
        $ans3 = $cardQ.querySelector(".grid-btns #btn3"),
        $ans4 = $cardQ.querySelector(".grid-btns #btn4"),
        $gridBtns = $cardQ.querySelector(".grid-btns");

      $ans1.addEventListener("click", (e) => {
        location.reload();
      });

      $cardQuestion.textContent = `Your score is ${counter}/${triviaData.length}`;
      $cardQuestion.classList.add("rndm-colors");
      $cardCategory.textContent = '"TRIVIANDO ANDO"';
      $cardCategory.classList.add("rndm-colors");
      $cardDificulty.textContent = "Push the button to play again";
      $cardDificulty.classList.add("rndm-colors");
      $ans1.textContent = "Play Again";
      $ans2.style.display = "none";
      $ans3.style.display = "none";
      $ans4.style.display = "none";
      $gridBtns.style.display = "flex";
      $gridBtns.style.justifyContent = "center";
      $timer.style.display = "none";

      randomColors(".rndm-colors");
    }
  }
};

//Temporizador
const tempo = () => {
  let s = 5,
    timer = setInterval(() => {
      $timer.textContent = s;
      s--;
      if (s < 0) {
        triviaPosition++;
        showData();
        clearInterval(timer);
      } else if (triviaPosition > triviaData.length - 1) {
        clearInterval(timer);

        $formCard.style.display = "none";
        $cardQ.style.display = "flex";

        const $cardQuestion = $cardQ.querySelector(".info-q p"),
          $cardCategory = $cardQ.querySelector(".category"),
          $cardDificulty = $cardQ.querySelector(".dificulty"),
          $ans1 = $cardQ.querySelector(".grid-btns #btn1"),
          $ans2 = $cardQ.querySelector(".grid-btns #btn2"),
          $ans3 = $cardQ.querySelector(".grid-btns #btn3"),
          $ans4 = $cardQ.querySelector(".grid-btns #btn4"),
          $gridBtns = $cardQ.querySelector(".grid-btns");

        $ans1.addEventListener("click", (e) => {
          location.reload();
        });

        $cardQuestion.textContent = `Your score is ${counter}/${triviaData.length}`;
        $cardQuestion.classList.add("rndm-colors");
        $cardCategory.textContent = '"TRIVIANDO ANDO"';
        $cardCategory.classList.add("rndm-colors");
        $cardDificulty.textContent = "Push the button to play again";
        $cardDificulty.classList.add("rndm-colors");
        $ans1.textContent = "Play Again";
        $ans2.style.display = "none";
        $ans3.style.display = "none";
        $ans4.style.display = "none";
        $gridBtns.style.display = "flex";
        $gridBtns.style.justifyContent = "center";
        $timer.style.display = "none";

        randomColors(".rndm-colors");
      }
    }, 1000);
};

$formTrivia.addEventListener("submit", getURL);
