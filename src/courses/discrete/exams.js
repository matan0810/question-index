// ─────────────────────────────────────────────────────────────────────
//  src/courses/discrete/exams.js
//
//  Schema:
//    {
//      code: "<year>_<moed>_I",          // unique identifier
//      year: 2024,
//      moed: "א" | "ב" | "ג",            // exam session
//      semester: "spring" | "winter",     // when course was taught
//      date: "dd.mm.yy",
//      lecturers: ["…", "…"],
//      duration_hours: 3 | 2.5,
//      total_points: 100,
//      verified: true,                    // checked page-by-page against the PDF
//      parts: [                           // ordered parts of the exam
//        {
//          name: "חלק א'",
//          points: 30,                    // total points available in this part
//          choose: 2,                     // student answers this many questions
//          from: ["א1", "א2", "א3"],      // out of these (refs question.id)
//          mandatory: ["א1"]              // optional: question(s) that must be answered
//        }
//      ],
//      questions: [
//        {
//          id: "א1",                      // "<chapter><number>" or "Q<number>"
//          number: 1,                     // sequential number on the exam
//          chapter: "א" | "ב" | "ג",      // primary chapter
//          chapters: ["א","ג"],           // optional: if it spans chapters
//          type: "proof_theorem"          // one of QUESTION_TYPES keys; a
//                | "...",                 // multi-part question carries extra
//                                         // types on its subparts instead of "mixed".
//          topic: "topic_key",            // primary topic from TOPIC_HE
//          topics: ["k1","k2"],           // optional: secondary topics
//          points: 25,                    // points for this question
//          summary: "Short description with $LaTeX$.",
//          subparts: [                    // optional; for multi-part questions.
//            { id: "א", points: 10, type: "compute", topic: "...", summary: "…" },
//            { id: "ב", points: 15, type: "proof_short", topic: "...", summary: "…" },
//          ]
//        }
//      ]
//    }
//
//  A question is counted under every topic it touches — primary topic,
//  any topics:[], and each subpart's topic — across stats, trends, and search.
// ─────────────────────────────────────────────────────────────────────

export const EXAMS = [
  // ════════════════════════════════════════════════════════════════
  //  2006 (תשס"ו) — מועד א'.  Source: merged PDF pp. 1–6.
  //  3 parts: א (ענו על 1 מתוך 2, 20 נק'), ב (8 קצרות ×5), ג (8 רב-ברירה ×5).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2006_א_I",
    year: 2006,
    moed: "א",
    semester: "winter",
    date: "",
    lecturers: ["פרופ' רות לורנס-נאימרק", "פרופ' מיכה א. פרלס"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "פרק א", points: 20, choose: 1, from: ["I", "II"], note: "ענו על אחת משתי השאלות — 20 נק'" },
      { name: "פרק ב", points: 40, choose: 8, from: ["III", "IV", "V", "VI", "VII", "VIII", "IX", "X"], note: "ענו על כל השאלות הקצרות — 5 נק' כל אחת" },
      { name: "פרק ג", points: 40, choose: 8, from: ["XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII"], note: "רב-ברירה — 5 נק' כל אחת" },
    ],
    questions: [
      { id: "I", number: 1, chapter: "א", type: "proof_short", topic: "set_identities", topics: ["sets"], points: 20, summary: 'הגדרת שוויון קבוצות $A=B$; הוכחת הזהות $(A\\setminus B)\\cup(B\\setminus A)=(A\\cup B)\\setminus(A\\cap B)$' },
      { id: "II", number: 2, chapter: "ב", type: "proof_short", topic: "binomial", points: 20, summary: 'רשמו שתי הוכחות (קומבינטורית ואלגברית) לזהות פסקל $\\binom{n}{k-1}+\\binom{n}{k}=\\binom{n+1}{k}$ עבור $1\\le k\\le n$' },

      { id: "III", number: 3, chapter: "א", type: "compute", topic: "functions", topics: ["injection_surjection"], points: 5, summary: 'פשטו את $A\\cap f^{-1}(f(A))$ ואת $B\\cap f(f^{-1}(Y\\setminus B))$ עבור $f:X\\to Y$' },
      { id: "IV", number: 4, chapter: "א", type: "compute", topic: "relations", points: 5, summary: 'מספר היחסים הבינאריים הסימטריים $R$ על $\\{1,\\ldots,10\\}$ המקיימים $1R3$' },
      { id: "V", number: 5, chapter: "ב", type: "compute", topic: "binomial", points: 5, summary: 'חשבו $\\sum_{k=0}^{n} k(k-1)\\binom{n}{k}$ עבור $n\\ge 2$' },
      { id: "VI", number: 6, chapter: "ב", type: "compute", topic: "inclusion_exclusion", points: 5, summary: 'מספר השלשות השלמות $(x_1,x_2,x_3)$ עם $x_1+x_2+x_3=14$ ו-$0\\le x_i\\le 6$' },
      { id: "VII", number: 7, chapter: "ב", type: "compute", topic: "euler_phi", topics: ["divisibility"], points: 5, summary: 'כמה מן המספרים $1,\\ldots,200$ זרים ל-$200$' },
      { id: "VIII", number: 8, chapter: "ג", type: "compute", topic: "euler_path", topics: ["hamilton_path"], points: 5, summary: 'ציירו גרף בן 7 קדקודים שיש בו מעגל אוילר אך אין מסילת המילטון' },
      { id: "IX", number: 9, chapter: "ג", type: "compute", topic: "trees", topics: ["degree_sequence"], points: 5, summary: 'עץ $T$ בן $n$ קדקודים ($4\\le n<\\infty$) עם בדיוק 3 עלים — מהן דרגות יתר הקדקודים' },
      { id: "X", number: 10, chapter: "ב", type: "compute", topic: "recurrence", points: 5, summary: 'הסדרה $a_{n+2}=a_{n+1}+20a_n$, $a_0=2,a_1=1$ — ביטוי מפורש ל-$a_n$' },

      { id: "XI", number: 11, chapter: "א", type: "multiple_choice", topic: "injection_surjection", topics: ["functions"], points: 5, summary: 'איזו מן הטענות על $f,g:X\\to Y$ (על / חח"ע / קבוצת חזקה) נכונה' },
      { id: "XII", number: 12, chapter: "ב", type: "multiple_choice", topic: "binomial", points: 5, summary: 'המעריך הגבוה ביותר של 2 המחלק את $\\binom{80}{40}$ (1/2/4/8)' },
      { id: "XIII", number: 13, chapter: "ב", type: "multiple_choice", topic: "catalan", points: 5, summary: 'שלוש טענות על מספרי קטלן $C_n=\\frac{1}{n+1}\\binom{2n}{n}$ — כמה נכונות' },
      { id: "XIV", number: 14, chapter: "ג", type: "multiple_choice", topic: "trees", points: 5, summary: 'קבוצה $V$ בת $n$ קדקודים, $v_0$ מסוים — מספר העצים על $V$ שבהם $v_0$ עלה' },
      { id: "XV", number: 15, chapter: "ב", type: "multiple_choice", topic: "erdos_szekeres", topics: ["pigeonhole"], points: 5, summary: 'שלוש טענות על קיום תת-סדרות מונוטוניות (ארדש-סקרש) — כמה מהן נכונות' },
      { id: "XVI", number: 16, chapter: "א", type: "multiple_choice", topic: "injection_surjection", topics: ["power_set"], points: 5, summary: '$N$ בת 11 איברים — האם קיימת חח"ע $f:P_5(N)\\to P_6(N)$ כך ש-$S\\subset f(S)$' },
      { id: "XVII", number: 17, chapter: "ג", type: "multiple_choice", topic: "ramsey", topics: ["graph_coloring"], points: 5, summary: 'צביעת צלעות $K$ על מיליון קדקודים ב-2 צבעים — קיימים 10 קדקודים שכל הצלעות ביניהם באותו צבע (אמת/שקר)' },
      { id: "XVIII", number: 18, chapter: "ג", type: "multiple_choice", topic: "ramsey", points: 5, summary: 'אותה טענה כמו XVII עם 40 קדקודים מונוכרומטיים' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2006 (תשס"ו) — מועד ב'.  Source: merged PDF pp. 7–13 (תאריך 12.05.06).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2006_ב_I",
    year: 2006,
    moed: "ב",
    semester: "winter",
    date: "12.05.06",
    lecturers: ["פרופ' רות לורנס-נאימרק", "פרופ' מיכה א. פרלס"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "פרק א", points: 20, choose: 1, from: ["I", "II"], note: "ענו על אחת משתי השאלות — 20 נק'" },
      { name: "פרק ב", points: 40, choose: 8, from: ["III", "IV", "V", "VI", "VII", "VIII", "IX", "X"], note: "ענו על כל השאלות הקצרות — 5 נק' כל אחת" },
      { name: "פרק ג", points: 40, choose: 8, from: ["XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII"], note: "רב-ברירה — 5 נק' כל אחת" },
    ],
    questions: [
      { id: "I", number: 1, chapter: "א", type: "counterexample", topic: "functions", topics: ["injection_surjection"], points: 20, summary: 'הוכיחו או הפריכו עבור $f:X\\to Y$: (א) $f(A\\cap B)=f(A)\\cap f(B)$; (ב) $f^{-1}(C\\cup D)=f^{-1}(C)\\cup f^{-1}(D)$' },
      { id: "II", number: 2, chapter: "ג", type: "compute", topic: "trees", topics: ["degree_sequence"], points: 20, summary: '(א) ציירו עץ על 6 קדקודים $x_1,\\ldots,x_6$ שבו $x_3,x_5$ בדרגה 3 ויתר הקדקודים בדרגה 1; (ב) האם העץ יחיד' },

      { id: "III", number: 3, chapter: "א", type: "compute", topic: "set_identities", points: 5, summary: 'חשבו $\\{1,3,4,5,9\\}\\,\\Delta\\,\\{2,3,6,7,8\\}\\,\\Delta\\,\\{3,4,6,7,9\\}$ (הפרש סימטרי)' },
      { id: "IV", number: 4, chapter: "א", type: "compute", topic: "equivalence_relation", points: 5, summary: 'מספר יחסי השקילות $R$ על $\\{1,\\ldots,9\\}$ שאחת ממחלקות השקילות בהם היא $\\{1,3,5,7,9\\}$' },
      { id: "V", number: 5, chapter: "ב", type: "compute", topic: "binomial", points: 5, summary: 'חשבו $\\sum_{i=k}^{n}\\binom{n}{i}\\binom{i}{k}$ עבור $0\\le k\\le n$' },
      { id: "VI", number: 6, chapter: "ג", type: "compute", topic: "hamilton_path", topics: ["euler_path"], points: 5, summary: 'ציירו גרף בן 6 קדקודים שיש בו מעגל המילטון אך אין בו מסילת אוילר' },
      { id: "VII", number: 7, chapter: "ג", type: "compute", topic: "trees", points: 5, summary: '$V=\\{x_1,\\ldots,x_{10}\\}$ — מספר העצים על $V$ שיש להם בדיוק 3 עלים' },
      { id: "VIII", number: 8, chapter: "ב", type: "compute", topic: "derangement", topics: ["inclusion_exclusion"], points: 5, summary: '7 מכתבים ל-7 מעטפות מתאימות באקראי: (א) מספר האפשרויות; (ב) מספר האפשרויות שבהן לפחות מכתב אחד מגיע ליעדו' },
      { id: "IX", number: 9, chapter: "ב", type: "compute", topic: "recurrence", points: 5, summary: 'הסדרה $a_{n+2}=8a_n-2a_{n+1}$, $a_0=3,a_1=0$ — ביטוי מפורש ל-$a_n$' },
      { id: "X", number: 10, chapter: "ב", type: "compute", topic: "lattice_paths", points: 5, summary: 'בחירות עם 100 בוחרים, מנצח 60 ומפסיד 40: (א) מספר הסידורים של פתקי ההצבעה; (ב) מספר הסידורים שבהם המנצח מוביל ממש לכל אורך הספירה' },

      { id: "XI", number: 11, chapter: "א", type: "multiple_choice", topic: "injection_surjection", topics: ["functions"], points: 5, summary: '$f:A\\to B$ — איזו מן הטענות (על $|f^{-}(Y)|$, $|f(X)|$, חח"ע/על) אינה נכונה' },
      { id: "XII", number: 12, chapter: "ב", type: "multiple_choice", topic: "binomial", points: 5, summary: 'האם $\\binom{80}{20}<4^{10}\\cdot 7^{10}$ (אמת/שקר)' },
      { id: "XIII", number: 13, chapter: "ב", type: "multiple_choice", topic: "inclusion_exclusion", points: 5, summary: 'מספר הסדרות השלמות $(X,Y,Z,W)$ עם $X+Y+Z+W=30$, $Y\\ge3,Z\\le2,W\\le3$' },
      { id: "XIV", number: 14, chapter: "ג", type: "multiple_choice", topic: "ramsey", topics: ["graph_coloring"], points: 5, summary: 'שלוש טענות על צביעת צלעות $K_{17}$ בשלושה צבעים (קיום משולש חד-צבעי) — כמה מהן נכונות' },
      { id: "XV", number: 15, chapter: "ב", type: "multiple_choice", topic: "recurrence", topics: ["counting_basic"], points: 5, summary: 'מספר הסדרות הבינאריות באורך 10 ללא שני 1 צמודים (פיבונאצ\'י)' },
      { id: "XVI", number: 16, chapter: "ב", type: "multiple_choice", topic: "catalan", points: 5, summary: 'איזו נוסחת נסיגה נכונה למספרי קטלן $C_n$' },
      { id: "XVII", number: 17, chapter: "ב", type: "multiple_choice", topic: "divisors_count", topics: ["divisibility"], points: 5, summary: '$15120=2^4\\cdot3^3\\cdot5\\cdot7$ — סכום המחלקים וגודל מספר המחלקים' },
      { id: "XVIII", number: 18, chapter: "ג", type: "multiple_choice", topic: "hamilton_path", topics: ["graph_basic"], points: 5, summary: 'גרף הקובייה התלת-ממדית — מספר מעגלי המילטון בו' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2007 (תשס"ז) — מועד א'.  Source: merged PDF pp. 14–19 (20.02.07).
  //  Flat format: 14 שאלות חובה, 8 נק' כל אחת (מקס' 100).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2007_א_I",
    year: 2007,
    moed: "א",
    semester: "winter",
    date: "20.02.07",
    lecturers: ["פרופ' אהוד פרידגוט", "ד\"ר חגית לסט"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "כל השאלות", points: 100, choose: 14, from: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"], note: "ענו על כל 14 השאלות — 8 נק' כל אחת, מקסימום 100" },
    ],
    questions: [
      { id: "1", number: 1, chapter: "א", type: "true_false", topic: "function_composition", topics: ["injection_surjection"], points: 8, summary: 'טבלת אמת/שקר עבור $f:A\\to B$, $g:B\\to C$: גרירות בין חח"ע/על של $g\\circ f$ לבין חח"ע/על של $f,g$' },
      { id: "2", number: 2, chapter: "ב", type: "compute", topic: "lattice_paths", points: 8, summary: 'פלוטו נע בסריג צעד ימינה או למעלה: (א) מספר המסלולים; (ב) מספר המסלולים מבלי להיתקל בחתולים (מכשולים)' },
      { id: "3", number: 3, chapter: "ב", type: "compute", topic: "binomial", points: 8, summary: 'חשבו $\\sum_{k,l}\\binom{10}{k}\\binom{10}{l}\\binom{10}{20-k-l}$ (ואנדרמונד)' },
      { id: "4", number: 4, chapter: "א", type: "counterexample", topic: "sets", points: 8, summary: 'מצאו קבוצות $A,B$ עם (א) $A\\times B=B\\times A$ ו-(ב) $|A\\times B|=24$, או הוכיחו שאין' },
      { id: "5", number: 5, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 8, summary: 'חלוקת 33 ילדות לשלוש קבוצות: (א) שלוש קבוצות שוות בנות 11; (ב) בגדלים 12, 11, 10' },
      { id: "6", number: 6, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 8, summary: 'הושבת 10 גברים ו-10 נשים סביב שולחן עגול: (א) מספר הסידורים; (ב) מספר הסידורים שבהם אין שני גברים סמוכים' },
      { id: "7", number: 7, chapter: "ב", type: "proof_short", topic: "permutations_combinations", topics: ["binomial"], points: 8, summary: 'השלימו הוכחה קומבינטורית ל-$n\\cdot n!+(n-1)(n-1)!+\\ldots+1\\cdot1!=(n+1)!-1$ (משמעות האיבר $k\\cdot k!$)' },
      { id: "8", number: 8, chapter: "ב", type: "compute", topic: "injection_surjection", topics: ["inclusion_exclusion"], points: 8, summary: 'מקבוצה בגודל 10 לקבוצה בגודל 5: (א) מספר הפונקציות; (ב) כמה מהן על; (ג) כמה מהן חח"ע' },
      { id: "9", number: 9, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 8, summary: '$S_{17}$ — $D(\\sigma)$ סופר זוגות $(i,j)$ עם $\\sigma(i)=j,\\sigma(j)=i$; חשבו $\\sum_{\\sigma\\in S_{17}}D(\\sigma)$' },
      { id: "10", number: 10, chapter: "ג", type: "counterexample", topic: "degree_sequence", points: 8, summary: 'ציירו גרף על 10 קדקודים שבו לכל קדקוד דרגה שונה, או הסבירו מדוע אין כזה' },
      { id: "11", number: 11, chapter: "ב", type: "compute", topic: "catalan", points: 8, summary: '$D_n$ מספר המשולושים (טריאנגולציות) של מצולע קמור בן $n+2$ קדקודים, $D_0=D_1=1$ — בטאו $D_n$ ב-$D_0,\\ldots,D_{n-1}$' },
      { id: "12", number: 12, chapter: "ג", type: "compute", topic: "trees", points: 8, summary: 'מספר העצים על $\\{1,\\ldots,17\\}$ עם 8 עלים, 8 קדקודים בדרגה 2 וקדקוד אחד בדרגה גבוהה מ-2 (פרופר)' },
      { id: "13", number: 13, chapter: "ג", type: "compute", topic: "bipartite", topics: ["trees", "connectivity"], points: 8, summary: 'יער $G$ עם 20 קדקודים ו-15 צלעות (כלומר 5 רכיבי קשירות) — בכמה דרכים לצבוע את קדקודיו בשחור/לבן כך ששכנים מקבלים צבעים שונים' },
      { id: "14", number: 14, chapter: "ג", type: "compute", topic: "euler_path", topics: ["bipartite"], points: 8, summary: 'הגרף הדו-צדדי השלם $K_{n,m}$ — עבור אילו $(m,n)$ יש בו מסילת אוילר אך לא מעגל אוילר' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2007 (תשס"ז) — מועד ב'.  Source: merged PDF pp. 20–23 (11.05.07).
  //  Flat format: 14 שאלות חובה, 8 נק' כל אחת (מקס' 100).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2007_ב_I",
    year: 2007,
    moed: "ב",
    semester: "winter",
    date: "11.05.07",
    lecturers: ["פרופ' אהוד פרידגוט", "ד\"ר חגית לסט"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "כל השאלות", points: 100, choose: 14, from: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"], note: "ענו על כל 14 השאלות — 8 נק' כל אחת, מקסימום 100" },
    ],
    questions: [
      { id: "1", number: 1, chapter: "א", type: "true_false", topic: "function_composition", topics: ["injection_surjection"], points: 8, summary: 'טבלת אמת/שקר עבור $f:A\\to B$, $g:B\\to C$: גרירות בין חח"ע/על של $g\\circ f$ לבין חח"ע/על של $f,g$' },
      { id: "2", number: 2, chapter: "א", type: "compute", topic: "set_identities", points: 8, summary: '$A_i=\\{1,\\ldots,i\\}$ — חשבו ביטוי הפרשים סימטריים מקונן $(A_{10}\\Delta A_6\\Delta A_8\\Delta A_1)\\Delta(\\ldots)$' },
      { id: "3", number: 3, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 8, summary: 'הושבת 10 גברים ו-10 נשים על ספסל: (א) מספר הסידורים; (ב) כמה מהם עם אישה בקצה הימני' },
      { id: "4", number: 4, chapter: "ב", type: "compute", topic: "binomial", points: 8, summary: 'חשבו $\\sum_{(a_1,\\ldots,a_4):\\,\\sum a_i=10}\\binom{10}{a_1,a_2,a_3,a_4}$ (משפט המולטינום)' },
      { id: "5", number: 5, chapter: "ב", type: "compute", topic: "counting_basic", topics: ["binomial"], points: 8, summary: 'מספר תת-הקבוצות של $\\{1,\\ldots,10\\}$ שגודלן זוגי' },
      { id: "6", number: 6, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 8, summary: 'חלוקת 15 תפוחים זהים ו-10 תפוחים זהים (מסוג אחר) ל-4 ילדים שונים (כוכבים ומקלות)' },
      { id: "7", number: 7, chapter: "ב", type: "compute", topic: "inclusion_exclusion", points: 8, summary: 'מספר הפתרונות השלמים של $\\sum_{i=1}^{8}X_i=27$ עם $1\\le X_i\\le 5$' },
      { id: "8", number: 8, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 8, summary: '$S_{17}$, $\\mathrm{fix}(\\sigma)=|\\{i:\\sigma(i)=i\\}|$ — חשבו $\\sum_{\\sigma\\in S_{17}}\\binom{\\mathrm{fix}(\\sigma)}{2}$' },
      { id: "9", number: 9, chapter: "ב", type: "counterexample", topic: "pigeonhole", points: 8, summary: 'האם יש קבוצה $A$ של 6 שלמים בין 1 ל-11 שלכל שתי תת-קבוצות שונות $B,C$ מתקיים $\\sum_B x\\ne\\sum_C y$ (שובך יונים)' },
      { id: "10", number: 10, chapter: "ב", type: "counterexample", topic: "erdos_szekeres", topics: ["pigeonhole"], points: 8, summary: 'האם קיימת סדרה של 25 מספרים ממשיים שונים שאין בה תת-סדרה מונוטונית באורך 6? (הוכיחו/הפריכו)' },
      { id: "11", number: 11, chapter: "ב", type: "compute", topic: "catalan", points: 8, summary: 'הסדרה $X_n=\\sum_{i=0}^{n-1}X_i X_{n-1-i}$, $X_0=X_1=1$ — מצאו $X_{17}$ (קטלן)' },
      { id: "12", number: 12, chapter: "ג", type: "counterexample", topic: "trees", topics: ["degree_sequence"], points: 8, summary: 'יער עם 10 עצים ו-51 צלעות — הוכיחו/הפריכו שיש בו עץ עם יותר מ-6 קדקודים' },
      { id: "13", number: 13, chapter: "ג", type: "compute", topic: "hamilton_path", topics: ["bipartite"], points: 8, summary: 'מספר מעגלי המילטון בגרף הדו-צדדי השלם $K_{10,10}$ (עד כדי נקודת התחלה וכיוון)' },
      { id: "14", number: 14, chapter: "ג", type: "compute", topic: "bipartite", topics: ["connectivity"], points: 8, summary: '$B(G)$ = מספר הצביעות התקינות של $G$ בשחור/לבן (שכנים בצבעים שונים) — הערך המקסימלי האפשרי כש-$G$ בעל 20 קדקודים ו-101 צלעות, ונמקו' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2008 (תשס"ח) — מועד ב'.  Source: merged PDF pp. 24–30 (27.06.08).
  //  Flat format: 17 שאלות, 6 נק' כל אחת; הציון לא בהכרח שווה לסכום הנקודות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2008_ב_I",
    year: 2008,
    moed: "ב",
    semester: "spring",
    date: "27.06.08",
    lecturers: ["פרופ' גיל קלעי", "פרופ' אהוד פרידגוט"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "כל השאלות", points: 100, choose: 17, from: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"], note: "17 שאלות, 6 נק' כל אחת; הציון אינו בהכרח סכום הנקודות (גדול או שווה לו)" },
    ],
    questions: [
      { id: "1", number: 1, chapter: "ב", type: "compute", topic: "binomial", points: 6, summary: 'חשבו ובטאו בביטוי סגור את $\\sum_{k=1}^{17}\\binom{17}{k}\\binom{k}{2}$ (ספירה כפולה)' },
      { id: "2", number: 2, chapter: "ב", type: "compute", topic: "permutations_with_repetition", topics: ["counting_basic"], points: 6, summary: 'בכמה דרכים לחלק 100 אשכוליות זהות ו-50 תפוזים זהים ל-50 ילדים שונים (כוכבים ומחיצות)' },
      { id: "3", number: 3, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 6, summary: 'בכמה דרכים לחלק 17 גברים שונים ו-17 נשים שונות לזוגות, כך שכל זוג מורכב מאישה וגבר' },
      { id: "4", number: 4, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 6, summary: 'בכמה דרכים לחלק 34 אנשים שונים ל-17 זוגות לא-מסומנים' },
      { id: "5", number: 5, chapter: "ב", type: "compute", topic: "multinomial", topics: ["binomial"], points: 6, summary: 'חשבו $\\sum_{x_1+x_2+x_3=17}\\binom{17}{x_1,x_2,x_3}$ (סכום על כל השלשות $x_i\\in\\mathbb{N}$) — משפט המולטינום' },
      { id: "6", number: 6, chapter: "ב", type: "compute", topic: "counting_basic", topics: ["fourth_problem"], points: 6, summary: 'כמה מחוברים יש בסכום שבשאלה הקודמת — מספר השלשות $(x_1,x_2,x_3)\\in\\mathbb{N}^3$ עם $x_1+x_2+x_3=17$' },
      { id: "7", number: 7, chapter: "ב", type: "compute", topic: "inclusion_exclusion", points: 6, summary: 'עשר מתרגלות בודקות 40 בחינות — מספר חלוקות העומס שבהן כל אחת בודקת בין 1 ל-10 בחינות ($\\sum_{i=1}^{10}x_i=40$, $1\\le x_i\\le 10$)' },
      { id: "8", number: 8, chapter: "ג", type: "compute", topic: "trees", topics: ["degree_sequence"], points: 6, summary: 'מספר העצים על $\\{1,\\ldots,10\\}$ שבהם קדקוד יחיד בדרגה 3 וכל יתר הקדקודים בדרגה 1 או 2' },
      { id: "9", number: 9, chapter: "ג", type: "compute", topic: "trees", points: 6, summary: 'מספר העצים על $\\{1,\\ldots,10\\}$ שבהם $\\{1,2\\}$ היא צלע' },
      { id: "10", number: 10, chapter: "א", type: "compute", topic: "power_set", topics: ["counting_basic", "binomial"], points: 6, summary: '$A=P(\\{1,\\ldots,17\\})$ — מספר איברי $A$ (תת-קבוצות) שגודלם זוגי' },
      { id: "11", number: 11, chapter: "א", type: "counterexample", topic: "set_identities", topics: ["power_set"], points: 6, summary: '$B=a_1\\Delta a_2\\Delta\\cdots\\Delta a_m$ כש-$a_i$ עוברים על כל איברי $A$ מהשאלה הקודמת — מספר איברי $B$, או הסבירו מדוע $B$ אינה מוגדרת היטב' },
      { id: "12", number: 12, chapter: "ב", type: "compute", topic: "stable_matching", topics: ["matching"], points: 6, summary: 'אורי, עומר, גיל ואהוד מתחלקים לזוגות; בהינתן ההעדפות — רשמו את בני הזוג האפשריים של גיל אם דורשים שהזיווג יהיה יציב' },
      { id: "13", number: 13, chapter: "ב", type: "compute", topic: "inclusion_exclusion", topics: ["derangement", "permutations"], points: 6, summary: 'מספר התמורות של $\\{1,\\ldots,17\\}$ שבהן אף איבר אינו עובר לאיבר הגדול ממנו בדיוק ב-1, וגם 17 אינו עובר ל-1 (הכלה-הדחה)' },
      { id: "14", number: 14, chapter: "ב", type: "compute", topic: "catalan", topics: ["lattice_paths", "reflection_principle"], points: 6, summary: 'מספר הסדרות באורך 100 עם בדיוק 50 איברים $+1$ ו-50 איברים $-1$ שבהן כל סכום חלקי (i האיברים הראשונים) אי-שלילי (קטלן)' },
      { id: "15", number: 15, chapter: "ב", type: "compute", topic: "lattice_paths", topics: ["reflection_principle"], points: 6, summary: 'באותו אוסף סדרות (50 פעמים $+1$ ו-50 פעמים $-1$) — מספר הסדרות שקיימים בהן $i<j$ עם סכום $i$ הראשונים שלילי וסכום $j$ הראשונים חיובי' },
      { id: "16", number: 16, chapter: "ג", type: "compute", topic: "graph_basic", topics: ["connectivity"], points: 6, summary: 'מהו מספר הצלעות המקסימלי בגרף פשוט בן 100 קדקודים שאינו מכיל מעגל באורך זוגי' },
      { id: "17", number: 17, chapter: "ג", type: "proof_short", topic: "ramsey", topics: ["combinatorial_proof"], points: 6, summary: 'מצאו ביטוי $f(k,n)$ כך שאם ערכו קטן מ-1 אזי בכל צביעה של צלעות $K_n$ בשלושה צבעים קיים תת-גרף שלם $K_k$ חד-צבעי (חסם רמזי)' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2008 (תשס"ח) — מועד ג'.  Source: merged PDF pp. 31–36 (13.10.08).
  //  Flat format: 16 שאלות, 6 נק' כל אחת; קנס על תשובה שגויה בשאלה 9 בלבד.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2008_ג_I",
    year: 2008,
    moed: "ג",
    semester: "spring",
    date: "13.10.08",
    lecturers: ["פרופ' גיל קלעי", "פרופ' אהוד פרידגוט"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "כל השאלות", points: 100, choose: 16, from: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"], note: "16 שאלות, 6 נק' כל אחת; קנס על תשובה שגויה בשאלה 9 בלבד" },
    ],
    questions: [
      { id: "1", number: 1, chapter: "ב", type: "compute", topic: "inclusion_exclusion", points: 6, summary: 'גיל, אהוד, עומר ואורי בודקים 230 מחברות זהות — מספר חלוקות העומס שבהן כל אחד בודק לפחות 15 מחברות (חשוב רק כמה כל אחד בודק)' },
      { id: "2", number: 2, chapter: "ב", type: "compute", topic: "inclusion_exclusion", topics: ["injection_surjection"], points: 6, summary: 'כשאלה 1 אך המחברות שונות זו מזו וחשוב גם מי בודק כל מחברת (התאמת 230 מחברות שונות ל-4 בודקים, כל אחד $\\ge15$)' },
      { id: "3", number: 3, chapter: "ב", type: "compute", topic: "inclusion_exclusion", points: 6, summary: 'עשר מתרגלות בודקות 50 בחינות — מספר החלוקות שבהן כל אחת בודקת בין 1 ל-10 בחינות ($\\sum x_i=50$, $1\\le x_i\\le10$)' },
      { id: "4", number: 4, chapter: "ב", type: "compute", topic: "counting_basic", points: 6, summary: 'מספר המחרוזות ב-$\\{0,1,2,3\\}^{17}$ שסכום הקואורדינטות שלהן זוגי' },
      { id: "5", number: 5, chapter: "ג", type: "compute", topic: "trees", topics: ["degree_sequence"], points: 6, summary: 'מספר העצים על $\\{1,\\ldots,12\\}$ עם $d(1)=d(2)=5$, $d(3)=3$ ו-$d(4)=\\cdots=d(12)=1$ (פרופר)' },
      { id: "6", number: 6, chapter: "ג", type: "compute", topic: "trees", points: 6, summary: 'מספר העצים על $\\{1,\\ldots,n\\}$ שבהם $\\{1,2\\}$ היא צלע' },
      { id: "7", number: 7, chapter: "ג", type: "counterexample", topic: "connectivity", topics: ["trees", "degree_sequence"], points: 6, summary: 'יער עם 170 קדקודים ו-100 קדקודים בדרגה 1 (עלים) — כתבו את מספר רכיבי הקשירות, או הסבירו מדוע אין די מידע' },
      { id: "8", number: 8, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 6, summary: 'בכמה דרכים להושיב 17 גברים ו-17 נשים בשורה על ספסל כך שאין גבר ליד גבר ואין אישה ליד אישה (סידור מתחלף)' },
      { id: "9", number: 9, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 6, summary: 'כיצד משתנה התשובה לשאלה הקודמת אם הישיבה סביב שולחן עגול (סיבובים נחשבים זהים)' },
      { id: "10", number: 10, chapter: "ב", type: "compute", topic: "permutations_combinations", topics: ["inclusion_exclusion"], points: 6, summary: '$\\mathrm{FIX}(\\sigma)$ = מספר נקודות השבת של $\\sigma$ — חשבו $\\sum_{\\sigma\\in S_{19}}\\binom{\\mathrm{FIX}(\\sigma)}{4}$' },
      { id: "11", number: 11, chapter: "ב", type: "compute", topic: "catalan", points: 6, summary: 'בכמה דרכים לחלק מצולע קמור בעל 17 צלעות למשולשים בעזרת אלכסונים שאינם נחתכים (קטלן)' },
      { id: "12", number: 12, chapter: "ג", type: "compute", topic: "graph_basic", points: 6, summary: 'כמה גרפים (מסומנים) שונים יש על קבוצת הקדקודים $\\{1,2,3,4,5\\}$' },
      { id: "13", number: 13, chapter: "ג", type: "compute", topic: "trees", topics: ["graph_basic"], points: 6, summary: 'מהו מספר הצלעות המקסימלי בגרף פשוט בן 100 קדקודים שאינו מכיל מעגל (יער)' },
      { id: "14", number: 14, chapter: "ג", type: "counterexample", topic: "degree_sequence", points: 6, summary: 'ציירו גרף 3-רגולרי על 13 קדקודים, או הסבירו מדוע אין כזה (סכום דרגות אי-זוגי)' },
      { id: "15", number: 15, chapter: "ב", type: "compute", topic: "stable_matching", topics: ["matching"], points: 6, summary: 'אורי, עומר, גיל ואהוד מתחלקים לזוגות; בהינתן ההעדפות — רשמו את בני הזוג האפשריים והבלתי-אפשריים של אורי אם דורשים זיווג יציב' },
      { id: "16", number: 16, chapter: "ב", type: "proof_short", topic: "combinatorial_proof", topics: ["binomial"], points: 6, summary: 'הוכיחו בפחות מ-30 מילים מדוע המקדם הבינומי $\\binom{17}{6}$ מתחלק ב-17 (טיעון קומבינטורי)' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2009 (תשס"ט) — מועד א'.  Source: merged PDF pp. 37–40 (23.02.09).
  //  3 parts: א (1 מתוך 2, מקס' 23), ב (6 קצרות ×7=42), ג (6 אמת/שקר ×6=36).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2009_א_I",
    year: 2009,
    moed: "א",
    semester: "winter",
    date: "23.02.09",
    lecturers: ["ד\"ר שולמית סולומון", "פרופ' צליל סלע"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "פרק א", points: 23, choose: 1, from: ["1", "2"], note: "ענו על אחת משתי השאלות" },
      { name: "פרק ב", points: 42, choose: 6, from: ["3", "4", "5", "6", "7", "8"], note: "שש שאלות קצרות — 7 נק' כל אחת" },
      { name: "פרק ג", points: 36, choose: 6, from: ["9", "10", "11", "12", "13", "14"], note: "אמת/שקר — 6 נק' כל אחת" },
    ],
    questions: [
      { id: "1", number: 1, chapter: "ג", type: "proof_theorem", topic: "graph_basic", points: 23, summary: 'נסחו והוכיחו את משפט Mantel (מספר הצלעות המקסימלי בגרף נטול משולשים, עבור $n$ זוגי)' },
      { id: "2", number: 2, chapter: "ג", type: "proof_short", topic: "planar_graph", points: 23, summary: 'הוכיחו ש-$K_{3,3}$ אינו מישורי' },

      { id: "3", number: 3, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 7, summary: 'מספר הדרכים לחלק את $\\{1,\\ldots,2n\\}$ ל-$n$ זוגות' },
      { id: "4", number: 4, chapter: "א", type: "compute", topic: "relations", points: 7, summary: 'קבוצה סופית $S$, $|S|=n$ — כמה יחסים על $S$ הם גם רפלקסיביים וגם סימטריים' },
      { id: "5", number: 5, chapter: "ב", type: "compute", topic: "erdos_szekeres", points: 7, summary: 'סדרו את המספרים $\\{1,\\ldots,n^2\\}$ כך שלסדרה המתקבלת אין תת-סדרה מונוטונית באורך $n+1$' },
      { id: "6", number: 6, chapter: "ג", type: "compute", topic: "trees", topics: ["degree_sequence"], points: 7, summary: 'מבין כל העצים על $\\{1,\\ldots,20\\}$ — לכמה מהם קוטר 18' },
      { id: "7", number: 7, chapter: "ב", type: "compute", topic: "binomial", points: 7, summary: 'חשבו $\\sum_{k=0}^{10}\\left(\\tfrac{1}{2}\\right)^k(-1)^k\\binom{10}{k}$' },
      { id: "8", number: 8, chapter: "ב", type: "compute", topic: "permutations_combinations", points: 7, summary: 'בכמה דרכים לסדר על ספסל 10 גברים, 10 נשים וילד אחד כך שאין גבר ליד גבר ואין אישה ליד אישה' },

      { id: "9", number: 9, chapter: "ג", type: "true_false", topic: "planar_graph", points: 6, summary: 'אמת/שקר: גרף בעל 5 קדקודים ו-9 צלעות הוא מישורי' },
      { id: "10", number: 10, chapter: "ב", type: "true_false", topic: "pigeonhole", points: 6, summary: 'אמת/שקר: בכל סידור של $\\{1,\\ldots,16\\}$ על מעגל קיימים שלושה מספרים רצופים שסכומם 26' },
      { id: "11", number: 11, chapter: "ג", type: "true_false", topic: "ramsey", points: 6, summary: 'אמת/שקר: $5<R(3,3)$' },
      { id: "12", number: 12, chapter: "ב", type: "true_false", topic: "pigeonhole", points: 6, summary: 'אמת/שקר: בכל קבוצה של 20 מספרים טבעיים יש שניים שסכומם מתחלק ב-5' },
      { id: "13", number: 13, chapter: "ב", type: "true_false", topic: "divisibility", topics: ["binomial"], points: 6, summary: 'אמת/שקר: לכל ראשוני $p>4$ מתקיים $p^2\\mid\\binom{p}{4}$' },
      { id: "14", number: 14, chapter: "ג", type: "true_false", topic: "euler_path", topics: ["hamilton_path"], points: 6, summary: 'אמת/שקר: הגרף המתקבל מ-$K_{25}$ על-ידי הסרת 4 מעגלי המילטון זרים בצלעות מכיל מעגל אוילר' },
    ],
  },
];
