import akara from '../assets/akara.png';

const igboAlphabet = [
  {
    letter: "A",
    pronunciation: "/a/",
    examples: [
      { word: "Akwụkwọ", meaning: "Book", image: akara },
      { word: "Anụ", meaning: "Meat/Animal", image: akara },
      { word: "Ama", meaning: "Know/Compound", image: akara }
    ],
    practiceOptions: ["A", "E", "O"],
    culturalContext:
      'The vowel "A" is one of the most frequent sounds in Igbo, appearing in many verbs, nouns, and names.'
  },
  {
    letter: "B",
    pronunciation: "/b/",
    examples: [
      { word: "Bịa", meaning: "Come", image: akara },
      { word: "Bụ", meaning: "Be", image: akara },
      { word: "Banye", meaning: "Enter", image: akara }
    ],
    practiceOptions: ["B", "P", "V"],
    culturalContext:
      'The consonant "B" is strong and clear, often used in imperative verbs.'
  },
  {
    letter: "CH",
    pronunciation: "/t͡ʃ/",
    examples: [
      { word: "Chineke", meaning: "God", image: akara },
      { word: "Chọ", meaning: "Search/Want", image: akara },
      { word: "Chụ", meaning: "Chase", image: akara }
    ],
    practiceOptions: ["CH", "SH", "J"],
    culturalContext:
      '“CH” is common in Igbo and often found in spiritual, action, and descriptive words.'
  },
  {
    letter: "D",
    pronunciation: "/d/",
    examples: [
      { word: "Dị", meaning: "Be/Exist", image: akara },
      { word: "Dụ", meaning: "Guide", image: akara },
      { word: "Daba", meaning: "Fall", image: akara }
    ],
    practiceOptions: ["D", "T", "N"],
    culturalContext:
      'The consonant “D” is common in verbs, particularly those about states and actions.'
  },
  {
    letter: "E",
    pronunciation: "/e/",
    examples: [
      { word: "Eze", meaning: "King", image: akara },
      { word: "Eme", meaning: "Do", image: akara },
      { word: "Ebe", meaning: "Place", image: akara }
    ],
    practiceOptions: ["E", "I", "A"],
    culturalContext:
      'The vowel "E" is essential for forming both singular and plural words in Igbo.'
  },
  {
    letter: "F",
    pronunciation: "/f/",
    examples: [
      { word: "Fụ", meaning: "See", image: akara },
      { word: "Fesa", meaning: "Scatter", image: akara },
      { word: "Fesa mmiri", meaning: "Sprinkle water", image: akara }
    ],
    practiceOptions: ["F", "V", "PH"],
    culturalContext:
      '“F” is less common than in English but still used in verbs and descriptive phrases.'
  },
  {
    letter: "G",
    pronunciation: "/g/",
    examples: [
      { word: "Gaa", meaning: "Go", image: akara },
      { word: "Gụọ", meaning: "Read/Count", image: akara },
      { word: "Gwa", meaning: "Tell", image: akara }
    ],
    practiceOptions: ["G", "K", "GW"],
    culturalContext:
      'The consonant "G" is a hard sound that begins many action verbs in Igbo.'
  },
  {
    letter: "GB",
    pronunciation: "/ɡ͡b/",
    examples: [
      { word: "Gburu", meaning: "Kill", image: akara },
      { word: "Gbaa", meaning: "Run/Shoot", image: akara },
      { word: "Gbachie", meaning: "Close", image: akara }
    ],
    practiceOptions: ["GB", "G", "B"],
    culturalContext:
      '“GB” is a labial-velar stop unique to Igbo, crucial for authentic pronunciation.'
  },
  {
    letter: "GH",
    pronunciation: "/ɣ/",
    examples: [
      { word: "Ghaa", meaning: "Return", image: akara },
      { word: "Gharịa", meaning: "Repeat", image: akara },
      { word: "Ghọta", meaning: "Understand", image: akara }
    ],
    practiceOptions: ["GH", "G", "H"],
    culturalContext:
      '“GH” produces a voiced fricative, a distinct sound in Igbo speech.'
  },
  {
    letter: "GW",
    pronunciation: "/ɡʷ/",
    examples: [
      { word: "Gwuo", meaning: "Play", image: akara },
      { word: "Gwu", meaning: "Dig", image: akara },
      { word: "Gwụ", meaning: "Finish", image: akara }
    ],
    practiceOptions: ["GW", "G", "W"],
    culturalContext:
      '“GW” is another labial-velar sound, common in verbs of action.'
  },
  {
    letter: "H",
    pronunciation: "/h/",
    examples: [
      { word: "Hụ", meaning: "See", image: akara },
      { word: "Hapụ", meaning: "Leave", image: akara },
      { word: "Hapụla", meaning: "Abandon", image: akara }
    ],
    practiceOptions: ["H", "GH", "CH"],
    culturalContext:
      'The “H” sound is used in verbs and commands to show breathiness.'
  },
  {
    letter: "I",
    pronunciation: "/i/",
    examples: [
      { word: "Ihe", meaning: "Thing", image: akara },
      { word: "Ije", meaning: "Journey", image: akara },
      { word: "Ịlụ", meaning: "Marry", image: akara }
    ],
    practiceOptions: ["I", "E", "Ị"],
    culturalContext:
      '“I” is a high front vowel essential in nouns and verbs.'
  },
  {
    letter: "Ị",
    pronunciation: "/ɪ/",
    examples: [
      { word: "Ịrị", meaning: "Climb", image: akara },
      { word: "Ịsa", meaning: "Wash", image: akara },
      { word: "Ịkpọ", meaning: "Call", image: akara }
    ],
    practiceOptions: ["Ị", "I", "E"],
    culturalContext:
      '“Ị” is a slightly lower, centralised vowel sound unique to Igbo.'
  },
  {
    letter: "J",
    pronunciation: "/d͡ʒ/",
    examples: [
      { word: "Jiri", meaning: "Use", image: akara },
      { word: "Jụọ", meaning: "Ask", image: akara },
      { word: "Jee", meaning: "Go", image: akara }
    ],
    practiceOptions: ["J", "CH", "Z"],
    culturalContext:
      '“J” is common in verbs and action words.'
  },
  {
    letter: "K",
    pronunciation: "/k/",
    examples: [
      { word: "Kpọ", meaning: "Call", image: akara },
      { word: "Kwụ", meaning: "Stop/Stand", image: akara },
      { word: "Kpọọ", meaning: "Name", image: akara }
    ],
    practiceOptions: ["K", "C", "Q"],
    culturalContext:
      'The consonant "K" is hard and often used in commands and descriptive terms.'
  },
  {
    letter: "KP",
    pronunciation: "/k͡p/",
    examples: [
      { word: "Kpọ", meaning: "Call", image: akara },
      { word: "Kpụ", meaning: "Carve", image: akara },
      { word: "Kpọọ", meaning: "Name", image: akara }
    ],
    practiceOptions: ["KP", "K", "P"],
    culturalContext:
      '“KP” is a labial-velar stop unique to Igbo, essential for authentic pronunciation.'
  },
  {
    letter: "KW",
    pronunciation: "/kʷ/",
    examples: [
      { word: "Kwụ", meaning: "Stand", image: akara },
      { word: "Kwụsị", meaning: "Stop", image: akara },
      { word: "Kwụpụ", meaning: "Remove", image: akara }
    ],
    practiceOptions: ["KW", "K", "W"],
    culturalContext:
      '“KW” is another labial-velar consonant, frequent in verbs of motion.'
  },
  {
    letter: "L",
    pronunciation: "/l/",
    examples: [
      { word: "Lụọ", meaning: "Marry", image: akara },
      { word: "Leta", meaning: "Visit", image: akara },
      { word: "Le", meaning: "Look", image: akara }
    ],
    practiceOptions: ["L", "R", "N"],
    culturalContext:
      'The “L” consonant is soft and common in polite or descriptive terms.'
  },
  {
    letter: "M",
    pronunciation: "/m/",
    examples: [
      { word: "Mee", meaning: "Do", image: akara },
      { word: "Mụọ", meaning: "Give birth/Learn", image: akara },
      { word: "Mụta", meaning: "Learn", image: akara }
    ],
    practiceOptions: ["M", "N", "B"],
    culturalContext:
      'The nasal “M” appears frequently in pronouns, verbs, and nouns.'
  },
  {
    letter: "N",
    pronunciation: "/n/",
    examples: [
      { word: "Na", meaning: "And/With", image: akara },
      { word: "Nye", meaning: "Give", image: akara },
      { word: "Nọ", meaning: "Stay", image: akara }
    ],
    practiceOptions: ["N", "M", "L"],
    culturalContext:
      'The nasal “N” is fundamental in Igbo sentence structure.'
  },
  {
    letter: "NW",
    pronunciation: "/nʷ/",
    examples: [
      { word: "Nwa", meaning: "Child", image: akara },
      { word: "Nwoke", meaning: "Man", image: akara },
      { word: "Nwanyi", meaning: "Woman", image: akara }
    ],
    practiceOptions: ["NW", "N", "W"],
    culturalContext:
      '“NW” is a labialised nasal, common in words about people and relationships.'
  },
  {
    letter: "NY",
    pronunciation: "/ɲ/",
    examples: [
      { word: "Nye", meaning: "Give", image: akara },
      { word: "Nya", meaning: "Him/Her", image: akara },
      { word: "Nyere", meaning: "Help", image: akara }
    ],
    practiceOptions: ["NY", "N", "Y"],
    culturalContext:
      '“NY” is a palatal nasal, frequent in pronouns and giving verbs.'
  },
  {
    letter: "O",
    pronunciation: "/o/",
    examples: [
      { word: "Ọkụ", meaning: "Fire", image: akara },
      { word: "Oge", meaning: "Time", image: akara },
      { word: "Ọsọ", meaning: "Speed", image: akara }
    ],
    practiceOptions: ["O", "Ọ", "U"],
    culturalContext:
      'The vowel “O” is common in nouns, often denoting natural elements.'
  },
  {
    letter: "Ọ",
    pronunciation: "/ɔ/",
    examples: [
      { word: "Ọtụtụ", meaning: "Many", image: akara },
      { word: "Ọkụ", meaning: "Fire", image: akara },
      { word: "Ọcha", meaning: "White", image: akara }
    ],
    practiceOptions: ["Ọ", "O", "U"],
    culturalContext:
      '“Ọ” is an open-mid back rounded vowel unique to Igbo.'
  },
  {
    letter: "P",
    pronunciation: "/p/",
    examples: [
      { word: "Pịa", meaning: "Press", image: akara },
      { word: "Pụọ", meaning: "Leave", image: akara },
      { word: "Pụta", meaning: "Come out", image: akara }
    ],
    practiceOptions: ["P", "B", "F"],
    culturalContext:
      '“P” is sharp and often used in commands.'
  },
  {
    letter: "R",
    pronunciation: "/ɾ/",
    examples: [
      { word: "Rie", meaning: "Eat", image: akara },
      { word: "Ruo", meaning: "Reach", image: akara },
      { word: "Rapu", meaning: "Leave", image: akara }
    ],
    practiceOptions: ["R", "L", "D"],
    culturalContext:
      '“R” is a tap or flap, softer than in English, and common in verbs.'
  },
  {
    letter: "S",
    pronunciation: "/s/",
    examples: [
      { word: "Sọ", meaning: "Tell", image: akara },
      { word: "Sụ", meaning: "Speak", image: akara },
      { word: "Sere", meaning: "Paint", image: akara }
    ],
    practiceOptions: ["S", "SH", "Z"],
    culturalContext:
      '“S” is crisp and used in speech-related and descriptive words.'
  },
  {
    letter: "SH",
    pronunciation: "/ʃ/",
    examples: [
      { word: "Sha", meaning: "Drink", image: akara },
      { word: "She", meaning: "She (loan)", image: akara },
      { word: "Shọ", meaning: "Show (loan)", image: akara }
    ],
    practiceOptions: ["SH", "S", "CH"],
    culturalContext:
      '“SH” is mainly from loanwords but used in modern Igbo speech.'
  },
  {
    letter: "T",
    pronunciation: "/t/",
    examples: [
      { word: "Tụọ", meaning: "Throw", image: akara },
      { word: "Tinye", meaning: "Put inside", image: akara },
      { word: "Tụọ ọnụ", meaning: "Count", image: akara }
    ],
    practiceOptions: ["T", "D", "N"],
    culturalContext:
      '“T” is a crisp sound used in many imperative verbs.'
  },
  {
    letter: "U",
    pronunciation: "/u/",
    examples: [
      { word: "Ụlọ", meaning: "House", image: akara },
      { word: "Ụtụtụ", meaning: "Morning", image: akara },
      { word: "Ụzọ", meaning: "Road", image: akara }
    ],
    practiceOptions: ["U", "Ụ", "O"],
    culturalContext:
      'The vowel “U” appears in common nouns, especially about places and time.'
  },
  {
    letter: "Ụ",
    pronunciation: "/ʊ/",
    examples: [
      { word: "Ụzọ", meaning: "Road", image: akara },
      { word: "Ụmụ", meaning: "Children", image: akara },
      { word: "Ụwa", meaning: "World", image: akara }
    ],
    practiceOptions: ["Ụ", "U", "O"],
    culturalContext:
      '“Ụ” is a close back rounded vowel unique to Igbo.'
  },
  {
    letter: "V",
    pronunciation: "/v/",
    examples: [
      { word: "Veta", meaning: "Answer", image: akara },
      { word: "Vọta", meaning: "Select", image: akara },
      { word: "Vụrụ", meaning: "Carried", image: akara }
    ],
    practiceOptions: ["V", "B", "F"],
    culturalContext:
      '“V” is less frequent but common in loanwords and modern Igbo.'
  },
  {
    letter: "W",
    pronunciation: "/w/",
    examples: [
      { word: "Weta", meaning: "Bring", image: akara },
      { word: "Wulite", meaning: "Build", image: akara },
      { word: "Were", meaning: "Take", image: akara }
    ],
    practiceOptions: ["W", "V", "U"],
    culturalContext:
      '“W” is a glide sound used in verbs of action.'
  },
  {
    letter: "Y",
    pronunciation: "/j/",
    examples: [
      { word: "Yiri", meaning: "Wear", image: akara },
      { word: "Yie", meaning: "Wear/Put on", image: akara },
      { word: "Yiri akwa", meaning: "Wear clothes", image: akara }
    ],
    practiceOptions: ["Y", "I", "J"],
    culturalContext:
      '“Y” is a palatal glide common in descriptive and action verbs.'
  },
  {
    letter: "Z",
    pronunciation: "/z/",
    examples: [
      { word: "Zụta", meaning: "Buy", image: akara },
      { word: "Ziga", meaning: "Send", image: akara },
      { word: "Zọ", meaning: "Avoid", image: akara }
    ],
    practiceOptions: ["Z", "S", "J"],
    culturalContext:
      '“Z” is a buzzing consonant, often found in transactional and directional verbs.'
  }
];

export default igboAlphabet;
