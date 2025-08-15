import akara from '../assets/akara.png';

const hausaAlphabet = [
  {
    letter: "A",
    pronunciation: "/a/",
    examples: [
      { word: "Āba", meaning: "Father", image: akara },
      { word: "Āya", meaning: "Mother", image: akara },
      { word: "Ābu", meaning: "Have/Exist", image: akara }
    ],
    practiceOptions: ["A", "E", "I"],
    culturalContext:
      'The vowel "A" is foundational in Hausa, appearing in many names, greetings, and fundamental words.'
  },
  {
    letter: "B",
    pronunciation: "/b/",
    examples: [
      { word: "Babba", meaning: "Big", image: akara },
      { word: "Bari", meaning: "Allow", image: akara },
      { word: "Bahaushe", meaning: "Hausa person", image: akara }
    ],
    practiceOptions: ["B", "D", "G"],
    culturalContext:
      'The consonant "B" appears widely, often indicating strength and presence in everyday language.'
  },
  {
    letter: "Ɓ",
    pronunciation: "/ɓ/",
    examples: [
      { word: "Ɓera", meaning: "Rat", image: akara },
      { word: "Ɓarka", meaning: "Blessing", image: akara },
      { word: "Ɓata", meaning: "Lose", image: akara }
    ],
    practiceOptions: ["Ɓ", "B", "D"],
    culturalContext:
      '“Ɓ” is an implosive consonant unique to Hausa and important for accurate pronunciation.'
  },
  {
    letter: "C",
    pronunciation: "/t͡ʃ/",
    examples: [
      { word: "Ciki", meaning: "Inside", image: akara },
      { word: "Cewa", meaning: "Say that", image: akara },
      { word: "Cin", meaning: "Buy/Eat", image: akara }
    ],
    practiceOptions: ["C", "K", "S"],
    culturalContext:
      'The "C" sound is retroflex like “ch” in English, common in verbs and prepositional phrases.'
  },
  {
    letter: "D",
    pronunciation: "/d/",
    examples: [
      { word: "Daɗi", meaning: "Pleasure", image: akara },
      { word: "Dadi", meaning: "Sweet", image: akara },
      { word: "Doki", meaning: "Horse", image: akara }
    ],
    practiceOptions: ["D", "T", "Ɗ"],
    culturalContext:
      '“D” is a strong consonant frequently used in descriptive verbs and nouns.'
  },
  {
    letter: "Ɗ",
    pronunciation: "/ɗ/",
    examples: [
      { word: "Ɗan", meaning: "Child", image: akara },
      { word: "Ɗaki", meaning: "Room", image: akara },
      { word: "Ɗanɗano", meaning: "Taste", image: akara }
    ],
    practiceOptions: ["Ɗ", "D", "T"],
    culturalContext:
      '“Ɗ” is a voiced implosive unique to Hausa—critical to pronunciation and meaning.'
  },
  {
    letter: "E",
    pronunciation: "/e/",
    examples: [
      { word: "Emi", meaning: "Me", image: akara },
      { word: "Evil", meaning: "Evil", image: akara },
      { word: "Era", meaning: "Harvest", image: akara }
    ],
    practiceOptions: ["E", "A", "I"],
    culturalContext:
      'The vowel "E" opens the mouth more than “I” and appears in key pronouns and verbs.'
  },
  {
    letter: "F",
    pronunciation: "/f/",
    examples: [
      { word: "Fada", meaning: "Die/Quarrel", image: akara },
      { word: "Fari", meaning: "White", image: akara },
      { word: "Fita", meaning: "Go out", image: akara }
    ],
    practiceOptions: ["F", "P", "V"],
    culturalContext:
      'The "F" consonant is common in descriptive words and daily verbs.'
  },
  {
    letter: "G",
    pronunciation: "/g/",
    examples: [
      { word: "Gida", meaning: "House", image: akara },
      { word: "Gari", meaning: "Town", image: akara },
      { word: "Girma", meaning: "Size/Respect", image: akara }
    ],
    practiceOptions: ["G", "K", "Ƙ"],
    culturalContext:
      '“G” is a hard consonant frequent in nouns and adjectives throughout Hausa.'
  },
  {
    letter: "H",
    pronunciation: "/h/",
    examples: [
      { word: "Hau", meaning: "Mount", image: akara },
      { word: "Hira", meaning: "Chat", image: akara },
      { word: "Hudu", meaning: "Four", image: akara }
    ],
    practiceOptions: ["H", "K", "J"],
    culturalContext:
      'The “H” consonant introduces breathiness in many verbs and number words.'
  },
  {
    letter: "I",
    pronunciation: "/i/",
    examples: [
      { word: "Ina", meaning: "Where", image: akara },
      { word: "Iya", meaning: "Ability", image: akara },
      { word: "Iko", meaning: "Power", image: akara }
    ],
    practiceOptions: ["I", "E", "Y"],
    culturalContext:
      'The high front vowel "I" is integral in questions and expressions of capability.'
  },
  {
    letter: "J",
    pronunciation: "/d͡ʒ/",
    examples: [
      { word: "Jiya", meaning: "Yesterday", image: akara },
      { word: "Jini", meaning: "Blood", image: akara },
      { word: "Jiyo", meaning: "A kind of tree", image: akara }
    ],
    practiceOptions: ["J", "G", "Y"],
    culturalContext:
      '“J” introduces action—used in verbs, time words, and bodily references.'
  },
  {
    letter: "K",
    pronunciation: "/k/",
    examples: [
      { word: "Kasa", meaning: "Land", image: akara },
      { word: "Karya", meaning: "Lie/Broken", image: akara },
      { word: "Kira", meaning: "Call", image: akara }
    ],
    practiceOptions: ["K", "Ƙ", "G"],
    culturalContext:
      '“K” is a plosive letter often used in strong verbs and nouns.'
  },
  {
    letter: "Ƙ",
    pronunciation: "/ƙ/",
    examples: [
      { word: "Ƙasa", meaning: "Ground", image: akara },
      { word: "Ƙoƙari", meaning: "Effort", image: akara },
      { word: "Ƙura", meaning: "Dust", image: akara }
    ],
    practiceOptions: ["Ƙ", "K", "G"],
    culturalContext:
      '“Ƙ” is an aspirated plosive unique to Hausa, essential for meaning differentiation.'
  },
  {
    letter: "L",
    pronunciation: "/l/",
    examples: [
      { word: "Lafiya", meaning: "Health", image: akara },
      { word: "Layi", meaning: "Line", image: akara },
      { word: "Lima", meaning: "Five", image: akara }
    ],
    practiceOptions: ["L", "R", "N"],
    culturalContext:
      '“L” is used in many nouns and is soft in pronunciation, common in counting and descriptions.'
  },
  {
    letter: "M",
    pronunciation: "/m/",
    examples: [
      { word: "Maci", meaning: "Beginning", image: akara },
      { word: "Mata", meaning: "Women", image: akara },
      { word: "Mikiya", meaning: "Watch/Guard", image: akara }
    ],
    practiceOptions: ["M", "N", "B"],
    culturalContext:
      'Nasal “M” is frequent in plural forms and nouns related to people and roles.'
  },
  {
    letter: "N",
    pronunciation: "/n/",
    examples: [
      { word: "Noma", meaning: "Farming", image: akara },
      { word: "Naira", meaning: "Currency", image: akara },
      { word: "Nufi", meaning: "Intend", image: akara }
    ],
    practiceOptions: ["N", "M", "R"],
    culturalContext:
      'The “N” consonant is nasal and fundamental in verbs, nouns, and semantics.'
  },
  {
    letter: "O",
    pronunciation: "/o/",
    examples: [
      { word: "Oshi", meaning: "Name", image: akara },
      { word: "Ona", meaning: "Mother", image: akara },
      { word: "Oro", meaning: "Money", image: akara }
    ],
    practiceOptions: ["O", "U", "Ƴ"],
    culturalContext:
      'The rounded vowel “O” appears in names and everyday objects.'
  },
  {
    letter: "R",
    pronunciation: "/r/",
    examples: [
      { word: "Rana", meaning: "Day", image: akara },
      { word: "Ruwa", meaning: "Water", image: akara },
      { word: "Roma", meaning: "Dominate", image: akara }
    ],
    practiceOptions: ["R", "L", "D"],
    culturalContext:
      '“R” adds a trilled sound, giving rhythm to speech in many nouns and verbs.'
  },
  {
    letter: "S",
    pronunciation: "/s/",
    examples: [
      { word: "Suna", meaning: "Name/They are called", image: akara },
      { word: "Sayi", meaning: "Buy", image: akara },
      { word: "Samu", meaning: "Get", image: akara }
    ],
    practiceOptions: ["S", "SH", "Z"],
    culturalContext:
      '“S” is sharp and prevalent in verbs and descriptive language.'
  },
  {
    letter: "SH",
    pronunciation: "/ʃ/",
    examples: [
      { word: "Shiga", meaning: "Enter", image: akara },
      { word: "Shanu", meaning: "Cattle", image: akara },
      { word: "Shayi", meaning: "Tea", image: akara }
    ],
    practiceOptions: ["SH", "S", "CH"],
    culturalContext:
      '“SH” is essential for accurate Hausa phonetics and appears in many verbs and nouns.'
  },
  {
    letter: "T",
    pronunciation: "/t/",
    examples: [
      { word: "Tashi", meaning: "Rise/Get up", image: akara },
      { word: "Tura", meaning: "Push", image: akara },
      { word: "Taka", meaning: "Walk", image: akara }
    ],
    practiceOptions: ["T", "Ɗ", "D"],
    culturalContext:
      '“T” is a crisp consonant found in imperative verbs and common speech.'
  },
  {
    letter: "TS",
    pronunciation: "/t͡s/",
    examples: [
      { word: "Tsafta", meaning: "Cleanliness", image: akara },
      { word: "Tsuntsu", meaning: "Bird", image: akara },
      { word: "Tsari", meaning: "Order", image: akara }
    ],
    practiceOptions: ["TS", "T", "S"],
    culturalContext:
      '“TS” is a unique affricate in Hausa, distinguishing meaning in nouns and adjectives.'
  },
  {
    letter: "U",
    pronunciation: "/u/",
    examples: [
      { word: "Uwargida", meaning: "First Lady", image: akara },
      { word: "Uba", meaning: "Father", image: akara },
      { word: "Uje", meaning: "Bring", image: akara }
    ],
    practiceOptions: ["U", "O", "I"],
    culturalContext:
      'The “U” vowel is less common but important in formal titles and commands.'
  },
  {
    letter: "W",
    pronunciation: "/w/",
    examples: [
      { word: "Wata", meaning: "Month/Moon", image: akara },
      { word: "Wasan", meaning: "Game", image: akara },
      { word: "Wuri", meaning: "Place", image: akara }
    ],
    practiceOptions: ["W", "Y", "V"],
    culturalContext:
      'The liquid “W” is fluid and common in nouns and expressions.'
  },
  {
    letter: "Y",
    pronunciation: "/j/",
    examples: [
      { word: "Yara", meaning: "Children", image: akara },
      { word: "Yini", meaning: "Yesterday", image: akara },
      { word: "Yanci", meaning: "Freedom", image: akara }
    ],
    practiceOptions: ["Y", "J", "I"],
    culturalContext:
      '“Y” softens pronunciation, often appearing in plurals and respectful terms.'
  },
  {
    letter: "Ƴ",
    pronunciation: "/ʔj/",
    examples: [
      { word: "Ƴaƴa", meaning: "Children", image: akara },
      { word: "Ƴaƙi", meaning: "Fight", image: akara },
      { word: "Ƴaƙi", meaning: "War", image: akara }
    ],
    practiceOptions: ["Ƴ", "Y", "J"],
    culturalContext:
      '“Ƴ” is a palatal consonant specific to Hausa, vital in respectful and cultural words.'
  },
  {
    letter: "Z",
    pronunciation: "/z/",
    examples: [
      { word: "Zama", meaning: "Sit/Become", image: akara },
      { word: "Zuci", meaning: "Heart", image: akara },
      { word: "Zafi", meaning: "Heat", image: akara }
    ],
    practiceOptions: ["Z", "S", "TS"],
    culturalContext:
      '“Z” is a buzzing consonant, often found in emotions and states of being.'
  }
];

export default hausaAlphabet;
