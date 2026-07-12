let cards = [];
let currentCard = null;

document.addEventListener("DOMContentLoaded", initialize);

/**
 * 初期化
 */
async function initialize() {

    initializeButtons();

    await initializeCards();

    nextCard();

}

/**
 * ボタン初期化
 */
function initializeButtons() {

    document
        .querySelectorAll(".tab-bar button")
        .forEach(button => {

            button.addEventListener("click", () => {

                showPage(button.dataset.page);

            });

        });

    document
        .getElementById("showAnswerBtn")
        .addEventListener("click", showAnswer);

    document
        .getElementById("nextBtn")
        .addEventListener("click", nextCard);

    document
        .getElementById("addCardBtn")
        .addEventListener("click", addCard);

}

/**
 * LocalStorage読み込み
 */
async function initializeCards() {

    const saved =
        localStorage.getItem("cards");

    if (saved) {

        cards = JSON.parse(saved);

    } else {

        try {

            const response =
                await fetch("flashcards/cards.json");

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }

            cards = await response.json();

            saveCards();

        } catch (error) {

            console.error(
                "カード読み込みに失敗しました",
                error
            );

            cards = [

                {
                    id: 1,
                    question: "$E[X]$",
                    answer: "$\\sum_x xP(X=x)$"
                }

            ];

            saveCards();

        }

    }

    updateDebug();

}

/**
 * 保存
 */
function saveCards() {

    localStorage.setItem(
        "cards",
        JSON.stringify(cards)
    );

    updateDebug();

}

/**
 * デバッグ表示更新
 */
function updateDebug() {

    document.getElementById(
        "debugCardCount"
    ).textContent = cards.length;

}

/**
 * タブ切替
 */
function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });

    document
        .getElementById(pageId)
        .classList.add("active");

    if (pageId === "manage") {

        renderCardList();

    }

}

/**
 * 次の問題
 */
function nextCard() {

    if(cards.length===0){
        return;
    }

    currentCard =
        cards[
            Math.floor(
                Math.random()*cards.length
            )
        ];

    const question =
        document.getElementById("question");

    const answer =
        document.getElementById("answer");

    question.innerHTML =
        currentCard.question;

    answer.innerHTML =
        currentCard.answer;

    answer.classList.add("hidden");

    renderMath(question);

}

/**
 * 答え表示
 */
function showAnswer(){

    const answer =
        document.getElementById("answer");

    answer.classList.remove("hidden");

    renderMath(answer);

}

/**
 * カード追加
 */
function addCard() {

    const question =
        document
        .getElementById("newQuestion")
        .value
        .trim();

    const answer =
        document
        .getElementById("newAnswer")
        .value
        .trim();

    if (!question || !answer) {

        alert("問題と答えを入力してください");

        return;

    }

    cards.push({

        id: Date.now(),

        question,

        answer

    });

    saveCards();

    document.getElementById(
        "newQuestion"
    ).value = "";

    document.getElementById(
        "newAnswer"
    ).value = "";

    alert("登録しました");

}

/**
 * 一覧表示
 */
function renderCardList() {

    const cardList =
        document.getElementById("cardList");

    cardList.innerHTML = "";

    cards.forEach(card => {

        const div =
            document.createElement("div");

        div.className = "list-item";

        div.textContent =
            card.question;

        cardList.appendChild(div);

    });

}