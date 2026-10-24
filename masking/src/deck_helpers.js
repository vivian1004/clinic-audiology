/**
 * deck_helpers.js — 聽力學課程投影片版型函式庫
 *
 * 封裝色彩系統、字級、留白與常用版型，讓單元腳本只需描述內容。
 *
 * 用法：
 *   const { newDeck } = require('./deck_helpers.js');
 *   const d = newDeck();
 *   d.cover({ title: '成人助聽器選配', en: 'Hearing Aids for Adults',
 *             org: '弘光科技大學　語言治療與聽力學系',
 *             course: '聽覺輔具實務　單元教材｜授課時數 3 小時',
 *             source: '依據 ASHA Practice Portal 實務指引編纂',
 *             notes: '開場 5 分鐘…' });
 *   d.section({ num:'1', name:'概論與角色', mins:'25 分鐘',
 *               points:['…','…'], notes:'…' });
 *   d.cards({ title:'…', items:[{h:'評估',b:'說明'}], numbered:true, footer:'…', notes:'…' });
 *   d.save('/mnt/user-data/outputs/單元_教學投影片.pptx');
 *
 * 每個版型函式都接受 title / subtitle / footer / notes，並回傳該 slide 物件，
 * 需要額外元素時可自行 addText。
 */

const pptxgen = require("pptxgenjs");

// ── 設計系統 ────────────────────────────────────────────────
const C = {
  P: "0F4C5C",      // 主色 深藍綠
  P2: "3E8E9C",     // 輔色 淺藍綠
  TINT: "E9F1F3",   // 淺底
  ACC: "D9642A",    // 強調 橘（每頁最多一處）
  ACC_TINT: "FCEAE0",
  TXT: "1E2A2E",
  MUT: "7A8A90",
  W: "FFFFFF",
  DARK_CARD: "1B6274",   // 深底頁上的卡片
  DARK_TXT: "CFE2E6"     // 深底頁上的內文
};
const F = "Microsoft JhengHei";
const SW = 13.333, SH = 7.5, M = 0.85, CW = SW - 2 * M;

function newDeck(opts) {
  opts = opts || {};
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  if (opts.author) pres.author = opts.author;
  if (opts.title) pres.title = opts.title;

  // ── 內部工具 ──────────────────────────────────────────
  const slide = (dark) => {
    const s = pres.addSlide();
    s.background = { color: dark ? C.P : C.W };
    return s;
  };
  const setTitle = (s, text, color) => {
    if (!text) return;
    s.addText(text, { x: M, y: 0.52, w: CW, h: 0.85, fontFace: F, fontSize: 36,
      bold: true, color: color || C.P, align: "left", valign: "middle", margin: 0 });
  };
  const setSub = (s, text) => {
    if (!text) return;
    s.addText(text, { x: M, y: 1.38, w: CW, h: 0.45, fontFace: F, fontSize: 20,
      color: C.MUT, valign: "middle", margin: 0 });
  };
  const FOOTER_MAX_Y = 6.25;   // 再往下就會侵犯 0.6" 安全邊界
  const setFooter = (s, text, y, color) => {
    if (!text) return;
    s.addText(text, { x: M, y: Math.min(y, FOOTER_MAX_Y), w: CW, h: 0.55, fontFace: F, fontSize: 21,
      bold: true, color: color || C.ACC, align: "center", margin: 0 });
  };
  const card = (s, x, y, w, h, fill) =>
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h,
      fill: { color: fill || C.TINT }, line: { color: fill || C.TINT }, rectRadius: 0.12 });
  const circle = (s, x, y, d, label, fill, txtColor, size) => {
    s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d,
      fill: { color: fill || C.P }, line: { color: fill || C.P } });
    s.addText(label, { x, y, w: d, h: d, fontFace: F, fontSize: size || 20, bold: true,
      color: txtColor || C.W, align: "center", valign: "middle", margin: 0 });
  };
  const arrow = (s, x, y, w, color) =>
    s.addShape(pres.ShapeType.rightArrow, { x, y, w, h: 0.28,
      fill: { color: color || C.P2 }, line: { color: color || C.P2 } });
  const bullets = (s, arr, o) => {
    s.addText(arr.map((t, i) => ({ text: t,
      options: { bullet: true, breakLine: i < arr.length - 1 } })), Object.assign({
      x: M, y: 4.5, w: CW, h: 1.6, fontFace: F, fontSize: 22, color: C.TXT,
      paraSpaceAfter: 12, margin: 0 }, o || {}));
  };
  const done = (s, p) => { if (p.notes) s.addNotes(p.notes); return s; };
  // 依欄數計算等寬版位
  const grid = (n, gap) => {
    gap = gap === undefined ? 0.32 : gap;
    const w = (CW - gap * (n - 1)) / n;
    return { w, x: (i) => M + i * (w + gap) };
  };

  const api = {
    pres, C, F, M, CW, SW, SH,
    slide, card, circle, arrow, grid,   // 需要自訂版面時可直接取用

    /** 封面（深底） */
    cover(p) {
      const s = slide(true);
      s.addText(p.title, { x: M, y: 2.1, w: CW, h: 1.3, fontFace: F, fontSize: 60,
        bold: true, color: C.W, margin: 0 });
      if (p.en) s.addText(p.en, { x: M, y: 3.45, w: CW, h: 0.6, fontFace: F,
        fontSize: 26, color: C.P2, margin: 0 });
      s.addShape(pres.ShapeType.rect, { x: M, y: 4.35, w: 1.6, h: 0.05,
        fill: { color: C.ACC }, line: { color: C.ACC } });
      let y = 4.68;
      if (p.org) { s.addText(p.org, { x: M, y, w: CW, h: 0.45, fontFace: F,
        fontSize: 22, color: C.W, margin: 0 }); y += 0.5; }
      if (p.course) { s.addText(p.course, { x: M, y, w: CW, h: 0.45, fontFace: F,
        fontSize: 20, color: C.DARK_TXT, margin: 0 }); y += 0.48; }
      if (p.source) s.addText(p.source, { x: M, y, w: CW, h: 0.45, fontFace: F,
        fontSize: 18, color: C.P2, margin: 0 });
      return done(s, p);
    },

    /** 單元分隔頁（深底）：大編號 + 單元名 + 重點條列 */
    section(p) {
      const s = slide(true);
      s.addText(p.num, { x: M, y: 1.5, w: 2.2, h: 2.0, fontFace: F, fontSize: 96,
        bold: true, color: C.ACC, valign: "middle", margin: 0 });
      s.addText(p.name, { x: M + 2.2, y: 1.75, w: CW - 2.2, h: 1.1, fontFace: F,
        fontSize: 44, bold: true, color: C.W, valign: "middle", margin: 0 });
      if (p.mins) s.addText(p.mins, { x: M + 2.25, y: 2.85, w: CW - 2.2, h: 0.5,
        fontFace: F, fontSize: 22, color: C.P2, valign: "middle", margin: 0 });
      if (p.points) bullets(s, p.points, { x: M + 2.25, y: 3.7, w: CW - 2.4, h: 2.2,
        fontSize: 24, color: C.DARK_TXT, paraSpaceAfter: 10 });
      return done(s, p);
    },

    /** 一句話宣告：lead（小字）＋ main（大字）＋ note（強調色） */
    statement(p) {
      const s = slide(p.dark);
      const bodyColor = p.dark ? C.W : C.P;
      if (p.lead) s.addText(p.lead, { x: M, y: p.dark ? 1.5 : 2.0, w: CW, h: 0.8,
        fontFace: F, fontSize: p.dark ? 22 : 36, color: p.dark ? C.P2 : C.MUT, margin: 0 });
      s.addText(p.main, { x: M, y: p.dark ? 2.2 : 2.85, w: CW, h: 2.0, fontFace: F,
        fontSize: p.size || (p.dark ? 44 : 48), bold: true, color: bodyColor,
        margin: 0, valign: "top", lineSpacingMultiple: 1.2 });
      if (p.note) {
        if (p.dark) {
          card(s, M, 4.6, CW, 1.5, C.DARK_CARD);
          s.addText(p.note, { x: M + 0.4, y: 4.6, w: CW - 0.8, h: 1.5, fontFace: F,
            fontSize: 21, color: C.W, valign: "middle", margin: 0, lineSpacingMultiple: 1.35 });
        } else {
          s.addText(p.note, { x: M, y: 4.6, w: CW, h: 0.7, fontFace: F, fontSize: 26,
            bold: true, color: C.ACC, margin: 0 });
        }
      }
      return done(s, p);
    },

    /** 2–4 個大數字：items = [{n:'43.2%', label:'說明', accent:true}] */
    bigStats(p) {
      const s = slide(); setTitle(s, p.title); setSub(s, p.subtitle);
      const g = grid(p.items.length, 0.45);
      p.items.forEach((it, i) => {
        const color = it.accent ? C.ACC : (i % 2 ? C.P : C.P2);
        s.addText(it.n, { x: g.x(i), y: 2.4, w: g.w, h: 1.5, fontFace: F,
          fontSize: p.items.length > 3 ? 54 : 66, bold: true, color, align: "center", margin: 0 });
        s.addText(it.label, { x: g.x(i) + 0.2, y: 3.95, w: g.w - 0.4, h: 1.2, fontFace: F,
          fontSize: 20, color: C.TXT, align: "center", margin: 0, lineSpacingMultiple: 1.3 });
      });
      setFooter(s, p.footer, 5.6, C.MUT);
      return done(s, p);
    },

    /** 長條圖：labels / values 等長 */
    barChart(p) {
      const s = slide(); setTitle(s, p.title); setSub(s, p.subtitle);
      const colors = p.values.map((_, i) => i === p.values.length - 1 ? C.ACC : C.P2);
      s.addChart(pres.ChartType.bar, [{ name: p.seriesName || "數值",
        labels: p.labels, values: p.values }], {
        x: M, y: 2.2, w: CW, h: 4.0, barDir: "col", chartColors: colors,
        showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 22,
        dataLabelFontFace: F, dataLabelColor: C.TXT,
        dataLabelFormatCode: p.format || '0.0"%"',
        catAxisLabelFontFace: F, catAxisLabelFontSize: 20, catAxisLabelColor: C.TXT,
        valAxisLabelFontFace: F, valAxisLabelFontSize: 16, valAxisLabelColor: C.MUT,
        valAxisMaxVal: p.max, valGridLine: { color: "E3E8EA", size: 1 },
        catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 90
      });
      return done(s, p);
    },

    /** 並列卡片：items = [{h:'標題', b:'說明', accent:true}]，numbered 加編號圓圈 */
    cards(p) {
      const s = slide(); setTitle(s, p.title); setSub(s, p.subtitle);
      const n = p.items.length;
      const perRow = p.perRow || (n <= 5 ? n : Math.ceil(n / 2));
      const rows = Math.ceil(n / perRow);
      const g = grid(perRow, perRow > 3 ? 0.28 : 0.45);
      const top = p.subtitle ? 2.3 : 2.2;
      const gy = 0.35;
      // 內容區底線：留頁尾時要空出位置，否則會擠到安全邊界
      const bottom = p.footer ? 5.95 : 6.65;
      const cap = rows === 1 ? 3.4 : 2.0;
      const h = Math.min(cap, (bottom - top - gy * (rows - 1)) / rows);
      p.items.forEach((it, i) => {
        const x = g.x(i % perRow), y = top + Math.floor(i / perRow) * (h + gy);
        card(s, x, y, g.w, h, it.accent ? C.ACC_TINT : C.TINT);
        const hc = it.accent ? C.ACC : C.P;
        if (rows === 1) {
          let ty = y + 0.35;
          if (p.numbered) { circle(s, x + g.w / 2 - 0.35, y + 0.3, 0.7, String(i + 1),
            it.accent ? C.ACC : C.P); ty = y + 1.15; }
          s.addText(it.h, { x, y: ty, w: g.w, h: 0.65, fontFace: F, fontSize: 24,
            bold: true, color: hc, align: "center", margin: 0 });
          if (it.b) s.addText(it.b, { x: x + 0.15, y: ty + 0.65, w: g.w - 0.3, h: h - (ty - y) - 0.7,
            fontFace: F, fontSize: 18, color: C.TXT, align: "center", margin: 0,
            lineSpacingMultiple: 1.3 });
        } else {
          const tx = p.numbered ? x + 1.1 : x + 0.4;
          if (p.numbered) circle(s, x + 0.3, y + 0.45, 0.65, String(i + 1), it.accent ? C.ACC : C.P);
          s.addText(it.h, { x: tx, y: y + 0.28, w: g.w - (tx - x) - 0.3, h: 0.5, fontFace: F,
            fontSize: 24, bold: true, color: hc, margin: 0 });
          if (it.b) s.addText(it.b, { x: tx, y: y + 0.82, w: g.w - (tx - x) - 0.3, h: 0.85,
            fontFace: F, fontSize: 18, color: C.TXT, margin: 0, lineSpacingMultiple: 1.25 });
        }
      });
      setFooter(s, p.footer, top + rows * h + (rows - 1) * gy + 0.3);
      return done(s, p);
    },

    /** 關鍵字方塊：words = ['適應擴音', …]，6–12 個 */
    keywordGrid(p) {
      const s = slide(); setTitle(s, p.title); setSub(s, p.subtitle);
      const n = p.words.length;
      const perRow = p.perRow || (n <= 9 ? 3 : 4);
      const rows = Math.ceil(n / perRow);
      const g = grid(perRow, perRow > 3 ? 0.28 : 0.45);
      const gy = rows <= 3 ? 0.35 : 0.25;
      const top = p.subtitle ? 2.35 : 2.25;
      const bottom = p.footer ? 5.95 : 6.65;
      const h = Math.min(1.05, (bottom - top - gy * (rows - 1)) / rows);
      p.words.forEach((t, i) => {
        const x = g.x(i % perRow), y = top + Math.floor(i / perRow) * (h + gy);
        card(s, x, y, g.w, h);
        s.addText(t, { x, y, w: g.w, h, fontFace: F, fontSize: perRow > 3 ? 19 : 24,
          bold: true, color: C.P, align: "center", valign: "middle", margin: 0 });
      });
      setFooter(s, p.footer, top + rows * h + (rows - 1) * gy + 0.3);
      return done(s, p);
    },

    /** A vs B 對比：cols = [{head, lead, items:[], accent}] 兩欄 */
    twoColumn(p) {
      const s = slide(); setTitle(s, p.title); setSub(s, p.subtitle);
      p.cols.forEach((c, i) => {
        const w = CW / 2 - 0.3, x = M + i * (CW / 2 + 0.3);
        const hc = c.accent ? C.ACC : (i === 0 ? C.P2 : C.P);
        s.addShape(pres.ShapeType.roundRect, { x, y: 2.2, w, h: 0.85,
          fill: { color: hc }, line: { color: hc }, rectRadius: 0.1 });
        s.addText(c.head, { x, y: 2.2, w, h: 0.85, fontFace: F, fontSize: 28, bold: true,
          color: C.W, align: "center", valign: "middle", margin: 0 });
        let y = 3.2;
        if (c.lead) { s.addText(c.lead, { x: x + 0.25, y, w: w - 0.5, h: 0.75, fontFace: F,
          fontSize: 22, bold: true, color: C.TXT, align: "center", margin: 0,
          lineSpacingMultiple: 1.2 }); y += 0.85; }
        if (c.items && c.items.length) bullets(s, c.items,
          { x: x + 0.45, y, w: w - 0.8, h: 5.9 - y, fontSize: 19, paraSpaceAfter: 10 });
      });
      setFooter(s, p.footer, 6.0, p.footerColor || C.ACC);
      return done(s, p);
    },

    /** 流程：steps = [{h:'選擇', en:'Selection', b:'說明', hot:true}] 3–5 站 */
    processFlow(p) {
      const s = slide(); setTitle(s, p.title); setSub(s, p.subtitle);
      const n = p.steps.length, gap = 0.35;
      const w = (CW - gap * (n - 1)) / n;
      const tall = p.steps.some(st => st.b || st.en);
      const top = 2.4, h = tall ? 2.6 : 1.0;
      p.steps.forEach((st, i) => {
        const x = M + i * (w + gap);
        const bg = st.hot ? C.P : C.TINT, fg = st.hot ? C.W : C.P;
        s.addShape(pres.ShapeType.roundRect, { x, y: top, w, h,
          fill: { color: bg }, line: { color: st.hot ? C.P : C.P2 }, rectRadius: 0.12 });
        s.addText(st.h, { x, y: tall ? top + 0.3 : top, w, h: tall ? 0.8 : h, fontFace: F,
          fontSize: tall ? 30 : 21, bold: true, color: fg, align: "center",
          valign: "middle", margin: 0 });
        if (st.en) s.addText(st.en, { x, y: top + 1.1, w, h: 0.5, fontFace: F, fontSize: 16,
          color: st.hot ? C.P2 : C.MUT, align: "center", margin: 0 });
        if (st.b) s.addText(st.b, { x: x + 0.15, y: top + 1.65, w: w - 0.3, h: 0.7, fontFace: F,
          fontSize: 19, color: st.hot ? C.DARK_TXT : C.TXT, align: "center", margin: 0 });
        if (i < n - 1) arrow(s, x + w + 0.04, top + h / 2 - 0.14, gap - 0.08,
          tall ? C.ACC : C.P2);
      });
      setFooter(s, p.footer, top + h + 0.5);
      return done(s, p);
    },

    /** 編號橫列：items = ['…'] 或 [{h:'評估', b:'說明'}]，4–6 條 */
    rowList(p) {
      const s = slide(); setTitle(s, p.title); setSub(s, p.subtitle);
      const n = p.items.length;
      const top = p.subtitle ? 2.35 : 2.2;
      const bottom = p.footer ? 6.0 : 6.65;
      const step = Math.min(1.02, (bottom - top) / n);
      const h = Math.max(0.55, step - Math.min(0.17, step * 0.17));
      p.items.forEach((raw, i) => {
        const it = typeof raw === "string" ? { b: raw } : raw;
        const y = top + i * step;
        card(s, M, y, CW, h, it.accent ? C.ACC_TINT : C.TINT);
        const cd = Math.min(0.53, h - 0.14);
        circle(s, M + 0.22, y + (h - cd) / 2, cd, String(i + 1),
          it.accent ? C.ACC : C.P, C.W, cd < 0.5 ? 14 : 16);
        if (it.h) {
          s.addText(it.h, { x: M + 0.95, y, w: 1.5, h, fontFace: F, fontSize: 22, bold: true,
            color: it.accent ? C.ACC : C.P, valign: "middle", margin: 0 });
          s.addText(it.b, { x: M + 2.45, y, w: CW - 2.65, h, fontFace: F, fontSize: 19,
            color: C.TXT, valign: "middle", margin: 0 });
        } else {
          s.addText(it.b, { x: M + 0.95, y, w: CW - 1.15, h, fontFace: F, fontSize: 21,
            color: C.TXT, valign: "middle", margin: 0 });
        }
      });
      setFooter(s, p.footer, top + (n - 1) * step + h + 0.2);
      return done(s, p);
    },

    /** 三方關係圓：items = [{h, b, center:true}] */
    circles(p) {
      const s = slide(); setTitle(s, p.title); setSub(s, p.subtitle);
      const d = 2.5, n = p.items.length;
      const gap = (CW - n * d) / (n - 1);
      p.items.forEach((it, i) => {
        const x = M + i * (d + gap);
        const on = !!it.center;
        s.addShape(pres.ShapeType.ellipse, { x, y: 2.5, w: d, h: d,
          fill: { color: on ? C.P : C.TINT }, line: { color: on ? C.P : C.P2 } });
        s.addText(it.h, { x, y: 2.9, w: d, h: 0.6, fontFace: F, fontSize: 26, bold: true,
          color: on ? C.W : C.P, align: "center", margin: 0 });
        if (it.b) s.addText(it.b, { x: x + 0.2, y: 3.5, w: d - 0.4, h: 1.0, fontFace: F,
          fontSize: 18, color: on ? C.DARK_TXT : C.TXT, align: "center", margin: 0,
          lineSpacingMultiple: 1.25 });
      });
      setFooter(s, p.footer, 5.6, C.MUT);
      return done(s, p);
    },

    /** 課堂活動（深底）：label + prompt + steps */
    activity(p) {
      const s = slide(true);
      s.addText(p.label || "課堂演練", { x: M, y: 1.5, w: CW, h: 0.6, fontFace: F,
        fontSize: 22, bold: true, color: C.ACC, margin: 0 });
      s.addText(p.prompt, { x: M, y: 2.2, w: CW, h: 1.3, fontFace: F,
        fontSize: p.promptSize || 40, bold: true, color: C.W, margin: 0,
        lineSpacingMultiple: 1.15 });
      if (p.steps) bullets(s, p.steps, { x: M, y: 3.9, w: CW, h: 2.2, fontSize: 24,
        color: C.DARK_TXT, paraSpaceAfter: 14 });
      return done(s, p);
    },

    /** 案例研討（深底）：label + who + facts + question */
    caseStudy(p) {
      const s = slide(true);
      s.addText(p.label || "案例研討", { x: M, y: 1.3, w: CW, h: 0.6, fontFace: F,
        fontSize: 22, bold: true, color: C.ACC, margin: 0 });
      s.addText(p.who, { x: M, y: 1.9, w: CW, h: 0.9, fontFace: F, fontSize: 40,
        bold: true, color: C.W, margin: 0 });
      if (p.facts) bullets(s, p.facts, { x: M, y: 3.0, w: CW, h: 2.0, fontSize: 22,
        color: C.DARK_TXT, paraSpaceAfter: 12 });
      if (p.question) {
        card(s, M, 5.3, CW, 1.0, C.DARK_CARD);
        s.addText(p.question, { x: M + 0.4, y: 5.3, w: CW - 0.8, h: 1.0, fontFace: F,
          fontSize: 22, bold: true, color: C.W, valign: "middle", margin: 0 });
      }
      return done(s, p);
    },

    /** 三欄案例卡（深底），配合 activity 使用 */
    caseCards(s, items) {
      const g = grid(items.length, 0.45);
      items.forEach((it, i) => {
        s.addShape(pres.ShapeType.roundRect, { x: g.x(i), y: 3.4, w: g.w, h: 2.2,
          fill: { color: C.DARK_CARD }, line: { color: C.DARK_CARD }, rectRadius: 0.12 });
        s.addText(it.h, { x: g.x(i), y: 3.65, w: g.w, h: 0.6, fontFace: F, fontSize: 24,
          bold: true, color: C.ACC, align: "center", margin: 0 });
        s.addText(it.b, { x: g.x(i) + 0.25, y: 4.25, w: g.w - 0.5, h: 1.2, fontFace: F,
          fontSize: 19, color: C.W, align: "center", margin: 0, lineSpacingMultiple: 1.3 });
      });
      return s;
    },

    /** 結語（深底） */
    closing(p) {
      const s = slide(true);
      s.addText(p.lead || "本單元結語", { x: M, y: 1.9, w: CW, h: 0.7, fontFace: F,
        fontSize: 24, color: C.P2, margin: 0 });
      s.addText(p.main, { x: M, y: 2.8, w: CW, h: 2.0, fontFace: F, fontSize: p.size || 38,
        bold: true, color: C.W, margin: 0, lineSpacingMultiple: 1.3 });
      s.addShape(pres.ShapeType.rect, { x: M, y: 5.1, w: 1.6, h: 0.05,
        fill: { color: C.ACC }, line: { color: C.ACC } });
      s.addText(p.footer || "本單元結束｜提問與討論", { x: M, y: 5.4, w: CW, h: 0.6,
        fontFace: F, fontSize: 26, color: C.DARK_TXT, margin: 0 });
      return done(s, p);
    },

    save(path) { return pres.writeFile({ fileName: path }); }
  };

  return api;
}

module.exports = { newDeck, COLORS: C, FONT: F, GEOM: { SW, SH, M, CW } };
