// ─────────────────────────────────────────────────────────────────────
//  src/courses/algebra2/exams.js
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
//          type: "proof_theorem"          // see types below — one specific type;
//                | "proof_short"          // a multi-part question carries its
//                | "compute"              // extra types on its subparts, not a
//                | "true_false"           // catch-all "mixed".
//                | "counterexample"       // הוכיחו או הפריכו
//                | "definition_apply",    // הגדירו ויישום
//          topic: "topic_key",            // primary topic from TOPIC_HE
//          topics: ["k1","k2"],           // optional: secondary topics
//          points: 25,                    // points for this question
//          summary: "Short description with $LaTeX$.",
//          subparts: [                    // optional; for multi-part questions.
//            // Each subpart has its own type/topic; the question then surfaces
//            // under every type it covers (see questionTypes) — computation here,
//            // proof there — instead of a single "mixed" label.
//            { id: "א", points: 10, type: "compute", topic: "...", summary: "…" },
//            { id: "ב", points: 15, type: "proof_short", topic: "...", summary: "…" },
//          ]
//        }
//      ]
//    }
//
//  Question types:
//    proof_theorem      — proof of a known theorem ("הוכיחו את משפט …")
//    proof_short        — short proof of a specific claim
//    compute            — pure computation (find $D$, find $J$, $\dim W$, …)
//    true_false         — "true or false with justification" (older exams)
//    counterexample     — "prove or disprove" / "הוכיחו או הפריכו"
//    definition_apply   — "define X, then apply"
// ─────────────────────────────────────────────────────────────────────

export const EXAMS = [
  // ════════════════════════════════════════════════════════════════
  //  2006 (תשס"ו) — Moed A.  Source: full PDF pp. 1–3.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2006_א_I",
    year: 2006,
    moed: "א",
    semester: "spring",
    date: "19.07.06",
    lecturers: ["מר שמואל ברגר", "פרופ' אהוד פרידגוט"],
    duration_hours: 3,
    total_points: 105,
    verified: true,
    parts: [
      { name: "חלק I", points: 50, choose: 2, from: ["Q1", "Q2", "Q3"], note: "ענו על 2 מתוך 3 — 25 נק' כל אחת" },
      { name: "חלק II", points: 20, choose: 2, from: ["Q4", "Q5"], note: "ענו על שתי השאלות — 10 נק' כל אחת" },
      { name: "חלק III", points: 35, choose: 7, from: ["Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"], note: "ענו על כל 7 השאלות — 5 נק' כל אחת" },
    ],
    questions: [
      { id: "Q1", number: 1, chapter: "א", type: "proof_short", topic: "volume_function", points: 25, summary: 'פונקציית נפח $\\Delta$: (א) $\\Delta(\\alpha_1,\\ldots,\\alpha_n)=t\\,\\Delta(\\varepsilon_1,\\ldots,\\varepsilon_n)$ עם $t$ תלוי רק ב-$a_{ij}$; (ב) מתאפסת על בסיס ⟹ זהותית אפס; (ג) $\\alpha_i$ בת"ל ⟺ $\\Delta\\neq0$' },
      { id: "Q2", number: 2, chapter: "ג", type: "proof_theorem", topic: "spectral_theorem_complex", points: 25, summary: '$V$ ממ"פ מעל $\\mathbb{C}$, $T$ נורמלית ⟹ קיים בסיס אורתונורמלי של ו"ע של $T$' },
      { id: "Q3", number: 3, chapter: "א", type: "proof_theorem", topic: "diagonalization", points: 25, summary: '$T$ לכסינה ⟺ הפולינום האופייני מתפרק לגורמים ליניאריים והריבוי הגאומטרי = האלגברי לכל ע"ע' },
      { id: "Q4", number: 4, chapter: "ג", type: "compute", topic: "spectral_theorem_real", points: 10, summary: '$A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$; מצאו $P$ אורתוגונלית כך ש-$P^{-1}AP$ אלכסונית' },
      { id: "Q5", number: 5, chapter: "ג", type: "compute", topic: "orthogonal_projection", points: 10, summary: 'הוקטור ב-$U=\\mathrm{Span}((1,1,0),(1,-1,0))$ הקרוב ביותר ל-$(1,1,1)$' },
      { id: "Q6", number: 6, chapter: "א", type: "true_false", topic: "diagonalization", points: 5, summary: '$B=\\begin{pmatrix}1&5&7\\\\0&2&6\\\\0&0&3\\end{pmatrix}$ — האם לכסינה?' },
      { id: "Q7", number: 7, chapter: "א", type: "compute", topic: "minimal_polynomial", points: 5, summary: 'הפולינום המינימלי של $B^{100}$' },
      { id: "Q8", number: 8, chapter: "א", type: "compute", topic: "char_polynomial", points: 5, summary: '$A\\in M_4(\\mathbb{C})$; מצאו $\\sum\\lambda_i$ ו-$\\prod\\lambda_i$ (עקבה ודטרמיננטה)' },
      { id: "Q9", number: 9, chapter: "ג", type: "true_false", topic: "spectral_theorem_real", points: 5, summary: 'האם מטריצה סימטרית $5\\times5$ נתונה דומה לאלכסונית מעל $\\mathbb{R}$? (רמז: סימטרית)' },
      { id: "Q10", number: 10, chapter: "ג", type: "counterexample", topic: "bilinear_form", points: 5, summary: 'תבנית בילינארית $f$: אם $f(\\alpha_i,\\alpha_j)=f(\\alpha_j,\\alpha_i)$ לכל $i,j$ ⟹ $f$ סימטרית?' },
      { id: "Q11", number: 11, chapter: "ג", type: "true_false", topic: "self_adjoint", points: 5, summary: '$T$ צמוד לעצמו, $\\langle Tv,v\\rangle=0\\,\\forall v$ ⟹ $T=0$?' },
      { id: "Q12", number: 12, chapter: "ג", type: "true_false", topic: "orthogonal_operator", points: 5, summary: '$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ אורתוגונלי המיוצג ע"י מטריצה אלכסונית — אילו מטריצות אפשריות?' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2006 (תשס"ו) — Moed B.  Source: full PDF pp. 4–5.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2006_ב_I",
    year: 2006,
    moed: "ב",
    semester: "spring",
    date: "00.00.06",
    lecturers: ["מר שמואל ברגר", "פרופ' אהוד פרידגוט"],
    duration_hours: 3,
    total_points: 105,
    verified: true,
    parts: [
      { name: "חלק I", points: 50, choose: 2, from: ["Q1", "Q2", "Q3"], note: "ענו על 2 מתוך 3 — 25 נק' כל אחת" },
      { name: "חלק II", points: 20, choose: 2, from: ["Q4", "Q5"], note: "ענו על שתי השאלות — 10 נק' כל אחת" },
      { name: "חלק III", points: 35, choose: 7, from: ["Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"], note: "ענו על כל 7 השאלות — 5 נק' כל אחת" },
    ],
    questions: [
      { id: "Q1", number: 1, chapter: "א", type: "proof_short", topic: "volume_function", points: 25, summary: '$\\Delta$ פונקציית נפח, $A$ מייצגת את $T$ ⟹ $\\Delta(T\\alpha_1,\\ldots,T\\alpha_n)=|A|\\,\\Delta(\\alpha_1,\\ldots,\\alpha_n)$' },
      { id: "Q2", number: 2, chapter: "ג", type: "proof_theorem", topic: "spectral_theorem_complex", points: 25, summary: '$V$ ממ"פ מעל $\\mathbb{C}$, $T$ נורמלית ⟹ קיים בסיס אורתונורמלי של ו"ע' },
      { id: "Q3", number: 3, chapter: "ג", type: "proof_theorem", topic: "sylvester_inertia", points: 25, summary: 'נסחו והוכיחו את משפט ההתמדה של סילבסטר' },
      { id: "Q4", number: 4, chapter: "ג", type: "compute", topic: "orthogonal_complement", points: 10, summary: '$U=\\mathrm{Span}((1,0,3),(3,0,1))$: (א) מצאו $U^\\perp$; (ב) הוקטור ב-$U$ הקרוב ל-$\\alpha\\in U^\\perp$' },
      { id: "Q5", number: 5, chapter: "א", type: "compute", topic: "minimal_polynomial", points: 10, summary: '$A=\\begin{pmatrix}1&0&0&0\\\\1&2&0&0\\\\0&0&1&0\\\\0&0&0&1\\end{pmatrix}$; פולינום אופייני ומינימלי; האם לכסינה' },
      { id: "Q6", number: 6, chapter: "א", type: "compute", topic: "char_polynomial", points: 5, summary: '$A=\\begin{pmatrix}1&4&17\\\\0&2&15\\\\0&0&3\\end{pmatrix}$, $B=A^{100}+A^{80}$; ע"ע של $B$' },
      { id: "Q7", number: 7, chapter: "א", type: "true_false", topic: "diagonalization", points: 5, summary: '$A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ — האם לכסינה?' },
      { id: "Q8", number: 8, chapter: "א", type: "true_false", topic: "field_char", points: 5, summary: '$A=\\begin{pmatrix}0&1\\\\1&1\\end{pmatrix}$ — לכסינה ב-$M_2(\\mathbb{R})$? וב-$M_2(\\mathbb{F}_2)$?' },
      { id: "Q9", number: 9, chapter: "ג", type: "true_false", topic: "bilinear_form", points: 5, summary: 'האם $A=\\begin{pmatrix}1&1\\\\0&2\\end{pmatrix}$, $B=\\begin{pmatrix}1&1\\\\0&0\\end{pmatrix}$ חופפות?' },
      { id: "Q10", number: 10, chapter: "ג", type: "true_false", topic: "normal_operator", points: 5, summary: 'האם קיימת $T:\\mathbb{C}^n\\to\\mathbb{C}^n$ נורמלית שאינה אוניטרית ואינה הרמיטית?' },
      { id: "Q11", number: 11, chapter: "ג", type: "compute", topic: "bilinear_form", points: 5, summary: '$f((x,y),(z,w))=xz+2xw+3yz+4yw$: מטריצה מייצגת; בסיס שבו ייצוג סימטרי או נמקו מדוע אין' },
      { id: "Q12", number: 12, chapter: "א", type: "true_false", topic: "dual_space", points: 5, summary: '$\\dim V=17$, $\\varphi_i(\\alpha_j)=\\delta_{ij}$ ⟹ האם $\\varphi_1,\\varphi_2,\\varphi_3$ בת"ל?' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2007 (תשס"ז) — Moed A.  Source: full PDF pp. 6–7.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2007_א_I",
    year: 2007,
    moed: "א",
    semester: "spring",
    date: "02.08.07",
    lecturers: ["פרופ' אלכס לובוצקי", "מר שמואל ברגר"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 40, choose: 2, from: ["Q1", "Q2", "Q3"], note: "ענו על 2 מתוך 3 — 20 נק' כל אחת" },
      { name: "חלק ב'", points: 30, choose: 2, from: ["Q4", "Q5", "Q6"], note: "ענו על 2 מתוך 3 — 15 נק' כל אחת" },
      { name: "חלק ג'", points: 30, choose: 3, from: ["Q7", "Q8", "Q9", "Q10"], note: "ענו על 3 מתוך 4 — 10 נק' כל אחת" },
    ],
    questions: [
      { id: "Q1", number: 1, chapter: "א", type: "proof_theorem", topic: "determinant_basics", points: 20, summary: 'נסחו והוכיחו את נוסחת קרמר לפתרון מערכת משוואות' },
      { id: "Q2", number: 2, chapter: "ג", type: "proof_short", topic: "self_adjoint", points: 20, summary: '(א) $T$ מעל $\\mathbb{C}$, $\\langle Tv,v\\rangle=0\\,\\forall v$ ⟹ $T=0$; (ב) האם נכון גם מעל $\\mathbb{R}$?' },
      { id: "Q3", number: 3, chapter: "א", type: "proof_theorem", topic: "diagonalization", points: 20, summary: 'פולינום אופייני מתפרק לינארית + ריבוי אלגברי=גאומטרי לכל ע"ע ⟹ $A$ לכסינה' },
      { id: "Q4", number: 4, chapter: "א", type: "proof_short", topic: "dual_space", points: 15, summary: '$f$ פונקציונל $\\neq0$, $N=\\ker f$, $\\alpha_0\\notin N$ ⟹ לכל $\\alpha$ קיימים יחידים $c,\\beta\\in N$: $\\alpha=c\\alpha_0+\\beta$' },
      { id: "Q5", number: 5, chapter: "א", type: "proof_short", topic: "diagonalization", points: 15, summary: '$V=\\mathbb{R}_{\\leq2}[x]$, $(Tp)(x)=p(x+1)$ ⟹ $T$ אינה לכסינה' },
      { id: "Q6", number: 6, chapter: "ג", type: "proof_short", topic: "orthogonal_operator", points: 15, summary: '$0\\neq v_1,v_2\\in\\mathbb{R}^n$ מאורך זהה ⟹ קיימת $T$ אוניטרית: $Tv_1=v_2$' },
      { id: "Q7", number: 7, chapter: "א", type: "proof_short", topic: "char_polynomial", points: 10, summary: '$A,B\\in M_n(\\mathbb{C})$ רגולריות ⟹ ל-$AB$ ו-$BA$ אותם ע"ע' },
      { id: "Q8", number: 8, chapter: "א", type: "compute", topic: "determinant_basics", points: 10, summary: 'מטריצת תמורה $a_{ij}=1$ אם $j=\\sigma(i)$; דטרמיננטה; $A$ הפיכה' },
      { id: "Q9", number: 9, chapter: "ג", type: "proof_short", topic: "orthogonal_complement", points: 10, summary: '$0\\neq v_1,v_2$, $v_1\\neq v_2$ ⟹ $v_1^\\perp=v_2^\\perp$ ⟺ $v_1,v_2$ ת"ל' },
      { id: "Q10", number: 10, chapter: "א", type: "compute", topic: "dual_space", points: 10, summary: '$\\alpha_1,\\alpha_2,\\alpha_3\\in\\mathbb{R}^3$, $\\varphi_i(\\alpha_j)=\\delta_{ij}$; חשבו $\\varphi_2\\binom{12}{14,16}$' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2007 (תשס"ז) — Moed B.  Source: full PDF pp. 8–9.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2007_ב_I",
    year: 2007,
    moed: "ב",
    semester: "spring",
    date: "23.08.07",
    lecturers: ["פרופ' אלכס לובוצקי", "מר שמואל ברגר"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 40, choose: 2, from: ["Q1", "Q2", "Q3"], note: "ענו על 2 מתוך 3 — 20 נק' כל אחת" },
      { name: "חלק ב'", points: 30, choose: 2, from: ["Q4", "Q5", "Q6"], note: "ענו על 2 מתוך 3 — 15 נק' כל אחת" },
      { name: "חלק ג'", points: 30, choose: 3, from: ["Q7", "Q8", "Q9", "Q10"], note: "ענו על 3 מתוך 4 — 10 נק' כל אחת" },
    ],
    questions: [
      { id: "Q1", number: 1, chapter: "א", type: "proof_short", topic: "eigenvectors_independent", points: 20, summary: '$A\\in M_n(F)$ עם $n$ ע"ע שונים ⟹ הוכיחו ישירות ש-$A$ לכסינה' },
      { id: "Q2", number: 2, chapter: "ג", type: "proof_theorem", topic: "unitary_operator", points: 20, summary: 'שקילות: (א) $T$ אוניטרית; (ב) $TT^*=Id$; (ג) $T$ מעבירה בסיס אורתונורמלי לאורתונורמלי' },
      { id: "Q3", number: 3, chapter: "א", type: "proof_short", topic: "dual_space", points: 20, summary: '$U\\leq V$, $U^0=\\{\\ell\\in V^*:\\ell|_U=0\\}$ ⟹ $\\dim U+\\dim U^0=n$' },
      { id: "Q4", number: 4, chapter: "א", type: "compute", topic: "field_char", points: 15, summary: '$F=\\mathbb{Z}_p$, $a_{ij}=i\\bmod p$ אם $j=\\sigma(i)$; דטרמיננטה; $A$ הפיכה ⟺ $p>n$' },
      { id: "Q5", number: 5, chapter: "א", type: "proof_short", topic: "minimal_polynomial", points: 15, summary: '$\\dim\\mathrm{sp}\\{I,A,A^2,\\ldots\\}$ = מעלת הפולינום המינימלי של $A$' },
      { id: "Q6", number: 6, chapter: "א", type: "proof_short", topic: "invariant_subspace", points: 15, summary: '$A,B\\in M_n(\\mathbb{C})$ מתחלפות ($AB=BA$) ⟹ יש ו"ע משותף' },
      { id: "Q7", number: 7, chapter: "א", type: "compute", topic: "determinant_basics", points: 10, summary: '$A\\in M_4(\\mathbb{C})$, $|A|=8$; חשבו דטרמיננטה של $B$ (לאחר פעולות שורה/עמודה)' },
      { id: "Q8", number: 8, chapter: "א", type: "compute", topic: "minimal_polynomial", points: 10, summary: '$A$ אוניטרית לא סקלרית, $A^5(A^4-I)=0$, $\\pm1$ אינם ע"ע; הפולינום המינימלי' },
      { id: "Q9", number: 9, chapter: "ג", type: "proof_short", topic: "unitary_diagonalization", points: 10, summary: '$A=\\begin{pmatrix}1&2&3\\\\2&3&5\\\\3&5&8\\end{pmatrix}$: (א) דומה לאלכסונית; (ב) אינה דומה לאוניטרית' },
      { id: "Q10", number: 10, chapter: "א", type: "true_false", topic: "matrix_similarity", points: 10, summary: 'האם שתי מטריצות משולשיות עליונות מעל $\\mathbb{Z}_{11}$ דומות?' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2008 (תשס"ח) — Moed B.  Source: full PDF p. 10.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2008_ב_I",
    year: 2008,
    moed: "ב",
    semester: "spring",
    date: "18.09.08",
    lecturers: ["פרופ' ענר שלו", "מר שמואל ברגר"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "כל המבחן", points: 100, choose: 4, from: ["Q1", "Q2", "Q3", "Q4", "Q5"], note: "ענו על 4 מתוך 5 — 25 נק' כל אחת" },
    ],
    questions: [
      { id: "Q1", number: 1, chapter: "א", type: "proof_short", topic: "determinant_basics", points: 25, summary: '$\\det A\\neq0$ ⟺ שורות $A$ בת"ל' },
      { id: "Q2", number: 2, chapter: "ג", type: "proof_theorem", topic: "spectral_theorem_complex", points: 25, summary: '$V$ ממ"פ מעל $\\mathbb{C}$, $T$ נורמלית ⟹ קיים בסיס אורתונורמלי של ו"ע' },
      { id: "Q3", number: 3, chapter: "א", type: "compute", topic: "determinant_basics", points: 25, summary: '(א) $A$ עם $x$ באלכסון ו-$c$ אחרת: נוסחה ל-$\\det$, פתרו $\\det(A)=0$; (ב) $\\det B=0$ ⟺ $n>2$' },
      { id: "Q4", number: 4, chapter: "א", type: "proof_short", topic: "determinant_basics", points: 25, summary: '$\\mathrm{rank}(\\mathrm{adj}(A))=n,1,0$ לפי $\\mathrm{rank}(A)=n,\\,n-1,\\,\\leq n-2$' },
      { id: "Q5", number: 5, chapter: "א", type: "true_false", topic: "matrix_similarity", points: 25, summary: 'אילו מבין $\\begin{pmatrix}2&8\\\\2&2\\end{pmatrix},\\begin{pmatrix}2&0\\\\2&2\\end{pmatrix},\\begin{pmatrix}2&4\\\\4&2\\end{pmatrix},\\begin{pmatrix}6&0\\\\0&-2\\end{pmatrix}$ דומות?' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2009 (תשס"ט) — Moed A.  Source: full PDF pp. 11–14.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2009_א_I",
    year: 2009,
    moed: "א",
    semester: "spring",
    date: "06.07.09",
    lecturers: ["פרופ' יעקב ורשבסקי", 'ד"ר דן רומיק'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 40, choose: 2, from: ["Q1", "Q2", "Q3"], note: "ענו על 2 מתוך 3 — 20 נק' כל אחת" },
      { name: "חלק ב'", points: 30, choose: 2, from: ["Q4", "Q5", "Q6"], note: "ענו על 2 מתוך 3 — 15 נק' כל אחת" },
      { name: "חלק ג'", points: 30, choose: 5, from: ["Q7", "Q8", "Q9", "Q10", "Q11"], note: "ענו על כל 5 — 6 נק' כל אחת (נכון/לא נכון + נימוק)" },
    ],
    questions: [
      { id: "Q1", number: 1, chapter: "ג", type: "proof_short", topic: "orthogonal_complement", points: 20, summary: '(א) הגדירו משלים אורתוגונלי וסכום ישר; (ב) $V=U\\oplus U^\\perp$; (ג) $(U^\\perp)^\\perp=U$' },
      { id: "Q2", number: 2, chapter: "ג", type: "proof_theorem", topic: "unitary_operator", points: 20, summary: 'שקילות (מ"פ מרוכב): (א) $T$ אוניטרית; (ב) $T^{-1}=T^*$; (ג) שומרת בסיס אורתונורמלי' },
      { id: "Q3", number: 3, chapter: "א", type: "proof_theorem", topic: "cayley_hamilton", points: 20, summary: '(א) נסחו והוכיחו קיילי-המילטון ל-$M_n(\\mathbb{C})$; (ב) הגדירו פולינום מינימלי והוכיחו שהוא מחלק את האופייני' },
      { id: "Q4", number: 4, chapter: "ב", type: "compute", topic: "jordan_form", points: 15, summary: 'מצאו צורת ז\'ורדן של $A$ (5×5) ומטריצה הפיכה $P$: $P^{-1}AP=J$' },
      { id: "Q5", number: 5, chapter: "ג", type: "compute", topic: "gram_schmidt", points: 15, summary: 'מ"פ לא סטנדרטית $\\langle u,v\\rangle=v^tAu$, $A=\\begin{pmatrix}2&-1&0\\\\-1&2&0\\\\0&0&3\\end{pmatrix}$; בסיס אורתונורמלי' },
      { id: "Q6", number: 6, chapter: "ג", type: "compute", topic: "spectral_theorem_real", points: 15, summary: '$A=\\begin{pmatrix}2&-1&-1\\\\-1&2&-1\\\\-1&-1&2\\end{pmatrix}$; מצאו $P$ אורתוגונלית ו-$D$ אלכסונית: $A=PDP^{-1}$' },
      { id: "Q7", number: 7, chapter: "ג", type: "true_false", topic: "normal_operator", points: 6, summary: '$A$ נורמלית, $p\\in\\mathbb{C}[t]$ ⟹ $p(A)$ נורמלית?' },
      { id: "Q8", number: 8, chapter: "א", type: "true_false", topic: "matrix_similarity", points: 6, summary: 'ל-$A$ יש $n$ ע"ע שונים, $A,B$ אותו פולינום אופייני ⟹ דומות?' },
      { id: "Q9", number: 9, chapter: "ב", type: "true_false", topic: "nilpotent_basic", points: 6, summary: 'לכל $v$ קיים $k$: $T^kv=0$ ⟹ $T$ נילפוטנטי?' },
      { id: "Q10", number: 10, chapter: "ב", type: "true_false", topic: "jordan_form", points: 6, summary: 'אותו $f_A=f_B$ ואותו $m_A=m_B$ (דרגה $\\leq6$) ⟹ דומות?' },
      { id: "Q11", number: 11, chapter: "א", type: "true_false", topic: "diagonalization", points: 6, summary: '(א) $T$ לכסינה ⟹ $T^2$ לכסינה? (ב) $T^2$ לכסינה ⟹ $T$ לכסינה?' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2009 (תשס"ט) — Moed B.  Source: full PDF pp. 15–18.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2009_ב_I",
    year: 2009,
    moed: "ב",
    semester: "spring",
    date: "06.08.09",
    lecturers: ["פרופ' יעקב ורשבסקי", 'ד"ר דן רומיק'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 40, choose: 2, from: ["Q1", "Q2", "Q3"], note: "ענו על 2 מתוך 3 — 20 נק' כל אחת" },
      { name: "חלק ב'", points: 30, choose: 2, from: ["Q4", "Q5", "Q6"], note: "ענו על 2 מתוך 3 — 15 נק' כל אחת" },
      { name: "חלק ג'", points: 30, choose: 5, from: ["Q7", "Q8", "Q9", "Q10", "Q11"], note: "ענו על כל 5 (7–11) — 6 נק' כל אחת" },
    ],
    questions: [
      { id: "Q1", number: 1, chapter: "ג", type: "proof_short", topic: "cauchy_schwarz", points: 20, summary: '(א) נסחו והוכיחו אי-שוויון קושי-שוורץ, ציינו מתי שוויון; (ב) קבוצה אורתונורמלית ⟹ בת"ל' },
      { id: "Q2", number: 2, chapter: "ג", type: "proof_short", topic: "bilinear_form", points: 20, summary: '$\\mathrm{char}\\,F\\neq2$: (א) לכל תבנית בילינארית קיים בסיס שבו $[f]_B$ אלכסונית; (ב) $F=\\mathbb{C}$ ⟹ ייצוג $I_r$, מספר ה-1-ים יחיד' },
      { id: "Q3", number: 3, chapter: "ג", type: "proof_short", topic: "normal_operator", points: 20, summary: 'שקילות: (א) $T$ נורמלית; (ב) $T=R+iS$ הרמיטיות מתחלפות; (ג) $T=HU=UH$, $H$ הרמיטית $U$ אוניטרית' },
      { id: "Q4", number: 4, chapter: "ב", type: "true_false", topic: "jordan_form", points: 15, summary: 'האם $A,B\\in M_4$ נתונות דומות? (רמז: צורות ז\'ורדן)' },
      { id: "Q5", number: 5, chapter: "ג", type: "compute", topic: "adjoint_operator", points: 15, summary: 'מ"פ $\\langle v,u\\rangle=v^tAu$, $A=\\mathrm{diag}(1,2,3)$, $T=\\begin{pmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{pmatrix}$; חשבו $T^*$' },
      { id: "Q6", number: 6, chapter: "ג", type: "compute", topic: "unitary_diagonalization", points: 15, summary: '$A=\\begin{pmatrix}1&0&i\\\\0&1&0\\\\-i&0&1\\end{pmatrix}$; מצאו $U$ אוניטרית ו-$D$ אלכסונית: $A=UDU^{-1}$' },
      { id: "Q7", number: 7, chapter: "א", type: "compute", topic: "char_polynomial", points: 6, summary: '$A\\in M_4(\\mathbb{C})$ (בלוקים); חשבו $\\sum\\lambda_i$ ו-$\\prod\\lambda_i$' },
      { id: "Q8", number: 8, chapter: "ב", type: "true_false", topic: "jordan_form", points: 6, summary: '$A,B\\in M_4(\\mathbb{C})$ אותו פולינום אופייני ומינימלי ⟹ דומות?' },
      { id: "Q9", number: 9, chapter: "ג", type: "true_false", topic: "unitary_operator", points: 6, summary: '$A$ אוניטרית וצמודה לעצמה ⟹ $A^2=I$?' },
      { id: "Q10", number: 10, chapter: "ב", type: "true_false", topic: "nilpotent_basic", points: 6, summary: '(א) מכפלת נילפוטנטיות נילפוטנטית? (ב) סכום נילפוטנטיות נילפוטנטי?' },
      { id: "Q11", number: 11, chapter: "ג", type: "true_false", topic: "unitary_operator", points: 6, summary: '$T$ אוניטרית: (א) קיים $\\lambda$: $T-\\lambda I$ לא הפיכה; (ב) הפיכה ל-$|\\lambda|\\neq1$; (ג) ל-$|\\lambda|=1$' },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2010 (תש"ע)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2010_א_I",
    year: 2010,
    moed: "א",
    semester: "spring",
    date: "07.07.10",
    lecturers: ["פרופ' צ. גלנדר", "פרופ' צליל סלע"],
    duration_hours: 3,
    total_points: 101,
    verified: true,
    parts: [
      {
        name: "חלק I",
        points: 35,
        choose: 5,
        from: ["א1", "א2", "א3", "ג1", "ב1", "ג2"],
        note: "אמת/שקר עם נימוק קצר",
      },
      { name: "חלק II", points: 32, choose: 2, from: ["ג3", "ג4", "ג5"] },
      { name: "חלק III", points: 34, choose: 2, from: ["א4", "ג6", "ב2"] },
    ],
    questions: [
      {
        id: "א1",
        number: 1,
        chapter: "א",
        type: "true_false",
        topic: "cayley_hamilton",
        points: 7,
        summary:
          "תהי $A$ מטריצה רגולרית. אזי $A^{-1}$ צירוף לינארי של $I, A, \\ldots, A^{n-1}$",
      },
      {
        id: "א2",
        number: 2,
        chapter: "א",
        type: "true_false",
        topic: "primary_decomposition",
        points: 7,
        summary:
          '$V_1, V_2, V_3$ ת"מ של $V$. אם $V_1+V_2+V_3=V$ וגם $\\sum\\dim V_i=\\dim V$ אז $V=V_1\\oplus V_2\\oplus V_3$',
      },
      {
        id: "א3",
        number: 3,
        chapter: "א",
        type: "true_false",
        topic: "trace_basics",
        points: 7,
        summary: '$A,B\\in M_n(F)$ ⟹ סכום הע"ע של $AB$ שווה לסכום הע"ע של $BA$',
      },
      {
        id: "ג1",
        number: 4,
        chapter: "ב",
        type: "true_false",
        topic: "nilpotent_classify",
        points: 7,
        summary:
          '$A,B\\in M_n(\\mathbb{C})$ נילפוטנטיות ⟹ $A\\sim B$ אמ"מ הן מאותו סדר נילפוטנטיות',
      },
      {
        id: "ב1",
        number: 5,
        chapter: "ג",
        type: "true_false",
        topic: "unitary_operator",
        points: 7,
        summary:
          '$T:V\\to V$ אוניטרי בעל ע"ע יחיד $\\lambda$ על מעגל היחידה ⟹ $\\lambda$ ממשי',
      },
      {
        id: "ג2",
        number: 6,
        chapter: "ב",
        type: "true_false",
        topic: "nilpotent_basic",
        points: 7,
        summary: "$T,S$ נילפוטנטיות מתחלפות ⟹ $T+S$ נילפוטנטית",
      },
      {
        id: "ג3",
        number: 7,
        chapter: "ג",
        type: "proof_theorem",
        topic: "cauchy_schwarz",
        points: 16,
        summary: "נסחו והוכיחו את אי-שוויון קושי-שוורץ",
      },
      {
        id: "ג4",
        number: 8,
        chapter: "ג",
        type: "proof_theorem",
        topic: "sylvester_inertia",
        points: 16,
        summary:
          "נסחו והוכיחו את משפט ההתמדה של סילבסטר (לתבניות ביליניאריות סימטריות ממשיות)",
      },
      {
        id: "ג5",
        number: 9,
        chapter: "ג",
        type: "proof_theorem",
        topic: "spectral_theorem_complex",
        points: 16,
        summary:
          '$T:V\\to V$ נורמלי על מ"מ פנימית מרוכבת ממ"ס ⟹ קיים בסיס אורתונורמלי שמלכסן את $T$',
      },
      {
        id: "א4",
        number: 10,
        chapter: "א",
        type: "proof_short",
        topic: "triangulation",
        points: 17,
        summary:
          '$A\\in M_n(\\mathbb{F})$ דומה למשולשת עליונה אמ"מ הפולינום האופייני שלה מתפרק לגורמים לינאריים',
      },
      {
        id: "ג6",
        number: 11,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 17,
        summary:
          '$T,S$ הרמיטיות עם ע"ע ב-$[a,b]$ ו-$[c,d]$ ⟹ ע"ע של $T+S$ ב-$[a+c, b+d]$',
      },
      {
        id: "ב2",
        number: 12,
        chapter: "ג",
        type: "proof_short",
        topic: "bilinear_form",
        points: 17,
        summary:
          "$g$ ביליניארית סימטרית מוגדרת חיובית ↔ מטריצת גרם בכל בסיס היא PD (EXCLUDED — תבניות ביליניאריות)",
      },
    ],
  },
  {
    code: "2010_ב_I",
    year: 2010,
    moed: "ב",
    semester: "spring",
    date: "26.08.10",
    lecturers: ["פרופ' צ. גלנדר", "פרופ' צליל סלע"],
    duration_hours: 3,
    total_points: 101,
    verified: true,
    parts: [
      {
        name: "חלק I",
        points: 35,
        choose: 5,
        from: ["א1", "ג1", "ג2", "ב1", "ג3", "ב2"],
        note: "אמת/שקר עם נימוק",
      },
      { name: "חלק II", points: 32, choose: 2, from: ["ג4", "ב3", "א2"] },
      { name: "חלק III", points: 34, choose: 2, from: ["ג5", "ג6", "א3"] },
    ],
    questions: [
      {
        id: "א1",
        number: 1,
        chapter: "א",
        type: "true_false",
        topic: "primary_decomposition",
        points: 7,
        summary:
          '$P:V\\to V$ ל"ל המקיים $P^2=P$ ⟹ $V=\\ker P\\oplus \\mathrm{Im}\\, P$',
      },
      {
        id: "ג1",
        number: 2,
        chapter: "ג",
        type: "true_false",
        topic: "self_adjoint",
        points: 7,
        summary:
          "לא קיימת $A\\in M_n(\\mathbb{C})$ כך ש-$AA^*+I=\\frac{3}{2}A$",
      },
      {
        id: "ג2",
        number: 3,
        chapter: "ג",
        type: "true_false",
        topic: "normal_operator",
        points: 7,
        summary: "$T,S$ נורמליות מתחלפות ⟹ $TS$ נורמלית",
      },
      {
        id: "ב1",
        number: 4,
        chapter: "ב",
        type: "true_false",
        topic: "nilpotent_classify",
        points: 7,
        summary:
          "$A\\in M_n(\\mathbb{C})$ נילפוטנטית מסדר $r<n/4$ ⟹ לא קיימת $B$: $B^3=A$",
      },
      {
        id: "ג3",
        number: 5,
        chapter: "ג",
        type: "true_false",
        topic: "adjoint_operator",
        points: 7,
        summary:
          "$T:V\\to V$ אוניטרי ⟹ $(\\mathrm{Im}\\,T)^\\perp = \\ker T^*$",
      },
      {
        id: "ב2",
        number: 6,
        chapter: "ב",
        type: "true_false",
        topic: "nilpotent_basic",
        points: 7,
        summary: "$A$ נילפוטנטית ⟹ $A$ דומה ל-$A^t$",
      },
      {
        id: "ג4",
        number: 7,
        chapter: "ג",
        type: "proof_theorem",
        topic: "riesz_representation",
        points: 16,
        summary:
          '$\\varphi\\in V^*$ פונקציונל לינארי על מ"מ פנימית ממ"ס ⟹ קיים $u\\in V$ יחיד עם $\\varphi(v)=\\langle u,v\\rangle$',
      },
      {
        id: "ב3",
        number: 8,
        chapter: "ב",
        type: "proof_theorem",
        topic: "bilinear_form",
        points: 16,
        summary:
          "כל תבנית ביליניארית מיוצגת על-ידי מטריצה $\\begin{pmatrix}D_r & * \\\\ 0 & I_r\\end{pmatrix}$ (EXCLUDED)",
      },
      {
        id: "א2",
        number: 9,
        chapter: "א",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 16,
        summary:
          '$\\lambda_1\\neq\\lambda_2$ ע"ע שונים של $T$ ⟹ $V_{\\lambda_1}+V_{\\lambda_2}=V_{\\lambda_1}\\oplus V_{\\lambda_2}$ (מרחבים מוכללים)',
      },
      {
        id: "ג5",
        number: 10,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 17,
        summary:
          '$A\\in M_3(\\mathbb{R})$ אורתוגונלית, $\\det A=-1$ ⟹ $-1$ הוא ע"ע של $A$',
      },
      {
        id: "ג6",
        number: 11,
        chapter: "ג",
        type: "counterexample",
        topic: "self_adjoint_invariant",
        points: 17,
        summary: "$U$ הוא $T$-אינווריאנטי ⟺ $U^\\perp$ הוא $T^*$-אינווריאנטי?",
      },
      {
        id: "א3",
        number: 12,
        chapter: "א",
        type: "compute",
        topic: "cyclic_subspace",
        points: 17,
        summary:
          "$T:V\\to V$ דו-מימדי, לא סקלרי, $\\mathrm{tr}\\,T=b$, $\\det T=a$ ⟹ קיים $\\alpha$: $\\{\\alpha, T\\alpha\\}$ בסיס; כתבו את המטריצה ב-$\\{\\alpha, T\\alpha\\}$",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2011 (תשע"א)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2011_א_I",
    year: 2011,
    moed: "א",
    semester: "spring",
    date: "16.06.11",
    lecturers: ["פרופ' יעקב ורשבסקי", 'ד"ר יבגני סטרחוב'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 40, choose: 2, from: ["א1", "ג1", "ג2"] },
      { name: "חלק ב'", points: 30, choose: 2, from: ["ג3", "ב1", "ג4"] },
      {
        name: "חלק ג'",
        points: 30,
        choose: 5,
        from: ["ג5", "ב2", "ב3", "ג6", "א2", "א3"],
      },
    ],
    questions: [
      {
        id: "א1",
        number: 1,
        chapter: "א",
        type: "proof_theorem",
        topic: "cayley_hamilton",
        points: 20,
        summary: "הוכיחו את משפט קיילי-המילטון: $f_T(T)=0$",
      },
      {
        id: "ג1",
        number: 2,
        chapter: "ג",
        type: "proof_theorem",
        topic: "gram_schmidt",
        points: 20,
        summary:
          'א) משפט גרם-שמידט; ב) כל מ"מ פנימית סוף-מימדית יש לה בסיס אורתונורמלי',
        subparts: [
          {
            id: "א",
            points: 15,
            type: "proof_theorem",
            topic: "gram_schmidt",
            summary: "הוכיחו את משפט גרם-שמידט",
          },
          {
            id: "ב",
            points: 5,
            type: "proof_short",
            topic: "orthonormal_basis",
            summary: 'כל מ"מ פנימית ממ"ס יש לה בסיס אורתונורמלי',
          },
        ],
      },
      {
        id: "ג2",
        number: 3,
        chapter: "ג",
        type: "proof_theorem",
        topic: "spectral_theorem_complex",
        points: 20,
        summary:
          '$T:V\\to V$ נורמלי על $V$ אוניטרי ממ"ס ⟹ $T$ לכסין בבסיס אורתונורמלי',
      },
      {
        id: "ג3",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        points: 15,
        summary:
          "$A=\\begin{pmatrix}2&0&0&1\\\\0&1&0&0\\\\0&0&1&0\\\\1&0&0&2\\end{pmatrix}$: לכסון אורתוגונלי + חישוב $\\mathrm{tr}(A^{2011})$",
        subparts: [
          {
            id: "א",
            points: 10,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "מצאו $O$ אורתוגונלית ו-$D$ אלכסונית: $O^{-1}AO=D$",
          },
          {
            id: "ב",
            points: 5,
            type: "compute",
            topic: "trace_basics",
            summary: "חשבו $\\mathrm{tr}(A^{2011})$",
          },
        ],
      },
      {
        id: "ב1",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 15,
        summary:
          "$T(p(x))=p'(x)+p(x+1)$ על $\\mathbb{C}_2[x]$: פולינום אופייני, ע\"ע, צורת ז'ורדן",
        subparts: [
          {
            id: "א",
            points: 5,
            type: "compute",
            topic: "char_polynomial",
            summary: "מצאו את הפולינום האופייני",
          },
          {
            id: "ב",
            points: 5,
            type: "compute",
            topic: "diagonalization",
            summary: 'מצאו ע"ע, בסיסים, האם $T$ לכסין?',
          },
          {
            id: "ג",
            points: 5,
            type: "compute",
            topic: "jordan_form",
            summary: "מצאו את צורת ז'ורדן של $T$ (ללא בסיס מז'רדן)",
          },
        ],
      },
      {
        id: "ג4",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 15,
        summary:
          "ההטלה האורתוגונלית $P_U$ על $U=\\{x-2z=0\\}\\subset\\mathbb{R}^3$: מטריצה בבסיס סטנ', ע\"ע, נקודה הקרובה ל-$(1,2,3)$",
        subparts: [
          {
            id: "א",
            points: 7,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "מצאו את המטריצה של $P_U$ בבסיס הסטנדרטי",
          },
          {
            id: "ב",
            points: 4,
            type: "compute",
            topic: "diagonalization",
            summary: 'ע"ע, בסיס למרחבים העצמיים, האם $P_U$ לכסינה?',
          },
          {
            id: "ג",
            points: 4,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "נקודה ב-$U$ הקרובה ל-$(1,2,3)$ ומרחק",
          },
        ],
      },
      {
        id: "ג5",
        number: 7,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_real",
        points: 6,
        summary: "$A\\in M_n(\\mathbb{R})$ סימטרית, $A^{10}=I$ ⟹ $A^2=I$",
      },
      {
        id: "ב2",
        number: 8,
        chapter: "א",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 6,
        summary: "$P:V\\to V$ עם $P^2=P$ ⟹ $V=\\ker P\\oplus\\mathrm{Im}\\,P$",
      },
      {
        id: "ב3",
        number: 9,
        chapter: "ב",
        type: "proof_short",
        topic: "nilpotent_classify",
        points: 6,
        summary:
          "מספר מקסימלי של מטריצות נילפוטנטיות $3\\times3$ מעל $\\mathbb{C}$ שאף שתיים לא דומות",
      },
      {
        id: "ג6",
        number: 10,
        chapter: "ג",
        type: "proof_short",
        topic: "unitary_operator",
        points: 6,
        summary:
          "$T:V\\to V$ אוניטרי ⟹ $|\\langle Tv,v\\rangle|\\leq\\|v\\|^2$",
      },
      {
        id: "א2",
        number: 11,
        chapter: "א",
        type: "counterexample",
        topic: "invariant_subspace",
        points: 6,
        summary:
          "$W$ $T$-אינווריאנטי ⟹ קיים $U$ $T$-אינווריאנטי עם $V=W\\oplus U$?",
      },
      {
        id: "א3",
        number: 12,
        chapter: "ג",
        type: "counterexample",
        topic: "self_adjoint",
        points: 6,
        summary: 'כל ע"ע של $T:V\\to V$ ממשיים (מעל $\\mathbb{C}$) ⟹ $T=T^*$?',
      },
    ],
  },
  {
    code: "2011_ב_I",
    year: 2011,
    moed: "ב",
    semester: "spring",
    date: "19.07.11",
    lecturers: ["פרופ' יעקב ורשבסקי", 'ד"ר יבגני סטרחוב'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 40, choose: 2, from: ["א1", "ג1", "ב1"] },
      { name: "חלק ב'", points: 30, choose: 2, from: ["ג2", "ב2", "ב3"] },
      {
        name: "חלק ג'",
        points: 30,
        choose: 5,
        from: ["ג3", "ג4", "ב4", "ג5", "ג6", "ב5"],
      },
    ],
    questions: [
      {
        id: "א1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "eigenvectors_independent",
        points: 20,
        summary:
          'א) $v_1,\\ldots,v_n$ ו"ע לע"ע שונים ⟹ בת"ל; ב) $T:V\\to V$ עם $\\dim V$ ע"ע שונים ⟹ $T$ לכסין',
        subparts: [
          {
            id: "א",
            points: 15,
            type: "proof_short",
            topic: "eigenvectors_independent",
            summary: 'ו"ע השייכים לע"ע שונים בת"ל',
          },
          {
            id: "ב",
            points: 5,
            type: "proof_short",
            topic: "diagonalization",
            summary: '$\\dim V$ ע"ע שונים ⟹ $T$ לכסין',
          },
        ],
      },
      {
        id: "ג1",
        number: 2,
        chapter: "ג",
        type: "proof_theorem",
        topic: "riesz_representation",
        points: 20,
        summary:
          "א) משפט רייס: $\\varphi(u)=\\langle u, v\\rangle$ עם $v$ יחיד; ב) $(T^*)^*=T$ ו-$(TS)^* = S^*T^*$",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_theorem",
            topic: "riesz_representation",
            summary:
              "$\\varphi\\in V^*$ ⟹ קיים $v\\in V$ יחיד עם $\\varphi(u)=\\langle u,v\\rangle$",
          },
          {
            id: "ב",
            points: 8,
            type: "proof_short",
            topic: "adjoint_operator",
            summary: "הוכיחו $(T^*)^*=T$ ו-$(TS)^*=S^*T^*$",
          },
        ],
      },
      {
        id: "ב1",
        number: 3,
        chapter: "ב",
        type: "proof_short",
        topic: "nilpotent_basic",
        points: 20,
        summary:
          "א) $N$ נילפוטנטי ⟹ $I+N$ יש שורש ריבועי; ב) $T$ הפיכה (מעל $\\mathbb{C}$) ⟹ $T$ יש שורש ריבועי",
        subparts: [
          {
            id: "א",
            points: 6,
            type: "proof_short",
            topic: "nilpotent_basic",
            summary: "$N$ נילפוטנטי ⟹ ל-$I+N$ יש שורש ריבועי",
          },
          {
            id: "ב",
            points: 14,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: "$T$ הפיכה מעל $\\mathbb{C}$ ⟹ ל-$T$ יש שורש ריבועי",
          },
        ],
      },
      {
        id: "ג2",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        points: 15,
        summary:
          "$A=\\begin{pmatrix}2&-1&-1\\\\-1&2&-1\\\\-1&-1&2\\end{pmatrix}$: לכסון אורתוגונלי, חישוב הפולינום האופייני של $A^{23}$",
        subparts: [
          {
            id: "א",
            points: 10,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "מצאו $O$ אורתוגונלית ו-$D$ אלכסונית: $O^{-1}AO=D$",
          },
          {
            id: "ב",
            points: 5,
            type: "compute",
            topic: "char_polynomial",
            summary: "חשבו את הפולינום האופייני של $A^{23}$",
          },
        ],
      },
      {
        id: "ב2",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 15,
        summary:
          '$T(A)=A^t$ על $M_2(\\mathbb{R})$: פולינום אופייני, ע"ע, לכסינות',
        subparts: [
          {
            id: "א",
            points: 7,
            type: "compute",
            topic: "char_polynomial",
            summary: "פולינום אופייני של $T$",
          },
          {
            id: "ב",
            points: 8,
            type: "compute",
            topic: "diagonalization",
            summary: 'ע"ע, בסיסים למ"ע, האם $T$ לכסינה?',
          },
        ],
      },
      {
        id: "ב3",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 15,
        summary:
          "מצאו $J$ ז'ורדן ו-$P$ הפיכה כך ש-$P^{-1}AP=J$, עבור מטריצה $5\\times5$ נילפוטנטית נתונה",
      },
      {
        id: "ג3",
        number: 7,
        chapter: "ג",
        type: "proof_short",
        topic: "normal_operator",
        points: 6,
        summary: "$T:V\\to V$ נורמלי, $T^{2011}=0$ ⟹ $T=0$",
      },
      {
        id: "ג4",
        number: 8,
        chapter: "ג",
        type: "proof_short",
        topic: "adjoint_operator",
        points: 6,
        summary: "הוכיחו $(\\mathrm{Im}\\,T)^\\perp=\\ker(T^*)$",
      },
      {
        id: "ב4",
        number: 9,
        chapter: "א",
        type: "compute",
        topic: "char_polynomial",
        points: 6,
        summary:
          '$A=\\begin{pmatrix}2&3&\\sqrt{2}i&\\sqrt{2}i\\\\4&5&\\sqrt{2}i&\\sqrt{2}i\\\\0&0&1&1\\\\0&0&4&1\\end{pmatrix}$: ע"ע $\\lambda_1,\\ldots,\\lambda_4$. חשבו $\\sum\\lambda_i$ ו-$\\prod\\lambda_i$',
      },
      {
        id: "ג5",
        number: 10,
        chapter: "ג",
        type: "true_false",
        topic: "self_adjoint",
        points: 6,
        summary:
          "$T$ צמוד לעצמו: א) $T-\\lambda I$ אינה הפיכה לאיזה $\\lambda$? ב) $T-\\lambda I$ הפיכה לכל $|\\lambda|\\neq1$? ג) $T-\\lambda I$ הפיכה לכל $\\lambda\\notin\\mathbb{R}$?",
      },
      {
        id: "ג6",
        number: 11,
        chapter: "א",
        type: "proof_short",
        topic: "invariant_subspace",
        points: 6,
        summary: "$S,T$ מתחלפות ⟹ $\\ker S$ הוא $T$-אינווריאנטי",
      },
      {
        id: "ב5",
        number: 12,
        chapter: "ב",
        type: "compute",
        topic: "matrix_similarity",
        points: 6,
        summary:
          "האם $A=\\begin{pmatrix}0&1&0&0\\\\0&0&0&0\\\\0&0&0&1\\\\0&0&0&0\\end{pmatrix}$ ו-$B=\\begin{pmatrix}0&1&0&0\\\\0&0&1&0\\\\0&0&0&0\\\\0&0&0&0\\end{pmatrix}$ דומות?",
      },
    ],
  },
  {
    code: "2011_ג_I",
    year: 2011,
    moed: "ג",
    semester: "spring",
    date: "06.10.11",
    lecturers: ["פרופ' יעקב ורשבסקי", 'ד"ר יבגני סטרחוב'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 40, choose: 2, from: ["ג1", "ג2", "א1"] },
      { name: "חלק ב'", points: 30, choose: 2, from: ["ג3", "ב1", "ג4"] },
      {
        name: "חלק ג'",
        points: 30,
        choose: 5,
        from: ["ג5", "ג6", "ב2", "ב3", "ג7", "ג8"],
      },
    ],
    questions: [
      {
        id: "ג1",
        number: 1,
        chapter: "ג",
        type: "proof_short",
        topic: "cauchy_schwarz",
        points: 20,
        summary:
          '$V$ מ"מ פנימית ממ"ס: א) $|\\langle u,v\\rangle|\\leq\\|u\\|\\|v\\|$; ב) $\\|u+v\\|\\leq\\|u\\|+\\|v\\|$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary: "אי-שוויון קושי-שוורץ",
          },
          {
            id: "ב",
            points: 8,
            type: "proof_short",
            topic: "triangle_inequality",
            summary: "אי-שוויון המשולש",
          },
        ],
      },
      {
        id: "ג2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 20,
        summary:
          'א) $T$ צמוד לעצמו ⟹ ע"ע ממשיים; ב) $T$ נורמלי, $v$ ו"ע ל-$\\lambda$ ⟹ $v$ ו"ע של $T^*$ ל-$\\bar\\lambda$; ג) $T$ נורמלי ⟹ ו"ע לע"ע שונים אורתוגונליים',
        subparts: [
          {
            id: "א",
            points: 6,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '$T$ צמוד לעצמו ⟹ ע"ע ממשי',
          },
          {
            id: "ב",
            points: 8,
            type: "proof_short",
            topic: "normal_operator",
            summary: "$T$ נורמלי, $Tv=\\lambda v$ ⟹ $T^*v=\\bar\\lambda v$",
          },
          {
            id: "ג",
            points: 6,
            type: "proof_short",
            topic: "normal_operator",
            summary: '$T$ נורמלי ⟹ ו"ע לע"ע שונים אורתוגונליים',
          },
        ],
      },
      {
        id: "א1",
        number: 3,
        chapter: "א",
        type: "proof_theorem",
        topic: "triangulation",
        points: 20,
        summary:
          '$V$ ממ"ס מעל $\\mathbb{C}$, $T:V\\to V$ ⟹ קיים בסיס שביחס אליו $T$ מטריצה משולשת עליונה',
      },
      {
        id: "ג3",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "unitary_diagonalization",
        points: 15,
        summary:
          "$A=\\begin{pmatrix}-1&2&0&0&0\\\\2&2&0&0&0\\\\0&0&0&0&0\\\\0&0&0&3&-i\\\\0&0&0&i&3\\end{pmatrix}$: לכסון אוניטרי + חישוב $\\mathrm{tr}(A^{32})$",
        subparts: [
          {
            id: "א",
            points: 10,
            type: "compute",
            topic: "unitary_diagonalization",
            summary: "מצאו $U$ אוניטרית ו-$D$ אלכסונית: $U^{-1}AU=D$",
          },
          {
            id: "ב",
            points: 5,
            type: "compute",
            topic: "trace_basics",
            summary: "חשבו $\\mathrm{tr}(A^{32})$",
          },
        ],
      },
      {
        id: "ב1",
        number: 5,
        chapter: "ב",
        type: "proof_short",
        topic: "matrix_similarity",
        points: 15,
        summary:
          "הוכיחו שאף אחת מארבע המטריצות $3\\times3$ נתונות אינה דומה לאחרות (רמז: ז'ורדן)",
      },
      {
        id: "ג4",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "gram_schmidt",
        points: 15,
        summary:
          "$V=M_2(\\mathbb{R})$ עם $\\langle A,B\\rangle=\\mathrm{tr}(B^TA)$: גרם-שמידט על $v_1=\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}, v_2=\\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}, v_3=\\begin{pmatrix}1&1\\\\0&0\\end{pmatrix}, v_4=\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$",
      },
      {
        id: "ג5",
        number: 7,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 6,
        summary:
          '$V$ מ"מ פנימית: א) סכום אופרטורים חיוביים חיובי; ב) $T$ חיובי ⟹ $T^k$ חיובי לכל $k$ שלם חיובי',
        subparts: [
          {
            id: "א",
            points: 2,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "סכום אופרטורים חיוביים חיובי",
          },
          {
            id: "ב",
            points: 4,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "$T$ חיובי ⟹ $T^k$ חיובי",
          },
        ],
      },
      {
        id: "ג6",
        number: 8,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 6,
        summary:
          "$S:\\mathbb{R}^3\\to\\mathbb{R}^3$ אורתוגונלי ⟹ קיים $v\\neq0$: $S^2v=v$",
      },
      {
        id: "ב2",
        number: 9,
        chapter: "א",
        type: "counterexample",
        topic: "diagonalization",
        points: 6,
        summary: "א) $T$ לכסין ⟹ $T^2$ לכסין? ב) $T^2$ לכסין ⟹ $T$ לכסין?",
      },
      {
        id: "ב3",
        number: 10,
        chapter: "א",
        type: "compute",
        topic: "char_polynomial",
        points: 6,
        summary:
          "$B=\\begin{pmatrix}1&5&7\\\\0&2&6\\\\0&0&3\\end{pmatrix}\\in M_3(\\mathbb{R})$: לכסינה? פולינום אופייני של $B^{100}$",
        subparts: [
          {
            id: "א",
            points: 3,
            type: "compute",
            topic: "diagonalization",
            summary: "האם $B$ לכסינה?",
          },
          {
            id: "ב",
            points: 3,
            type: "compute",
            topic: "char_polynomial",
            summary: "מהו הפולינום האופייני של $B^{100}$?",
          },
        ],
      },
      {
        id: "ג7",
        number: 11,
        chapter: "א",
        type: "proof_short",
        topic: "invariant_subspace",
        points: 6,
        summary:
          "$T:V\\to V$ הפיך, $W\\subseteq V$ $T$-אינווריאנטי ⟹ $T^{-1}(W)$ $T$-אינווריאנטי",
      },
      {
        id: "ג8",
        number: 12,
        chapter: "ג",
        type: "true_false",
        topic: "unitary_operator",
        points: 6,
        summary:
          '$T$ אוניטרי על $V$ ממ"ס מעל $\\mathbb{C}$, $S=T^2+T+I$. א) $S$ לכסינה? ב) $|\\lambda|\\leq3$ עבור ע"ע של $S$? ג) $S,T$ מתחלפות?',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2012 (תשע"ב)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2012_א_I",
    year: 2012,
    moed: "א",
    semester: "spring",
    date: "18.07.12",
    lecturers: ["פרופ' יעקב ורשבסקי", "פרופ' צליל סלע"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 32, choose: 2, from: ["א1", "ג1", "א2"] },
      { name: "חלק ב'", points: 38, choose: 2, from: ["ג2", "ג3", "ב1"] },
      {
        name: "חלק ג'",
        points: 30,
        choose: 5,
        from: ["ג4", "ג5", "ג6", "ב2", "א3", "ב3"],
      },
    ],
    questions: [
      {
        id: "א1",
        number: 1,
        chapter: "א",
        type: "proof_theorem",
        topic: "triangulation",
        points: 16,
        summary:
          "כל מטריצה $A\\in M_n(\\mathbb{F})$ מעל שדה סגור אלגברית דומה למטריצה משולשת עליונה",
      },
      {
        id: "ג1",
        number: 2,
        chapter: "ג",
        type: "definition_apply",
        topic: "adjoint_operator",
        points: 16,
        summary:
          "א) הגדירו את האופרטור הצמוד $T^*$; ב) הוכיחו שקיים יחיד והוא לינארי",
        subparts: [
          {
            id: "א",
            points: 6,
            type: "definition_apply",
            topic: "adjoint_operator",
            summary: "הגדירו את האופרטור הצמוד $T^*$",
          },
          {
            id: "ב",
            points: 10,
            type: "proof_theorem",
            topic: "adjoint_operator",
            summary: "קיום ויחידות של $T^*$, ולינאריות",
          },
        ],
      },
      {
        id: "א2",
        number: 3,
        chapter: "א",
        type: "proof_theorem",
        topic: "diagonalization",
        points: 16,
        summary:
          '$T$ לכסין ⟺ $V=\\bigoplus V_{\\lambda_i}$ (סכום ישר של מ"ע) ⟺ $\\sum\\dim V_{\\lambda_i}=\\dim V$',
      },
      {
        id: "ג2",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        points: 19,
        summary:
          "$A=\\begin{pmatrix}4&2&2\\\\2&4&2\\\\2&2&4\\end{pmatrix}$: פולינום אופייני, פולינום מינימלי, $D$ אלכסונית, $U$ אוניטרית: $U^*AU=D$",
      },
      {
        id: "ג3",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "gram_schmidt",
        points: 19,
        summary:
          "$\\mathbb{R}^4$ עם מ\"פ הסטנ', $u_1=(1,1,0,1), u_2=(1,0,0,1), u_3=(0,1,0,1)$, $U=\\mathrm{span}\\{u_1,u_2\\}$. א) בסיס אורתונורמלי ל-$U,U^\\perp$; ב) הטלה ניצבת של $(2,1,1,2)^t$ על $U$; ג) מרחק $(2,1,1,2)^t$ מ-$U$",
        subparts: [
          {
            id: "א",
            points: 10,
            type: "compute",
            topic: "gram_schmidt",
            summary: "בסיס אורתונורמלי ל-$U$ ול-$U^\\perp$",
          },
          {
            id: "ב",
            points: 5,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "הטלה ניצבת של $(2,1,1,2)^t$ על $U$",
          },
          {
            id: "ג",
            points: 4,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "מרחק של $(2,1,1,2)^t$ מ-$U$",
          },
        ],
      },
      {
        id: "ב1",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 19,
        summary:
          "מצאו פולינום אופייני, פולינום מינימלי, $J$ ז'ורדן ו-$P$ הפיכה: $P^{-1}AP=J$ עבור מטריצה $5\\times5$ נילפוטנטית נתונה",
      },
      {
        id: "ג4",
        number: 7,
        chapter: "ג",
        type: "counterexample",
        topic: "spectral_theorem_real",
        points: 6,
        summary:
          '$T:V\\to V$ ל"ל ממ"ס: בסיס של ו"ע קיים ⟹ קיים בסיס אורתונורמלי של ו"ע?',
      },
      {
        id: "ג5",
        number: 8,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 6,
        summary: 'לא קיים $T:V\\to V$ ל"ל המקיים $TT^*+I=T$',
      },
      {
        id: "ג6",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_real",
        points: 6,
        summary:
          "$A\\in M_n(\\mathbb{R})$ סימטרית ו-$A^k=I$ עבור $k>0$ ⟹ $A^2=I$",
      },
      {
        id: "ב2",
        number: 10,
        chapter: "ב",
        type: "proof_short",
        topic: "nilpotent_basic",
        points: 6,
        summary:
          '$N:V\\to V$ נילפוטנטי, $p(x)\\in F[x]$ ⟹ $p(N)$ נילפוטנטי אמ"מ $p(0)=0$',
      },
      {
        id: "א3",
        number: 11,
        chapter: "ב",
        type: "compute",
        topic: "nilpotent_classify",
        points: 6,
        summary:
          "מספר מקסימלי של מטריצות נילפוטנטיות ב-$M_4(\\mathbb{C})$ שאף שתיים אינן דומות",
      },
      {
        id: "ב3",
        number: 12,
        chapter: "ב",
        type: "true_false",
        topic: "jordan_form",
        points: 6,
        summary:
          "האם קיימות מטריצות ב-$M_2(\\mathbb{C})$ עם: א) $p_A=(x+1)(x-2)$, $m_A=(x-2)$; ב) $p_A=(x+1)(x+3)$, $m_A=(x+1)(x+3)$",
      },
    ],
  },
  {
    code: "2012_ב_I",
    year: 2012,
    moed: "ב",
    semester: "spring",
    date: "10.08.12",
    lecturers: ["פרופ' יעקב ורשבסקי", "פרופ' צליל סלע"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 32, choose: 2, from: ["ג1", "א1", "ב1"] },
      { name: "חלק ב'", points: 38, choose: 2, from: ["ג2", "ב2", "ב3"] },
      {
        name: "חלק ג'",
        points: 30,
        choose: 5,
        from: ["א2", "ג3", "ג4", "ג5", "ב4", "ג6"],
      },
    ],
    questions: [
      {
        id: "ג1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "orthogonal_complement",
        points: 16,
        summary:
          '$V$ מ"מ פנימית ממ"ס, $U\\subseteq V$ ת"מ: א) $U\\oplus U^\\perp=V$; ב) $(U^\\perp)^\\perp=U$',
        subparts: [
          {
            id: "א",
            points: 8,
            type: "proof_short",
            topic: "orthogonal_complement",
            summary: "$V=U\\oplus U^\\perp$",
          },
          {
            id: "ב",
            points: 8,
            type: "proof_short",
            topic: "orthogonal_complement",
            summary: "$(U^\\perp)^\\perp=U$",
          },
        ],
      },
      {
        id: "א1",
        number: 2,
        chapter: "א",
        type: "definition_apply",
        topic: "minimal_polynomial",
        points: 16,
        summary:
          'א) הגדירו פולינום מינימלי; ב) $m_T(x)|q(x)$ עבור $q(T)=0$; ג) $\\lambda$ ע"ע ⟺ שורש של $m_T$',
        subparts: [
          {
            id: "א",
            points: 4,
            type: "definition_apply",
            topic: "minimal_polynomial",
            summary: "הגדירו פולינום מינימלי של $T$",
          },
          {
            id: "ב",
            points: 6,
            type: "proof_short",
            topic: "minimal_polynomial",
            summary: '$m_T|q$ אמ"מ $q(T)=0$',
          },
          {
            id: "ג",
            points: 6,
            type: "proof_short",
            topic: "minimal_polynomial",
            summary: '$\\lambda$ ע"ע ⟺ $\\lambda$ שורש של $m_T$',
          },
        ],
      },
      {
        id: "ב1",
        number: 3,
        chapter: "ב",
        type: "proof_theorem",
        topic: "bilinear_form",
        points: 16,
        summary:
          '$F$ שדה במציין שונה מ-2: כל תבנית ביליניארית סימטרית מעל $V$ ניתנת לייצוג ע"י מטריצה אלכסונית (EXCLUDED)',
      },
      {
        id: "ג2",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        points: 19,
        summary:
          "$A=\\begin{pmatrix}1&0&0\\\\0&0&1\\\\0&-1&-1\\end{pmatrix}$: א) $A$ נורמלית; ב) $U$ אוניטרית, $D$ אלכסונית: $U^*AU=D$; ג) $O$ אורתוגונלית, $C\\in M_3(\\mathbb{R})$ בלוקים: $O^tAO=C$",
        subparts: [
          {
            id: "א",
            points: 5,
            type: "proof_short",
            topic: "normal_operator",
            summary: "הוכיחו ש-$A$ נורמלית",
          },
          {
            id: "ב",
            points: 7,
            type: "compute",
            topic: "unitary_diagonalization",
            summary: "$U$ אוניטרית, $D$ אלכסונית: $U^*AU=D$",
          },
          {
            id: "ג",
            points: 7,
            type: "compute",
            topic: "spectral_theorem_real",
            summary:
              "$O$ אורתוגונלית, $C$ בלוקים $1\\times1$ ו-$\\begin{pmatrix}a&b\\\\-b&a\\end{pmatrix}$: $O^tAO=C$",
          },
        ],
      },
      {
        id: "ב2",
        number: 5,
        chapter: "ב",
        type: "proof_short",
        topic: "matrix_similarity",
        points: 19,
        summary:
          "הוכיחו שאף אחת מהמטריצות הבאות אינה דומה לאחרות: ארבע מטריצות $3\\times3$ נתונות",
      },
      {
        id: "ב3",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 19,
        summary:
          "מצאו $J\\in M_5(\\mathbb{C})$ ז'ורדן ו-$P$ הפיכה: $P^{-1}AP=J$ עבור מטריצה $5\\times5$ נתונה",
      },
      {
        id: "א2",
        number: 7,
        chapter: "א",
        type: "proof_short",
        topic: "invariant_subspace",
        points: 6,
        summary: '$S,T:V\\to V$ ל"ל מתחלפות ⟹ $\\ker S$ הוא $T$-אינווריאנטי',
      },
      {
        id: "ג3",
        number: 8,
        chapter: "ג",
        type: "counterexample",
        topic: "self_adjoint",
        points: 6,
        summary:
          "$U\\subseteq V$ $T$-אינווריאנטי ⟹ $U^\\perp$ $T$-אינווריאנטי?",
      },
      {
        id: "ג4",
        number: 9,
        chapter: "ג",
        type: "counterexample",
        topic: "self_adjoint",
        points: 6,
        summary: "$S,T$ צמודות לעצמן ⟹ $S\\circ T$ צמודה לעצמה?",
      },
      {
        id: "ג5",
        number: 10,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_real",
        points: 6,
        summary: "$A\\in M_n(\\mathbb{R})$ סימטרית, $A^{13}=A^{12}$ ⟹ $A^2=A$",
      },
      {
        id: "ב4",
        number: 11,
        chapter: "ב",
        type: "counterexample",
        topic: "nilpotent_basic",
        points: 6,
        summary:
          '$T:V\\to V$ ל"ל מעל $\\mathbb{C}$ עם ע"ע יחיד $\\lambda=0$ ⟹ $T$ נילפוטנטי?',
      },
      {
        id: "ג6",
        number: 12,
        chapter: "א",
        type: "proof_short",
        topic: "diagonalization",
        points: 6,
        summary:
          '$T:V\\to V$ עם $\\dim V=n>0$, $\\ker T^{n-1}\\neq\\ker T^n$ ⟹ ל-$T$ לכל היותר 2 ע"ע שונים',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2013 (תשע"ג) — Moed B only
  // ════════════════════════════════════════════════════════════════
  {
    code: "2013_ב_I",
    year: 2013,
    moed: "ב",
    semester: "spring",
    date: "02.03.13",
    lecturers: ["שחר מוזס", "אהוד דה שליט"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "פרק א'", points: 30, choose: 1, from: ["א1", "ב1"] },
      { name: "פרק ב'", points: 40, choose: 2, from: ["ג1", "ג2", "ב2"] },
      {
        name: "פרק ג'",
        points: 30,
        choose: 6,
        from: ["ב3", "א2", "ג3", "ג4", "ג5", "ב4"],
      },
    ],
    questions: [
      {
        id: "א1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "eigenvectors_independent",
        points: 30,
        summary:
          'א) $v_1,\\ldots,v_k$ ו"ע ל-$T$ עם $k$ ע"ע שונים ⟹ בת"ל; ב) האם המטריצה $\\begin{pmatrix}0&-2&2\\\\1&1&0\\\\1&-1&2\\end{pmatrix}$ דומה למטריצה אלכסונית מעל $\\mathbb{R}$?',
        subparts: [
          {
            id: "א",
            points: 20,
            type: "proof_short",
            topic: "eigenvectors_independent",
            summary: 'ו"ע לע"ע שונים בת"ל',
          },
          {
            id: "ב",
            points: 10,
            type: "compute",
            topic: "diagonalization",
            summary:
              "האם $A=\\begin{pmatrix}0&-2&2\\\\1&1&0\\\\1&-1&2\\end{pmatrix}$ לכסינה מעל $\\mathbb{R}$?",
          },
        ],
      },
      {
        id: "ב1",
        number: 2,
        chapter: "ב",
        type: "proof_theorem",
        topic: "sylvester_inertia",
        points: 30,
        summary:
          '$V$ מ"ו ממשי סוף-מימדי, $B$ תבנית ביליניארית סימטרית לא מנוונת ⟹ קיים בסיס שמטריצת $B$ אלכסונית עם $1$ או $-1$ באלכסון, ומספר ה-1 לא תלוי בבחירה (EXCLUDED)',
      },
      {
        id: "ג1",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 20,
        summary:
          '$A\\in M_3(\\mathbb{R})$ אורתוגונלית, $\\det A=1$. א) $1$ ע"ע של $A$; ב) $P$ הפיכה: $P^{-1}AP$ מטריצת סיבוב סביב $z$; ג) $\\cos\\theta=\\frac{1}{2}(\\mathrm{tr}(A)-1)$',
        subparts: [
          {
            id: "א",
            points: 8,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: '$1$ ע"ע של $A$',
          },
          {
            id: "ב",
            points: 6,
            type: "compute",
            topic: "orthogonal_operator",
            summary: "$P$ הפיכה: $P^{-1}AP$ סיבוב סביב $z$",
          },
          {
            id: "ג",
            points: 6,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: "$\\cos\\theta=\\frac{1}{2}(\\mathrm{tr}(A)-1)$",
          },
        ],
      },
      {
        id: "ג2",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "inner_product_axioms",
        points: 20,
        summary:
          '$V$ מ"ו ממשי 2-מימדי עם $\\{e_1,e_2\\}$. א) קיימת מ"פ פנימית עם מטריצת גרם $\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$; ב) $T$ ל"ל עם $[T]=\\begin{pmatrix}-1&2\\\\2&1\\end{pmatrix}$ — האם צמוד לעצמו?',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "inner_product_axioms",
            summary: 'קיים מ"פ פנימי עם המטריצת גרם הנתונה',
          },
          {
            id: "ב",
            points: 10,
            type: "compute",
            topic: "self_adjoint",
            summary: "האם $T$ צמוד לעצמו? (ביחס למ\"פ מסעיף א')",
          },
        ],
      },
      {
        id: "ב2",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "generalized_eigenspace",
        points: 20,
        summary:
          '$A=\\begin{pmatrix}-1&0&0&0\\\\0&2&0&0\\\\0&1&2&0\\\\0&0&1&2\\end{pmatrix}$: א) בסיסים לכל המ"ע ולמ"ע מוכללים; ב) $W=\\{B: AB=BA\\}\\subseteq M_4(\\mathbb{R})$ — מ"ו ומימד',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "compute",
            topic: "generalized_eigenspace",
            summary: 'בסיסים לכל המ"ע ולמ"ע מוכללים',
          },
          {
            id: "ב",
            points: 10,
            type: "compute",
            topic: "matrix_similarity",
            summary: '$W=\\{B:AB=BA\\}$ — הוכיחו שמ"ו ומצאו מימד',
          },
        ],
      },
      {
        id: "ב3",
        number: 6,
        chapter: "א",
        type: "true_false",
        topic: "bilinear_form",
        points: 5,
        summary:
          '$V$ מ"ו $n$-מימדי, $B:V\\times V^*\\to F$ ביליניארית $B(v,\\lambda)=\\lambda(v)$ ⟹ דרגת $B$ היא $n$ (EXCLUDED)',
      },
      {
        id: "א2",
        number: 7,
        chapter: "א",
        type: "true_false",
        topic: "dual_space",
        points: 5,
        summary: '$V$ מ"ו: גרעיני שני פונקציונלים לא תלויים שונים (EXCLUDED)',
      },
      {
        id: "ג3",
        number: 8,
        chapter: "ג",
        type: "true_false",
        topic: "self_adjoint",
        points: 5,
        summary:
          '$V$ ממ"פ מעל $\\mathbb{C}$, $T:V\\to V$ עם כל הע"ע ממשיים ⟹ $T$ צמוד לעצמו?',
      },
      {
        id: "ג4",
        number: 9,
        chapter: "ג",
        type: "true_false",
        topic: "orthonormal_basis",
        points: 5,
        summary:
          "אינסוף בסיסים אורתונורמליים $(f_1,\\ldots,f_{10})$ של $\\mathbb{R}^{10}$ עם $\\mathrm{span}(f_1,\\ldots,f_i)=\\mathrm{span}(e_1,\\ldots,e_i)$ לכל $i$",
      },
      {
        id: "ג5",
        number: 10,
        chapter: "א",
        type: "true_false",
        topic: "invariant_subspace",
        points: 5,
        summary:
          '$S,T$ ל"ל מ"ס מתחלפות, $W$ $T$-אינווריאנטי ⟹ $W$ $S$-אינווריאנטי?',
      },
      {
        id: "ב4",
        number: 11,
        chapter: "ב",
        type: "true_false",
        topic: "jordan_form",
        points: 5,
        summary:
          "$F$ שדה, $A\\in M_4(F)$, $A^4=0$, $A^3\\neq0$ ⟹ בצורת ז'ורדן של $A$ יש בדיוק 2 בלוקי ז'ורדן מגודל 2?",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2014 (תשע"ד)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2014_א_I",
    year: 2014,
    moed: "א",
    semester: "spring",
    date: "10.07.14",
    lecturers: ["פרופ' אלכס גורביץ'", "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 30, choose: 2, from: ["א1", "ג1", "ב1"] },
      { name: "חלק ב'", points: 40, choose: 2, from: ["ב2", "ג2", "ב3"] },
      {
        name: "חלק ג'",
        points: 30,
        choose: 5,
        from: ["א2", "א3", "ב4", "ב5", "א4", "ג3"],
      },
    ],
    questions: [
      {
        id: "א1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "eigenvectors_independent",
        points: 15,
        summary:
          '$V$ ממ"ס מעל $\\mathbb{F}$, $f:V\\to V$ ל"ל, $(v^1,\\ldots,v^k)$ ו"ע שונים מאפס לע"ע שונים ⟹ $(v^1,\\ldots,v^k)$ בת"ל',
      },
      {
        id: "ג1",
        number: 2,
        chapter: "ג",
        type: "proof_theorem",
        topic: "spectral_theorem_complex",
        points: 15,
        summary:
          '$V$ אוניטרי ממ"ס מעל $\\mathbb{C}$, $f:V\\to V$ צמוד לעצמו ⟹ קיים בסיס אורתונורמלי של ו"ע של $f$',
      },
      {
        id: "ב1",
        number: 3,
        chapter: "ב",
        type: "proof_theorem",
        topic: "sylvester_inertia",
        points: 15,
        summary:
          '$V$ מ"ו $n$-מימדי, $g$ תבנית ביליניארית סימטרית; עבור בסיס $B=(b^1,\\ldots,b^n)$, $p_B$ מספר $i$ עם $g(b^i,b^i)>0$. הוכיחו $p_{B_1}=p_{B_2}$ לכל שני בסיסים אורתוגונליים (EXCLUDED)',
      },
      {
        id: "ב2",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "dual_space",
        points: 20,
        summary:
          "$V=\\mathbb{R}^2_{col}$, $B=(b^1,b^2)=\\left(\\binom{5}{3}, \\binom{2}{1}\\right)$. א) $B^\\vee=(\\ell_1,\\ell_2)$ באמצעות הבסיס הסטנ' של $\\mathbb{R}_1[x,y]$; ב) $\\ell(x,y)=4x-7y$, $[\\ell]_{B^\\vee}$; ג) $f$ עם $[f]=\\begin{pmatrix}1&2\\\\1&0\\end{pmatrix}$, מצאו $[f^\\vee]_{B^\\vee}$ (EXCLUDED — מרחב דואלי)",
      },
      {
        id: "ג2",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 20,
        summary:
          '$V=\\mathbb{R}^3$, $U=\\mathrm{Span}\\{(1,-2,-3),(3,-1,1)\\}$, $r_U$ שיקוף אורתוגונלי ביחס ל-$U$. א) בסיס אורתוגונלי ל-$U$; ב) בסיס ל-$U^\\perp$; ג) ב-$U^\\perp$ הקרוב ל-$(9,5,7)^t$; ד) $r_U((9,5,7)^t)$; ה) ע"ע ומימדים',
        subparts: [
          {
            id: "א",
            points: 4,
            type: "compute",
            topic: "gram_schmidt",
            summary: "בסיס אורתוגונלי ל-$U$",
          },
          {
            id: "ב",
            points: 3,
            type: "compute",
            topic: "orthogonal_complement",
            summary: "בסיס ל-$U^\\perp$",
          },
          {
            id: "ג",
            points: 4,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "וקטור ב-$U^\\perp$ הקרוב ביותר ל-$(9,5,7)^t$",
          },
          {
            id: "ד",
            points: 4,
            type: "compute",
            topic: "orthogonal_operator",
            summary: "$r_U((9,5,7)^t)$",
          },
          {
            id: "ה",
            points: 5,
            type: "compute",
            topic: "diagonalization",
            summary: 'ע"ע של $r_U$ ומימדי המ"ע',
          },
        ],
      },
      {
        id: "ב3",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "bilinear_form",
        points: 20,
        summary:
          "$V=\\mathbb{R}_{\\leq2}[t]$, $g(p,q)=p(3)q(1)+p(1)q(3)$. א) $g$ סימטרית; ב) מטריצה Gram ב-$B=(1,t,t^2)$; ג) בסיס שבו מטריצה Gram אלכסונית; ד) $g$ מנוונת? (EXCLUDED)",
      },
      {
        id: "א2",
        number: 7,
        chapter: "א",
        type: "counterexample",
        topic: "dual_space",
        points: 6,
        summary:
          '$V$ ממ"ס מעל $\\mathbb{F}$, $f:V\\to V$ ל"ל. הוכיחו או הפריכו: לכל $W\\leq V$ $f$-אינווריאנטי, המאפס $W^\\circ\\leq V^\\vee$ הוא $f^\\vee$-אינווריאנטי (EXCLUDED — מרחב דואלי)',
      },
      {
        id: "א3",
        number: 8,
        chapter: "א",
        type: "counterexample",
        topic: "cayley_hamilton",
        points: 6,
        summary:
          "$F$ שדה, $A\\in M_n(F)$ הפיכה ⟹ $A^{-1}$ צירוף לינארי של $A^0,A^1,\\ldots,A^{n-1}$",
      },
      {
        id: "ב4",
        number: 9,
        chapter: "א",
        type: "counterexample",
        topic: "diagonalization",
        points: 6,
        summary:
          '$F$ שדה, $V$ מ"ו 4-מימדי, $f:V\\to V$, $(v^1,v^2,v^3)$ שלשת ו"ע בת"ל ⟹ $f$ לכסין?',
      },
      {
        id: "ב5",
        number: 10,
        chapter: "ב",
        type: "counterexample",
        topic: "bilinear_form",
        points: 6,
        summary:
          "$V$ ממ\"ס, $g$ ביליניארית סימטרית: לכל $W\\subseteq V$ קיים $W'$ עם $V=W\\oplus W'$ עם $g(w,u)=0$ לכל $w\\in W, u\\in W'$ (EXCLUDED)",
      },
      {
        id: "א4",
        number: 11,
        chapter: "א",
        type: "counterexample",
        topic: "primary_decomposition",
        points: 6,
        summary:
          "$f:\\mathbb{C}^2\\to\\mathbb{C}^2$, $h(t)=(t-1)(t-2)\\in\\mathbb{C}[t]$. אם $h(f)=0$ ⟹ $f$ ניתן ללכסון",
      },
      {
        id: "ג3",
        number: 12,
        chapter: "ג",
        type: "counterexample",
        topic: "self_adjoint",
        points: 6,
        summary:
          '$V=\\mathbb{C}^3_{col}$ עם מ"פ סטנדרטית, $f:V\\to V$, $f^*=f^2$, $u=(1,1,0)^t,v=(1,0,0)^t$ ו"ע ל-$\\lambda,\\mu$ ⟹ $\\lambda=\\mu$',
      },
    ],
  },
  {
    code: "2014_ב_I",
    year: 2014,
    moed: "ב",
    semester: "spring",
    date: "31.07.14",
    lecturers: ["פרופ' אלכס גורביץ'", "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 30, choose: 2, from: ["ב1", "ב2", "א1"] },
      { name: "חלק ב'", points: 40, choose: 2, from: ["ב3", "ג1", "ב4"] },
      {
        name: "חלק ג'",
        points: 30,
        choose: 5,
        from: ["א2", "ב5", "א3", "א4", "ג2", "ב6"],
      },
    ],
    questions: [
      {
        id: "ב1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "dual_space",
        points: 15,
        summary:
          '$V$ מ"ו $n$-מימדי מעל $\\mathbb{F}$, $U\\leq V$ ת"מ $k$-מימדי, $U^\\circ\\subseteq V^\\vee$ המאפס. הוכיחו $\\dim U^\\circ=n-k$ (EXCLUDED)',
      },
      {
        id: "ב2",
        number: 2,
        chapter: "ב",
        type: "proof_theorem",
        topic: "bilinear_form",
        points: 15,
        summary:
          '$V$ מ"ו $n$-מימדי, $g$ תבנית ביליניארית סימטרית ⟹ קיים $V$-בסיס אורתוגונלי $(b^1,\\ldots,b^n)$ עם $g(b^i,b^j)=0$ לכל $i\\neq j$ (EXCLUDED)',
      },
      {
        id: "א1",
        number: 3,
        chapter: "א",
        type: "proof_theorem",
        topic: "minimal_polynomial_vec",
        points: 15,
        summary:
          '$V$ ממ"ס מעל $\\mathbb{F}$, $f:V\\to V$ ל"ל, $0\\neq v\\in V$, $k\\in\\mathbb{N}$ מינימלי כך ש-$(v,fv,\\ldots,f^kv)$ תלויה לינארית. נסמן $U=\\mathrm{Span}(v,fv,\\ldots,f^{k-1}v)$. הוכיחו: א) $(v,fv,\\ldots,f^{k-1}v)$ בת"ל; ב) $f^\\ell v\\in U$ לכל $\\ell\\in\\mathbb{N}$; ג) $U$ הוא $f$-אינווריאנטי',
        subparts: [
          {
            id: "א",
            points: 5,
            type: "proof_short",
            topic: "minimal_polynomial_vec",
            summary: '$(v,fv,\\ldots,f^{k-1}v)$ בת"ל',
          },
          {
            id: "ב",
            points: 5,
            type: "proof_short",
            topic: "cyclic_subspace",
            summary: "$f^\\ell v\\in U$ לכל $\\ell$",
          },
          {
            id: "ג",
            points: 5,
            type: "proof_short",
            topic: "invariant_subspace",
            summary: "$U$ הוא $f$-אינווריאנטי",
          },
        ],
      },
      {
        id: "ב3",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "dual_space",
        points: 20,
        summary:
          "$V=\\mathbb{R}_{\\leq2}[x]$, $\\mathcal{L}=(\\ell_1,\\ell_2,\\ell_3)$ עם $\\ell_1(p)=p(0), \\ell_2(p)=p'(1), \\ell_3(p)=p''(1)$. א) $\\ell\\in V^\\vee$ עם $\\ell(p)=p'(0)$, מצאו $[\\ell]_\\mathcal{L}$; ב) $f:V\\to V$, $f(p)=p'$, מטריצה $[f^\\vee]_\\mathcal{L}$; ג) בסיס $B$ ב-$V$: $\\mathcal{L}=B^\\vee$ (EXCLUDED)",
      },
      {
        id: "ג1",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        points: 20,
        summary:
          "$\\mathbb{R}^3_{col}$ עם מ\"פ סטנ', $f$: $f(x_1,x_2,x_3)=\\begin{pmatrix}0&1&1\\\\1&0&1\\\\1&1&0\\end{pmatrix}\\cdot x$. א) $(t-2)(t+1)^2$ פולינום אופייני; ב) בסיס $B$ של $\\mathbb{R}^3_{col}$ ש-$[f]_B$ אלכסונית; ג) בסיס אורתוגונלי $U$ של $\\mathbb{R}^3_{col}$ ש-$[f]_U$ אלכסונית",
        subparts: [
          {
            id: "א",
            points: 5,
            type: "compute",
            topic: "char_polynomial",
            summary: "$(t-2)(t+1)^2$ הוא פולינום אופייני של $f$",
          },
          {
            id: "ב",
            points: 7,
            type: "compute",
            topic: "diagonalization",
            summary: "בסיס $B$ ש-$[f]_B$ אלכסונית",
          },
          {
            id: "ג",
            points: 8,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "בסיס אורתוגונלי $U$ ש-$[f]_U$ אלכסונית",
          },
        ],
      },
      {
        id: "ב4",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 20,
        summary:
          '$A=\\begin{pmatrix}3&-4&1\\\\4&-5&2\\\\0&0&6\\end{pmatrix}\\in M_3(\\mathbb{C})$. א) פולינום אופייני; ב) ע"ע, מימדי המ"ע המוכללים; ג) צורת ז\'ורדן $B$, כלומר $B$ דומה ל-$A$',
        subparts: [
          {
            id: "א",
            points: 6,
            type: "compute",
            topic: "char_polynomial",
            summary: "פולינום אופייני של $A$",
          },
          {
            id: "ב",
            points: 7,
            type: "compute",
            topic: "generalized_eigenspace",
            summary: 'ע"ע ומימדי המ"ע המוכללים',
          },
          {
            id: "ג",
            points: 7,
            type: "compute",
            topic: "jordan_form",
            summary: "צורת ז'ורדן $B$ הדומה ל-$A$",
          },
        ],
      },
      {
        // הוכחה דרך נילפוטנטיות: עבור $k$ מינימלי, $(f-\lambda I)^{k-1}v\neq0$
        // אך $(f-\lambda I)$ מאפס אותו ⟹ זהו ו"ע. הנושא הוא מרחב עצמי מוכלל
        // ($\ker(f-\lambda I)^k$), הממוקם בפרק הנילפוטנטיות.
        id: "א2",
        number: 7,
        chapter: "ב",
        type: "counterexample",
        topic: "generalized_eigenspace",
        points: 6,
        summary:
          '$V$ ממ"ס, $f:V\\to V$ ל"ל, $\\lambda\\in\\mathbb{F}$. $\\ker(f-\\lambda\\mathrm{Id}_V)^k\\neq\\{0\\}$ עבור $k\\in\\mathbb{N}$ ⟹ $\\lambda$ ע"ע של $f$ (דרך נילפוטנטיות)',
      },
      {
        id: "ב5",
        number: 8,
        chapter: "ב",
        type: "counterexample",
        topic: "bilinear_form",
        points: 6,
        summary:
          "$g$ ביליניארית סימטרית על $\\mathbb{R}^2_{col}$. אם קיים $0\\neq v$ עם $g(v,v)=0$ ⟹ $g$ מנוונת (EXCLUDED)",
      },
      {
        id: "א3",
        number: 9,
        chapter: "א",
        type: "counterexample",
        topic: "matrix_similarity",
        points: 6,
        summary:
          "$A,B\\in M_2(\\mathbb{C})$ עם $\\det A=\\det B$ ו-$\\mathrm{tr}\\,A=\\mathrm{tr}\\,B$ ⟹ קיימת $P$ הפיכה: $B=P^{-1}AP$",
      },
      {
        id: "א4",
        number: 10,
        chapter: "א",
        type: "counterexample",
        topic: "diagonalization",
        points: 6,
        summary:
          '$f:V\\to V$ ל"ל, $V$ ממ"ס. $f$ לכסין ⟹ $V=\\ker f\\oplus\\mathrm{Im}\\,f$',
      },
      {
        id: "ג2",
        number: 11,
        chapter: "ג",
        type: "counterexample",
        topic: "self_adjoint",
        points: 6,
        summary:
          '$f$ ל"ל על $\\mathbb{R}^2_{col}$, $f$ עם $\\begin{pmatrix}-2&5\\\\-1&3\\end{pmatrix}$ ⟹ קיימת מ"פ פנימית על $\\mathbb{R}^2_{col}$ ביחס אליה $f$ צמוד לעצמו',
      },
      {
        id: "ב6",
        number: 12,
        chapter: "ב",
        type: "counterexample",
        topic: "bilinear_form",
        points: 6,
        summary:
          "$A\\in M_n(\\mathbb{R})$ סימטרית ⟹ קיימת $P\\in M_n(\\mathbb{R})$ הפיכה: $A^3=P^tAP$ (EXCLUDED — סוגיית סיגנטורה)",
      },
    ],
  },
  {
    code: "2014_ג_I",
    year: 2014,
    moed: "ג",
    semester: "spring",
    date: "11.09.14",
    lecturers: ["פרופ' אלכס גורביץ'", "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חלק א'", points: 30, choose: 2, from: ["ג1", "ג2", "ב1"] },
      { name: "חלק ב'", points: 40, choose: 2, from: ["ג3", "ג4", "ב2"] },
      {
        name: "חלק ג'",
        points: 30,
        choose: 5,
        from: ["א1", "א2", "ג5", "ג6", "ב3", "ב4"],
      },
    ],
    questions: [
      {
        id: "ג1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "gram_schmidt",
        points: 15,
        summary:
          '$V$ מ"מ אוקלידית (ממ"ס מעל $\\mathbb{R}$ עם מ"פ פנימית) ⟹ קיים ל-$V$ בסיס אורתונורמלי',
      },
      {
        id: "ג2",
        number: 2,
        chapter: "ג",
        type: "proof_theorem",
        topic: "unitary_operator",
        points: 15,
        summary:
          '$V$ אוניטרי ממ"ס מעל $\\mathbb{C}$ עם מ"פ מרוכבת, $f:V\\to V$ אוניטרי, $\\lambda$ ע"ע. א) $|\\lambda|=1$; ב) $v,w$ ו"ע לע"ע שונים ⟹ $\\langle v,w\\rangle=0$',
        subparts: [
          {
            id: "א",
            points: 8,
            type: "proof_short",
            topic: "unitary_operator",
            summary: "$|\\lambda|=1$",
          },
          {
            id: "ב",
            points: 7,
            type: "proof_short",
            topic: "unitary_operator",
            summary: 'ו"ע לע"ע שונים אורתוגונליים',
          },
        ],
      },
      {
        id: "ב1",
        number: 3,
        chapter: "ב",
        type: "proof_theorem",
        topic: "bilinear_form",
        points: 15,
        summary:
          "$g$ ביליניארית סימטרית על $\\mathbb{R}^n$, $B=(b^1,\\ldots,b^n)$ בסיס אורתוגונלי ביחס ל-$g$ עם $g(b^i,b^i)\\neq0$ עבור $i=1,\\ldots,r$ ו-$g(b^i,b^i)=0$ עבור $i=r+1,\\ldots,n$. הוכיחו $\\mathrm{Span}(b^{r+1},\\ldots,b^n)=\\{w\\in\\mathbb{R}^n: g(v,w)=0\\,\\forall v\\}$ (EXCLUDED)",
      },
      {
        id: "ג3",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "gram_schmidt",
        points: 20,
        summary:
          "$V=M_2(\\mathbb{R})$ עם $\\langle A,B\\rangle=\\mathrm{tr}(A^tB)$. $U=\\mathrm{span}\\{\\begin{pmatrix}1&0\\\\1&0\\end{pmatrix}\\}\\subseteq M_2(\\mathbb{R})$. א) בסיס אורתונורמלי ל-$U$; ב) הטלה אורתוגונלית של $u=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ על $U$",
        subparts: [
          {
            id: "א",
            points: 10,
            type: "compute",
            topic: "gram_schmidt",
            summary: "בסיס אורתונורמלי ל-$U$",
          },
          {
            id: "ב",
            points: 10,
            type: "compute",
            topic: "orthogonal_projection",
            summary:
              "הטלה אורתוגונלית של $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ על $U$",
          },
        ],
      },
      {
        id: "ג4",
        number: 5,
        chapter: "א",
        type: "compute",
        topic: "diagonalization_compute",
        points: 20,
        summary:
          '$f:\\mathbb{R}^2_{col}\\to\\mathbb{R}^2_{col}$, $A=\\begin{pmatrix}1&-6\\\\2&8\\end{pmatrix}$. א) פולינום אופייני; ב) ע"ע; ג) בסיס ל-$\\mathbb{R}^2$ של ו"ע; ד) $D,P\\in M_2(\\mathbb{R})$, $D$ אלכסונית: $P^{-1}AP=D$',
        subparts: [
          {
            id: "א",
            points: 4,
            type: "compute",
            topic: "char_polynomial",
            summary: "פולינום אופייני",
          },
          {
            id: "ב",
            points: 4,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'ע"ע',
          },
          {
            id: "ג",
            points: 6,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'בסיס של ו"ע',
          },
          {
            id: "ד",
            points: 6,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "$P^{-1}AP=D$",
          },
        ],
      },
      {
        id: "ב2",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 20,
        summary:
          "$A=\\begin{pmatrix}0&1&2\\\\0&0&0\\\\0&0&0\\end{pmatrix}\\in M_3(\\mathbb{C})$ (שימו לב $A^2=0$). א) מצאו $v\\in\\mathbb{C}^3$ עם $v\\notin\\ker A$; ב) $J\\in M_3(\\mathbb{C})$ ז'ורדן הדומה ל-$A$; ג) $P$ הפיכה: $J=P^{-1}AP$",
        subparts: [
          {
            id: "א",
            points: 5,
            type: "compute",
            topic: "jordan_form",
            summary: "וקטור $v\\notin\\ker A$",
          },
          {
            id: "ב",
            points: 8,
            type: "compute",
            topic: "jordan_form",
            summary: "$J$ ז'ורדן הדומה ל-$A$",
          },
          {
            id: "ג",
            points: 7,
            type: "compute",
            topic: "jordan_form",
            summary: "$P$ הפיכה: $J=P^{-1}AP$",
          },
        ],
      },
      {
        id: "א1",
        number: 7,
        chapter: "א",
        type: "counterexample",
        topic: "eigenvalue_definition",
        points: 6,
        summary:
          '$V$ מ"ו מעל $\\mathbb{F}$, $f:V\\to V$ ל"ל. אם כל $v\\in V$ ו"ע של $f$ ⟹ $f$ סקלרי (קיים $k\\in\\mathbb{F}$: $f(v)=kv$ לכל $v$)',
      },
      {
        id: "א2",
        number: 8,
        chapter: "א",
        type: "counterexample",
        topic: "primary_decomposition",
        points: 6,
        summary:
          '$f:\\mathbb{R}^2_{col}\\to\\mathbb{R}^2_{col}$ ל"ל, $h(t)=(t-1)(t-2)\\in\\mathbb{R}[t]$. אם $h(f)=0$ ⟹ $f$ ניתן ללכסון',
      },
      {
        id: "ג5",
        number: 9,
        chapter: "ג",
        type: "counterexample",
        topic: "orthogonal_operator",
        points: 6,
        summary:
          '$f:\\mathbb{R}^3_{col}\\to\\mathbb{R}^3_{col}$ אורתוגונלי ביחס למ"פ פנימית הסטנ\' ⟹ קיים $W\\leq\\mathbb{R}^3_{col}$ ת"מ $f$-אינווריאנטי ממימד 2',
      },
      {
        id: "ג6",
        number: 10,
        chapter: "ג",
        type: "counterexample",
        topic: "bilinear_form",
        points: 6,
        summary:
          "$g$ ביליניארית סימטרית על $\\mathbb{C}^2_{col}$ ⟹ קיים $0\\neq v\\in\\mathbb{C}^2_{col}$: $g(v,v)=0$ (EXCLUDED)",
      },
      {
        id: "ב3",
        number: 11,
        chapter: "ב",
        type: "counterexample",
        topic: "dual_space",
        points: 6,
        summary:
          '$V,W$ ממ"ס מעל $\\mathbb{F}$, $f:V\\to W$ ל"ל, $f^\\vee:W^\\vee\\to V^\\vee$ דואלית (EXCLUDED)',
      },
      {
        id: "ב4",
        number: 12,
        chapter: "ב",
        type: "counterexample",
        topic: "dual_space",
        points: 6,
        summary:
          '$V,W$ ממ"ס, $f:V\\to W$ ל"ל. $f^\\vee$ חח"ע ⟹ $f$ על (EXCLUDED)',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2015 (תשע"ה)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2015_א_I",
    year: 2015,
    moed: "א",
    semester: "spring",
    date: "16.07.15",
    lecturers: ["מר בוריס ביגון", "פרופ' עזריאל לוי", 'ד"ר קלואי פרין', "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 106,
    verified: true,
    parts: [
      { name: "חלק א'", points: 23, choose: 1, from: ["ג1", "א1"] },
      { name: "חלק ב'", points: 63, choose: 3, from: ["ב1", "ג2", "ג3", "ג4"] },
      { name: "חלק ג'", points: 20, choose: 1, from: ["ג5", "ג6"] },
    ],
    questions: [
      {
        id: "ג1",
        number: 1,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint_invariant",
        points: 23,
        summary:
          '$V$ ממ"ס מעל $\\mathbb{F}=\\mathbb{C}$ או $\\mathbb{R}$, $T:V\\to V$ צמוד לעצמו. הניחו פולינום אופייני מתפרק לגורמים. א) $U\\subseteq V$ $T$-אינווריאנטי ⟹ $T(U^\\perp)\\subseteq U^\\perp$ (כלומר $U^\\perp$ $T$-אינווריאנטי); ב) קיים בסיס אורתונורמלי של ו"ע של $T$; ג) במקרה $\\mathbb{F}=\\mathbb{C}$, ע"ע ממשיים',
        subparts: [
          {
            id: "א",
            points: 8,
            type: "proof_short",
            topic: "self_adjoint_invariant",
            summary: "$U$ $T$-אינווריאנטי ⟹ $U^\\perp$ $T$-אינווריאנטי",
          },
          {
            id: "ב",
            points: 8,
            type: "proof_short",
            topic: "spectral_theorem_real",
            summary: 'קיים בסיס אורתונורמלי של ו"ע של $T$',
          },
          {
            id: "ג",
            points: 7,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '(אם $\\mathbb{F}=\\mathbb{C}$) ע"ע ממשיים',
          },
        ],
      },
      {
        id: "א1",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "alg_geo_multiplicity",
        points: 23,
        summary:
          '$V$ ממ"ס, $T:V\\to V$, $U\\subseteq V$ ת"מ $T$-אינווריאנטי, $S=T|_U$. א) $\\chi_S(t)|\\chi_T(t)$; ב) הסיקו: ריבוי אלגברי של $\\lambda\\geq$ ריבוי גאומטרי',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "char_polynomial",
            summary: "$\\chi_S|\\chi_T$",
          },
          {
            id: "ב",
            points: 11,
            type: "proof_short",
            topic: "alg_geo_multiplicity",
            summary: "ריבוי אלגברי $\\geq$ גאומטרי",
          },
        ],
      },
      {
        id: "ב1",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "dual_space",
        points: 21,
        summary:
          "$V=\\mathbb{R}_{\\leq1}[t]$, $\\varphi^1,\\varphi^2\\in V^\\vee$: $\\varphi^1(p)=\\int_{-1}^1 p(t)dt$, $\\varphi^2(p)=\\int_0^1 p(t)dt$. א) $\\mathcal{C}=(\\varphi^1,\\varphi^2)$ בסיס $V^\\vee$; ב) $B$ בסיס $V$: $B^\\vee=\\mathcal{C}$; ג) $\\phi(p)=p(0)+p'(0)$, $[\\phi]_\\mathcal{C}$; ד) $D:V\\to V$ גזירה, $[D^\\vee]_\\mathcal{C}$ (EXCLUDED — מרחב דואלי)",
      },
      {
        id: "ג2",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "unitary_diagonalization",
        points: 21,
        summary:
          '$A=\\begin{pmatrix}1&0\\\\1+i&i\\end{pmatrix}\\in M_2(\\mathbb{C})$. א) פולינום אופייני, $A$ ניתנת ללכסון; ב) $D,P\\in M_2(\\mathbb{C})$, $P$ הפיכה, $D$ אלכסונית: $D=P^{-1}AP$; ג) בסיס $\\mathbb{C}^2$ המורכב מו"ע של $A$; ד) חשבו $A^{100}$',
        subparts: [
          {
            id: "א",
            points: 4,
            type: "compute",
            topic: "char_polynomial",
            summary: "פולינום אופייני, $A$ ניתנת ללכסון",
          },
          {
            id: "ב",
            points: 6,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "$D=P^{-1}AP$",
          },
          {
            id: "ג",
            points: 5,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'בסיס $\\mathbb{C}^2$ של ו"ע',
          },
          {
            id: "ד",
            points: 6,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "חשבו $A^{100}$",
          },
        ],
      },
      {
        id: "ג3",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 21,
        summary:
          '$V=\\mathbb{R}^3_{col}$, $U=\\{x+y+z=0\\}$. א) בסיס אורתוגונלי ל-$U$; ב) בסיס ל-$U^\\perp$; ג) הטלה של $(2,1,3)^t$ על $U$; ד) מרחק $(2,1,3)^t$ מ-$U$; ה) $p_U:V\\to V$ ע"ע, מרחבים עצמיים, האם לכסין?',
        subparts: [
          {
            id: "א",
            points: 4,
            type: "compute",
            topic: "gram_schmidt",
            summary: "בסיס אורתוגונלי ל-$U$",
          },
          {
            id: "ב",
            points: 3,
            type: "compute",
            topic: "orthogonal_complement",
            summary: "בסיס ל-$U^\\perp$",
          },
          {
            id: "ג",
            points: 4,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "הטלה של $(2,1,3)^t$ על $U$",
          },
          {
            id: "ד",
            points: 4,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "מרחק $(2,1,3)^t$ מ-$U$",
          },
          {
            id: "ה",
            points: 6,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'ע"ע ומ"ע של $p_U$, האם לכסין?',
          },
        ],
      },
      {
        id: "ג4",
        number: 6,
        chapter: "ב",
        type: "compute",
        topic: "bilinear_form",
        points: 21,
        summary:
          '$g_A:\\mathbb{R}^3_{col}\\times\\mathbb{R}^3_{col}\\to\\mathbb{R}$, $A=\\begin{pmatrix}1&0&2\\\\0&-1&0\\\\2&0&a\\end{pmatrix}$. א) $D,P\\in M_3(\\mathbb{R})$, $P$ הפיכה, $D$ אלכסונית: $D=P^tAP$; ב) ערך $a$: $g_A$ מנוונת; ג) $\\ker g_A=\\{v: g_A(v,w)=0\\,\\forall w\\}$ — ת"מ של $\\mathbb{R}^3_{col}$; ד) $a$ עם סיגנטורה $(2,1)$, מספר $+$, מספר $-$, מימד הגרעין; ה) $U$ במימד מקסימלי: $g_A$ חיובית בהחלט על $U$ (EXCLUDED)',
      },
      {
        id: "ג5",
        number: 7,
        chapter: "ג",
        type: "proof_short",
        topic: "dual_space",
        points: 20,
        summary:
          '$V$ ממ"ס, $W\\subseteq V$ ת"מ. א) $\\varphi^1,\\ldots,\\varphi^m:V\\to\\mathbb{F}$ פונקציונלים, $\\psi^i=\\varphi^i|_W$. א) $\\psi^1,\\ldots,\\psi^m$ בת"ל ב-$W^\\vee$ ⟺ $\\varphi^1,\\ldots,\\varphi^m$ בת"ל ב-$V^\\vee$; ב) $\\{\\psi^1,\\ldots,\\psi^m\\}$ פורשת $W^\\vee$ ⟺ $\\{\\varphi^1,\\ldots,\\varphi^m\\}$ פורשת $V^\\vee$; ב) $(\\psi^1,\\ldots,\\psi^k)$ בסיס של $W^\\vee$ ⟹ קיים בסיס $(\\varphi^1,\\ldots,\\varphi^n)$ של $V^\\vee$ עם $\\varphi^i|_W=\\psi^i$ לכל $1\\leq i\\leq k$ (EXCLUDED)',
      },
      {
        id: "ג6",
        number: 8,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 20,
        summary:
          '$A\\in M_n(\\mathbb{R})$ אנטי-סימטרית ($A^t=-A$). א) ע"ע $\\lambda\\in\\mathbb{R}$ ⟹ $\\lambda=0$; ב) $c\\in\\mathbb{R}$, $I+cA$ הפיכה; ג) $B=(I-A)(I+A)^{-1}$ אורתוגונלית ו-$\\det B=1$',
        subparts: [
          {
            id: "א",
            points: 6,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '$\\lambda\\in\\mathbb{R}$ ע"ע ⟹ $\\lambda=0$',
          },
          {
            id: "ב",
            points: 6,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "$I+cA$ הפיכה",
          },
          {
            id: "ג",
            points: 8,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: "$B=(I-A)(I+A)^{-1}$ אורתוגונלית ו-$\\det B=1$",
          },
        ],
      },
    ],
  },
  {
    code: "2015_ב_I",
    year: 2015,
    moed: "ב",
    semester: "spring",
    date: "16.08.15",
    lecturers: ["מר בוריס ביגון", "פרופ' עזריאל לוי", 'ד"ר קלואי פרין', "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 106,
    verified: true,
    parts: [
      { name: "חלק א'", points: 23, choose: 1, from: ["ג1", "א1"] },
      { name: "חלק ב'", points: 63, choose: 3, from: ["ג2", "ג3", "ג4", "ג5"] },
      { name: "חלק ג'", points: 20, choose: 1, from: ["ב1", "ג6"] },
    ],
    questions: [
      {
        id: "ג1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "gram_schmidt",
        points: 23,
        summary:
          '$(V,\\langle,\\rangle)$ ממ"ס מעל $\\mathbb{R}$, $(v_1,\\ldots,v_n)$ בסיס סדור ל-$V$. הוכיחו: קיים בסיס אורתונורמלי סדור $(u_1,\\ldots,u_n)$ ל-$V$ כך שלכל $1\\leq k\\leq n$: $\\mathrm{span}\\{u_1,\\ldots,u_k\\}=\\mathrm{span}\\{v_1,\\ldots,v_k\\}$',
      },
      {
        id: "א1",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "eigenvectors_independent",
        points: 23,
        summary:
          '$\\mathbb{F}$ שדה, $V$ ממ"ס, $T:V\\to V$ ל"ל, $k\\in\\mathbb{N}$, $\\lambda_1,\\ldots,\\lambda_k$ ע"ע שונים זה מזה של $T$ עם ו"ע $v_1,\\ldots,v_k$ (כלומר $Tv_i=\\lambda_iv_i$ בהתאמה). הוכיחו $(v_1,\\ldots,v_k)$ בת"ל',
      },
      {
        id: "ג2",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "dual_space",
        points: 21,
        summary:
          "$V=\\mathbb{R}_{\\leq2}[x]$, $\\varphi_0,\\varphi_1,\\varphi_2\\in V^\\vee$: $\\varphi_i(p)=p^{(i)}(0)$. א) $\\mathcal{C}=(\\varphi^0,\\varphi^1,\\varphi^2)$ בסיס $V^\\vee$; ב) $B=(p_0,p_1,p_2)$ בסיס $V$: $B^\\vee=\\mathcal{C}$; ג) $\\phi(p)=\\int_0^1 p(t)dt$, $[\\phi]_\\mathcal{C}$; ד) $D:V\\to V$, $D(p)=p'$, $[D^\\vee]_\\mathcal{C}$ (EXCLUDED — מרחב דואלי)",
      },
      {
        id: "ג3",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        points: 21,
        summary:
          '$A=\\begin{pmatrix}2&-1&-1\\\\-1&2&-1\\\\-1&-1&2\\end{pmatrix}\\in M_3(\\mathbb{R})$. א) ע"ע ופולינום אופייני $\\chi_A$; ב) בסיס אורתונורמלי ל-$\\mathbb{R}^3_{col}$ של ו"ע מתאימים של $A$ (ביחס למ"פ סטנ\'); ג) $O,D\\in M_3(\\mathbb{R})$, $O$ אורתוגונלית, $D$ אלכסונית: $D=O^{-1}AO$; ד) חשבו $\\mathrm{tr}(A^{10})$',
        subparts: [
          {
            id: "א",
            points: 5,
            type: "compute",
            topic: "char_polynomial",
            summary: 'ע"ע ופולינום אופייני',
          },
          {
            id: "ב",
            points: 6,
            type: "compute",
            topic: "gram_schmidt",
            summary: 'בסיס אורתונורמלי של ו"ע',
          },
          {
            id: "ג",
            points: 6,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "$O$ אורתוגונלית, $D$ אלכסונית: $D=O^{-1}AO$",
          },
          {
            id: "ד",
            points: 4,
            type: "compute",
            topic: "trace_basics",
            summary: "חשבו $\\mathrm{tr}(A^{10})$",
          },
        ],
      },
      {
        id: "ג4",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "gram_schmidt",
        points: 21,
        summary:
          "$V=\\mathbb{R}_{\\leq2}[x]$, $\\langle p,q\\rangle=\\int_{-1}^1 p(x)q(x)dx$. $p_1(x)=1, p_2(x)=\\alpha+x, p_3(x)=\\beta+\\gamma x+x^2$. א) ערכים $\\alpha,\\beta,\\gamma\\in\\mathbb{R}$ עבורם $(p_1,p_2,p_3)$ בסיס אורתוגונלי ל-$V$; ב) $W=\\mathrm{span}\\{x,x^2\\}$, $P_W:V\\to V$ הטלה אורתוגונלית, חשבו $P_W(1)$; ג) בסיס ל-$W^\\perp$; ד) מרחק הפולינום הקבוע 1 מ-$W$",
        subparts: [
          {
            id: "א",
            points: 6,
            type: "compute",
            topic: "gram_schmidt",
            summary: "ערכי $\\alpha,\\beta,\\gamma$ עבור בסיס אורתוגונלי",
          },
          {
            id: "ב",
            points: 5,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "$P_W(1)$",
          },
          {
            id: "ג",
            points: 4,
            type: "compute",
            topic: "orthogonal_complement",
            summary: "בסיס ל-$W^\\perp$",
          },
          {
            id: "ד",
            points: 6,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "מרחק 1 מ-$W$",
          },
        ],
      },
      {
        id: "ג5",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "bilinear_form",
        points: 21,
        summary:
          "$V=M_2(\\mathbb{R})$, $g(A,B)=\\mathrm{tr}(AB)$. א) מטריצה $C$ המייצגת את $g$ ב-$B=(e_{11},e_{12},e_{21},e_{22})$; ב) $P,D\\in M_4(\\mathbb{R})$, $P$ הפיכה, $D$ אלכסונית: $D=P^tCP$; ג) הסיגנטורה של $g$; ד) הסיגנטורה של $g$ לתת-מרחב המטריצות בעלות עקבה 0 (EXCLUDED — תבניות)",
      },
      {
        id: "ב1",
        number: 7,
        chapter: "ג",
        type: "proof_short",
        topic: "dual_space",
        points: 20,
        summary:
          '$V$ ממ"ס, $W\\subseteq V$ ת"מ, $\\varphi^1,\\ldots,\\varphi^m:V\\to\\mathbb{F}$, $\\psi^i:=\\varphi^i|_W:W\\to\\mathbb{F}$. א) $\\psi^1,\\ldots,\\psi^m$ בת"ל ב-$W^\\vee$ ⟺ $\\varphi^i$ בת"ל; $\\{\\psi^i\\}$ פורשת ⟺ $\\{\\varphi^i\\}$ פורשת; ב) $(\\psi^1,\\ldots,\\psi^k)$ בסיס $W^\\vee$ ⟹ קיים בסיס $(\\varphi^1,\\ldots,\\varphi^n)$ של $V^\\vee$ עם $\\varphi^i|_W=\\psi^i$ (EXCLUDED)',
      },
      {
        id: "ג6",
        number: 8,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 20,
        summary:
          '$A\\in M_n(\\mathbb{R})$ אנטי-סימטרית ($A^t=-A$). א) ע"ע ממשי ⟹ $\\lambda=0$; ב) $c\\in\\mathbb{R}$ ⟹ $I+cA$ הפיכה; ג) $B:=(I-A)(I+A)^{-1}$ אורתוגונלית ו-$\\det B=1$',
        subparts: [
          {
            id: "א",
            points: 6,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '$\\lambda$ ממשי ע"ע ⟹ $\\lambda=0$',
          },
          {
            id: "ב",
            points: 6,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "$I+cA$ הפיכה",
          },
          {
            id: "ג",
            points: 8,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: "$B=(I-A)(I+A)^{-1}$ אורתוגונלית, $\\det B=1$",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2016 (תשע"ו) — new format: single block, no part division
  // ════════════════════════════════════════════════════════════════
  {
    code: "2016_א_I",
    year: 2016,
    moed: "א",
    semester: "spring",
    date: "12.07.16",
    lecturers: ["פרופ' עזריאל לוי", 'ד"ר קלואי פרין', "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "cyclic_subspace",
        points: 25,
        summary:
          'א) $T:\\mathbb{R}^4\\to\\mathbb{R}^4$, $T(x,y,z,w)=(2y-z,-x+w,2w+x,3z-y)$, $U$ ת"מ הציקלי ביחס ל-$T$ ע"י $(0,0,0,1)$: בסיס, פולינום אופייני של $T|_U$, קיום ע"ע; ב) $V$ ממ"פ ממ"ס, $U\\subseteq V$ ⟹ $(U^\\perp)^\\perp=U$',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "compute",
            topic: "cyclic_subspace",
            summary: 'בסיס של תת-מרחב הציקלי שנוצר ע"י $(0,0,0,1)$',
          },
          {
            id: "א.ii",
            points: 5,
            type: "compute",
            topic: "char_polynomial",
            summary: "פולינום אופייני של $T|_U$",
          },
          {
            id: "א.iii",
            points: 5,
            type: "proof_short",
            topic: "eigenvalue_definition",
            summary: 'ל-$T$ קיים ע"ע',
          },
          {
            id: "ב",
            points: 10,
            type: "proof_short",
            topic: "orthogonal_complement",
            summary: "$(U^\\perp)^\\perp=U$",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "compute",
        topic: "diagonalization_compute",
        points: 25,
        summary:
          'א) $T:\\mathbb{C}^4\\to\\mathbb{C}^4$, $T(x_1,x_2,x_3,x_4)=(x_4,x_1,x_2,x_3)$: פולינום אופייני, ע"ע, בסיס $\\mathbb{C}^4$ של ו"ע; ב) $V$ ממ"פ ממ"ס, $P:V\\to V$ עם $P^2=P$ ⟹ $P$ צמוד לעצמו אמ"מ $P$ הטלה אורתוגונלית',
        subparts: [
          {
            id: "א.i",
            points: 4,
            type: "compute",
            topic: "char_polynomial",
            summary: "פולינום אופייני של $T$ (פרמוטציה ציקלית)",
          },
          {
            id: "א.ii",
            points: 4,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'ע"ע של $T$',
          },
          {
            id: "א.iii",
            points: 5,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'בסיס $\\mathbb{C}^4$ של ו"ע',
          },
          {
            id: "ב",
            points: 12,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$P^2=P$, $P$ צמוד ⟺ $P$ הטלה אורתוגונלית",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 25,
        summary:
          "א) $A=\\begin{pmatrix}1&1&1\\\\-1&-1&-1\\\\1&1&0\\end{pmatrix}$ נילפוטנטית: $k$ מינימלי, $J$ ז'ורדן, $P$ הפיכה: $J=P^{-1}AP$; ב) $V$, $g$ ביליניארית סימטרית, $B,B'$ בסיסים — $G,G'$ חופפות (EXCLUDED לסעיף ב')",
        subparts: [
          {
            id: "א.i",
            points: 4,
            type: "compute",
            topic: "nilpotent_basic",
            summary: "$k$ מינימלי: $A^k=0$",
          },
          {
            id: "א.ii",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "$J$ ז'ורדן הדומה ל-$A$",
          },
          {
            id: "א.iii",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "$P$ הפיכה: $J=P^{-1}AP$",
          },
          {
            id: "ב",
            points: 9,
            type: "proof_short",
            topic: "bilinear_form",
            summary: "$G,G'$ מטריצות מייצגות חופפות (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "א",
        type: "compute",
        topic: "primary_decomposition",
        points: 25,
        summary:
          'א) מ"פ $\\langle\\binom{x_1}{x_2}|\\binom{y_1}{y_2}\\rangle=x_1y_1-x_1y_2-x_2y_1+4x_2y_2$ על $\\mathbb{R}^2$, $T(x_1,x_2)=(4x_1,x_2)$: בסיס אורתונורמלי, מטריצת $T^*$; ב) $V$ ממ"ס, $T$, $p=p_1p_2$ עם $\\gcd(p_1,p_2)=1$, $p(T)=0$ ⟹ $V=\\ker p_1(T)\\oplus\\ker p_2(T)$',
        subparts: [
          {
            id: "א.i",
            points: 6,
            type: "compute",
            topic: "gram_schmidt",
            summary: 'בסיס אורתונורמלי ביחס למ"פ הנתונה',
          },
          {
            id: "א.ii",
            points: 7,
            type: "compute",
            topic: "adjoint_operator",
            summary: "מטריצת $T^*$",
          },
          {
            id: "ב",
            points: 12,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: "$V=\\ker p_1(T)\\oplus\\ker p_2(T)$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "א",
        type: "compute",
        topic: "cyclic_subspace",
        points: 25,
        summary:
          "א) $g_A$ עם $A=\\begin{pmatrix}1&2&-1\\\\2&5&-1\\\\-1&-1&1\\end{pmatrix}$: בסיס אורתוגונלי, $G$ המייצגת, $0\\neq v: g(v,v)=0$ (EXCLUDED לסעיף א'); ב) $V$ ממ\"ס, $T:V\\to V$, $v\\in V$, $T^kv\\in\\mathrm{Span}(v,Tv,\\ldots,T^{k-1}v)$ עם $k$ מינימלי ⟹ $T^mv\\in\\mathrm{Span}(...)$ לכל $m$",
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "compute",
            topic: "bilinear_form",
            summary: "בסיס אורתוגונלי ל-$g$ (EXCLUDED)",
          },
          {
            id: "א.ii",
            points: 4,
            type: "compute",
            topic: "bilinear_form",
            summary: "מטריצה $G$ המייצגת ב-$B$ (EXCLUDED)",
          },
          {
            id: "א.iii",
            points: 4,
            type: "compute",
            topic: "bilinear_form",
            summary: "$0\\neq v$: $g(v,v)=0$ (EXCLUDED)",
          },
          {
            id: "ב",
            points: 12,
            type: "proof_short",
            topic: "cyclic_subspace",
            summary: "$T^mv\\in\\mathrm{Span}(v,\\ldots,T^{k-1}v)$ לכל $m$",
          },
        ],
      },
    ],
  },
  {
    code: "2016_ב_I",
    year: 2016,
    moed: "ב",
    semester: "spring",
    date: "15.08.16",
    lecturers: ["פרופ' עזריאל לוי", 'ד"ר קלואי פרין', "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ב",
        chapters: ["ב", "ג"],
        type: "compute",
        topic: "jordan_form",
        points: 25,
        summary:
          'א) $A=\\begin{pmatrix}0&-1\\\\9&6\\end{pmatrix}\\in M_2(\\mathbb{C})$: ע"ע, $J$ ז\'ורדן, $P$ הפיכה: $J=P^{-1}AP$; ב) $V$ ממ"פ ממ"ס, $B=(b_1,\\ldots,b_n)$ בסיס אורתונורמלי. הוכיחו: (i) $[v]_B=([\\langle b_i|v\\rangle])^t$; (ii) $\\langle v|w\\rangle=[v]_B^t\\overline{[w]_B}$',
        subparts: [
          {
            id: "א.i",
            points: 4,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'ע"ע של $A$',
          },
          {
            id: "א.ii",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "$J$ ז'ורדן",
          },
          {
            id: "א.iii",
            points: 5,
            type: "compute",
            topic: "jordan_form",
            summary: "$P$ הפיכה: $J=P^{-1}AP$",
          },
          {
            id: "ב.i",
            points: 5,
            type: "proof_short",
            topic: "orthonormal_basis",
            summary: "$[v]_B=([\\langle b_i|v\\rangle])^t$",
          },
          {
            id: "ב.ii",
            points: 5,
            type: "proof_short",
            topic: "orthonormal_basis",
            summary: "$\\langle v|w\\rangle=[v]_B^t\\overline{[w]_B}$",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "compute",
        topic: "gram_schmidt",
        points: 25,
        summary:
          'א) $\\mathbb{R}^4_{col}$, $(v_0,v_1,v_2)$: גרם-שמידט לבסיס אורתונורמלי $B$ של Span; חשבו $[v_2]_B$; ב) $V$ ממ"ס, $T,S:V\\to V$, $T$ עם $n$ ע"ע שונים ⟹ $TS=ST$ אמ"מ כל ו"ע של $T$ הוא ו"ע של $S$',
        subparts: [
          {
            id: "א.i",
            points: 8,
            type: "compute",
            topic: "gram_schmidt",
            summary: "גרם-שמידט על $(v_0,v_1,v_2)$",
          },
          {
            id: "א.ii",
            points: 4,
            type: "compute",
            topic: "orthonormal_basis",
            summary: "חשבו $[v_2]_B$",
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "diagonalization",
            summary: '$TS=ST$ ⟺ ו"ע של $T$ הם ו"ע של $S$',
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 25,
        summary:
          "א) ב-$\\mathbb{R}^3_{col}$, מצאו $\\binom{x}{y}$ עם מרחק מינימלי בין $\\binom{10}{3,2}$ ל-$\\begin{pmatrix}1&1\\\\1&2\\\\1&3\\end{pmatrix}\\binom{x}{y}$; ב) $T$ אופ' על $V$, $U\\subseteq V$ $T$-אינווריאנטי ⟹ $\\chi_{T|_U}|\\chi_T$",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "(x,y) עם מרחק מינימלי",
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "char_polynomial",
            summary: "$\\chi_{T|_U}|\\chi_T$",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        points: 25,
        summary:
          'א) $A=\\begin{pmatrix}1&2&0\\\\2&0&2\\\\0&2&-1\\end{pmatrix}$ עם ע"ע $-3,0,3$: בסיס אורתונורמלי של ו"ע, $O$: $O^{-1}AO$ אלכסונית; ב) $V$, $T:V\\to V$, $T^2+T+I=0$. (i) $a,b\\in F$: $p(T)=aI+bT$; (ii) $T$ הפיך, $q(X)$: $q(T)=T^{-1}$',
        subparts: [
          {
            id: "א.i",
            points: 8,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "בסיס אורתונורמלי",
          },
          {
            id: "א.ii",
            points: 5,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "$O$ אורתוגונלית: $O^{-1}AO$ אלכסונית",
          },
          {
            id: "ב.i",
            points: 5,
            type: "proof_short",
            topic: "cayley_hamilton",
            summary: "$p(T)=aI+bT$",
          },
          {
            id: "ב.ii",
            points: 7,
            type: "proof_short",
            topic: "cayley_hamilton",
            summary: "$q(T)=T^{-1}$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "compute",
        topic: "unitary_operator",
        points: 25,
        summary:
          'א) $q(x_1,x_2,x_3)=x_1^2-4x_1x_2+3x_2^2-6x_2x_3-9x_3^2$: מטריצת $g$, בסיס למשלים $\\binom{3}{1,0}^\\perp$, גרעין (EXCLUDED לסעיף א\'); ב) $V$ ממ"פ ממ"ס מעל $\\mathbb{C}$, $T$ אוניטרי, $\\lambda$ ע"ע ⟹ $|\\lambda|=1$',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "compute",
            topic: "quadratic_form",
            summary: "מטריצת $g$ ב-בסיס סטנ' (EXCLUDED)",
          },
          {
            id: "א.ii",
            points: 5,
            type: "compute",
            topic: "quadratic_form",
            summary: "בסיס למשלים $\\binom{3}{1,0}^\\perp$ (EXCLUDED)",
          },
          {
            id: "א.iii",
            points: 5,
            type: "compute",
            topic: "quadratic_form",
            summary: "$g$ מנוונת? בסיס לגרעין (EXCLUDED)",
          },
          {
            id: "ב",
            points: 10,
            type: "proof_short",
            topic: "unitary_operator",
            summary: '$|\\lambda|=1$ עבור ע"ע אוניטרי',
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2017 (תשע"ז)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2017_א_I",
    year: 2017,
    moed: "א",
    semester: "spring",
    date: "19.07.17",
    lecturers: ['ד"ר שאול זמל', 'ד"ר קלואי פרין', "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "true_false",
        topic: "eigenvalue_definition",
        points: 25,
        summary:
          'א) $A=(a^i_j)\\in M_n(\\mathbb{R})$: אלו מהטענות נכונות (הוכחה/דוגמה נגדית) — תנאים על שוויון סכומי שורות/עמודות (וסכומי ריבועים) הגוררים קיום ע"ע; ב) $g$ ביליניארית סימטרית עם מטריצת גרם נתונה, מצאו בסיס $B$ אלכסונה (EXCLUDED לסעיף ב\')',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "true_false",
            topic: "eigenvalue_definition",
            summary: "סכום איברי כל שורה שווה ⟹ קיים ע\"ע?",
          },
          {
            id: "א.ii",
            points: 5,
            type: "true_false",
            topic: "eigenvalue_definition",
            summary: "תנאי על העמודות ⟹ קיים ע\"ע?",
          },
          {
            id: "א.iii",
            points: 5,
            type: "true_false",
            topic: "eigenvalue_definition",
            summary: "תנאי על סכומי ריבועים ⟹ קיים ע\"ע?",
          },
          {
            id: "ב",
            points: 10,
            type: "compute",
            topic: "bilinear_form",
            summary: "בסיס $B$ עם מטריצת גרם אלכסונית (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 25,
        summary:
          'א) $f:V\\to V$ ל"ל, $V$ ממ"פ. הוכיחו שקילות: (i) $\\langle f(v)|f(w)\\rangle=\\langle v|w\\rangle$ לכל $v,w$; (ii) $\\|f(v)\\|=\\|v\\|$ לכל $v$; ב) $A=\\begin{pmatrix}1&1&1&-1\\\\-1&1&-1&1\\\\0&0&-1&1\\\\0&0&-1&-1\\end{pmatrix}\\in M_4(\\mathbb{C})$: פולינום אופייני, ע"ע, האם $A$ לכסינה?',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: '(i)⟺(ii) שמירת מ"פ ⟺ שמירת נורמה',
          },
          {
            id: "ב.i",
            points: 5,
            type: "compute",
            topic: "char_polynomial",
            summary: "פולינום אופייני של $A$",
          },
          {
            id: "ב.ii",
            points: 5,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'ע"ע של $A$',
          },
          {
            id: "ב.iii",
            points: 5,
            type: "counterexample",
            topic: "diagonalization",
            summary: "האם $A$ לכסינה ב-$M_4(\\mathbb{C})$?",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_projection",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס, $U\\subseteq V$, $U^\\perp$ המשלים. (i) $P_U+P_{U^\\perp}=\\mathrm{Id}$; (ii) $P_U\\circ P_{U^\\perp}=0$; ב) $\\mathbb{R}^5_{col}$ עם מ"פ סטנ\', $U=\\mathrm{Span}((1,1,1,1,1)^t), W=\\{x_1+\\ldots+x_5=0\\}$. חשבו (i) מטריצת $P_U$; (ii) מטריצת $P_W$',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$P_U+P_{U^\\perp}=\\mathrm{Id}$",
          },
          {
            id: "א.ii",
            points: 5,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$P_U\\circ P_{U^\\perp}=0$",
          },
          {
            id: "ב.i",
            points: 7,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "מטריצת $P_U$",
          },
          {
            id: "ב.ii",
            points: 8,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "מטריצת $P_W$",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ב",
        type: "proof_short",
        topic: "self_adjoint_invariant",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס, $f$, $W\\subseteq V$ $f$-אינווריאנטי ⟹ $W^\\perp$ הוא $f^*$-אינווריאנטי; ב) $A=\\begin{pmatrix}-2&1&0&-1\\\\-2&1&0&-1\\\\-2&1&0&-1\\\\2&-1&0&1\\end{pmatrix}$ נילפוטנטית: $k$ מינימלי, $J$ ז\'ורדן, $P$',
        subparts: [
          {
            id: "א",
            points: 9,
            type: "proof_short",
            topic: "self_adjoint_invariant",
            summary: "$W$ $f$-אינ' ⟹ $W^\\perp$ $f^*$-אינ'",
          },
          {
            id: "ב.i",
            points: 4,
            type: "compute",
            topic: "nilpotent_basic",
            summary: "$k$ מינימלי: $A^k=0$",
          },
          {
            id: "ב.ii",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "$J$ ז'ורדן",
          },
          {
            id: "ב.iii",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "$P$ הפיכה: $J=P^{-1}AP$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "counterexample",
        topic: "spectral_theorem_real",
        points: 25,
        summary:
          "א) $V=\\mathbb{R}_{\\leq3}[X]$, 2 ניסיונות תיקון של $\\langle P|Q\\rangle=\\int P'Q+PQ'$ ו-$\\langle P|Q\\rangle=P(0)Q(0)+\\int P'Q'$ — מ\"פ פנימיות?; ב) $A=\\begin{pmatrix}0&2&2\\\\2&0&2\\\\2&2&0\\end{pmatrix}$ עם ע\"ע $-2,4$: בסיס אורתונורמלי של ו\"ע, $O$ אורתוגונלית: $O^{-1}AO$ אלכסונית",
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "counterexample",
            topic: "inner_product_axioms",
            summary: "האם $h(P,Q)=\\int P'Q+PQ'$ מ\"פ פנימית?",
          },
          {
            id: "א.ii",
            points: 5,
            type: "counterexample",
            topic: "inner_product_axioms",
            summary: "האם $k(P,Q)=P(0)Q(0)+\\int P'Q'$ מ\"פ פנימית?",
          },
          {
            id: "ב.i",
            points: 8,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: 'בסיס אורתונורמלי של ו"ע',
          },
          {
            id: "ב.ii",
            points: 7,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "$O$ אורתוגונלית: $O^{-1}AO$ אלכסונית",
          },
        ],
      },
    ],
  },
  {
    code: "2017_ב_I",
    year: 2017,
    moed: "ב",
    semester: "spring",
    date: "21.08.17",
    lecturers: ['ד"ר שאול זמל', 'ד"ר קלואי פרין', "מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "gram_schmidt",
        points: 25,
        summary:
          'א) $V$ ממ"פ פנימית, $(b_1,b_2,b_3)$ בת"ל ⟹ קיים $(u_1,u_2,u_3)$ אורתונורמלי עם $\\mathrm{Span}(u_1,\\ldots,u_i)=\\mathrm{Span}(b_1,\\ldots,b_i)$ לכל $i$; ב) $\\mathbb{R}^4_{col}$ עם מ"פ סטנ\', $U=\\{x+y+z+t=0,x-t=0\\}$, $P_U$ — מצאו מטריצת $P_U$ ב-בסיס סטנ\'',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_theorem",
            topic: "gram_schmidt",
            summary: "תהליך גרם-שמידט סדור",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "מטריצת $P_U$ ב-בסיס סטנ'",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_projection",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{R}$, $U$ ת"מ, $P_U$ הטלה. הוכיחו $\\|v-P_U(v)\\|\\leq\\|v-u\\|$ לכל $u\\in U$; ב) $V=\\mathbb{R}_{\\leq3}[X]$, $f(a+bX+cX^2+dX^3):=aX+bX^2+cX^3$. (i) האם יש ל-$f$ ע"ע? (ii) האם $f$ לכסין?',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$\\|v-P_U(v)\\|\\leq\\|v-u\\|$",
          },
          {
            id: "ב.i",
            points: 7,
            type: "compute",
            topic: "eigenvalue_definition",
            summary: 'ע"ע של $f$',
          },
          {
            id: "ב.ii",
            points: 6,
            type: "compute",
            topic: "diagonalization",
            summary: "האם $f$ לכסין?",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{C}$, $f$ צמוד לעצמו, $\\lambda\\neq\\mu$ ע"ע, $u,v$ ו"ע ⟹ $\\langle u|v\\rangle=0$; ב) $A=\\begin{pmatrix}1&\\alpha\\\\\\alpha&0\\end{pmatrix}$ עם $\\alpha=1+i\\sqrt{3}$, מצאו $P\\in M_2(\\mathbb{C})$: $P^tAP=I$ (EXCLUDED לסעיף ב\')',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "self_adjoint",
            summary: 'ו"ע לע"ע שונים אורתוגונליים',
          },
          {
            id: "ב",
            points: 15,
            type: "compute",
            topic: "bilinear_form",
            summary: "$P$: $P^tAP=I$ (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 25,
        summary:
          'א) $V$ ממ"פ פנימית מעל $\\mathbb{R}$, $f^3=\\mathrm{Id}_V$. הוכיחו $g(u,v):=\\langle u|v\\rangle+\\langle fu|fv\\rangle+\\langle f^2u|f^2v\\rangle$ מ"פ ש-$f$ אורתוגונלי ביחס אליה; ב) $A=\\begin{pmatrix}a&1&1&1&1\\\\1&a&1&1&1\\\\1&1&a&1&1\\\\1&1&1&a&1\\\\1&1&1&1&a\\end{pmatrix}$. (i) $a-1$ ע"ע, מימד $V_{a-1}$; (ii) $a+4$ ע"ע; (iii) $A$ לכסינה',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: '$g$ מ"פ פנימית עם $f$ אורתוגונלי',
          },
          {
            id: "ב.i",
            points: 6,
            type: "compute",
            topic: "alg_geo_multiplicity",
            summary: '$a-1$ ע"ע, מימד $V_{a-1}$',
          },
          {
            id: "ב.ii",
            points: 5,
            type: "compute",
            topic: "diagonalization_compute",
            summary: '$a+4$ ע"ע',
          },
          {
            id: "ב.iii",
            points: 4,
            type: "proof_short",
            topic: "diagonalization",
            summary: "$A$ לכסינה",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "counterexample",
        topic: "cauchy_schwarz",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס, $f,g$ אופ\', $v\\in V$ ו"ע משותף של $f\\circ g$ ושל $g\\circ f$. (i) $g$ הפיך ⟹ $v$ ו"ע של $g$? (ii) $f$ הפיך ⟹ $v$ ו"ע של $g$?; ב) $a,b,c\\in\\mathbb{R}$ שאינם כולם 0: $100a+10b+c<101\\sqrt{a^2+b^2+c^2}$',
        subparts: [
          {
            id: "א.i",
            points: 6,
            type: "counterexample",
            topic: "diagonalization",
            summary: '$g$ הפיך ⟹ $v$ ו"ע של $g$?',
          },
          {
            id: "א.ii",
            points: 6,
            type: "counterexample",
            topic: "diagonalization",
            summary: '$f$ הפיך ⟹ $v$ ו"ע של $g$?',
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary: "$100a+10b+c<101\\sqrt{a^2+b^2+c^2}$",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2018 (תשע"ח)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2018_א_I",
    year: 2018,
    moed: "א",
    semester: "spring",
    date: "18.07.18",
    lecturers: ['ד"ר שאול זמל', "פרופ' ערן נבו", 'ד"ר קלואי פרין'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "adjoint_operator",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס, $T:V\\to V$. הוכיחו קיום $T^*$ ל"ל יחיד עם $\\langle T^*(u)|v\\rangle=\\langle u|T(v)\\rangle$; ב) $A=\\begin{pmatrix}1&a&1&0\\\\0&1&b&2\\\\0&0&2&c\\\\0&0&0&2\\end{pmatrix}$. קבעו $a,b,c$ עבורם $A$ לכסינה',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_theorem",
            topic: "adjoint_operator",
            summary: "קיום ויחידות $T^*$",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "$a,b,c$ עבורם $A$ לכסינה",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ב",
        type: "proof_short",
        topic: "nilpotent_basic",
        points: 25,
        summary:
          'א) $V$, $T$ נילפוטנטי, $0\\neq v$, $k$ מינימלי $T^k v=0$ ⟹ $\\{v,Tv,\\ldots,T^{k-1}v\\}$ בת"ל; ב) $\\langle\\binom{x_1}{x_2}|\\binom{y_1}{y_2}\\rangle=5x_1y_1+2x_2y_1+2x_1y_2+x_2y_2$ על $\\mathbb{R}^2$. (i) מ"פ פנימית?; (ii) גרם-שמידט על בסיס סטנ\'',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "nilpotent_basic",
            summary: '$\\{v,Tv,\\ldots,T^{k-1}v\\}$ בת"ל',
          },
          {
            id: "ב.i",
            points: 7,
            type: "proof_short",
            topic: "inner_product_axioms",
            summary: '$\\langle\\cdot|\\cdot\\rangle$ מ"פ פנימית',
          },
          {
            id: "ב.ii",
            points: 8,
            type: "compute",
            topic: "gram_schmidt",
            summary: "גרם-שמידט על בסיס סטנ'",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ב",
        type: "proof_short",
        topic: "matrix_similarity",
        points: 25,
        summary:
          "א) $V$ ממ\"ס, $\\mathrm{char}\\,F\\neq 2$, $g$ ביליניארית סימטרית, $q$ ריבועית. (i) $g(u,v)=(q(u+v)-q(u-v))/4$; (ii) $g\\neq0$ ⟹ קיים $0\\neq v: q(v)\\neq0$ (EXCLUDED לסעיף א'); ב) $A=\\begin{pmatrix}0&0&0\\\\1&0&-4\\\\0&0&2\\end{pmatrix}, B=\\begin{pmatrix}0&-2&0\\\\0&2&0\\\\1&-3&0\\end{pmatrix}$: האם דומות?",
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "bilinear_form",
            summary: "$g(u,v)=(q(u+v)-q(u-v))/4$ (EXCLUDED)",
          },
          {
            id: "א.ii",
            points: 5,
            type: "proof_short",
            topic: "bilinear_form",
            summary: "$g\\neq0$ ⟹ קיים $v: q(v)\\neq0$ (EXCLUDED)",
          },
          {
            id: "ב",
            points: 15,
            type: "compute",
            topic: "matrix_similarity",
            summary: "האם $A,B$ דומות?",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "א",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 25,
        summary:
          'א) $V$, $T$, $\\lambda\\neq\\mu$ ע"ע, $v$ ו"ע ⟹ $v\\in V_\\lambda\\cup V_\\mu$ או $V_\\lambda+V_\\mu=V$; ב) $A=\\begin{pmatrix}9&12\\\\12&16\\end{pmatrix}$. (i) $O$ אורתוגונלית: $O^{-1}AO$ אלכסונית; (ii) $A$ אי-שלילית, $B$ סימטרית אי-שלילית: $B^2=A$',
        subparts: [
          {
            id: "א",
            points: 8,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: "$v\\in V_\\lambda\\cup V_\\mu$ או $V_\\lambda+V_\\mu=V$",
          },
          {
            id: "ב.i",
            points: 8,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "$O$ אורתוגונלית: $O^{-1}AO$ אלכסונית",
          },
          {
            id: "ב.ii",
            points: 9,
            type: "compute",
            topic: "self_adjoint",
            summary: "$B$ סימטרית אי-שלילית: $B^2=A$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "cauchy_schwarz",
        points: 25,
        summary:
          "א) (i) $A\\in M_n(\\mathbb{C}) ⟹ A,-A$ חופפות?; (ii) דוגמה $A\\neq0$: חופפות?; (iii) דוגמה לא חופפות? (EXCLUDED לסעיף א'); ב) $A,B\\in M_3(\\mathbb{R})$ עם $A^tB=I$ ⟹ $3\\leq\\sqrt{(\\sum a_{ij}^2)(\\sum b_{ij}^2)}$",
        subparts: [
          {
            id: "א.i",
            points: 4,
            type: "proof_short",
            topic: "bilinear_form",
            summary: "$A,-A$ חופפות (EXCLUDED)",
          },
          {
            id: "א.ii",
            points: 4,
            type: "counterexample",
            topic: "bilinear_form",
            summary: "דוגמה $A\\neq0$ חופפות (EXCLUDED)",
          },
          {
            id: "א.iii",
            points: 4,
            type: "counterexample",
            topic: "bilinear_form",
            summary: "דוגמה לא חופפות (EXCLUDED)",
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary:
              "$3\\leq\\sqrt{(\\sum a^2)(\\sum b^2)}$ — קושי-שוורץ למטריצות",
          },
        ],
      },
    ],
  },
  {
    code: "2018_ב_I",
    year: 2018,
    moed: "ב",
    semester: "spring",
    date: "20.08.18",
    lecturers: ['ד"ר שאול זמל', "פרופ' ערן נבו", 'ד"ר קלואי פרין'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "riesz_representation",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{R}$, $l:V\\to\\mathbb{R}$ פונקציונל. הוכיחו: קיים $u$ יחיד עם $l(v)=\\langle u|v\\rangle$; ב) המספר המקסימלי של $A\\in M_5(\\mathbb{C})$ אי-דומות זו לזו עם $\\mathrm{rk}(A+2I)=4$ ופ"א $p(x)=(x-1)^3(x+2)^2$, ולכל אחת מהן רשמו צורת ז\'ורדן',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_theorem",
            topic: "riesz_representation",
            summary: "משפט רייס",
          },
          {
            id: "ב.i",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "ספירת צורות ז'ורדן",
          },
          {
            id: "ב.ii",
            points: 7,
            type: "compute",
            topic: "jordan_form",
            summary: "צורות ז'ורדן ספציפיות",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "matrix_similarity",
        points: 25,
        summary:
          'א) $V$ ממ"ס, $T:V\\to V$, $k\\in\\mathbb{N}$ עם $\\mathrm{Im}\\,T^k=\\mathrm{Im}\\,T^{k+1}$. נסמן $U=\\mathrm{Im}\\,T^k$. (i) $U$ $T$-אינווריאנטי; (ii) $T|_U$ הפיך; ב) $A=\\begin{pmatrix}\\alpha&i\\alpha\\\\i\\alpha&\\alpha\\end{pmatrix}$, $\\alpha=1/\\sqrt{2}$. (i) $A$ צמודה לעצמה? (ii) $A$ אוניטרית? (iii) $U$ אוניטרית: $U^{-1}AU$ אלכסונית?',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "invariant_subspace",
            summary: "$U$ $T$-אינווריאנטי",
          },
          {
            id: "א.ii",
            points: 5,
            type: "proof_short",
            topic: "matrix_similarity",
            summary: "$T|_U$ הפיך",
          },
          {
            id: "ב.i",
            points: 4,
            type: "compute",
            topic: "self_adjoint",
            summary: "$A$ צמודה לעצמה?",
          },
          {
            id: "ב.ii",
            points: 4,
            type: "compute",
            topic: "unitary_operator",
            summary: "$A$ אוניטרית?",
          },
          {
            id: "ב.iii",
            points: 7,
            type: "compute",
            topic: "unitary_diagonalization",
            summary: "$U$ אוניטרית: $U^{-1}AU$ אלכסונית",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{R}$, $(b_i)$ בסיס אורתונורמלי, $T$ ⟹ $T$ אורתוגונלי אמ"מ $(T(b_i))$ בסיס אורתונורמלי; ב) $g$ ביליניארית סימטרית על $\\mathbb{R}^{2n}$ עם $g(e_i,e_j)=-1$ עבור $1\\leq i,j\\leq n$ או $n+1\\leq i,j\\leq 2n$, אחרת $g(e_i,e_j)=1$. (EXCLUDED לסעיף ב\')',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: "$T$ אורתוגונלי ⟺ ממפה בסיס אורתונורמלי",
          },
          {
            id: "ב.i",
            points: 5,
            type: "compute",
            topic: "bilinear_form",
            summary: "מטריצת $g$ (EXCLUDED)",
          },
          {
            id: "ב.ii",
            points: 5,
            type: "compute",
            topic: "bilinear_form",
            summary: "בסיס לגרעין (EXCLUDED)",
          },
          {
            id: "ב.iii",
            points: 5,
            type: "compute",
            topic: "bilinear_form",
            summary: '$D$ אלכסונית, $B$: $g$ מיוצגת ע"י $D$ (EXCLUDED)',
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "א",
        type: "proof_short",
        topic: "cyclic_subspace",
        points: 25,
        summary:
          'א) $V$ ממ"ס, $T:V\\to V$, $v\\in V$, $\\dim Z(T,v)=k$. (i) $\\dim Z(T,Tv)\\in\\{k,k-1\\}$; (ii) דוגמה $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ ו-$v$: $k=2$, $\\dim Z(T,Tv)=2$; (iii) דוגמה $k=2$, $\\dim Z(T,Tv)=1$; ב) $\\mathbb{R}[X]_{\\leq 2}$ עם $\\langle P|Q\\rangle=\\int_0^1 PQ$, מצאו בסיס אורתונורמלי',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "cyclic_subspace",
            summary: "$\\dim Z(T,Tv)\\in\\{k,k-1\\}$",
          },
          {
            id: "א.ii",
            points: 4,
            type: "counterexample",
            topic: "cyclic_subspace",
            summary: "דוגמה $k=2$, $\\dim=2$",
          },
          {
            id: "א.iii",
            points: 4,
            type: "counterexample",
            topic: "cyclic_subspace",
            summary: "דוגמה $k=2$, $\\dim=1$",
          },
          {
            id: "ב",
            points: 12,
            type: "compute",
            topic: "gram_schmidt",
            summary:
              'בסיס אורתונורמלי ל-$\\mathbb{R}[X]_{\\leq 2}$ עם מ"פ אינטגרל',
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        points: 25,
        missing: true,
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2019 (תשע"ט) — winter (course 80135-1)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2019w_א_I",
    year: 2019,
    moed: "א",
    semester: "winter",
    date: "07.02.19",
    lecturers: ["מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_real",
        points: 25,
        summary:
          'א) $A\\in M_2(\\mathbb{R})$ סימטרית ⟹ קיים $(u_1,u_2)$ בסיס אורתונורמלי של $\\mathbb{R}^2$ של ו"ע של $A$; ב) $p,q\\in\\mathbb{R}[X]$, $p(X)=(X-1)^2, q(X)=(X-2)$. (i) $r,s\\in\\mathbb{R}[X]$: $rp+sq=1$; (ii) $f$ ל"ל מעל $\\mathbb{R}$ עם $p(f)q(f)=0$ ⟹ $\\mathrm{Im}\\,p(f)=\\ker q(f)$',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "spectral_theorem_real",
            summary: '$A$ סימטרית $2\\times2$ ⟹ בסיס אורתונורמלי של ו"ע',
          },
          {
            id: "ב.i",
            points: 6,
            type: "compute",
            topic: "primary_decomposition",
            summary: "$r,s$: $rp+sq=1$",
          },
          {
            id: "ב.ii",
            points: 9,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: "$\\mathrm{Im}\\,p(f)=\\ker q(f)$",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "definition_apply",
        topic: "diagonalization",
        points: 25,
        summary:
          'א) $V$ ממ"ס מעל $\\mathbb{F}$, $\\mathrm{char}\\,F\\neq 2$, $f:V\\to V$. (i) הגדירו $f$ שיקוף; (ii) $f$ שיקוף ⟺ $f^2=\\mathrm{Id}_V$; ב) $V=\\mathbb{R}_{\\leq 2}[X]$ עם $\\langle p|q\\rangle:=p(-1)q(-1)+p(0)q(0)+p(1)q(1)$. (i) גרם-שמידט על $(1,X,X^2)$; (ii) $d(X^2,\\mathrm{Span}(1,X))$',
        subparts: [
          {
            id: "א.i",
            points: 3,
            type: "definition_apply",
            topic: "diagonalization",
            summary: "הגדרת $f$ שיקוף",
          },
          {
            id: "א.ii",
            points: 7,
            type: "proof_short",
            topic: "diagonalization",
            summary: "$f^2=\\mathrm{Id}$ ⟺ שיקוף",
          },
          {
            id: "ב.i",
            points: 8,
            type: "compute",
            topic: "gram_schmidt",
            summary: "גרם-שמידט על $(1,X,X^2)$",
          },
          {
            id: "ב.ii",
            points: 7,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "$d(X^2,\\mathrm{Span}(1,X))$",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "minimal_polynomial_vec",
        points: 25,
        summary:
          'א) $V$ ממ"ס מעל $F$, $f:V\\to V$, $0\\neq v$, $h\\in\\mathbb{N}$ עם $f^{h-1}v\\neq0$ ו-$f^hv=0$ ⟹ $(v,fv,\\ldots,f^{h-1}v)$ בת"ל; ב) $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$. חשבו $A^{2019}\\binom{3}{1}$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "nilpotent_basic",
            summary: 'שרשרת ו"ע של $f$ נילפוטנטי בת"ל',
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "חשבו $A^{2019}\\binom{3}{1}$",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 25,
        summary:
          'א) $V$, $g,f:V\\to V$ מתחלפים. $V_\\lambda(f)=\\{v:fv=\\lambda v\\}$. (i) $gV_\\lambda(f)\\subseteq V_\\lambda(f)$; (ii) (מעל $\\mathbb{C}$) קיים $0\\neq v$ ו"ע משותף ל-$f$ ול-$g$; ב) $A=\\begin{pmatrix}&-i\\\\i&\\end{pmatrix}$. $U$ אוניטרית, $D$ אלכסונית: $D=U^*AU$',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "invariant_subspace",
            summary: "$gV_\\lambda(f)\\subseteq V_\\lambda(f)$",
          },
          {
            id: "א.ii",
            points: 8,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: 'ו"ע משותף ל-$f,g$ מעל $\\mathbb{C}$',
          },
          {
            id: "ב",
            points: 12,
            type: "compute",
            topic: "unitary_diagonalization",
            summary: "$U$ אוניטרית, $D$: $D=U^*AU$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "definition_apply",
        topic: "orthogonal_operator",
        points: 25,
        summary:
          'א) $V$ אוקלידי ממ"ס, $f:V\\to V$. (i) הגדירו $f$ אורתוגונלי; (ii) $f$ אורתוגונלי ⟺ ממפה בסיס אורתונורמלי לבסיס אורתונורמלי; ב) $A=\\begin{pmatrix}5&2&1\\\\-1&2&-1\\\\-1&-2&3\\end{pmatrix}$ עם $m_{e_1}=m_{e_2}=m_{e_3}$. (i) בסיס $\\mathbb{R}^3$ של ו"ע מוכללים; (ii) $J$ ז\'ורדן; (iii) $P$ הפיכה: $J=P^{-1}AP$',
        subparts: [
          {
            id: "א.i",
            points: 3,
            type: "definition_apply",
            topic: "orthogonal_operator",
            summary: "הגדרת $f$ אורתוגונלי",
          },
          {
            id: "א.ii",
            points: 9,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: "אורתוגונלי ⟺ שמירת בסיס אורתונורמלי",
          },
          {
            id: "ב.i",
            points: 5,
            type: "compute",
            topic: "generalized_eigenspace",
            summary: 'בסיס $\\mathbb{R}^3$ של ו"ע מוכללים',
          },
          {
            id: "ב.ii",
            points: 4,
            type: "compute",
            topic: "jordan_form",
            summary: "$J$ ז'ורדן",
          },
          {
            id: "ב.iii",
            points: 4,
            type: "compute",
            topic: "jordan_form",
            summary: "$P$ הפיכה: $J=P^{-1}AP$",
          },
        ],
      },
    ],
  },
  {
    code: "2019w_ב_I",
    year: 2019,
    moed: "ב",
    semester: "winter",
    date: "01.03.19",
    lecturers: ["מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "minimal_polynomial",
        points: 25,
        summary:
          'א) $V$ ממ"ס, $f:V\\to V$, $\\lambda\\in F$, $m(X)$ הפ"מ ⟹ $\\lambda$ ע"ע ⟺ $\\lambda$ שורש $m$; ב) $A=\\begin{pmatrix}1&-1\\\\1&a\\end{pmatrix}$. (i) $a$ עם $O$ אורתוגונלית: $D=O^tAO$; (ii) $a$ עם $U$ אוניטרית: $D=U^*AU$',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "minimal_polynomial",
            summary: '$\\lambda$ ע"ע ⟺ שורש $m_T$',
          },
          {
            id: "ב.i",
            points: 8,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "$a$ עבורו $D=O^tAO$",
          },
          {
            id: "ב.ii",
            points: 7,
            type: "compute",
            topic: "unitary_diagonalization",
            summary: "$a$ עבורו $D=U^*AU$",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ב",
        chapters: ["ב", "ג"],
        type: "compute",
        topic: "jordan_form",
        topics: ["orthogonal_projection"],
        points: 25,
        summary:
          "א) $V$ ממ\"ס, $f:V\\to V$. (i) הגדירו $f$ הטלה; (ii) $f^2=f$ ⟺ $f$ הטלה; ב) $A=\\begin{pmatrix}1&0&0\\\\0&4&-1\\\\0&1&2\\end{pmatrix}$. (i) $J$ ז'ורדן; (ii) $P$ הפיכה: $J=P^{-1}AP$",
        subparts: [
          {
            id: "א.i",
            points: 3,
            type: "definition_apply",
            topic: "orthogonal_projection",
            summary: "הגדרת $f$ הטלה",
          },
          {
            id: "א.ii",
            points: 7,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$f^2=f$ ⟺ הטלה",
          },
          {
            id: "ב.i",
            points: 8,
            type: "compute",
            topic: "jordan_form",
            summary: "$J$ ז'ורדן",
          },
          {
            id: "ב.ii",
            points: 7,
            type: "compute",
            topic: "jordan_form",
            summary: "$P$: $J=P^{-1}AP$",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 25,
        summary:
          "א) $V$, $f:V\\to V$, $p,q$ זרים, $p(f)q(f)=0$ ⟹ $V=\\ker p(f)\\oplus\\ker q(f)$; ב) $V=M_2(\\mathbb{R})$ עם $\\langle A|B\\rangle=\\mathrm{tr}(A^tB)$. (i) נורמה של $\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$; (ii) $d(\\begin{pmatrix}8&2\\\\2&8\\end{pmatrix},\\mathrm{Span}(\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}))$",
        subparts: [
          {
            id: "א",
            points: 13,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: "$V=\\ker p(f)\\oplus\\ker q(f)$",
          },
          {
            id: "ב.i",
            points: 5,
            type: "compute",
            topic: "norm_basics",
            summary: "נורמה של מטריצה",
          },
          {
            id: "ב.ii",
            points: 7,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "מרחק מ-Span",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "א",
        type: "proof_short",
        topic: "eigenvectors_independent",
        points: 25,
        summary:
          'א) $V$, $f:V\\to V$, $(v_1,\\ldots,v_n)$ ו"ע לע"ע שונים $\\lambda_1,\\ldots,\\lambda_n$ ⟹ בת"ל; ב) $A=\\begin{pmatrix}1&1-i\\\\1+i&0\\end{pmatrix}$. $U$ אוניטרית, $D$: $D=U^*AU$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "eigenvectors_independent",
            summary: 'ו"ע לע"ע שונים בת"ל',
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "unitary_diagonalization",
            summary: "$U$ אוניטרית: $D=U^*AU$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{C}$, $f$ הרמיטי. (i) $\\sigma(f)\\neq\\emptyset$, ע"ע ב-$\\mathbb{R}$; (ii) $f^*=f$ ⟹ ע"ע ממשי; ב) $f$ נילפוטנטי עם שרשרת $v_1\\to v_2\\to v_3\\to 0$, $v_4\\to v_5\\to v_6\\to 0$. (i) גובה של $f$; (ii) בסיס שרשרות ל-$f^2$; (iii) מטריצת $f^2$ בבסיס',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "$f$ הרמיטי ⟹ $\\sigma(f)\\neq\\emptyset$",
          },
          {
            id: "א.ii",
            points: 4,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '$f^*=f$ ⟹ ע"ע ממשי',
          },
          {
            id: "ב.i",
            points: 4,
            type: "compute",
            topic: "nilpotent_basic",
            summary: "גובה של $f$ נילפוטנטי",
          },
          {
            id: "ב.ii",
            points: 6,
            type: "compute",
            topic: "jordan_chain",
            summary: "בסיס שרשרות ל-$f^2$",
          },
          {
            id: "ב.iii",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "מטריצת $f^2$ בבסיס",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2019 (תשע"ט) — spring
  // ════════════════════════════════════════════════════════════════
  {
    code: "2019_א_I",
    year: 2019,
    moed: "א",
    semester: "spring",
    date: "17.07.19",
    lecturers: ['ד"ר קלואי פרין', "פרופ' ערן נבו", 'ד"ר איב גודין'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
        note: "כל שאלה שני סעיפים שווי משקל בערכן 12.5 נק'",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "cauchy_schwarz",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{C}$. נסחו והוכיחו את אי-שוויון קושי-שוורץ + תנאי שוויון; ב) $A=\\begin{pmatrix}7&-4&0&0\\\\9&-5&0&0\\\\-5&3&1&0\\\\-10&6&0&1\\end{pmatrix}, B=\\begin{pmatrix}-7&-5&0&8\\\\4&3&0&-4\\\\1&0&1&-1\\\\-6&-4&0&7\\end{pmatrix}\\in M_4(\\mathbb{C})$. האם $A,B$ דומות?',
        subparts: [
          {
            id: "א",
            points: 12.5,
            type: "proof_theorem",
            topic: "cauchy_schwarz",
            summary: "אי-שוויון קושי-שוורץ + תנאי שוויון",
          },
          {
            id: "ב",
            points: 12.5,
            type: "compute",
            topic: "matrix_similarity",
            summary: "האם $A,B$ דומות?",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 25,
        summary:
          "א) $V$ ממ\"פ, $T,S:V\\to V$. (i) $\\langle u,Tv\\rangle=\\langle u,Sv\\rangle$ לכל $u,v$ ⟹ $T=S$; (ii) $(S\\circ T)^*=T^*\\circ S^*$; ב) $A,B$ נתונות. האם חופפות מעל $\\mathbb{R}$? מעל $\\mathbb{C}$? (EXCLUDED לסעיף ב')",
        subparts: [
          {
            id: "א.i",
            points: 6,
            type: "proof_short",
            topic: "adjoint_operator",
            summary: "שוויון פנימי בכל $u,v$ ⟹ $T=S$",
          },
          {
            id: "א.ii",
            points: 6.5,
            type: "proof_short",
            topic: "adjoint_operator",
            summary: "$(S\\circ T)^*=T^*\\circ S^*$",
          },
          {
            id: "ב.i",
            points: 6,
            type: "compute",
            topic: "bilinear_form",
            summary: "$A,B$ חופפות מעל $\\mathbb{R}$? (EXCLUDED)",
          },
          {
            id: "ב.ii",
            points: 6.5,
            type: "compute",
            topic: "bilinear_form",
            summary: "$A,B$ חופפות מעל $\\mathbb{C}$? (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 25,
        summary:
          'א) $V$ ממ"ס, $T:V\\to V$, $P,Q,R$ עם $\\gcd(Q,R)=1$, $P=QR$, $P(T)=0$ ⟹ $V=\\ker Q(T)\\oplus\\ker R(T)$; ב) $q(x,y,z,w)=x^2+y^2-z^2$. (i) 2 ו"ע ניצבים לעצמם, לא בגרעין; (ii) מימד ה-Span של ו"ע כאלה (EXCLUDED לסעיף ב\')',
        subparts: [
          {
            id: "א",
            points: 12.5,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: "$V=\\ker Q(T)\\oplus\\ker R(T)$",
          },
          {
            id: "ב.i",
            points: 6,
            type: "compute",
            topic: "bilinear_form",
            summary: 'ו"ע ניצבים לעצמם (EXCLUDED)',
          },
          {
            id: "ב.ii",
            points: 6.5,
            type: "compute",
            topic: "bilinear_form",
            summary: "מימד ה-Span (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "א",
        type: "definition_apply",
        topic: "minimal_polynomial",
        points: 25,
        summary:
          'א) (i) הגדירו פ"מ של $T$; (ii) הוכיחו שהפ"מ מחלק כל פולינום שמאפס את $T$; ב) $\\mathbb{R}^4$ עם מ"פ סטנ\', $v_1=(1,2,-2,0), v_2=(-1,2,0,0), v_3=(1,0,0,-1)$. (i) $b_1,b_2,b_3$ עם תת-Span נשמר ובסיס אורתונורמלי; (ii) השלימו ל-$(b_1,b_2,b_3,b_4)$',
        subparts: [
          {
            id: "א.i",
            points: 4,
            type: "definition_apply",
            topic: "minimal_polynomial",
            summary: 'הגדרת פ"מ',
          },
          {
            id: "א.ii",
            points: 8.5,
            type: "proof_short",
            topic: "minimal_polynomial",
            summary: "$m_T|q$ עבור $q(T)=0$",
          },
          {
            id: "ב.i",
            points: 7,
            type: "compute",
            topic: "gram_schmidt",
            summary: "$b_1,b_2,b_3$ אורתונורמלי",
          },
          {
            id: "ב.ii",
            points: 5.5,
            type: "compute",
            topic: "gram_schmidt",
            summary: "השלמה לבסיס אורתונורמלי של $\\mathbb{R}^4$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "א",
        type: "proof_short",
        topic: "eigenvectors_independent",
        points: 25,
        summary:
          'א) $V$, $T:V\\to V$, $(v_1,\\ldots,v_k)$ ו"ע עם ע"ע שונים זה מזה ⟹ בת"ל; ב) $A\\in M_3(\\mathbb{F}_3)$. האם $A$ לכסינה? (EXCLUDED — שדה $\\mathbb{F}_3$)',
        subparts: [
          {
            id: "א",
            points: 12.5,
            type: "proof_short",
            topic: "eigenvectors_independent",
            summary: 'ו"ע לע"ע שונים בת"ל',
          },
          {
            id: "ב",
            points: 12.5,
            type: "compute",
            topic: "field_char",
            summary: "$A$ לכסינה ב-$\\mathbb{F}_3$? (EXCLUDED)",
          },
        ],
      },
    ],
  },
  {
    code: "2019_ב_I",
    year: 2019,
    moed: "ב",
    semester: "spring",
    date: "20.08.19",
    lecturers: ['ד"ר קלואי פרין', "פרופ' ערן נבו", 'ד"ר איב גודין'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
        note: "כל שאלה שני סעיפים שווי משקל בערכן 12.5 נק'",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ג",
        type: "proof_theorem",
        topic: "triangle_inequality",
        points: 25,
        summary:
          'א) $(V,\\langle,\\rangle)$ ממ"פ מעל $\\mathbb{C}$. נסחו והוכיחו אי-שוויון המשולש + תנאי שוויון; ב) דוגמה $A,B\\in M_n(\\mathbb{C})$ עם אותם $\\chi,m_T$ וריבוי גאומטרי לכל ע"ע, אך לא דומות',
        subparts: [
          {
            id: "א",
            points: 12.5,
            type: "proof_theorem",
            topic: "triangle_inequality",
            summary: "אי-שוויון משולש + תנאי שוויון",
          },
          {
            id: "ב",
            points: 12.5,
            type: "counterexample",
            topic: "matrix_similarity",
            summary: "$A,B$: זהים בכל סטטיסטיקה אך לא דומות",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 25,
        summary:
          'א) הגדירו $T$ צמוד לעצמו. (i) ע"ע ממשיים; (ii) ו"ע לע"ע שונים אורתוגונליים; ב) $A,B\\in M_4$ נתונות. האם חופפות מעל $\\mathbb{R}$? (EXCLUDED לסעיף ב\')',
        subparts: [
          {
            id: "א.i",
            points: 4,
            type: "proof_short",
            topic: "self_adjoint",
            summary: 'ע"ע של $T^*=T$ ממשיים',
          },
          {
            id: "א.ii",
            points: 8.5,
            type: "proof_short",
            topic: "self_adjoint",
            summary: 'ו"ע לע"ע שונים אורתוגונליים',
          },
          {
            id: "ב",
            points: 12.5,
            type: "compute",
            topic: "bilinear_form",
            summary: "$A,B$ חופפות מעל $\\mathbb{R}$? (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "char_polynomial",
        points: 25,
        summary:
          'א) $\\mathbb{F}$ שדה, $P=a_0+\\ldots+a_{n-1}X^{n-1}+X^n$. $A$ המטריצה המלווה של $P$. הוכיחו $P(A)=O_n$ ו-$Q(A)\\neq O_n$ לכל $0\\leq\\deg Q<n$; ב) $V$ ממ"ס מעל $F$, $\\mathrm{char}(F)\\neq 2$, $g$ ביליניארית סימטרית. האם קיים בסיס $B$ אורתוגונלי ביחס ל-$g$ המכיל וקטור $b_i$ ניצב לעצמו שאינו בגרעין? (EXCLUDED לסעיף ב\')',
        subparts: [
          {
            id: "א",
            points: 12.5,
            type: "proof_short",
            topic: "char_polynomial",
            summary: "מטריצה מלווה: $P(A)=0$ ואין מאפס ממעלה $<n$",
          },
          {
            id: "ב",
            points: 12.5,
            type: "counterexample",
            topic: "bilinear_form",
            summary: "בסיס אורתוגונלי עם וקטור איזוטרופי לא בגרעין? (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "definition_apply",
        topic: "orthogonal_projection",
        points: 25,
        summary:
          'א) $V$ ממ"פ פנימית, $W\\subseteq V$. (i) הגדירו $v_W$ הטלה אורתוגונלית; (ii) $\\|v-v_W\\|\\leq\\|v-w\\|$ לכל $w\\in W$; ב) (i) $P(1)=0,P(-2)=5$ ⟹ $\\gcd(P,X^2+X-2)=X-1$; (ii) $T(P)=$ שארית $P/S$ — לינארי?',
        subparts: [
          {
            id: "א.i",
            points: 3,
            type: "definition_apply",
            topic: "orthogonal_projection",
            summary: "הגדרת $v_W$",
          },
          {
            id: "א.ii",
            points: 9.5,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$\\|v-v_W\\|\\leq\\|v-w\\|$",
          },
          {
            id: "ב.i",
            points: 6,
            type: "counterexample",
            topic: "primary_decomposition",
            summary: "GCD תכונה",
          },
          {
            id: "ב.ii",
            points: 6.5,
            type: "counterexample",
            topic: "minimal_polynomial",
            summary: "פעולת השארית — לינארית?",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "א",
        type: "definition_apply",
        topic: "primary_decomposition",
        points: 25,
        summary:
          'א) $V$, $U_1,\\ldots,U_k$ ת"מ. $U=\\sum U_i$. (i) הגדירו ל"י; (ii) $\\dim U<\\sum\\dim U_i$ ⟹ לא ל"י; ב) $A\\in M_3(\\mathbb{F}_5)$. האם לכסינה? (EXCLUDED לסעיף ב\')',
        subparts: [
          {
            id: "א.i",
            points: 3,
            type: "definition_apply",
            topic: "primary_decomposition",
            summary: 'הגדרת תתי-מרחב ל"י',
          },
          {
            id: "א.ii",
            points: 9.5,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: '$\\dim U<\\sum\\dim U_i$ ⟹ לא ל"י',
          },
          {
            id: "ב",
            points: 12.5,
            type: "compute",
            topic: "field_char",
            summary: "$A$ לכסינה ב-$\\mathbb{F}_5$? (EXCLUDED)",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2020 (תש"ף) — Moed A only (COVID)
  // ════════════════════════════════════════════════════════════════
  {
    code: "2020_א_I",
    year: 2020,
    moed: "א",
    semester: "winter",
    date: "16.02.20",
    lecturers: ['ד"ר קלואי פרין'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "char_polynomial",
        points: 25,
        summary:
          "א) (i) $P(a)=0$ ⟺ $X-a|P$; (ii) $\\deg P=n$ ⟹ לכל היותר $n$ שורשים; ב) $A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$. חשבו $A^{2020}$",
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "char_polynomial",
            summary: "$P(a)=0$ ⟺ $X-a|P$",
          },
          {
            id: "א.ii",
            points: 7,
            type: "proof_short",
            topic: "char_polynomial",
            summary: "$\\deg P=n$ ⟹ $\\leq n$ שורשים",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "חשבו $A^{2020}$",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "eigenvalue_definition",
        points: 25,
        summary:
          'א) $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ עם ע"ע $\\lambda\\neq\\mu$, $0\\neq v$ ⟹ $v\\in V_\\mu$ או $(T-\\mu I)v\\in V_\\lambda$; ב) $\\mathbb{C}^3$, $u_1=\\binom{1}{i,-1}, u_2=\\binom{0}{2,-i}$. בסיס אורתונורמלי ל-$\\mathrm{Span}(u_1,u_2)$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "eigenvalue_definition",
            summary: "$v\\in V_\\mu$ או $(T-\\mu I)v\\in V_\\lambda$",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "gram_schmidt",
            summary: "בסיס אורתונורמלי לתת-Span ב-$\\mathbb{C}^3$",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "normal_operator",
        points: 25,
        summary:
          "א) $V$ ממ\"פ ממ\"ס מעל $\\mathbb{C}$, $T,U:V\\to V$ עם $U$ אוניטרי, $T$ צמוד ⟹ $UT$ נורמלי ⟺ $UT^2=T^2U$; ב) $V=M_2(\\mathbb{R})$, $g(A,B)=\\mathrm{tr}(AB)$ — סימטרית, מטריצה ב-בסיס סטנ' (EXCLUDED לסעיף ב')",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "normal_operator",
            summary: "$UT$ נורמלי ⟺ $UT^2=T^2U$",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "bilinear_form",
            summary: "מטריצת $g(A,B)=\\mathrm{tr}(AB)$ (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "normal_operator",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{C}$, $T$ נורמלי ונילפוטנטי. (i) $\\lambda$ ע"ע ⟹ $\\lambda=0$; (ii) $T=0$; ב) $\\mathbb{R}^n$ סטנ\', $0\\neq u$, $M=uu^t$. (i) $\\ker M=\\{u\\}^\\perp$; (ii) $u$ ו"ע של $M$; (iii) פ"א של $M$',
        subparts: [
          {
            id: "א.i",
            points: 4,
            type: "proof_short",
            topic: "normal_operator",
            summary: '$T$ נורמלי ונילפוטנטי, $\\lambda$ ע"ע ⟹ $\\lambda=0$',
          },
          {
            id: "א.ii",
            points: 8,
            type: "proof_short",
            topic: "normal_operator",
            summary: "$T$ נורמלי ונילפוטנטי ⟹ $T=0$",
          },
          {
            id: "ב.i",
            points: 5,
            type: "proof_short",
            topic: "orthogonal_complement",
            summary: "$\\ker M=\\{u\\}^\\perp$",
          },
          {
            id: "ב.ii",
            points: 4,
            type: "proof_short",
            topic: "eigenvalue_definition",
            summary: '$u$ ו"ע של $M$',
          },
          {
            id: "ב.iii",
            points: 4,
            type: "compute",
            topic: "char_polynomial",
            summary: 'פ"א של $M=uu^t$',
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{F}$, $T$ צמוד לעצמו. (i) ע"ע ב-$\\mathbb{R}$; (ii) ו"ע לע"ע שונים — אורתוגונליים; ב) $A\\in M_n(\\mathbb{F}_2)$. $A$ לכסינה ⟺ $A$ הטלה (EXCLUDED לסעיף ב\')',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "self_adjoint",
            summary: 'ע"ע של $T^*=T$ ב-$\\mathbb{R}$',
          },
          {
            id: "א.ii",
            points: 7,
            type: "proof_short",
            topic: "self_adjoint",
            summary: 'ו"ע לע"ע שונים — אורתוגונליים',
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "field_char",
            summary: "$A\\in M_n(\\mathbb{F}_2)$ לכסינה ⟺ הטלה (EXCLUDED)",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2021 (תשפ"א) — Moed B, unusual format: two separate parts
  // ════════════════════════════════════════════════════════════════
  {
    code: "2021w_ב_I",
    year: 2021,
    moed: "ב",
    semester: "winter",
    date: "09.03.21",
    lecturers: ["פרופ' יעקב ורשבסקי"],
    duration_hours: 2,
    total_points: 102,
    verified: true,
    parts: [
      {
        name: "חלק 1",
        points: 51,
        choose: 3,
        from: ["Q1", "Q2", "Q3"],
        note: "ענו על כל 3 השאלות — 17 נק' כל אחת, 1 שעה",
      },
      {
        name: "חלק 2",
        points: 51,
        choose: 3,
        from: ["Q4", "Q5", "Q6", "Q7"],
        note: "ענו על 3 מתוך 4 — 17 נק' כל אחת, 1 שעה",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "diagonalization_compute",
        points: 17,
        summary:
          "$A=\\begin{pmatrix}5&4\\\\3&4\\end{pmatrix}\\in M_2(\\mathbb{R})$. מצאו $B\\in M_2(\\mathbb{R})$: $B^3=A$",
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "compute",
        topic: "matrix_similarity",
        points: 17,
        summary: "$A,B\\in M_3(\\mathbb{C})$ נתונות. קבעו האם דומות",
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "inner_product_axioms",
        points: 17,
        summary:
          "$Q=\\begin{pmatrix}1&-1\\\\-1&4\\end{pmatrix}$, $g(u,v)=u^tQv$ על $\\mathbb{R}^2$. (א) בסיס אורתונורמלי ביחס ל-$g$; (ב) $A=\\begin{pmatrix}1&0\\\\0&4\\end{pmatrix}$, חשבו $f_A^*\\binom{1}{1}$",
        subparts: [
          {
            id: "א",
            points: 10,
            type: "compute",
            topic: "gram_schmidt",
            summary: "בסיס אורתונורמלי ביחס ל-$g$",
          },
          {
            id: "ב",
            points: 7,
            type: "compute",
            topic: "adjoint_operator",
            summary: "$f_A^*\\binom{1}{1}$",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "א",
        type: "definition_apply",
        topic: "diagonalization",
        points: 17,
        summary:
          '$V$ ממ"ס מעל $\\mathbb{F}$, $f:V\\to V$, $\\lambda_1,\\ldots,\\lambda_k$ כל הע"ע השונים. (א) הגדירו אופרטור לכסין, סכום וסכום ישר של תתי-מרחבים; (ב) הוכיחו $f$ לכסין אמ"מ $V=\\bigoplus_{i=1}^k V_{\\lambda_i}$',
        subparts: [
          {
            id: "א",
            points: 5,
            type: "definition_apply",
            topic: "diagonalization",
            summary: "הגדירו אופרטור לכסין, סכום וסכום ישר של תתי-מרחבים",
          },
          {
            id: "ב",
            points: 12,
            type: "proof_short",
            topic: "diagonalization",
            summary: "$f$ לכסין אמ\"מ $V=\\bigoplus_{i=1}^k V_{\\lambda_i}$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "א",
        type: "proof_short",
        topic: "minimal_polynomial",
        points: 17,
        summary:
          '$V$ ממ"ס מעל $\\mathbb{F}$, $f:V\\to V$, $m_f$ הפ"מ, $\\chi_f$ הפ"א, $\\lambda\\in\\mathbb{F}$. הוכיחו את הגרירות (i)⟹(ii)⟹(iii)⟹(i): (i) $\\lambda$ ע"ע של $f$; (ii) $m_f(\\lambda)=0$; (iii) $\\chi_f(\\lambda)=0$',
      },
      {
        id: "Q6",
        number: 6,
        chapter: "ג",
        type: "counterexample",
        topic: "inner_product_axioms",
        points: 17,
        summary:
          '$V=\\mathbb{R}_{\\leq4}[x]$. הוכיחו או הפריכו: (א) $\\langle P|Q\\rangle=\\sum_{i=1}^4 P(i)Q(i)$ מ"פ פנימית על $V$; (ב) $\\langle P|Q\\rangle=\\sum_{i=1}^5 P(i)Q(i)$ מ"פ פנימית על $V$',
      },
      {
        id: "Q7",
        number: 7,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 17,
        summary:
          '$V$ ממ"פ ממ"ס מעל $\\mathbb{R}$, $f:V\\to V$ אופ\' הפיך. (א) $v\\perp f(v)$ לכל $v$ ⟹ ל-$f$ אין ע"ע; (ב) $f^*=-f$ ⟹ ל-$f$ אין ע"ע',
        subparts: [
          {
            id: "א",
            points: 7,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '$v\\perp f(v)\\,\\forall v$ ⟹ אין ע"ע',
          },
          {
            id: "ב",
            points: 10,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '$f^*=-f$ ⟹ אין ע"ע',
          },
        ],
      },
    ],
  },
  {
    code: "2021_א_I",
    year: 2021,
    moed: "א",
    semester: "spring",
    date: "21.07.21",
    lecturers: ["פרופ' אלכס גורביץ'", "פרופ' צליל סלע", "פרופ' איתי קפלן"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ב",
        type: "proof_short",
        topic: "nilpotent_basic",
        points: 25,
        summary:
          'א) $T:V\\to V$ נילפוטנטי ⟺ קיים בסיס שמיוצג ע"י משולשת עליונה עם 0 על אלכסון; ב) $A=\\begin{pmatrix}0&1&1\\\\1&0&1\\\\1&1&0\\end{pmatrix}$. $O$ אורתוגונלית, $D$ אלכסונית: $D=O^tAO$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "nilpotent_basic",
            summary: "$T$ נילפוטנטי ⟺ משולש עליון עם 0 על אלכסון",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "$D=O^tAO$",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "cyclic_subspace",
        points: 25,
        summary:
          '(א) $V$ ממ"ס מעל $\\mathbb{F}$, $f:V\\to V$ עם $\\ell\\geq2$ טבעי כך ש-$f^\\ell=f$. הוכיחו: אם $W\\subseteq V$ תת-מרחב $f$-ציקלי אז $\\dim W\\leq\\ell$; (ב) נתונה מכפלה פנימית $\\langle\\cdot|\\cdot\\rangle$ על $\\mathbb{R}^3$ (תבנית סימטרית $4x_1y_1-2x_1y_2-2x_2y_1+2x_2y_2+8x_3y_3$). (1) הוכיחו שהיא מ"פ פנימית; (2) מצאו בסיס אורתונורמלי',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "cyclic_subspace",
            summary: "$f^\\ell=f$, $W$ $f$-ציקלי ⟹ $\\dim W\\leq\\ell$",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "gram_schmidt",
            summary: 'מ"פ פנימית על $\\mathbb{R}^3$: הוכחה + בסיס אורתונורמלי',
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_projection",
        points: 25,
        summary:
          'א) $V$ ממ"פ מעל $\\mathbb{R}$, $U\\subseteq V$. $R_U=2P_U-\\mathrm{Id}$ אורתוגונלי; ב) קושי-שוורץ משוקלל: $\\left(\\sum x_jy_j\\right)^2\\leq\\left(\\sum jx_j^2\\right)\\left(\\sum y_j^2/j\\right)$',
        subparts: [
          {
            id: "א",
            points: 13,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: "$R_U=2P_U-\\mathrm{Id}$ אורתוגונלי",
          },
          {
            id: "ב",
            points: 12,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary: "אי-שוויון משוקלל",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 25,
        summary:
          "א) $A\\in M_n(\\mathbb{C})$. הוכיחו $\\ker(I_n+AA^*)=\\{0\\}$; ב) מצאו שתי מטריצות נילפוטנטיות $A,B\\in M_7(\\mathbb{R})$ שאינן דומות, עם אותו פולינום מינימלי ו-$\\mathrm{rk}(A)=\\mathrm{rk}(B)$",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "$\\ker(I_n+AA^*)=\\{0\\}$",
          },
          {
            id: "ב",
            points: 13,
            type: "counterexample",
            topic: "nilpotent_classify",
            summary: "$A,B\\in M_7$ נילפוטנטיות לא דומות, אותו $m_T$ ודרגה",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ב",
        type: "proof_short",
        topic: "matrix_similarity",
        points: 25,
        summary:
          'א) $V$, $g$ ביליניארית, $S$ סדרת ו"ע, $A_{ij}=g(s_i,s_j)$. הוכיחו $S$ בת"ל (EXCLUDED); ב) $\\begin{pmatrix}a&b\\\\0&d\\end{pmatrix}$ ו-$\\mathrm{diag}(a,d)$ דומות ⟺ $a\\neq d$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "bilinear_form",
            summary: '$S$ עם מטריצת גרם הפיכה ⟹ בת"ל (EXCLUDED)',
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "matrix_similarity",
            summary: "דמיון מטריצה משולשת לאלכסונית",
          },
        ],
      },
    ],
  },
  {
    code: "2021_ב_I",
    year: 2021,
    moed: "ב",
    semester: "spring",
    date: "15.08.21",
    lecturers: ["פרופ' אלכס גורביץ'", "פרופ' צליל סלע", "פרופ' איתי קפלן"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "diagonalization",
        points: 25,
        summary:
          'א) $A\\in M_n(\\mathbb{C})$ עם $A^n=I_n$. (i) ע"ע מקיים $\\lambda^n=1$; (ii) $A$ לכסינה; ב) $f:\\mathbb{R}^2\\to\\mathbb{R}^2$ אורתוגונלי. $f^*=f$ ⟺ $f=\\pm\\mathrm{Id}$ או $\\det f=-1$',
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "proof_short",
            topic: "char_polynomial",
            summary: "$A^n=I$ ⟹ $\\lambda^n=1$",
          },
          {
            id: "א.ii",
            points: 8,
            type: "proof_short",
            topic: "diagonalization",
            summary: "$A^n=I$ ⟹ $A$ לכסינה",
          },
          {
            id: "ב",
            points: 12,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary:
              "$f$ אורתוגונלי+צמוד עצמי ⟺ $\\pm\\mathrm{Id}$ או $\\det=-1$",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ב",
        type: "compute",
        topic: "nilpotent_basic",
        points: 25,
        summary:
          '$T$ אוניפוטנטי = $T-\\mathrm{Id}_V$ נילפוטנטי. $V$ ממ"ס מעל $\\mathbb{C}$. (i) פ"א של $T$? (ii) ע"ע של $T$?',
        subparts: [
          {
            id: "i",
            points: 12,
            type: "compute",
            topic: "char_polynomial",
            summary: 'פ"א של $T$ אוניפוטנטי',
          },
          {
            id: "ii",
            points: 13,
            type: "compute",
            topic: "eigenvalue_definition",
            summary: 'ע"ע של $T$ אוניפוטנטי',
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_projection",
        points: 25,
        summary:
          "א) $W\\subseteq U$ ⟹ $P_W\\circ P_U=P_W$; ב) $|x_1x_2+x_2x_3+\\ldots+x_6x_1|\\leq x_1^2+\\ldots+x_6^2$",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$W\\subseteq U$ ⟹ $P_W\\circ P_U=P_W$",
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary: "$|\\sum x_ix_{i+1}|\\leq\\sum x_i^2$",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ב",
        type: "proof_short",
        topic: "matrix_similarity",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס מעל $\\mathbb{R}$, $B$ אורתונורמלי, $C$ בסיס, $T$ אורתוגונלי; הוכיחו: $[T]_C$ אורתוגונלית ⟹ $C$ אורתונורמלי; ב) כמה $A\\in M_6(\\mathbb{C})$ אי-דומות עם $\\mathrm{rk}(A-2I)=4$ ופולינום מינימלי $(X-2)^2(X+4)^2$',
        subparts: [
          {
            id: "א",
            points: 10,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: "$T$ אורתוגונלי ⟺ $[T]_C$ אורתוגונלית",
          },
          {
            id: "ב.i",
            points: 8,
            type: "compute",
            topic: "jordan_form",
            summary: "ספירת ז'ורדנים",
          },
          {
            id: "ב.ii",
            points: 7,
            type: "compute",
            topic: "jordan_form",
            summary: "כתבו את צורות ז'ורדן",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_real",
        points: 25,
        summary:
          "א) $A$ סימטרית עם $(Ax)\\cdot x\\geq 0$ ⟹ חופפת ל-$D$ עם 0,1 (EXCLUDED); ב) $A=\\begin{pmatrix}1&i\\\\i&1\\end{pmatrix}$. (i) $A$ נורמלית; (ii) $U$ אוניטרית, $D$: $D=U^*AU$",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "bilinear_form",
            summary: "$A$ אי-שלילית ⟹ חופפת ל-$D$ של 0,1 (EXCLUDED)",
          },
          {
            id: "ב.i",
            points: 6,
            type: "proof_short",
            topic: "normal_operator",
            summary: "$A=\\begin{pmatrix}1&i\\\\i&1\\end{pmatrix}$ נורמלית",
          },
          {
            id: "ב.ii",
            points: 7,
            type: "compute",
            topic: "unitary_diagonalization",
            summary: "$D=U^*AU$",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2022 (תשפ"ב) — winter (course 80135-1), new format: mandatory + choose blocks
  // ════════════════════════════════════════════════════════════════
  {
    code: "2022w_א_I",
    year: 2022,
    moed: "א",
    semester: "winter",
    date: "06.02.22",
    lecturers: ["מר איתמר צביק"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חובה", points: 16, choose: 1, from: ["Q1"], mandatory: ["Q1"] },
      {
        name: "חלק (א)",
        points: 28,
        choose: 2,
        from: ["Q2", "Q3", "Q4"],
        note: "כל שאלה 14 נק'",
      },
      {
        name: "חלק (ב)",
        points: 56,
        choose: 4,
        from: ["Q5", "Q6", "Q7", "Q8", "Q9"],
        note: "כל שאלה 14 נק'",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "minimal_polynomial_vec",
        points: 16,
        summary:
          "$V=\\mathbb{Q}^3$, $A=\\begin{pmatrix}1&-1&\\\\1&3&\\\\&&1\\end{pmatrix}\\in M_3(\\mathbb{Q})$. (i) פולינום מינימלי $\\min_{e_1}(T)\\in\\mathbb{Q}[T]$ של $e_1=\\binom{1}{0,0}$ ביחס ל-$A$; (ii) בסיס ז'ורדן עבור $A$; (iii) תת-מרחב מקסימלי שצמצום $A$ אליו ניתן ללכסון",
        subparts: [
          {
            id: "i",
            points: 5,
            type: "compute",
            topic: "minimal_polynomial_vec",
            summary: "$\\min_{e_1}(T)\\in\\mathbb{Q}[T]$",
          },
          {
            id: "ii",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "בסיס ז'ורדן ל-$A$",
          },
          {
            id: "iii",
            points: 5,
            type: "compute",
            topic: "diagonalization",
            summary: 'ת"מ מקסימלי שעליו $A$ לכסין',
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "compute",
        topic: "unitary_diagonalization",
        points: 14,
        summary:
          '$H=\\begin{pmatrix}2&i\\\\-i&2\\end{pmatrix}\\in M_2(\\mathbb{C})$. נמקו: $H$ נורמלית; ע"ע של $H$; $D,U\\in M_2(\\mathbb{C})$, $U$ אוניטרית, $D$ אלכסונית: $D=U^*HU$',
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 14,
        summary:
          "$V=\\mathbb{R}^3$ מ\"פ סטנ', $U=\\{x+y-z=0\\}$. בסיס אורתוגונלי ל-$U$; הטלה אורתוגונלית של $\\binom{3}{3,0}$ על $U^\\perp$, המשלים האורתוגונלי של $U$; מרחק מ-$\\binom{3}{3,0}$ ל-$U$",
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "bilinear_form",
        points: 14,
        summary:
          '$g:\\mathbb{R}^2\\times\\mathbb{R}^2\\to\\mathbb{R}$ ביליניארית מוגדרת בבסיס סטנ\' ע"י $G=\\begin{pmatrix}2&4\\\\4&1\\end{pmatrix}$. $D,P\\in M_2(\\mathbb{R})$ אלכסונית: $D=P^tGP$. האם $g$ מ"פ פנימית? נמקו (EXCLUDED — תבניות ביליניאריות)',
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_real",
        points: 14,
        summary:
          '$V$ ממ"פ פנימית מ"מ 2 מעל $\\mathbb{R}$, $f:V\\to V$ אופ\' צמוד לעצמו (סימטרי) ביחס למ"פ. ידוע $\\lambda\\in\\mathbb{R}$ ע"ע של $f$. הוכיחו: קיים $B=(b_1,b_2)$ בסיס אורתונורמלי כך ש-$D=[f]_B=\\begin{pmatrix}\\lambda&\\\\&\\mu\\end{pmatrix}\\in M_2(\\mathbb{R})$',
      },
      {
        id: "Q6",
        number: 6,
        chapter: "א",
        type: "proof_short",
        topic: "invariant_subspace",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ד 4 מעל $\\mathbb{R}$, $f:V\\to V$ אופ\' לינארי. הוכיחו: קיים $\\{0_V\\}\\subsetneq W\\subsetneq V$ ת"מ שמור תחת $f$ ובו זמנית $1\\leq\\dim W\\leq 2$',
      },
      {
        id: "Q7",
        number: 7,
        chapter: "ג",
        type: "proof_short",
        topic: "unitary_operator",
        points: 14,
        summary:
          '$V$ ממ"פ ממ"ס 2 מעל $\\mathbb{C}$, $f$ אוניטרי. הגדירו $f$ אוניטרי. הוכיחו: אם $\\lambda\\in\\mathbb{C}$ ע"ע של $f$ אז $|\\lambda|=1$. הוכיחו: $(v,w)$ זוג ו"ע של $f$ עם ע"ע שונים זה מזה $\\lambda,\\mu\\in\\mathbb{C}$ ⟹ $v\\perp w$',
      },
      {
        id: "Q8",
        number: 8,
        chapter: "ב",
        type: "proof_short",
        topic: "nilpotent_basic",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ס מעל שדה $\\mathbb{F}$, $f:V\\to V$ אופ\'. יהי $h\\in\\mathbb{N}$ ו-$0\\neq v\\in V$ כך שמתקיים $f^h v=0$ ו-$f^{h-1}v\\neq 0$. הוכיחו $(v,fv,\\ldots,f^{h-1}v)$ בלתי תלויה לינארית ב-$V$',
      },
      {
        id: "Q9",
        number: 9,
        chapter: "א",
        type: "proof_short",
        topic: "char_polynomial",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ס מעל שדה $\\mathbb{F}$, $f:V\\to V$ אופ\'. הוכיחו: אם $v\\in V$ ו"ע של $f$ עם ע"ע $\\lambda\\in\\mathbb{F}$ אז $(T-\\lambda)|\\chi_f(T)$ או $\\chi_f(T)\\equiv 0$',
      },
    ],
  },
  {
    code: "2022w_ב_I",
    year: 2022,
    moed: "ב",
    semester: "winter",
    date: "02.03.22",
    lecturers: ["מר איתמר צביק"],
    duration_hours: 2.5,
    total_points: 100,
    verified: true,
    parts: [
      { name: "חובה", points: 16, choose: 1, from: ["Q1"], mandatory: ["Q1"] },
      {
        name: "חלק (א)",
        points: 28,
        choose: 2,
        from: ["Q2", "Q3", "Q4"],
        note: "כל שאלה 14 נק'",
      },
      {
        name: "חלק (ב)",
        points: 56,
        choose: 4,
        from: ["Q5", "Q6", "Q7", "Q8", "Q9"],
        note: "כל שאלה 14 נק'",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "minimal_polynomial_vec",
        points: 16,
        summary:
          '$V=\\mathbb{R}^3$, $f:V\\to V$ נתון ע"י $f(x)=Ax$ עם $A=\\begin{pmatrix}0&1&1\\\\1&0&1\\\\1&1&0\\end{pmatrix}\\in M_3(\\mathbb{R})$. (i) הוכיחו $\\chi_A(T)=(T+1)^2(T-2)\\in\\mathbb{R}[T]$ הוא הפ"א של $A$; (ii) מצאו בסיס סדור $U$ של $V$ אורתוגונלי ביחס למ"פ הסטנ\' כך ש-$[f]_U$ אלכסונית; (iii) מצאו תת-מרחב ציקלי ביחס ל-$A$ ממימד מקסימלי',
        subparts: [
          {
            id: "i",
            points: 5,
            type: "compute",
            topic: "char_polynomial",
            summary: "$\\chi_A(T)=(T+1)^2(T-2)$",
          },
          {
            id: "ii",
            points: 6,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "בסיס אורתוגונלי שבו $[f]_U$ אלכסונית",
          },
          {
            id: "iii",
            points: 5,
            type: "compute",
            topic: "cyclic_subspace",
            summary: 'ת"מ ציקלי מקסימלי',
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "compute",
        topic: "unitary_diagonalization",
        points: 14,
        summary:
          '$A=\\begin{pmatrix}1&i\\\\i&1\\end{pmatrix}\\in M_2(\\mathbb{C})$. נמקו: $A$ נורמלית. מצאו ע"ע של $A$. $D,U\\in M_2(\\mathbb{C})$, $U$ אוניטרית, $D$ אלכסונית: $D=U^*AU$',
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 14,
        summary:
          '$V=M_2(\\mathbb{R})$ עם המ"פ הפנימית $\\langle A|B\\rangle=\\mathrm{tr}(A^tB)$. יהי $U\\leq M_2(\\mathbb{R})$ ת"מ הנפרש ע"י $\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$. בסיס אורתונורמלי ל-$U$; הטלה אורתוגונלית של $\\begin{pmatrix}8&2\\\\2&8\\end{pmatrix}$ על $U$; מרחק',
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "compute",
        topic: "bilinear_form",
        points: 14,
        summary:
          "$g:\\mathbb{R}^3\\times\\mathbb{R}^3\\to\\mathbb{R}$ ביליניארית מוגדרת בבסיס סטנ' ע\"י $G=\\begin{pmatrix}4&-2\\\\-2&2\\\\&&1\\end{pmatrix}$. הוכיחו: $g$ תבנית חיובית בהחלט. מצאו בסיס $\\mathbb{R}^3$ אורתונורמלי ביחס ל-$g$ (EXCLUDED — תבניות)",
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_complex",
        points: 14,
        summary:
          '$V$ ממ"פ ממ"ס 2 מעל $\\mathbb{C}$, $f:V\\to V$ אופ\' אוניטרי. הוכיחו: קיים $B=(b_1,b_2)\\in M_2(\\mathbb{C})$ בסיס אורתונורמלי כך ש-$D=[f]_B=\\begin{pmatrix}\\lambda&\\\\&\\mu\\end{pmatrix}$. כתבו את המטריצה המייצגת את $f$ בבסיס $B$ אלכסונית',
      },
      {
        id: "Q6",
        number: 6,
        chapter: "א",
        type: "proof_short",
        topic: "invariant_subspace",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ד 4 מעל $\\mathbb{R}$, $f:V\\to V$ אופ\' לינארי. הוכיחו: קיים $\\{0_V\\}\\subsetneq W\\subsetneq V$ ת"מ שמור תחת $f$ עם $1\\leq\\dim W\\leq 2$',
      },
      {
        id: "Q7",
        number: 7,
        chapter: "ג",
        type: "definition_apply",
        topic: "orthogonal_complement",
        points: 14,
        summary:
          '$V$ ממ"פ פנימית מעל $\\mathbb{R}$ ממ"ס, $W\\leq V$ ת"מ. הגדירו $W^\\perp$. הוכיחו: $V=W\\oplus W^\\perp$',
      },
      {
        id: "Q8",
        number: 8,
        chapter: "א",
        type: "proof_short",
        topic: "minimal_polynomial_vec",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ס מעל שדה $\\mathbb{F}$, $f:V\\to V$ אופ\'. יהי $0\\neq v\\in V$ כך שמתקיים $P(T)\\in\\mathbb{F}[T]$, $P(f)(v)=0_V$. הוכיחו $\\min_v(T)|P(T)$',
      },
      {
        id: "Q9",
        number: 9,
        chapter: "א",
        type: "proof_short",
        topic: "char_polynomial",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ס מעל שדה $\\mathbb{F}$ ממ"ד 2, $f:V\\to V$ אופ\' לינארי. הוכיחו: אם $v\\in V$ ו"ע של $f$ עם ע"ע $\\lambda\\in\\mathbb{F}$ אז $(T-\\lambda)|\\chi_f(T)$ או $\\chi_f(T)\\equiv 0$',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2022 (תשפ"ב) — spring
  // ════════════════════════════════════════════════════════════════
  {
    code: "2022_א_I",
    year: 2022,
    moed: "א",
    semester: "spring",
    date: "25.07.22",
    lecturers: ["פרופ' אלכס גורביץ'", "פרופ' צליל סלע", 'ד"ר ארי שנידמן'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 25,
        summary:
          'א) $A\\in M_n(\\mathbb{C})$ אנטי-סימטרית ($A=-A^t$) עם איברים ממשיים. הוכיחו ע"ע של $A$ הם מדומים טהורים (כלומר $\\lambda=ai$, $a\\in\\mathbb{R}$); ב) מצאו מטריצה לא-לכסינה $A\\in M_2(\\mathbb{R})$ עם ע"ע $\\lambda=1$ וו"ע $\\binom{1}{1}$',
        subparts: [
          {
            id: "i",
            points: 12,
            type: "proof_short",
            topic: "self_adjoint",
            summary: 'ע"ע של $A=-A^t$ ממשית ⟹ מדומה טהור',
          },
          {
            id: "ii",
            points: 13,
            type: "counterexample",
            topic: "diagonalization",
            summary:
              '$A\\in M_2(\\mathbb{R})$ לא לכסינה עם $\\lambda=1$ וו"ע $\\binom{1}{1}$',
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "counterexample",
        topic: "matrix_similarity",
        points: 25,
        summary:
          "א) $A,B\\in M_n(\\mathbb{F})$ הפיכות. הוכיחו או תנו דוגמא נגדית ש-$AB$ ו-$BA$ חופפות כאשר: (i) $\\mathbb{F}=\\mathbb{C}$; (ii) $\\mathbb{F}=\\mathbb{R}$; ב) $B=\\begin{pmatrix}1&0&0\\\\a&1&0\\\\b&c&1\\end{pmatrix}, A=\\begin{pmatrix}1&0&0\\\\1&1&0\\\\0&1&1\\end{pmatrix}$. קבעו עבור אילו ערכי $a,b,c\\in\\mathbb{R}$ המטריצות $A$ ו-$B$ דומות",
        subparts: [
          {
            id: "א.i",
            points: 5,
            type: "counterexample",
            topic: "bilinear_form",
            summary: "$AB,BA$ חופפות מעל $\\mathbb{C}$? (EXCLUDED)",
          },
          {
            id: "א.ii",
            points: 5,
            type: "counterexample",
            topic: "bilinear_form",
            summary: "$AB,BA$ חופפות מעל $\\mathbb{R}$? (EXCLUDED)",
          },
          {
            id: "ב",
            points: 15,
            type: "compute",
            topic: "matrix_similarity",
            summary: "$a,b,c$ עבורם $A,B$ דומות",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "char_polynomial",
        points: 25,
        summary:
          "א) $A\\in M_n(\\mathbb{C})$ עם $A^m=I_n$ עבור $m\\in\\mathbb{N}$. בנוסף נתון של-$A$ יש ע\"ע $\\lambda$ יחיד. הוכיחו $A=\\lambda I_n$; ב) $q:\\mathbb{R}^3\\to\\mathbb{R}$ תבנית ריבועית $q(x,y,z)=x^2+10y^2+3z^2+6xy+4yz$. האם קיים $0\\neq v\\in\\mathbb{R}^3$ עם $q(v)=0$? (EXCLUDED לסעיף ב')",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "diagonalization",
            summary: '$A^m=I$ + ע"ע יחיד ⟹ $A$ סקלרית',
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "quadratic_form",
            summary: "האם $\\exists v: q(v)=0$? (EXCLUDED)",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_projection",
        points: 25,
        summary:
          'א) $V$ ממ"פ ממ"ס, $U,W\\subseteq V$ ת"מ עם $U\\perp W$. יהי $v\\in V$ ו-$v_U,v_W$ ההטלות האורתוגונליות שלו על $U,W$ בהתאמה. הוכיחו $\\|v\\|^2\\geq\\|v_U\\|^2+\\|v_W\\|^2$; ב) הוכיחו $x,y,z\\in\\mathbb{R}$ חיוביים, $x+y+z=1$ ⟹ $(x\\sqrt{z}+y\\sqrt{x}+z\\sqrt{y})^2\\leq xyz(\\frac{1}{x}+\\frac{1}{y}+\\frac{1}{z})$',
        subparts: [
          {
            id: "א",
            points: 13,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$\\|v\\|^2\\geq\\|v_U\\|^2+\\|v_W\\|^2$ עבור $U\\perp W$",
          },
          {
            id: "ב",
            points: 12,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary: "אי-שוויון על $x+y+z=1$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        topics: ["invariant_subspace"],
        points: 25,
        summary:
          'א) $V$ ממ"ס מעל $\\mathbb{F}$, $f:V\\to V$. יהיו $u,w$ ו"ע של $f$ לערכים $\\lambda\\neq\\mu$ בהתאמה, ו-$W\\subseteq V$ ת"מ $f$-אינווריאנטי כך ש-$u+w\\in W$. הוכיחו $u,w\\in W$; ב) $A\\in M_7(\\mathbb{C})$ עם פ"מ $(X-1)^2(X-4)^2$ ו-$\\mathrm{rk}(A-4I_7)=4$. רשמו את כל מטריצות הז\'ורדן עבור $A$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "invariant_subspace",
            summary: 'ת"מ $f$-אינווריאנטי, $u+w\\in W$ ⟹ $u,w\\in W$',
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "jordan_form",
            summary:
              "ספירת ז'ורדנים של $A\\in M_7$ עם $m_T,\\mathrm{rk}$ נתונים",
          },
        ],
      },
    ],
  },
  {
    code: "2022_ב_I",
    year: 2022,
    moed: "ב",
    semester: "spring",
    date: "18.08.22",
    lecturers: ["פרופ' אלכס גורביץ'", "פרופ' צליל סלע", 'ד"ר ארי שנידמן'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ג",
        type: "proof_short",
        topic: "matrix_similarity",
        points: 25,
        summary:
          "א) $A\\in M_n(\\mathbb{C})$. הוכיחו $A$ דומה ל-$A^t$ (השחלוף); ב) הוכיחו לכל $x,y,z\\in\\mathbb{C}$ המקיימים $|y|=|z|$ קיים $a\\in\\mathbb{C}$ כך ש-$\\begin{pmatrix}x&y\\\\z&a\\end{pmatrix}$ ניתנת ללכסון אוניטרי",
        subparts: [
          {
            id: "i",
            points: 12,
            type: "proof_short",
            topic: "matrix_similarity",
            summary: "$A$ דומה ל-$A^t$ (שחלוף)",
          },
          {
            id: "ii",
            points: 13,
            type: "compute",
            topic: "unitary_diagonalization",
            summary:
              "קיום $a$: $\\begin{pmatrix}x&y\\\\z&a\\end{pmatrix}$ לכסינה אוניטרית",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ב",
        type: "proof_short",
        topic: "jordan_form",
        points: 25,
        summary:
          "א) $V$ ממ\"ס, $g:V\\times V\\to\\mathbb{R}$ תבנית ביליניארית סימטרית עם סיגנטורה (חתימה) שאינה $(0,n)$ ואינה $(n,0)$. הוכיחו שקיים $0\\neq v\\in V$ כך ש-$g(v,v)=0$ (EXCLUDED — סיגנטורה); ב) $B=(v_1,\\ldots,v_n)$ בסיס $V$ מעל $\\mathbb{C}$, $f:V\\to V$ אופ' עם $f(v_i)=v_{i+1}$ עבור $1\\leq i<n$ ו-$f(v_n)=v_1$. חשבו את צורת ז'ורדן של $f$",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "bilinear_form",
            summary: "סיגנטורה לא מוגדרת ⟹ קיים $v\\neq0$: $g(v,v)=0$ (EXCLUDED)",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "jordan_form",
            summary: "$f$ פרמוטציה ציקלית — צורת ז'ורדן",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 25,
        summary:
          'א) $V$ ממ"פ פנימית מעל $\\mathbb{C}$, $f:V\\to V$ ל"ל מקיים $f^2=-\\mathrm{id}_V$. מצאו את כל הע"ע של $f$ והוכיחו $f$ לכסין; ב) נתון מ"פ פנימית $\\langle\\cdot|\\cdot\\rangle$ על $\\mathbb{R}^3$ כך שלכל $x,y,z\\in\\mathbb{R}$ מתקיים $\\left\\|\\binom{x}{y,z}\\right\\|^2=x^2+11y^2+12z^2+6xy+2yz-2xz$. מצאו בסיס אורתוגונלי של $\\mathbb{R}^3$ ביחס ל-$\\langle\\cdot|\\cdot\\rangle$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "diagonalization",
            summary: '$f^2=-I$ ⟹ ע"ע $\\pm i$ ו-$f$ לכסין',
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "gram_schmidt",
            summary: "בסיס אורתוגונלי ל-$\\mathbb{R}^3$ עם נורמה לא-סטנ'",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_projection",
        points: 25,
        summary:
          'א) $V,\\langle\\cdot|\\cdot\\rangle$ ממ"פ ממ"ס, $W\\subseteq V$ ת"מ. $u,v\\in V$, $u_W,v_W$ ההטלות האורתוגונליות שלהן על $W$. הוכיחו $d(u_W,v_W)\\leq d(u,v)$ ($d$ פונקציית המרחק $d(x,y)=\\|x-y\\|$); ב) הוכיחו לכל $x_1,\\ldots,x_{2n}\\in\\mathbb{R}$ מתקיים $(x_1+\\ldots+x_{2n})^2\\leq(x_1^2+\\ldots+x_n^2+n)(x_{n+1}^2+\\ldots+x_{2n}^2+n)$ ומצאו את כל הערכים $x_1,\\ldots,x_{2n}$ עבורם מתקיים שוויון',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "orthogonal_projection",
            summary: "$d(u_W,v_W)\\leq d(u,v)$ — ההטלה מקצרת מרחקים",
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary: "אי-שוויון 2n + תנאי שוויון",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ב",
        type: "proof_short",
        topic: "nilpotent_basic",
        points: 25,
        summary:
          "א) $f:V\\to V$ אופ' נילפוטנטי. הוכיחו לא קיים תת-מרחב $f$-אינווריאנטי $U\\neq\\{0_V\\}$ עם $U\\oplus\\ker f=V$; ב) מצאו את כל הערכים $a\\in\\mathbb{C}$ עבורם המטריצה $\\begin{pmatrix}2&a&1\\\\0&2&0\\\\0&4&3+a\\end{pmatrix}\\in M_3(\\mathbb{C})$ ניתנת ללכסון",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "nilpotent_basic",
            summary: "אין $U\\neq 0$ אינווריאנטי: $U\\oplus\\ker f=V$",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "$a\\in\\mathbb{C}$ עבורם המטריצה לכסינה",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2023 (תשפ"ג) — winter
  // ════════════════════════════════════════════════════════════════
  {
    code: "2023w_א_I",
    year: 2023,
    moed: "א",
    semester: "winter",
    date: "15.02.23",
    lecturers: ["מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "חובה",
        points: 30,
        choose: 2,
        from: ["Q1", "Q2"],
        mandatory: ["Q1", "Q2"],
        note: "Q1: 16 נק', Q2: 14 נק'",
      },
      {
        name: "חלק (א)",
        points: 14,
        choose: 1,
        from: ["Q3", "Q4"],
        note: "כל שאלה 14 נק'",
      },
      {
        name: "חלק (ב)",
        points: 56,
        choose: 4,
        from: ["Q5", "Q6", "Q7", "Q8", "Q9"],
        note: "כל שאלה 14 נק'",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "minimal_polynomial_vec",
        points: 16,
        summary:
          "$V=\\mathbb{Q}^3$, $A=\\begin{pmatrix}1&\\\\1&2&1\\\\&-1&1\\end{pmatrix}\\in M_3(\\mathbb{Q})$. (i) פולינום מינימלי $\\min_{e_1}(T)\\in\\mathbb{Q}[T]$ של $e_1=\\binom{1}{0,0}$ ביחס ל-$A$; (ii) בסיס ז'ורדן עבור $A$; (iii) תת-מרחב מקסימלי שצמצום $A$ אליו ניתן ללכסון",
        subparts: [
          {
            id: "i",
            points: 5,
            type: "compute",
            topic: "minimal_polynomial_vec",
            summary: "$\\min_{e_1}(T)$",
          },
          {
            id: "ii",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "בסיס ז'ורדן ל-$A$",
          },
          {
            id: "iii",
            points: 5,
            type: "compute",
            topic: "diagonalization",
            summary: 'ת"מ מקסימלי שעליו $A$ לכסין',
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "compute",
        topic: "unitary_diagonalization",
        points: 14,
        summary:
          '$A=\\begin{pmatrix}&i\\\\i&\\end{pmatrix}\\in M_2(\\mathbb{C})$. מצאו ע"ע של $A$. $D,U\\in M_2(\\mathbb{C})$ אוניטרית, $D$ אלכסונית: $D=U^*AU$. חשבו $A^{203}$',
        subparts: [
          {
            id: "i",
            points: 4,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'ע"ע של $A$',
          },
          {
            id: "ii",
            points: 6,
            type: "compute",
            topic: "unitary_diagonalization",
            summary: "$U$ אוניטרית: $D=U^*AU$",
          },
          {
            id: "iii",
            points: 4,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "$A^{203}$",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 14,
        summary:
          "$V=\\mathbb{R}^3$ עם המ\"פ הסקלרית הסטנ', $U=\\{x-2y+2z=0\\}\\subseteq V$. הפעילו תהליך גרם-שמידט על $\\left(\\binom{2}{2,1},\\binom{0}{1,1}\\right)$ כדי לקבל בסיס אורתונורמלי ל-$U$. מצאו את ההטלה האורתוגונלית של $\\binom{3}{3,0}$ על $U^\\perp$, המשלים האורתוגונלי של $U$. חשבו את המרחק מ-$\\binom{3}{3,0}$ ל-$U$",
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ב",
        type: "proof_short",
        topic: "jordan_form",
        points: 14,
        summary:
          "(א) הניחו ש-$A,B\\in M_2(\\mathbb{C})$ שתי מטריצות עם אותו פולינום אופייני ואותו פולינום מינימלי. הוכיחו כי לשתיהן יש אותה צורת ז'ורדן; (ב) תנו דוגמא לשתי מטריצות ז'ורדן שונות $A,B\\in M_4(\\mathbb{C})$ עם אותו פולינום אופייני ואותו פולינום מינימלי. הסבירו את תשובתכם",
        subparts: [
          {
            id: "א",
            points: 7,
            type: "proof_short",
            topic: "jordan_form",
            summary: "$M_2$: $\\chi,m$ זהים ⟹ ז'ורדן זהה",
          },
          {
            id: "ב",
            points: 7,
            type: "counterexample",
            topic: "jordan_form",
            summary: "$M_4$: דוגמה ל-$\\chi,m$ זהים אך ז'ורדן שונה",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_real",
        points: 14,
        summary:
          '$A\\in M_2(\\mathbb{R})$ סימטרית. הוכיחו כי קיים $(u_1,u_2)$ בסיס אורתונורמלי של $\\mathbb{R}^2$ של ו"ע של $A$',
      },
      {
        id: "Q6",
        number: 6,
        chapter: "ב",
        type: "proof_short",
        topic: "jordan_chain",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ס מעל שדה $\\mathbb{F}$, $f:V\\to V$ אופ\'. יהי $0\\neq v\\in V$ עבורו מתקיים $f^2v\\neq0$, $f^3v=0$. הוכיחו $(v,fv,f^2v)$ בלתי תלויה לינארית ב-$V$',
      },
      {
        id: "Q7",
        number: 7,
        chapter: "א",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ס מעל שדה $\\mathbb{F}$, $f:V\\to V$ אופ\'. יהיו $P,Q\\in\\mathbb{F}[T]$ זרים זה לזה, קרי $\\gcd(P,Q)=1$. הוכיחו: $V=\\ker P(f)\\oplus\\ker Q(f)$ אם $P(f)Q(f)=0$',
      },
      {
        id: "Q8",
        number: 8,
        chapter: "א",
        type: "proof_short",
        topic: "minimal_polynomial",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ס מעל שדה $\\mathbb{F}$, $f:V\\to V$ אופ\' לינארי. יהיו $\\lambda\\in\\mathbb{F}$ ו-$\\mu(T)\\in\\mathbb{F}[T]$ הפ"מ של $f$. הוכיחו $\\lambda$ ע"ע של $f$ אם ורק אם $\\lambda$ שורש של $\\mu(T)$',
      },
      {
        id: "Q9",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "unitary_operator",
        points: 14,
        summary:
          '$V$ ממ"פ ממ"ס מעל $\\mathbb{C}$, $f:V\\to V$ אופ\'. (א) הוכיחו כי קיים $\\lambda\\in\\mathbb{C}$ ע"ע של $f$; (ב) הוכיחו: אם $f$ אוניטרי ו-$\\lambda\\in\\mathbb{C}$ ע"ע של $f$ אז $|\\lambda|=1$',
        subparts: [
          {
            id: "א",
            points: 6,
            type: "proof_short",
            topic: "eigenvalue_definition",
            summary: 'קיים ע"ע מעל $\\mathbb{C}$',
          },
          {
            id: "ב",
            points: 8,
            type: "proof_short",
            topic: "unitary_operator",
            summary: '$f$ אוניטרי, $\\lambda$ ע"ע ⟹ $|\\lambda|=1$',
          },
        ],
      },
    ],
  },
  {
    code: "2023w_ב_I",
    year: 2023,
    moed: "ב",
    semester: "winter",
    date: "10.03.23",
    lecturers: ["מר איתמר צביק"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "חובה",
        points: 30,
        choose: 2,
        from: ["Q1", "Q2"],
        mandatory: ["Q1", "Q2"],
        note: "Q1: 16 נק', Q2: 14 נק'",
      },
      {
        name: "חלק (א)",
        points: 14,
        choose: 1,
        from: ["Q3", "Q4"],
        note: "כל שאלה 14 נק'",
      },
      {
        name: "חלק (ב)",
        points: 56,
        choose: 4,
        from: ["Q5", "Q6", "Q7", "Q8", "Q9"],
        note: "כל שאלה 14 נק'",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 16,
        summary:
          "$A=\\begin{pmatrix}1&0&0\\\\0&4&-1\\\\0&1&2\\end{pmatrix}\\in M_3(\\mathbb{R})$. (i) מצאו מטריצה $J$ בצורת ז'ורדן הדומה למטריצה $A$; (ii) מצאו מטריצה הפיכה $P\\in M_3(\\mathbb{R})$ כך שמתקיים $J=P^{-1}AP$; (iii) מצאו וקטור ציקלי של $A$, קרי וקטור שתת-מרחב הציקלי שנוצר על ידו באמצעות $A$ הוא $\\mathbb{R}^3$",
        subparts: [
          {
            id: "i",
            points: 6,
            type: "compute",
            topic: "jordan_form",
            summary: "$J$ ז'ורדן הדומה ל-$A$",
          },
          {
            id: "ii",
            points: 5,
            type: "compute",
            topic: "jordan_form",
            summary: "$P$ הפיכה: $J=P^{-1}AP$",
          },
          {
            id: "iii",
            points: 5,
            type: "compute",
            topic: "cyclic_subspace",
            summary: 'ו"ע ציקלי של $A$',
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        points: 14,
        summary:
          '$A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}\\in M_2(\\mathbb{R})$. מצאו ע"ע של $A$. $D,O\\in M_2(\\mathbb{R})$, $O$ אורתוגונלית, $D$ אלכסונית: $D=O^tAO$. חשבו $A^{2023}\\binom{-2}{1}$',
        subparts: [
          {
            id: "i",
            points: 4,
            type: "compute",
            topic: "diagonalization_compute",
            summary: 'ע"ע של $A$',
          },
          {
            id: "ii",
            points: 6,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "$O$ אורתוגונלית: $D=O^tAO$",
          },
          {
            id: "iii",
            points: 4,
            type: "compute",
            topic: "diagonalization_compute",
            summary: "חשבו $A^{2023}\\binom{-2}{1}$",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 14,
        summary:
          '$V=M_2(\\mathbb{R})$ עם המ"פ הפנימית $\\langle A|B\\rangle=\\mathrm{Tr}(A^tB)$. בסיס אורתונורמלי לתת-המרחב $U=\\mathrm{Span}\\left(\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix},\\begin{pmatrix}1&1\\\\0&0\\end{pmatrix}\\right)$. חשבו את $p_U\\left(\\begin{pmatrix}1&0\\\\2&0\\end{pmatrix}\\right)$, ההטלה האורתוגונלית של הוקטור על תת המרחב $U$. חשבו את המרחק מ-$\\begin{pmatrix}1&0\\\\2&0\\end{pmatrix}$ ל-$U$',
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 14,
        summary:
          "(א) כתבו את כל מטריצות ז'ורדן $J\\in M_6(\\mathbb{C})$ עד כדי סידור בלוקים, המקיימות $\\mu_J(T)=(T-2)^2(T-3)^3$; (ב) לכל אחת מהמטריצות שמצאתם בסעיף א', מצאו את הפולינום האופייני $\\chi_J(T)$ ואת הריבוי הגאומטרי של כל אחד מהערכים העצמיים. הסבירו את תשובתכם",
        subparts: [
          {
            id: "א",
            points: 7,
            type: "compute",
            topic: "jordan_form",
            summary: "כל ז'ורדנים $\\in M_6$ עם $\\mu_J=(T-2)^2(T-3)^3$",
          },
          {
            id: "ב",
            points: 7,
            type: "compute",
            topic: "alg_geo_multiplicity",
            summary: "פ\"א וריבוי גאומטרי לכל ז'ורדן",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "spectral_theorem_complex",
        points: 14,
        summary:
          '$V$ ממ"פ פנימית ממ"ד 2 מעל $\\mathbb{C}$, $f:V\\to V$ אוניטרי. הוכיחו: קיים $B=(b_1,b_2)$ בסיס אורתונורמלי של $V$ כך ש-$D=[f]_B=\\begin{pmatrix}\\lambda&\\\\&\\mu\\end{pmatrix}\\in M_2(\\mathbb{C})$ אלכסונית',
      },
      {
        id: "Q6",
        number: 6,
        chapter: "א",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ס מעל $\\mathbb{F}$, $f:V\\to V$ אופ\' לינארי המקיים $f^2=f$. הוכיחו כי קיימים תת-מרחבים $U,W\\leq V$ כך ש-$f$ ההטלה על $U$ במקביל ל-$W$',
      },
      {
        id: "Q7",
        number: 7,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 14,
        summary:
          '$V$ ממ"פ אוקלידית ממ"ד 2, $f:V\\to V$ אופ\' לינארי. הגדירו $f$ אורתוגונלי. הוכיחו $f$ אורתוגונלי אמ"מ לכל $(u_1,u_2)$ בסיס אורתונורמלי של $V$, $(fu_1,fu_2)$ הוא בסיס אורתונורמלי של $V$',
      },
      {
        id: "Q8",
        number: 8,
        chapter: "א",
        type: "proof_short",
        topic: "minimal_polynomial",
        points: 14,
        summary:
          '$V$ מ"מ ממ"ד 2 מעל $\\mathbb{C}$, $f:V\\to V$ אופ\' לינארי. הוכיחו כי $f$ לכסין אמ"מ הפ"מ של $f$ לינארי או מהצורה $\\mu(T)=(T-\\lambda)(T-\\delta)$ עם $\\lambda\\neq\\delta$',
      },
      {
        id: "Q9",
        number: 9,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        points: 14,
        summary:
          '$V$ ממ"פ ממ"ס מעל $\\mathbb{C}$, $f:V\\to V$ אופ\'. (א) הוכיחו כי קיים $\\lambda\\in\\mathbb{C}$ ע"ע של $f$; (ב) הוכיחו: אם $f$ צמוד לעצמו ו-$\\lambda\\in\\mathbb{C}$ ע"ע של $f$ אז $\\lambda\\in\\mathbb{R}$',
        subparts: [
          {
            id: "א",
            points: 6,
            type: "proof_short",
            topic: "eigenvalue_definition",
            summary: 'קיום ע"ע מעל $\\mathbb{C}$',
          },
          {
            id: "ב",
            points: 8,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '$f$ צמוד לעצמו ⟹ ע"ע ב-$\\mathbb{R}$',
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2024 (תשפ"ד) — Moed A.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2024_א_I",
    year: 2024,
    moed: "א",
    semester: "winter",
    date: "09.04.24",
    lecturers: ['ד"ר שי אברה'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "diagonalization",
        points: 25,
        summary:
          '(1) $\\mathbb{F}$ שדה, $a,b,c,d\\in\\mathbb{F}$. הוכיחו כי $A=\\begin{pmatrix}a&1&0\\\\0&a&0\\\\b&c&d\\end{pmatrix}$ אינה לכסינה; (2) $V$ ממ"פ פנימית מעל $\\mathbb{R}$ ממ"ס, $T:V\\to V$ אופרטור. הוכיחו $T$ אורתוגונלי ($T^*T=I_V$) אמ"מ $\\|T(v)\\|=\\|v\\|$ לכל $v\\in V$',
        subparts: [
          {
            id: "1",
            points: 12,
            type: "proof_short",
            topic: "diagonalization",
            summary:
              '$A=\\begin{pmatrix}a&1&0\\\\0&a&0\\\\b&c&d\\end{pmatrix}$ אינה לכסינה',
          },
          {
            id: "2",
            points: 13,
            type: "proof_short",
            topic: "orthogonal_operator",
            summary: '$T^*T=I_V$ ⟺ $\\|Tv\\|=\\|v\\|$ לכל $v$',
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 25,
        summary:
          '(1) $T:V\\to V$ ממ"ס, $T^2=T$. נסמן $\\mathrm{im}(T)=\\{T(v):v\\in V\\}$. הוכיחו $V=\\ker(T)\\oplus\\mathrm{im}(T)$; (2) $V=M_2(\\mathbb{R})$ עם $\\langle A,B\\rangle=\\mathrm{trace}(A^tB)$, $T(A)=\\tfrac12(A+A^t)$. מצאו בסיס אורתונורמלי $B$ כך ש-$[T]_B$ אלכסונית',
        subparts: [
          {
            id: "1",
            points: 12,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: '$T^2=T$ ⟹ $V=\\ker T\\oplus\\mathrm{im}\\,T$',
          },
          {
            id: "2",
            points: 13,
            type: "compute",
            topic: "spectral_theorem_real",
            summary:
              '$T(A)=\\tfrac12(A+A^t)$: בסיס אורתונורמלי שבו $[T]_B$ אלכסונית',
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "diagonalization_compute",
        points: 25,
        summary:
          '(1) $A=\\begin{pmatrix}1&2&3\\\\4&4&4\\\\3&2&1\\end{pmatrix}\\in M_3(\\mathbb{R})$. מצאו $P,B\\in M_3(\\mathbb{R})$, $P$ הפיכה, כך ש-$A^{100}P=PB$; (2) מצאו $0\\neq x\\in\\mathbb{R}^n$ שעבורו $\\frac{(x_1+2x_2+\\ldots+nx_n)^2}{x_1^2+\\ldots+x_n^2}$ מקבל ערך מקסימלי, והוכיחו שהוא המקסימום',
        subparts: [
          {
            id: "1",
            points: 12,
            type: "compute",
            topic: "diagonalization_compute",
            summary: '$A^{100}P=PB$ עבור $P$ הפיכה',
          },
          {
            id: "2",
            points: 13,
            type: "compute",
            topic: "cauchy_schwarz",
            summary: 'מקסום $(x_1+2x_2+\\ldots+nx_n)^2/\\sum x_i^2$ (קושי-שוורץ)',
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "א",
        type: "proof_short",
        topic: "minimal_polynomial",
        points: 25,
        summary:
          '(1) $A\\in M_n(\\mathbb{F})$, $Z=\\mathrm{span}\\{I,A,A^2,A^3,\\ldots\\}\\leq M_n(\\mathbb{F})$. הוכיחו $\\dim(Z)\\leq n$; (2) $A=\\begin{pmatrix}2&-1&0\\\\-1&2&-1\\\\0&-1&2\\end{pmatrix}\\in M_3(\\mathbb{R})$. מצאו $D$ אלכסונית ו-$O$ אורתוגונלית כך ש-$D=O^tAO$',
        subparts: [
          {
            id: "1",
            points: 12,
            type: "proof_short",
            topic: "minimal_polynomial",
            summary: '$\\dim\\mathrm{span}\\{I,A,A^2,\\ldots\\}\\leq n$',
          },
          {
            id: "2",
            points: 13,
            type: "compute",
            topic: "spectral_theorem_real",
            summary: "לכסון אורתוגונלי $D=O^tAO$ למטריצה סימטרית",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "א",
        type: "compute",
        topic: "diagonalization_compute",
        points: 25,
        summary:
          '(1) $A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}\\in M_2(\\mathbb{R})$. חשבו את $A^{100}$; (2) $A\\in M_n(\\mathbb{C})$. הראו כי $\\ker(A)=\\ker(A^*A)$',
        subparts: [
          {
            id: "1",
            points: 12,
            type: "compute",
            topic: "diagonalization_compute",
            summary:
              "חשבו $A^{100}$ עבור $A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$",
          },
          {
            id: "2",
            points: 13,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "$\\ker(A)=\\ker(A^*A)$",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2024 (תשפ"ד) — Moed B.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2024_ב_I",
    year: 2024,
    moed: "ב",
    semester: "winter",
    date: "26.05.24",
    lecturers: ['ד"ר שי אברה'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "diagonalization",
        points: 25,
        summary:
          '(1) $A\\in M_5(\\mathbb{R})$ עם $\\mathrm{rank}(I+A)=\\mathrm{rank}(2I-A)=3$ ו-$\\det(A)=20$. הוכיחו $A$ לכסינה ומצאו מטריצה אלכסונית הדומה לה; (2) $V$ ממ"פ פנימית ממ"ס מעל $\\mathbb{C}$, יהי $B$ בסיס אורתונורמלי, $T:V\\to V$ אופרטור. הוכיחו: $T$ אוניטרי אמ"מ $[T]_B$ אוניטרית',
        subparts: [
          {
            id: "i",
            points: 12,
            type: "proof_short",
            topic: "diagonalization",
            summary: "$A\\in M_5$ עם דרגות נתונות ו-$\\det=20$ ⟹ לכסינה",
          },
          {
            id: "ii",
            points: 13,
            type: "proof_short",
            topic: "unitary_operator",
            summary: "$T$ אוניטרי ⟺ $[T]_B$ אוניטרית",
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "primary_decomposition",
        points: 25,
        summary:
          '(1) $V$ ממ"ס, $T:V\\to V$ ל"ל ⟹ $T$ לכסין אמ"מ $\\ker(T)\\cap\\mathrm{Im}(T)=\\{0\\}$. הוכיחו $\\mathrm{Im}(T)=\\{T(v)|v\\in V\\}$; (2) $A\\in M_n(\\mathbb{R})$. הראו שקיימת $B\\in M_n(\\mathbb{R})$ עם $B^2=A^tA$',
        subparts: [
          {
            id: "i",
            points: 12,
            type: "proof_short",
            topic: "primary_decomposition",
            summary: "$T$ לכסין ⟺ $\\ker T\\cap\\mathrm{Im}\\,T=\\{0\\}$",
          },
          {
            id: "ii",
            points: 13,
            type: "compute",
            topic: "self_adjoint",
            summary: "$B\\in M_n(\\mathbb{R})$: $B^2=A^tA$",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "matrix_similarity",
        points: 25,
        summary:
          "(1) הראו שהמטריצות $A=\\begin{pmatrix}1&4&0\\\\0&2&0\\\\0&5&3\\end{pmatrix}, B=\\begin{pmatrix}3&0&0\\\\4&2&5\\\\0&0&1\\end{pmatrix}$ דומות; (2) הראו לכל $a,b,c\\in\\mathbb{R}$ מתקיים $(a^2b+b^2c+c^2a)(ab^2+bc^2+ca^2)\\geq 9a^2b^2c^2$",
        subparts: [
          {
            id: "i",
            points: 12,
            type: "compute",
            topic: "matrix_similarity",
            summary: "$A,B$ דומות (בדיקת ז'ורדן/חיתוך)",
          },
          {
            id: "ii",
            points: 13,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary: "$(a^2b+b^2c+c^2a)(ab^2+bc^2+ca^2)\\geq 9a^2b^2c^2$",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 25,
        summary:
          '(1) $V$ מ"מ מעל $\\mathbb{R}$, $T:V\\to V$ אופ\', $\\alpha_1<\\ldots<\\alpha_n\\in\\mathbb{R}$, $v_1,\\ldots,v_n\\in V$ עם $T(v_k)=\\alpha_k\\cdot v_k$ לכל $k=1,\\ldots,n$. הוכיחו $v_1,\\ldots,v_n$ בלתי תלויים לינארית; (2) $V=\\mathbb{R}^2$ עם המ"פ הפנימית "הבאה" (אין צורך להוכיח שזאת מכ"פ): $\\langle,\\rangle:V\\times V\\to\\mathbb{R}$, $\\langle v,u\\rangle=v^t\\begin{pmatrix}2&-3\\\\-3&6\\end{pmatrix}u$. הפעילו את תהליך גרם-שמידט על הבסיס הסטנדרטי',
        subparts: [
          {
            id: "i",
            points: 12,
            type: "proof_short",
            topic: "eigenvectors_independent",
            summary: 'ו"ע לע"ע שונים בת"ל',
          },
          {
            id: "ii",
            points: 13,
            type: "compute",
            topic: "gram_schmidt",
            summary: "גרם-שמידט עם מ\"פ לא-סטנ' על $\\mathbb{R}^2$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "א",
        type: "compute",
        topic: "diagonalization_compute",
        points: 25,
        summary:
          "(1) $A=\\begin{pmatrix}2&1\\\\-6&7\\end{pmatrix}\\in M_2(\\mathbb{R})$. חשבו את $A^{100}$; (2) $A\\in M_n(\\mathbb{C})$. הראו כי $\\ker(A)=\\ker(A^*A)$",
        subparts: [
          {
            id: "i",
            points: 12,
            type: "compute",
            topic: "diagonalization_compute",
            summary:
              "חשבו $A^{100}$ עבור $A=\\begin{pmatrix}2&1\\\\-6&7\\end{pmatrix}$",
          },
          {
            id: "ii",
            points: 13,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "$\\ker(A)=\\ker(A^*A)$",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2024 (תשפ"ד) — Moed C.  Note: the paper is labeled "Moed B"; coded "C" here
  //  to distinguish it from Avraham's Moed B that year.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2024_ג_I",
    year: 2024,
    moed: "ג",
    semester: "spring",
    date: "03.09.24",
    lecturers: ["פרופ' אלכס גורביץ'", "אורי פרזנצ'בסקי"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 8,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9"],
        note: "ענו על 8 מתוך 9 שאלות",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "determinant_basics",
        summary:
          "$a\\in\\mathbb{R}$; חשבו דטרמיננטה של המטריצה הטרי-דיאגונלית $A\\in M_5(\\mathbb{R})$ ($a$ באלכסון, $1$ מעליו ומתחתיו); עבור אילו ערכי $a$ היא הפיכה",
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "counterexample",
        topic: "invariant_subspace",
        summary:
          '$S\\circ T=T\\circ S$, $\\lambda$ ע"ע של $S$, $V_\\lambda$ המרחב העצמי. הוכיחו/הפריכו: (א) $\\lambda$ בהכרח ע"ע של $T$; (ב) $V_\\lambda$ בהכרח $T$-אינווריאנטי',
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ב",
        type: "true_false",
        topic: "matrix_similarity",
        summary:
          "האם $A=\\begin{pmatrix}0&2&0\\\\3&0&2\\\\5&3&0\\end{pmatrix}$, $B=\\begin{pmatrix}0&2&0\\\\4&0&2\\\\5&2&0\\end{pmatrix}\\in M_3(\\mathbb{C})$ דומות? הסבירו",
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        summary:
          '$V$ ממ"פ ממשי ממ"ס, $T:V\\to V$ כך שלכל וקטור יחידה $v$ גם $T(v)$ וקטור יחידה ⟹ $T$ אורתוגונלי',
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "cauchy_schwarz",
        summary:
          "הוכיחו לכל $x,y\\in\\mathbb{R}$: $x^2+xy+y^2\\leq\\sqrt{(2x^2+y^2)(x^2+2y^2)}$; קבעו עבור אילו $x,y$ מתקיים שוויון",
      },
      {
        id: "Q6",
        number: 6,
        chapter: "ב",
        type: "proof_short",
        topic: "nilpotent_classify",
        summary:
          "$A\\in M_{n\\times n}(\\mathbb{R})$, $A^k=0$ ⟹ הוכיחו $\\mathrm{rk}\\,A\\leq\\frac{(k-1)n}{k}$",
      },
      {
        id: "Q7",
        number: 7,
        chapter: "ג",
        type: "compute",
        topic: "gram_schmidt",
        summary:
          "$\\mathbb{R}^4$ (מ\"פ סטנדרטית), $S=\\{(1,1,-1,-2),(-2,-2,1,1)\\}$: (א) בסיס כלשהו ל-$S^\\perp$; (ב) בסיס אורתונורמלי ל-$\\mathrm{Span}(S)$",
      },
      {
        id: "Q8",
        number: 8,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_projection",
        summary:
          "$u_1,u_2$ ההיטלים האורתוגונליים של $v_1,v_2$ על תת-מרחב $U$; הוכיחו $\\langle u_1\\mid v_2\\rangle=\\langle v_1\\mid u_2\\rangle$",
      },
      {
        id: "Q9",
        number: 9,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        summary:
          "$A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}\\in M_2(\\mathbb{R})$; מצאו $O$ אורתוגונלית כך ש-$O^{-1}AO$ אלכסונית; קבעו האם קיים $x\\in\\mathbb{R}^2$: $(Ax)^tx<0$",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2025 (תשפ"ה) — Moed A.  Note: the paper's header says "תשפ"ד" but the date
  //  is תשפ"ה (header typo).
  // ════════════════════════════════════════════════════════════════
  {
    code: "2025_א_I",
    year: 2025,
    moed: "א",
    semester: "winter",
    date: "23.02.25",
    lecturers: ['ד"ר שי אברה'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "diagonalization",
        points: 25,
        summary:
          '(א) $\\mathbb{F}$ שדה, $a\\in\\mathbb{F}$, $A=\\begin{pmatrix}-a+4&a-2&0\\\\-a+2&a&2\\\\0&0&3\\end{pmatrix}\\in M_3(\\mathbb{F})$. מצאו עבור אילו ערכים של $a$ המטריצה הנ"ל היא לכסינה; (ב) $A\\in M_n(\\mathbb{C})$ נורמלית עם ע"ע $\\lambda_1,\\ldots,\\lambda_n$. הוכיחו כי $A$ הרמיטית אם ורק אם כל הערכים העצמיים ממשיים',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "compute",
            topic: "diagonalization",
            summary: "$a\\in\\mathbb{F}$ עבורם $A$ לכסינה",
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "self_adjoint",
            summary: '$A$ נורמלית ⟹ ($A$ הרמיטית ⟺ הע"ע ממשיים)',
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "proof_short",
        topic: "cyclic_subspace",
        points: 25,
        summary:
          '(א) $T$ אופרטור על מ"מ ממ"ס $V$, $m_T$ הפ"מ של $T$. לכל $v\\in V$ יהי $Z_v$ המרחב הציקלי שלו ביחס ל-$T$. הוכיחו: $\\deg m_T=1$ ⟺ ($\\forall 0\\neq v\\in V$, $\\dim Z_v=1$); (ב) $V=\\mathbb{R}^4$ ממ"פ פנימית ביחס למ"פ הסקלרית, $W=\\mathrm{Span}\\left\\{\\binom{1}{-1,0,0},\\binom{0}{0,1,-1},\\binom{0}{1,-1,0}\\right\\}\\subseteq V$. מצאו בסיס אורתונורמלי ל-$W$',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "minimal_polynomial",
            summary: "$\\deg m_T=1$ ⟺ $\\dim Z_v=1\\,\\forall v$",
          },
          {
            id: "ב",
            points: 13,
            type: "compute",
            topic: "gram_schmidt",
            summary: "בסיס אורתונורמלי ל-$W\\subseteq\\mathbb{R}^4$",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "compute",
        topic: "matrix_similarity",
        points: 25,
        summary:
          "(א) $A=\\begin{pmatrix}1&3\\\\0&2\\end{pmatrix}, B=\\begin{pmatrix}a&b\\\\4b&a\\end{pmatrix}\\in M_2(\\mathbb{C})$. עבור אילו ערכים של $a,b\\in\\mathbb{C}$ המטריצות דומות?; (ב) הוכיחו לכל $0<a,b,c,d\\in\\mathbb{R}$ מתקיים $\\frac{16}{a+b+c+d}\\leq\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}+\\frac{1}{d}$ ותנו תנאי הכרחי ומספיק על $a,b,c,d$ למתי שוויון מתקיים",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "compute",
            topic: "matrix_similarity",
            summary: "$a,b\\in\\mathbb{C}$ עבורם $A,B$ דומות",
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "cauchy_schwarz",
            summary: "$16/(a+b+c+d)\\leq 1/a+1/b+1/c+1/d$ + שוויון",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 25,
        summary:
          "(א) הוכיחו כי קיימת צורת ז'ורדן למטריצה הבאה ומצאו אותה: $A=\\begin{pmatrix}2&1&1&1&1\\\\0&2&0&1&1\\\\0&0&2&1&1\\\\0&0&0&2&1\\\\0&0&0&0&2\\end{pmatrix}\\in M_5(\\mathbb{C})$; (ב) $A\\in M_3(\\mathbb{R})$ צמודה לעצמה. הוכיחו שקיימת $B\\in M_3(\\mathbb{R})$ צמודה לעצמה כך ש-$B^3=A$",
        subparts: [
          {
            id: "א",
            points: 12,
            type: "compute",
            topic: "jordan_form",
            summary: "צורת ז'ורדן ל-$A=2I+N$ עם $N$ מתחלפת",
          },
          {
            id: "ב",
            points: 13,
            type: "proof_short",
            topic: "self_adjoint",
            summary: "$A$ סימטרית ⟹ $\\exists B$ סימטרית: $B^3=A$",
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "proof_short",
        topic: "matrix_similarity",
        points: 25,
        summary:
          '(א) $A\\in M_3(\\mathbb{C})$. הוכיחו כי $A$ דומה ל-$A^t$; (ב) $V$ ממ"פ פנימית מעל הממשיים ויהיו $v,u\\in V$. הוכיחו: $\\|v\\|=\\|u\\|$ אמ"מ $u+v\\perp u-v$. האם הטענה נכונה גם מעל המרוכבים? הוכיחו או תנו דוגמא נגדית',
        subparts: [
          {
            id: "א",
            points: 12,
            type: "proof_short",
            topic: "matrix_similarity",
            summary: "$A\\in M_3(\\mathbb{C})$ דומה ל-$A^t$",
          },
          {
            id: "ב",
            points: 13,
            type: "counterexample",
            topic: "norm_basics",
            summary: "$\\|v\\|=\\|u\\|$ ⟺ $u+v\\perp u-v$ (ממשי vs מרוכב)",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2025 (תשפ"ה) — Moed B.  Source: full PDF pp. 159–160 (last exam in the file).
  //  Distinct from Moed A (23.2.25): 5 questions, each with parts A/B.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2025_ב_I",
    year: 2025,
    moed: "ב",
    semester: "winter",
    date: "19.03.25",
    lecturers: ['ד"ר שי אברה'],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 4,
        from: ["Q1", "Q2", "Q3", "Q4", "Q5"],
        note: "ענו על 4 מתוך 5 שאלות — 25 נק' כל אחת; כל שאלה בשני סעיפים א/ב",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "char_polynomial",
        points: 25,
        summary:
          '(א) $A\\in M_6(\\mathbb{Q})$ מדרגה $2$ עם פולינום אופייני $p_A$ המקיים $x^2-2x-15\\mid p_A$; חשבו את $\\mathrm{tr}(A^2)$; (ב) $V$ ממ"פ ממשי ממימד אי-זוגי, $T$ אורתוגונלי וצמוד לעצמו, $B$ בסיס עם $\\det[T]_B=1$ ⟹ קיים $0\\neq v\\in V$: $T(v)=v$',
        subparts: [
          {
            id: "א",
            type: "compute",
            topic: "char_polynomial",
            summary:
              "$A\\in M_6(\\mathbb{Q})$, rank $2$, $x^2-2x-15\\mid p_A$ ⟹ $\\mathrm{tr}(A^2)$",
          },
          {
            id: "ב",
            type: "proof_short",
            topic: "orthogonal_operator",
            summary:
              '$T$ אורתוגונלי+צמוד לעצמו, ממד אי-זוגי, $\\det=1$ ⟹ $\\exists v\\neq0$: $Tv=v$',
          },
        ],
      },
      {
        id: "Q2",
        number: 2,
        chapter: "א",
        type: "compute",
        topic: "diagonalization_compute",
        points: 25,
        summary:
          '(א) $a\\neq b\\in\\mathbb{Q}$; מצאו בסיס של וקטורים עצמיים לאופרטור $T:\\mathbb{Q}^3\\to\\mathbb{Q}^3$, $T(x,y,z)=(ax+by+bz,\\,bx+ay+bz,\\,bx+by+az)$; (ב) $U,W\\subseteq V$ תתי-מרחבים ⟹ $(U+W)^\\perp=U^\\perp\\cap W^\\perp$',
        subparts: [
          {
            id: "א",
            type: "compute",
            topic: "diagonalization_compute",
            summary:
              'בסיס ו"ע ל-$T(x,y,z)=(ax+by+bz,bx+ay+bz,bx+by+az)$',
          },
          {
            id: "ב",
            type: "proof_short",
            topic: "orthogonal_complement",
            summary: "$(U+W)^\\perp=U^\\perp\\cap W^\\perp$",
          },
        ],
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "cayley_hamilton",
        points: 25,
        summary:
          "(א) $A\\in M_n(\\mathbb{F})$ הפיכה ⟹ קיים $Q\\in\\mathbb{F}[x]$: $A^{-1}=Q(A)$; (ב) עבור אילו $1\\leq n\\in\\mathbb{Z}$ הפונקציה $f(x_1,\\ldots,x_n)=\\frac{\\left(\\sum_{k=1}^n\\sqrt{k}\\,x_k\\right)^2}{\\sum_{k=1}^n x_k^2}$ מקיימת $f(x)\\leq 15$ לכל $x\\neq0$",
        subparts: [
          {
            id: "א",
            type: "proof_short",
            topic: "cayley_hamilton",
            summary: "$A$ הפיכה ⟹ $A^{-1}=Q(A)$ (קיילי-המילטון)",
          },
          {
            id: "ב",
            type: "compute",
            topic: "cauchy_schwarz",
            summary:
              "$f(x)=(\\sum\\sqrt{k}x_k)^2/\\sum x_k^2\\leq 15$ — עבור אילו $n$",
          },
        ],
      },
      {
        id: "Q4",
        number: 4,
        chapter: "א",
        type: "proof_short",
        topic: "cyclic_subspace",
        points: 25,
        summary:
          '(א) $T$ אופרטור ממשי עם $p_T=x^2+4$ ⟹ לכל $0\\neq v\\in V$ המרחב הציקלי $Z_{T,v}=V$; (ב) $T$ הרמיטי עם ע"ע $\\lambda_1,\\ldots,\\lambda_n$ ⟹ $\\langle v,Tv\\rangle\\in\\mathbb{R}$, $\\lambda_i\\in\\mathbb{R}$, ושקילות $0<\\lambda_i\\Leftrightarrow 0<\\langle v,Tv\\rangle\\,\\forall v\\neq0$',
        subparts: [
          {
            id: "א",
            type: "proof_short",
            topic: "cyclic_subspace",
            summary: "$p_T=x^2+4$ ⟹ $Z_{T,v}=V$ לכל $v\\neq0$",
          },
          {
            id: "ב",
            type: "proof_short",
            topic: "self_adjoint",
            summary:
              '$T$ הרמיטי: ע"ע ממשיים ו-$0<\\lambda_i\\Leftrightarrow 0<\\langle v,Tv\\rangle$ (אופרטור חיובי)',
          },
        ],
      },
      {
        id: "Q5",
        number: 5,
        chapter: "א",
        type: "proof_short",
        topic: "diagonalization",
        points: 25,
        summary:
          '(א) $A\\in M_n(\\mathbb{R})$, $A^2=I$; אם $1$ הוא הע"ע היחיד ⟹ $A=I$; (ב) $V=M_2(\\mathbb{R})$, $\\langle A,B\\rangle=\\mathrm{trace}(A^tB)$, $W=\\mathrm{span}\\left\\{\\binom{1\\,1}{0\\,1},\\binom{1\\,0}{1\\,1}\\right\\}$; חשבו $P_W\\!\\left(\\binom{1\\,2}{0\\,0}\\right)$',
        subparts: [
          {
            id: "א",
            type: "proof_short",
            topic: "diagonalization",
            summary: "$A^2=I$ + ע\"ע יחיד $1$ ⟹ $A=I$",
          },
          {
            id: "ב",
            type: "compute",
            topic: "orthogonal_projection",
            summary: "היטל אורתוגונלי $P_W(I_2\\text{-block})$ ב-$M_2(\\mathbb{R})$",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2026 (תשפ"ו) — Moed B.  Source: entered manually by the user, not present in
  //  any project PDF. verified:false = not page-checked, but user-attested.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2026_ב_I",
    year: 2026,
    moed: "ב",
    semester: "winter",
    date: "19.03.26",
    lecturers: ["פרופ' אלכס גורביץ'"],
    duration_hours: 3,
    total_points: 100,
    verified: false,
    parts: [
      {
        name: "כל המבחן",
        points: 100,
        choose: 7,
        from: [
          "Q1", "Q2", "Q3", "Q4", "Q5",
          "Q6", "Q7", "Q8", "Q9", "Q10",
        ],
        note: "ענו על 7 מתוך 10 שאלות",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "compute",
        topic: "char_polynomial",
        summary:
          "$A\\in M_3(\\mathbb{Q})$, $\\mathrm{rank}\\,A=2$, $x^3-5x-2\\mid p_A$; חשבו $\\mathrm{tr}(A^2)$",
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        summary:
          "$T$ אורתוגונלי וצמוד לעצמו על $V$ אי-זוגי, $\\det[T]_B=1$ ⟹ קיים $v\\neq0$: $T(v)=v$",
      },
      {
        id: "Q3",
        number: 3,
        chapter: "ג",
        type: "compute",
        topic: "spectral_theorem_real",
        summary:
          'מצאו בסיס ו"ע לאופרטור $(x,y,z)\\mapsto(ax+by+bz,\\,bx+ay+bz,\\,bx+by+az)$',
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_complement",
        summary: "הוכיחו: $(U+W)^\\perp=U^\\perp\\cap W^\\perp$",
      },
      {
        id: "Q5",
        number: 5,
        chapter: "א",
        type: "proof_short",
        topic: "cayley_hamilton",
        summary:
          "הוכיחו: $A$ הפיכה ⟹ קיים $Q\\in F[x]$: $A^{-1}=Q(A)$ (קיילי-המילטון)",
      },
      {
        id: "Q6",
        number: 6,
        chapter: "ג",
        type: "proof_short",
        topic: "cauchy_schwarz",
        summary:
          "עבור אילו $n\\in\\{2,3,4\\}$: $f(x)=\\sqrt{\\frac{x^n-1}{x-1}}<1.5$ לכל $x>0$, $x\\neq1$",
      },
      {
        id: "Q7",
        number: 7,
        chapter: "א",
        type: "proof_short",
        topic: "cyclic_subspace",
        summary:
          "$p_T=x^2+4\\in\\mathbb{R}[x]$ ⟹ $Z_{T,v}=V$ לכל $v\\neq0$ ($T$ פרימיטיבי)",
      },
      {
        id: "Q8",
        number: 8,
        chapter: "ג",
        type: "proof_short",
        topic: "self_adjoint",
        summary:
          '$T$ הרמיטי, $\\lambda_1,\\ldots,\\lambda_k$ ע"ע; אפיינו מתי $\\langle u,Tv\\rangle\\geq0$ לכל $u,v$',
      },
      {
        id: "Q9",
        number: 9,
        chapter: "א",
        type: "proof_short",
        topic: "eigenvalue_definition",
        summary: '$A^2=I$, הע"ע היחיד הוא $1$ ⟹ $A=I$',
      },
      {
        id: "Q10",
        number: 10,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        summary:
          "$V=M_2(\\mathbb{R})$, $\\langle A,B\\rangle=\\mathrm{tr}(A^tB)$, $W=\\{$מטריצות סימטריות$\\}$; חשבו $P_W(I_2)$",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  //  2026 (תשפ"ו) — Moed A.  Source: the exam-report PDF (id 202600801351170);
  //  questions only — the handwritten solution and grade report are not indexed.
  // ════════════════════════════════════════════════════════════════
  {
    code: "2026_א_I",
    year: 2026,
    moed: "א",
    semester: "winter",
    date: "13.02.26",
    lecturers: ["פרופ' אלכס גורביץ'"],
    duration_hours: 3,
    total_points: 100,
    verified: true,
    parts: [
      {
        name: "חלק א'",
        points: 20,
        choose: 1,
        from: ["Q1", "Q2"],
        note: "ענו על 1 מתוך 2 שאלות — 20 נק' כל אחת",
      },
      {
        name: "חלק ב'",
        points: 84,
        choose: 6,
        from: ["Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9"],
        note: "ענו על 6 מתוך 7 שאלות — 14 נק' כל אחת (מקסימום מבחן 100)",
      },
    ],
    questions: [
      {
        id: "Q1",
        number: 1,
        chapter: "א",
        type: "proof_short",
        topic: "minimal_polynomial",
        points: 20,
        summary:
          '$T:V\\to V$ על מ"ו נוצר סופית, $P\\in\\mathbb{F}[x]$ עם $P(T)=0$; הוכיחו כי $m_T\\mid P$',
      },
      {
        id: "Q2",
        number: 2,
        chapter: "ב",
        type: "proof_short",
        topic: "jordan_chain",
        points: 20,
        summary:
          '$T:V\\to V$ נילפוטנטי, $v$ וקטור מגובה $h$; הוכיחו ש-$(v,T(v),\\ldots,T^{h-1}(v))$ בת"ל',
      },
      {
        id: "Q3",
        number: 3,
        chapter: "א",
        type: "proof_short",
        topic: "diagonalization",
        points: 14,
        summary:
          "$T\\circ T\\circ T=T$; (א) הוכיחו $T$ לכסין; (ב) קיימים $T_1$ אידמפוטנטי ו-$T_2$ אינוולוציה מתחלפים עם $T=T_1\\circ T_2$",
      },
      {
        id: "Q4",
        number: 4,
        chapter: "ב",
        type: "compute",
        topic: "jordan_form",
        points: 14,
        summary:
          "$T:\\mathbb{R}[x]_{\\leq2}\\to\\mathbb{R}[x]_{\\leq2}$, $T(p)=2p-p'$; מצאו מטריצת ז'ורדן של $T$ ובסיס $B$ שבו $[T]_B$ ז'ורדנית",
      },
      {
        id: "Q5",
        number: 5,
        chapter: "ג",
        type: "counterexample",
        topic: "norm_basics",
        points: 14,
        summary:
          "$u,v,w$ עם $u\\perp v$, $w\\perp v$; הוכיחו או הפריכו: (א) $\\|u\\|^2+\\|w\\|^2=\\|v\\|^2\\Rightarrow w\\perp u$; (ב) $\\|u\\|^2+\\|v\\|^2+\\|w\\|^2=\\|u+v+w\\|^2\\Rightarrow w\\perp u$",
      },
      {
        id: "Q6",
        number: 6,
        chapter: "ג",
        type: "compute",
        topic: "cauchy_schwarz",
        points: 14,
        summary:
          "$a,b,c>0$, $a+b+c=1$; מצאו את הערך המקסימלי של $\\sqrt{2a+1}+\\sqrt{2b+1}+\\sqrt{2c+1}$ והוכיחו שהוא מקסימלי (קושי-שוורץ)",
      },
      {
        id: "Q7",
        number: 7,
        chapter: "ג",
        type: "compute",
        topic: "orthogonal_projection",
        points: 14,
        summary:
          "מ\"פ ב-$\\mathbb{R}^3$: $\\langle x,y\\rangle=2x_1y_1+x_2y_1+x_1y_2+2x_2y_2+3x_3y_3$, $W=\\{x_1+x_2+x_3=0\\}$",
        subparts: [
          {
            id: "א",
            points: 7,
            type: "compute",
            topic: "gram_schmidt",
            summary: "מצאו בסיס אורתונורמלי ל-$W$",
          },
          {
            id: "ב",
            points: 7,
            type: "compute",
            topic: "orthogonal_projection",
            summary: "חשבו את ההיטל האורתוגונלי של $(1,0,0)$ על $W$",
          },
        ],
      },
      {
        id: "Q8",
        number: 8,
        chapter: "ג",
        type: "proof_short",
        topic: "orthogonal_operator",
        points: 14,
        summary:
          '$T$ אורתוגונלי, $1$ ו-$(-1)$ ע"ע, $\\dim V_1+\\dim V_{-1}>n-2$; הוכיחו $V=V_1\\oplus V_{-1}$',
      },
      {
        id: "Q9",
        number: 9,
        chapter: "ג",
        type: "compute",
        topic: "unitary_diagonalization",
        points: 14,
        summary:
          "$A=\\begin{pmatrix}2&i\\\\z&2\\end{pmatrix}\\in M_2(\\mathbb{C})$; (א) עבור אילו $z$ היא לכסינה אוניטרית; (ב) עבור $z=i$ מצאו $U$ אוניטרית עם $U^{-1}AU$ אלכסונית",
      },
    ],
  },
];
