// 1. قاعدة بيانات الحروف (من الألف إلى الياء)
const letterData = [
    { name: "الألف", char: "أ", root: "A", nonConnecting: true, customLetters: ["أَ", "إِ", "أُ"] },
    { name: "الباء", char: "ب", root: "B" },
    { name: "التاء", char: "ت", root: "T" },
    { name: "الثاء", char: "ث", root: "TH" },
    { name: "الجيم", char: "ج", root: "J" },
    { name: "الحاء", char: "ح", root: "H" },
    { name: "الخاء", char: "خ", root: "KH" },
    { name: "الدال", char: "د", root: "D", nonConnecting: true },
    { name: "الذال", char: "ذ", root: "DH", nonConnecting: true },
    { name: "الراء", char: "ر", root: "R", nonConnecting: true },
    { name: "الزاي", char: "ز", root: "Z", nonConnecting: true },
    { name: "السين", char: "س", root: "S" },
    { name: "الشين", char: "ش", root: "SH" },
    { name: "الصاد", char: "ص", root: "SA", vowels: ["SAA", "SII", "SUU"] }, 
    { name: "الضاد", char: "ض", root: "DA", vowels: ["DAA", "DII", "DUU"] }, 
    { name: "الطاء", char: "ط", root: "TA", vowels: ["TAA", "TII", "TUU"] }, 
    { name: "الظاء", char: "ظ", root: "ZA", vowels: ["ZAA", "ZII", "ZUU"] }, 
    { name: "العين", char: "ع", root: "'A", vowels: ["'A", "'I", "'U"] },
    { name: "الغين", char: "غ", root: "GH" },
    { name: "الفاء", char: "ف", root: "F" },
    { name: "القاف", char: "ق", root: "Q" },
    { name: "الكاف", char: "ك", root: "K" },
    { name: "اللام", char: "ل", root: "L" },
    { name: "الميم", char: "م", root: "M" },
    { name: "النون", char: "ن", root: "N" },
    { name: "الهاء", char: "هـ", root: "H", shapeMid: "ـهـ", shapeEnd: "ـه" },
    { name: "الواو", char: "و", root: "W", nonConnecting: true },
    { name: "الياء", char: "ي", root: "Y", shapeStart: "يـ", shapeMid: "ـيـ", shapeEnd: "ـي" }
];

// 2. توليد المنهج ديناميكياً
const syllabus = letterData.map(data => {
    const char = data.char;
    const vA = data.vowels ? data.vowels[0] : `${data.root}A`;
    const vI = data.vowels ? data.vowels[1] : `${data.root}I`;
    const vU = data.vowels ? data.vowels[2] : `${data.root}U`;
    
    const charA = data.customLetters ? data.customLetters[0] : `${char}َ`;
    const charI = data.customLetters ? data.customLetters[1] : `${char}ِ`;
    const charU = data.customLetters ? data.customLetters[2] : `${char}ُ`;

    const shapeStart = data.shapeStart || (data.nonConnecting ? `${char}` : `${char}ـ`);
    const shapeMiddle = data.shapeMid || (data.nonConnecting ? `ـ${char}` : `ـ${char}ـ`);
    const shapeEnd = data.shapeEnd || `ـ${char}`;

    return {
        chapter: `حرف ${data.name}`,
        branches: [
            {
                title: `1. الحركات ( ${charA} ، ${charI} ، ${charU} )`,
                lessonAr: `${charA} \u00A0\u00A0\u00A0 ${charI} \u00A0\u00A0\u00A0 ${charU}`,
                lessonEn: `${vA} - ${vI} - ${vU}`,
                questions: [
                    { letter: charA, options: [vA, vI, vU], answer: vA },
                    { letter: charI, options: [vU, vA, vI], answer: vI },
                    { letter: charU, options: [vI, vU, vA], answer: vU }
                ]
            },
            {
                title: `2. مواضع الحرف ( ${shapeStart} ، ${shapeMiddle} ، ${shapeEnd} )`,
                lessonAr: `${shapeStart} \u00A0\u00A0\u00A0 ${shapeMiddle} \u00A0\u00A0\u00A0 ${shapeEnd}`,
                lessonEn: "Start - Middle - End",
                questions: [
                    { letter: shapeStart, options: ["Start", "Middle", "End"], answer: "Start" },
                    { letter: shapeMiddle, options: ["End", "Start", "Middle"], answer: "Middle" },
                    { letter: shapeEnd, options: ["Middle", "End", "Start"], answer: "End" }
                ]
            }
        ]
    };
});

// 3. متغيرات حالة اللعبة
let cIdx = 0; 
let bIdx = 0; 
let qIdx = 0; 
let needsLesson = true; 
let currentPosition = 1;
let isMoving = false; 
let wordStartPosition = 1;      
let waitingForFinalCheck = false; 
let isBonusRoll = false;         

const snakesAndLadders = {
    4: { to: 14, msg: "🪜 Ladder!" },
    9: { to: 31, msg: "🪜 Great jump!" },
    17: { to: 7, msg: "🐍 Snake!" },
    20: { to: 38, msg: "🪜 Ladder!" },
    45: { to: 22, msg: "🐍 Snake!" }
};

window.onload = () => { createBoard(); populateIndex(); };

// 4. وظائف محرك اللعبة
function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let row = 9; row >= 0; row--) {
        for (let col = 0; col < 10; col++) {
            let num = (row % 2 === 0) ? (row * 10 + 10 - col) : (row * 10 + col + 1);
            const cell = document.createElement('div');
            cell.className = 'cell'; cell.id = `cell-${num}`; cell.innerText = num;
            if(snakesAndLadders[num]) cell.innerText += snakesAndLadders[num].to > num ? " 🪜" : " 🐍";
            board.appendChild(cell);
        }
    }
    const player = document.createElement('div');
    player.id = 'player';
    document.getElementById('cell-1').appendChild(player);
}

function populateIndex() {
    const select = document.getElementById('lesson-index');
    select.innerHTML = '';
    syllabus.forEach((chap, cIndex) => {
        let optGroup = document.createElement('optgroup');
        optGroup.label = chap.chapter;
        chap.branches.forEach((branch, bIndex) => {
            let opt = document.createElement('option');
            opt.value = `${cIndex}-${bIndex}`; opt.innerText = branch.title;
            optGroup.appendChild(opt);
        });
        select.appendChild(optGroup);
    });
}

function setStartPos() {
    if(isMoving) return;
    let target = parseInt(document.getElementById('start-pos').value);
    if (!isNaN(target) && target >= 1 && target <= 99) {
        currentPosition = target;
        const player = document.getElementById('player');
        const targetCell = document.getElementById(`cell-${currentPosition}`);
        if(targetCell) targetCell.appendChild(player);
        document.getElementById('message').innerText = `Moved to square ${currentPosition}`;
    }
}

function jumpToLesson() {
    const val = document.getElementById('lesson-index').value;
    const [c, b] = val.split('-');
    cIdx = parseInt(c); bIdx = parseInt(b); qIdx = 0; needsLesson = true;
    document.getElementById('message').innerText = `Selected: ${syllabus[cIdx].branches[bIdx].title}. Draw a card!`;
}

function drawCard() {
    if(isMoving) return;
    if (cIdx >= syllabus.length) { alert("🎉 You finished all letters!"); return; }
    
    document.getElementById('lesson-index').value = `${cIdx}-${bIdx}`;
    
    if (qIdx === 0 && needsLesson) {
        wordStartPosition = currentPosition;
    }

    if (needsLesson) showLessonUI(false);
    else showQuestion();
}

function showLessonUI(isRetry) {
    const branchData = syllabus[cIdx].branches[bIdx];
    document.getElementById('lesson-title').innerText = "Let's Read!";
    
    if (isRetry) {
        document.getElementById('lesson-title').innerText = "❌ Try again!";
        document.getElementById('understand-btn').classList.add('hidden');
        document.getElementById('close-fail-btn').classList.remove('hidden');
    } else {
        document.getElementById('understand-btn').classList.remove('hidden');
        document.getElementById('close-fail-btn').classList.add('hidden');
    }
    
    document.getElementById('lesson-text-ar').innerText = branchData.lessonAr;
    document.getElementById('lesson-text-en').innerText = branchData.lessonEn;
    
    document.getElementById('lesson-section').classList.remove('hidden');
    document.getElementById('question-section').classList.add('hidden');
    document.getElementById('final-check-section').classList.add('hidden');
    document.getElementById('quiz-modal').classList.remove('hidden');
}

function showQuestion() {
    const branchData = syllabus[cIdx].branches[bIdx];
    const questionData = branchData.questions[qIdx];
    
    document.getElementById('chapter-branch-label').innerText = `${branchData.title}`;
    document.getElementById('question-counter').innerText = `Challenge ${qIdx + 1} of ${branchData.questions.length}`;
    document.getElementById('target-letter').innerText = questionData.letter;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    questionData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerHTML = `<div class="opt-en">${opt}</div>`;
        btn.onclick = () => checkAnswer(opt, questionData.answer);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('lesson-section').classList.add('hidden');
    document.getElementById('final-check-section').classList.add('hidden');
    document.getElementById('question-section').classList.remove('hidden');
    document.getElementById('quiz-modal').classList.remove('hidden');
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        document.getElementById('quiz-modal').classList.add('hidden');
        document.getElementById('message').innerText = "✅ Correct! Roll the dice.";
        
        document.getElementById('ask-btn').disabled = true;
        document.getElementById('dice-btn').disabled = false;
        
        qIdx++;
        needsLesson = false;
        
        if (qIdx >= syllabus[cIdx].branches[bIdx].questions.length) {
            waitingForFinalCheck = true;
        }
    } else {
        needsLesson = true; 
        showLessonUI(true); 
    }
}

function showFinalWordCheck() {
    const branchData = syllabus[cIdx].branches[bIdx];
    document.getElementById('final-word-ar').innerText = branchData.lessonAr;

    document.getElementById('lesson-section').classList.add('hidden');
    document.getElementById('question-section').classList.add('hidden');
    document.getElementById('final-check-section').classList.remove('hidden');
    document.getElementById('quiz-modal').classList.remove('hidden');
}

function handleFinalWord(isCorrect) {
    document.getElementById('quiz-modal').classList.add('hidden');

    if (isCorrect) {
        document.getElementById('message').innerText = "✅ Amazing! You passed the challenge! BONUS ROLL!";
        isBonusRoll = true;
        document.getElementById('dice-btn').disabled = false;
        
        qIdx = 0;
        bIdx++;
        needsLesson = true;
        if (bIdx >= syllabus[cIdx].branches.length) { 
            bIdx = 0; 
            cIdx++; 
        }
        
    } else {
        document.getElementById('message').innerText = "❌ Let's try again! Going back...";
        isMoving = true;
        
        movePlayerStepByStep(currentPosition, wordStartPosition, () => {
            currentPosition = wordStartPosition;
            isMoving = false;
            document.getElementById('ask-btn').disabled = false;
            
            qIdx = 0;
            needsLesson = true;
        });
    }
}

function closeModalAndWait() {
    document.getElementById('quiz-modal').classList.add('hidden');
    document.getElementById('message').innerText = "Review the letter, then draw a card to try again.";
}

function rollDice() {
    const diceDisplay = document.getElementById('dice-display');
    const diceBtn = document.getElementById('dice-btn');
    
    diceBtn.disabled = true;
    isMoving = true; 
    diceDisplay.classList.add('rolling');
    document.getElementById('message').innerText = "Rolling...";
    
    setTimeout(() => {
        diceDisplay.classList.remove('rolling');
        const diceValue = Math.floor(Math.random() * 6) + 1;
        const diceIcons = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        diceDisplay.innerText = diceIcons[diceValue - 1];
        
        document.getElementById('message').innerText = `🎲 You got a ${diceValue}!`;
        
        let targetPosition = currentPosition + diceValue;
        if(targetPosition > 100) targetPosition = 100;
        
        movePlayerStepByStep(currentPosition, targetPosition, () => {
            currentPosition = targetPosition;
            
            setTimeout(() => {
                if (snakesAndLadders[currentPosition]) {
                    const jumpData = snakesAndLadders[currentPosition];
                    document.getElementById('message').innerText = jumpData.msg;
                    
                    movePlayerStepByStep(currentPosition, jumpData.to, () => {
                        currentPosition = jumpData.to;
                        finishMoveLogic();
                    });
                } else {
                    finishMoveLogic();
                }
            }, 500);
        });
    }, 1000);
}

function finishMoveLogic() {
    if(currentPosition === 100) {
        document.getElementById('message').innerText = "🎉 Congratulations! You reached the end!";
        isMoving = false;
        return; 
    }

    if (isBonusRoll) {
        isBonusRoll = false;
        isMoving = false;
        document.getElementById('ask-btn').disabled = false;
        document.getElementById('message').innerText = "Bonus roll finished. Draw a card!";
        return;
    }

    if (waitingForFinalCheck) {
        waitingForFinalCheck = false;
        showFinalWordCheck();
    } else {
        isMoving = false;
        document.getElementById('ask-btn').disabled = false;
    }
}

function movePlayerStepByStep(start, end, onComplete) {
    let current = start;
    let step = (end > start) ? 1 : -1; 
    
    let timer = setInterval(() => {
        if (current !== end) {
            current += step;
            const player = document.getElementById('player');
            const targetCell = document.getElementById(`cell-${current}`);
            
            player.classList.add('jumping');
            if(targetCell) targetCell.appendChild(player);
            
            setTimeout(() => { player.classList.remove('jumping'); }, 150); 
        } else {
            clearInterval(timer);
            if(onComplete) onComplete();
        }
    }, 400); 
}
