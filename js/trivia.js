let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Which actress and humanitarian launched her own fashion brand, including a line of designer handbags named after her?",
        options: ["Lady Gaga", "Rihanna", "Beyoncé", "Madonna"],
        correct: "Lady Gaga",
    },
    {
        id: "1",
        question: "Which singer and actress launched her own fashion line called Fenty, known for its inclusive sizing and diverse runway shows?",
        options: ["Taylor Swift", "Ariana Grande", "Rihanna", "Katy Perry"],
        correct: "Rihanna",
    },
    {
        id: "2",
        question: "Which popular NBA player is known for his unique fashion style and outfits?",
        options: ["Stephen Curry", "Giannis Antetokounmpo", "Shai Gilgeous-Alexander", "Shaquille O' Neal"],
        correct: "Shai Gilgeous-Alexander",
    },
    {
        id: "3",
        question: "Who is often referred to as the 'Queen of Pop' and known for her ever-evolving fashion sense, including iconic cone bras and bodysuits?",
        options: ["Madonna", "Lady Gaga", "Rihanna", "Beyoncé"],
        correct: "Madonna",
    },
    {
        id: "4",
        question: "Which actor and style icon is known for his timeless elegance and dapper suits, often seen at red carpet events?",
        options: ["Daniel Craig", "Pierce Brosnan", "Sean Connery", "George Clooney"],
        correct: "George Clooney",
    },
    {
        id: "5",
        question: "Which designer is famous for creating the iconic 'little black dress' and pioneering the concept of 'casual chic'?",
        options: ["Coco Chanel", "Vera Wang", "Stella McCartney", "Donatella Versace"],
        correct: "Coco Chanel",
    }, {
        id: "6",
        question: "Who is known for her elegant and sophisticated style, often seen in figure-flattering silhouettes and statement jewelry?",
        options: ["Kate Middleton", "Meghan Markle", "Queen Elizabeth II", "Princess Diana"],
        correct: "Kate Middleton",
    },
    {
        id: "7",
        question: "Who is known for her edgy and unconventional style, often mixing high fashion with streetwear and vintage finds?",
        options: ["Zendaya", "Lizzo", "Billie Eilish", "Cardi B"],
        correct: "Billie Eilish",
    },
    {
        id: "8",
        question: "Which fashion designer is famous for his luxury handbags and accessories, including the iconic 'Birkin' bag?",
        options: ["Chanel", "Gucci", "Louis Vuitton", "Hermès"],
        correct: "Hermès",
    },
    {
        id: "9",
        question: "Which fashion icon and former First Lady of the United States launched the 'Let Girls Learn' initiative and is known for her elegant and sophisticated style?",
        options: ["Michelle Obama", "Jacqueline Kennedy Onassis", "Nancy Reagan", "Hillary Clinton"],
        correct: "Michelle Obama",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};