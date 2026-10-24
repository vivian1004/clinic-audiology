const { newDeck } = require('./deck_helpers.js');
const d = newDeck({ title: '臨床遮蔽原則與實作' });
const OUT = process.argv[2] || '../臨床遮蔽原則與實作_教學投影片.pptx';

// ── 開場 ─────────────────────────────────────────────
d.cover({ title:'臨床遮蔽原則與實作', en:'Clinical Masking',
  org:'弘光科技大學　語言治療與聽力學系',
  course:'臨床聽力學　單元教材｜授課時數 3 小時',
  source:'依據 Gelfand, Essentials of Audiology, Ch. 9 編纂',
  notes:'開場 5 分鐘。說明本單元之定位：遮蔽為純音與語音聽力檢查能否得到有效結果之前提。本單元以原書第 9 章為依據，判準數值與公式均依原書；講義中標註「編者補充」者為一般臨床慣例。' });

d.processFlow({ title:'本單元架構與時間配置',
  steps:[{h:'跨耳聽覺',b:'25 分鐘'},{h:'遮蔽時機',b:'30 分鐘'},{h:'遮蔽量',b:'35 分鐘'},
         {h:'高原與過度遮蔽',b:'40 分鐘',hot:true},{h:'特殊情境',b:'20 分鐘'}],
  footer:'單元四為本單元重點',
  notes:'時間配置：開場 5｜單元一 25｜單元二 30｜休息 10｜單元三 35｜單元四 40｜休息 5｜單元五 20｜總結 10。單元四之高原判讀與過度遮蔽計算為臨床最易出錯、亦為考試常見題型，故配置最長時間。' });

d.rowList({ title:'學習目標',
  items:['說明跨耳聽覺與訊號跨越之區別及跨越途徑','列舉各換能器之耳間衰減並說明採用最小值之理由',
         '執行骨導與氣導之遮蔽時機判斷','計算初始遮蔽量，並以 Bing 測驗求閉塞效應',
         '執行高原法並計算過度遮蔽與最大遮蔽量','計算閾上純音與語音測驗之遮蔽量'],
  notes:'學習目標共八項，完整版見講義。此處擇要六項。每項目標皆對應單元末之演練或隨堂測驗。' });

// ── 單元一 ───────────────────────────────────────────
d.section({ num:'1', name:'跨耳聽覺與耳間衰減', mins:'25 分鐘',
  points:['跨耳聽覺與影子曲線','訊號跨越之途徑','氣導與骨導之耳間衰減'],
  notes:'單元一：00:05–00:30。' });

d.statement({ lead:'跨耳聽覺（cross-hearing）', main:'送至測試耳之聲音\n由非測試耳聽到', size:38,
  note:'所得之假閾值曲線稱為影子曲線（shadow curve）',
  notes:'定義：目前受測之耳為測試耳 TE，對側為非測試耳 NTE。只要「可能發生」跨耳聽覺，測驗結果即不可信。判斷是否需要遮蔽，等同判斷是否可能發生跨耳聽覺。' });

d.twoColumn({ title:'單側全聾個案之未遮蔽與遮蔽結果', subtitle:'右耳正常、左耳全聾（原書 Fig. 9.1）',
  cols:[{head:'未遮蔽',lead:'左耳出現「假閾值」',items:['左氣導 55–60 dB HL','左骨導與右骨導相同','實為右耳跨耳聽得']},
        {head:'右耳加遮蔽後',lead:'左耳呈現真實狀態',items:['左氣導無反應','左骨導無反應','與預期結果相符'],accent:true}],
  footer:'未遮蔽之左耳結果實際上不可能存在',
  notes:'以此例說明跨耳聽覺之臨床後果：若未遮蔽，將把全聾耳誤判為中度聽損，左右骨導相同亦會誤導聽損類型之判斷。遮蔽後之閾值以不同符號記錄。' });

d.cards({ title:'三個核心名詞', numbered:true,
  items:[{h:'訊號跨越',b:'訊號物理上存在於對側耳'},{h:'跨耳聽覺',b:'跨越之訊號達到 NTE 閾值而被聽到',accent:true},
         {h:'耳間衰減 IA',b:'訊號跨越頭部所損失之 dB 數'}],
  footer:'有跨越，未必有跨耳聽覺',
  notes:'範例：IA 50 dB、右耳骨導 10 dB HL。左耳 60 dB → 到右耳 10 dB HL，跨耳聽覺；80 dB → 30 dB HL，跨耳聽覺；55 dB → 5 dB HL，低於閾值，僅有跨越。IA 一詞見 Chaiklin（1967）。' });

d.processFlow({ title:'氣導訊號之跨越途徑',
  steps:[{h:'耳機振動',b:'測試耳側'},{h:'頭顱傳導',b:'骨導途徑',hot:true},{h:'對側耳蝸',b:'非測試耳'}],
  footer:'比較對象：測試耳氣導 vs 非測試耳骨導',
  notes:'直覺上以為是聲音從耳罩漏出繞到對側，或經頭帶傳到對側耳機；研究一再證實主要途徑為骨導（Sparrevohn 1946；Zwislocki 1953；Studebaker 1962）。此點直接決定氣導遮蔽規則的寫法。' });

d.barChart({ title:'耳罩式與插入式耳機之平均耳間衰減', subtitle:'Sklare & Denenberg（1987），單位 dB',
  labels:['TDH-49 250','TDH-49 1k','TDH-49 4k','ER-3A 250','ER-3A 1k','ER-3A 4k'],
  values:[54,62,65,89,81,77], max:100, format:'0', seriesName:'IA',
  notes:'數值依原書 Fig. 9.5 估讀之平均值，僅供比較趨勢。插入式耳機 ≤1000 Hz 平均 81–94+ dB，>1000 Hz 71–77 dB。最小值：插入式 ≤1000 Hz 75–85 dB、>1000 Hz 50–65 dB；TDH-49 為 45–60 dB。IA 與接觸面積成反比（Zwislocki 1953）。插入深度不足時 IA 大幅下降（Killion et al. 1985）。' });

d.bigStats({ title:'臨床採用之最小耳間衰減',
  items:[{n:'40 dB',label:'耳罩式耳機\n氣導',accent:true},{n:'50–85',label:'插入式耳機\n依頻率之最小值'},{n:'0 dB',label:'骨導\n（乳突 0–15 dB）'}],
  footer:'判斷是否遮蔽一律採最小值',
  notes:'耳罩式平均約 50–65 dB，但範圍極廣，若用平均值將漏掉 IA 偏低者，故採 40 dB（Studebaker 1967；Martin 1974, 1980）。骨導：前額約 0 dB；乳突 250 Hz 約 0 dB 至 4000 Hz 約 15 dB，個體差異 0–15 dB（Studebaker 1967；Silman & Silverman 1991）。臨床視骨導 IA 為 0。' });

d.activity({ label:'課堂演練｜5 分鐘', prompt:'右耳骨導 10 dB HL，左耳給 60 dB HL',
  steps:['分別以 IA = 40、50、60 dB 計算到達右耳耳蝸之強度','判斷各情形是否發生跨耳聽覺','兩人一組，完成後與鄰組核對'],
  notes:'預期答案：IA 40 → 20 dB HL，跨耳聽覺；IA 50 → 10 dB HL，跨耳聽覺；IA 60 → 0 dB HL，僅跨越。收尾：個人 IA 未知，故須以最小值做保守判斷。' });

// ── 單元二 ───────────────────────────────────────────
d.section({ num:'2', name:'遮蔽時機之判斷', mins:'30 分鐘',
  points:['臨床遮蔽之定義與術語','骨導遮蔽規則','氣導遮蔽規則'],
  notes:'單元二：00:30–01:00。' });

d.statement({ lead:'臨床遮蔽', main:'噪音以氣導送入非測試耳\n使其聽不到測試訊號', size:38,
  note:'不論測試耳以氣導或骨導施測',
  notes:'類比：驗光時遮住一眼。術語：unmasked air/bone 為未加噪音所得；masked air/bone 為對側加噪音所得，例如 masked right air 指左耳給噪音時之右耳氣導。施測前應先向個案說明，初次受測者常對「耳中有噪音」感到困惑，以遮眼類比多能理解。' });

d.processFlow({ title:'施測順序',
  steps:[{h:'未遮蔽 AC',b:'兩耳全部頻率'},{h:'未遮蔽 BC',b:'兩耳全部頻率'},{h:'遮蔽 BC',b:'先判斷、先重測',hot:true},{h:'遮蔽 AC',b:'依真實 BC_N 判斷'}],
  footer:'遮蔽重測先骨導、後氣導',
  notes:'取得未遮蔽閾值時先氣導後骨導；遮蔽重測時順序相反。理由：氣導遮蔽之判斷需要非測試耳之真實骨導閾值，因此骨導必須先完成遮蔽。' });

d.statement({ dark:true, lead:'骨導遮蔽規則', main:'測試耳 ABG ≥ 15 dB\n應遮蔽重測骨導', size:44,
  note:'即 ABG > 10 dB。臨床閾值可信度約 ±5 dB，氣骨導可相差 10 dB，ABG ≤ 10 dB 不具臨床意義。',
  notes:'文獻差異：本書現行版與 Yacullo（1996, 2009）採 > 10 dB；Studebaker（1964）與 ASHA（2005）採 ≥ 10 dB。原書第三版曾採 ASHA 標準，現行版回到 > 10 dB。判斷邏輯：骨導 IA 近 0，幾乎永遠不知道哪一耳在回應，因此只在「哪一耳回應會改變判讀」時才遮蔽。' });

d.twoColumn({ title:'骨導遮蔽判斷範例', subtitle:'右 AC 50、左 AC 70、未遮蔽 BC 45 dB HL',
  cols:[{head:'右耳 ABG 5 dB',lead:'不須遮蔽',items:['45 dB 若來自右耳：ABG 過小','若來自左耳：右骨導 ≥ 50，仍屬感音性','兩種情形結論相同']},
        {head:'左耳 ABG 25 dB',lead:'須遮蔽重測',items:['遮蔽後左骨導可能介於 45–70','ABG 可能為 25 dB（混合性）','也可能為 0 dB（感音性）'],accent:true}],
  footer:'僅在「由哪一耳回應」會改變判讀時才遮蔽',
  notes:'此範例取自原書。強調骨導遮蔽之判斷是逐耳、逐頻率進行。' });

d.rowList({ title:'不建議之骨導遮蔽做法',
  items:[{h:'全部遮蔽',b:'過度保守、費時（Studebaker 1964, 1967）'},
         {h:'無法求 OE',b:'NTE 持續被覆蓋，無從得知閉塞效應大小'},
         {h:'放置問題',b:'無法交叉檢查震動器放置，耳機頭帶反而加重問題'},
         {h:'Weber',b:'判斷聽取耳之準確度與可靠度不足'}],
  notes:'ANSI（2004）曾以骨導校正資料係在對側遮蔽下取得為由，建議骨導一律遮蔽。原書不建議，理由如上。Weber 測驗之支持者亦建議忽略不合理之結果（Studebaker 1967）。' });

d.statement({ dark:true, lead:'氣導遮蔽規則', main:'AC_T − BC_N ≥ 40 dB\n應遮蔽重測氣導', size:44,
  note:'比較測試耳氣導與非測試耳骨導（AOBG），而非兩耳氣導。插入式耳機改用其最小 IA。',
  notes:'三項參數：TE 呈現強度、IA、NTE 真實骨導閾值。此差值稱 air-opposite-bone-gap（AOBG）或 air-contralateral-bone-gap（ACBG）。逐頻率比較（通常 250–4000 Hz）。例外：NTE 氣導優於其骨導（例 AC 10、BC 20）時，以較佳之氣導代入。' });

d.cards({ title:'氣導遮蔽判斷範例', perRow:3,
  items:[{h:'50 − 5 = 45',b:'右 AC 50、左 BC 5\n須遮蔽',accent:true},{h:'50 − 15 = 35',b:'右 AC 50、左 BC 15\n不須遮蔽'},{h:'75 − 35 = 40',b:'右 AC 75、左 BC 35\n須遮蔽',accent:true}],
  footer:'常見錯誤：以兩耳氣導相減',
  notes:'三例均取自原書。第二例 35 dB 未達 40 dB，右耳 50 dB HL 即為真實閾值。第三例恰為 40 dB，符合 ≥ 40 之判準。' });

d.activity({ label:'課堂演練｜6 分鐘', prompt:'在未遮蔽聽力圖上圈出須遮蔽之點',
  steps:['先逐頻率判斷骨導（ABG ≥ 15）','再以 NTE 骨導判斷氣導（AOBG ≥ 40）','核對：是否誤用兩耳氣導相減'],
  notes:'發給一張未遮蔽聽力圖：右耳感音性、左耳混合性，兩耳 2000 Hz 氣導相差 45 dB。預期易錯點：(1) 以兩耳氣導相減；(2) 先判斷氣導、未先確定骨導；(3) 忽略 NTE 氣導優於骨導之例外。' });

d.statement({ dark:true, lead:'中間休息', main:'10 分鐘', size:60,
  notes:'01:00–01:10。' });

// ── 單元三 ───────────────────────────────────────────
d.section({ num:'3', name:'遮蔽噪音與初始遮蔽量', mins:'35 分鐘',
  points:['遮蔽噪音之選擇與中樞遮蔽','MEMC 與安全係數','初始遮蔽量與閉塞效應'],
  notes:'單元三：01:10–01:45。' });

d.twoColumn({ title:'遮蔽噪音之選擇',
  cols:[{head:'純音',lead:'窄頻噪音 NBN',items:['以測試頻率為中心','僅臨界頻帶內能量有遮蔽效果','頻寬依 ANSI S3.6-2010']},
        {head:'語音、click',lead:'寬頻類噪音',items:['白噪音、粉紅噪音','語音頻譜噪音','多人交談噪音']}],
  footer:'寬頻噪音遮蔽純音：效率低且過大聲',
  notes:'寬頻噪音中臨界頻帶外之能量不增加遮蔽，只讓噪音更大聲。聽力計 NBN 頻寬略寬於臨界頻帶，可能為 1/3、1/2 八度。鋸齒波等複合噪音為舊式做法，遮蔽效果差且不穩定，僅需知道歷史。' });

d.statement({ lead:'中樞遮蔽（central masking）', main:'對側噪音使閾值\n輕微上升約 5 dB', size:38,
  note:'臨床遮蔽時容許 5 dB：閾值移動 ≤ 5 dB 視為未移動',
  notes:'噪音與訊號分屬兩耳且無跨越時，兩耳神經訊號在中樞聽覺神經系統整合而干擾。文獻報告可達 15 dB，且隨噪音強度增加（Liden et al. 1959b；Studebaker 1962；Dirks 1964）。此現象並非臨床遮蔽所要的效果，反而使判讀複雜化。' });

d.twoColumn({ title:'聽得到噪音與能遮蔽純音之區別',
  cols:[{head:'NBN 50 dB HL',lead:'總強度等同 50 dB HL 純音',items:['僅表示噪音可被聽到','不足以遮蔽 50 dB HL 純音']},
        {head:'有效遮蔽 dB EM',lead:'X dB EM 剛好遮蔽 X dB HL',items:['ANSI S3.6-2010 內建校正值','1/3 八度約 4–6 dB','臨床人員仍須自行驗證'],accent:true}],
  notes:'ANSI S3.6-2010 表 9.2：加於 RETSPL 之校正值，1/3 八度 NBN 4–6 dB，1/2 八度 NBN 4–8 dB，依頻率而異。即使設備已標示 dB EM，臨床人員仍須確認實際達到有效遮蔽。' });

d.statement({ dark:true, lead:'最小有效遮蔽校正 MEMC', main:'剛好遮蔽純音之噪音\n與該純音之 dB 差', size:44,
  note:'例：55 dB HL 之 NBN 剛好遮蔽 50 dB HL 純音 → MEMC = 5 dB。亦稱有效遮蔽級 EML。',
  notes:'原書作者認為 MEMC 一詞較易理解：它是加在純音級數上，以得到「最小有效噪音級」之校正值。本單元計算一律假設 MEMC = 5 dB；實際應依各頻率、各設備之驗證結果。' });

d.processFlow({ title:'MEMC 之心理聲學校正',
  steps:[{h:'同耳導入',b:'純音與 NBN 同頻'},{h:'噪音固定',b:'如 40 dB HL'},{h:'降至剛好聽不到',b:'5 dB 一階',hot:true},{h:'10 人平均',b:'逐頻率取整數'}],
  footer:'例：500 Hz 平均 8.5 → 10 dB；1000 Hz 平均 4.6 → 5 dB',
  notes:'步驟：雙通道聽力計，兩通道導入同一耳機。噪音持續開啟，在噪音中找純音閾值（脈衝音較易聽辨），再以 5 dB 下降至剛好被遮蔽。例：35 dB 時被遮蔽 → 40 dB 噪音需比純音高 5 dB。每人重複數次，至少 10 位正常人。其他方法：Veniar（1965）個別病人法；電聲法（Sanders 1972；Townsend & Schwartz 1976）。本地實務：所得 MEMC 宜納入院所品管紀錄並張貼於檢查室（編者補充）。' });

d.statement({ lead:'安全係數（safety factor, SF）', main:'MEMC 之外再加 10 dB',
  note:'MEMC 是平均值，並非眼前個案之實際值',
  notes:'原書理由：因 MEMC 為一群正常人之平均值，對部分個案而言可能不足，故加 10 dB。編者補充：SF 並非愈大愈好，噪音愈高愈接近過度遮蔽量，高原範圍隨之縮窄；10 dB 為兩者間之慣用折衷。' });

d.twoColumn({ title:'MEMC 與 SF 於各公式中之角色',
  cols:[{head:'MEMC ＋ SF',lead:'確保遮蔽足夠',items:['初始遮蔽量（氣導、骨導、SRT）','閾上測驗遮蔽量 MNN']},
        {head:'僅 MEMC',lead:'找出最早過度遮蔽點',items:['過度遮蔽起點','最大遮蔽量 MML'],accent:true}],
  footer:'噪音到 TE 恰達骨導閾值時僅「聽得到」，再高 MEMC 方遮得住',
  notes:'過度遮蔽公式含 MEMC 的理由見單元四。不含 SF 為編者依原書推導之說明：此處要找的是最早可能發生過度遮蔽之噪音量。' });

d.statement({ dark:true, lead:'氣導初始遮蔽量', main:'IML = HL_N + MEMC + SF', size:48,
  note:'例：NTE 氣導 20 dB HL → 20 + 5 + 10 = 35 dB HL。HL_N 為非測試耳之氣導閾值。',
  notes:'採 Martin（1967, 1974, 1980）之方法。設計邏輯：若 TE 閾值實為 NTE 跨耳聽得，跨到 NTE 之訊號約等於 NTE 閾值；噪音須高出 MEMC 才剛好遮蔽，再加 SF。其他較複雜公式（Liden et al. 1959b；Studebaker 1964）結果相近（Martin 1974）。' });

d.statement({ lead:'骨導初始遮蔽量', main:'IML = HL_N + MEMC + SF + OE',
  note:'例：35 + 5 + 10 + 15 = 65 dB HL',
  notes:'耳機覆蓋 NTE 會產生閉塞效應，使 NTE 耳蝸接收之骨導訊號增強。OE 15 dB 時，35 dB HL 骨導訊號在 NTE 耳蝸相當於 50 dB HL；若仍用 50 dB HL 之 IML，只遮得住 35 dB HL，故須加 OE。' });

d.twoColumn({ title:'閉塞效應之決定方式',
  cols:[{head:'固定值',lead:'Yacullo（2009）',items:['耳罩式：250/500/1k = 30/20/10','插入式：10/10/0','NTE 有傳導成分：0']},
        {head:'聽力學 Bing 測驗',lead:'個別測量（原書建議）',items:['耳機覆蓋 NTE、不給噪音重測骨導','OE = 未閉塞 − 閉塞','≤ 1000 Hz 各頻率執行'],accent:true}],
  footer:'OE 隨頻率不同、個體差異大、傳導性病變時不存在',
  notes:'Bing 測驗：Martin, Butler, & Burns（1974）。例：未閉塞 35、閉塞 20，OE = 15 dB。附帶效益：(1) 正常與感音性耳多有 OE，傳導性與混合性多無，可作診斷參考；(2) 閉塞後反而變差，提示震動器被頭帶推移。' });

d.activity({ label:'課堂演練｜6 分鐘', prompt:'計算下列三種情境之初始遮蔽量',
  steps:['(a) NTE AC 15 dB HL，氣導','(b) NTE AC 40 dB HL，骨導 500 Hz，OE 20 dB','(c) 同 (b)，但 NTE 有 30 dB 氣骨導差'],
  notes:'參考答案：(a) 15 + 5 + 10 = 30 dB HL；(b) 40 + 5 + 10 + 20 = 75 dB HL；(c) NTE 有傳導成分時 OE 為 0，故 40 + 5 + 10 = 55 dB HL。' });

// ── 單元四 ───────────────────────────────────────────
d.section({ num:'4', name:'高原法與過度遮蔽', mins:'40 分鐘｜本單元重點',
  points:['初始遮蔽量之判讀與高原法','最佳化遮蔽法','過度遮蔽、最大遮蔽量與遮蔽兩難'],
  notes:'單元四：01:45–02:25。本節為核心，亦為考試最常命題處。' });

d.twoColumn({ title:'初始遮蔽量之判讀',
  cols:[{head:'移動 ≤ 5 dB',lead:'原閾值確由測試耳聽得',items:['NTE 已受遮蔽仍聽得到','記為遮蔽閾值','該頻率完成']},
        {head:'移動 > 5 dB',lead:'原閾值可能由 NTE 聽得',items:['NTE 被遮蔽後就聽不到','真實閾值尚未得知','進入高原法'],accent:true}],
  footer:'例：未遮蔽 40；加 IML 後 40 或 45 → 確認；50 → 高原法',
  notes:'容許 5 dB 係因中樞遮蔽。邏輯：若音確實由 TE 聽得，在 NTE 加噪音不會改變任何事。' });

d.cards({ title:'高原法之三個區段', subtitle:'Hood（1960）；亦稱閾值移動法', numbered:true,
  items:[{h:'遮蔽不足',b:'噪音增加\n閾值一對一上升'},{h:'高原',b:'噪音增加\n閾值維持不變\n＝真實閾值',accent:true},{h:'過度遮蔽',b:'噪音再增加\n閾值再度上升'}],
  notes:'機制：遮蔽不足時純音仍由 NTE 聽得，噪音與純音同在 NTE，遮蔽量隨噪音線性增加；高原時 NTE 已受有效遮蔽，TE 以自身閾值回應，亦稱有效遮蔽範圍；過度遮蔽時噪音跨至 TE。視覺類比：以紙片遮右眼，紙片夠大後再加大不影響左眼，大到連左眼也遮住才改變結果。' });

d.barChart({ title:'高原法範例：測試耳閾值隨噪音量之變化', subtitle:'原書 Fig. 9.7，縱軸為測試耳閾值（dB HL）',
  labels:['未遮蔽','噪音 20','30','35','50','65','75','90'],
  values:[50,60,70,75,75,75,85,100], max:110, format:'0', seriesName:'閾值',
  notes:'未遮蔽 50 dB HL；噪音 20 dB 時 60；20 → 35 dB 為遮蔽不足，閾值一對一上升；35–65 dB 為高原，閾值維持 75 dB HL，此即真實閾值；之後為過度遮蔽。數值依原圖估讀。編者補充：常見操作為閾值上升時將純音升至新閾值再提高噪音（5–10 dB 一階），噪音連續增加 15–20 dB 而閾值不變即判定為高原。' });

d.bigStats({ title:'高原寬度之臨床要求',
  items:[{n:'15–20 dB',label:'可接受為有效遮蔽閾值\n之最小高原寬度',accent:true},{n:'No plateau',label:'確無高原時\n於聽力圖註記'}],
  notes:'高原愈寬，對遮蔽閾值之信心愈高；過窄之高原可能於施測中被跳過。確無高原時註記 no plateau 或 could not mask。' });

d.rowList({ title:'使高原變窄之四項因素',
  items:[{h:'IA',b:'耳間衰減較小，噪音較易跨至測試耳'},{h:'BC_T',b:'測試耳骨導較佳，跨越之噪音較易遮蔽之'},
         {h:'NTE ABG',b:'非測試耳有氣骨導差，須用較高噪音量',accent:true},{h:'OE',b:'骨導遮蔽時閉塞效應較大，須用較高噪音量'}],
  footer:'兩耳皆有氣骨導差時最為嚴重',
  notes:'前兩項增加噪音到達並遮蔽 TE 耳蝸之機會；後兩項使所需噪音量提高。' });

d.processFlow({ title:'最佳化遮蔽法', subtitle:'Turner（2004）：兩耳 AC 相差 ≥ 25 dB，測較差耳',
  steps:[{h:'IML',en:'HL_T − 10',b:'50 − 10 = 40'},{h:'閾值移動',en:'50 → 75',b:'移動 25 dB'},{h:'噪音加同量',en:'40 + 25',b:'= 65 dB',hot:true},{h:'閾值不變',en:'75 dB HL',b:'確認真實閾值'}],
  footer:'比傳統高原法所需重測次數更少',
  notes:'原書 Fig. 9.11。若 65 dB 時閾值再升 15 dB 至 90，則噪音再加 15 為 80 dB 重測，直到確認高原或達最大量。骨導：IML 取「未遮蔽骨導 + 30」或流程計算值之較高者，可涵蓋最高約 20 dB 之 OE（Turner 2004b）。' });

d.statement({ dark:true, lead:'過度遮蔽之條件', main:'MN_N ≥ IA + BC_T + MEMC', size:48,
  note:'例：IA 50、BC_T 30 → 80 dB 時噪音僅「聽得到」，85 dB HL 起方真正遮蔽測試耳。',
  notes:'過度遮蔽：噪音跨越頭部遮蔽 TE，臨床人員隨之提高純音，所得閾值為假性升高。常用簡化版為 MN_N ≥ IA + BC_T（Martin 1991），此時噪音僅恰被 TE 聽到；依 MEMC 定義須再高 MEMC 才遮得住，故原書採含 MEMC 之版本。' });

d.statement({ lead:'最大遮蔽量（MML）', main:'MML = (IA + BC_T + MEMC) − 5',
  note:'例：最低過度遮蔽量 80 dB HL → MML 75 dB HL',
  notes:'不致造成過度遮蔽之最高噪音量，為最低過度遮蔽量再減一個衰減器步階（5 dB）。' });

d.cards({ title:'初始遮蔽量即過度遮蔽之情境', subtitle:'遮蔽左耳骨導（左 BC 10 dB HL），噪音送右耳（AC 50）', perRow:3,
  items:[{h:'IML 65',b:'50 + 5 + 10'},{h:'起點 55',b:'IA 40 + BC_T 10 + MEMC 5'},{h:'65 ≥ 55',b:'已過度遮蔽',accent:true}],
  footer:'NTE 氣導較測試耳差時特別常見',
  notes:'原書範例：右 AC/BC 50（已遮蔽），左 AC 25、左 BC 10（需遮蔽）。IA 40 時 65 − 40 = 25 dB HL 到達左耳蝸，遠超過其 10 dB HL 骨導。若右耳另有 15 dB OE，IML 升至 80，即使 IA 高達 65 dB 亦過度遮蔽（80 ≥ 65 + 10 + 5）。' });

d.statement({ dark:true, lead:'重要提醒', main:'不宜未經嘗試即註記\nCould not mask', size:44,
  note:'IML 使閾值移動時，應自較低之噪音量起尋找高原；確無高原方註記 no plateau，此註記方具實證依據。',
  notes:'此為 Hood 原始描述之做法。過度遮蔽之疑慮應以實際嘗試證實，而非僅憑計算即放棄。' });

d.caseStudy({ label:'遮蔽兩難（Naunton, 1960）', who:'兩耳皆有約 55 dB 氣骨導差',
  facts:['右耳 1000 Hz 氣導 55 dB HL，骨導 0 dB HL','遮蔽右耳之 IML = 55 + 5 + 10 = 70 dB HL','噪音跨至左耳蝸，左耳氣、骨導皆移動'],
  question:'左耳閾值移動是有效遮蔽，還是過度遮蔽？',
  notes:'原書 Fig. 9.10。於初始遮蔽量即過度遮蔽，無從判斷閾值移動之原因。對策：改用插入式耳機以增加 IA、降低 OE；必要時參考 SAL 測驗。' });

d.activity({ label:'課堂演練｜8 分鐘', prompt:'三組各算一題，再交叉核對',
  steps:['(1) BC_T 20、IA 40：過度遮蔽起點與 MML？','(2) 最佳化法：TE AC 70，IML 後閾值 85，下一噪音量？','(3) 前述 IML 65 之情境改用插入式（IA 70），是否過度遮蔽？'],
  promptSize:36,
  notes:'參考答案：(1) 40 + 20 + 5 = 65 dB HL；MML 60 dB HL。(2) IML = 70 − 10 = 60；移動 15 dB，下一噪音 75 dB。(3) 70 + 10 + 5 = 85 > 65，不致過度遮蔽。收尾強調插入式耳機之效益。' });

d.statement({ dark:true, lead:'中間休息', main:'5 分鐘', size:60, notes:'02:25–02:30。' });

// ── 單元五 ───────────────────────────────────────────
d.section({ num:'5', name:'特殊情境之遮蔽', mins:'20 分鐘',
  points:['骨導遮蔽之擺位與檢查','插入式耳機與 SAL 測驗','閾上純音與語音測驗之遮蔽'],
  notes:'單元五：02:30–02:50。' });

d.rowList({ title:'骨導遮蔽之擺位',
  items:[{h:'震動器',b:'置於測試耳乳突'},{h:'NTE',b:'戴上送遮蔽噪音之耳機'},
         {h:'TE 耳機',b:'不覆蓋，置於耳朵與眼睛之間之頭側'},{h:'說明',b:'刻意擺法、保持不動、滑動立即告知',accent:true}],
  footer:'換耳時擺位對調',
  notes:'原書 Fig. 9.12。須確認耳機頭帶未推移震動器頭帶。向個案說明三點：(1) 擺法係刻意安排；(2) 盡量保持不動；(3) 任何配件滑動立即告知。' });

d.twoColumn({ title:'戴上耳機後重測未遮蔽骨導之兩項目的',
  cols:[{head:'≤ 1000 Hz',lead:'求閉塞效應',items:['即聽力學 Bing 測驗','OE 加入骨導 IML']},
        {head:'≥ 1000 Hz',lead:'檢查震動器是否移位',items:['頻率愈高愈佳','閾值不應比原本差'],accent:true}],
  footer:'低頻之 OE 可能掩蓋放置問題',
  notes:'例：500 Hz 戴耳機前後相同，可能是放置良好且無 OE，也可能是放置變差 15 dB 恰被 15 dB OE 抵銷。故檢查放置須用 1000 Hz 以上。發現問題時重新調整並再檢查。' });

d.cards({ title:'插入式耳機於臨床遮蔽之優點', numbered:true,
  items:[{h:'增加 IA',b:'平均超過 70 dB\n氣導需遮蔽之情形少見',accent:true},{h:'降低 OE',b:'骨導遮蔽所需噪音較低'},{h:'減少過度遮蔽',b:'跨至測試耳之噪音較少'}],
  notes:'文獻：Zwislocki 1953；Killion et al. 1985；Sklare & Denenberg 1987；Van Campen et al. 1990。本地實務對照（編者補充）：國內院所換能器配置不一，紀錄應註明所用換能器，判讀時依換能器選用相應最小 IA。' });

d.bigStats({ title:'SAL 測驗：骨導 ＝ 預期移動 − 實際移動', subtitle:'AC 50 dB HL，前額骨導噪音之預期移動 55 dB',
  items:[{n:'0',label:'傳導性\n移動 55 dB'},{n:'50',label:'感音性\n移動 5 dB'},{n:'20',label:'混合性\n移動 35 dB',accent:true}],
  footer:'單位：推估骨導閾值 dB HL',
  notes:'Rainville（1955）首創，Jerger & Tillman（1960）改良。每個氣導閾值測兩次：安靜下，以及前額骨導震動器以最大量給噪音時。先以正常人建立預期移動量（例：1000 Hz 0 → 55）。傳導性：耳蝸正常，移動同正常人 55 dB（50 → 105）；感音性：噪音幾乎聽不到，僅移動 5 dB；混合性：移動 35 dB（50 → 85）。現已少用，遮蔽兩難時可參考。' });

d.statement({ lead:'閾上純音測驗之遮蔽時機', main:'P_T − BC_N ≥ 40 dB',
  note:'例：右 AC 40、左 BC 10，以 TDT 60 dB HL 施測 → 50 dB，須遮蔽',
  notes:'AOBG 中之「A」改為測試音之呈現強度。閾值測試時 40 − 10 = 30 不需遮蔽，但 Olsen-Noffsinger TDT 從 20 dB SL 開始，即 60 dB HL，60 − 10 = 50 ≥ 40，須遮蔽。若閾值測試時已需遮蔽，閾上測驗亦須遮蔽，且噪音隨測試音同步提高。個人 IA：右耳 5 dB HL、左耳 60 dB HL 才反應，最小 IA 為 55 dB，可取代 40 dB。' });

d.statement({ dark:true, lead:'閾上測驗遮蔽量', main:'MNN = P_T − IA + ABG_N\n+ MEMC + SF', size:44,
  note:'P_T − IA 為跨至 NTE 耳蝸之強度；再補償 NTE 之氣骨導差。計算後仍須檢查過度遮蔽。',
  notes:'IA 未知時用 40 dB。掃頻 Békésy：頻率持續改變，最佳噪音量也須隨之改變，部分聽力計提供同步變頻 NBN；原書作者認為目前無真正適當之方法。遮蔽之影響：對側噪音可使無適應者出現 tone decay；SISI 分數常升高甚至改變診斷類別；Békésy 類型可能由 I 變 II 或 IV。' });

d.rowList({ title:'語音聽力檢查之遮蔽',
  items:[{h:'時機',b:'S_T − IA ≥ BC_N（IA 取 40 或 45，BC_N 取最佳純音骨導）'},
         {h:'SRT',b:'IML = SRT_N + MEMC + SF；移動 ≥ 10 dB 用高原法'},
         {h:'辨識測驗',b:'MNN 公式，P_T 改為語音呈現強度'},
         {h:'經驗法則',b:'NTE 噪音 ＝ 語音呈現強度 − 20 dB',accent:true},
         {h:'骨導語音',b:'OE 平均 6 dB（乳突），個人可達 20 dB'}],
  notes:'語音 IA：耳罩式 48–68 dB；最小 48 支持用 45 dB（Konkle & Berry 1983；Goldstein & Newman 1985），作者偏好 40 dB；插入式 68–84 dB。BC_N：ASHA（1988）建議 500–4000 Hz 之最佳骨導，作者建議低頻明顯較佳時納入 250 Hz。經驗法則：Jerger & Jerger 1971；Hannley 1986；Yacullo 1996, 1999, 2009；適用於對稱感音性及不對稱時遮蔽較佳耳；NTE 有傳導性聽損時不適用。過度遮蔽規則同純音，但採 TE 之最佳骨導。骨導語音 OE：乳突約 6 dB、前額約 9 dB（Klodd & Edgerton 1977）。語音 MEMC 校正：每級 6 或 8 個字詞，5 dB 下降至全錯，至少 10 人平均。' });

// ── 總結 ─────────────────────────────────────────────
d.processFlow({ title:'臨床遮蔽流程總覽',
  steps:[{h:'未遮蔽 AC/BC',b:'兩耳全部'},{h:'骨導判斷',b:'ABG ≥ 15'},{h:'Bing＋IML',b:'過度遮蔽核對',hot:true},{h:'氣導判斷',b:'AOBG ≥ 40'},{h:'高原或確認',b:'記錄遮蔽符號'}],
  notes:'完整 ASCII 流程圖見講義。重點：施測前說明；骨導擺位後先重測未遮蔽骨導；IML 前先核對是否已過度遮蔽；無高原先試較低噪音；遮蔽兩難改插入式或參考 SAL；記錄符號右 AC △、左 AC □、右 BC [、左 BC ]。' });

d.keywordGrid({ title:'公式速查',
  words:['ABG_T ≥ 15','AC_T − BC_N ≥ 40','HL_N + MEMC + SF','＋ OE（骨導）','IA + BC_T + MEMC','MML：再減 5','HL_T − 10（最佳化）','語音 − 20 dB'],
  perRow:4,
  notes:'預設值：MEMC 5 dB（依頻率與設備實測）、SF 10 dB、中樞遮蔽容許 5 dB、耳罩式最小 IA 40 dB、高原寬度 15–20 dB。完整公式表見講義總結。' });

d.caseStudy({ who:'林女士，58 歲，國小教師',
  facts:['右耳悶塞感兩個月、自聲增強，點耳藥水無效','右 AC 40–50、左 AC 10–20、未遮蔽 BC 5–15 dB HL','左耳 Bing：500 Hz OE 15 dB','希望「不要戴那個吵的東西，快一點做完」'],
  question:'哪些頻率須遮蔽？500 Hz 骨導 IML 為何？應如何回應個案？',
  notes:'完整數據見講義。參考答案：(1) 右耳 ABG 25–45 dB，四頻率骨導皆須遮蔽。(2) 500 Hz 骨導 IML = 15 + 5 + 10 + 15 = 45 dB HL；過度遮蔽起點 40 + 10 + 5 = 55，MML 50，高原空間僅約 5 dB，宜準備插入式耳機。(3) 右 AC：500 Hz 40、1000 Hz 45 dB 須遮蔽，2000、4000 Hz 不須。(4) 單側、疑似傳導成分，省略遮蔽將失去診斷價值，應說明目的取得配合；單側悶塞合併自聲增強且藥物無效，應建議耳鼻喉科就醫。' });

d.closing({ main:'遮蔽之目的\n在確認測得之閾值\n確實屬於測試耳',
  notes:'總結 10 分鐘：回顧流程圖、綜合案例、隨堂測驗（10 題見講義）。開放提問。' });

d.save(OUT).then(f => console.log('saved', f));
