// ─────────────────────────────────────────────────────────────────────
//  src/courses/discrete/exams.js
//
//  Schema:
//    {
//      code: "<year>_<moed>_I",          // unique identifier
//      year: 2024,
//      moed: "א" | "ב" | "ג",            // exam session
//      semester: "spring" | "winter" | "summer" | "annual",  // when course was taught
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
      {
        name: "פרק א",
        points: 20,
        choose: 1,
        from: ["I", "II"],
        note: "ענו על אחת משתי השאלות — 20 נק'",
      },
      {
        name: "פרק ב",
        points: 40,
        choose: 8,
        from: ["III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
        note: "ענו על כל השאלות הקצרות — 5 נק' כל אחת",
      },
      {
        name: "פרק ג",
        points: 40,
        choose: 8,
        from: ["XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII"],
        note: "רב-ברירה — 5 נק' כל אחת",
      },
    ],
    questions: [
      {
        id: "I",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "set_identities",
        topics: ["sets"],
        points: 20,
        summary:
          "הגדרת שוויון קבוצות $A=B$; הוכחת הזהות $(A\\setminus B)\\cup(B\\setminus A)=(A\\cup B)\\setminus(A\\cap B)$",
      },
      {
        id: "II",
        number: 2,
        chapter: "ב",
        type: "proof_short",
        topic: "binomial",
        points: 20,
        summary:
          "רשמו שתי הוכחות (קומבינטורית ואלגברית) לזהות פסקל $\\binom{n}{k-1}+\\binom{n}{k}=\\binom{n+1}{k}$ עבור $1\\le k\\le n$",
      },

      {
        id: "III",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "functions",
        topics: ["injection_surjection"],
        points: 5,
        summary:
          "פשטו את $A\\cap f^{-1}(f(A))$ ואת $B\\cap f(f^{-1}(Y\\setminus B))$ עבור $f:X\\to Y$",
      },
      {
        id: "IV",
        number: 4,
        chapter: "א",
        type: "compute",
        topic: "relations",
        points: 5,
        summary:
          "מספר היחסים הבינאריים הסימטריים $R$ על $\\{1,\\ldots,10\\}$ המקיימים $1R3$",
      },
      {
        id: "V",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        points: 5,
        summary: "חשבו $\\sum_{k=0}^{n} k(k-1)\\binom{n}{k}$ עבור $n\\ge 2$",
      },
      {
        id: "VI",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 5,
        summary:
          "מספר השלשות השלמות $(x_1,x_2,x_3)$ עם $x_1+x_2+x_3=14$ ו-$0\\le x_i\\le 6$",
      },
      {
        id: "VII",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "euler_phi",
        topics: ["divisibility"],
        points: 5,
        summary: "כמה מן המספרים $1,\\ldots,200$ זרים ל-$200$",
      },
      {
        id: "VIII",
        number: 8,
        chapter: "ג",
        type: "compute",
        topic: "euler_path",
        topics: ["hamilton_path"],
        points: 5,
        summary:
          "ציירו גרף בן 7 קדקודים שיש בו מעגל אוילר אך אין מסילת המילטון",
      },
      {
        id: "IX",
        number: 9,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 5,
        summary:
          "עץ $T$ בן $n$ קדקודים ($4\\le n<\\infty$) עם בדיוק 3 עלים — מהן דרגות יתר הקדקודים",
      },
      {
        id: "X",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "recurrence",
        points: 5,
        summary:
          "הסדרה $a_{n+2}=a_{n+1}+20a_n$, $a_0=2,a_1=1$ — ביטוי מפורש ל-$a_n$",
      },

      {
        id: "XI",
        number: 11,
        chapter: "א",
        type: "multiple_choice",
        topic: "injection_surjection",
        topics: ["functions"],
        points: 5,
        summary:
          'איזו מן הטענות על $f,g:X\\to Y$ (על / חח"ע / קבוצת חזקה) נכונה',
      },
      {
        id: "XII",
        number: 12,
        chapter: "ב",
        type: "multiple_choice",
        topic: "binomial",
        points: 5,
        summary: "המעריך הגבוה ביותר של 2 המחלק את $\\binom{80}{40}$ (1/2/4/8)",
      },
      {
        id: "XIII",
        number: 13,
        chapter: "ב",
        type: "multiple_choice",
        topic: "catalan",
        points: 5,
        summary:
          "שלוש טענות על מספרי קטלן $C_n=\\frac{1}{n+1}\\binom{2n}{n}$ — כמה נכונות",
      },
      {
        id: "XIV",
        number: 14,
        chapter: "ג",
        type: "multiple_choice",
        topic: "trees",
        points: 5,
        summary:
          "קבוצה $V$ בת $n$ קדקודים, $v_0$ מסוים — מספר העצים על $V$ שבהם $v_0$ עלה",
      },
      {
        id: "XV",
        number: 15,
        chapter: "ב",
        type: "multiple_choice",
        topic: "erdos_szekeres",
        topics: ["pigeonhole"],
        points: 5,
        summary:
          "שלוש טענות על קיום תת-סדרות מונוטוניות (ארדש-סקרש) — כמה מהן נכונות",
      },
      {
        id: "XVI",
        number: 16,
        chapter: "א",
        type: "multiple_choice",
        topic: "injection_surjection",
        topics: ["power_set"],
        points: 5,
        summary:
          '$N$ בת 11 איברים — האם קיימת חח"ע $f:P_5(N)\\to P_6(N)$ כך ש-$S\\subset f(S)$',
      },
      {
        id: "XVII",
        number: 17,
        chapter: "ג",
        type: "multiple_choice",
        topic: "ramsey",
        topics: ["graph_coloring"],
        points: 5,
        summary:
          "צביעת צלעות $K$ על מיליון קדקודים ב-2 צבעים — קיימים 10 קדקודים שכל הצלעות ביניהם באותו צבע (אמת/שקר)",
      },
      {
        id: "XVIII",
        number: 18,
        chapter: "ג",
        type: "multiple_choice",
        topic: "ramsey",
        points: 5,
        summary: "אותה טענה כמו XVII עם 40 קדקודים מונוכרומטיים",
      },
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
      {
        name: "פרק א",
        points: 20,
        choose: 1,
        from: ["I", "II"],
        note: "ענו על אחת משתי השאלות — 20 נק'",
      },
      {
        name: "פרק ב",
        points: 40,
        choose: 8,
        from: ["III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
        note: "ענו על כל השאלות הקצרות — 5 נק' כל אחת",
      },
      {
        name: "פרק ג",
        points: 40,
        choose: 8,
        from: ["XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII"],
        note: "רב-ברירה — 5 נק' כל אחת",
      },
    ],
    questions: [
      {
        id: "I",
        number: 1,
        chapter: "א",
        type: "counterexample",
        topic: "functions",
        topics: ["injection_surjection"],
        points: 20,
        summary:
          "הוכיחו או הפריכו עבור $f:X\\to Y$: (א) $f(A\\cap B)=f(A)\\cap f(B)$; (ב) $f^{-1}(C\\cup D)=f^{-1}(C)\\cup f^{-1}(D)$",
      },
      {
        id: "II",
        number: 2,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 20,
        summary:
          "(א) ציירו עץ על 6 קדקודים $x_1,\\ldots,x_6$ שבו $x_3,x_5$ בדרגה 3 ויתר הקדקודים בדרגה 1; (ב) האם העץ יחיד",
      },

      {
        id: "III",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "set_identities",
        points: 5,
        summary:
          "חשבו $\\{1,3,4,5,9\\}\\,\\Delta\\,\\{2,3,6,7,8\\}\\,\\Delta\\,\\{3,4,6,7,9\\}$ (הפרש סימטרי)",
      },
      {
        id: "IV",
        number: 4,
        chapter: "א",
        type: "compute",
        topic: "equivalence_relation",
        points: 5,
        summary:
          "מספר יחסי השקילות $R$ על $\\{1,\\ldots,9\\}$ שאחת ממחלקות השקילות בהם היא $\\{1,3,5,7,9\\}$",
      },
      {
        id: "V",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        points: 5,
        summary:
          "חשבו $\\sum_{i=k}^{n}\\binom{n}{i}\\binom{i}{k}$ עבור $0\\le k\\le n$",
      },
      {
        id: "VI",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "hamilton_path",
        topics: ["euler_path"],
        points: 5,
        summary:
          "ציירו גרף בן 6 קדקודים שיש בו מעגל המילטון אך אין בו מסילת אוילר",
      },
      {
        id: "VII",
        number: 7,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        points: 5,
        summary:
          "$V=\\{x_1,\\ldots,x_{10}\\}$ — מספר העצים על $V$ שיש להם בדיוק 3 עלים",
      },
      {
        id: "VIII",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "derangement",
        topics: ["inclusion_exclusion"],
        points: 5,
        summary:
          "7 מכתבים ל-7 מעטפות מתאימות באקראי: (א) מספר האפשרויות; (ב) מספר האפשרויות שבהן לפחות מכתב אחד מגיע ליעדו",
      },
      {
        id: "IX",
        number: 9,
        chapter: "ב",
        type: "compute",
        topic: "recurrence",
        points: 5,
        summary:
          "הסדרה $a_{n+2}=8a_n-2a_{n+1}$, $a_0=3,a_1=0$ — ביטוי מפורש ל-$a_n$",
      },
      {
        id: "X",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        points: 5,
        summary:
          "בחירות עם 100 בוחרים, מנצח 60 ומפסיד 40: (א) מספר הסידורים של פתקי ההצבעה; (ב) מספר הסידורים שבהם המנצח מוביל ממש לכל אורך הספירה",
      },

      {
        id: "XI",
        number: 11,
        chapter: "א",
        type: "multiple_choice",
        topic: "injection_surjection",
        topics: ["functions"],
        points: 5,
        summary:
          '$f:A\\to B$ — איזו מן הטענות (על $|f^{-}(Y)|$, $|f(X)|$, חח"ע/על) אינה נכונה',
      },
      {
        id: "XII",
        number: 12,
        chapter: "ב",
        type: "multiple_choice",
        topic: "binomial",
        points: 5,
        summary: "האם $\\binom{80}{20}<4^{10}\\cdot 7^{10}$ (אמת/שקר)",
      },
      {
        id: "XIII",
        number: 13,
        chapter: "ב",
        type: "multiple_choice",
        topic: "inclusion_exclusion",
        points: 5,
        summary:
          "מספר הסדרות השלמות $(X,Y,Z,W)$ עם $X+Y+Z+W=30$, $Y\\ge3,Z\\le2,W\\le3$",
      },
      {
        id: "XIV",
        number: 14,
        chapter: "ג",
        type: "multiple_choice",
        topic: "ramsey",
        topics: ["graph_coloring"],
        points: 5,
        summary:
          "שלוש טענות על צביעת צלעות $K_{17}$ בשלושה צבעים (קיום משולש חד-צבעי) — כמה מהן נכונות",
      },
      {
        id: "XV",
        number: 15,
        chapter: "ב",
        type: "multiple_choice",
        topic: "recurrence",
        topics: ["counting_basic"],
        points: 5,
        summary: "מספר הסדרות הבינאריות באורך 10 ללא שני 1 צמודים (פיבונאצ'י)",
      },
      {
        id: "XVI",
        number: 16,
        chapter: "ב",
        type: "multiple_choice",
        topic: "catalan",
        points: 5,
        summary: "איזו נוסחת נסיגה נכונה למספרי קטלן $C_n$",
      },
      {
        id: "XVII",
        number: 17,
        chapter: "ב",
        type: "multiple_choice",
        topic: "divisors_count",
        topics: ["divisibility"],
        points: 5,
        summary:
          "$15120=2^4\\cdot3^3\\cdot5\\cdot7$ — סכום המחלקים וגודל מספר המחלקים",
      },
      {
        id: "XVIII",
        number: 18,
        chapter: "ג",
        type: "multiple_choice",
        topic: "hamilton_path",
        topics: ["graph_basic"],
        points: 5,
        summary: "גרף הקובייה התלת-ממדית — מספר מעגלי המילטון בו",
      },
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
    lecturers: ["פרופ' אהוד פרידגוט", 'ד"ר חגית לסט'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל השאלות",
        points: 100,
        choose: 14,
        from: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
        ],
        note: "ענו על כל 14 השאלות — 8 נק' כל אחת, מקסימום 100",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "true_false",
        topic: "function_composition",
        topics: ["injection_surjection"],
        points: 8,
        summary:
          'טבלת אמת/שקר עבור $f:A\\to B$, $g:B\\to C$: גרירות בין חח"ע/על של $g\\circ f$ לבין חח"ע/על של $f,g$',
      },
      {
        id: "2",
        number: 2,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        points: 8,
        summary:
          "פלוטו נע בסריג צעד ימינה או למעלה: (א) מספר המסלולים; (ב) מספר המסלולים מבלי להיתקל בחתולים (מכשולים)",
      },
      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        points: 8,
        summary:
          "חשבו $\\sum_{k,l}\\binom{10}{k}\\binom{10}{l}\\binom{10}{20-k-l}$ (ואנדרמונד)",
      },
      {
        id: "4",
        number: 4,
        chapter: "א",
        type: "counterexample",
        topic: "sets",
        points: 8,
        summary:
          "מצאו קבוצות $A,B$ עם (א) $A\\times B=B\\times A$ ו-(ב) $|A\\times B|=24$, או הוכיחו שאין",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 8,
        summary:
          "חלוקת 33 ילדות לשלוש קבוצות: (א) שלוש קבוצות שוות בנות 11; (ב) בגדלים 12, 11, 10",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 8,
        summary:
          "הושבת 10 גברים ו-10 נשים סביב שולחן עגול: (א) מספר הסידורים; (ב) מספר הסידורים שבהם אין שני גברים סמוכים",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "proof_short",
        topic: "permutations_combinations",
        topics: ["binomial"],
        points: 8,
        summary:
          "השלימו הוכחה קומבינטורית ל-$n\\cdot n!+(n-1)(n-1)!+\\ldots+1\\cdot1!=(n+1)!-1$ (משמעות האיבר $k\\cdot k!$)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "injection_surjection",
        topics: ["inclusion_exclusion"],
        points: 8,
        summary:
          'מקבוצה בגודל 10 לקבוצה בגודל 5: (א) מספר הפונקציות; (ב) כמה מהן על; (ג) כמה מהן חח"ע',
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 8,
        summary:
          "$S_{17}$ — $D(\\sigma)$ סופר זוגות $(i,j)$ עם $\\sigma(i)=j,\\sigma(j)=i$; חשבו $\\sum_{\\sigma\\in S_{17}}D(\\sigma)$",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "counterexample",
        topic: "degree_sequence",
        points: 8,
        summary:
          "ציירו גרף על 10 קדקודים שבו לכל קדקוד דרגה שונה, או הסבירו מדוע אין כזה",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        points: 8,
        summary:
          "$D_n$ מספר המשולושים (טריאנגולציות) של מצולע קמור בן $n+2$ קדקודים, $D_0=D_1=1$ — בטאו $D_n$ ב-$D_0,\\ldots,D_{n-1}$",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        points: 8,
        summary:
          "מספר העצים על $\\{1,\\ldots,17\\}$ עם 8 עלים, 8 קדקודים בדרגה 2 וקדקוד אחד בדרגה גבוהה מ-2 (פרופר)",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "bipartite",
        topics: ["trees", "connectivity"],
        points: 8,
        summary:
          "יער $G$ עם 20 קדקודים ו-15 צלעות (כלומר 5 רכיבי קשירות) — בכמה דרכים לצבוע את קדקודיו בשחור/לבן כך ששכנים מקבלים צבעים שונים",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "compute",
        topic: "euler_path",
        topics: ["bipartite"],
        points: 8,
        summary:
          "הגרף הדו-צדדי השלם $K_{n,m}$ — עבור אילו $(m,n)$ יש בו מסילת אוילר אך לא מעגל אוילר",
      },
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
    lecturers: ["פרופ' אהוד פרידגוט", 'ד"ר חגית לסט'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל השאלות",
        points: 100,
        choose: 14,
        from: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
        ],
        note: "ענו על כל 14 השאלות — 8 נק' כל אחת, מקסימום 100",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "true_false",
        topic: "function_composition",
        topics: ["injection_surjection"],
        points: 8,
        summary:
          'טבלת אמת/שקר עבור $f:A\\to B$, $g:B\\to C$: גרירות בין חח"ע/על של $g\\circ f$ לבין חח"ע/על של $f,g$',
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "compute",
        topic: "set_identities",
        points: 8,
        summary:
          "$A_i=\\{1,\\ldots,i\\}$ — חשבו ביטוי הפרשים סימטריים מקונן $(A_{10}\\Delta A_6\\Delta A_8\\Delta A_1)\\Delta(\\ldots)$",
      },
      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 8,
        summary:
          "הושבת 10 גברים ו-10 נשים על ספסל: (א) מספר הסידורים; (ב) כמה מהם עם אישה בקצה הימני",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        points: 8,
        summary:
          "חשבו $\\sum_{(a_1,\\ldots,a_4):\\,\\sum a_i=10}\\binom{10}{a_1,a_2,a_3,a_4}$ (משפט המולטינום)",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        topics: ["binomial"],
        points: 8,
        summary: "מספר תת-הקבוצות של $\\{1,\\ldots,10\\}$ שגודלן זוגי",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["counting_basic"],
        points: 8,
        summary:
          "חלוקת 15 תפוחים זהים ו-10 תפוחים זהים (מסוג אחר) ל-4 ילדים שונים (כוכבים ומקלות)",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 8,
        summary:
          "מספר הפתרונות השלמים של $\\sum_{i=1}^{8}X_i=27$ עם $1\\le X_i\\le 5$",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 8,
        summary:
          "$S_{17}$, $\\mathrm{fix}(\\sigma)=|\\{i:\\sigma(i)=i\\}|$ — חשבו $\\sum_{\\sigma\\in S_{17}}\\binom{\\mathrm{fix}(\\sigma)}{2}$",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "counterexample",
        topic: "pigeonhole",
        points: 8,
        summary:
          "האם יש קבוצה $A$ של 6 שלמים בין 1 ל-11 שלכל שתי תת-קבוצות שונות $B,C$ מתקיים $\\sum_B x\\ne\\sum_C y$ (שובך יונים)",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "counterexample",
        topic: "erdos_szekeres",
        topics: ["pigeonhole"],
        points: 8,
        summary:
          "האם קיימת סדרה של 25 מספרים ממשיים שונים שאין בה תת-סדרה מונוטונית באורך 6? (הוכיחו/הפריכו)",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        points: 8,
        summary:
          "הסדרה $X_n=\\sum_{i=0}^{n-1}X_i X_{n-1-i}$, $X_0=X_1=1$ — מצאו $X_{17}$ (קטלן)",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "counterexample",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 8,
        summary:
          "יער עם 10 עצים ו-51 צלעות — הוכיחו/הפריכו שיש בו עץ עם יותר מ-6 קדקודים",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "hamilton_path",
        topics: ["bipartite"],
        points: 8,
        summary:
          "מספר מעגלי המילטון בגרף הדו-צדדי השלם $K_{10,10}$ (עד כדי נקודת התחלה וכיוון)",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "compute",
        topic: "bipartite",
        topics: ["connectivity"],
        points: 8,
        summary:
          "$B(G)$ = מספר הצביעות התקינות של $G$ בשחור/לבן (שכנים בצבעים שונים) — הערך המקסימלי האפשרי כש-$G$ בעל 20 קדקודים ו-101 צלעות, ונמקו",
      },
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
      {
        name: "כל השאלות",
        points: 100,
        choose: 17,
        from: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
        ],
        note: "17 שאלות, 6 נק' כל אחת; הציון אינו בהכרח סכום הנקודות (גדול או שווה לו)",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        points: 6,
        summary:
          "חשבו ובטאו בביטוי סגור את $\\sum_{k=1}^{17}\\binom{17}{k}\\binom{k}{2}$ (ספירה כפולה)",
      },
      {
        id: "2",
        number: 2,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        topics: ["counting_basic"],
        points: 6,
        summary:
          "בכמה דרכים לחלק 100 אשכוליות זהות ו-50 תפוזים זהים ל-50 ילדים שונים (כוכבים ומחיצות)",
      },
      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 6,
        summary:
          "בכמה דרכים לחלק 17 גברים שונים ו-17 נשים שונות לזוגות, כך שכל זוג מורכב מאישה וגבר",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 6,
        summary: "בכמה דרכים לחלק 34 אנשים שונים ל-17 זוגות לא-מסומנים",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "multinomial",
        topics: ["binomial"],
        points: 6,
        summary:
          "חשבו $\\sum_{x_1+x_2+x_3=17}\\binom{17}{x_1,x_2,x_3}$ (סכום על כל השלשות $x_i\\in\\mathbb{N}$) — משפט המולטינום",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        topics: ["fourth_problem"],
        points: 6,
        summary:
          "כמה מחוברים יש בסכום שבשאלה הקודמת — מספר השלשות $(x_1,x_2,x_3)\\in\\mathbb{N}^3$ עם $x_1+x_2+x_3=17$",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 6,
        summary:
          "עשר מתרגלות בודקות 40 בחינות — מספר חלוקות העומס שבהן כל אחת בודקת בין 1 ל-10 בחינות ($\\sum_{i=1}^{10}x_i=40$, $1\\le x_i\\le 10$)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 6,
        summary:
          "מספר העצים על $\\{1,\\ldots,10\\}$ שבהם קדקוד יחיד בדרגה 3 וכל יתר הקדקודים בדרגה 1 או 2",
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        points: 6,
        summary: "מספר העצים על $\\{1,\\ldots,10\\}$ שבהם $\\{1,2\\}$ היא צלע",
      },
      {
        id: "10",
        number: 10,
        chapter: "א",
        type: "compute",
        topic: "power_set",
        topics: ["counting_basic", "binomial"],
        points: 6,
        summary:
          "$A=P(\\{1,\\ldots,17\\})$ — מספר איברי $A$ (תת-קבוצות) שגודלם זוגי",
      },
      {
        id: "11",
        number: 11,
        chapter: "א",
        type: "counterexample",
        topic: "set_identities",
        topics: ["power_set"],
        points: 6,
        summary:
          "$B=a_1\\Delta a_2\\Delta\\cdots\\Delta a_m$ כש-$a_i$ עוברים על כל איברי $A$ מהשאלה הקודמת — מספר איברי $B$, או הסבירו מדוע $B$ אינה מוגדרת היטב",
      },
      {
        id: "12",
        number: 12,
        chapter: "ב",
        type: "compute",
        topic: "stable_matching",
        topics: ["matching"],
        points: 6,
        summary:
          "אורי, עומר, גיל ואהוד מתחלקים לזוגות; בהינתן ההעדפות — רשמו את בני הזוג האפשריים של גיל אם דורשים שהזיווג יהיה יציב",
      },
      {
        id: "13",
        number: 13,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        topics: ["derangement", "permutations"],
        points: 6,
        summary:
          "מספר התמורות של $\\{1,\\ldots,17\\}$ שבהן אף איבר אינו עובר לאיבר הגדול ממנו בדיוק ב-1, וגם 17 אינו עובר ל-1 (הכלה-הדחה)",
      },
      {
        id: "14",
        number: 14,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        topics: ["lattice_paths", "reflection_principle"],
        points: 6,
        summary:
          "מספר הסדרות באורך 100 עם בדיוק 50 איברים $+1$ ו-50 איברים $-1$ שבהן כל סכום חלקי (i האיברים הראשונים) אי-שלילי (קטלן)",
      },
      {
        id: "15",
        number: 15,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["reflection_principle"],
        points: 6,
        summary:
          "באותו אוסף סדרות (50 פעמים $+1$ ו-50 פעמים $-1$) — מספר הסדרות שקיימים בהן $i<j$ עם סכום $i$ הראשונים שלילי וסכום $j$ הראשונים חיובי",
      },
      {
        id: "16",
        number: 16,
        chapter: "ג",
        type: "compute",
        topic: "graph_basic",
        topics: ["connectivity"],
        points: 6,
        summary:
          "מהו מספר הצלעות המקסימלי בגרף פשוט בן 100 קדקודים שאינו מכיל מעגל באורך זוגי",
      },
      {
        id: "17",
        number: 17,
        chapter: "ג",
        type: "proof_short",
        topic: "ramsey",
        topics: ["combinatorial_proof"],
        points: 6,
        summary:
          "מצאו ביטוי $f(k,n)$ כך שאם ערכו קטן מ-1 אזי בכל צביעה של צלעות $K_n$ בשלושה צבעים קיים תת-גרף שלם $K_k$ חד-צבעי (חסם רמזי)",
      },
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
      {
        name: "כל השאלות",
        points: 100,
        choose: 16,
        from: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
        ],
        note: "16 שאלות, 6 נק' כל אחת; קנס על תשובה שגויה בשאלה 9 בלבד",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 6,
        summary:
          "גיל, אהוד, עומר ואורי בודקים 230 מחברות זהות — מספר חלוקות העומס שבהן כל אחד בודק לפחות 15 מחברות (חשוב רק כמה כל אחד בודק)",
      },
      {
        id: "2",
        number: 2,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        topics: ["injection_surjection"],
        points: 6,
        summary:
          "כשאלה 1 אך המחברות שונות זו מזו וחשוב גם מי בודק כל מחברת (התאמת 230 מחברות שונות ל-4 בודקים, כל אחד $\\ge15$)",
      },
      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 6,
        summary:
          "עשר מתרגלות בודקות 50 בחינות — מספר החלוקות שבהן כל אחת בודקת בין 1 ל-10 בחינות ($\\sum x_i=50$, $1\\le x_i\\le10$)",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 6,
        summary:
          "מספר המחרוזות ב-$\\{0,1,2,3\\}^{17}$ שסכום הקואורדינטות שלהן זוגי",
      },
      {
        id: "5",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 6,
        summary:
          "מספר העצים על $\\{1,\\ldots,12\\}$ עם $d(1)=d(2)=5$, $d(3)=3$ ו-$d(4)=\\cdots=d(12)=1$ (פרופר)",
      },
      {
        id: "6",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        points: 6,
        summary: "מספר העצים על $\\{1,\\ldots,n\\}$ שבהם $\\{1,2\\}$ היא צלע",
      },
      {
        id: "7",
        number: 7,
        chapter: "ג",
        type: "counterexample",
        topic: "connectivity",
        topics: ["trees", "degree_sequence"],
        points: 6,
        summary:
          "יער עם 170 קדקודים ו-100 קדקודים בדרגה 1 (עלים) — כתבו את מספר רכיבי הקשירות, או הסבירו מדוע אין די מידע",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 6,
        summary:
          "בכמה דרכים להושיב 17 גברים ו-17 נשים בשורה על ספסל כך שאין גבר ליד גבר ואין אישה ליד אישה (סידור מתחלף)",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 6,
        summary:
          "כיצד משתנה התשובה לשאלה הקודמת אם הישיבה סביב שולחן עגול (סיבובים נחשבים זהים)",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        topics: ["inclusion_exclusion"],
        points: 6,
        summary:
          "$\\mathrm{FIX}(\\sigma)$ = מספר נקודות השבת של $\\sigma$ — חשבו $\\sum_{\\sigma\\in S_{19}}\\binom{\\mathrm{FIX}(\\sigma)}{4}$",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        points: 6,
        summary:
          "בכמה דרכים לחלק מצולע קמור בעל 17 צלעות למשולשים בעזרת אלכסונים שאינם נחתכים (קטלן)",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "graph_basic",
        points: 6,
        summary:
          "כמה גרפים (מסומנים) שונים יש על קבוצת הקדקודים $\\{1,2,3,4,5\\}$",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["graph_basic"],
        points: 6,
        summary:
          "מהו מספר הצלעות המקסימלי בגרף פשוט בן 100 קדקודים שאינו מכיל מעגל (יער)",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "counterexample",
        topic: "degree_sequence",
        points: 6,
        summary:
          "ציירו גרף 3-רגולרי על 13 קדקודים, או הסבירו מדוע אין כזה (סכום דרגות אי-זוגי)",
      },
      {
        id: "15",
        number: 15,
        chapter: "ב",
        type: "compute",
        topic: "stable_matching",
        topics: ["matching"],
        points: 6,
        summary:
          "אורי, עומר, גיל ואהוד מתחלקים לזוגות; בהינתן ההעדפות — רשמו את בני הזוג האפשריים והבלתי-אפשריים של אורי אם דורשים זיווג יציב",
      },
      {
        id: "16",
        number: 16,
        chapter: "ב",
        type: "proof_short",
        topic: "combinatorial_proof",
        topics: ["binomial"],
        points: 6,
        summary:
          "הוכיחו בפחות מ-30 מילים מדוע המקדם הבינומי $\\binom{17}{6}$ מתחלק ב-17 (טיעון קומבינטורי)",
      },
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
    lecturers: ['ד"ר שולמית סולומון', "פרופ' צליל סלע"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "פרק א",
        points: 23,
        choose: 1,
        from: ["1", "2"],
        note: "ענו על אחת משתי השאלות",
      },
      {
        name: "פרק ב",
        points: 42,
        choose: 6,
        from: ["3", "4", "5", "6", "7", "8"],
        note: "שש שאלות קצרות — 7 נק' כל אחת",
      },
      {
        name: "פרק ג",
        points: 36,
        choose: 6,
        from: ["9", "10", "11", "12", "13", "14"],
        note: "אמת/שקר — 6 נק' כל אחת",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "graph_basic",
        points: 23,
        summary:
          "נסחו והוכיחו את משפט Mantel (מספר הצלעות המקסימלי בגרף נטול משולשים, עבור $n$ זוגי)",
      },
      {
        id: "2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        points: 23,
        summary: "הוכיחו ש-$K_{3,3}$ אינו מישורי",
      },

      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 7,
        summary: "מספר הדרכים לחלק את $\\{1,\\ldots,2n\\}$ ל-$n$ זוגות",
      },
      {
        id: "4",
        number: 4,
        chapter: "א",
        type: "compute",
        topic: "relations",
        points: 7,
        summary:
          "קבוצה סופית $S$, $|S|=n$ — כמה יחסים על $S$ הם גם רפלקסיביים וגם סימטריים",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "erdos_szekeres",
        points: 7,
        summary:
          "סדרו את המספרים $\\{1,\\ldots,n^2\\}$ כך שלסדרה המתקבלת אין תת-סדרה מונוטונית באורך $n+1$",
      },
      {
        id: "6",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 7,
        summary: "מבין כל העצים על $\\{1,\\ldots,20\\}$ — לכמה מהם קוטר 18",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        points: 7,
        summary:
          "חשבו $\\sum_{k=0}^{10}\\left(\\tfrac{1}{2}\\right)^k(-1)^k\\binom{10}{k}$",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 7,
        summary:
          "בכמה דרכים לסדר על ספסל 10 גברים, 10 נשים וילד אחד כך שאין גבר ליד גבר ואין אישה ליד אישה",
      },

      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "true_false",
        topic: "planar_graph",
        points: 6,
        summary: "אמת/שקר: גרף בעל 5 קדקודים ו-9 צלעות הוא מישורי",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "true_false",
        topic: "pigeonhole",
        points: 6,
        summary:
          "אמת/שקר: בכל סידור של $\\{1,\\ldots,16\\}$ על מעגל קיימים שלושה מספרים רצופים שסכומם 26",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "true_false",
        topic: "ramsey",
        points: 6,
        summary: "אמת/שקר: $5<R(3,3)$",
      },
      {
        id: "12",
        number: 12,
        chapter: "ב",
        type: "true_false",
        topic: "pigeonhole",
        points: 6,
        summary:
          "אמת/שקר: בכל קבוצה של 20 מספרים טבעיים יש שניים שסכומם מתחלק ב-5",
      },
      {
        id: "13",
        number: 13,
        chapter: "ב",
        type: "true_false",
        topic: "divisibility",
        topics: ["binomial"],
        points: 6,
        summary: "אמת/שקר: לכל ראשוני $p>4$ מתקיים $p^2\\mid\\binom{p}{4}$",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "true_false",
        topic: "euler_path",
        topics: ["hamilton_path"],
        points: 6,
        summary:
          "אמת/שקר: הגרף המתקבל מ-$K_{25}$ על-ידי הסרת 4 מעגלי המילטון זרים בצלעות מכיל מעגל אוילר",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2009 (תשס"ט) — מועד ב'.  Source: merged PDF pp. 41–44 (15.05.09).
  //  3 parts: א (1 מתוך 2, מקס' 23), ב (6 קצרות ×7=42), ג (6 אמת/שקר ×6=36).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2009_ב_I",
    year: 2009,
    moed: "ב",
    semester: "winter",
    date: "15.05.09",
    lecturers: ['ד"ר שולמית סולומון', "פרופ' צליל סלע"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "פרק א",
        points: 23,
        choose: 1,
        from: ["1", "2"],
        note: "ענו על אחת משתי השאלות",
      },
      {
        name: "פרק ב",
        points: 42,
        choose: 6,
        from: ["3", "4", "5", "6", "7", "8"],
        note: "שש שאלות קצרות — 7 נק' כל אחת",
      },
      {
        name: "פרק ג",
        points: 36,
        choose: 6,
        from: ["9", "10", "11", "12", "13", "14"],
        note: "אמת/שקר — 6 נק' כל אחת",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "euler_formula",
        topics: ["planar_graph"],
        points: 23,
        summary: "נסחו והוכיחו את נוסחת אוילר לגרפים מישוריים",
      },
      {
        id: "2",
        number: 2,
        chapter: "ב",
        type: "proof_theorem",
        topic: "erdos_szekeres",
        points: 23,
        summary: "נסחו והוכיחו את משפט ארדש-סקרש על קיום תת-סדרות מונוטוניות",
      },

      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "multinomial",
        topics: ["binomial"],
        points: 7,
        summary: "מהו המקדם של $x^5y^3$ בפיתוח $(2+x+y)^{10}$",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 7,
        summary:
          "מספר הפתרונות השלמים של $\\sum_{i=1}^{5}x_i=15$ עם $1\\le x_i\\le 4$",
      },
      {
        id: "5",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 7,
        summary:
          "כמה עצים יש על $\\{1,\\ldots,10\\}$ עם $d(4)=d(5)=d(6)=3$ ו-$d(1)=d(2)=d(3)=2$",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "fibonacci",
        topics: ["recurrence"],
        points: 7,
        summary:
          "קוף עולה סולם בן $n$ שלבים, בכל צעד עולה שלב אחד או שניים — בכמה דרכים יגיע לשלב ה-$n$ (פיבונאצ'י)",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        points: 7,
        summary:
          "בבחירות מועמד אחד זוכה ב-$a$ קולות ומועמד שני ב-$b$ קולות, $b<a$ — בכמה אופנים למנות את הקולות כך שהראשון מוביל לכל אורך המנייה (בעיית ההצבעה)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        points: 7,
        summary:
          "בכמה דרכים לסדר בשורה 3 פילים, 2 צבים וחמישה קרנפים (זהים בתוך כל מין)",
      },

      {
        id: "9",
        number: 9,
        chapter: "א",
        type: "true_false",
        topic: "sets",
        topics: ["cardinality"],
        points: 6,
        summary: "אמת/שקר: אם $A,B$ קבוצות זרות אזי $|A\\cup B|<|A|+|B|$",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "true_false",
        topic: "divisibility",
        points: 6,
        summary: "אמת/שקר: לכל $n$ מתקיים $2^n\\mid\\dfrac{(2n)!}{n!}$",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "true_false",
        topic: "ramsey",
        points: 6,
        summary: "אמת/שקר: עבור $1<m,n$ מתקיים $R(m,n)<R(2,m,n)$",
      },
      {
        id: "12",
        number: 12,
        chapter: "ב",
        type: "true_false",
        topic: "erdos_szekeres",
        points: 6,
        summary:
          "אמת/שקר: בכל סדרה $a_1,\\ldots,a_{101}$ של מספרים ממשיים שונים קיימת תת-סדרה מונוטונית באורך 11",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "true_false",
        topic: "euler_path",
        topics: ["hamilton_path"],
        points: 6,
        summary:
          "אמת/שקר: בגרף המתקבל מ-$K_{30}$ בהסרת 2 מעגלי המילטון זרים בצלעות ניתן לכסות את הצלעות ב-15 מסילות זרות בצלעות",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "true_false",
        topic: "matching",
        topics: ["halls_theorem"],
        points: 6,
        summary:
          "אמת/שקר: בגרף דו-צדדי $K$-רגולרי ($3<K$, $|V_1|=|V_2|$) קיימים שני זיווגים מושלמים זרים בקשתות",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2009 (תשס"ט) — מועד ג'.  Source: merged PDF pp. 45–48 (14.10.09).
  //  3 parts: א (1 מתוך 2, מקס' 23), ב (6 קצרות ×7=42), ג (6 אמת/שקר ×6=36).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2009_ג_I",
    year: 2009,
    moed: "ג",
    semester: "winter",
    date: "14.10.09",
    lecturers: ['ד"ר שולמית סולומון', "פרופ' צליל סלע"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "פרק א",
        points: 23,
        choose: 1,
        from: ["1", "2"],
        note: "ענו על אחת משתי השאלות",
      },
      {
        name: "פרק ב",
        points: 42,
        choose: 6,
        from: ["3", "4", "5", "6", "7", "8"],
        note: "שש שאלות קצרות — 7 נק' כל אחת",
      },
      {
        name: "פרק ג",
        points: 36,
        choose: 6,
        from: ["9", "10", "11", "12", "13", "14"],
        note: "אמת/שקר — 6 נק' כל אחת",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        points: 23,
        summary: "הוכיחו ש-$K_5$ אינו מישורי",
      },
      {
        id: "2",
        number: 2,
        chapter: "ג",
        type: "proof_theorem",
        topic: "euler_path",
        points: 23,
        summary:
          "נסחו והוכיחו את משפט אוילר על קיום מעגלים ומסילות אוילר בגרפים",
      },

      {
        id: "3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 7,
        summary: "מבין כל העצים על $\\{1,\\ldots,15\\}$ — לכמה מהם קוטר 13",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 7,
        summary: "מספר הדרכים לחלק את $\\{1,\\ldots,15\\}$ לחמש שלשות",
      },
      {
        id: "5",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "graph_basic",
        points: 7,
        summary: "כמה מעגלים פשוטים ייתכנו לכל היותר בגרף קשיר בעל $n$ קדקודים",
      },
      {
        id: "6",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "graph_basic",
        points: 7,
        summary: "כמה גרפים לא-מכוונים שקדקודיהם $\\{1,\\ldots,n\\}$ ישנם",
      },
      {
        id: "7",
        number: 7,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        points: 7,
        summary: "כמה עצים לא-מתויגים (עד כדי איזומורפיזם) בעלי 5 קדקודים ישנם",
      },
      {
        id: "8",
        number: 8,
        chapter: "ג",
        type: "compute",
        topic: "connectivity",
        topics: ["graph_basic"],
        points: 7,
        summary: "המספר המזערי של צלעות בגרף קשיר בעל $n$ קדקודים שקוטרו 2",
      },

      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "true_false",
        topic: "euler_path",
        points: 6,
        summary:
          "אמת/שקר: בגרף קשיר לא-מכוון שבו כל קדקוד בדרגה זוגית ניתן לכוון את הצלעות כך שדרגת היציאה של כל קדקוד שווה לדרגת הכניסה",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "true_false",
        topic: "divisibility",
        points: 6,
        summary: "אמת/שקר: $6^n\\mid\\dfrac{(3n)!}{n!}$",
      },
      {
        id: "11",
        number: 11,
        chapter: "א",
        type: "true_false",
        topic: "sets",
        topics: ["cardinality"],
        points: 6,
        summary: "אמת/שקר: לכל קבוצות $A,B$ מתקיים $|A\\cup B|=|A|+|B|$",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "true_false",
        topic: "graph_basic",
        points: 6,
        summary: "אמת/שקר: גרף בעל $n$ קדקודים ו-$n$ צלעות מכיל מעגל",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "true_false",
        topic: "ramsey",
        points: 6,
        summary:
          "אמת/שקר: בכל קבוצה של 7 אנשים יש 3 המכירים זה את זה או 3 שאינם מכירים זה את זה",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "true_false",
        topic: "bipartite",
        points: 6,
        summary:
          "אמת/שקר: ניתן לצבוע את קדקודי מעגל $C$ בעל $n$ קדקודים בשני צבעים כך ששכנים מקבלים צבעים שונים",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2010 (תש"ע) — מועד א'.  Source: merged PDF pp. 49–50 (09.02.10).
  //  3 parts: א (5 שאלות ×6=30, ענו על כולן), ב (1 מתוך 2 ×30), ג (2 מתוך 3 ×20=40).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2010_א_I",
    year: 2010,
    moed: "א",
    semester: "winter",
    date: "09.02.10",
    lecturers: ["פרופ' אהוד פרידגוט", "פרופ' אלכסנדר לובוצקי"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "חלק ראשון",
        points: 30,
        choose: 5,
        from: ["1", "2", "3", "4", "5"],
        note: "ענו על כל חמש השאלות — 6 נק' כל אחת, ללא נימוקים",
      },
      {
        name: "חלק שני",
        points: 30,
        choose: 1,
        from: ["6", "7"],
        note: "ענו על אחת משתי השאלות — 30 נק'",
      },
      {
        name: "חלק שלישי",
        points: 40,
        choose: 2,
        from: ["8", "9", "10"],
        note: "ענו על שתיים משלוש — 20 נק' כל אחת",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "power_set",
        topics: ["counting_basic"],
        points: 6,
        summary: "מספר תת-הקבוצות של $\\{1,\\ldots,17\\}$",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "compute",
        topic: "power_set",
        topics: ["binomial"],
        points: 6,
        summary: "מספר תת-הקבוצות של $\\{1,\\ldots,17\\}$ שגודלן זוגי",
      },
      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        topics: ["lattice_paths"],
        points: 6,
        summary:
          "מספר הדרכים לסדר 17 פלוסים ו-17 מינוסים בסדרה כך שבכל רישא לא-ריקה מספר המינוסים קטן ממש ממספר הפלוסים",
      },
      {
        id: "4",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "connectivity",
        topics: ["trees"],
        points: 6,
        summary: "יער עם 17 קדקודים ו-15 צלעות — מספר רכיבי הקשירות",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 6,
        summary:
          "רשמו את הנוסחה ל-$|A\\cup B\\cup C\\cup D|$ (הכלה-הדחה לארבע קבוצות)",
      },

      {
        id: "6",
        number: 6,
        chapter: "ג",
        type: "proof_theorem",
        topic: "halls_theorem",
        topics: ["matching"],
        points: 30,
        summary: "נסחו והוכיחו את משפט החתונה של הול",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "proof_theorem",
        topic: "erdos_szekeres",
        points: 30,
        summary: "נסחו והוכיחו את משפט ארדש-סקרש",
      },

      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        topics: ["combinatorial_proof"],
        points: 20,
        summary:
          "חשבו בשתי דרכים שונות את $\\sum_{k=0}^{n}k\\binom{n}{k}$ (אחת מהן הוכחה קומבינטורית)",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        topics: ["functions"],
        points: 20,
        summary:
          "$F$ אוסף כל הפונקציות מ-$\\{1,\\ldots,17\\}$ לעצמה — חשבו את ממוצע מספר נקודות השבת $\\dfrac{\\sum_{f\\in F}\\mathrm{fix}(f)}{|F|}$",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        topics: ["graph_basic"],
        points: 20,
        summary:
          "הראו שאם $G$ גרף קשיר מינימלי (השמטת כל צלע מנתקת אותו) אז $G$ חסר-מעגלים מקסימלי (הוספת כל צלע יוצרת מעגל) — אפיון עץ פורש",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2010 (תש"ע) — מועד ב'.  Source: merged PDF pp. 51–52 (30.04.10).
  //  3 parts: ראשון (5 שאלות ×6=30, ענו על כולן), שני (1 מתוך 2 ×30), שלישי (2 מתוך 3 ×20=40).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2010_ב_I",
    year: 2010,
    moed: "ב",
    semester: "spring",
    date: "30.04.10",
    lecturers: ["פרופ' אהוד פרידגוט", "פרופ' אלכסנדר לובוצקי"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "חלק ראשון",
        points: 30,
        choose: 5,
        from: ["1", "2", "3", "4", "5"],
        note: "ענו על כל חמש — 6 נק' כל אחת, ללא נימוקים",
      },
      {
        name: "חלק שני",
        points: 30,
        choose: 1,
        from: ["6", "7"],
        note: "ענו על אחת משתי השאלות — 30 נק'",
      },
      {
        name: "חלק שלישי",
        points: 40,
        choose: 2,
        from: ["8", "9", "10"],
        note: "ענו על שתיים משלוש — 20 נק' כל אחת",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        topics: ["counting_basic"],
        points: 6,
        summary: "$\\sum_{i=0}^{17}\\binom{17}{i}\\binom{17}{17-i}$",
      },
      {
        id: "2",
        number: 2,
        chapter: "ב",
        type: "compute",
        topic: "multinomial",
        points: 6,
        summary: "המקדם של $x^3y^4z^{10}$ בפיתוח של $(x+y+z)^{17}$",
      },
      {
        id: "3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["prufer_sequence"],
        points: 6,
        summary:
          "מספר העצים המתויגים על $\\{v_1,\\ldots,v_{17}\\}$ שבהם $\\{v_{16},v_{17}\\}$ היא צלע",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        points: 6,
        summary:
          "מספר הדרכים לחלק מצולע קמור בעל 17 צלעות למשולשים באמצעות אלכסונים שאינם נחתכים",
      },
      {
        id: "5",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "degree_sequence",
        topics: ["graph_basic"],
        points: 6,
        summary:
          "בגרף 2-רגולרי על 17 קדקודים — מה מספר הצלעות לפחות ולכל היותר",
      },

      {
        id: "6",
        number: 6,
        chapter: "ג",
        type: "proof_theorem",
        topic: "halls_theorem",
        topics: ["matching"],
        points: 30,
        summary: "נסחו והוכיחו את משפט החתונה של הול",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "proof_theorem",
        topic: "inclusion_exclusion",
        points: 30,
        summary: "נסחו והוכיחו את עקרון ההכלה וההדחה",
      },

      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["counting_basic"],
        points: 20,
        summary:
          "מספר הדרכים לחלק 17 תפוזים זהים **או פחות מכך** לחמישה ילדים שונים",
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        topics: ["graph_basic"],
        points: 20,
        summary: "תנו שתי הגדרות שקולות לעץ והוכיחו שאחת גוררת את השנייה",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "derangement",
        topics: ["inclusion_exclusion"],
        points: 20,
        summary:
          "מספר הפרמוטציות של $\\{1,\\ldots,17\\}$ שאין להן נקודת שבת (אי-סדרים)",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2011 (תשע"א) — מועד א'.  Source: merged PDF pp. 53–58 (24.01.11).
  //  20 שאלות × 5 נק' = 100.  ללא חלקים.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2011_א_I",
    year: 2011,
    moed: "א",
    semester: "winter",
    date: "24.01.11",
    lecturers: ["פרופ' ארז לפיד", "פרופ' אהוד פרידגוט"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        points: 5,
        summary: "הגדירו עץ",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "functions",
        topics: ["sets"],
        points: 5,
        summary: "הגדירו את המכפלה הקרטסית $A\\times B$ לקבוצות $A,B$",
      },
      {
        id: "3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "ramsey",
        points: 5,
        summary: "לשני שלמים חיוביים $k,t$ — הגדירו את מספר רמזי $R(k,t)$",
      },
      {
        id: "4",
        number: 4,
        chapter: "א",
        type: "counterexample",
        topic: "power_set",
        topics: ["cardinality"],
        points: 5,
        summary:
          "הוכיחו או הפריכו (פחות מ-40 מילים): לכל קבוצה סופית $A$ מתקיים $|A|<|P(A)\\times A|$",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 5,
        summary:
          "מספר הסדרות באורך 20 שכל איבר בהן הוא $1$ או $-1$ וסכום האיברים הוא $20$",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 5,
        summary:
          "בכמה מהסדרות שבשאלה 5 קיימים $1\\leq k<m\\leq 20$ כך שסכום $k$ האיברים הראשונים חיובי וסכום $m$ האיברים הראשונים שלילי",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        topics: ["fourth_problem"],
        points: 5,
        summary:
          "מספר הדרכים לחלק קבוצה של 18 ילדים לשלוש קבוצות **שוות גודל** ו**ללא שמות לקבוצות** (משנה רק מי עם מי)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 5,
        summary:
          'מספר הדרכים לחלק 18 ילדים לשלוש קבוצות שוות גודל — "הפועל", "ביתר", "מכבי"',
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "compute",
        topic: "functions",
        topics: ["counting_basic"],
        points: 5,
        summary:
          'מספר הדרכים לחלק 18 ילדים לשלוש קבוצות (גם ריקות, לא בהכרח שוות) — "הפועל", "ביתר", "מכבי"',
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        points: 5,
        summary:
          "מספר הדרכים לחלק 18 כדורי-סל **זהים** בין שלוש הקבוצות הפועל, ביתר ומכבי",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["inclusion_exclusion"],
        points: 5,
        summary:
          "מספר הדרכים לחלק 18 כדורי-סל זהים בין 5 קבוצות שונות כך שאף קבוצה לא מקבלת יותר מ-5 כדורים",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary:
          "כמה עצים על $\\{1,\\ldots,17\\}$ יש כך ש-$1$ הוא עלה וגם $\\{1,2\\}$ היא צלע",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary: "כמה עצים על $\\{1,\\ldots,17\\}$ יש כך שהדרגה של $1$ היא $2$",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary:
          "יהי $A$ מספר העצים על $\\{1,\\ldots,17\\}$ שבהם $\\deg(1)=2$, ו-$B$ כאלה שבהם גם $\\{1,2\\}$ צלע — מה הוא $A/B$",
      },
      {
        id: "15",
        number: 15,
        chapter: "ג",
        type: "compute",
        topic: "graph_basic",
        topics: ["trees", "connectivity"],
        points: 5,
        summary:
          "גרף עם 37 קדקודים, 10 רכיבי קשירות ומעגל יחיד — מהם כל הערכים האפשריים של מספר הצלעות $X$",
      },
      {
        id: "16",
        number: 16,
        chapter: "ג",
        type: "compute",
        topic: "planar_graph",
        topics: ["euler_formula"],
        points: 5,
        summary:
          "גרף מישורי עם 20 קדקודים שבו כל פאה (כולל אינסופית) היא מחומש — מהם הערכים האפשריים של $X$ (מספר הצלעות)",
      },
      {
        id: "17",
        number: 17,
        chapter: "ג",
        type: "compute",
        topic: "ramsey",
        points: 5,
        summary:
          "כלא עם $X$ אסירים, כנופיה = $\\binom{10}{2}$ זוגותיהם באותה ערימה; ניתן לחלק לשתי ערימות ללא כנופיה — מה ניתן לומר על $X$",
      },
      {
        id: "18",
        number: 18,
        chapter: "ב",
        type: "counterexample",
        topic: "erdos_szekeres",
        points: 5,
        summary:
          "הוכיחו או הפריכו (פחות מ-40 מילים): קיים סדרה של 8 מספרים ללא תת-סדרה מונוטונית עולה באורך 3 **ו**ללא תת-סדרה מונוטונית יורדת באורך 5",
      },
      {
        id: "19",
        number: 19,
        chapter: "ג",
        type: "counterexample",
        topic: "hamilton_path",
        topics: ["graph_basic"],
        points: 5,
        summary:
          "אליס: כל 3-רגולרי על 8 קדקודים הוא המילטוני. בוב: אף 3-רגולרי כזה אינו המילטוני. גידי: לא אחד. דודו: שניהם. הכריעו (פחות מ-40 מילים)",
      },
      {
        id: "20",
        number: 20,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        topics: ["counting_basic"],
        points: 5,
        summary:
          "מינור ריבועי של מטריצה ריבועית מתקבל ממחיקת מספר שווה של שורות ועמודות — כמה מינורים ריבועיים יש למטריצה $17\\times 17$",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2011 (תשע"א) — מועד ב'.  Source: merged PDF pp. 60–66 (25.02.11).
  //  20 שאלות × 5 נק' = 100.  ללא חלקים.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2011_ב_I",
    year: 2011,
    moed: "ב",
    semester: "winter",
    date: "25.02.11",
    lecturers: ["פרופ' ארז לפיד", "פרופ' אהוד פרידגוט"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "injection_surjection",
        points: 5,
        summary: "הגדירו מתי פונקציה $f: A\\to B$ היא חד-ערכית",
      },
      {
        id: "2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        points: 5,
        summary: 'הסבירו מתי גרף $G$ נקרא "מישורי"',
      },
      {
        id: "3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "ramsey",
        points: 5,
        summary: "לשני שלמים חיוביים $k,t$ — הגדירו את **מספר רמזי** $R(k,t)$",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 5,
        summary: "מספר הסדרות באורך 20 שכל איבר בהן הוא $X$, $Y$ או $Z$",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        topics: ["lattice_paths"],
        points: 5,
        summary:
          "בכמה מהסדרות מהשאלה הקודמת יש בדיוק 10 מופעי $X$, ולכל $k\\in\\{1,\\ldots,10\\}$ יש לפחות $k$ מופעי $X$ בין $2k-1$ האיברים הראשונים",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 5,
        summary:
          'מספר הדרכים לחלק 18 ילדים לשלוש קבוצות שוות גודל — "הפועל", "ביתר", "מכבי"',
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "multinomial",
        topics: ["combinatorial_proof"],
        points: 5,
        summary:
          "למה שווה $\\sum_{x,y,z}\\binom{18}{x}\\binom{18-x}{y}\\binom{18-x-y}{z}$ (כאשר הסכום על כל $x,y,z\\geq0$ עם $x+y+z=18$)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "injection_surjection",
        topics: ["inclusion_exclusion"],
        points: 5,
        summary:
          'מספר הדרכים לחלק 18 ילדים לשלוש קבוצות **לא ריקות** (לא בהכרח שוות) — "הפועל", "ביתר", "מכבי"',
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        points: 5,
        summary:
          "מספר הדרכים לחלק 18 כדורי-סל **זהים** בין שלוש הקבוצות הפועל, ביתר ומכבי כך שכל קבוצה תקבל לפחות כדור אחד",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        topics: ["combinatorial_proof"],
        points: 5,
        summary:
          "כמה ועדים (כולל הוועד הריק) ניתן להרכיב מ-17 בנים ו-17 בנות אם מספר הבנים חייב להיות שווה למספר הבנות",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary:
          "כמה עצים יש על $\\{1,\\ldots,17\\}$ כך ש-$\\{1,2\\}$ היא צלע והדרגה של $1$ היא $1$",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary:
          "כמה עצים יש על $\\{1,\\ldots,17\\}$ כך ש-$\\{1,2\\}$ היא צלע והדרגה של $1$ גדולה מ-$1$",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "hamilton_path",
        topics: ["bipartite"],
        points: 5,
        summary:
          "כמה מעגלי המילטון יש בגרף הדו-צדדי השלם $K_{4,4}$ (ללא נקודת התחלה ואין כיוון)",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "compute",
        topic: "hamilton_path",
        topics: ["bipartite"],
        points: 5,
        summary: "כמה מעגלי המילטון יש בגרף הדו-צדדי השלם $K_{4,5}$",
      },
      {
        id: "15",
        number: 15,
        chapter: "ג",
        type: "compute",
        topic: "euler_path",
        topics: ["bipartite"],
        points: 5,
        summary: "כמה מעגלי אוילר יש בגרף הדו-צדדי השלם $K_{5,5}$",
      },
      {
        id: "16",
        number: 16,
        chapter: "ג",
        type: "compute",
        topic: "ramsey",
        points: 5,
        summary:
          "רשמו את המספר הגדול ביותר $n$ עליו ידוע בוודאות שניתן לצבוע $K_n$ בשני צבעים ללא $K_{20}$ מונוכרומטי (תת-גרף שלם בן 20 שכל צלעותיו בצבע אחד)",
      },
      {
        id: "17",
        number: 17,
        chapter: "ב",
        type: "compute",
        topic: "multinomial",
        points: 5,
        summary: "המקדם של $X^3Y^4Z^{10}$ בפיתוח של $(X+Y+Z)^{17}$",
      },
      {
        id: "18",
        number: 18,
        chapter: "ב",
        type: "proof_short",
        topic: "binomial",
        topics: ["combinatorial_proof"],
        points: 5,
        summary:
          "מצאו בטיעון קומבינטורי למה שווה $\\sum_{k=0}^{17}k\\binom{17}{k}$ (פחות מ-40 מילים)",
      },
      {
        id: "19",
        number: 19,
        chapter: "ג",
        type: "proof_short",
        topic: "halls_theorem",
        topics: ["matching", "bipartite"],
        points: 5,
        summary:
          "30 אנשים, כל אחד בדיוק ב-5 חוגים, כל חוג 5 אנשים — הוכיחו או הפריכו (פחות מ-40 מילים): ניתן לבחור נציג אחד מכל חוג ללא נציג משותף לשני חוגים",
      },
      {
        id: "20",
        number: 20,
        chapter: "ג",
        type: "proof_short",
        topic: "graph_coloring",
        topics: ["graph_basic"],
        points: 5,
        summary:
          "גרף שלכל תת-קבוצה לא-ריקה $W$ יש פחות מ-$3|W|$ צלעות שני קצותיהן ב-$W$ — הוכיחו או הפריכו (פחות מ-40 מילים): ניתן לצבוע קדקודיו ב-6 צבעים שכנים בצבעים שונים",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2012 (תשע"ב) — מועד א'.  Source: merged PDF pp. 67–71 (22.02.12).
  //  17 שאלות × 6 נק' (Q9: 4 תתי-שאלות × 2 נק' כ"א). ענו על כולן.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2012_א_I",
    year: 2012,
    moed: "א",
    semester: "winter",
    date: "22.02.12",
    lecturers: ["פרופ' אהוד פרידגוט", "פרופ' מנחם מגידור"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ב",
        type: "compute",
        topic: "derangement",
        topics: ["inclusion_exclusion"],
        points: 6,
        summary:
          "בנשף ריקודים יש 20 זוגות (גבר+אשה). בכמה דרכים לארגן ריקוד כך שכל אשה רוקדת עם גבר אך לא עם בן זוגה?",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "compute",
        topic: "set_identities",
        topics: ["sets"],
        points: 6,
        summary:
          "לכל $i=1,\\ldots,10$ הגדירו $A_i=\\{i,i+1,\\ldots,10\\}$ — רשמו את כל איברי $A_1\\Delta A_2\\Delta\\cdots\\Delta A_{10}$",
      },
      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        topics: ["counting_basic"],
        points: 6,
        summary:
          "סדרו מהגדול לקטן: $1000!,\\; 2^{1000},\\; \\binom{1001}{499},\\; \\binom{1001}{500}$",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        topics: ["lattice_paths", "binomial"],
        points: 6,
        summary:
          "כמה סדרות $a_1,\\ldots,a_{100}$ עם $a_i\\in\\{1,-1\\}$, $\\sum a_i=0$, ו-$\\exists 1\\leq n<m\\leq 100$ כך ש-$\\sum_{i=1}^n a_i>0$ וגם $\\sum_{i=m}^{100}a_i>0$? (רשמו באמצעות מקדמים בינומיים)",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["inclusion_exclusion"],
        points: 6,
        summary:
          "כמה דרכים לחלק 11 מושבים בין 5 מפלגות כך שכל מפלגה מקבלת לפחות 1 ולכל היותר 3 מושבים?",
      },
      {
        id: "6",
        number: 6,
        chapter: "ג",
        type: "proof_short",
        topic: "ramsey",
        points: 6,
        summary: "הגדירו את מספר רמזי $R(a,b)$",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        topics: ["counting_basic"],
        points: 6,
        summary:
          "כמה מילים באורך 17 מהאותיות $A,B,C,D,E$ כך שלפחות אחת מ-$A,B,C$ מופיעה?",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        topics: ["combinatorial_proof"],
        points: 6,
        summary:
          "$\\sum_k\\sum_m\\binom{5}{k}\\binom{6}{m}\\binom{10}{13-m-k}=$",
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "multiple_choice",
        topic: "trees",
        topics: ["connectivity", "graph_basic"],
        points: 8,
        summary:
          '$F$ יער עם 10 רכיבי קשירות; $G$ מתקבל מ-$F$ ע"י הוספת 9 צלעות. לכל אפשרות — תמיד/לעולם לא/לפעמים: (א) ל-$G$ אין מעגלים (ב) $G$ קשיר (ג) $G$ לא-קשיר וחסר מעגלים (ד) $G$ קשיר ויש בו מעגלים',
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "compute",
        topic: "ramsey",
        topics: ["bipartite"],
        points: 6,
        summary:
          "המספר המינימלי $n$ כך שבכל צביעה של $K_n$ בשני צבעים מובטח מעגל אדום באורך אי-זוגי או $K_{50}$ כחול",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        points: 6,
        summary:
          "$\\sum_{k=0}^{15}(-1)^k\\binom{17}{k}=$ (שימו לב לגבולות הסכימה!)",
      },
      {
        id: "12",
        number: 12,
        chapter: "א",
        type: "multiple_choice",
        topic: "invertible_function",
        topics: ["functions"],
        points: 6,
        summary:
          '$f:A\\to B,\\; g:B\\to C,\\; h:C\\to A$ ביקציות — $h\\circ g\\circ f$ היא: תמיד/לעולם לא/לפעמים חח"ע, ותמיד/לעולם לא/לפעמים על',
      },
      {
        id: "13",
        number: 13,
        chapter: "א",
        type: "compute",
        topic: "sets",
        topics: ["functions"],
        points: 6,
        summary:
          "רשמו אפיון קצר (עד 40 מילים) של כל הקבוצות $B$ כך ש-$\\{1,2,3\\}\\times B = B\\times\\{1,2,3\\}$",
      },
      {
        id: "14",
        number: 14,
        chapter: "א",
        type: "compute",
        topic: "power_set",
        topics: ["binomial", "counting_basic"],
        points: 6,
        summary:
          "לכמה תת-קבוצות של $\\{1,2,\\ldots,18\\}$ יש מספר אי-זוגי של איברים?",
      },
      {
        id: "15",
        number: 15,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        topics: ["sets"],
        points: 6,
        summary:
          "הוכיחו או הפריכו (עד 40 מילים): לכל קבוצה $A$ של 7 שלמים בין 1 ל-18 יש ל-$A$ שתי תת-קבוצות $B,C$ עם סכום איברים שווה",
      },
      {
        id: "16",
        number: 16,
        chapter: "ב",
        type: "compute",
        topic: "catalan",
        topics: ["recurrence"],
        points: 6,
        summary:
          "$D_n$ = מספר משולשות מצולע קמור בעל $n+2$ קדקודים; $D_0=D_1=1,D_2=2,D_3=5$ — בטאו את $D_{10}$ באמצעות $D_0,\\ldots,D_9$",
      },
      {
        id: "17",
        number: 17,
        chapter: "ב",
        type: "counterexample",
        topic: "erdos_szekeres",
        points: 6,
        summary:
          "הוכיחו או הפריכו (עד 40 מילים): קיום סדרה של 16 מספרים שונים ללא תת-סדרה מונוטונית באורך 5",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2012 (תשע"ב) — מועד ב'.  Source: merged PDF pp. 72–77 (15.03.12).
  //  17 שאלות × 6 נק' (Q4,Q6,Q7 מרובי-ברירה; Q9: חלק א' 6+חלק ב' 2 נק').
  // ════════════════════════════════════════════════════════════════
  {
    code: "2012_ב_I",
    year: 2012,
    moed: "ב",
    semester: "winter",
    date: "15.03.12",
    lecturers: ["פרופ' אהוד פרידגוט", "פרופ' מנחם מגידור"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        points: 6,
        summary: "$\\sum_{i=0}^{8}\\binom{17}{i}=$ (שימו לב לגבולות הסכימה!)",
      },
      {
        id: "2",
        number: 2,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["counting_basic"],
        points: 6,
        summary: "כמה עצים מכיל $K_{20}$ שיש בהם בדיוק 18 קדקודים?",
      },
      {
        id: "3",
        number: 3,
        chapter: "ג",
        type: "counterexample",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 6,
        summary:
          "הוכיחו או הפריכו (עד 40 מילים): קיים עץ על 17 קדקודים שיש בו קדקוד מדרגה 5 ובדיוק 4 עלים",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "multiple_choice",
        topic: "erdos_szekeres",
        points: 6,
        summary:
          "סדרה $a_1,\\ldots,a_{81}$ של שלמים שונים — תמיד/לעולם לא/לפעמים: (א) יש תת-סדרה מונוטונית באורך 9 (ב) יש תת-סדרה מונוטונית באורך 10 (ג) אם אין עולה באורך 9 אז יש יורדת באורך 11",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "multinomial",
        points: 6,
        summary:
          "$\\sum_{a_1+a_2+a_3=17}\\binom{17}{a_1,a_2,a_3}=$ (סכום על כל שלשות טבעיים)",
      },
      {
        id: "6",
        number: 6,
        chapter: "א",
        type: "multiple_choice",
        topic: "injection_surjection",
        topics: ["functions", "function_composition"],
        points: 6,
        summary:
          '$f:A\\to B,\\; g:B\\to C$ — נכון/לא נכון: (א) $g\\circ f$ חח"ע ו-$g$ חח"ע $\\Rightarrow$ $f$ חח"ע (ב) $g\\circ f$ חח"ע $\\Rightarrow$ $g\\circ f$ חח"ע (?) (ג) $g$ על וגם $g\\circ f$ על',
      },
      {
        id: "7",
        number: 7,
        chapter: "ג",
        type: "multiple_choice",
        topic: "degree_sequence",
        topics: ["graph_basic"],
        points: 6,
        summary:
          "99 אנשים לוחצים ידיים (גרף פשוט) — תמיד נכון/תמיד לא נכון/לעתים נכון: (א) כולם לחצו בדיוק 33 ידיים (ב) סכום הלחיצות זוגי (ג) כולם לחצו מספרים שונים של ידיים",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "binomial",
        topics: ["combinatorial_proof"],
        points: 6,
        summary: "$\\sum_{K=0}^{17}\\binom{17}{K}\\binom{K}{3}=$",
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "euler_path",
        topics: ["hamilton_path", "graph_basic"],
        points: 8,
        summary:
          '$G$ מתקבל מ-$K_{17}$ ע"י הסרת 4 מעגלי המילטון זרי צלעות — (א) הוכיחו ב-40 מילים ש-$G$ קשיר (ב) הוכיחו ב-30 מילים ש-$G$ אוילרי (מעגל שמכיל כל צלע)',
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "derangement",
        topics: ["permutations_combinations"],
        points: 6,
        summary:
          "מספר הדרכים לסדר 10 זוגות סביב שולחן עגול כך שאף אחד לא ישב ליד בן/בת זוגו (בעיית המנאז')",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["counting_basic", "permutations_combinations"],
        points: 6,
        summary:
          "200 מבחנים לחלק בין 4 בודקים — (א) כמה דרכים לחלק **כמות** (200 זהים); (ב) כמה דרכים לחלק את **המחברות השונות**",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 6,
        summary:
          "כמה עצים יש על $\\{1,\\ldots,17\\}$ כך ש: (א) 1 הוא עלה; (ב) $\\{1,2\\}$ צלע; (ג) $\\{1,2\\},\\{2,3\\},\\{1,3\\}$ כולן צלעות",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "ramsey",
        points: 6,
        summary:
          "בהינתן $R(4,3)=9$ — מהו המספר המינימלי $n$ כך שבכל צביעה של $K_n$ בשני צבעים מובטח $K_4$ מונוכרומטי? (פחות מ-30 מילים)",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        topics: ["pigeonhole", "connectivity"],
        points: 6,
        summary:
          "יער עם 71 קדקודים ו-64 צלעות — הוכיחו או הפריכו (פחות מ-40 מילים): יש בו עץ עם לפחות 10 צלעות",
      },
      {
        id: "15",
        number: 15,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        topics: ["fourth_problem"],
        points: 6,
        summary:
          '(א) 9 חתולים שונים ל-3 שקים זהים של 3 חתולים כ"א; (ב) 9 חתולים ל-3 שקים זהים בחלוקה 2-3-4',
      },
      {
        id: "16",
        number: 16,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        topics: ["functions", "power_set"],
        points: 6,
        summary:
          '$A$ = תת-קבוצות של $\\{1,\\ldots,17\\}$ עם סכום זוגי, $B$ = עם סכום אי-זוגי — מצאו פונקציה חח"ע $\\phi:A\\to B$',
      },
      {
        id: "17",
        number: 17,
        chapter: "א",
        type: "compute",
        topic: "sets",
        topics: ["counting_basic", "partial_order"],
        points: 6,
        summary:
          "כמה שרשראות $A\\subseteq B\\subseteq C\\subseteq D\\subseteq\\{1,\\ldots,17\\}$ יש?",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2013 (תשע"ג) — מועד א'.  Source: merged PDF pp. 78–89 (06.02.13).
  //  מרצים: גורביץ' + ביגון (חדשים).  18 שאלות × 6 נק'. משך: 3 שעות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2013_א_I",
    year: 2013,
    moed: "א",
    semester: "winter",
    date: "06.02.13",
    lecturers: ["פרופ' אלכסנדר גורביץ'", 'ד"ר בנואה ביגון'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        topics: ["set_identities"],
        points: 6,
        summary:
          "האם $((A\\cup C)\\times B)\\setminus(C\\times D)\\subset A\\times(B\\cup D)$ לכל קבוצות $A,B,C,D$? הוכיחו (דיאגרמות) או הפריכו",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "injection_surjection",
        topics: ["function_composition"],
        points: 6,
        summary:
          '$f:A\\to B$, $g:B\\to A$, $g\\circ f$ חח"ע ועל — האם $f\\circ g:B\\to B$ חייבת להיות חח"ע ועל? הוכיחו או הפריכו',
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "relations",
        points: 6,
        summary:
          "$R=\\{(x,y)\\in\\mathbb{Z}^2\\mid x<|y|\\}$ — הוכיחו כל תכונה שמתקיימת (רפלקסיבי, סימטרי, טרנזיטיבי) והפריכו את שאינן מתקיימות",
      },
      {
        id: "4",
        number: 4,
        chapter: "א",
        type: "compute",
        topic: "equivalence_relation",
        topics: ["permutations", "counting_basic"],
        points: 6,
        summary:
          "ריבוע: צביעות 4 צלעות ב-3 צבעים ללא סמוכים שווי-צבע — מצאו נציגי מחלקות השקילות תחת סיבוב וגודל כל מחלקה",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 6,
        summary:
          "כמה מספרים בני 4 ספרות מ-$\\{1,\\ldots,6\\}$ שהספרה 1 מופיעה לכל היותר פעם אחת?",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        points: 6,
        summary:
          "חשבו $S(7,4)$ — מספר החלוקות של $\\{1,\\ldots,7\\}$ ל-$\\Lambda=\\{A,B,C,D\\}$",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        topics: ["inclusion_exclusion"],
        points: 6,
        summary:
          "7 כדורים בשורה (3 אדומים, 2 כחולים, 1 לבן, 1 שחור) — קצה ימני לא אדום, קצה שמאלי לא כחול; כמה סידורים?",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["inclusion_exclusion"],
        points: 6,
        summary:
          "כמה פתרונות שלמים ל-$x_1+\\cdots+x_5=8$ עם $0\\leq x_1\\leq 3$, $x_2,\\ldots,x_5\\geq 0$?",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "binomial",
        topics: ["combinatorial_proof"],
        points: 6,
        summary:
          "הוכיחו $\\sum_{k=0}^{n}(-1)^k 4^k 3^{n-k}\\binom{n}{k}=(-1)^n$ לכל $n\\in\\mathbb{N}$",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "injection_surjection",
        topics: ["inclusion_exclusion", "permutations_combinations"],
        points: 6,
        summary:
          '$X=\\{a,b,c\\}$, $Y=\\{1,\\ldots,7\\}$ — כמה חח"ע $f:X\\to Y$ עם $f(a)\\notin\\{1,2\\}$, $f(b)\\neq 2$, $f(c)\\neq 3$?',
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 6,
        summary:
          "$X\\subseteq\\{1,3,5,\\ldots,299\\}$, $|X|=25$ — הוכיחו שיש $A\\neq B$ בגודל 2 עם סכומים שווים",
      },
      {
        id: "12",
        number: 12,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["reflection_principle"],
        points: 6,
        summary:
          "כמה מסלולים באורך 10 מ-$(0,0)$ ל-$(6,4)$ שאינם עוברים מעל הישר $y=x$?",
      },
      {
        id: "13",
        number: 13,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 6,
        summary:
          "$x_n$ = מספר מילים באורך $n$ מ-$\\{a,b\\}$ ללא תת-מחרוזת $aaa$ — נוסחת נסיגה ותנאי התחלה",
      },
      {
        id: "14",
        number: 14,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 6,
        summary:
          "$x_n=2x_{n-1}+3x_{n-2}+8$, $x_1=0$, $x_2=20$ — ביטוי מפורש לאיבר הכללי $x_n$",
      },
      {
        id: "15",
        number: 15,
        chapter: "ג",
        type: "proof_short",
        topic: "graph_basic",
        topics: ["degree_sequence"],
        points: 6,
        summary:
          "האם $G$ ו-$G'$ (8 קדקודים, 8 צלעות, מוגדרים במפורש) איזומורפיים? הוכיחו",
      },
      {
        id: "16",
        number: 16,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        topics: ["euler_formula", "graph_basic"],
        points: 6,
        summary:
          "$V$ = כל תת-קבוצות בגודל 3 של $\\{1,\\ldots,6\\}$; צומת $v,w$ קשורים אם $|v\\cap w|=2$ — הוכיחו ש-$G$ אינו מישורי",
      },
      {
        id: "17",
        number: 17,
        chapter: "ג",
        type: "proof_short",
        topic: "euler_path",
        topics: ["bipartite", "matching"],
        points: 6,
        summary:
          "מהי העוצמה המינימלית של פירוק $K_{7,10}$ למסילות כך שכל צלע במסילה אחת בדיוק? הוכיחו",
      },
      {
        id: "18",
        number: 18,
        chapter: "ג",
        type: "proof_short",
        topic: "ramsey",
        points: 6,
        summary:
          "הוכיחו: כל 3-צביעה של צלעות $K_{70}$ מכילה $K_2$ אדום, $K_5$ כחול, או $K_5$ צהוב",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2013 (תשע"ג) — מועד ב'.  Source: merged PDF pp. 90–99 (10.03.13).
  //  מרצים: גורביץ' + ביגון.  18 שאלות × 6 נק'. משך: 3 שעות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2013_ב_I",
    year: 2013,
    moed: "ב",
    semester: "winter",
    date: "10.03.13",
    lecturers: ["פרופ' אלכסנדר גורביץ'", 'ד"ר בנואה ביגון'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        topics: ["set_identities"],
        points: 6,
        summary:
          "האם $((A\\cup B)\\setminus(A\\cap B))\\cap C\\subset A\\cap(B\\cup C)$ לכל קבוצות $A,B,C$? הוכיחו (דיאגרמות) או הפריכו; אם לא — הביאו דוגמה עם $|A\\cup B\\cup C|\\leq 1$",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "cardinality",
        topics: ["countable", "functions"],
        points: 6,
        summary:
          "$S=\\{f:\\mathbb{N}\\to\\{0,1,2\\}\\mid f^{-1}(\\{2\\})$ סופית$\\}$ — האם $S$ בת מניה? הוכיחו",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "relations",
        points: 6,
        summary:
          "$R=\\{(x,y)\\in\\mathbb{Z}^2\\mid y\\leq 2x+1\\}$ — רפלקסיבי? סימטרי? טרנזיטיבי? הוכיחו כל תכונה/הפריכו",
      },
      {
        id: "4",
        number: 4,
        chapter: "א",
        type: "compute",
        topic: "equivalence_relation",
        topics: ["counting_basic"],
        points: 6,
        summary:
          "$A=\\{(x,y)\\in\\mathbb{Z}^2\\mid -2\\leq x,y\\leq 2\\}$, $R$: $x_1y_1=x_2y_2$ — מצאו נציגים ואת מספר האיברים בכל מחלקת שקילות",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        topics: ["inclusion_exclusion"],
        points: 6,
        summary:
          "5 פריטים (גבינה, תפוח, מלפפון, ענבים, לימון) ב-3 מדפי מקרר — לפחות אחד בתחתון, גבינה ולימון לא יחד; כמה אופנים?",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        topics: ["counting_basic"],
        points: 6,
        summary:
          "משולש עם 5 נקודות על כל צלע (לא בקודקודים) — כמה מרובעים (4 נקודות, לא 3 על אותו ישר) אפשר לבחור?",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 6,
        summary:
          "8 ספרים שונים (3 אנגלית, 2 צרפתית, 2 יפנית, 1 סינית) על מדף כך שכל שפה יחד; קצה שמאלי: ביפנית או בסינית",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        points: 6,
        summary:
          "כמה מספרים אי-זוגיים בני 8 ספרות מכילים בדיוק: ספרה 1 פעם, ספרה 2 פעמיים, ספרה 3 פעמיים, ספרה 4 שלוש פעמים?",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["counting_basic"],
        points: 6,
        summary:
          "4 טעמי גלידה (כולל שוקולד), 10 כדורים ללא סדר — כמה אפשרויות עם 2 עד 6 כדורי שוקולד?",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "euler_phi",
        topics: ["inclusion_exclusion"],
        points: 6,
        summary:
          "חשבו $|\\{x\\in\\mathbb{N}\\mid x\\leq 400,\\; \\gcd(x,70)=1\\}|$",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 6,
        summary:
          "$A\\subset\\{1,2,\\ldots,1001\\}$, $|A|=183$ — הוכיחו שיש $x<y<z$ ב-$A$ עם $z-x\\leq 10$",
      },
      {
        id: "12",
        number: 12,
        chapter: "ב",
        type: "proof_short",
        topic: "erdos_szekeres",
        points: 6,
        summary:
          "82 זוגות ממשיים $(x_i,y_i)$ עם כל $x_i$ שונים וכל $y_i$ שונים — הוכיחו שיש $s<t<u<v$ כך שגם $x_{s,t,u,v}$ וגם $y_{s,t,u,v}$ מונוטוניים",
      },
      {
        id: "13",
        number: 13,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 6,
        summary:
          "$x_n$ = מילים באורך $n$ מ-$\\{a,b,c,d\\}$ שאף אחד מ-$ab,ac,ad,ba,bb,bc$ לא מופיע — נוסחת נסיגה ותנאי התחלה",
      },
      {
        id: "14",
        number: 14,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 6,
        summary: "$x_n=5x_{n-1}+7$, $x_1=2$ — ביטוי מפורש לאיבר הכללי $x_n$",
      },
      {
        id: "15",
        number: 15,
        chapter: "ג",
        type: "proof_short",
        topic: "connectivity",
        topics: ["graph_basic", "degree_sequence"],
        points: 6,
        summary: "גרף $G=(V,E)$ עם $|V|=7$, $|E|=16$ — הוכיחו ש-$G$ קשיר",
      },
      {
        id: "16",
        number: 16,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 6,
        summary:
          "עץ שדרגות קודקודיו ≤3, בדיוק 13 עלים — כמה קודקודי דרגה 3 ייתכנו? רשמו כל אפשרות, הדגימו ברטוס והוכיחו",
      },
      {
        id: "17",
        number: 17,
        chapter: "ג",
        type: "compute",
        topic: "euler_formula",
        topics: ["graph_basic"],
        points: 6,
        summary:
          "פאון שכל פאותיו ריבועים או משושים, ובכל קודקוד נפגשות 3 פאות — כמה פאות מרובעות?",
      },
      {
        id: "18",
        number: 18,
        chapter: "ג",
        type: "proof_short",
        topic: "hamilton_path",
        topics: ["bipartite"],
        points: 6,
        summary:
          "$Q_4$ (היפרקוב 4-ממדי) + קודקוד $v$ המחובר ל-$0000$ ו-$1111$ — האם יש מעגל המילטון? הוכיחו",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2014 (תשע"ד) — מועד א'.  Source: merged PDF pp. 101–108 (29.01.14).
  //  מרצים: גורביץ' + לובוצקי (חדש).  13 שאלות × 8 נק'. משך: 2.5 שעות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2014_א_I",
    year: 2014,
    moed: "א",
    semester: "winter",
    date: "29.01.14",
    lecturers: ["פרופ' אלכסנדר גורביץ'", "פרופ' אלכסנדר לובוצקי"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "functions",
        topics: ["sets"],
        points: 8,
        summary:
          "$f:A\\to B$, $C\\subset A$, $D\\subset B$ — האם $C\\cap f^{-1}(D)=f^{-1}(f(C)\\cap D)$ תמיד? הוכיחו או הפריכו",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "injection_surjection",
        topics: ["function_composition"],
        points: 8,
        summary:
          'קיימות $f:A\\to B$, $g:B\\to C$ כך ש-$g$ על אך לא חח"ע, ו-$g\\circ f$ חח"ע אך לא על? הוכיחו/הפריכו + דוגמה',
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "partial_order",
        topics: ["sets", "power_set"],
        points: 8,
        summary:
          "$A=P(\\{1,2,3\\})$, יחס $R$: $(S,T)\\in R$ אם $S\\cup\\{1\\}\\subseteq T$ או $S=T$ — שרטטו דיאגרמת הסה, מצאו מינימליים ומקסימליים",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "permutations",
        topics: ["counting_basic", "inclusion_exclusion"],
        points: 8,
        summary:
          "8 אנשים סביב שולחן עגול: אבי ממול בני, גדי לא סמוך לדודו — כמה סידורים?",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        topics: ["inclusion_exclusion"],
        points: 8,
        summary:
          "8 ילדים בשורה, חולצות: בדיוק 3 אדומות, לפחות 1 צהובה, לפחות 1 כחולה — כמה אופנים?",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        topics: ["fourth_problem"],
        points: 8,
        summary:
          "14 ספרות: עשר 1 וארבע 2, מספר אי-זוגי, לפחות שתי 1 בין כל שתי 2 — כמה מספרים?",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "proof_short",
        topic: "inclusion_exclusion",
        topics: ["binomial", "combinatorial_proof"],
        points: 8,
        summary:
          "הוכיחו לכל $n\\geq 5$: $\\sum_{k=0}^{n-1}(-1)^k\\binom{n}{k}(n-k)^4=0$ (רמז: לבדוק $n=4$)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "euler_phi",
        topics: ["divisibility"],
        points: 8,
        summary:
          "$n,m\\in\\mathbb{N}$, $\\gcd(n,m)=5^{2014}$ — חשבו $\\dfrac{\\Phi(nm)}{\\Phi(n)\\Phi(m)}$",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "$A=\\{1,\\ldots,12\\}$, $B=\\{1,\\ldots,15\\}$, $S\\subset A\\times B$, $|S|=21$ — הוכיחו שיש $(x_1,y_1)\\neq(x_2,y_2)$ ב-$S$ עם $|x_1-x_2|+|y_1-y_2|\\leq 4$",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "$a_n$ = מילים באורך $n$ מ-$\\{A,B,C,D,E,F\\}$ שאף אחד מ-$AB,BC,CD,DE,EF,FA$ לא מופיע — נוסחת נסיגה ותנאי התחלה",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["reflection_principle"],
        points: 8,
        summary:
          "כמה מסלולים באורך 12 מ-$(0,0)$ ל-$(6,6)$ שאינם עוברים מעל $y=x+2$?",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "euler_formula",
        topics: ["graph_basic"],
        points: 8,
        summary:
          "פאון עם 6 מתומנים, שאר פאותיו משולשים, 3 פאות בכל קודקוד — כמה צלעות?",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        topics: ["degree_sequence", "connectivity"],
        points: 8,
        summary:
          "יער: 16 קדקודים, 6 רכיבי קשירות, לכל קודקוד deg≥1 — מהו מספר העלים המינימלי והמקסימלי? הביאו דוגמאות והוכיחו",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2014 (תשע"ד) — מועד ב'.  Source: merged PDF pp. 111–118 (04.04.14).
  //  מרצים: גורביץ' + לובוצקי.  13 שאלות × 8 נק'. משך: 2.5 שעות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2014_ב_I",
    year: 2014,
    moed: "ב",
    semester: "winter",
    date: "04.04.14",
    lecturers: ["פרופ' אלכסנדר גורביץ'", "פרופ' אלכסנדר לובוצקי"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        topics: ["set_identities"],
        points: 8,
        summary:
          "האם $(A\\times B)\\setminus(C\\times(B\\setminus D))\\subset A\\times(B\\cap D)$ תמיד? הוכיחו או הפריכו + דוגמה",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "injection_surjection",
        topics: ["function_composition"],
        points: 8,
        summary:
          "$f:A\\to B$, $g:B\\to A$, $h:A\\to B$, $l:B\\to A$ עם $l\\circ h=g\\circ f=id_A$ — האם בהכרח $l\\circ f=id_A$? הוכיחו/הפריכו",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "relations",
        topics: ["partial_order"],
        points: 8,
        summary:
          "$R$ סדר חלקי, $S$ סימטרי, $R\\subseteq S$ — האם $S$ חייב להיות טרנזיטיבי? הוכיחו/הפריכו",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 8,
        summary:
          "מספרים בני 5 ספרות שונות מ-$\\{0,...,6\\}$, מתחלקים ב-5, מכילים את 5, הספרה השמאלית ≠ 0 — כמה?",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        points: 8,
        summary:
          "4 כדורים אדומים, 4 כחולים, 3 צהובים בשורה: הקצה הימני, האמצע (מקום 6) והשמאלי בצבעים שונים — כמה?",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["inclusion_exclusion"],
        points: 8,
        summary:
          "15 כדורים זהים ל-4 מגרות מסודרות: כל מגרה ≥2, מגרה עליונה ≤5, מגרה תחתונה ≤5 — כמה אופנים?",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "proof_short",
        topic: "combinatorial_proof",
        topics: ["binomial"],
        points: 8,
        summary:
          "הוכיחו לכל $n\\geq 3$: $1\\cdot2\\binom{n}{2}-2\\cdot3\\binom{n}{3}+3\\cdot4\\binom{n}{4}-\\ldots+(-1)^n(n-1)n\\binom{n}{n}=0$",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "proof_short",
        topic: "inclusion_exclusion",
        topics: ["combinatorial_proof"],
        points: 8,
        summary:
          "הוכיחו כי $7^n-\\binom{7}{1}6^n+\\binom{7}{2}5^n-\\binom{7}{3}4^n+\\binom{7}{4}3^n-\\binom{7}{5}2^n+\\binom{7}{6}1^n$ מתחלק ב-$7!$ לכל $n\\in\\mathbb{N}$",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "לוח $9\\times 8$ פחות 4 פינות (68 משבצות), הפרש שכנים ≤5 — הוכיחו שיש לפחות 5 מספרים שמופיעים בשתי משבצות לפחות",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "$a_n$ = מספרים בני $n$ ספרות מ-$\\{1,2,3\\}$ כך שמכפלת כל שלוש ספרות סמוכות זוגית ($a_1=3, a_2=9, a_3=19$) — נוסחת נסיגה ותנאי התחלה",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "proof_short",
        topic: "induction",
        points: 8,
        summary:
          "$a_1=1$, $a_n=\\frac{1}{20}a_{n-1}^2+\\frac{1}{5}a_{n-1}+3$ — הוכיחו שקיים $A$ כך ש-$a_n<A$ לכל $n$",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        topics: ["euler_formula"],
        points: 8,
        summary:
          "גרף סריג $3\\times 3\\times 3$: $V=\\{1,2,3\\}^3$, צלעות בין קודקודים הנבדלים בקואורדינטה אחת ב-1 — האם מישורי?",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        topics: ["degree_sequence"],
        points: 8,
        summary:
          "יער: $|E|=11$, $1\\leq\\deg(v)\\leq 3$, בדיוק 10 עלים — מהם המינימום והמקסימום של רכיבי קשירות? הביאו דוגמאות והוכיחו",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2015 (תשע"ה) — מועד א'.  Source: merged PDF pp. 119–? (01.02.15).
  //  מרצים: גורביץ' + נבו (מרצה חדש).  13 שאלות × 8 נק'. משך: 2.5 שעות.
  //  verified: false — Q12–Q13 טרם נקראו.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2015_א_I",
    year: 2015,
    moed: "א",
    semester: "winter",
    date: "01.02.15",
    lecturers: ["פרופ' אלכסנדר גורביץ'", "פרופ' עמנואל נבו"],
    duration_hours: 2.5,
    total_points: 100,
    verified: false,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "propositional_logic",
        points: 8,
        summary:
          "נתונה טבלת אמת של $f(A_1,A_2,A_3)$ ($f=1$ כאשר $\\neg A_3\\land(A_1\\lor A_2)$) — בנו דיאגרמת החלטה בינארית (BDD) לפי סדר $A_1,A_2,A_3$",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        topics: ["set_identities"],
        points: 8,
        summary:
          "האם $C\\cap(A\\cup B)\\subseteq(A\\cup(B\\cap C))\\setminus(A\\cap B)$ תמיד? הוכיחו או הפריכו (עם $|A\\cup B\\cup C|\\leq 1$)",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "equivalence_relation",
        topics: ["counting_basic"],
        points: 8,
        summary:
          "$A=\\{0,1\\}^4$, $R$: $(a_1,a_2,a_3,a_4)R(b_1,b_2,b_3,b_4)$ אם $\\sum a_i=\\sum b_i$ — מצאו נציגים ומספר האיברים בכל מחלקה",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        topics: ["inclusion_exclusion"],
        points: 8,
        summary:
          "מספרים בני 6 ספרות מ-$\\{1,2,3,4\\}$, ספרה 1 מופיעה בדיוק פעם אחת, ספרת המאות ≠ ספרת העשרות — כמה?",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        points: 8,
        summary:
          "2R, 2Y, 2B, 2G (כדורים זהים בצבע) בשורה: הכדורים בשני הקצוות בצבע זהה — כמה?",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "proof_short",
        topic: "induction",
        topics: ["recurrence"],
        points: 8,
        summary:
          "$a_n=a_{n-1}+a_{n-3}$, $a_1=1,a_2=2,a_3=3$ — הוכיחו שכל מספר טבעי ניתן להצגה כסכום של איברים שונים של הסדרה",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "$a_n=-a_{n-1}+6a_{n-2}-8$, $a_1=7,a_2=27$ — ביטוי מפורש לאיבר הכללי",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["inclusion_exclusion"],
        points: 8,
        summary:
          "פתרונות שלמים אי-שליליים ל-$x_1+x_2+x_3+x_4+x_5=11$ עם $x_i\\leq 4$",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "erdos_szekeres",
        topics: ["pigeonhole"],
        points: 8,
        summary:
          "המספרים 1–34 על מעגל — הוכיחו שניתן לחתוך ב-3 מקומות כך שהסדרה תכיל תת-סדרה עולה באורך 6 או יורדת באורך 10",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        topics: ["graph_basic"],
        points: 8,
        summary:
          "$G=(V,E)$: $V=\\{1,2,3\\}^2$, $\\{(a_1,a_2),(b_1,b_2)\\}\\in E\\Leftrightarrow a_2\\neq b_2$ (=$K_{3,3,3}$) — האם $G$ מישורי?",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "proof_short",
        topic: "hamilton_path",
        topics: ["bipartite"],
        points: 8,
        summary:
          "$Q_4$ + קודקוד $v\\notin V$ המחובר ל-$0000$ ו-$0001$ — האם קיים מעגל המילטון בגרף המתקבל?",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "proof_short",
        topic: "euler_path",
        topics: ["counting_basic"],
        points: 8,
        summary:
          "סדרו 9 מספרים מ-$\\{1,2,3\\}$ על מעגל כך שכל אחד מ-9 הזוגות הסדורים ב-$\\{1,2,3\\}^2$ מופיע כרצף רציף (= רצף דה-ברוין $B(3,2)$) — הוכיחו שסידור כזה קיים והדגימו",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["prufer_sequence"],
        points: 8,
        summary:
          "כמה עצים מתויגים על $V=\\{v_1,...,v_6\\}$ יש להם לפחות שלושה עלים? ($6^4 - 6!/2 = 1296-360=936$)",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // ════════════════════════════════════════════════════════════════
  //  2015 (תשע"ה) — מועד ב'.  Source: merged PDF pp. 130–138 (24.03.15).
  //  מרצים: גורביץ' + נבו.  13 שאלות × 8 נק'. משך: 2.5 שעות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2015_ב_I",
    year: 2015,
    moed: "ב",
    semester: "winter",
    date: "24.03.15",
    lecturers: ["פרופ' אלכסנדר גורביץ'", "פרופ' עמנואל נבו"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "propositional_logic",
        points: 8,
        summary:
          "נתונה טבלת אמת של $f(P,Q,R)$ — הגדירו את $f$ בצורה נורמלית קוניונקטיבית (CNF)",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        topics: ["set_identities"],
        points: 8,
        summary:
          "האם $(A\\times(D\\setminus B))\\cup(C\\times D)\\subseteq((A\\cup C)\\times(B\\cup D))\\setminus(A\\times B)$ תמיד? הוכיחו או הפריכו",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "partial_order",
        topics: ["divisibility"],
        points: 8,
        summary:
          "$A=\\{2,3,5,6,7,8,15,16,30\\}$, $R$: $(a,b)\\in R$ אם $b\\mid a$ — שרטטו דיאגרמת הסה, מצאו מינימליים ומקסימליים",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 8,
        summary:
          "לוח $3\\times 7$: סמנו 6 משבצות כך שבכל שורה בדיוק 2 מסומנות ובכל עמודה לכל היותר 1 — כמה אופנים? ($\\binom{7}{2}\\binom{5}{2}\\binom{3}{2}=630$)",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["inclusion_exclusion"],
        points: 8,
        summary:
          "17 כדורים זהים ל-5 מגרות מסודרות: עליונה=3, אמצעית≥4, תחתונה≤5 — כמה אופנים? ($\\binom{13}{3}-\\binom{7}{3}=251$)",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "$x_n$ = מילים באורך $n$ מ-$\\{A,B,C\\}$ שאינן מכילות $AB, AC, BB$ — נוסחת נסיגה ($x_n=3x_{n-1}-2x_{n-2}-x_{n-3}+x_{n-4}$, $x_1=3,x_2=6,x_3=11,x_4=19$)",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "functions",
        topics: ["inclusion_exclusion", "counting_basic"],
        points: 8,
        summary:
          "$|A|=5$, $B=\\{1,2,3,4\\}$ — כמה פונקציות $f:A\\to B$ שתחום הערכים שלהן כלול ב-$\\{i,i+1\\}$ לאיזשהו $i\\in\\{1,2,3\\}$? (הכלה-הדחה: $3\\cdot2^5-2\\cdot1^5=94$)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "$S\\subseteq\\{7,...,36\\}$, $|S|=8$ — הוכיחו שיש שתי תת-קבוצות שונות לא-ריקות של $S$ בעלות סכום שווה (שובך: $2^8{-}1=255>260{-}7=253$)",
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "graph_basic",
        topics: ["connectivity", "degree_sequence"],
        points: 8,
        summary:
          "$V=\\{1,...,90\\}$, $G_1$: $|a{-}b|=10$ או $80$; $G_2$: $|a{-}b|=9$ או $81$ — האם איזומורפיים? (לא: $G_1$=10 מעגלי-9, $G_2$=9 מעגלי-10)",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        topics: ["graph_basic"],
        points: 8,
        summary:
          "האם ניתן לחלק את קבוצת הצלעות של $K_7$ לתת-קבוצות כך שכל אחת היא קבוצת הצלעות של עץ פורש? (לא: $21/6\\notin\\mathbb{N}$)",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "compute",
        topic: "euler_formula",
        points: 8,
        summary:
          "ספירה פוליהדרלית: פאות משולשים ומחומשים, כל קדקוד 4 פאות, אין שתי פאות מאותו סוג עם צלע משותפת — כמה קדקודים? ($V=30$, איקוסידודקהדרון)",
      },
      {
        id: "12",
        number: 12,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["reflection_principle"],
        points: 8,
        summary:
          "מסלולים באורך 14 מ-$(0,0)$ ל-$(7,7)$ שאינם עולים מעל $y=x+1$ ואינם יורדים מתחת ל-$y=x-3$ — כמה? (DP: 1094)",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["prufer_sequence"],
        points: 8,
        summary:
          "כמה עצים מתויגים על $V=\\{v_1,...,v_8\\}$ עם $\\deg v_1=1$, $\\deg v_2=3$, $\\deg v_3=4$? (פרופר: $5\\cdot\\frac{6!}{2!\\,3!\\,1!}=300$)",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2016 (תשע"ו) — מועד א'.  Source: merged PDF pp. 140–? (24.01.16).
  //  מרצים: גורביץ' + נבו.  13 שאלות × 8 נק'. משך: 2.5 שעות.
  //  verified: false — Q5–Q13 טרם נקראו.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2016_א_I",
    year: 2016,
    moed: "א",
    semester: "winter",
    date: "24.01.16",
    lecturers: ["פרופ' אלכסנדר גורביץ'", "פרופ' עמנואל נבו"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        topics: ["set_identities"],
        points: 8,
        summary:
          "האם $(C\\times D)\\setminus(A\\times(D\\setminus B))\\subset(A\\times D)\\cup(C\\times(D\\setminus B))$ לכל $A,B,C,D$? הוכיחו או הפריכו",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "relations",
        points: 8,
        summary:
          "$R=\\{(x,y)\\in\\mathbb{N}^2\\mid y^2\\mid 2x\\}$ — האם רפלקסיבי, סימטרי, אנטי-סימטרי, טרנזיטיבי? הוכיחו/הפריכו",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "equivalence_relation",
        topics: ["power_set"],
        points: 8,
        summary:
          '$A=P(\\{0,1,2,3\\})$, $R$: $(S,T)\\in R$ אם $S\\setminus\\{0,1\\}=T\\setminus\\{0,1\\}$ — מצאו נציגים ומספר האיברים בכל מחלקה (4 מחלקות, כ"א בגודל 4)',
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        topics: ["permutations_combinations"],
        points: 8,
        summary:
          "6 פירות שונים ל-5 מדפים: עליון בדיוק 1, אמצעי (מדף 3) בדיוק 1, שאר מדפים — כל מספר ($6\\cdot5\\cdot3^4=2430$)",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        points: 8,
        summary:
          "סידור 12 כדורים לבנים + 4 שחורים בשורה: בין כל שניים שחורים רצופים לפחות 2 לבנים, ושני הקצוות בצבעים שונים — ספרו את כל הסידורים האפשריים",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary: "$a_n=4a_{n-2}+9$, $a_1=1$, $a_2=13$ — מצאו נוסחה מפורשת",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["reflection_principle"],
        points: 8,
        summary:
          "סדרות בינאריות $(a_1,\\ldots,a_{12})$ עם $\\sum a_k=7$ ו-$\\sum_{k=1}^m a_k\\geq m/2$ לכל $m$ — ספרו את כל הסדרות",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "euler_phi",
        points: 8,
        summary:
          "$|\\{x\\in\\mathbb{N}\\mid x\\leq1000,\\,\\gcd(x,42)=1\\}|$ — פונקציית אוילר φ, תשובה: 286",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "הוכיחו שקיים $n\\in\\mathbb{N}$ כך ש-$1+2+\\cdots+2^n=2^{n+1}-1$ מתחלק ב-101 (שובך יונים על שאריות mod 101)",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        points: 8,
        summary:
          "$Q_3$ + הצלע $\\{000,111\\}$ — האם הגרף המתקבל מישורי? הוכיחו",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "proof_short",
        topic: "euler_path",
        topics: ["hamilton_path"],
        points: 8,
        summary:
          "אוקטאהדרון: האם יש מעגל אוילר? האם יש מעגל המילטון? הוכיחו (שניהם: כן)",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 8,
        summary:
          "עצים ממוספרים על 8 קודקודים עם בדיוק 4 עלים — ספרו ($\\binom{8}{4}\\cdot\\sum_{k=0}^{4}(-1)^k\\binom{4}{k}(4-k)^6=70\\cdot1560=109200$)",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "proof_short",
        topic: "halls_theorem",
        topics: ["matching"],
        points: 8,
        summary:
          'הוכיחו שקיימת פונקציה חח"ע $f:A\\to B$ ($A$=תת-קבוצות בגודל 3, $B$=תת-קבוצות בגודל 7 של $\\{1,\\ldots,10\\}$) כך ש-$|f(S)\\cap S|=2$ לכל $S\\in A$',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2016 (תשע"ו) — מועד ב'.  Source: merged PDF (14.04.16).
  //  מרצים: גורביץ' + נבו.  13 שאלות × 8 נק'. משך: 2.5 שעות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2016_ב_I",
    year: 2016,
    moed: "ב",
    semester: "spring",
    date: "14.04.16",
    lecturers: ["פרופ' אלכסנדר גורביץ'", "פרופ' עמנואל נבו"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        points: 8,
        summary:
          "הוכיחו ש-$A\\setminus B\\subset A\\cap((B\\setminus C)\\cup(C\\setminus B))$ לכל $A,B,C$",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "compute",
        topic: "propositional_logic",
        points: 8,
        summary: "מצאו CNF לפונקציה $f(P,Q,R)=P\\to\\neg(Q\\to R)$",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "partial_order",
        points: 8,
        summary:
          "יחס $R$ על $\\{1,2,3,4,6,8,12,16\\}$: $(a,b)\\in R$ אם $b\\mid 4a$ או $a=b$ — ציירו את דיאגרמת האסה וזהו איברים מינימליים/מקסימליים",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 8,
        summary:
          "רשת $4\\times6$: בדיוק תא אחד מסומן בכל עמודה, לכל היותר תא אחד בשורה התחתונה — ספרו",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        points: 8,
        summary:
          "$x_1+\\cdots+x_7=30$, $x_i\\geq i$ — החליפו $y_i=x_i-i$: $\\sum y_i=2$, תשובה: $\\binom{8}{6}=28$",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "proof_short",
        topic: "induction",
        points: 8,
        summary: "הוכיחו באינדוקציה: $8+3n+7^n\\equiv0\\pmod{9}$ לכל $n\\geq1$",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "מילים מ-$\\{A,B,C,D\\}$ שאינן מכילות את $AB,AC,AD,BA,BB$ — כתבו נוסחת נסיגה וסופרו מילים באורך $n$",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        topics: ["injection_surjection"],
        points: 8,
        summary:
          "הזרקות $f:\\{a,b,c,d\\}\\to\\{1,\\ldots,8\\}$ עם $f(a)\\notin\\{1,2,3\\}$, $f(b)\\neq1$, $f(c)\\neq1$ — ספרו בהכלה-הדחה",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "$S\\subset\\{1,\\ldots,8\\}^2$, $|S|=17$ — הוכיחו שקיימות שתי נקודות ב-$S$ במרחק צ'בישב $\\leq1$ (שובך: 16 תאי $2\\times2$)",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "compute",
        topic: "graph_basic",
        points: 8,
        summary:
          "גרף שקודקודיו כל תת-הקבוצות בגודל 4 של $\\{1,\\ldots,10\\}$, צלע כאשר $|v\\cap w|=1$ — ספרו צלעות (8400)",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "proof_short",
        topic: "euler_path",
        topics: ["hamilton_path"],
        points: 8,
        summary:
          "$Q_4\\setminus\\{0000,1111\\}$ — האם יש מסלול אוילר? האם יש מסלול המילטון? הוכיחו",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 8,
        summary:
          "עצים ממוספרים על 7 קודקודים שבהם כל קודקוד בדרגה $\\leq5$ — ספרו ($7^5-7=16800$)",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "proof_short",
        topic: "ramsey",
        points: 8,
        summary:
          "2-צביעת צלעות $K_{10}$ ללא $K_3$ אדום וללא $K_5$ כחול — הוכיחו שלא קיימת (רמזי)",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2017 (תשע"ז) — מועד א'.  Source: merged PDF (10.02.17).
  //  מרצים: גורביץ' + נבו.  13 שאלות × 8 נק'. משך: 2.5 שעות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2017_א_I",
    year: 2017,
    moed: "א",
    semester: "winter",
    date: "10.02.17",
    lecturers: ["פרופ' אלכסנדר גורביץ'", "פרופ' עמנואל נבו"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "propositional_logic",
        points: 8,
        summary:
          "נתונות BDD עבור $f(P,Q,R)$ ו-$g(P,Q)$; בנו BDD עבור: א) $k(P,Q,R,S)=g(f(P,Q,R),S)$; ב) $l(P,Q,R,S)=f(P,Q,g(R,S))$",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "counterexample",
        topic: "functions",
        points: 8,
        summary:
          "האם בהכרח $f(C)\\cup D=f(C\\cup f^{-1}(D))$ לכל $f:A\\to B$, $C\\subseteq A$, $D\\subseteq B$? הוכיחו או הפריכו",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "relations",
        points: 8,
        summary:
          "$R=\\{((x_1,x_2),(y_1,y_2))\\mid x_1=y_1$ או $x_2<y_2\\}$ על $\\mathbb{N}^2$ — האם רפלקסיבי, סימטרי, אנטי-סימטרי, טרנזיטיבי? הוכיחו/הפריכו",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 8,
        summary:
          "מלפון, ענבניה, תפוח ואגס ל-5 מדפים מסודרים: המלפון יהיה במדף גבוה יותר מהענבניה (ללא הגבלה על מספר פירות במדף) — ספרו",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["inclusion_exclusion"],
        points: 8,
        summary:
          "18 כדורים זהים ל-6 מגרות מסודרות: כל מגרה לפחות 2, המגרה העליונה לכל היותר 6 — ספרו",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "$a_n=5a_{n-1}-4a_{n-2}+3$, $a_1=7$, $a_2=30$: א) בדקו פתרון פרטיקולרי; ב) מצאו נוסחה מפורשת ($a_n=2\\cdot4^n-n$)",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["catalan", "reflection_principle"],
        points: 8,
        summary:
          "מסלולים באורך 14 מ-$(0,0)$ ל-$(7,7)$ דרך $(4,4)$, מתחת ל-$y=x$ (כולל), ללא מעבר ב-$(1,1),(2,2),(3,3)$",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 8,
        summary:
          "פונקציות $f:A\\to\\{4,...,10\\}$ ($|A|=3$) עם $\\exists k:f(k)\\mid2$, $\\exists l:f(l)\\mid3$, $\\exists m:f(m)\\mid5$ — ספרו בהכלה-הדחה",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "erdos_szekeres",
        points: 8,
        summary:
          "257 שלישיות ממשיות עם כל הקואורדינטות שונות — הוכיחו שקיימות $u<v<w$ כך ששלשת ה-$x$, ה-$y$ וה-$z$ מונוטוניות (ארדש-סקרש בשלושה ממדים)",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "proof_short",
        topic: "trees",
        topics: ["matching"],
        points: 8,
        summary:
          "$V$ = תת-קבוצות גודל 4 של $\\{1,...,7\\}$, צלע כאשר $|v\\cap w|=2$ — האם קבוצת הצלעות מתפצלת לעצים פורשים?",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        points: 8,
        summary:
          "$Q_4$ ללא הצלעות $\\{0010,0011\\},\\{0110,0111\\},\\{1010,1011\\},\\{1110,1111\\}$ — האם הגרף המתקבל מישורי?",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "proof_short",
        topic: "euler_path",
        topics: ["hamilton_path"],
        points: 8,
        summary:
          "אם צלעות $G$ מתפצלות למעגלי המילטון — האם $G$ בהכרח בעל מעגל אוילר? הוכיחו או הפריכו",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 8,
        summary:
          "עצים ממוספרים על $\\{v_1,...,v_8\\}$ עם לפחות שני קודקודים מדרגה 3 — ספרו",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2017 (תשע"ז) — מועד ב'.  Source: merged PDF (31.03.17).
  //  מרצים: גורביץ' + נבו.  13 שאלות × 8 נק'. משך: 2.5 שעות.
  //  verified: false — Q12–Q13 טרם נקראו.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2017_ב_I",
    year: 2017,
    moed: "ב",
    semester: "spring",
    date: "31.03.17",
    lecturers: ["פרופ' אלכסנדר גורביץ'", "פרופ' עמנואל נבו"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "propositional_logic",
        points: 8,
        summary:
          "$f(P,Q,R)=(P\\to Q)\\land R$: א) בנו טבלת אמת; ב) בנו BDD עבור $f$",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "functions",
        topics: ["injection_surjection"],
        points: 8,
        summary:
          '$f:A\\to B$ חח"ע, $D_1,D_2\\subseteq B$: האם $f^{-1}(D_1)\\subset f^{-1}(D_2)\\Rightarrow D_1\\subset D_2$? הוכיחו או הפריכו',
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "counterexample",
        topic: "relations",
        topics: ["functions"],
        points: 8,
        summary:
          '$R_f=\\{(x,y)\\mid y=f(x)\\}$: האם $R_f$ אנטי-סימטרי $\\Rightarrow$ $f$ חח"ע או $\\exists x:f(x)=x$? הוכיחו או הפריכו',
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 8,
        summary: "כמה מספרים זוגיים בעלי 4 ספרות שונות מכילים את הספרה 2?",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        points: 8,
        summary:
          "סידור 3R+3B+2G+2Y כדורים בשורה כך שכדורי שני הקצוות בצבעים שונים (כדורים בצבע זהה — זהים)",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "מילים מ-$\\{A,B,C,D\\}$ ללא $AA,BB,CC,DD,AB,BC,CD,DA$: א) מצאו נסיגה ותנאי התחלה; ב) מצאו נוסחה מפורשת",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["catalan", "reflection_principle"],
        points: 8,
        summary:
          "מסלולים באורך 16 מ-$(0,0)$ ל-$(8,8)$ דרך $(4,4)$, מתחת ל-$y=x$ (כולל), ללא מעבר ב-$(1,1),(2,2),(3,3)$",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        topics: ["fourth_problem"],
        points: 8,
        summary:
          "$x_1+\\cdots+x_6=15$, $0\\leq x_i\\leq5$ לכל $i$ — ספרו פתרונות שלמים אי-שליליים (הכלה-הדחה)",
      },
      {
        id: "9",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "$S\\subset\\{1,...,10\\}\\times\\{1,...,12\\}$, $|S|=61$ — הוכיחו שקיימות שלוש נקודות ב-$S$ המקיימות $x_1=x_2$, $|y_1-y_2|=1$, $|x_2-x_3|=1$, $y_2=y_3$",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["connectivity"],
        points: 8,
        summary:
          "יער עם 11 צלעות, דרגות 1/2/3, בדיוק 10 עלים — מצאו מינימום ומקסימום של רכיבי קשירות (עם דוגמאות)",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "compute",
        topic: "euler_formula",
        points: 8,
        summary:
          "פוליהדרון קמור עם 60 קודקודים, 3 פאות בכל קודקוד, פאות משולשות ומעושרות — מצאו את מספר הפאות המשולשות",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "counterexample",
        topic: "hamilton_path",
        points: 8,
        summary:
          "$G=(V,E)$ בעל מעגל המילטון ו-$u,w\\in V$; $G'$ מתקבל בהוספת קודקוד $v\\notin V$ עם $E'=E\\cup\\{\\{v,u\\},\\{v,w\\}\\}$ — האם $G'$ בהכרח בעל מעגל המילטון? הוכיחו או הפריכו",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 8,
        summary:
          "עצים ממוספרים על $\\{v_1,...,v_8\\}$ כך ש-$\\deg v_1=4$ — ספרו (6860)",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2018 (תשע"ח) — מועד א'.  Source: merged PDF (22.02.18).
  //  מרצים: גורביץ' + ביגון.  15 שאלות (10 פתוחות × 8נק + 5 MC × 5נק). 3 שעות.
  //  שאלות פתוחות: 1,3,4,6,7,9,10,12,13,15 | MC: 2,5,8,11,14
  // ════════════════════════════════════════════════════════════════
  {
    code: "2018_א_I",
    year: 2018,
    moed: "א",
    semester: "winter",
    date: "22.02.18",
    lecturers: ["פרופ' אלכסנדר גורביץ'", 'ד"ר בנואה ביגון'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "injection_surjection",
        points: 8,
        summary:
          'האם קיימות $A,B,C$ ופונקציות $f:A\\to B$ חח"ע (לא על), $g:B\\to C$ כך ש-$g\\circ f$ על אך לא חח"ע? הוכיחו או הפריכו',
      },
      {
        id: "2",
        number: 2,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 5,
        summary:
          "[MC] מספרים בני 6 ספרות מ-$\\{1,2,3,4\\}$ כך שסכום כל שתי ספרות סמוכות אי-זוגי — כמה? (128)",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "cardinality",
        points: 8,
        summary:
          "$A=\\{f\\in\\{0,1,2\\}^{\\mathbb{N}}\\mid f^{-1}(\\{1\\}),f^{-1}(\\{2\\})$ סופיות$\\}$ — האם $A$ בת-מנייה? הוכיחו",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "30 מספרים שלמים שונים ב-$[1,110]$ — הוכיחו שניתן לבחור שלושה זוגות שונים בעלי אותו סכום (שובך יונים)",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 5,
        summary:
          "[MC] 6 קורסים מ-15 (6 מתמטיקה + 6 מחשבים + 3 פיזיקה) עם לפחות אחד מכל מקצוע — כמה דרכים? (3915)",
      },
      {
        id: "6",
        number: 6,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        points: 8,
        summary:
          "האם לכל $A,B,C$ בהכרח אחת מ: $(A\\cup B)\\setminus C\\subset A\\setminus(B\\cap C)$ או $A\\setminus(B\\cap C)\\subset(A\\cup B)\\setminus C$? הוכיחו או הפריכו (עם דיאגרמות ון)",
      },
      {
        id: "7",
        number: 7,
        chapter: "א",
        type: "compute",
        topic: "partial_order",
        points: 8,
        summary:
          "סדר לקסיקוגרפי $R$ על $A=\\{0,1\\}^3$ — שרטטו דיאגרמת חסה ומצאו את האיברים המינימליים והמקסימליים",
      },
      {
        id: "8",
        number: 8,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary:
          "[MC] עצים על $\\{v_1,...,v_8\\}$: $\\deg v_1=\\deg v_2=\\deg v_3=1$, $\\deg v_i>1$ לכל $4\\leq i\\leq8$ — כמה? (1800)",
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "euler_path",
        points: 8,
        summary:
          "$S$ סופית ולא ריקה, $V=P(S)$, $\\{v,w\\}\\in E\\Leftrightarrow v\\cap w=\\emptyset$ — האם קיים ב-$G$ מעגל אוילר? מסלול אוילר?",
      },
      {
        id: "10",
        number: 10,
        chapter: "ג",
        type: "counterexample",
        topic: "graph_basic",
        points: 8,
        summary:
          "$G=(V,E)$: $10|\\deg v$ לכל $v\\in V$ — האם בהכרח $10||E|$? הוכיחו או הפריכו (נגדית: $K_{11}$, $|E|=55$)",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        points: 5,
        summary:
          "[MC] 13 כדורים זהים ל-5 מגרות מסודרות, כל מגרה מספר אי-זוגי — כמה? (70)",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "compute",
        topic: "euler_formula",
        points: 8,
        summary:
          "פוליהדרון קמור: 6 פאות שישיות + שאר משולשות, 3 פאות בכל קודקוד — מצאו מספר קודקודים (16)",
      },
      {
        id: "13",
        number: 13,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "$a_n$ = מספרים בני $n$ ספרות מ-$\\{1,2,3,4\\}$ כך שמכפלת כל שתי ספרות סמוכות זוגית — נסיגה ותנאי התחלה ($a_n=2a_{n-1}+4a_{n-2}$)",
      },
      {
        id: "14",
        number: 14,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["catalan"],
        points: 5,
        summary:
          "[MC] סדרות $\\pm1$ באורך 12, סכום=2, כל סכום חלקי $\\geq-1$ — כמה? (572)",
      },
      {
        id: "15",
        number: 15,
        chapter: "ג",
        type: "proof_short",
        topic: "matching",
        points: 8,
        summary:
          "$G'=(V,E\\setminus I)$ כאשר $I$ = 5 צלעות ספציפיות של $Q_4$ (3 מ-1000, 2 מ-0001) — האם קיים זיווג מושלם?",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2018 (תשע"ח) — מועד ב'.  Source: merged PDF (15.03.18).
  //  מרצים: גורביץ' + ביגון.  15 שאלות (10 פתוחות × 8נק + 5 MC × 5נק). 3 שעות.
  //  שאלות פתוחות: 1,3,5,6,8,9,11,12,13,15 | MC: 2,4,7,10,14
  //  verified: false — Q7–Q15 טרם נקראו.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2018_ב_I",
    year: 2018,
    moed: "ב",
    semester: "spring",
    date: "15.03.18",
    lecturers: ["פרופ' אלכסנדר גורביץ'", 'ד"ר בנואה ביגון'],
    duration_hours: 3,
    total_points: 100,
    verified: false,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "induction",
        points: 8,
        summary:
          "הוכיחו באינדוקציה שלכל $n\\geq1$ מתקיים $3n+4<2^{n+2}$ (תזכורת: 0 אינו מספר טבעי)",
      },
      {
        id: "2",
        number: 2,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 5,
        summary:
          "[MC] ריבוע עם 4 נקודות על כל צלע (לא בקודקוד) — כמה משולשים עם קודקודים בנקודות המסומנות? (544)",
      },
      {
        id: "3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "matching",
        points: 8,
        summary:
          "$Q_4$ ללא צלעות מעגל המילטון $(v_0,v_1,...,v_{15},v_0)$: $I=\\{\\{v_0,v_1\\},...,\\{v_{15},v_0\\}\\}$ — האם ב-$G'=(V,E\\setminus I)$ קיים זיווג מושלם?",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "injection_surjection",
        points: 5,
        summary:
          "[MC] פונקציות על $f:A\\to B$ ($|A|=6,|B|=4$) עם $f(a)=b$ לאיברים נתונים — כמה? (390)",
      },
      {
        id: "5",
        number: 5,
        chapter: "א",
        type: "proof_short",
        topic: "relations",
        topics: ["functions"],
        points: 8,
        summary:
          "$f:A\\to A$ על, $f\\circ f\\circ f=f$, $R_f=\\{(x,y)\\mid y=f(x)\\}$: האם $R_f$ בהכרח סימטרי? טרנזיטיבי? הוכיחו/הפריכו",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "proof_short",
        topic: "combinatorial_proof",
        points: 8,
        summary:
          "הוכיחו כי $\\binom{3n}{n}=\\sum_{k=0}^{n}\\binom{2n}{k}\\binom{n}{k}$ לכל $n$ טבעי",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["catalan"],
        points: 5,
        summary:
          "[MC] מסלולים באורך 16 מ-$(0,0)$ ל-$(8,8)$ דרך $(3,6)$, מתחת ל-$y=x+3$ — כמה?",
      },
      {
        id: "8",
        number: 8,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        points: 8,
        summary:
          "האם $(A\\times C)\\cup((A\\setminus B)\\times D)\\subset((A\\setminus B)\\times(C\\cup D))\\cup(B\\times D)$ מתקיים לכל $A,B,C,D$? הוכיחו (דיאגרמות ון) או הפריכו",
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "hamilton_path",
        points: 8,
        summary:
          "$G$ בעל מעגל המילטון ו-$u,w\\in V$; $G'=G+v$ ($v$ מחובר ל-$u$ ול-$w$) — האם $G'$ בהכרח בעל **מסלול** המילטון? הוכיחו",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        topics: ["fourth_problem"],
        points: 5,
        summary:
          "[MC] $x_1+\\cdots+x_5=30$, $0\\leq x_i\\leq7$ — כמה פתרונות שלמים אי-שליליים? (126)",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        points: 8,
        summary:
          "$G=(V,E)$: $V=\\{1,...,8\\}$, $E=\\{\\{u,v\\}\\mid u>4, v<5, u-v<6\\}$ — האם $G$ מישורי? (בדיקה: $|E|=13>2|V|-4=12$)",
      },
      {
        id: "12",
        number: 12,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "$A=\\{1,3,5,...,155\\}$, $S\\subset A$, $|S|=22$ — הוכיחו שניתן לבחור 4 זוגות שונים מ-$S$ כך שארבעת ההפרשים (בערך מוחלט) שווים",
      },
      {
        id: "13",
        number: 13,
        chapter: "א",
        type: "proof_short",
        topic: "cardinality",
        points: 8,
        summary:
          "בנו פונקציה חד-חד-ערכית ועל מ-$\\{0,1,2\\}^{\\mathbb{N}}$ ל-$\\{0,1,2,3,4,5,6,7,8\\}^{\\mathbb{N}}$",
      },
      {
        id: "14",
        number: 14,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary:
          "[MC] עצים על $\\{v_1,...,v_7\\}$: $\\deg v_1=1$, $\\deg v_i<6$ לכל $2\\leq i\\leq7$ — כמה? (7770)",
      },
      {
        id: "15",
        number: 15,
        chapter: "ג",
        type: "counterexample",
        topic: "connectivity",
        points: 8,
        summary:
          "$G=(V,E)$: $|V|=16$, $\\deg v\\geq7$ לכל $v$ — האם $G$ בהכרח קשיר? הוכיחו או הפריכו (נגדית: $K_8\\cup K_8$)",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2019 (תשע"ט) — מועד א'.  Source: merged PDF (14.02.19).
  //  מרצים: גורביץ' + ביגון.  15 שאלות (10 פתוחות × 8נק + 5 MC × 5נק). 3 שעות.
  //  שאלות פתוחות: 2,3,5,6,8,9,11,12,14,15 | MC: 1,4,7,10,13
  // ════════════════════════════════════════════════════════════════
  {
    code: "2019_א_I",
    year: 2019,
    moed: "א",
    semester: "winter",
    date: "14.02.19",
    lecturers: ["פרופ' אלכסנדר גורביץ'", 'ד"ר בנואה ביגון'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 5,
        summary:
          "[MC] מספרים תלת-ספרתיים מ-$\\{1,...,7\\}$ (חזרות מותרות) כך שמכפלת הספרות זוגית — כמה? ($7^3-4^3=279$)",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "counterexample",
        topic: "functions",
        points: 8,
        summary:
          "האם בהכרח $f(C_1\\setminus C_2)=f(C_1)\\setminus f(C_2)$ לכל $f:A\\to B$ ו-$C_1,C_2\\subseteq A$? הוכיחו או הפריכו",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "cardinality",
        points: 8,
        summary:
          "$A=\\{f\\in\\{0,1\\}^{\\mathbb{N}}:\\exists k\\in\\mathbb{N}\\,\\forall n\\in\\mathbb{N}\\,f(n+k)=f(n)\\}$ — האם $A$ בת-מנייה? (כן — איחוד בן-מנייה של קבוצות סופיות)",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        points: 5,
        summary:
          "[MC] 6 כדורים לבנים ו-16 כדורים שחורים בשורה: בין כל זוג לבנים סמוכים 0 שחורים, ובקצות יש שחורים — כמה?",
      },
      {
        id: "5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "hamilton_path",
        topics: ["graph_basic"],
        points: 8,
        summary:
          "$G$ בעל מעגל המילטון, $G'=(V\\times\\{1,2,3\\}, E_1\\cup E_2)$ (מכפלה עם $P_3$): $E_1$ = עותקי $G$, $E_2$ = צלעות מחבר בין שכבות — האם $G'$ בעל מעגל המילטון? הוכיחו",
      },
      {
        id: "6",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "euler_formula",
        points: 8,
        summary:
          "פוליהדרון בעל 12 פאות (משולשות או מרובעות), 4 פאות בכל קודקוד — מצאו את מספר הפאות המשולשות (8)",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["catalan"],
        points: 5,
        summary:
          "[MC] מסלולים באורך 12 מ-$(0,0)$ ל-$(6,6)$, מתחת ל-$y=x$, ללא מעבר ב-$(1,1),...,(5,5)$ — כמה? ($C_5=42$)",
      },
      {
        id: "8",
        number: 8,
        chapter: "א",
        type: "compute",
        topic: "propositional_logic",
        points: 8,
        summary: "$A=P\\oplus Q$ (XOR): א) מצאו CNF ל-$A$; ב) מצאו DNF ל-$A$",
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "graph_basic",
        topics: ["pigeonhole"],
        points: 8,
        summary:
          "$G=(V,E)$: $|V|=10$, $|E|=42$ — הוכיחו: קיימים 8 קודקודים מדרגה $\\geq8$, או קיימים $v_1,v_2,v_3\\in V$ שלושה קודקודים בלתי-תלויים",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 5,
        summary:
          "[MC] לוח $5\\times3$, מסמנים 9 תאים כך שכל עמודה מכילה לפחות תא מסומן אחד — כמה? (3915)",
      },
      {
        id: "11",
        number: 11,
        chapter: "א",
        type: "proof_short",
        topic: "relations",
        points: 8,
        summary:
          "$R=\\{((x_1,x_2),(y_1,y_2))\\in(\\mathbb{N}\\times\\mathbb{N})^2\\mid x_1<y_1$ או $x_2<y_2\\}$ — האם רפלקסיבי, סימטרי, אנטי-סימטרי, טרנזיטיבי? הוכיחו/הפריכו",
      },
      {
        id: "12",
        number: 12,
        chapter: "ב",
        type: "proof_short",
        topic: "combinatorial_proof",
        points: 8,
        summary:
          "הוכיחו: $\\sum_{k=2}^{n}(k-1)k\\binom{n}{k}=(n-1)n2^{n-2}$ לכל $n\\geq2$ טבעי",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary:
          "[MC] עצים על $\\{1,...,6\\}$ עם לפחות 3 עלים ו-1 הוא עלה — כמה? (505)",
      },
      {
        id: "14",
        number: 14,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          'הוכיחו שקיים מספר שכל ספרותיו הן 1 (מספר "רפונית") המתחלק ב-2019',
      },
      {
        id: "15",
        number: 15,
        chapter: "ג",
        type: "proof_short",
        topic: "induction",
        points: 8,
        summary:
          "סדרת פיבונאצ'י ($F_0=F_1=1$): הוכיחו $F_n^2=F_{n-1}F_{n+1}+(-1)^n$ לכל $n$ (זהות קסיני)",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2019 (תשע"ט) — מועד ב'.  Source: merged PDF (07.03.19).
  //  מרצים: גורביץ' + ביגון.  15 שאלות (10 פתוחות × 8נק + 5 MC × 5נק). 3 שעות.
  //  שאלות פתוחות: 2,3,5,6,8,9,11,12,14,15 | MC: 1,4,7,10,13
  //  verified: false — שאלות טרם נקראו.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2019_ב_I",
    year: 2019,
    moed: "ב",
    semester: "spring",
    date: "07.03.19",
    lecturers: ["פרופ' אלכסנדר גורביץ'", 'ד"ר בנואה ביגון'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        points: 5,
        summary:
          "[MC] מספרים בני 6 ספרות שונות מ-$\\{1,...,6\\}$ (כל ספרה פעם אחת), אי-זוגיים וגדולים מ-200,000 — כמה? (312)",
      },
      {
        id: "2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "planar_graph",
        points: 8,
        summary:
          "$G=(V,E)$: $V=\\{1,...,10\\}$, $E=\\{\\{u,v\\}\\mid|u-v|\\in\\{1,3,7,9\\}\\}$ — האם $G$ מישורי? ($|E|=20>12=2|V|-4$?)",
      },
      {
        id: "3",
        number: 3,
        chapter: "א",
        type: "counterexample",
        topic: "functions",
        points: 8,
        summary:
          "$f,g:A\\to A$ כך ש-$f\\circ f=f\\circ g=g\\circ f$ — האם בהכרח $f\\circ f=g\\circ g$? הוכיחו או הפריכו",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "counting_basic",
        points: 5,
        summary:
          "[MC] 7 ילדים ב-4 צבעי חולצות, בדיוק 2 אדום ובדיוק 2 צהוב, שאר ירוק/כחול — כמה? ($C(7,2)\\cdot C(5,2)\\cdot2^3=1680$)",
      },
      {
        id: "5",
        number: 5,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 8,
        summary:
          "$A=\\{1,...,10\\}$, $B=\\{1,...,13\\}$, $S\\subset A\\times B$, לכל $b\\in B$: $|\\{a\\mid(a,b)\\in S\\}|=7$ — הוכיחו שקיים $a\\in A$ עם $|\\{b\\mid(a,b)\\in S\\}|\\geq10$",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 8,
        summary:
          "מילים מ-$\\{A,B,C\\}$ ללא $AB,AC,BA,BB$: א) מצאו נסיגה ותנאי התחלה; ב) מצאו פתרון (פרטיקולרי+הומוגני)",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["catalan"],
        points: 5,
        summary:
          "[MC] סדרות $\\pm1$ באורך 16, כל סכום חלקי $\\geq0$, סכום ב-6=0, ב-10=0, ב-16=0 — כמה? ($C_3\\cdot C_2\\cdot C_3=50$)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ב",
        type: "proof_short",
        topic: "combinatorial_proof",
        points: 8,
        summary:
          'הוכיחו: $\\binom{k}{k}+\\binom{k+1}{k}+\\cdots+\\binom{n}{k}=\\binom{n+1}{k+1}$ לכל $k\\leq n$ טבעיים (זהות "מקל הוקי")',
      },
      {
        id: "9",
        number: 9,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        points: 8,
        summary:
          "יער עם 9 קודקודים ובדיוק 3 עלים — מצאו **כל** ערכי $|E|$ האפשריים עם דוגמאות, והוכיחו שאין אחרים. (ענ׳: $\\{3,4,5,6,7,8\\}$)",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "fourth_problem",
        topics: ["inclusion_exclusion"],
        points: 5,
        summary:
          "[MC] 8 כדורים ל-5 מגרות: מגרה עליונה לכל היותר 4, כל אחרת לכל היותר 3 — כמה? (186)",
      },
      {
        id: "11",
        number: 11,
        chapter: "ב",
        type: "proof_short",
        topic: "counting_basic",
        points: 8,
        summary:
          "ריבוע — צלעותיו נצבעות ב-3 צבעים (כל צבע $\\geq1$); שתי צביעות שקולות אם אחת מתקבלת בסיבוב — כמה מחלקות? מה גודל כל מחלקה? (9 מחלקות, גודל 4)",
      },
      {
        id: "12",
        number: 12,
        chapter: "ג",
        type: "counterexample",
        topic: "ramsey",
        points: 8,
        summary:
          "צלעות $K_7$ ($V=\\{1,...,7\\}$) צבועות אדום/כחול, כל הצלעות $\\{1,i\\}$ אדומות — האם בהכרח יש $K_4$ אדום או $K_3$ כחול? הוכיחו/הפריכו",
      },
      {
        id: "13",
        number: 13,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 5,
        summary:
          "[MC] עצים על $\\{1,...,7\\}$: $\\deg(1)=2$ ו-$\\deg(t)\\leq4$ לכל $2\\leq t\\leq7$ — כמה? ($5\\cdot(6^4-6)=6450$)",
      },
      {
        id: "14",
        number: 14,
        chapter: "א",
        type: "proof_short",
        topic: "sets",
        points: 8,
        summary:
          "לכל $A,B,C,D$ — האם לפחות אחת מהכלות הבאות מתקיימת: $(A\\cup C)\\times(B\\cup D)\\setminus(C\\times B)\\subset(A\\setminus C)\\times B\\cup A\\times D$ או הכלה הפוכה? הוכיחו",
      },
      {
        id: "15",
        number: 15,
        chapter: "א",
        type: "proof_short",
        topic: "cardinality",
        points: 8,
        summary:
          'בנו פונקציה חח"ע ועל מ-$A=[-1,1]$ ל-$B=\\{(x,y)\\in\\mathbb{R}^2\\mid|x|\\leq1,|y|\\leq1,xy=0\\}$ (צלב), או הוכיחו שלא קיימת',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2019 (תשע"ט) — מועד קיץ א'.  Source: merged PDF (28.07.19).
  //  מרצה: ד"ר נעה ניצן, מתרגל: מוחמד אבו-ראדי.
  //  פורמט שונה: 11 שאלות (חלק א': 6 שאלות עונים על 5, ×16נק; חלק ב': 5 שאלות ×4נק). 2.5 שעות.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2019_קיץ_א_I",
    year: 2019,
    moed: "א",
    semester: "summer",
    date: "28.07.19",
    lecturers: ['ד"ר נעה ניצן'],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "חלק א",
        points: 80,
        choose: 5,
        from: ["1", "2", "3", "4", "5", "6"],
        note: "ענו על 5 מתוך 6 — 16 נק' כל שאלה",
      },
      {
        name: "חלק ב",
        points: 20,
        choose: 5,
        from: ["7", "8", "9", "10", "11"],
        note: "ענו על כל 5 — 4 נק' כל שאלה",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "cardinality",
        points: 16,
        summary:
          'בנו במפורש פונקציה $(5,7)\\to[0,1]$ חח"ע ועל, והוכיחו שהיא על (אין צורך להוכיח חח"ע)',
      },
      {
        id: "2",
        number: 2,
        chapter: "ב",
        type: "recurrence",
        topic: "recurrence",
        points: 16,
        summary:
          "$a_n$ = מילים באורך $n$ מ-$\\{A,B,C\\}$ ללא $AC,BB,BA,AB$: א) חשבו $a_1,a_2$; ב) מצאו נסיגה ל-$a_n$",
      },
      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "inclusion_exclusion",
        points: 16,
        summary:
          "מספר התמורות $\\sigma:[15]\\to[15]$ עם $\\sigma(1)\\neq1$, $\\sigma(2)\\neq2$, $\\sigma(4)\\neq15$ (הכלה-הדחה)",
      },
      {
        id: "4",
        number: 4,
        chapter: "ב",
        type: "proof_short",
        topic: "pigeonhole",
        points: 16,
        summary:
          "$a_1<\\cdots<a_{30}$ מספרים טבעיים ב-$[1,45]$: הוכיחו שקיימים $i,j$ עם $a_i-a_j=14$",
      },
      {
        id: "5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "euler_formula",
        points: 16,
        summary:
          "הראו כי לפאון קמור שבו כל פאה היא משולש או מחומש, מספר הפאות זוגי",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "proof_short",
        topic: "combinatorial_proof",
        points: 16,
        summary:
          "הוכיחו כי המקדם של $x^0$ ב-$(1+x)^9(1+\\frac{1}{x})^{12}$ הוא $\\binom{21}{9}$",
      },
      {
        id: "7",
        number: 7,
        chapter: "ג",
        type: "compute",
        topic: "prufer_sequence",
        topics: ["trees"],
        points: 4,
        summary:
          "כמה עצים ממוספרים על $\\{1,...,17\\}$ עם $\\deg(17)=1$? ($16^{15}$)",
      },
      {
        id: "8",
        number: 8,
        chapter: "ג",
        type: "compute",
        topic: "planar_graph",
        points: 4,
        summary:
          "כמה גרפים מישוריים ממוספרים על $\\{1,2,3,4,5\\}$? ($2^{10}-1=1023$)",
      },
      {
        id: "9",
        number: 9,
        chapter: "א",
        type: "compute",
        topic: "relations",
        points: 4,
        summary:
          "כמה יחסים אנטי-סימטריים על $\\{1,...,16\\}$? ($2^{16}\\cdot3^{120}$)",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "permutations_with_repetition",
        points: 4,
        summary:
          "מילים באורך 20: $A\\times8$, $B\\times7$, $C\\times5$, האות האחרונה $\\neq B$ — כמה? ($13\\cdot19!/(8!\\,7!\\,5!)$)",
      },
      {
        id: "11",
        number: 11,
        chapter: "ג",
        type: "compute",
        topic: "graph_basic",
        points: 4,
        summary:
          "מספר הצביעה של גרף הקובייה התלת-ממדית $Q_3$ — כמה? (2, דו-צדדי)",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2019 (תשע"ט) — מועד קיץ ב'.  Source: merged PDF (16.08.19).
  //  מרצה: ד"ר נעה ניצן.  פורמט זהה למועד קיץ א' (11 שאלות, 2.5 שעות).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2019_קיץ_ב_I",
    year: 2019,
    moed: "ב",
    semester: "summer",
    date: "16.08.19",
    lecturers: ['ד"ר נעה ניצן'],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "חלק א",
        points: 80,
        choose: 5,
        from: ["1", "2", "3", "4", "5", "6"],
        note: "ענו על 5 מתוך 6 — 16 נק' כל שאלה",
      },
      {
        name: "חלק ב",
        points: 20,
        choose: 5,
        from: ["7", "8", "9", "10", "11"],
        note: "ענו על כל 5 — 4 נק' כל שאלה",
      },
    ],
    questions: [
      {
        id: "1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "propositional_logic",
        points: 16,
        summary:
          "בנו טבלת אמת עבור $\\lnot\\bigl(P\\leftrightarrow[Q\\to(R\\vee P)]\\bigr)$. מצאו פסוק שקול בצורת CNF.",
      },
      {
        id: "2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "equivalence_relation",
        points: 16,
        summary:
          "נתון יחס $R=\\{((x_1,y_1),(x_2,y_2))\\mid x_1-x_2=y_2-y_1\\}$ על $\\mathbb{R}^2$. הוכיחו כי זהו יחס שקילות ואפיינו את מחלקות השקילות.",
      },
      {
        id: "3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "lattice_paths",
        topics: ["inclusion_exclusion"],
        points: 16,
        summary:
          "עכבר הולך מ-$(0,0)$ ל-$(6,6)$ בצעדים ימינה/למעלה. חתולים ב-$(3,3)$ ו-$(2,0)$; נקודות מהצורה $(x,x+2)$ אסורות. בכמה דרכים?",
      },
      {
        id: "4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "halls_theorem",
        topics: ["pigeonhole"],
        points: 16,
        summary:
          'במפלגה 35 ח"כים, 5 מכל אחת מ-7 ערים. הם מחולקים ל-7 ועדות (5 ח"כים כל אחת). הוכיחו שקיימת קבוצה של 7 ח"כים עם נציג מכל ועדה ומכל עיר.',
      },
      {
        id: "5",
        number: 5,
        chapter: "ג",
        type: "proof_theorem",
        topic: "ramsey",
        points: 16,
        summary: "הגדירו $R(3,3,3)$ והוכיחו כי $R(3,3,3)\\le 17$.",
      },
      {
        id: "6",
        number: 6,
        chapter: "ב",
        type: "proof_short",
        topic: "binomial",
        topics: ["combinatorial_proof"],
        points: 16,
        summary:
          "הוכיחו בכל דרך כי לכל $n$ טבעי: $\\displaystyle\\sum_{k=0}^{n}\\binom{2n+1}{k}=4^n$.",
      },
      {
        id: "7",
        number: 7,
        chapter: "ב",
        type: "compute",
        topic: "multinomial",
        points: 4,
        summary:
          "מהו המקדם של $x^{57}$ בפיתוח $\\bigl(x^2-\\tfrac{1}{2x}+2\\bigr)^{30}$?",
      },
      {
        id: "8",
        number: 8,
        chapter: "ג",
        type: "compute",
        topic: "trees",
        topics: ["connectivity"],
        points: 4,
        summary:
          "גרף $G$ חסר מעגלים עם 17 קודקודים ו-13 צלעות. כמה רכיבי קשירות?",
      },
      {
        id: "9",
        number: 9,
        chapter: "א",
        type: "compute",
        topic: "relations",
        points: 4,
        summary:
          "כמה יחסים בינאריים על $A=\\{1,2,\\ldots,10\\}$ הם בו-זמנית רפלקסיביים, סימטריים ואנטי-סימטריים?",
      },
      {
        id: "10",
        number: 10,
        chapter: "ב",
        type: "compute",
        topic: "permutations_combinations",
        points: 4,
        summary:
          "בכמה דרכים ניתן להושיב 5 ילדים (שונים) בשורה של 10 כסאות כך שאין שני ילדים על שני כסאות צמודים?",
      },
      {
        id: "11",
        number: 11,
        chapter: "א",
        type: "compute",
        topic: "power_set",
        topics: ["functions"],
        points: 4,
        summary:
          "נתון $A=\\emptyset$. מצאו כמה פונקציות $f:P(P(P(A)))\\to\\{1,2,3\\}$ קיימות.",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2020 (תש"פ) — מועד א'.  Source: merged PDF (24.02.20).
  //  verified: false — שאלות טרם נקראו.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2020_א_I",
    year: 2020,
    moed: "א",
    semester: "winter",
    date: "24.02.20",
    lecturers: [],
    verified: false,
    parts: [],
    questions: [],
  },
];
