const STORAGE_KEY = "english-coach-progress";
const VOCAB_LEVELS = [2000, 3000, 4000, 5000, 10000];
const externalCatalog = window.ENGLISH_COACH_CATALOG ?? {};

const sourceLessonStages = [
  [
    { word: "ability", phonetic: "/əˈbɪləti/", meaning: "能力", example: "Practice gives you the ability to speak clearly.", question: "請選出 ability 的正確中文意思：", options: ["機會", "能力", "速度"], answer: "能力" },
    { word: "accept", phonetic: "/əkˈsept/", meaning: "接受", example: "She can accept new ideas quickly.", question: "請選出 accept 的正確中文意思：", options: ["接受", "拒絕", "忘記"], answer: "接受" },
    { word: "across", phonetic: "/əˈkrɔːs/", meaning: "穿過；在對面", example: "The library is across the street.", question: "請選出 across 的正確中文意思：", options: ["上方", "穿過；在對面", "裡面"], answer: "穿過；在對面" },
    { word: "act", phonetic: "/ækt/", meaning: "行動；表演", example: "It is time to act on your study plan.", question: "請選出 act 的正確中文意思：", options: ["等待", "行動；表演", "比較"], answer: "行動；表演" },
    { word: "advice", phonetic: "/ədˈvaɪs/", meaning: "建議", example: "My teacher gave me useful advice.", question: "請選出 advice 的正確中文意思：", options: ["消息", "建議", "練習"], answer: "建議" },
    { word: "afraid", phonetic: "/əˈfreɪd/", meaning: "害怕的", example: "Do not be afraid to make mistakes.", question: "請選出 afraid 的正確中文意思：", options: ["害怕的", "開心的", "忙碌的"], answer: "害怕的" },
    { word: "agree", phonetic: "/əˈɡriː/", meaning: "同意", example: "I agree with your answer.", question: "請選出 agree 的正確中文意思：", options: ["練習", "同意", "描述"], answer: "同意" },
    { word: "alive", phonetic: "/əˈlaɪv/", meaning: "活著的", example: "The small plant is still alive.", question: "請選出 alive 的正確中文意思：", options: ["活著的", "危險的", "便宜的"], answer: "活著的" },
    { word: "allow", phonetic: "/əˈlaʊ/", meaning: "允許", example: "My parents allow me to study online at night.", question: "請選出 allow 的正確中文意思：", options: ["推遲", "允許", "抓住"], answer: "允許" },
    { word: "already", phonetic: "/ɔːlˈredi/", meaning: "已經", example: "I already finished today's first ten words.", question: "請選出 already 的正確中文意思：", options: ["仍然", "已經", "偶爾"], answer: "已經" },
    { word: "although", phonetic: "/ɔːlˈðoʊ/", meaning: "雖然", example: "Although it is hard, I keep studying.", question: "請選出 although 的正確中文意思：", options: ["因為", "雖然", "如果"], answer: "雖然" },
    { word: "among", phonetic: "/əˈmʌŋ/", meaning: "在…之中", example: "She is sitting among her classmates.", question: "請選出 among 的正確中文意思：", options: ["在…之中", "靠近", "向外"], answer: "在…之中" },
    { word: "amount", phonetic: "/əˈmaʊnt/", meaning: "數量", example: "A small amount of practice helps every day.", question: "請選出 amount 的正確中文意思：", options: ["價格", "數量", "方向"], answer: "數量" },
    { word: "ancient", phonetic: "/ˈeɪnʃənt/", meaning: "古代的", example: "We read a story about an ancient city.", question: "請選出 ancient 的正確中文意思：", options: ["現代的", "古代的", "安靜的"], answer: "古代的" },
    { word: "announce", phonetic: "/əˈnaʊns/", meaning: "宣布", example: "The school will announce the result tomorrow.", question: "請選出 announce 的正確中文意思：", options: ["宣布", "收集", "計算"], answer: "宣布" },
    { word: "anywhere", phonetic: "/ˈeniwer/", meaning: "任何地方", example: "You can study English anywhere with your phone.", question: "請選出 anywhere 的正確中文意思：", options: ["任何地方", "任何人", "任何時間"], answer: "任何地方" },
    { word: "appear", phonetic: "/əˈpɪr/", meaning: "出現", example: "New words appear in the story.", question: "請選出 appear 的正確中文意思：", options: ["離開", "出現", "隱藏"], answer: "出現" },
    { word: "apply", phonetic: "/əˈplaɪ/", meaning: "應用；申請", example: "Try to apply this word in a short sentence.", question: "請選出 apply 的正確中文意思：", options: ["應用；申請", "休息", "整理"], answer: "應用；申請" },
    { word: "arrive", phonetic: "/əˈraɪv/", meaning: "到達", example: "I arrive at class on time.", question: "請選出 arrive 的正確中文意思：", options: ["離開", "到達", "準備"], answer: "到達" },
    { word: "article", phonetic: "/ˈɑːrtɪkəl/", meaning: "文章", example: "This article is easy for beginners.", question: "請選出 article 的正確中文意思：", options: ["文章", "答案", "地圖"], answer: "文章" },
    { word: "attention", phonetic: "/əˈtenʃən/", meaning: "注意力", example: "Pay attention to the word stress.", question: "請選出 attention 的正確中文意思：", options: ["目標", "注意力", "分數"], answer: "注意力" },
    { word: "average", phonetic: "/ˈævərɪdʒ/", meaning: "平均的；平均數", example: "The average student can learn a little every day.", question: "請選出 average 的正確中文意思：", options: ["特別的", "平均的；平均數", "困難的"], answer: "平均的；平均數" },
    { word: "avoid", phonetic: "/əˈvɔɪd/", meaning: "避免", example: "Avoid studying too many hard words at once.", question: "請選出 avoid 的正確中文意思：", options: ["接受", "避免", "分享"], answer: "避免" },
    { word: "awake", phonetic: "/əˈweɪk/", meaning: "醒著的", example: "I stay awake during my morning study time.", question: "請選出 awake 的正確中文意思：", options: ["睡著的", "醒著的", "疲倦的"], answer: "醒著的" },
    { word: "balance", phonetic: "/ˈbæləns/", meaning: "平衡", example: "You need balance between study and rest.", question: "請選出 balance 的正確中文意思：", options: ["平衡", "速度", "方法"], answer: "平衡" },
    { word: "battle", phonetic: "/ˈbætl/", meaning: "戰鬥", example: "Learning can feel like a battle sometimes.", question: "請選出 battle 的正確中文意思：", options: ["比賽", "戰鬥", "機會"], answer: "戰鬥" },
    { word: "beauty", phonetic: "/ˈbjuːti/", meaning: "美；美麗", example: "There is beauty in simple English sentences.", question: "請選出 beauty 的正確中文意思：", options: ["力量", "美；美麗", "故事"], answer: "美；美麗" },
    { word: "belong", phonetic: "/bɪˈlɔːŋ/", meaning: "屬於", example: "These books belong to the school.", question: "請選出 belong 的正確中文意思：", options: ["屬於", "等待", "建造"], answer: "屬於" },
    { word: "below", phonetic: "/bɪˈloʊ/", meaning: "在下方", example: "Write the answer below the question.", question: "請選出 below 的正確中文意思：", options: ["在上方", "在下方", "在旁邊"], answer: "在下方" },
    { word: "beyond", phonetic: "/biˈjɑːnd/", meaning: "超出；在更遠處", example: "This book is beyond my level right now.", question: "請選出 beyond 的正確中文意思：", options: ["超出；在更遠處", "正在附近", "直接進入"], answer: "超出；在更遠處" },
    { word: "borrow", phonetic: "/ˈbɑːroʊ/", meaning: "借入", example: "I borrow English books from the library.", question: "請選出 borrow 的正確中文意思：", options: ["送出", "借入", "購買"], answer: "借入" },
    { word: "breathe", phonetic: "/briːð/", meaning: "呼吸", example: "Breathe slowly before you speak English aloud.", question: "請選出 breathe 的正確中文意思：", options: ["呼吸", "閱讀", "排隊"], answer: "呼吸" },
    { word: "brilliant", phonetic: "/ˈbrɪljənt/", meaning: "傑出的；聰明的", example: "That is a brilliant idea for practice.", question: "請選出 brilliant 的正確中文意思：", options: ["普通的", "傑出的；聰明的", "便宜的"], answer: "傑出的；聰明的" },
    { word: "calm", phonetic: "/kɑːm/", meaning: "冷靜的", example: "Stay calm when you answer in English.", question: "請選出 calm 的正確中文意思：", options: ["緊張的", "冷靜的", "生氣的"], answer: "冷靜的" },
    { word: "career", phonetic: "/kəˈrɪr/", meaning: "職業生涯", example: "English can help your future career.", question: "請選出 career 的正確中文意思：", options: ["興趣", "職業生涯", "夢想"], answer: "職業生涯" },
    { word: "certain", phonetic: "/ˈsɜːrtn/", meaning: "確定的", example: "I am certain this word is useful.", question: "請選出 certain 的正確中文意思：", options: ["確定的", "模糊的", "快速的"], answer: "確定的" },
    { word: "challenge", phonetic: "/ˈtʃælɪndʒ/", meaning: "挑戰", example: "Learning fifty words is a big challenge.", question: "請選出 challenge 的正確中文意思：", options: ["方法", "挑戰", "工具"], answer: "挑戰" },
    { word: "choice", phonetic: "/tʃɔɪs/", meaning: "選擇", example: "You have a choice to study now or later.", question: "請選出 choice 的正確中文意思：", options: ["選擇", "習慣", "希望"], answer: "選擇" },
    { word: "common", phonetic: "/ˈkɑːmən/", meaning: "常見的", example: "These are common words in daily English.", question: "請選出 common 的正確中文意思：", options: ["稀有的", "常見的", "危險的"], answer: "常見的" },
    { word: "compare", phonetic: "/kəmˈper/", meaning: "比較", example: "Compare your sentence with the example.", question: "請選出 compare 的正確中文意思：", options: ["隱藏", "比較", "打開"], answer: "比較" },
    { word: "complete", phonetic: "/kəmˈpliːt/", meaning: "完成", example: "I want to complete today's list before dinner.", question: "請選出 complete 的正確中文意思：", options: ["完成", "停止", "忘記"], answer: "完成" },
    { word: "condition", phonetic: "/kənˈdɪʃən/", meaning: "狀況；條件", example: "A quiet room is a good condition for study.", question: "請選出 condition 的正確中文意思：", options: ["狀況；條件", "結論", "位置"], answer: "狀況；條件" },
    { word: "consider", phonetic: "/kənˈsɪdər/", meaning: "考慮", example: "Consider using this word in your diary.", question: "請選出 consider 的正確中文意思：", options: ["考慮", "記錄", "回答"], answer: "考慮" },
    { word: "contain", phonetic: "/kənˈteɪn/", meaning: "包含", example: "This lesson contains fifty useful words.", question: "請選出 contain 的正確中文意思：", options: ["分開", "包含", "寄送"], answer: "包含" },
    { word: "continue", phonetic: "/kənˈtɪnjuː/", meaning: "繼續", example: "Continue practicing even when you feel slow.", question: "請選出 continue 的正確中文意思：", options: ["繼續", "結束", "拒絕"], answer: "繼續" },
    { word: "control", phonetic: "/kənˈtroʊl/", meaning: "控制", example: "Try to control your speaking speed.", question: "請選出 control 的正確中文意思：", options: ["控制", "打掃", "想像"], answer: "控制" },
    { word: "conversation", phonetic: "/ˌkɑːnvərˈseɪʃən/", meaning: "對話", example: "This word is useful in conversation.", question: "請選出 conversation 的正確中文意思：", options: ["對話", "圖片", "比賽"], answer: "對話" },
    { word: "create", phonetic: "/kriˈeɪt/", meaning: "創造", example: "Create one simple sentence with the new word.", question: "請選出 create 的正確中文意思：", options: ["破壞", "創造", "結束"], answer: "創造" },
    { word: "curious", phonetic: "/ˈkjʊriəs/", meaning: "好奇的", example: "Stay curious about every new word.", question: "請選出 curious 的正確中文意思：", options: ["疲累的", "好奇的", "安靜的"], answer: "好奇的" },
    { word: "custom", phonetic: "/ˈkʌstəm/", meaning: "習俗", example: "It is a custom to greet people politely.", question: "請選出 custom 的正確中文意思：", options: ["習俗", "工具", "房間"], answer: "習俗" }
  ],
  [
    { word: "daily", phonetic: "/ˈdeɪli/", meaning: "每日的", example: "Daily practice builds strong habits.", question: "請選出 daily 的正確中文意思：", options: ["每週的", "每日的", "突然的"], answer: "每日的" },
    { word: "decide", phonetic: "/dɪˈsaɪd/", meaning: "決定", example: "Decide your study time before breakfast.", question: "請選出 decide 的正確中文意思：", options: ["決定", "延長", "保留"], answer: "決定" },
    { word: "deep", phonetic: "/diːp/", meaning: "深的", example: "Take a deep breath before reading aloud.", question: "請選出 deep 的正確中文意思：", options: ["淺的", "深的", "短的"], answer: "深的" },
    { word: "develop", phonetic: "/dɪˈveləp/", meaning: "發展", example: "Daily practice helps you develop strong skills.", question: "請選出 develop 的正確中文意思：", options: ["發展", "節省", "拆開"], answer: "發展" },
    { word: "difference", phonetic: "/ˈdɪfrəns/", meaning: "差異", example: "There is a clear difference between these two words.", question: "請選出 difference 的正確中文意思：", options: ["差異", "距離", "力量"], answer: "差異" },
    { word: "difficult", phonetic: "/ˈdɪfɪkəlt/", meaning: "困難的", example: "This sentence is difficult for beginners.", question: "請選出 difficult 的正確中文意思：", options: ["容易的", "困難的", "重要的"], answer: "困難的" },
    { word: "discover", phonetic: "/dɪˈskʌvər/", meaning: "發現", example: "You can discover new patterns by reading.", question: "請選出 discover 的正確中文意思：", options: ["發現", "封閉", "比較"], answer: "發現" },
    { word: "discuss", phonetic: "/dɪˈskʌs/", meaning: "討論", example: "We discuss the answer in class.", question: "請選出 discuss 的正確中文意思：", options: ["討論", "隱藏", "補充"], answer: "討論" },
    { word: "disease", phonetic: "/dɪˈziːz/", meaning: "疾病", example: "Some articles talk about disease and health.", question: "請選出 disease 的正確中文意思：", options: ["力量", "疾病", "安慰"], answer: "疾病" },
    { word: "distance", phonetic: "/ˈdɪstəns/", meaning: "距離", example: "The distance between the two schools is short.", question: "請選出 distance 的正確中文意思：", options: ["方向", "距離", "速度"], answer: "距離" },
    { word: "divide", phonetic: "/dɪˈvaɪd/", meaning: "分開", example: "Divide the words into small groups.", question: "請選出 divide 的正確中文意思：", options: ["連接", "分開", "提醒"], answer: "分開" },
    { word: "double", phonetic: "/ˈdʌbəl/", meaning: "雙倍的", example: "Read the sentence at double speed later.", question: "請選出 double 的正確中文意思：", options: ["一半的", "雙倍的", "基本的"], answer: "雙倍的" },
    { word: "during", phonetic: "/ˈdjʊrɪŋ/", meaning: "在…期間", example: "Do not check your phone during study time.", question: "請選出 during 的正確中文意思：", options: ["在…之前", "在…期間", "在…之外"], answer: "在…期間" },
    { word: "early", phonetic: "/ˈɜːrli/", meaning: "早的；提早", example: "I study early in the morning.", question: "請選出 early 的正確中文意思：", options: ["早的；提早", "遲的", "安靜的"], answer: "早的；提早" },
    { word: "earth", phonetic: "/ɜːrθ/", meaning: "地球；土地", example: "The earth moves around the sun.", question: "請選出 earth 的正確中文意思：", options: ["月亮", "地球；土地", "天空"], answer: "地球；土地" },
    { word: "education", phonetic: "/ˌedʒuˈkeɪʃən/", meaning: "教育", example: "Education changes many lives.", question: "請選出 education 的正確中文意思：", options: ["教育", "文化", "比賽"], answer: "教育" },
    { word: "effect", phonetic: "/ɪˈfekt/", meaning: "效果；影響", example: "Music has a strong effect on my mood.", question: "請選出 effect 的正確中文意思：", options: ["原因", "效果；影響", "問題"], answer: "效果；影響" },
    { word: "effort", phonetic: "/ˈefərt/", meaning: "努力", example: "Your effort will help you improve.", question: "請選出 effort 的正確中文意思：", options: ["休息", "努力", "興趣"], answer: "努力" },
    { word: "either", phonetic: "/ˈiːðər/", meaning: "任一的；也不", example: "You can choose either answer.", question: "請選出 either 的正確中文意思：", options: ["兩者都", "任一的；也不", "最後的"], answer: "任一的；也不" },
    { word: "electric", phonetic: "/ɪˈlektrɪk/", meaning: "電的", example: "This shop sells electric tools.", question: "請選出 electric 的正確中文意思：", options: ["木製的", "電的", "柔軟的"], answer: "電的" },
    { word: "empty", phonetic: "/ˈempti/", meaning: "空的", example: "The classroom is empty now.", question: "請選出 empty 的正確中文意思：", options: ["滿的", "空的", "乾淨的"], answer: "空的" },
    { word: "encourage", phonetic: "/ɪnˈkɜːrɪdʒ/", meaning: "鼓勵", example: "Teachers encourage students to speak.", question: "請選出 encourage 的正確中文意思：", options: ["鼓勵", "命令", "模仿"], answer: "鼓勵" },
    { word: "enemy", phonetic: "/ˈenəmi/", meaning: "敵人", example: "Fear can become your enemy.", question: "請選出 enemy 的正確中文意思：", options: ["朋友", "敵人", "鄰居"], answer: "敵人" },
    { word: "energy", phonetic: "/ˈenərdʒi/", meaning: "精力；能源", example: "Good sleep gives you energy to study.", question: "請選出 energy 的正確中文意思：", options: ["精力；能源", "疾病", "聲音"], answer: "精力；能源" },
    { word: "engine", phonetic: "/ˈendʒɪn/", meaning: "引擎", example: "The engine is making a loud sound.", question: "請選出 engine 的正確中文意思：", options: ["引擎", "輪胎", "橋樑"], answer: "引擎" },
    { word: "enough", phonetic: "/ɪˈnʌf/", meaning: "足夠的", example: "Ten minutes is enough for a quick review.", question: "請選出 enough 的正確中文意思：", options: ["不足的", "足夠的", "危險的"], answer: "足夠的" },
    { word: "enter", phonetic: "/ˈentər/", meaning: "進入", example: "Please enter the room quietly.", question: "請選出 enter 的正確中文意思：", options: ["離開", "進入", "關上"], answer: "進入" },
    { word: "environment", phonetic: "/ɪnˈvaɪrənmənt/", meaning: "環境", example: "A quiet environment helps me focus.", question: "請選出 environment 的正確中文意思：", options: ["工具", "環境", "規則"], answer: "環境" },
    { word: "especially", phonetic: "/ɪˈspeʃəli/", meaning: "尤其", example: "This word is especially useful in daily talk.", question: "請選出 especially 的正確中文意思：", options: ["偶爾", "尤其", "幾乎不"], answer: "尤其" },
    { word: "event", phonetic: "/ɪˈvent/", meaning: "事件", example: "The school event starts at nine.", question: "請選出 event 的正確中文意思：", options: ["事件", "文章", "價格"], answer: "事件" },
    { word: "exact", phonetic: "/ɪɡˈzækt/", meaning: "精確的", example: "That is the exact answer.", question: "請選出 exact 的正確中文意思：", options: ["模糊的", "精確的", "快速的"], answer: "精確的" },
    { word: "example", phonetic: "/ɪɡˈzæmpəl/", meaning: "例子", example: "This sentence is a good example.", question: "請選出 example 的正確中文意思：", options: ["規則", "例子", "聲音"], answer: "例子" },
    { word: "excellent", phonetic: "/ˈeksələnt/", meaning: "優秀的", example: "You did an excellent job today.", question: "請選出 excellent 的正確中文意思：", options: ["普通的", "優秀的", "困難的"], answer: "優秀的" },
    { word: "except", phonetic: "/ɪkˈsept/", meaning: "除了", example: "Everyone came except Tom.", question: "請選出 except 的正確中文意思：", options: ["包括", "除了", "超過"], answer: "除了" },
    { word: "excite", phonetic: "/ɪkˈsaɪt/", meaning: "使興奮", example: "New goals excite me.", question: "請選出 excite 的正確中文意思：", options: ["使興奮", "使放鬆", "使擔心"], answer: "使興奮" },
    { word: "exercise", phonetic: "/ˈeksərsaɪz/", meaning: "運動；練習", example: "Reading aloud is a good exercise.", question: "請選出 exercise 的正確中文意思：", options: ["運動；練習", "休息", "旅行"], answer: "運動；練習" },
    { word: "exist", phonetic: "/ɪɡˈzɪst/", meaning: "存在", example: "Many study methods exist online.", question: "請選出 exist 的正確中文意思：", options: ["消失", "存在", "發明"], answer: "存在" },
    { word: "expect", phonetic: "/ɪkˈspekt/", meaning: "期待；預料", example: "I expect progress after enough practice.", question: "請選出 expect 的正確中文意思：", options: ["期待；預料", "比較", "反對"], answer: "期待；預料" },
    { word: "experience", phonetic: "/ɪkˈspɪriəns/", meaning: "經驗", example: "Speaking to others gives you experience.", question: "請選出 experience 的正確中文意思：", options: ["經驗", "想像", "秘密"], answer: "經驗" },
    { word: "explain", phonetic: "/ɪkˈspleɪn/", meaning: "解釋", example: "Can you explain this sentence?", question: "請選出 explain 的正確中文意思：", options: ["隱藏", "解釋", "攜帶"], answer: "解釋" },
    { word: "express", phonetic: "/ɪkˈspres/", meaning: "表達", example: "Words help you express your ideas.", question: "請選出 express 的正確中文意思：", options: ["表達", "破壞", "等待"], answer: "表達" },
    { word: "extra", phonetic: "/ˈekstrə/", meaning: "額外的", example: "I need extra time for review.", question: "請選出 extra 的正確中文意思：", options: ["基本的", "額外的", "便宜的"], answer: "額外的" },
    { word: "factory", phonetic: "/ˈfæktəri/", meaning: "工廠", example: "My uncle works in a factory.", question: "請選出 factory 的正確中文意思：", options: ["工廠", "農場", "港口"], answer: "工廠" },
    { word: "familiar", phonetic: "/fəˈmɪljər/", meaning: "熟悉的", example: "This word looks familiar to me.", question: "請選出 familiar 的正確中文意思：", options: ["陌生的", "熟悉的", "昂貴的"], answer: "熟悉的" },
    { word: "famous", phonetic: "/ˈfeɪməs/", meaning: "有名的", example: "That is a famous place in Taiwan.", question: "請選出 famous 的正確中文意思：", options: ["安靜的", "有名的", "偏遠的"], answer: "有名的" },
    { word: "feature", phonetic: "/ˈfiːtʃər/", meaning: "特色；功能", example: "This new feature helps learners review.", question: "請選出 feature 的正確中文意思：", options: ["特色；功能", "費用", "運氣"], answer: "特色；功能" },
    { word: "feed", phonetic: "/fiːd/", meaning: "餵養", example: "They feed the dog every morning.", question: "請選出 feed 的正確中文意思：", options: ["洗澡", "餵養", "追逐"], answer: "餵養" },
    { word: "female", phonetic: "/ˈfiːmeɪl/", meaning: "女性的", example: "The female athlete ran very fast.", question: "請選出 female 的正確中文意思：", options: ["男性的", "女性的", "年長的"], answer: "女性的" },
    { word: "festival", phonetic: "/ˈfestəvəl/", meaning: "節日", example: "We learn special words during a festival.", question: "請選出 festival 的正確中文意思：", options: ["節日", "課本", "交通"], answer: "節日" },
    { word: "field", phonetic: "/fiːld/", meaning: "田野；領域", example: "English is useful in every field.", question: "請選出 field 的正確中文意思：", options: ["門口", "田野；領域", "季節"], answer: "田野；領域" },
    { word: "final", phonetic: "/ˈfaɪnəl/", meaning: "最後的", example: "This is the final question today.", question: "請選出 final 的正確中文意思：", options: ["最早的", "最後的", "中間的"], answer: "最後的" }
  ]
];

const exampleTranslations = {
  ability: "練習會給你清楚說話的能力。",
  accept: "她可以很快接受新的想法。",
  across: "圖書館就在街道對面。",
  act: "現在是按照你的讀書計畫行動的時候了。",
  advice: "我的老師給了我有用的建議。",
  afraid: "不要害怕犯錯。",
  agree: "我同意你的答案。",
  alive: "那株小植物還活著。",
  allow: "我父母允許我晚上在線上學習。",
  already: "我已經完成今天前十個單字了。",
  although: "雖然很難，我還是持續學習。",
  among: "她正坐在同學們之中。",
  amount: "每天少量的練習也有幫助。",
  ancient: "我們讀了一個關於古城的故事。",
  announce: "學校明天會宣布結果。",
  anywhere: "你可以用手機在任何地方學英文。",
  appear: "新的單字出現在故事裡。",
  apply: "試著把這個字用在短句中。",
  arrive: "我準時到達教室。",
  article: "這篇文章對初學者來說很容易。",
  attention: "請注意這個單字的重音。",
  average: "一般學生每天都能學一點。",
  avoid: "避免一次學太多難字。",
  awake: "我在早晨學習時保持清醒。",
  balance: "你需要在學習與休息之間取得平衡。",
  battle: "學習有時候感覺像一場戰鬥。",
  beauty: "簡單的英文句子裡也有美感。",
  belong: "這些書屬於學校。",
  below: "把答案寫在題目下方。",
  beyond: "這本書現在超出我的程度。",
  borrow: "我從圖書館借英文書。",
  breathe: "在大聲說英文前先慢慢呼吸。",
  brilliant: "那真是一個很棒的練習點子。",
  calm: "當你用英文回答時要保持冷靜。",
  career: "英文可以幫助你未來的職涯。",
  certain: "我很確定這個字很有用。",
  challenge: "一天學五十個字是一個大挑戰。",
  choice: "你可以選擇現在學或晚點學。",
  common: "這些是日常英文中的常見單字。",
  compare: "把你的句子和例句做比較。",
  complete: "我想在晚餐前完成今天的清單。",
  condition: "安靜的房間是學習的好條件。",
  consider: "考慮把這個字用在你的日記裡。",
  contain: "這堂課包含五十個有用的單字。",
  continue: "就算覺得進步慢，也要繼續練習。",
  control: "試著控制你說話的速度。",
  conversation: "這個字在對話中很有用。",
  create: "用新單字造一個簡單句子。",
  curious: "對每個新單字保持好奇。",
  custom: "有禮貌地打招呼是一種習俗。",
  daily: "每天的練習會建立穩固的習慣。",
  decide: "在早餐前決定你的學習時間。",
  deep: "大聲朗讀前先深呼吸。",
  develop: "每天練習能幫助你發展扎實能力。",
  difference: "這兩個字之間有明顯的差異。",
  difficult: "這個句子對初學者來說很難。",
  discover: "你可以透過閱讀發現新的規律。",
  discuss: "我們在課堂上討論答案。",
  disease: "有些文章會談到疾病與健康。",
  distance: "那兩所學校之間的距離很短。",
  divide: "把單字分成幾個小組。",
  double: "之後用雙倍速度再讀一次這句話。",
  during: "讀書時不要看手機。",
  early: "我一大早就讀書。",
  earth: "地球繞著太陽轉。",
  education: "教育改變了許多人的人生。",
  effect: "音樂對我的心情有很大的影響。",
  effort: "你的努力會幫助你進步。",
  either: "你可以選擇其中任一個答案。",
  electric: "這家店賣電動工具。",
  empty: "現在教室是空的。",
  encourage: "老師鼓勵學生開口說話。",
  enemy: "恐懼可能會變成你的敵人。",
  energy: "良好的睡眠給你學習的精力。",
  engine: "那個引擎發出很大的聲音。",
  enough: "十分鐘就足夠快速複習了。",
  enter: "請安靜地進入房間。",
  environment: "安靜的環境幫助我專心。",
  especially: "這個字在日常對話中特別有用。",
  event: "學校活動九點開始。",
  exact: "那就是精確的答案。",
  example: "這個句子是一個好例子。",
  excellent: "你今天做得非常好。",
  except: "除了 Tom 之外，大家都來了。",
  excite: "新的目標讓我感到興奮。",
  exercise: "大聲朗讀是一種很好的練習。",
  exist: "網路上存在很多學習方法。",
  expect: "經過足夠練習後，我期待看到進步。",
  experience: "與他人交談會帶給你經驗。",
  explain: "你可以解釋這個句子嗎？",
  express: "單字能幫助你表達想法。",
  extra: "我需要額外的複習時間。",
  factory: "我叔叔在工廠工作。",
  familiar: "這個字對我來說很熟悉。",
  famous: "那是台灣一個有名的地方。",
  feature: "這個新功能能幫助學習者複習。",
  feed: "他們每天早上餵狗。",
  female: "那位女運動員跑得很快。",
  festival: "我們會在節日期間學一些特別的單字。",
  field: "英文在每個領域都很有用。",
  final: "這是今天最後一題。"
};

const MANUAL_EXAMPLE_OVERRIDES = {
  navigation: {
    example: "The driver used the phone for navigation in the city.",
    exampleTranslation: "那位駕駛在城市裡用手機導航。"
  },
  operations: {
    example: "The factory stopped operations for two hours this morning.",
    exampleTranslation: "那間工廠今天早上停工兩個小時。"
  },
  therefore: {
    example: "He studied hard; therefore, he passed the test.",
    exampleTranslation: "他很努力讀書，所以通過了考試。"
  },
  ass: {
    example: "In the story, the old ass carried food to the village.",
    exampleTranslation: "在故事裡，那頭老驢把食物運到村子裡。"
  },
  simply: {
    example: "Please explain the answer simply for the new students.",
    exampleTranslation: "請用簡單的方式向新同學解釋這個答案。"
  },
  evidence: {
    example: "The police found evidence near the broken window.",
    exampleTranslation: "警方在破掉的窗戶附近找到證據。"
  },
  station: {
    example: "We will meet in front of the station at seven.",
    exampleTranslation: "我們七點在車站前面見。"
  },
  christian: {
    example: "He grew up in a Christian family.",
    exampleTranslation: "他在基督教家庭中長大。"
  },
  round: {
    example: "The children sat round the table and listened.",
    exampleTranslation: "孩子們圍著桌子坐著聽。"
  },
  paypal: {
    example: "I paid for the book with PayPal online.",
    exampleTranslation: "我在線上用 PayPal 買了那本書。"
  },
  favorite: {
    example: "Blue is still my favorite color.",
    exampleTranslation: "藍色仍然是我最喜歡的顏色。"
  },
  understand: {
    example: "I can understand this sentence without a dictionary.",
    exampleTranslation: "我不用字典也能理解這個句子。"
  },
  option: {
    example: "You have the option to study now or after dinner.",
    exampleTranslation: "你可以選擇現在讀書，或晚餐後再讀。"
  },
  master: {
    example: "She wants to master English pronunciation this year.",
    exampleTranslation: "她想在今年精通英文發音。"
  },
  valley: {
    example: "A small river runs through the valley.",
    exampleTranslation: "一條小河流過那座山谷。"
  },
  recently: {
    example: "I have been very busy recently.",
    exampleTranslation: "我最近一直很忙。"
  },
  probably: {
    example: "He will probably arrive after lunch.",
    exampleTranslation: "他很可能會在午餐後到。"
  },
  thu: {
    example: "Our English class is on Thu this week.",
    exampleTranslation: "我們這週的英文課在星期四。"
  },
  rentals: {
    example: "Beach rentals are expensive in summer.",
    exampleTranslation: "海邊出租房在夏天很貴。"
  },
  sea: {
    example: "We could see the sea from the hotel window.",
    exampleTranslation: "我們從飯店窗戶就能看到海。"
  },
  built: {
    example: "This bridge was built more than fifty years ago.",
    exampleTranslation: "這座橋是在五十多年前建成的。"
  },
  publications: {
    example: "The library keeps many science publications.",
    exampleTranslation: "圖書館收藏了很多科學出版物。"
  },
  blood: {
    example: "The doctor checked his blood after the accident.",
    exampleTranslation: "醫生在意外後檢查了他的血液。"
  },
  cut: {
    example: "Be careful not to cut your finger with the knife.",
    exampleTranslation: "小心不要被刀子割到手指。"
  },
  worldwide: {
    example: "The company sells its products worldwide.",
    exampleTranslation: "那家公司在全球販售產品。"
  },
  improve: {
    example: "Reading every day will improve your English.",
    exampleTranslation: "每天閱讀會提升你的英文。"
  },
  connection: {
    example: "The internet connection is slow tonight.",
    exampleTranslation: "今晚的網路連線很慢。"
  },
  publisher: {
    example: "The publisher plans to print more copies next month.",
    exampleTranslation: "出版社計畫下個月再印更多本。"
  },
  hall: {
    example: "The students waited in the hall before the meeting.",
    exampleTranslation: "學生們在開會前在大廳等候。"
  },
  larger: {
    example: "We need a larger table for the whole family.",
    exampleTranslation: "我們需要一張更大的桌子給全家人使用。"
  },
  anti: {
    example: "The hospital started an anti-smoking campaign.",
    exampleTranslation: "那家醫院開始推動反吸菸活動。"
  },
  networks: {
    example: "Social networks spread the news very quickly.",
    exampleTranslation: "社群網路很快就把消息傳開了。"
  },
  impact: {
    example: "Good teachers have a strong impact on students.",
    exampleTranslation: "好老師對學生有很大的影響。"
  },
  transfer: {
    example: "She will transfer to a new school next term.",
    exampleTranslation: "她下學期會轉到新學校。"
  },
  introduction: {
    example: "His short introduction made everyone smile.",
    exampleTranslation: "他簡短的自我介紹讓大家都笑了。"
  },
  kitchen: {
    example: "My mother is cooking in the kitchen now.",
    exampleTranslation: "我媽媽現在正在廚房煮飯。"
  },
  strong: {
    example: "You need strong legs to climb that mountain.",
    exampleTranslation: "要爬那座山，你需要很有力的腿。"
  },
  wedding: {
    example: "They met many old friends at the wedding.",
    exampleTranslation: "他們在婚禮上遇見很多老朋友。"
  },
  hospital: {
    example: "He stayed in the hospital for three days.",
    exampleTranslation: "他在醫院住了三天。"
  },
  opportunity: {
    example: "This job is a great opportunity for her.",
    exampleTranslation: "這份工作對她來說是很好的機會。"
  },
  tel: {
    example: "Please write your tel number on this form.",
    exampleTranslation: "請把你的電話號碼寫在這張表上。"
  },
  carolina: {
    example: "My cousin moved to Carolina last year.",
    exampleTranslation: "我表哥去年搬到卡羅萊納州。"
  },
  properties: {
    example: "These materials have useful properties for building.",
    exampleTranslation: "這些材料有適合建築的特性。"
  },
  ground: {
    example: "The children sat on the ground and drew pictures.",
    exampleTranslation: "孩子們坐在地上畫圖。"
  },
  overview: {
    example: "The teacher gave us an overview of the new lesson.",
    exampleTranslation: "老師先給我們這堂新課的概觀。"
  },
  ship: {
    example: "The ship left the port before sunrise.",
    exampleTranslation: "那艘船在日出前離開港口。"
  },
  accommodation: {
    example: "We booked accommodation near the train station.",
    exampleTranslation: "我們在火車站附近訂了住處。"
  },
  owners: {
    example: "The restaurant owners thanked every customer personally.",
    exampleTranslation: "那家餐廳的老闆們親自感謝每位顧客。"
  },
  disease: {
    example: "Doctors are working to stop the spread of the disease.",
    exampleTranslation: "醫生們正在努力阻止疾病擴散。"
  },
  tx: {
    example: "My uncle lives in TX with his family.",
    exampleTranslation: "我叔叔和家人住在德州。"
  },
  excellent: {
    example: "You did an excellent job on your English homework.",
    exampleTranslation: "你的英文作業做得非常好。"
  },
  paid: {
    example: "She already paid for the tickets online.",
    exampleTranslation: "她已經在線上付了票錢。"
  },
  italy: {
    example: "They want to visit Italy in the spring.",
    exampleTranslation: "他們想在春天去義大利旅行。"
  },
  perfect: {
    example: "This quiet room is perfect for study.",
    exampleTranslation: "這個安靜的房間非常適合讀書。"
  },
  hair: {
    example: "Her hair was wet after the rain.",
    exampleTranslation: "她的頭髮淋雨後濕了。"
  },
  kit: {
    example: "He carries a small first-aid kit in his bag.",
    exampleTranslation: "他包包裡帶著一個小急救包。"
  },
  classic: {
    example: "That movie is a classic for many music lovers.",
    exampleTranslation: "那部電影對很多音樂愛好者來說是經典。"
  },
  basis: {
    example: "Trust is the basis of a good friendship.",
    exampleTranslation: "信任是良好友誼的基礎。"
  },
  command: {
    example: "The officer gave a clear command to the team.",
    exampleTranslation: "那位軍官對隊員下了清楚的命令。"
  },
  cities: {
    example: "Many big cities become quiet late at night.",
    exampleTranslation: "許多大城市在深夜會變得安靜。"
  },
  william: {
    example: "William sits next to me in English class.",
    exampleTranslation: "威廉在英文課坐在我旁邊。"
  },
  express: {
    example: "She can express her ideas in simple English.",
    exampleTranslation: "她能用簡單英文表達自己的想法。"
  },
  anal: {
    example: "This medical article explains anal pain in simple language.",
    exampleTranslation: "這篇醫學文章用簡單文字解釋肛門疼痛。"
  },
  award: {
    example: "The school gave her an award for hard work.",
    exampleTranslation: "學校因為她的努力而頒獎給她。"
  },
  tree: {
    example: "We had lunch under a big tree.",
    exampleTranslation: "我們在一棵大樹下吃午餐。"
  },
  peter: {
    example: "Peter called me after class yesterday.",
    exampleTranslation: "彼得昨天下課後打電話給我。"
  },
  assessment: {
    example: "The teacher finished the students' reading assessment.",
    exampleTranslation: "老師完成了學生的閱讀評量。"
  },
  ensure: {
    example: "Please check again to ensure the answer is correct.",
    exampleTranslation: "請再檢查一次，以確保答案正確。"
  },
  thus: {
    example: "The road was closed, thus we had to walk home.",
    exampleTranslation: "那條路封住了，因此我們只好走路回家。"
  },
  wall: {
    example: "There is a world map on the classroom wall.",
    exampleTranslation: "教室的牆上有一張世界地圖。"
  },
  ie: {
    example: "Write your answer clearly, i.e., one sentence only.",
    exampleTranslation: "請把答案寫清楚，也就是只寫一句話。"
  },
  involved: {
    example: "Many parents were involved in the school event.",
    exampleTranslation: "許多家長都有參與那場學校活動。"
  },
  el: {
    example: "The old train still stops at the El station downtown.",
    exampleTranslation: "那班舊火車仍然會停在市中心的高架車站。"
  },
  extra: {
    example: "I need extra time to finish this report.",
    exampleTranslation: "我需要額外的時間來完成這份報告。"
  },
  especially: {
    example: "I like this song, especially the ending.",
    exampleTranslation: "我喜歡這首歌，尤其是它的結尾。"
  },
  interface: {
    example: "The new app has a clean and simple interface.",
    exampleTranslation: "這個新 App 有乾淨又簡單的介面。"
  },
  partners: {
    example: "The two business partners opened a new shop together.",
    exampleTranslation: "那兩位生意夥伴一起開了一家新店。"
  },
  budget: {
    example: "We planned the trip on a small budget.",
    exampleTranslation: "我們用不高的預算規劃了這趟旅行。"
  },
  rated: {
    example: "This hotel is highly rated by travelers online.",
    exampleTranslation: "這間飯店在網路上受到旅客高度評價。"
  },
  guides: {
    example: "These guides help visitors find the museum quickly.",
    exampleTranslation: "這些指南能幫助遊客很快找到博物館。"
  },
  success: {
    example: "Hard work was the key to her success.",
    exampleTranslation: "努力工作是她成功的關鍵。"
  },
  maximum: {
    example: "The room can hold a maximum of twenty people.",
    exampleTranslation: "這個房間最多可以容納二十個人。"
  },
  ma: {
    example: "Ma called me home for dinner at six.",
    exampleTranslation: "媽媽六點叫我回家吃晚餐。"
  },
  operation: {
    example: "The doctor explained the operation before it began.",
    exampleTranslation: "醫生在手術開始前先做了解釋。"
  },
  existing: {
    example: "We kept the existing rules for this semester.",
    exampleTranslation: "我們這學期維持原有的規則。"
  },
  quite: {
    example: "The test was quite easy for most students.",
    exampleTranslation: "這份考試對多數學生來說相當容易。"
  },
  selected: {
    example: "Only ten students were selected for the team.",
    exampleTranslation: "只有十位學生被選進隊伍。"
  },
  boy: {
    example: "The boy ran across the playground after school.",
    exampleTranslation: "那個男孩放學後跑過操場。"
  },
  amazon: {
    example: "She ordered the notebook from Amazon last night.",
    exampleTranslation: "她昨晚在 Amazon 訂了那本筆記本。"
  },
  patients: {
    example: "The nurses cared for the patients all night.",
    exampleTranslation: "護理師整晚都在照顧病人。"
  },
  restaurants: {
    example: "This street has many small restaurants.",
    exampleTranslation: "這條街上有很多小餐廳。"
  },
  beautiful: {
    example: "The beach looked beautiful at sunset.",
    exampleTranslation: "那片海灘在日落時看起來很美。"
  },
  warning: {
    example: "The sign gave a warning about the wet floor.",
    exampleTranslation: "那個標誌警告大家地板很濕。"
  },
  wine: {
    example: "They served wine with dinner at the hotel.",
    exampleTranslation: "他們在飯店晚餐時搭配供應葡萄酒。"
  },
  locations: {
    example: "The map shows the locations of all the stations.",
    exampleTranslation: "地圖標示出所有車站的位置。"
  },
  horse: {
    example: "The horse ran across the field very fast.",
    exampleTranslation: "那匹馬快速跑過田野。"
  },
  vote: {
    example: "Students will vote for the new class leader tomorrow.",
    exampleTranslation: "學生們明天會投票選新的班長。"
  },
  forward: {
    example: "I am looking forward to the school trip.",
    exampleTranslation: "我很期待學校旅行。"
  },
  flowers: {
    example: "She put fresh flowers on the kitchen table.",
    exampleTranslation: "她把新鮮的花放在廚房桌上。"
  },
  stars: {
    example: "We could see many stars in the night sky.",
    exampleTranslation: "我們可以在夜空中看到很多星星。"
  },
  significant: {
    example: "There was a significant change in his attitude.",
    exampleTranslation: "他的態度有了明顯的改變。"
  },
  technologies: {
    example: "New technologies are changing the way we learn.",
    exampleTranslation: "新科技正在改變我們學習的方式。"
  },
  owner: {
    example: "The owner of the shop knows every customer by name.",
    exampleTranslation: "那家店的老闆記得每位客人的名字。"
  },
  retail: {
    example: "She works in retail during the summer vacation.",
    exampleTranslation: "她在暑假期間做零售工作。"
  },
  animals: {
    example: "The children learned about wild animals at the zoo.",
    exampleTranslation: "孩子們在動物園學習野生動物。"
  },
  useful: {
    example: "This phrase is very useful in daily conversation.",
    exampleTranslation: "這個片語在日常對話裡很有用。"
  },
  directly: {
    example: "Please send the message directly to me.",
    exampleTranslation: "請直接把訊息傳給我。"
  },
  manufacturer: {
    example: "The manufacturer released a safer version of the product.",
    exampleTranslation: "製造商推出了更安全的新版本產品。"
  },
  ways: {
    example: "There are many ways to improve your listening skills.",
    exampleTranslation: "有很多方法可以提升你的聽力能力。"
  },
  est: {
    example: "The meeting starts at 8 p.m. EST.",
    exampleTranslation: "那場會議會在美東時間晚上八點開始。"
  },
  son: {
    example: "Their son started junior high school this year.",
    exampleTranslation: "他們的兒子今年開始上國中。"
  },
  providing: {
    example: "We can go to the park, providing it does not rain.",
    exampleTranslation: "只要不下雨，我們就可以去公園。"
  },
  rule: {
    example: "One important rule is to arrive on time.",
    exampleTranslation: "一條重要的規則就是準時到達。"
  },
  mac: {
    example: "He bought a new Mac for his design work.",
    exampleTranslation: "他買了一台新的 Mac 來做設計工作。"
  },
  housing: {
    example: "The city is trying to provide better housing for families.",
    exampleTranslation: "這座城市正努力為家庭提供更好的住房。"
  },
  takes: {
    example: "It takes about twenty minutes to walk there.",
    exampleTranslation: "走到那裡大約要二十分鐘。"
  },
  iii: {
    example: "King Henry III is mentioned in this history book.",
    exampleTranslation: "這本歷史書裡提到了亨利三世。"
  },
  gmt: {
    example: "The online meeting begins at 3 p.m. GMT.",
    exampleTranslation: "那場線上會議在格林威治時間下午三點開始。"
  },
  bring: {
    example: "Please bring your notebook to class tomorrow.",
    exampleTranslation: "請明天把你的筆記本帶來上課。"
  },
  catalog: {
    example: "The library catalog helps students find books quickly.",
    exampleTranslation: "圖書館目錄能幫學生很快找到書。"
  },
  searches: {
    example: "Her online searches helped her find the best train ticket.",
    exampleTranslation: "她在網路上的搜尋幫她找到最好的火車票。"
  },
  max: {
    example: "Max sits near the window in our classroom.",
    exampleTranslation: "Max 在我們教室裡坐在窗邊。"
  },
  trying: {
    example: "She kept trying even after making mistakes.",
    exampleTranslation: "即使犯錯，她還是持續嘗試。"
  },
  mother: {
    example: "My mother reads English with me every night.",
    exampleTranslation: "我媽媽每天晚上都陪我讀英文。"
  },
  authority: {
    example: "The local authority closed the park for repairs.",
    exampleTranslation: "當地主管單位因維修而關閉了公園。"
  },
  considered: {
    example: "His idea was considered helpful by the whole team.",
    exampleTranslation: "他的想法被整個團隊認為很有幫助。"
  },
  told: {
    example: "She told me the answer after class.",
    exampleTranslation: "她下課後告訴我答案。"
  },
  xml: {
    example: "The data is stored in an XML file.",
    exampleTranslation: "資料是儲存在 XML 檔案裡。"
  },
  traffic: {
    example: "There is heavy traffic near the station this morning.",
    exampleTranslation: "今天早上車站附近交通很擁擠。"
  },
  programme: {
    example: "The school programme starts with a short speech.",
    exampleTranslation: "學校的活動流程從一段短講開始。"
  },
  joined: {
    example: "He joined the basketball club last month.",
    exampleTranslation: "他上個月加入了籃球社。"
  },
  input: {
    example: "The teacher asked for student input before the change.",
    exampleTranslation: "老師在改變前先徵求學生意見。"
  },
  strategy: {
    example: "Reading aloud is a good strategy for beginners.",
    exampleTranslation: "大聲朗讀對初學者來說是很好的策略。"
  },
  feet: {
    example: "My feet were tired after the long walk.",
    exampleTranslation: "走了很久之後，我的腳很累。"
  },
  agent: {
    example: "The travel agent found us a cheaper flight.",
    exampleTranslation: "旅行社代辦人幫我們找到更便宜的航班。"
  },
  valid: {
    example: "This ticket is valid until the end of the month.",
    exampleTranslation: "這張票到月底前都有效。"
  },
  bin: {
    example: "Please throw the paper into the bin.",
    exampleTranslation: "請把紙丟進垃圾桶。"
  },
  modern: {
    example: "The hotel has a clean and modern design.",
    exampleTranslation: "那間飯店有乾淨又現代的設計。"
  },
  senior: {
    example: "My senior gave me useful study advice.",
    exampleTranslation: "學長給了我很有用的讀書建議。"
  },
  ireland: {
    example: "She hopes to travel to Ireland one day.",
    exampleTranslation: "她希望有一天能去愛爾蘭旅行。"
  },
  teaching: {
    example: "Good teaching can make hard ideas easier.",
    exampleTranslation: "好的教學能讓困難的概念變容易。"
  },
  door: {
    example: "Please close the door when you leave.",
    exampleTranslation: "你離開時請把門關上。"
  },
  grand: {
    example: "They stayed in a grand old hotel by the river.",
    exampleTranslation: "他們住在河邊一間宏偉的老飯店。"
  },
  testing: {
    example: "The app is still in testing this week.",
    exampleTranslation: "這個 App 這週仍在測試中。"
  },
  trial: {
    example: "We used the software for a free trial.",
    exampleTranslation: "我們試用了那套軟體的免費體驗版。"
  },
  charge: {
    example: "The hotel did not charge us for breakfast.",
    exampleTranslation: "那家飯店沒有向我們收早餐費。"
  },
  units: {
    example: "This book has ten reading units.",
    exampleTranslation: "這本書有十個閱讀單元。"
  },
  instead: {
    example: "I stayed home and studied instead of going out.",
    exampleTranslation: "我沒有出門，而是待在家裡讀書。"
  },
  canadian: {
    example: "Our new teacher is Canadian.",
    exampleTranslation: "我們的新老師是加拿大人。"
  },
  cool: {
    example: "The evening air feels cool by the sea.",
    exampleTranslation: "海邊晚上的空氣感覺很涼爽。"
  },
  normal: {
    example: "It is normal to feel nervous before a speech.",
    exampleTranslation: "演講前感到緊張是很正常的。"
  },
  wrote: {
    example: "She wrote three new words in her notebook.",
    exampleTranslation: "她在筆記本裡寫下三個新單字。"
  },
  enterprise: {
    example: "The small enterprise started with only five workers.",
    exampleTranslation: "那家小型企業一開始只有五名員工。"
  },
  ships: {
    example: "Large ships were waiting outside the harbor.",
    exampleTranslation: "大型船隻正在港口外等待。"
  },
  entire: {
    example: "I spent the entire afternoon reading that book.",
    exampleTranslation: "我花了整個下午在讀那本書。"
  },
  educational: {
    example: "This video is both fun and educational.",
    exampleTranslation: "這支影片既有趣又有教育意義。"
  },
  md: {
    example: "Please send the report to the MD before noon.",
    exampleTranslation: "請在中午前把報告寄給總經理。"
  },
  leading: {
    example: "She works for a leading company in the field.",
    exampleTranslation: "她在這個領域的領先公司工作。"
  },
  metal: {
    example: "The table has a metal frame and a wooden top.",
    exampleTranslation: "那張桌子有金屬框架和木製桌面。"
  },
  positive: {
    example: "Try to keep a positive attitude when learning.",
    exampleTranslation: "學習時要盡量保持正向態度。"
  },
  fl: {
    example: "My aunt moved to FL last summer.",
    exampleTranslation: "我阿姨去年夏天搬到佛州。"
  },
  fitness: {
    example: "Regular walking can improve your fitness.",
    exampleTranslation: "規律走路能改善你的體能。"
  },
  chinese: {
    example: "He is learning Chinese at the language center.",
    exampleTranslation: "他正在語言中心學中文。"
  },
  opinion: {
    example: "In my opinion, this is the best answer.",
    exampleTranslation: "依我看，這是最好的答案。"
  },
  mb: {
    example: "The file is only 5 MB, so it downloads quickly.",
    exampleTranslation: "這個檔案只有 5 MB，所以下載很快。"
  },
  asia: {
    example: "Taiwan is one of the most interesting places in Asia.",
    exampleTranslation: "台灣是亞洲很有意思的地方之一。"
  },
  football: {
    example: "The boys played football after school.",
    exampleTranslation: "男孩們放學後去踢足球。"
  },
  abstract: {
    example: "The paper begins with a short abstract.",
    exampleTranslation: "那篇論文一開始有一段簡短摘要。"
  },
  uses: {
    example: "This tool has many useful uses in daily life.",
    exampleTranslation: "這個工具在日常生活中有很多有用的用途。"
  },
  output: {
    example: "The machine's output increased this month.",
    exampleTranslation: "這台機器這個月的產量提高了。"
  },
  funds: {
    example: "The school raised funds for new computers.",
    exampleTranslation: "學校募款來購買新電腦。"
  },
  mr: {
    example: "Mr Lin will teach our class today.",
    exampleTranslation: "林先生今天會來教我們這堂課。"
  },
  greater: {
    example: "With practice, she gained greater confidence.",
    exampleTranslation: "透過練習，她有了更大的自信。"
  },
  likely: {
    example: "It is likely to rain this evening.",
    exampleTranslation: "今天傍晚很可能會下雨。"
  },
  employees: {
    example: "The company has more than two hundred employees.",
    exampleTranslation: "那家公司有超過兩百名員工。"
  },
  artists: {
    example: "Many local artists showed their work at the fair.",
    exampleTranslation: "許多在地藝術家在展覽會上展示作品。"
  },
  alternative: {
    example: "We chose the cheaper alternative.",
    exampleTranslation: "我們選了比較便宜的替代方案。"
  },
  processing: {
    example: "The bank is still processing the payment.",
    exampleTranslation: "銀行仍在處理這筆付款。"
  },
  responsibility: {
    example: "Taking care of the class pet is our shared responsibility.",
    exampleTranslation: "照顧班上的寵物是我們共同的責任。"
  },
  resolution: {
    example: "She made a resolution to read more this year.",
    exampleTranslation: "她下定決心今年要讀更多書。"
  },
  java: {
    example: "My brother is learning Java at college.",
    exampleTranslation: "我哥哥在大學學 Java。"
  },
  guest: {
    example: "The hotel guest asked for another towel.",
    exampleTranslation: "那位飯店客人要求再拿一條毛巾。"
  },
  ou: {
    example: "She plans to study through the OU next year.",
    exampleTranslation: "她計畫明年透過開放大學進修。"
  },
  quotations: {
    example: "The report includes quotations from two experts.",
    exampleTranslation: "那份報告引用了兩位專家的話。"
  },
  grab: {
    example: "I need to grab my bag before the bus comes.",
    exampleTranslation: "在公車來之前，我得先拿上我的包包。"
  },
  inspector: {
    example: "The inspector checked the building for safety problems.",
    exampleTranslation: "檢查員檢查了那棟建築的安全問題。"
  },
  attract: {
    example: "Bright signs attract many customers at night.",
    exampleTranslation: "明亮的招牌在晚上吸引很多顧客。"
  },
  brighton: {
    example: "They spent the weekend in Brighton by the sea.",
    exampleTranslation: "他們在海邊的布萊頓度過週末。"
  },
  beans: {
    example: "She added beans to the soup for dinner.",
    exampleTranslation: "她在晚餐的湯裡加了豆子。"
  },
  bookmarks: {
    example: "I bought two new bookmarks at the bookstore.",
    exampleTranslation: "我在書店買了兩個新書籤。"
  },
  ellis: {
    example: "Ellis joined our reading group last week.",
    exampleTranslation: "Ellis 上週加入了我們的讀書小組。"
  },
  disable: {
    example: "This button will disable the sound for a while.",
    exampleTranslation: "這個按鈕會暫時關掉聲音。"
  },
  snake: {
    example: "We saw a snake near the river path.",
    exampleTranslation: "我們在河邊小路附近看到一條蛇。"
  },
  succeed: {
    example: "If you keep practicing, you will succeed.",
    exampleTranslation: "如果你持續練習，你就會成功。"
  },
  leonard: {
    example: "Leonard brought cookies to the meeting.",
    exampleTranslation: "Leonard 帶了餅乾來開會。"
  },
  lending: {
    example: "The bank is careful about lending money.",
    exampleTranslation: "銀行對借出資金這件事很謹慎。"
  },
  oops: {
    example: "\"Oops, I made a spelling mistake,\" she said.",
    exampleTranslation: "「哎呀，我拼錯字了。」她說。"
  },
  reminder: {
    example: "I set a reminder on my phone for the class.",
    exampleTranslation: "我在手機上設了一個上課提醒。"
  },
  xi: {
    example: "The teacher wrote the Greek letter xi on the board.",
    exampleTranslation: "老師把希臘字母 xi 寫在黑板上。"
  },
  searched: {
    example: "He searched the internet for the answer.",
    exampleTranslation: "他在網路上搜尋答案。"
  },
  behavioral: {
    example: "The report includes behavioral changes in children.",
    exampleTranslation: "那份報告包含兒童行為上的變化。"
  },
  riverside: {
    example: "We walked along the riverside after dinner.",
    exampleTranslation: "晚餐後我們沿著河邊散步。"
  },
  bathrooms: {
    example: "The hotel has two public bathrooms on this floor.",
    exampleTranslation: "這家飯店這一層有兩間公共浴室。"
  },
  plains: {
    example: "The train crossed the wide plains at sunset.",
    exampleTranslation: "火車在日落時穿過遼闊的平原。"
  },
  sku: {
    example: "Each product has its own SKU number.",
    exampleTranslation: "每個產品都有自己的 SKU 編號。"
  },
  ht: {
    example: "Please check the HT information on the label.",
    exampleTranslation: "請查看標籤上的 HT 資訊。"
  },
  raymond: {
    example: "Raymond called to confirm the schedule.",
    exampleTranslation: "Raymond 打電話來確認行程。"
  },
  insights: {
    example: "The interview gave us useful insights about the project.",
    exampleTranslation: "那場訪談讓我們對這個專案有很有用的見解。"
  },
  abilities: {
    example: "Music can improve children's language abilities.",
    exampleTranslation: "音樂能提升孩子的語言能力。"
  },
  initiated: {
    example: "The school initiated a new reading program.",
    exampleTranslation: "學校發起了一個新的閱讀計畫。"
  },
  sullivan: {
    example: "Sullivan will lead the discussion this afternoon.",
    exampleTranslation: "Sullivan 今天下午會主持討論。"
  },
  za: {
    example: "The website uses .za in its web address.",
    exampleTranslation: "那個網站的網址裡用了 .za。"
  },
  midwest: {
    example: "He grew up in the Midwest of the United States.",
    exampleTranslation: "他在美國中西部長大。"
  },
  karaoke: {
    example: "They sang their favorite songs at karaoke last night.",
    exampleTranslation: "他們昨晚在卡拉 OK 唱了最喜歡的歌。"
  },
  trap: {
    example: "The mouse escaped from the trap.",
    exampleTranslation: "那隻老鼠從陷阱裡逃走了。"
  },
  lonely: {
    example: "He felt lonely after moving to a new city.",
    exampleTranslation: "搬到新城市後，他感到很孤單。"
  },
  fool: {
    example: "Do not let anyone fool you with false promises.",
    exampleTranslation: "不要讓任何人用假承諾欺騙你。"
  },
  ve: {
    example: "The map used VE as a country code in one list.",
    exampleTranslation: "那張地圖在其中一個清單裡用 VE 當國家代碼。"
  },
  nonprofit: {
    example: "She works for a nonprofit that helps children read.",
    exampleTranslation: "她在一個幫助孩子閱讀的非營利組織工作。"
  },
  lancaster: {
    example: "They spent two nights in Lancaster on the trip.",
    exampleTranslation: "他們旅行時在蘭開斯特住了兩晚。"
  },
  suspended: {
    example: "The game was suspended because of the heavy rain.",
    exampleTranslation: "比賽因為大雨而暫停。"
  },
  hereby: {
    example: "I hereby agree to follow the school rules.",
    exampleTranslation: "我在此同意遵守學校規定。"
  },
  observe: {
    example: "Please observe the signs near the entrance.",
    exampleTranslation: "請遵守入口附近的標示。"
  },
  julia: {
    example: "Julia shared her notes with the whole class.",
    exampleTranslation: "Julia 把她的筆記分享給全班。"
  },
  containers: {
    example: "The kitchen shelf is full of food containers.",
    exampleTranslation: "廚房架子上擺滿了食物容器。"
  },
  attitudes: {
    example: "Positive attitudes can change the classroom atmosphere.",
    exampleTranslation: "正向的態度能改變教室氣氛。"
  },
  karl: {
    example: "Karl arrived early and helped set up the room.",
    exampleTranslation: "Karl 很早就到了，還幫忙整理教室。"
  },
  berry: {
    example: "She put a berry on top of each cake.",
    exampleTranslation: "她在每個蛋糕上放了一顆莓果。"
  },
  collar: {
    example: "The dog wore a red collar in the park.",
    exampleTranslation: "那隻狗在公園裡戴著紅色項圈。"
  },
  simultaneously: {
    example: "The two lights turned on simultaneously.",
    exampleTranslation: "兩盞燈同時亮了起來。"
  },
  racial: {
    example: "The class discussed racial equality in modern society.",
    exampleTranslation: "那堂課討論了現代社會中的種族平等。"
  },
  integrate: {
    example: "The teacher tried to integrate music into the lesson.",
    exampleTranslation: "老師試著把音樂融入課程中。"
  },
  bermuda: {
    example: "My uncle once traveled to Bermuda for a holiday.",
    exampleTranslation: "我叔叔曾經去百慕達度假。"
  },
  amanda: {
    example: "Amanda brought fruit for everyone in the office.",
    exampleTranslation: "Amanda 帶了水果給辦公室的每個人。"
  },
  sociology: {
    example: "She is studying sociology at the university.",
    exampleTranslation: "她正在大學攻讀社會學。"
  },
  mobiles: {
    example: "The shop sells mobiles and phone cases.",
    exampleTranslation: "那家店賣手機和手機殼。"
  },
  screenshot: {
    example: "Please send me a screenshot of the error message.",
    exampleTranslation: "請把錯誤訊息的截圖傳給我。"
  },
  exhibitions: {
    example: "The museum holds two art exhibitions every year.",
    exampleTranslation: "那家博物館每年舉辦兩次藝術展覽。"
  },
  humanities: {
    example: "He enjoys both science and the humanities.",
    exampleTranslation: "他同時喜歡科學和人文學科。"
  },
  independently: {
    example: "The children learned to work independently.",
    exampleTranslation: "孩子們學會了獨立完成事情。"
  },
  wanting: {
    example: "The final report was still wanting in detail.",
    exampleTranslation: "最後的報告在細節上仍然不足。"
  },
  custody: {
    example: "The court gave custody of the child to her mother.",
    exampleTranslation: "法院把孩子的監護權判給了她媽媽。"
  },
  scratch: {
    example: "He got a small scratch on his hand.",
    exampleTranslation: "他的手上有一道小擦傷。"
  },
  launches: {
    example: "The company launches a new product every spring.",
    exampleTranslation: "那家公司每年春天都會推出新產品。"
  },
  soonest: {
    example: "Please reply as soonest as possible.",
    exampleTranslation: "請儘快回覆。"
  },
  haiti: {
    example: "The charity sent supplies to Haiti after the storm.",
    exampleTranslation: "那個慈善團體在暴風雨後把物資送到海地。"
  },
  disturbed: {
    example: "She looked disturbed after hearing the news.",
    exampleTranslation: "聽到消息後，她看起來很不安。"
  },
  determines: {
    example: "Hard work often determines the final result.",
    exampleTranslation: "努力往往決定最後的結果。"
  },
  sculpture: {
    example: "The park has a large sculpture near the entrance.",
    exampleTranslation: "那座公園入口附近有一座大型雕塑。"
  },
  poly: {
    example: "He studied design at a local poly.",
    exampleTranslation: "他在當地的工藝學院學設計。"
  },
  ears: {
    example: "Her ears turned red in the cold wind.",
    exampleTranslation: "她的耳朵在冷風中變紅了。"
  },
  dod: {
    example: "The report was later sent to the DoD office.",
    exampleTranslation: "那份報告之後被送到國防部辦公室。"
  },
  wp: {
    example: "He saved the file in his WP folder.",
    exampleTranslation: "他把檔案存進自己的 WP 資料夾。"
  },
  fist: {
    example: "He raised his fist in the air.",
    exampleTranslation: "他把拳頭舉向空中。"
  },
  galaxy: {
    example: "Our science teacher showed us a picture of a galaxy.",
    exampleTranslation: "自然老師給我們看了一張星系的照片。"
  },
  chester: {
    example: "Chester sent the email before lunch.",
    exampleTranslation: "Chester 在午餐前把電子郵件寄出了。"
  },
  snapshot: {
    example: "This photo gives a snapshot of village life.",
    exampleTranslation: "這張照片呈現了鄉村生活的一個剪影。"
  },
  caring: {
    example: "She is a caring teacher who listens to every student.",
    exampleTranslation: "她是一位很有愛心的老師，會聽每位學生說話。"
  },
  loc: {
    example: "The map marked the loc of the meeting point.",
    exampleTranslation: "地圖標出了集合地點的位置。"
  },
  worn: {
    example: "His shoes were old and worn.",
    exampleTranslation: "他的鞋子又舊又磨損。"
  },
  synthetic: {
    example: "This jacket is made from synthetic material.",
    exampleTranslation: "這件外套是用合成材料做的。"
  },
  shaw: {
    example: "Mr Shaw will lead today's discussion.",
    exampleTranslation: "Shaw 先生今天會主持討論。"
  },
  vp: {
    example: "The VP will visit our office next week.",
    exampleTranslation: "副總裁下週會來我們辦公室。"
  },
  segments: {
    example: "The video is divided into three short segments.",
    exampleTranslation: "這支影片被分成三個短片段。"
  },
  testament: {
    example: "Her work is a testament to years of effort.",
    exampleTranslation: "她的成果證明了多年來的努力。"
  },
  expo: {
    example: "We visited a technology expo on Saturday.",
    exampleTranslation: "我們星期六參觀了一場科技展。"
  },
  dominant: {
    example: "Blue is the dominant color in this design.",
    exampleTranslation: "藍色是這個設計裡的主色。"
  },
  brilliant: {
    example: "She gave a brilliant answer during the class discussion.",
    exampleTranslation: "她在課堂討論中給了一個很精彩的回答。"
  },
  factory: {
    example: "My father works at a factory outside the city.",
    exampleTranslation: "我爸爸在城市外的一間工廠工作。"
  },
  familiar: {
    example: "This song sounds familiar to me.",
    exampleTranslation: "這首歌聽起來讓我覺得很熟悉。"
  },
  famous: {
    example: "That restaurant is famous for its beef noodles.",
    exampleTranslation: "那家餐廳以牛肉麵聞名。"
  },
  feature: {
    example: "The app has a new feature for daily review.",
    exampleTranslation: "這個應用程式有一個新的每日複習功能。"
  },
  feed: {
    example: "The boy feeds the fish every morning before school.",
    exampleTranslation: "那個男孩每天上學前都會餵魚。"
  },
  female: {
    example: "The female doctor spoke to us kindly.",
    exampleTranslation: "那位女醫師很親切地和我們說話。"
  },
  festival: {
    example: "We saw colorful lights during the spring festival.",
    exampleTranslation: "我們在春季節慶期間看到了彩色燈光。"
  },
  field: {
    example: "She wants to work in the medical field one day.",
    exampleTranslation: "她希望有一天能在醫療領域工作。"
  },
  final: {
    example: "This is the final page of today's lesson.",
    exampleTranslation: "這是今天課程的最後一頁。"
  },
  beyond: {
    example: "The answer was beyond my expectations.",
    exampleTranslation: "那個答案超出了我的預期。"
  },
  borrow: {
    example: "You can borrow this English book from me.",
    exampleTranslation: "你可以跟我借這本英文書。"
  },
  breathe: {
    example: "Take a moment to breathe before you start speaking.",
    exampleTranslation: "開口說話前，先花一點時間呼吸一下。"
  },
  calm: {
    example: "He stayed calm during the interview.",
    exampleTranslation: "他在面試時保持冷靜。"
  },
  career: {
    example: "Learning English can help your future career.",
    exampleTranslation: "學英文可以幫助你未來的職涯發展。"
  },
  certain: {
    example: "I am certain that she will do well in the test.",
    exampleTranslation: "我很確定她考試會表現得很好。"
  },
  challenge: {
    example: "Speaking in public is still a challenge for me.",
    exampleTranslation: "對我來說，公開說話仍然是一項挑戰。"
  },
  choice: {
    example: "You have a choice between the red one and the blue one.",
    exampleTranslation: "你可以在紅色那個和藍色那個之間做選擇。"
  },
  common: {
    example: "This is a common mistake for new learners.",
    exampleTranslation: "這是新學習者常見的錯誤。"
  },
  compare: {
    example: "Compare your answer with the sample sentence.",
    exampleTranslation: "把你的答案和範例句子比較一下。"
  },
  complete: {
    example: "She was happy to complete all fifty words today.",
    exampleTranslation: "她很開心今天完成了五十個單字。"
  },
  condition: {
    example: "The plants grow well under warm conditions.",
    exampleTranslation: "這些植物在溫暖的條件下長得很好。"
  },
  consider: {
    example: "Please consider my idea before you decide.",
    exampleTranslation: "請在決定前先考慮我的想法。"
  },
  contain: {
    example: "This box may contain old photos from school.",
    exampleTranslation: "這個盒子裡可能裝著以前在學校的照片。"
  },
  continue: {
    example: "They continue practicing even after class ends.",
    exampleTranslation: "即使下課了，他們還是繼續練習。"
  },
  control: {
    example: "He tried to control his voice during the meeting.",
    exampleTranslation: "他在會議中試著控制自己的音量。"
  },
  conversation: {
    example: "We had a short conversation in English after lunch.",
    exampleTranslation: "午餐後我們用英文進行了一段簡短對話。"
  },
  create: {
    example: "The designer will create a new logo for the team.",
    exampleTranslation: "設計師將為團隊製作一個新標誌。"
  },
  curious: {
    example: "The child was curious about the strange machine.",
    exampleTranslation: "那個孩子對那台奇怪的機器感到好奇。"
  },
  custom: {
    example: "It is a local custom to bring a small gift when visiting.",
    exampleTranslation: "拜訪別人時帶一份小禮物是當地的習俗。"
  },
  daily: {
    example: "She keeps a daily record of the new words she learns.",
    exampleTranslation: "她每天都會記錄自己學到的新單字。"
  },
  decide: {
    example: "We need to decide the meeting time before noon.",
    exampleTranslation: "我們需要在中午前決定開會時間。"
  },
  deep: {
    example: "The lake is too deep for young children to swim in alone.",
    exampleTranslation: "這座湖太深了，不適合小孩子自己游泳。"
  },
  develop: {
    example: "Reading every day can develop your sense of English rhythm.",
    exampleTranslation: "每天閱讀可以培養你的英文語感。"
  },
  difference: {
    example: "There is a big difference between hearing and understanding.",
    exampleTranslation: "聽到和聽懂之間有很大的差別。"
  },
  difficult: {
    example: "It was difficult for him to answer so quickly.",
    exampleTranslation: "對他來說，要這麼快回答並不容易。"
  },
  discover: {
    example: "I discovered a useful podcast while searching for study materials.",
    exampleTranslation: "我在找學習資料時發現了一個很有用的 podcast。"
  },
  discuss: {
    example: "The students stayed after class to discuss the article.",
    exampleTranslation: "學生們下課後留下來討論那篇文章。"
  },
  distance: {
    example: "The distance from my home to the station is about two kilometers.",
    exampleTranslation: "我家到車站的距離大約是兩公里。"
  },
  divide: {
    example: "Let's divide the work into three simple parts.",
    exampleTranslation: "我們把工作分成三個簡單的部分吧。"
  },
  double: {
    example: "The price became double after the holiday season.",
    exampleTranslation: "假期過後，價格變成了兩倍。"
  },
  during: {
    example: "Please stay quiet during the listening practice.",
    exampleTranslation: "請在聽力練習期間保持安靜。"
  },
  early: {
    example: "He arrived early so he could review before class.",
    exampleTranslation: "他提早到，好在上課前先複習。"
  },
  earth: {
    example: "We learned that the earth travels around the sun.",
    exampleTranslation: "我們學到地球會繞著太陽運行。"
  },
  education: {
    example: "Good education gives children more choices in life.",
    exampleTranslation: "良好的教育能給孩子更多人生選擇。"
  },
  effect: {
    example: "Lack of sleep can have a strong effect on memory.",
    exampleTranslation: "睡眠不足會對記憶力有很大的影響。"
  },
  effort: {
    example: "Her effort finally paid off in the final exam.",
    exampleTranslation: "她的努力終於在期末考有了回報。"
  },
  either: {
    example: "You can sit on either side of the table.",
    exampleTranslation: "你可以坐在桌子的任何一邊。"
  },
  electric: {
    example: "We bought an electric fan for the hot summer days.",
    exampleTranslation: "我們買了一台電風扇來度過炎熱的夏天。"
  },
  empty: {
    example: "The classroom was empty after the students went home.",
    exampleTranslation: "學生回家後，教室就空了。"
  },
  encourage: {
    example: "Her parents encourage her to speak English at home.",
    exampleTranslation: "她的父母鼓勵她在家裡說英文。"
  },
  enemy: {
    example: "For many learners, fear is the biggest enemy.",
    exampleTranslation: "對很多學習者來說，恐懼是最大的敵人。"
  },
  energy: {
    example: "A short walk can give you enough energy to study again.",
    exampleTranslation: "短暫散步一下，就能給你足夠的精力再繼續讀書。"
  },
  engine: {
    example: "The bus engine made a strange noise this morning.",
    exampleTranslation: "今天早上公車的引擎發出奇怪的聲音。"
  },
  enough: {
    example: "Ten minutes is enough to review five words carefully.",
    exampleTranslation: "十分鐘就足夠仔細複習五個單字了。"
  },
  enter: {
    example: "Please enter your name before you start the test.",
    exampleTranslation: "開始測驗前，請先輸入你的名字。"
  },
  environment: {
    example: "A quiet environment makes it easier to concentrate.",
    exampleTranslation: "安靜的環境會讓人更容易專心。"
  },
  especially: {
    example: "This lesson is especially helpful for beginners.",
    exampleTranslation: "這堂課對初學者尤其有幫助。"
  },
  event: {
    example: "The school will hold a reading event next Friday.",
    exampleTranslation: "學校下週五會舉辦一場閱讀活動。"
  },
  exact: {
    example: "I cannot remember the exact time of the phone call.",
    exampleTranslation: "我記不得那通電話的確切時間。"
  },
  example: {
    example: "The teacher wrote an example on the board for us to follow.",
    exampleTranslation: "老師在黑板上寫了一個例子讓我們照著做。"
  },
  excellent: {
    example: "Her pronunciation became excellent after months of practice.",
    exampleTranslation: "經過好幾個月的練習後，她的發音變得非常好。"
  },
  exercise: {
    example: "Reading aloud is a useful exercise for speaking more clearly.",
    exampleTranslation: "大聲朗讀是讓口說更清楚的有用練習。"
  },
  except: {
    example: "Everyone finished the task except Kevin.",
    exampleTranslation: "除了 Kevin 之外，每個人都完成了任務。"
  },
  excite: {
    example: "New travel plans always excite my younger sister.",
    exampleTranslation: "新的旅行計畫總是讓我妹妹很興奮。"
  },
  exist: {
    example: "Many small study habits exist in successful learners.",
    exampleTranslation: "很多成功的學習者都具備一些小小的學習習慣。"
  },
  expect: {
    example: "Do not expect perfect English after only one week.",
    exampleTranslation: "不要期待只學一週英文就能達到完美。"
  },
  experience: {
    example: "Working at the store gave her valuable customer service experience.",
    exampleTranslation: "在那家店工作讓她得到寶貴的顧客服務經驗。"
  },
  explain: {
    example: "Can you explain this grammar rule in a simpler way?",
    exampleTranslation: "你可以用更簡單的方式解釋這個文法規則嗎？"
  },
  express: {
    example: "She found the right words to express her thanks.",
    exampleTranslation: "她找到了合適的字句來表達她的感謝。"
  },
  extra: {
    example: "The teacher gave us extra time to check our answers.",
    exampleTranslation: "老師多給了我們一些時間檢查答案。"
  },
  hair: {
    example: "Her hair was still wet after she walked in the rain.",
    exampleTranslation: "她在雨中走過之後，頭髮還是濕的。"
  },
  kit: {
    example: "He always keeps a small first-aid kit in his car.",
    exampleTranslation: "他總是在車上放一個小急救包。"
  },
  classic: {
    example: "That novel is now considered a classic in English literature.",
    exampleTranslation: "那本小說現在被視為英國文學中的經典。"
  },
  basis: {
    example: "Trust is the basis of every good friendship.",
    exampleTranslation: "信任是每段好友情的基礎。"
  },
  command: {
    example: "The captain gave the command to start moving.",
    exampleTranslation: "隊長下達了開始前進的命令。"
  },
  cities: {
    example: "Many large cities become quieter late at night.",
    exampleTranslation: "很多大城市到了深夜會變得比較安靜。"
  },
  william: {
    example: "William brought his notebook to the meeting this morning.",
    exampleTranslation: "William 今天早上帶著筆記本去開會。"
  },
  award: {
    example: "She received an award for her volunteer work.",
    exampleTranslation: "她因為志工服務而得到一個獎項。"
  },
  tree: {
    example: "We sat under a big tree to enjoy the cool air.",
    exampleTranslation: "我們坐在一棵大樹下享受涼爽的空氣。"
  },
  peter: {
    example: "Peter sent me the file before lunch.",
    exampleTranslation: "Peter 在午餐前把檔案傳給我。"
  },
  assessment: {
    example: "The teacher finished the reading assessment this afternoon.",
    exampleTranslation: "老師今天下午完成了閱讀評量。"
  },
  ensure: {
    example: "Please read the form again to ensure everything is correct.",
    exampleTranslation: "請再看一次表格，確認每一項都正確。"
  },
  thus: {
    example: "The road was blocked, thus we had to take another way.",
    exampleTranslation: "那條路被堵住了，因此我們只好改走別條路。"
  },
  wall: {
    example: "There is a large world map on the classroom wall.",
    exampleTranslation: "教室的牆上有一張很大的世界地圖。"
  },
  involved: {
    example: "Many parents were involved in planning the school fair.",
    exampleTranslation: "很多家長都有參與規劃學校園遊會。"
  },
  interface: {
    example: "The app has a simple interface that is easy to use.",
    exampleTranslation: "這個應用程式的介面很簡單，也很容易使用。"
  },
  warning: {
    example: "The sign gave a clear warning about the wet floor.",
    exampleTranslation: "那個告示牌清楚地警告大家地板很滑。"
  },
  wine: {
    example: "They served wine with dinner at the small hotel.",
    exampleTranslation: "他們在那家小旅館的晚餐時供應葡萄酒。"
  },
  locations: {
    example: "The map shows the locations of all the bus stops.",
    exampleTranslation: "地圖顯示了所有公車站的位置。"
  },
  vote: {
    example: "Students will vote for the new class leader tomorrow.",
    exampleTranslation: "學生們明天會投票選出新的班長。"
  },
  forward: {
    example: "I look forward to our next English lesson.",
    exampleTranslation: "我很期待下一堂英文課。"
  },
  flowers: {
    example: "She put fresh flowers on the dining table.",
    exampleTranslation: "她把新鮮的花放在餐桌上。"
  },
  stars: {
    example: "We could see many stars in the sky that night.",
    exampleTranslation: "那天晚上我們可以看見天空中很多星星。"
  },
  significant: {
    example: "There was a significant change in his attitude after the talk.",
    exampleTranslation: "談完之後，他的態度有了明顯的改變。"
  },
  technologies: {
    example: "New technologies are changing the way people learn languages.",
    exampleTranslation: "新科技正在改變人們學語言的方式。"
  },
  owner: {
    example: "The owner of the cafe knows many of the regular customers.",
    exampleTranslation: "那家咖啡店的老闆認識許多常客。"
  },
  retail: {
    example: "She found a part-time job in retail during the summer.",
    exampleTranslation: "她在暑假期間找到一份零售業的兼職工作。"
  },
  animals: {
    example: "The children learned about wild animals at the zoo.",
    exampleTranslation: "孩子們在動物園學到了很多野生動物的知識。"
  },
  useful: {
    example: "This short phrase is useful in everyday conversation.",
    exampleTranslation: "這個短句在日常對話中很實用。"
  },
  directly: {
    example: "Please send the message directly to me.",
    exampleTranslation: "請直接把訊息傳給我。"
  },
  manufacturer: {
    example: "The manufacturer released a safer version of the product.",
    exampleTranslation: "製造商推出了這個產品更安全的新版本。"
  },
  ways: {
    example: "There are many ways to improve your listening skill.",
    exampleTranslation: "有很多方法可以提升你的聽力能力。"
  },
  son: {
    example: "Their son started junior high school this year.",
    exampleTranslation: "他們的兒子今年開始讀國中。"
  },
  providing: {
    example: "We can have class outside, providing the weather stays nice.",
    exampleTranslation: "如果天氣持續不錯，我們就可以在戶外上課。"
  },
  rule: {
    example: "One important rule is to listen before you answer.",
    exampleTranslation: "一條重要的規則是先聽再回答。"
  },
  housing: {
    example: "The city is building more affordable housing for families.",
    exampleTranslation: "這座城市正在為家庭興建更多可負擔的住宅。"
  },
  takes: {
    example: "It takes about fifteen minutes to walk to the station.",
    exampleTranslation: "走到車站大約要十五分鐘。"
  },
  bring: {
    example: "Please bring your notebook to class tomorrow.",
    exampleTranslation: "請明天把你的筆記本帶來上課。"
  },
  catalog: {
    example: "The library catalog helped me find the book quickly.",
    exampleTranslation: "圖書館目錄幫我很快找到那本書。"
  },
  searches: {
    example: "Her online searches led her to a useful English website.",
    exampleTranslation: "她的網路搜尋讓她找到一個很有用的英文網站。"
  },
  trying: {
    example: "He kept trying even after making several mistakes.",
    exampleTranslation: "即使犯了好幾個錯，他還是繼續努力。"
  },
  mother: {
    example: "My mother reads short English stories with me at night.",
    exampleTranslation: "我媽媽晚上會陪我讀短篇英文故事。"
  },
  authority: {
    example: "The local authority closed the road for repairs.",
    exampleTranslation: "當地主管機關為了維修而封閉了那條路。"
  },
  considered: {
    example: "Her idea was considered helpful by the whole group.",
    exampleTranslation: "她的想法被整個小組認為很有幫助。"
  },
  told: {
    example: "She told me the answer after the class ended.",
    exampleTranslation: "下課後她把答案告訴了我。"
  },
  traffic: {
    example: "There was heavy traffic near the station this morning.",
    exampleTranslation: "今天早上車站附近的交通非常擁擠。"
  },
  programme: {
    example: "The school programme begins with a welcome speech.",
    exampleTranslation: "學校的活動流程以歡迎致詞開始。"
  },
  joined: {
    example: "He joined the reading club last month.",
    exampleTranslation: "他上個月加入了閱讀社。"
  },
  input: {
    example: "The teacher asked for student input before changing the plan.",
    exampleTranslation: "老師在改變計畫前先徵求學生的意見。"
  },
  strategy: {
    example: "Reading aloud every day is a good strategy for beginners.",
    exampleTranslation: "每天大聲朗讀對初學者來說是一個很好的策略。"
  },
  agent: {
    example: "The travel agent helped us find a cheaper ticket.",
    exampleTranslation: "旅行社人員幫我們找到一張比較便宜的票。"
  },
  valid: {
    example: "This ticket is valid until the end of the month.",
    exampleTranslation: "這張票在月底前都有效。"
  },
  modern: {
    example: "The library has a bright and modern design.",
    exampleTranslation: "這間圖書館有明亮又現代的設計。"
  },
  senior: {
    example: "My senior gave me useful advice about the exam.",
    exampleTranslation: "我的學長姐給了我一些關於考試的有用建議。"
  },
  teaching: {
    example: "Good teaching can make difficult ideas easier to understand.",
    exampleTranslation: "好的教學能讓困難的觀念更容易理解。"
  },
  door: {
    example: "Please close the door before the class begins.",
    exampleTranslation: "上課前請把門關上。"
  },
  grand: {
    example: "They stayed in a grand old hotel near the river.",
    exampleTranslation: "他們住在河邊一間氣派的老飯店裡。"
  },
  testing: {
    example: "The new app is still in testing this week.",
    exampleTranslation: "這個新應用程式這週仍在測試中。"
  },
  trial: {
    example: "We used the software for a free trial last month.",
    exampleTranslation: "我們上個月試用了這套軟體的免費版本。"
  },
  charge: {
    example: "The hotel did not charge us for breakfast.",
    exampleTranslation: "那家飯店沒有向我們收早餐費。"
  },
  instead: {
    example: "She stayed home and studied instead of going out.",
    exampleTranslation: "她沒有出門，反而留在家裡讀書。"
  },
  cool: {
    example: "The evening air feels cool by the sea.",
    exampleTranslation: "海邊傍晚的空氣感覺很涼爽。"
  },
  normal: {
    example: "It is normal to feel nervous before a speech.",
    exampleTranslation: "在演講前感到緊張是很正常的。"
  },
  enterprise: {
    example: "The small enterprise started with only five workers.",
    exampleTranslation: "這家小企業一開始只有五名員工。"
  },
  entire: {
    example: "She spent the entire afternoon reading English articles.",
    exampleTranslation: "她整個下午都在讀英文文章。"
  },
  educational: {
    example: "This video is both fun and educational for children.",
    exampleTranslation: "這部影片對孩子來說既有趣又有教育意義。"
  },
  leading: {
    example: "She works for a leading company in the technology field.",
    exampleTranslation: "她在科技領域一家領先的公司工作。"
  },
  metal: {
    example: "The table has a metal frame and a wooden top.",
    exampleTranslation: "這張桌子有金屬框架和木頭桌面。"
  },
  positive: {
    example: "Try to keep a positive attitude when learning new words.",
    exampleTranslation: "學新單字時，盡量保持正面的態度。"
  },
  fitness: {
    example: "Walking every day can improve your fitness.",
    exampleTranslation: "每天走路可以改善你的體能。"
  },
  opinion: {
    example: "In my opinion, this is the easiest way to remember it.",
    exampleTranslation: "依我看，這是記住它最簡單的方法。"
  },
  football: {
    example: "The boys played football on the playground after school.",
    exampleTranslation: "那些男孩放學後在操場上踢足球。"
  },
  abstract: {
    example: "The report begins with a short abstract on the first page.",
    exampleTranslation: "這份報告在第一頁先有一段簡短摘要。"
  },
  output: {
    example: "The machine's output increased after the repair.",
    exampleTranslation: "那台機器修好後，產量提高了。"
  },
  funds: {
    example: "The school raised funds for new library books.",
    exampleTranslation: "學校募款來購買新的圖書館書籍。"
  },
  greater: {
    example: "With practice, she gained greater confidence in speaking.",
    exampleTranslation: "透過練習，她對口說更有自信了。"
  },
  likely: {
    example: "It is likely to rain later this afternoon.",
    exampleTranslation: "今天下午晚一點很可能會下雨。"
  },
  employees: {
    example: "The company has more than one hundred employees.",
    exampleTranslation: "那家公司有一百多名員工。"
  },
  artists: {
    example: "Many local artists showed their work at the fair.",
    exampleTranslation: "許多在地藝術家在展覽會上展示了作品。"
  },
  alternative: {
    example: "We chose a cheaper alternative for the school trip.",
    exampleTranslation: "我們為校外教學選了一個比較便宜的替代方案。"
  },
  responsibility: {
    example: "Taking care of the class plants is our shared responsibility.",
    exampleTranslation: "照顧班上的植物是我們共同的責任。"
  },
  resolution: {
    example: "She made a resolution to read English every night.",
    exampleTranslation: "她下定決心每天晚上都要讀英文。"
  },
  guest: {
    example: "The hotel guest asked for another clean towel.",
    exampleTranslation: "那位飯店房客要求再拿一條乾淨毛巾。"
  },
  grab: {
    example: "I need to grab my bag before the bus arrives.",
    exampleTranslation: "我得在公車到站前先拿上我的包包。"
  },
  attract: {
    example: "Bright signs can attract more customers at night.",
    exampleTranslation: "明亮的招牌在晚上可以吸引更多顧客。"
  },
  disable: {
    example: "You can disable the sound if you need a quiet place to study.",
    exampleTranslation: "如果你需要安靜的讀書環境，可以把聲音關掉。"
  },
  snake: {
    example: "We saw a small snake near the river path.",
    exampleTranslation: "我們在河邊的小路旁看到一條小蛇。"
  },
  succeed: {
    example: "If you keep practicing, you will succeed in the end.",
    exampleTranslation: "如果你持續練習，最後一定會成功。"
  },
  reminder: {
    example: "I set a reminder on my phone for tonight's study time.",
    exampleTranslation: "我在手機上設了一個提醒，提醒今晚的讀書時間。"
  },
  searched: {
    example: "She searched the internet for a better explanation.",
    exampleTranslation: "她上網搜尋一個更好的解釋。"
  },
  behavioral: {
    example: "The report discussed behavioral changes in young children.",
    exampleTranslation: "這份報告討論了年幼孩子的行為變化。"
  },
  riverside: {
    example: "We took a slow walk along the riverside after dinner.",
    exampleTranslation: "晚餐後我們沿著河邊慢慢散步。"
  },
  insights: {
    example: "The interview gave us useful insights about the project.",
    exampleTranslation: "那場訪談讓我們對這個專案有了很有用的見解。"
  },
  abilities: {
    example: "Music can help children develop their language abilities.",
    exampleTranslation: "音樂可以幫助孩子發展語言能力。"
  },
  initiated: {
    example: "The school initiated a new reading program this month.",
    exampleTranslation: "學校這個月啟動了一個新的閱讀計畫。"
  },
  karaoke: {
    example: "They sang their favorite songs at karaoke last night.",
    exampleTranslation: "他們昨晚在 KTV 唱了自己最喜歡的歌。"
  },
  trap: {
    example: "The mouse escaped from the trap before morning.",
    exampleTranslation: "那隻老鼠在早上之前就逃出了陷阱。"
  },
  lonely: {
    example: "He felt lonely after moving to a new city alone.",
    exampleTranslation: "他一個人搬到新城市後感到很孤單。"
  },
  nonprofit: {
    example: "She works for a nonprofit that helps children learn.",
    exampleTranslation: "她在一個幫助孩子學習的非營利組織工作。"
  },
  suspended: {
    example: "The game was suspended because of the heavy rain.",
    exampleTranslation: "因為大雨，比賽被暫停了。"
  },
  observe: {
    example: "Please observe the signs near the school entrance.",
    exampleTranslation: "請留意學校入口附近的標示。"
  },
  containers: {
    example: "The kitchen shelf is full of food containers.",
    exampleTranslation: "廚房的架子上放滿了食物容器。"
  }
};

const DEFAULT_WORDS_PER_DAY = 50;
const DEFAULT_TARGET_LEVEL_WORD_COUNTS = {
  2000: 2000,
  3000: 3000,
  4000: 4000,
  5000: 5000,
  10000: 10000
};
const WORDS_PER_DAY = Number.isInteger(externalCatalog.wordsPerDay) && externalCatalog.wordsPerDay > 0
  ? externalCatalog.wordsPerDay
  : DEFAULT_WORDS_PER_DAY;
const TARGET_LEVEL_WORD_COUNTS = {
  ...DEFAULT_TARGET_LEVEL_WORD_COUNTS,
  ...(externalCatalog.targetWordCounts ?? {})
};
const DEFAULT_CHALLENGE_WINDOW = 700;
const CHALLENGE_WINDOW = Number.isInteger(externalCatalog.challengeWindow) && externalCatalog.challengeWindow > 0
  ? externalCatalog.challengeWindow
  : DEFAULT_CHALLENGE_WINDOW;
const LEVEL_BAND_RANGES = {
  2000: { start: 2000 - CHALLENGE_WINDOW, end: 2000 },
  3000: { start: 3000 - CHALLENGE_WINDOW, end: 3000 },
  4000: { start: 4000 - CHALLENGE_WINDOW, end: 4000 },
  5000: { start: 5000 - CHALLENGE_WINDOW, end: 5000 },
  10000: { start: 10000 - CHALLENGE_WINDOW, end: 10000 }
};

const ORDERED_LEVEL_WORDS = [
  "accept", "act", "advice", "afraid", "agree", "allow", "already", "anywhere", "appear", "arrive",
  "article", "attention", "avoid", "borrow", "breathe", "calm", "choice", "common", "complete", "continue",
  "ability", "across", "alive", "among", "amount", "announce", "apply", "average", "balance", "belong",
  "below", "compare", "consider", "contain", "control", "conversation", "create", "daily", "decide", "deep",
  "although", "ancient", "awake", "beauty", "battle", "career", "certain", "challenge", "condition", "curious",
  "custom", "develop", "difference", "difficult", "discover", "discuss", "distance", "during", "early", "education",
  "disease", "divide", "double", "earth", "effect", "effort", "electric", "empty", "encourage", "enemy",
  "energy", "engine", "enough", "enter", "environment", "especially", "event", "example", "excellent", "exercise",
  "either", "exact", "except", "excite", "exist", "expect", "experience", "explain", "express", "extra",
  "factory", "familiar", "famous", "feature", "feed", "female", "festival", "field", "final", "beyond"
];

const GENERATED_EXAMPLE_BUILDERS = [
  (word) => `The word ${word} is useful in daily English.`,
  (word) => `I heard the word ${word} in class today.`,
  (word) => `Our teacher asked us to practice ${word} again.`,
  (word) => `I wrote ${word} in my notebook this morning.`,
  (word) => `This lesson helps me remember the word ${word}.`,
  (word) => `Can you use ${word} in a simple sentence?`
];

const GENERATED_TRANSLATION_BUILDERS = [
  (word, meaning) => `單字 ${word} 在日常英文裡很實用，意思是「${meaning}」。`,
  (word, meaning) => `我今天上課聽到了 ${word} 這個字，它的意思是「${meaning}」。`,
  (word, meaning) => `老師要我們再練習一次 ${word}，這個字是「${meaning}」。`,
  (word, meaning) => `我今天早上把 ${word} 寫進筆記本，它的意思是「${meaning}」。`,
  (word, meaning) => `這課在幫我記住 ${word} 這個字，也就是「${meaning}」。`,
  (word, meaning) => `你可以試著把 ${word} 放進簡單句子裡，它的意思是「${meaning}」。`
];

function cloneLesson(lesson) {
  return {
    ...lesson,
    options: [...lesson.options]
  };
}

function getTemplateIndexByWord(word, size) {
  let total = 0;

  for (const character of word) {
    total += character.charCodeAt(0);
  }

  return total % size;
}

function createGeneratedExample(word) {
  const builder = GENERATED_EXAMPLE_BUILDERS[getTemplateIndexByWord(word, GENERATED_EXAMPLE_BUILDERS.length)];
  return builder(word);
}

function createGeneratedExampleTranslation(word, meaning) {
  const builder = GENERATED_TRANSLATION_BUILDERS[getTemplateIndexByWord(word, GENERATED_TRANSLATION_BUILDERS.length)];
  return builder(word, meaning);
}

function getPrimaryMeaning(meaning) {
  if (!meaning) {
    return "這個意思";
  }

  return meaning.split(/[；;/]/)[0].trim() || meaning;
}

function inferWordCategory(word, meaning) {
  const primaryMeaning = getPrimaryMeaning(meaning);
  const normalizedWord = word.toLowerCase();

  if (/ly$/.test(normalizedWord)) {
    return "adverb";
  }

  if (/(ing|ed|ize|ise|fy|en)$/.test(normalizedWord) || /^(使|讓|把|將|進行|開始|持續|完成|建立|表達|控制|決定|進入|提高)/.test(primaryMeaning)) {
    return "verb";
  }

  if (/(ous|ful|able|ible|al|ive|less|ish|ic|ary)$/.test(normalizedWord) || /^(有.*的|.*的|能.*的|適合.*的|重要的|明顯的|特別的|困難的|簡單的)/.test(primaryMeaning)) {
    return "adjective";
  }

  return "noun";
}

function hashText(text) {
  return Array.from(text).reduce((total, character) => total + character.charCodeAt(0), 0);
}

function pickVariantIndex(word, meaning, size, offset = 0) {
  return (hashText(`${word}|${meaning}`) + offset) % size;
}

function getMeaningDomain(primaryMeaning) {
  const domainRules = [
    { domain: "time", pattern: /(時間|時候|每天|每日|早|晚|期間|最後|已經|最近|再次|立刻)/ },
    { domain: "place", pattern: /(地方|位置|方向|對面|下方|裡面|外面|到達|進入|穿過|距離|環境)/ },
    { domain: "feeling", pattern: /(感覺|情緒|害怕|冷靜|開心|生氣|好奇|緊張)/ },
    { domain: "speaking", pattern: /(說|講|表達|討論|對話|解釋|回答|聲音|發音)/ },
    { domain: "learning", pattern: /(學習|練習|教育|知識|例子|文章|問題|答案|注意力|經驗)/ },
    { domain: "work", pattern: /(工作|職業|工廠|工具|引擎|功能|控制|建立|發展)/ },
    { domain: "person", pattern: /(人|朋友|家人|學生|老師|女性|敵人)/ },
    { domain: "thing", pattern: /(物品|東西|數量|力量|能源|地球|節日|特色|建議|條件)/ }
  ];

  return domainRules.find((rule) => rule.pattern.test(primaryMeaning))?.domain || "general";
}

const MEANING_SCENARIO_BUILDERS = [
  {
    pattern: /(時間|時候|每天|每日|早|晚|期間|最後|已經|最近|再次|立刻)/,
    build: (word, primaryMeaning) => {
      const examples = [
        `I use ${word} when I talk about time in English.`,
        `This sentence uses ${word} to show a time idea.`,
        `We often say ${word} when we mention time.`,
        `${capitalizeWord(word)} is useful when we talk about when something happens.`
      ];
      const translations = [
        `這句是在說 ${word} 常用來表達時間相關的意思，也就是「${primaryMeaning}」。`,
        `這句用 ${word} 來表達時間概念，意思是「${primaryMeaning}」。`,
        `這句是在說我們提到時間時，常會用到 ${word}。`,
        `這句是在表達 ${word} 很適合用來說明事情發生的時間。`
      ];
      const index = getTemplateIndexByWord(word, examples.length);

      return { example: examples[index], exampleTranslation: translations[index] };
    }
  },
  {
    pattern: /(地方|位置|方向|對面|下方|裡面|外面|到達|進入|穿過|距離|環境)/,
    build: (word, primaryMeaning) => {
      const examples = [
        `We often use ${word} when we describe a place or direction.`,
        `This example uses ${word} to talk about location.`,
        `People may say ${word} when they explain where something is.`,
        `${capitalizeWord(word)} is useful for describing place and movement.`
      ];
      const translations = [
        `這句是在說 ${word} 常用在描述地點或方向，意思是「${primaryMeaning}」。`,
        `這句是用 ${word} 來談位置概念，它的意思是「${primaryMeaning}」。`,
        `這句是在說人們解釋東西在哪裡時，可能會用到 ${word}。`,
        `這句是在表達 ${word} 很適合用來描述地點和移動。`
      ];
      const index = getTemplateIndexByWord(word, examples.length);

      return { example: examples[index], exampleTranslation: translations[index] };
    }
  },
  {
    pattern: /(感覺|情緒|害怕|冷靜|開心|生氣|好奇|緊張)/,
    build: (word, primaryMeaning) => {
      const examples = [
        `She used the word ${word} to describe her feeling.`,
        `This sentence uses ${word} to talk about emotion.`,
        `I may choose ${word} when I describe how I feel.`,
        `${capitalizeWord(word)} can help us express a feeling clearly.`
      ];
      const translations = [
        `這句是在說她用 ${word} 來描述自己的感受，也就是「${primaryMeaning}」。`,
        `這句是用 ${word} 來表達情緒，意思是「${primaryMeaning}」。`,
        `這句是在說當我描述感受時，可能會選用 ${word}。`,
        `這句是在表達 ${word} 可以幫助我們清楚說出感受。`
      ];
      const index = getTemplateIndexByWord(word, examples.length);

      return { example: examples[index], exampleTranslation: translations[index] };
    }
  },
  {
    pattern: /(說|講|表達|討論|對話|解釋|回答|聲音|發音)/,
    build: (word, primaryMeaning) => {
      const examples = [
        `This word ${word} is helpful when we speak in class.`,
        `We can use ${word} in speaking practice.`,
        `This sentence shows how ${word} may appear in conversation.`,
        `${capitalizeWord(word)} is useful when we explain something aloud.`
      ];
      const translations = [
        `這句是在說 ${word} 這個字在課堂口說時很有幫助，意思是「${primaryMeaning}」。`,
        `這句是在說我們口說練習時可以用到 ${word}。`,
        `這句是在示範 ${word} 可能怎麼出現在對話裡。`,
        `這句是在表達 ${word} 很適合用在開口解釋事情的時候。`
      ];
      const index = getTemplateIndexByWord(word, examples.length);

      return { example: examples[index], exampleTranslation: translations[index] };
    }
  },
  {
    pattern: /(學習|練習|教育|知識|例子|文章|問題|答案|注意力|經驗)/,
    build: (word, primaryMeaning) => {
      const examples = [
        `Our teacher used ${word} in today's lesson.`,
        `This example shows ${word} in a learning context.`,
        `We saw ${word} while studying in class today.`,
        `${capitalizeWord(word)} is a word students may meet during practice.`
      ];
      const translations = [
        `這句是在說老師今天上課用到了 ${word} 這個字，它的意思是「${primaryMeaning}」。`,
        `這句是在示範 ${word} 出現在學習情境中的用法。`,
        `這句是在說我們今天上課學習時看到了 ${word}。`,
        `這句是在表達學生練習時可能會遇到 ${word} 這個字。`
      ];
      const index = getTemplateIndexByWord(word, examples.length);

      return { example: examples[index], exampleTranslation: translations[index] };
    }
  },
  {
    pattern: /(工作|職業|工廠|工具|引擎|功能|控制|建立|發展)/,
    build: (word, primaryMeaning) => {
      const examples = [
        `People may use ${word} at work or in daily tasks.`,
        `This sentence places ${word} in a work situation.`,
        `We may hear ${word} when people talk about tasks and jobs.`,
        `${capitalizeWord(word)} can appear in practical work situations.`
      ];
      const translations = [
        `這句是在說人們在工作或日常事情中可能會用到 ${word}，意思是「${primaryMeaning}」。`,
        `這句是把 ${word} 放進工作情境裡來表達。`,
        `這句是在說當人們談工作和任務時，可能會聽到 ${word}。`,
        `這句是在表達 ${word} 可能出現在實際工作的場景裡。`
      ];
      const index = getTemplateIndexByWord(word, examples.length);

      return { example: examples[index], exampleTranslation: translations[index] };
    }
  },
  {
    pattern: /(人|朋友|家人|學生|老師|女性|敵人)/,
    build: (word, primaryMeaning) => {
      const examples = [
        `The story uses ${word} to talk about a person.`,
        `This sentence includes ${word} when describing someone.`,
        `We may use ${word} while talking about people.`,
        `${capitalizeWord(word)} can appear in a sentence about a person.`
      ];
      const translations = [
        `這句是在說故事裡用 ${word} 來談某個人，意思是「${primaryMeaning}」。`,
        `這句是在描述人物時放入 ${word} 這個字。`,
        `這句是在說當我們談人時，可能會用到 ${word}。`,
        `這句是在表達 ${word} 可以出現在和人物有關的句子裡。`
      ];
      const index = getTemplateIndexByWord(word, examples.length);

      return { example: examples[index], exampleTranslation: translations[index] };
    }
  },
  {
    pattern: /(物品|東西|數量|力量|能源|地球|節日|特色|建議|條件)/,
    build: (word, primaryMeaning) => {
      const examples = [
        `This example shows how ${word} appears in real life.`,
        `We can connect ${word} to things we see every day.`,
        `This sentence gives a practical use for ${word}.`,
        `${capitalizeWord(word)} can be understood through daily examples.`
      ];
      const translations = [
        `這句是在說 ${word} 這個概念會怎麼出現在真實生活裡，它的意思是「${primaryMeaning}」。`,
        `這句是在說我們可以把 ${word} 和每天看到的事物連起來理解。`,
        `這句是在示範 ${word} 的一種實際用法。`,
        `這句是在表達可以透過日常例子來理解 ${word}。`
      ];
      const index = getTemplateIndexByWord(word, examples.length);

      return { example: examples[index], exampleTranslation: translations[index] };
    }
  }
];

function createMeaningDrivenExample(word, meaning) {
  const primaryMeaning = getPrimaryMeaning(meaning);
  const category = inferWordCategory(word, primaryMeaning);
  const domain = getMeaningDomain(primaryMeaning);
  const domainTemplates = {
    time: [
      {
        example: `In class, we used ${word} to talk about time.`,
        translation: `這句是在說課堂上我們用 ${word} 來談時間，意思是「${primaryMeaning}」。`
      },
      {
        example: `My teacher chose ${word} when she explained when something happened.`,
        translation: `這句是在說老師解釋事情何時發生時，選用了 ${word}。`
      },
      {
        example: `I often see ${word} in sentences about daily routines.`,
        translation: `這句是在說我常在描述日常作息的句子裡看到 ${word}。`
      },
      {
        example: `${capitalizeWord(word)} helps us show a time idea more clearly.`,
        translation: `這句是在表達 ${word} 可以讓時間概念說得更清楚。`
      },
      {
        example: `This example puts ${word} into a sentence about schedule and timing.`,
        translation: `這句是把 ${word} 放進和行程、時間點有關的句子裡。`
      },
      {
        example: `We may use ${word} when we describe when an action starts or ends.`,
        translation: `這句是在說描述動作何時開始或結束時，可能會用到 ${word}。`
      }
    ],
    place: [
      {
        example: `The sentence uses ${word} to describe where something is.`,
        translation: `這句是用 ${word} 來描述東西在哪裡。`
      },
      {
        example: `I learned ${word} while talking about place and direction.`,
        translation: `這句是在說我是在談地點和方向時學到 ${word} 的。`
      },
      {
        example: `${capitalizeWord(word)} often appears in sentences about movement or location.`,
        translation: `這句是在表達 ${word} 常出現在移動或位置相關句子裡。`
      },
      {
        example: `My notebook gives ${word} as a useful word for describing a place.`,
        translation: `這句是在說我的筆記把 ${word} 列為描述地點的實用單字。`
      },
      {
        example: `We can use ${word} when we explain direction to someone.`,
        translation: `這句是在說替別人指路時可以用到 ${word}。`
      },
      {
        example: `This example shows ${word} in a sentence about position.`,
        translation: `這句是在示範 ${word} 出現在位置概念的句子裡。`
      }
    ],
    feeling: [
      {
        example: `She said ${word} to describe how she felt.`,
        translation: `這句是在說她用 ${word} 來描述自己的感受。`
      },
      {
        example: `The speaker chose ${word} to express an emotion clearly.`,
        translation: `這句是在說講話的人選了 ${word} 來清楚表達情緒。`
      },
      {
        example: `I may use ${word} when I want to talk about my feelings.`,
        translation: `這句是在說當我想談感受時，可能會用到 ${word}。`
      },
      {
        example: `${capitalizeWord(word)} fits naturally in a sentence about mood.`,
        translation: `這句是在表達 ${word} 很適合放在心情相關的句子裡。`
      },
      {
        example: `The lesson uses ${word} in an example about emotion.`,
        translation: `這句是在說這課把 ${word} 用在情緒情境的例句裡。`
      },
      {
        example: `We practiced ${word} while learning how to describe feelings.`,
        translation: `這句是在說我們練習用 ${word} 來描述感受。`
      }
    ],
    speaking: [
      {
        example: `This sentence shows how ${word} may appear in conversation.`,
        translation: `這句是在示範 ${word} 可能怎麼出現在對話裡。`
      },
      {
        example: `We practiced ${word} during speaking class today.`,
        translation: `這句是在說我們今天口說課練習了 ${word}。`
      },
      {
        example: `${capitalizeWord(word)} is useful when we explain an idea aloud.`,
        translation: `這句是在表達 ${word} 很適合用在口頭解釋想法時。`
      },
      {
        example: `My teacher used ${word} in a short classroom dialogue.`,
        translation: `這句是在說老師把 ${word} 放進了一段簡短課堂對話。`
      },
      {
        example: `The example sentence includes ${word} in spoken English.`,
        translation: `這句是在說例句把 ${word} 放進了口語英文情境中。`
      },
      {
        example: `I wrote down ${word} because it sounds natural in conversation.`,
        translation: `這句是在說我記下 ${word}，因為它在對話裡聽起來很自然。`
      }
    ],
    learning: [
      {
        example: `Our teacher used ${word} in today's lesson.`,
        translation: `這句是在說老師今天上課用到了 ${word}。`
      },
      {
        example: `I met the word ${word} while studying this unit.`,
        translation: `這句是在說我在讀這個單元時遇到了 ${word}。`
      },
      {
        example: `This example puts ${word} into a study situation.`,
        translation: `這句是把 ${word} 放進學習情境裡。`
      },
      {
        example: `${capitalizeWord(word)} is a word students may notice during practice.`,
        translation: `這句是在表達學生練習時可能會注意到 ${word} 這個字。`
      },
      {
        example: `The lesson highlights ${word} as part of today's learning.`,
        translation: `這句是在說這堂課把 ${word} 當成今天學習內容的一部分。`
      },
      {
        example: `We saw ${word} in an example from the workbook.`,
        translation: `這句是在說我們在練習本的例句裡看到了 ${word}。`
      }
    ],
    work: [
      {
        example: `People may use ${word} at work or in daily tasks.`,
        translation: `這句是在說人們在工作或日常事情中可能會用到 ${word}。`
      },
      {
        example: `This sentence places ${word} in a practical work setting.`,
        translation: `這句是把 ${word} 放進實際工作的場景裡。`
      },
      {
        example: `${capitalizeWord(word)} may appear when people discuss tasks or jobs.`,
        translation: `這句是在說人們談任務或工作時，可能會出現 ${word}。`
      },
      {
        example: `I learned ${word} through an example about doing a task.`,
        translation: `這句是在說我是透過執行任務的例子來學 ${word} 的。`
      },
      {
        example: `The lesson uses ${word} in a situation about getting work done.`,
        translation: `這句是在說這課把 ${word} 用在完成工作事項的情境裡。`
      },
      {
        example: `We heard ${word} in a sentence about practical action.`,
        translation: `這句是在說我們在一個實作行動的句子裡聽到了 ${word}。`
      }
    ],
    person: [
      {
        example: `The story uses ${word} to talk about a person.`,
        translation: `這句是在說故事裡用 ${word} 來談某個人。`
      },
      {
        example: `This sentence includes ${word} while describing someone.`,
        translation: `這句是在描述人物時放入了 ${word}。`
      },
      {
        example: `${capitalizeWord(word)} fits naturally in a sentence about people.`,
        translation: `這句是在表達 ${word} 很自然地出現在和人物有關的句子裡。`
      },
      {
        example: `We practiced ${word} in an example about family or classmates.`,
        translation: `這句是在說我們在家人或同學的情境裡練習了 ${word}。`
      },
      {
        example: `The teacher chose ${word} for a sentence about someone in class.`,
        translation: `這句是在說老師替課堂人物情境選用了 ${word}。`
      },
      {
        example: `I remember ${word} from a sentence about a person in the story.`,
        translation: `這句是在說我記住了故事裡和人物有關的 ${word}。`
      }
    ],
    thing: [
      {
        example: `This example shows how ${word} appears in real life.`,
        translation: `這句是在說 ${word} 這個概念會怎麼出現在真實生活裡。`
      },
      {
        example: `We can connect ${word} to something we see every day.`,
        translation: `這句是在說我們可以把 ${word} 和每天看到的事物連起來理解。`
      },
      {
        example: `${capitalizeWord(word)} becomes clearer in a practical example.`,
        translation: `這句是在表達把 ${word} 放進實際例子後會更容易懂。`
      },
      {
        example: `The sentence gives ${word} a simple real-world context.`,
        translation: `這句是替 ${word} 補上一個簡單的真實情境。`
      },
      {
        example: `I understood ${word} better after reading this everyday example.`,
        translation: `這句是在說我看完這個日常例子後，更理解 ${word} 了。`
      },
      {
        example: `This lesson uses ${word} in a concrete situation.`,
        translation: `這句是在說這課把 ${word} 放進具體情境裡。`
      }
    ],
    general: [
      {
        example: `I learned the word ${word} in today's English practice.`,
        translation: `這句是在說我今天英文練習時學到了 ${word}。`
      },
      {
        example: `This example sentence includes ${word} in a simple way.`,
        translation: `這句是在用簡單的方式把 ${word} 放進例句裡。`
      },
      {
        example: `${capitalizeWord(word)} appears here as a useful vocabulary word.`,
        translation: `這句是在表達這裡把 ${word} 當成實用單字來示範。`
      },
      {
        example: `We practiced how to understand ${word} in context.`,
        translation: `這句是在說我們練習怎麼在上下文裡理解 ${word}。`
      },
      {
        example: `My notebook keeps ${word} with an easy example sentence.`,
        translation: `這句是在說我的筆記把 ${word} 配上一句容易懂的例句。`
      },
      {
        example: `The lesson helps me remember ${word} through this sentence.`,
        translation: `這句是在說這堂課透過這句話幫我記住 ${word}。`
      }
    ]
  };
  const templates = domainTemplates[domain];
  const variantIndex = pickVariantIndex(word, primaryMeaning, templates.length, category.length);

  return {
    example: templates[variantIndex].example,
    exampleTranslation: `${templates[variantIndex].translation} 這個字的意思是「${primaryMeaning}」。`
  };
}

function createContextualExample(word, meaning) {
  const primaryMeaning = getPrimaryMeaning(meaning);
  const meaningDrivenExample = createMeaningDrivenExample(word, primaryMeaning);

  if (meaningDrivenExample) {
    return meaningDrivenExample;
  }

  const category = inferWordCategory(word, primaryMeaning);
  const templatesByCategory = {
    verb: [
      `${capitalizeWord(word)} can help us in daily life.`,
      `Please ${word} this idea in a simple way.`,
      `We should ${word} it step by step.`,
      `Try to ${word} before the class ends.`
    ],
    adjective: [
      `This idea sounds ${word} to me.`,
      `The example is ${word} for beginners.`,
      `It is good to stay ${word} while learning.`,
      `That was a very ${word} answer.`
    ],
    adverb: [
      `She spoke ${word} during practice.`,
      `Please read the sentence ${word}.`,
      `He answered the question ${word}.`,
      `The teacher explained it ${word}.`
    ],
    noun: [
      `This ${word} is important in daily life.`,
      `We talked about ${word} in class today.`,
      `The lesson gave us a clear example of ${word}.`,
      `I wrote a note about ${word} in my notebook.`
    ]
  };
  const translationsByCategory = {
    verb: [
      `${capitalizeWord(word)} 這個字有「${primaryMeaning}」的意思，這句是在說它能幫助我們的日常生活。`,
      `這句是說請你用簡單的方式去 ${primaryMeaning}。`,
      `這句是在表達我們應該一步一步去 ${primaryMeaning}。`,
      `這句是說在下課前試著先 ${primaryMeaning}。`
    ],
    adjective: [
      `這句是說這個想法聽起來很「${primaryMeaning}」。`,
      `這句是在說這個例子對初學者來說很「${primaryMeaning}」。`,
      `這句是在表達學習時保持「${primaryMeaning}」是好的。`,
      `這句是說那是一個很「${primaryMeaning}」的回答。`
    ],
    adverb: [
      `這句是在說她練習時表現得很「${primaryMeaning}」。`,
      `這句是請你用「${primaryMeaning}」的方式朗讀句子。`,
      `這句是在說他回答問題時表現得很「${primaryMeaning}」。`,
      `這句是說老師把內容講解得很「${primaryMeaning}」。`
    ],
    noun: [
      `這句是在說 ${word} 這件事和日常生活很有關係，也就是「${primaryMeaning}」。`,
      `這句是說我們今天上課談到了 ${word}，也就是「${primaryMeaning}」。`,
      `這句是在表達這堂課給了我們一個關於 ${word} 的清楚例子。`,
      `這句是說我把 ${word} 記進筆記裡，它的意思是「${primaryMeaning}」。`
    ]
  };
  const templates = templatesByCategory[category];
  const translations = translationsByCategory[category];
  const templateIndex = getTemplateIndexByWord(word, templates.length);

  return {
    example: templates[templateIndex],
    exampleTranslation: translations[templateIndex]
  };
}

function capitalizeWord(word) {
  if (!word) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}

function createGeneratedLesson(entry, distractorMeanings) {
  const correctMeaning = entry.meaning || "待補充";
  const uniqueDistractors = [];

  distractorMeanings.forEach((meaning) => {
    if (meaning && meaning !== correctMeaning && !uniqueDistractors.includes(meaning) && uniqueDistractors.length < 2) {
      uniqueDistractors.push(meaning);
    }
  });

  while (uniqueDistractors.length < 2) {
    uniqueDistractors.push(`與 ${entry.word} 不同的意思`);
  }

  const generatedExample = createContextualExample(entry.word, correctMeaning);
  const manualOverride = MANUAL_EXAMPLE_OVERRIDES[entry.word];

  return {
    word: entry.word,
    phonetic: entry.phonetic || "",
    meaning: correctMeaning,
    example: manualOverride?.example || entry.example || generatedExample.example || createGeneratedExample(entry.word),
    exampleTranslation: manualOverride?.exampleTranslation || entry.exampleTranslation || generatedExample.exampleTranslation || createGeneratedExampleTranslation(entry.word, correctMeaning),
    question: `請選出 ${entry.word} 的正確中文意思：`,
    options: [correctMeaning, ...uniqueDistractors],
    answer: correctMeaning
  };
}

function normalizeCatalogLesson(entry, lessonMap, externalWordMap) {
  if (typeof entry === "string") {
    const lesson = lessonMap.get(entry);
    if (lesson) {
      return cloneLesson(lesson);
    }

    const externalWord = externalWordMap.get(entry);
    return externalWord
      ? {
          ...externalWord,
          example: MANUAL_EXAMPLE_OVERRIDES[entry]?.example || externalWord.example || "",
          exampleTranslation: MANUAL_EXAMPLE_OVERRIDES[entry]?.exampleTranslation || externalWord.exampleTranslation || ""
        }
      : null;
  }

  if (!entry || typeof entry !== "object" || typeof entry.word !== "string") {
    return null;
  }

  if (Array.isArray(entry.options) && typeof entry.answer === "string") {
    return cloneLesson(entry);
  }

  const fallbackLesson = lessonMap.get(entry.word);
  if (fallbackLesson) {
    return cloneLesson(fallbackLesson);
  }

  return {
    word: entry.word,
    phonetic: entry.phonetic || "",
    meaning: entry.meaning || "待補充",
    example: MANUAL_EXAMPLE_OVERRIDES[entry.word]?.example || entry.example || "",
    exampleTranslation: MANUAL_EXAMPLE_OVERRIDES[entry.word]?.exampleTranslation || entry.exampleTranslation || "",
    question: "",
    options: [],
    answer: ""
  };
}

function chunkLessons(lessons, chunkSize) {
  const chunks = [];

  for (let index = 0; index < lessons.length; index += chunkSize) {
    chunks.push(lessons.slice(index, index + chunkSize));
  }

  return chunks;
}

function getTargetTrainingWordCount(level = selectedVocabLevel) {
  const band = LEVEL_BAND_RANGES[level];

  if (!band) {
    return TARGET_LEVEL_WORD_COUNTS[level] ?? WORDS_PER_DAY;
  }

  return Math.max(band.end - band.start, WORDS_PER_DAY);
}

function getLevelCatalogWindow(level, allEntries) {
  const targetWordCount = getTargetTrainingWordCount(level);
  const startIndex = LEVEL_BAND_RANGES[level]?.start ?? 0;
  const safeStartIndex = Math.min(startIndex, Math.max(allEntries.length - WORDS_PER_DAY, 0));
  const desiredLength = Math.min(targetWordCount, allEntries.length - safeStartIndex);

  if (desiredLength > 0) {
    return allEntries.slice(safeStartIndex, safeStartIndex + desiredLength);
  }

  return allEntries.slice(0, Math.min(targetWordCount, allEntries.length));
}

function getLevelBandedEntries(level, allEntries) {
  if (!Array.isArray(allEntries) || !allEntries.length) {
    return [];
  }

  const band = LEVEL_BAND_RANGES[level];

  if (!band) {
    return allEntries.slice(0, Math.min(allEntries.length, WORDS_PER_DAY));
  }

  const safeStartIndex = Math.min(band.start, Math.max(allEntries.length - WORDS_PER_DAY, 0));
  const safeEndIndex = Math.min(band.end, allEntries.length);

  if (safeEndIndex > safeStartIndex) {
    return allEntries.slice(safeStartIndex, safeEndIndex);
  }

  return allEntries.slice(0, Math.min(allEntries.length, WORDS_PER_DAY));
}

function buildLessonStagesByLevel() {
  const flatLessons = sourceLessonStages.flat().map(cloneLesson);
  const lessonMap = new Map(flatLessons.map((lesson) => [lesson.word, lesson]));
  const externalWordEntries = Array.isArray(externalCatalog.words) ? externalCatalog.words : [];
  const externalWordMap = new Map(
    externalWordEntries
      .filter((entry) => entry && typeof entry.word === "string")
      .map((entry) => [entry.word, entry])
  );

  return Object.fromEntries(
    VOCAB_LEVELS.map((level) => {
      const catalogEntries = Array.isArray(externalCatalog.levels?.[level]) ? externalCatalog.levels[level] : [];
      const fallbackWindow = getLevelCatalogWindow(level, ORDERED_LEVEL_WORDS);
      const bandedCatalogEntries = getLevelBandedEntries(level, catalogEntries);
      const sourceEntries = bandedCatalogEntries.length ? bandedCatalogEntries : fallbackWindow;
      const resolvedEntries = sourceEntries
        .map((entry) => normalizeCatalogLesson(entry, lessonMap, externalWordMap))
        .filter(Boolean);
      const levelLessons = resolvedEntries.map((entry, index) => {
        if (Array.isArray(entry.options) && entry.options.length && typeof entry.answer === "string" && entry.question) {
          return cloneLesson(entry);
        }

        const distractorMeanings = resolvedEntries
          .slice(index + 1, index + 10)
          .map((item) => item.meaning)
          .concat(resolvedEntries.slice(Math.max(0, index - 10), index).map((item) => item.meaning));

        return createGeneratedLesson(entry, distractorMeanings);
      });
      const fallbackLessons = flatLessons.slice(0, WORDS_PER_DAY).map(cloneLesson);
      const dailyLessons = chunkLessons(levelLessons.length ? levelLessons : fallbackLessons, WORDS_PER_DAY);

      return [level, dailyLessons];
    })
  );
}

const progressCurrent = document.querySelector("#progress-current");
const progressTotal = document.querySelector("#progress-total");
const progressLabel = document.querySelector("#progress-label");
const libraryStatus = document.querySelector("#library-status");
const cardWord = document.querySelector("#card-word");
const cardPhonetic = document.querySelector("#card-phonetic");
const cardDetail = document.querySelector("#card-detail");
const cardExample = document.querySelector("#card-example");
const cardExampleTranslation = document.querySelector("#card-example-translation");
const flashcard = document.querySelector("#flashcard");
const exampleBox = document.querySelector(".example-box");
const nextButton = document.querySelector("#next-button");
const wordList = document.querySelector("#word-list");
const speakButton = document.querySelector("#speak-button");
const wordSlowButton = document.querySelector("#word-slow-button");
const sentenceSpeakButton = document.querySelector("#sentence-speak-button");
const sentenceSlowButton = document.querySelector("#sentence-slow-button");
const audioStatus = document.querySelector("#audio-status");
const masteredSummary = document.querySelector("#mastered-summary");
const completionPanel = document.querySelector("#completion-panel");
const completionText = document.querySelector("#completion-text");
const reviewButton = document.querySelector("#review-button");
const nextStageButton = document.querySelector("#next-stage-button");
const focusLevel = document.querySelector("#focus-level");
const levelButtons = Array.from(document.querySelectorAll(".level-btn"));

const lessonStagesByLevel = buildLessonStagesByLevel();

function createMasteredWordsByStage(stages) {
  return stages.map(() => new Set());
}

const progressByLevel = Object.fromEntries(
  VOCAB_LEVELS.map((level) => [
    level,
    {
      currentStageIndex: 0,
      currentIndex: 0,
      masteredWordsByStage: createMasteredWordsByStage(lessonStagesByLevel[level])
    }
  ])
);

let sentenceHighlightTimer = null;
let sentenceHighlightFallbackTimer = null;
let exampleWordElements = [];
let preferredEnglishVoice = null;
let speechSequenceToken = 0;

let selectedVocabLevel = VOCAB_LEVELS[0];
let currentStageIndex = 0;
let currentIndex = 0;
let currentLesson = lessonStagesByLevel[selectedVocabLevel][currentStageIndex][currentIndex];
let showingMeaning = true;

function getLessonStagesForLevel(level = selectedVocabLevel) {
  return lessonStagesByLevel[level];
}

function getProgressForLevel(level = selectedVocabLevel) {
  return progressByLevel[level];
}

function syncStateFromSelectedLevel() {
  const levelStages = getLessonStagesForLevel();
  const levelProgress = getProgressForLevel();

  currentStageIndex = Math.min(levelProgress.currentStageIndex, levelStages.length - 1);
  currentIndex = Math.min(levelProgress.currentIndex, levelStages[currentStageIndex].length - 1);
  levelProgress.currentStageIndex = currentStageIndex;
  levelProgress.currentIndex = currentIndex;
  currentLesson = levelStages[currentStageIndex][currentIndex];
}

function getCurrentLessons() {
  return getLessonStagesForLevel()[currentStageIndex];
}

function getCurrentMasteredWords() {
  return getProgressForLevel().masteredWordsByStage[currentStageIndex];
}

function getCurrentLevelWordCount() {
  return getLessonStagesForLevel().reduce((total, stage) => total + stage.length, 0);
}

function getRequiredDaysForLevel(level = selectedVocabLevel) {
  return Math.ceil(getTargetTrainingWordCount(level) / WORDS_PER_DAY);
}

function renderLibraryStatus() {
  const targetWordCount = getTargetTrainingWordCount(selectedVocabLevel);
  const availableWords = getCurrentLevelWordCount();
  const availableDays = getLessonStagesForLevel().length;
  const requiredDays = getRequiredDaysForLevel();
  const remainingWords = Math.max(targetWordCount - availableWords, 0);
  const bandStart = (LEVEL_BAND_RANGES[selectedVocabLevel]?.start ?? 0) + 1;
  const bandEnd = Math.min(LEVEL_BAND_RANGES[selectedVocabLevel]?.end ?? availableWords, (LEVEL_BAND_RANGES[selectedVocabLevel]?.start ?? 0) + availableWords);

  if (availableWords >= targetWordCount) {
    libraryStatus.textContent = `詞庫已就緒：目前會優先使用接近 ${selectedVocabLevel} 字程度、約第 ${bandStart} 到第 ${bandEnd} 個常用字，可支援 ${requiredDays} 天、每天 ${WORDS_PER_DAY} 字的不重複學習。`;
    libraryStatus.classList.add("is-ready");
    return;
  }

  libraryStatus.textContent = `詞庫不足：目前只能提供接近 ${selectedVocabLevel} 字程度、約第 ${bandStart} 到第 ${bandEnd} 個常用字，共 ${availableWords} 個字，可支援 ${availableDays} 天；距離 ${selectedVocabLevel} 字量還差 ${remainingWords} 個字。`;
  libraryStatus.classList.remove("is-ready");
}

function shuffleArray(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function setCurrentLesson(index) {
  currentIndex = index;
  getProgressForLevel().currentIndex = currentIndex;
  renderLesson(getCurrentLessons()[currentIndex]);
}

function renderVocabLevel() {
  focusLevel.textContent = `\u96E3\u5EA6\uFF1A\u63A5\u8FD1\u82F1\u6587\u5E38\u7528 ${selectedVocabLevel} \u5B57\u7A0B\u5EA6`;

  levelButtons.forEach((button) => {
    const isActive = Number(button.dataset.level) === selectedVocabLevel;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setVocabLevel(level) {
  if (!VOCAB_LEVELS.includes(level)) {
    return;
  }

  selectedVocabLevel = level;
  syncStateFromSelectedLevel();
  renderVocabLevel();
  renderLesson(currentLesson);
  saveProgress();
}

function getNextLessonIndex(startIndex = currentIndex) {
  const currentLessons = getCurrentLessons();
  const currentMasteredWords = getCurrentMasteredWords();

  for (let offset = 1; offset <= currentLessons.length; offset += 1) {
    const nextIndex = (startIndex + offset) % currentLessons.length;
    const nextWord = currentLessons[nextIndex].word;

    if (!currentMasteredWords.has(nextWord)) {
      return nextIndex;
    }
  }

  return (startIndex + 1) % currentLessons.length;
}

function saveProgress() {
  const data = {
    selectedVocabLevel,
    progressByLevel: Object.fromEntries(
      VOCAB_LEVELS.map((level) => [
        level,
        {
          currentStageIndex: progressByLevel[level].currentStageIndex,
          currentIndex: progressByLevel[level].currentIndex,
          masteredWordsByStage: progressByLevel[level].masteredWordsByStage.map((set) => Array.from(set))
        }
      ])
    )
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadProgress() {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return;
  }

  try {
    const data = JSON.parse(raw);

    if (VOCAB_LEVELS.includes(data.selectedVocabLevel)) {
      selectedVocabLevel = data.selectedVocabLevel;
    }

    if (data.progressByLevel && typeof data.progressByLevel === "object") {
      VOCAB_LEVELS.forEach((level) => {
        const savedLevel = data.progressByLevel[level];
        const levelStages = getLessonStagesForLevel(level);
        const levelProgress = getProgressForLevel(level);

        if (!savedLevel || typeof savedLevel !== "object") {
          return;
        }

        if (
          Number.isInteger(savedLevel.currentStageIndex) &&
          savedLevel.currentStageIndex >= 0 &&
          savedLevel.currentStageIndex < levelStages.length
        ) {
          levelProgress.currentStageIndex = savedLevel.currentStageIndex;
        }

        const currentStageLessons = levelStages[levelProgress.currentStageIndex];

        if (
          Number.isInteger(savedLevel.currentIndex) &&
          savedLevel.currentIndex >= 0 &&
          savedLevel.currentIndex < currentStageLessons.length
        ) {
          levelProgress.currentIndex = savedLevel.currentIndex;
        }

        if (Array.isArray(savedLevel.masteredWordsByStage)) {
          savedLevel.masteredWordsByStage.forEach((items, stageIndex) => {
            if (!Array.isArray(items) || !levelProgress.masteredWordsByStage[stageIndex]) {
              return;
            }

            items.forEach((word) => {
              levelProgress.masteredWordsByStage[stageIndex].add(word);
            });
          });
        }
      });
    } else if (Array.isArray(data.masteredWordsByStage)) {
      const currentLevelProgress = getProgressForLevel(selectedVocabLevel);
      const currentLevelStages = getLessonStagesForLevel(selectedVocabLevel);

      if (Number.isInteger(data.currentStageIndex) && data.currentStageIndex >= 0 && data.currentStageIndex < currentLevelStages.length) {
        currentLevelProgress.currentStageIndex = data.currentStageIndex;
      }

      const currentStageLessons = currentLevelStages[currentLevelProgress.currentStageIndex];

      if (Number.isInteger(data.currentIndex) && data.currentIndex >= 0 && data.currentIndex < currentStageLessons.length) {
        currentLevelProgress.currentIndex = data.currentIndex;
      }

      data.masteredWordsByStage.forEach((items, stageIndex) => {
        if (!Array.isArray(items) || !currentLevelProgress.masteredWordsByStage[stageIndex]) {
          return;
        }

        items.forEach((word) => {
          currentLevelProgress.masteredWordsByStage[stageIndex].add(word);
        });
      });
    }

    syncStateFromSelectedLevel();
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function renderLesson(lesson) {
  getProgressForLevel().currentStageIndex = currentStageIndex;
  getProgressForLevel().currentIndex = currentIndex;
  currentLesson = lesson;
  showingMeaning = true;
  const currentLessons = getCurrentLessons();
  const totalWords = getCurrentLevelWordCount();
  const totalDays = getLessonStagesForLevel().length;

  cardWord.textContent = lesson.word;
  cardPhonetic.textContent = lesson.phonetic;
  cardDetail.textContent = lesson.meaning;
  renderExampleText(lesson.example);
  cardExampleTranslation.textContent =
    lesson.exampleTranslation ||
    exampleTranslations[lesson.word] ||
    `這個單字的意思是：${lesson.meaning}`;
  audioStatus.textContent = "按下按鈕聽英文發音";
  progressCurrent.textContent = String(currentIndex + 1);
  progressTotal.textContent = String(currentLessons.length);
  progressLabel.textContent = `\u7B2C ${currentStageIndex + 1} \u5929\uFF0C\u4ECA\u5929\u8981\u5B78 ${currentLessons.length} \u500B\u55AE\u5B57\uFF08\u5171 ${totalDays} \u5929\uFF0C${totalWords} \u5B57\uFF09`;
  renderLibraryStatus();

  renderWordList();
  renderMasteredState();
  renderCompletionState();
  renderVocabLevel();
  saveProgress();
}

function renderExampleText(example) {
  clearSentenceHighlight();
  cardExample.innerHTML = "";
  const tokens = Array.from(example.matchAll(/\S+/g));
  const fragment = document.createDocumentFragment();

  exampleWordElements = tokens.map((match) => {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const span = document.createElement("span");

    span.className = "example-word";
    span.textContent = match[0];
    span.dataset.start = String(start);
    span.dataset.end = String(end);
    fragment.appendChild(span);
    return span;
  });

  cardExample.appendChild(fragment);
}

function clearSentenceHighlight() {
  if (sentenceHighlightTimer) {
    window.clearTimeout(sentenceHighlightTimer);
    sentenceHighlightTimer = null;
  }

  if (sentenceHighlightFallbackTimer) {
    window.clearInterval(sentenceHighlightFallbackTimer);
    sentenceHighlightFallbackTimer = null;
  }

  exampleWordElements.forEach((item) => {
    item.classList.remove("active");
  });
}

function activateExampleWord(targetIndex) {
  exampleWordElements.forEach((item) => item.classList.remove("active"));

  if (targetIndex >= 0 && targetIndex < exampleWordElements.length) {
    exampleWordElements[targetIndex].classList.add("active");
  }
}

function highlightWordByCharIndex(charIndex) {
  const foundIndex = exampleWordElements.findIndex((item) => {
    const start = Number(item.dataset.start);
    const end = Number(item.dataset.end);
    return charIndex >= start && charIndex < end;
  });

  if (foundIndex !== -1) {
    activateExampleWord(foundIndex);
  }
}

function startSentenceHighlightFallback(durationMs) {
  clearSentenceHighlight();

  if (!exampleWordElements.length) {
    return;
  }

  let currentWordIndex = 0;
  const stepMs = Math.max(220, Math.floor(durationMs / exampleWordElements.length));

  activateExampleWord(0);

  sentenceHighlightFallbackTimer = window.setInterval(() => {
    currentWordIndex += 1;

    if (currentWordIndex >= exampleWordElements.length) {
      clearSentenceHighlight();
      return;
    }

    activateExampleWord(currentWordIndex);
  }, stepMs);
}

function renderWordList() {
  wordList.innerHTML = "";
  const currentMasteredWords = getCurrentMasteredWords();
  const fragment = document.createDocumentFragment();

  getCurrentLessons().forEach((lesson, index) => {
    const button = document.createElement("button");
    button.type = "button";
    const classes = ["word-chip"];

    if (index === currentIndex) {
      classes.push("active");
    }

    if (currentMasteredWords.has(lesson.word)) {
      classes.push("mastered");
    }

    button.className = classes.join(" ");
    button.innerHTML = `<strong>${index + 1}. ${lesson.word}</strong><span>${lesson.meaning}</span>`;

    button.addEventListener("click", () => {
      setCurrentLesson(index);
    });

    fragment.appendChild(button);
  });

  wordList.appendChild(fragment);
}

function renderMasteredState() {
  const currentLessons = getCurrentLessons();
  const currentMasteredWords = getCurrentMasteredWords();

  masteredSummary.textContent = `第 ${currentStageIndex + 1} 階段已學會 ${currentMasteredWords.size} / ${currentLessons.length}`;
}

function renderCompletionState() {
  const currentMasteredWords = getCurrentMasteredWords();
  const isStageComplete = currentMasteredWords.size === getCurrentLessons().length;

  if (!isStageComplete) {
    completionPanel.classList.add("hidden");
    return;
  }

  completionPanel.classList.remove("hidden");

  if (currentStageIndex < getLessonStagesForLevel().length - 1) {
    completionText.textContent = `你已完成第 ${currentStageIndex + 1} 天的 ${getCurrentLessons().length} 個單字，可以繼續複習，或前往第 ${currentStageIndex + 2} 天。`;
    nextStageButton.hidden = false;
    nextStageButton.textContent = `前往第 ${currentStageIndex + 2} 天`;
  } else {
    completionText.textContent = `你已經完成目前詞庫的所有天數，可以繼續複習今天的 ${getCurrentLessons().length} 個單字。`;
    nextStageButton.hidden = true;
  }

  reviewButton.textContent = `重新複習第 ${currentStageIndex + 1} 天`;
}

function pickPreferredEnglishVoice() {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];

  if (!voices.length) {
    preferredEnglishVoice = null;
    return null;
  }

  preferredEnglishVoice =
    voices.find((voice) => /^en[-_]/i.test(voice.lang) && /Google|Samantha|Microsoft|English/i.test(voice.name)) ||
    voices.find((voice) => /^en[-_]/i.test(voice.lang)) ||
    voices[0];

  return preferredEnglishVoice;
}

function configureEnglishUtterance(utterance, rate) {
  const voice = preferredEnglishVoice ?? pickPreferredEnglishVoice();

  utterance.lang = voice?.lang || "en-US";
  utterance.voice = voice ?? null;
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
}

function resetSpeakingState() {
  flashcard.classList.remove("is-speaking");
  exampleBox.classList.remove("is-speaking");
  clearSentenceHighlight();
}

function cancelSpeechPlayback() {
  speechSequenceToken += 1;
  window.speechSynthesis.cancel();
  resetSpeakingState();
}

function speakSequence(parts, options) {
  if (!("speechSynthesis" in window)) {
    audioStatus.textContent = "你的瀏覽器目前不支援內建發音。";
    return;
  }

  const items = parts.filter(Boolean);

  if (!items.length) {
    return;
  }

  cancelSpeechPlayback();

  const sequenceToken = speechSequenceToken;
  const {
    rate,
    startMessage,
    endMessage,
    pauseMs = 180,
    onSequenceStart,
    onPartStart,
    onSequenceEnd,
    onError
  } = options;
  let currentPartIndex = 0;

  const speakNext = () => {
    if (sequenceToken !== speechSequenceToken) {
      return;
    }

    if (currentPartIndex >= items.length) {
      onSequenceEnd?.();
      audioStatus.textContent = endMessage;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(items[currentPartIndex]);
    configureEnglishUtterance(utterance, rate);

    utterance.onstart = () => {
      if (currentPartIndex === 0) {
        onSequenceStart?.();
        audioStatus.textContent = startMessage;
      }

      onPartStart?.(currentPartIndex);
    };

    utterance.onend = () => {
      if (sequenceToken !== speechSequenceToken) {
        return;
      }

      currentPartIndex += 1;
      window.setTimeout(speakNext, pauseMs);
    };

    utterance.onerror = () => {
      if (sequenceToken !== speechSequenceToken) {
        return;
      }

      onError?.();
    };

    window.speechSynthesis.speak(utterance);
  };

  speakNext();
}

function speakWord() {
  speakWordAtRate(1, `正在播放 ${currentLesson.word} 的發音`, "播放完成，請跟讀一次。");
}

function speakWordSlowly() {
  speakSequence([currentLesson.word, currentLesson.word], {
    rate: 0.55,
    startMessage: `正在慢速播放 ${currentLesson.word}`,
    endMessage: "慢速播放完成，請慢慢跟讀一次。",
    pauseMs: 320,
    onSequenceStart: () => {
      flashcard.classList.add("is-speaking");
      exampleBox.classList.remove("is-speaking");
    },
    onSequenceEnd: () => {
      flashcard.classList.remove("is-speaking");
    },
    onError: () => {
      flashcard.classList.remove("is-speaking");
      audioStatus.textContent = "慢速播放失敗，請再按一次試試看。";
    }
  });
}

function speakWordAtRate(rate, startMessage, endMessage) {
  if (!("speechSynthesis" in window)) {
    audioStatus.textContent = "你的瀏覽器目前不支援內建發音。";
    return;
  }

  cancelSpeechPlayback();

  const utterance = new SpeechSynthesisUtterance(currentLesson.word);
  configureEnglishUtterance(utterance, rate);

  utterance.onstart = () => {
    flashcard.classList.add("is-speaking");
    exampleBox.classList.remove("is-speaking");
    audioStatus.textContent = startMessage;
  };

  utterance.onend = () => {
    flashcard.classList.remove("is-speaking");
    audioStatus.textContent = endMessage;
  };

  utterance.onerror = () => {
    flashcard.classList.remove("is-speaking");
    audioStatus.textContent = "發音播放失敗，請再按一次試試看。";
  };

  window.speechSynthesis.speak(utterance);
}

function speakSentence() {
  speakSentenceAtRate(0.95, "正在播放例句發音", "例句播放完成，可以跟讀一次。");
}

function speakSentenceSlowly() {
  const sentenceParts = exampleWordElements.map((item) => item.textContent);

  speakSequence(sentenceParts, {
    rate: 0.72,
    startMessage: "正在慢速播放例句",
    endMessage: "慢速例句播放完成，可以慢慢跟讀一次。",
    pauseMs: 140,
    onSequenceStart: () => {
      exampleBox.classList.add("is-speaking");
      flashcard.classList.remove("is-speaking");
      clearSentenceHighlight();
    },
    onPartStart: (index) => {
      activateExampleWord(index);
    },
    onSequenceEnd: () => {
      exampleBox.classList.remove("is-speaking");
      clearSentenceHighlight();
    },
    onError: () => {
      exampleBox.classList.remove("is-speaking");
      clearSentenceHighlight();
      audioStatus.textContent = "慢速例句播放失敗，請再按一次試試看。";
    }
  });
}

function speakSentenceAtRate(rate, startMessage, endMessage) {
  if (!("speechSynthesis" in window)) {
    audioStatus.textContent = "你的瀏覽器目前不支援內建發音。";
    return;
  }

  cancelSpeechPlayback();

  const utterance = new SpeechSynthesisUtterance(currentLesson.example);
  configureEnglishUtterance(utterance, rate);
  let boundaryTriggered = false;

  utterance.onstart = () => {
    exampleBox.classList.add("is-speaking");
    flashcard.classList.remove("is-speaking");
    audioStatus.textContent = startMessage;
    sentenceHighlightTimer = window.setTimeout(() => {
      if (!boundaryTriggered) {
        startSentenceHighlightFallback(Math.max(1800, currentLesson.example.length * 90 / rate));
      }
    }, 180);
  };

  utterance.onboundary = (event) => {
    if (typeof event.charIndex !== "number") {
      return;
    }

    boundaryTriggered = true;

    if (sentenceHighlightTimer) {
      window.clearTimeout(sentenceHighlightTimer);
      sentenceHighlightTimer = null;
    }

    if (sentenceHighlightFallbackTimer) {
      window.clearInterval(sentenceHighlightFallbackTimer);
      sentenceHighlightFallbackTimer = null;
    }

    highlightWordByCharIndex(event.charIndex);
  };

  utterance.onend = () => {
    exampleBox.classList.remove("is-speaking");
    clearSentenceHighlight();
    audioStatus.textContent = endMessage;
  };

  utterance.onerror = () => {
    exampleBox.classList.remove("is-speaking");
    clearSentenceHighlight();
    audioStatus.textContent = "例句播放失敗，請再按一次試試看。";
  };

  window.speechSynthesis.speak(utterance);
}

flashcard.addEventListener("click", () => {
  showingMeaning = !showingMeaning;
  cardDetail.textContent = showingMeaning ? currentLesson.meaning : currentLesson.example;
});

nextButton.addEventListener("click", () => {
  getCurrentMasteredWords().add(currentLesson.word);
  setCurrentLesson(getNextLessonIndex());
});

speakButton.addEventListener("click", speakWord);
wordSlowButton.addEventListener("click", speakWordSlowly);
sentenceSpeakButton.addEventListener("click", speakSentence);
sentenceSlowButton.addEventListener("click", speakSentenceSlowly);

reviewButton.addEventListener("click", () => {
  setCurrentLesson(0);
});

nextStageButton.addEventListener("click", () => {
  if (currentStageIndex >= getLessonStagesForLevel().length - 1) {
    return;
  }

  currentStageIndex += 1;
  getProgressForLevel().currentStageIndex = currentStageIndex;
  setCurrentLesson(0);
});

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setVocabLevel(Number(button.dataset.level));
  });
});

loadProgress();
syncStateFromSelectedLevel();
renderLesson(currentLesson);

if ("speechSynthesis" in window) {
  pickPreferredEnglishVoice();
  window.speechSynthesis.addEventListener("voiceschanged", pickPreferredEnglishVoice);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Ignore service worker registration failures in unsupported environments.
    });
  });
}
