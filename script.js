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

const syllabus = letterData.map(data => {
    const char = data.char;
    
    // إعداد النطق للحركات (فتحة، كسرة، ضمة)
    const vA = data.vowels ? data.vowels[0] : `${data.root}A`;
    const vI = data.vowels ? data.vowels[1] : `${data.root}I`;
    const vU = data.vowels ? data.vowels[2] : `${data.root}U`;
    
    // معالجة خاصة لحرف الألف لوجود الهمزة السفلية في الكسرة
    const charA = data.customLetters ? data.customLetters[0] : `${char}َ`;
    const charI = data.customLetters ? data.customLetters[1] : `${char}ِ`;
    const charU = data.customLetters ? data.customLetters[2] : `${char}ُ`;

    // إعداد أشكال الحرف (مراعاة الحروف التي لا تتصل بما بعدها مثل د، ذ، ر، ز، و)
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
