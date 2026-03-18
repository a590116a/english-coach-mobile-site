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
  const matchedScenario = MEANING_SCENARIO_BUILDERS.find((scenario) => scenario.pattern.test(primaryMeaning));

  return matchedScenario ? matchedScenario.build(word, primaryMeaning) : null;
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

  return {
    word: entry.word,
    phonetic: entry.phonetic || "",
    meaning: correctMeaning,
    example: entry.example || generatedExample.example || createGeneratedExample(entry.word),
    exampleTranslation: entry.exampleTranslation || generatedExample.exampleTranslation || createGeneratedExampleTranslation(entry.word, correctMeaning),
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
    return externalWord ? { ...externalWord } : null;
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
    example: entry.example || "",
    exampleTranslation: entry.exampleTranslation || "",
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

function speakWord() {
  speakWordAtRate(1, `正在播放 ${currentLesson.word} 的發音`, "播放完成，請跟讀一次。");
}

function speakWordSlowly() {
  speakWordAtRate(0.45, `正在慢速播放 ${currentLesson.word}`, "慢速播放完成，請慢慢跟讀一次。");
}

function speakWordAtRate(rate, startMessage, endMessage) {
  if (!("speechSynthesis" in window)) {
    audioStatus.textContent = "你的瀏覽器目前不支援內建發音。";
    return;
  }

  window.speechSynthesis.cancel();

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
  speakSentenceAtRate(0.55, "正在慢速播放例句", "慢速例句播放完成，可以慢慢跟讀一次。");
}

function speakSentenceAtRate(rate, startMessage, endMessage) {
  if (!("speechSynthesis" in window)) {
    audioStatus.textContent = "你的瀏覽器目前不支援內建發音。";
    return;
  }

  window.speechSynthesis.cancel();

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
