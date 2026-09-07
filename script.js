const syllabus = [
    {
        chapter: "الجملة الأولى",
        branches: [
            {
                title: "1. الْقِرَاءَةُ مُفِيدَةٌ", lessonAr: "الْقِرَاءَةُ مُفِيدَةٌ", lessonEn: "Al-qiraa'atu mufeedatun (Reading is useful)",
                questions: [
                    { letter: "قِ", options: ["QI", "QA", "QU"], answer: "QI" },
                    { letter: "رَا", options: ["RAA", "RUU", "REE"], answer: "RAA" },
                    { letter: "ءَ", options: ["'A", "'I", "'U"], answer: "'A" },
                    { letter: "مُ", options: ["MA", "MI", "MU"], answer: "MU" },
                    { letter: "فِيـ", options: ["FAA", "FEE", "FUU"], answer: "FEE" }
                ]
            },
            {
                title: "2. أُحِبُّ", lessonAr: "أُحِبُّ", lessonEn: "Uhibbu (I love)",
                questions: [
                    { letter: "أُ", options: ["'A", "'I", "'U"], answer: "'U" },
                    { letter: "حِ", options: ["HI", "HA", "HU"], answer: "HI" },
                    { letter: "بُّ", options: ["BBU", "BBA", "BBI"], answer: "BBU" },
                    { letter: "أُحِـ", options: ["'UHA", "'UHI", "'IHU"], answer: "'UHI" },
                    { letter: "حِبُّ", options: ["HIBBA", "HUBBU", "HIBBU"], answer: "HIBBU" }
                ]
            }
        ]
    },
    {
        chapter: "الجملة الثانية",
        branches: [
            {
                title: "1. قِرَاءَةَ الْقِصَصِ", lessonAr: "قِرَاءَةَ الْقِصَصِ", lessonEn: "Qiraa'ata al-qisasi (Reading stories)",
                questions: [
                    { letter: "قِ", options: ["QI", "QA", "QU"], answer: "QI" },
                    { letter: "صَ", options: ["SA", "SU", "SI"], answer: "SA" },
                    { letter: "صِ", options: ["SU", "SA", "SI"], answer: "SI" },
                    { letter: "الْـ", options: ["AL", "EL", "IL"], answer: "AL" },
                    { letter: "قِصَـ", options: ["QISA", "QASU", "QISU"], answer: "QISA" }
                ]
            },
            {
                title: "2. أَقْرَأُ كُلَّ يَوْمٍ", lessonAr: "أَقْرَأُ كُلَّ يَوْمٍ", lessonEn: "Aqra'u kulla yawmin (I read every day)",
                questions: [
                    { letter: "أَقْـ", options: ["'AQ", "'AK", "'AJ"], answer: "'AQ" },
                    { letter: "رَ", options: ["RU", "RI", "RA"], answer: "RA" },
                    { letter: "كُـ", options: ["KU", "KA", "KI"], answer: "KU" },
                    { letter: "لَّ", options: ["LLI", "LLA", "LLU"], answer: "LLA" },
                    { letter: "يَوْ", options: ["YAW", "YAA", "YOO"], answer: "YAW" }
                ]
            }
        ]
    },
    {
        chapter: "الجملة الثالثة",
        branches: [
            {
                title: "1. الْكِتَابُ يُعَلِّمُنِي", lessonAr: "الْكِتَابُ يُعَلِّمُنِي", lessonEn: "Al-kitabu yu'allimunee (The book teaches me)",
                questions: [
                    { letter: "كِـ", options: ["KI", "KA", "KU"], answer: "KI" },
                    { letter: "تَا", options: ["TAA", "TUU", "TEE"], answer: "TAA" },
                    { letter: "يُـ", options: ["YA", "YI", "YU"], answer: "YU" },
                    { letter: "عَـ", options: ["'I", "'U", "'A"], answer: "'A" },
                    { letter: "لِّـ", options: ["LLA", "LLI", "LLU"], answer: "LLI" }
                ]
            },
            {
                title: "2. أَشْيَاءَ جَدِيدَةً", lessonAr: "أَشْيَاءَ جَدِيدَةً", lessonEn: "Ashyaa'a jadeedatan (New things)",
                questions: [
                    { letter: "أَشْـ", options: ["'ASH", "'AS", "'AT"], answer: "'ASH" },
                    { letter: "يَا", options: ["YUU", "YEE", "YAA"], answer: "YAA" },
                    { letter: "جَـ", options: ["JA", "JU", "JI"], answer: "JA" },
                    { letter: "دِيـ", options: ["DAA", "DEE", "DUU"], answer: "DEE" },
                    { letter: "دَةً", options: ["DATUN", "DATIN", "DATAN"], answer: "DATAN" }
                ]
            }
        ]
    }
];

let cIdx = 0; 
let bIdx = 0; 
let qIdx = 0; 
let needsLesson = true; 
let currentPosition = 1;
let isMoving = false; 

// متغيرات التعديل الجديد
let wordStartPosition = 1;      // لحفظ مكان اللاعبة قبل الكلمة للرجوع إليه عند الخطأ
let waitingForFinalCheck = false; // هل أنهت الحروف وتنتظر اختبار الكلمة كاملة؟
let isBonusRoll = false;          // هل هذه رمية نرد إضافية (مكافأة)؟

const snakesAndLadders = {
    4: { to: 14, msg: "🪜 Ladder!" },
    9: { to: 31, msg: "🪜 Great jump!" },
    17: { to: 7, msg: "🐍 Snake!" },
    20: { to: 38, msg: "🪜 Ladder!" },
    45: { to: 22, msg: "🐍 Snake!" }
};

window.onload = () => { createBoard(); populateIndex(); };

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
    if (target >= 1 && target <= 99) {
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
    if (cIdx >= syllabus.length) { alert("🎉 You finished all words!"); return; }
    
    document.getElementById('lesson-index').value = `${cIdx}-${bIdx}`;
    
    // حفظ مكان اللاعبة قبل بدء الكلمة لتتمكن من الرجوع إليه كعقاب
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
    document.getElementById('question-counter').innerText = `Letter ${qIdx + 1} of ${branchData.questions.length}`;
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
        
        // إذا أنهت جميع الحروف، نفعل مؤشر التحدي النهائي
        if (qIdx >= syllabus[cIdx].branches[bIdx].questions.length) {
            waitingForFinalCheck = true;
        }
    } else {
        needsLesson = true; 
        showLessonUI(true); 
    }
}

// الدالة الجديدة لعرض تقييم الكلمة كاملة
function showFinalWordCheck() {
    const branchData = syllabus[cIdx].branches[bIdx];
    document.getElementById('final-word-ar').innerText = branchData.lessonAr;

    document.getElementById('lesson-section').classList.add('hidden');
    document.getElementById('question-section').classList.add('hidden');
    document.getElementById('final-check-section').classList.remove('hidden');
    document.getElementById('quiz-modal').classList.remove('hidden');
}

// الدالة الجديدة لمعالجة نتيجة التقييم النهائي
function handleFinalWord(isCorrect) {
    document.getElementById('quiz-modal').classList.add('hidden');

    if (isCorrect) {
        // مكافأة رمية النرد الإضافية
        document.getElementById('message').innerText = "✅ Amazing! You read the whole word! BONUS ROLL!";
        isBonusRoll = true;
        document.getElementById('dice-btn').disabled = false;
        
        // تجهيز الكلمة التالية
        qIdx = 0;
        bIdx++;
        needsLesson = true;
        if (bIdx >= syllabus[cIdx].branches.length) { bIdx = 0; cIdx++; }
        
    } else {
        // العقاب: العودة للخلف وإعادة الكلمة
        document.getElementById('message').innerText = "❌ Let's try again! Going back...";
        isMoving = true;
        
        movePlayerStepByStep(currentPosition, wordStartPosition, () => {
            currentPosition = wordStartPosition;
            isMoving = false;
            document.getElementById('ask-btn').disabled = false;
            
            // تصفير مؤشرات الكلمة لتعيدها من جديد
            qIdx = 0;
            needsLesson = true;
        });
    }
}

function closeModalAndWait() {
    document.getElementById('quiz-modal').classList.add('hidden');
    document.getElementById('message').innerText = "Review the word, then draw a card to try again.";
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

// دالة جديدة لتنظيم ما يحدث بعد انتهاء حركة اللاعبة
function finishMoveLogic() {
    if(currentPosition === 100) {
        document.getElementById('message').innerText = "🎉 Congratulations! You reached the end!";
        isMoving = false;
        return; 
    }

    if (isBonusRoll) {
        // انتهت من رمية المكافأة، دورها انتهى وتنتظر الكلمة الجديدة
        isBonusRoll = false;
        isMoving = false;
        document.getElementById('ask-btn').disabled = false;
        document.getElementById('message').innerText = "Bonus roll finished. Draw a card!";
        return;
    }

    if (waitingForFinalCheck) {
        // أنهت الحركة للتو بعد آخر حرف، حان وقت التحدي النهائي
        waitingForFinalCheck = false;
        showFinalWordCheck();
    } else {
        // مجرد رمية لحرف عادي، يكتمل الدور للبطاقة التالية
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
