import akara from '../assets/akara.png';
import father from '../assets/images/hausa/father.png'
import mother from '../assets/images/hausa/mother.png'
import food from '../assets/images/hausa/bibimbap.png'
import big from '../assets/images/hausa/think.png'
import motorcycle from '../assets/images/hausa/motorbike.png'
import rat from '../assets/images/hausa/rat.png'
import bless from '../assets/images/hausa/open-hands.png'
import bow from '../assets/images/hausa/bow-and-arrow.png'
import inside from '../assets/images/hausa/home.png'
import speak from '../assets/images/hausa/speak.png'
import eat from '../assets/images/hausa/vegetarian.png'
import head from '../assets/images/hausa/head.png'
import sweet from '../assets/images/hausa/sweets.png'
import horse from '../assets/images/hausa/horse.png'
import child from '../assets/images/hausa/playtime.png'
import room from '../assets/images/hausa/room.png'
import taste from '../assets/images/hausa/mouth.png'
import me from '../assets/images/hausa/user.png'
import harvest from '../assets/images/hausa/harvest.png'
import devil from '../assets/images/hausa/devil.png'
import feud from '../assets/images/hausa/feud.png'
import out from '../assets/images/hausa/go-out.png'
import white from '../assets/images/hausa/white.png'
import house from '../assets/images/hausa/house.png'
import town from '../assets/images/hausa/village.png'
import respect from '../assets/images/hausa/respect.png'
import mount from '../assets/images/hausa/mountain.png'
import chat from '../assets/images/hausa/chat.png'
import number from '../assets/images/hausa/number.png'
import power from '../assets/images/hausa/empowerment.png'
import where from '../assets/images/hausa/find.png'
import ability from '../assets/images/hausa/abilities.png'
import girl from '../assets/images/hausa/woman.png'
import blood from '../assets/images/hausa/blood.png'
import tree from '../assets/images/hausa/tree.png'
import land from '../assets/images/hausa/land.png'
import ring from '../assets/images/hausa/phone.png'
import broken from '../assets/images/hausa/glasses-insurance.png'
import dust from '../assets/images/hausa/dust.png'
import effort from '../assets/images/hausa/effort.png'
import line from '../assets/images/hausa/minus.png'
import health from '../assets/images/hausa/health-care.png'
import five from '../assets/images/hausa/number-5.png'
import begin from '../assets/images/hausa/complete.png'
import guard from '../assets/images/hausa/security.png'
import intend from '../assets/images/hausa/select.png'
import farm from '../assets/images/hausa/chemical.png'
import currency from '../assets/images/hausa/naira.png'
import day from '../assets/images/hausa/day-mode.png'
import water from '../assets/images/hausa/water-tap.png'
import dominate from '../assets/images/hausa/people.png'
import cattle from '../assets/images/hausa/cow.png'
import get from '../assets/images/hausa/payment-method.png'
import tea from '../assets/images/hausa/herbal-tea.png'
import walk from '../assets/images/hausa/walk.png'
import rise from '../assets/images/hausa/support.png'
import clean from '../assets/images/hausa/cleaning.png'
import bird from '../assets/images/hausa/dove.png'
import order from '../assets/images/hausa/checkout.png'
import bring from '../assets/images/hausa/bring.png'
import game from '../assets/images/hausa/game-console.png'
import moon from '../assets/images/hausa/moon.png'
import fight from '../assets/images/hausa/man.png'
import heart from '../assets/images/hausa/heart.png'
import fire from '../assets/images/hausa/fire.png'
import seat from '../assets/images/hausa/computer-worker.png'




const hausaAlphabet = [
  {
    letter: "A",
    pronunciation: "/a/",
    examples: [
      { word: "Āba", meaning: "Father", image: father },
      { word: "Āya", meaning: "Mother", image: mother },
      { word: "Àbìncì", meaning: "Have/Exist", image: food }
    ],
    practiceOptions: ["A", "E", "I"],
    culturalContext:
      'The vowel "A" is foundational in Hausa, appearing in many names, greetings, and fundamental words.'
  },
  {
    letter: "B",
    pronunciation: "/b/",
    examples: [
      { word: "Babba", meaning: "Big", image: big },
      { word: "Bàbùr", meaning: "Motorcycle", image: motorcycle },
      { word: "Bahaushe", meaning: "Hausa person", image: father }
    ],
    practiceOptions: ["B", "D", "G"],
    culturalContext:
      'The consonant "B" appears widely, often indicating strength and presence in everyday language.'
  },
  {
    letter: "Ɓ",
    pronunciation: "/ɓ/",
    examples: [
      { word: "Ɓera", meaning: "Rat", image: rat }, 
      { word: "Ɓarka", meaning: "Blessing", image: bless },
      { word: "Bàkà", meaning: "Bow (weapon)", image: bow }
    ],
    practiceOptions: ["Ɓ", "B", "D"],
    culturalContext:
      '“Ɓ” is an implosive consonant unique to Hausa and important for accurate pronunciation.'
  },
  {
    letter: "C",
    pronunciation: "/t͡ʃ/",
    examples: [
      { word: "Ciki", meaning: "Inside", image: inside   },
      { word: "Cewa", meaning: "Say that", image: speak },
      { word: "Cin", meaning: "Buy/Eat", image: eat }
    ],
    practiceOptions: ["C", "K", "S"],
    culturalContext:
      'The "C" sound is retroflex like “ch” in English, common in verbs and prepositional phrases.'
  },
  {
    letter: "D",
    pronunciation: "/d/",
    examples: [
      { word: "Daɗi", meaning: "Pleasure", image: head },
      { word: "Dadi", meaning: "Sweet", image: sweet },
      { word: "Doki", meaning: "Horse", image: horse }
    ],
    practiceOptions: ["D", "T", "Ɗ"],
    culturalContext:
      '“D” is a strong consonant frequently used in descriptive verbs and nouns.'
  },
  {
    letter: "Ɗ",
    pronunciation: "/ɗ/",
    examples: [
      { word: "Ɗan", meaning: "Child", image: child },
      { word: "Ɗaki", meaning: "Room", image: room },
      { word: "Ɗanɗano", meaning: "Taste", image: taste }
    ],
    practiceOptions: ["Ɗ", "D", "T"],
    culturalContext:
      '“Ɗ” is a voiced implosive unique to Hausa—critical to pronunciation and meaning.'
  },
  {
    letter: "E",
    pronunciation: "/e/",
    examples: [
      { word: "Emi", meaning: "Me", image: me },
      { word: "Evil", meaning: "Evil", image: devil },
      { word: "Era", meaning: "Harvest", image: harvest }
    ],
    practiceOptions: ["E", "A", "I"],
    culturalContext:
      'The vowel "E" opens the mouth more than “I” and appears in key pronouns and verbs.'
  },
  {
    letter: "F",
    pronunciation: "/f/",
    examples: [
      { word: "Fada", meaning: "Die/Quarrel", image: feud },
      { word: "Fari", meaning: "White", image: white },
      { word: "Fita", meaning: "Go out", image: out }
    ],
    practiceOptions: ["F", "P", "V"],
    culturalContext:
      'The "F" consonant is common in descriptive words and daily verbs.'
  },
  {
    letter: "G",
    pronunciation: "/g/",
    examples: [
      { word: "Gida", meaning: "House", image: house },
      { word: "Gari", meaning: "Town", image: town },
      { word: "Girma", meaning: "Size/Respect", image: respect }
    ],
    practiceOptions: ["G", "K", "Ƙ"],
    culturalContext:
      '“G” is a hard consonant frequent in nouns and adjectives throughout Hausa.'
  },
  {
    letter: "H",
    pronunciation: "/h/",
    examples: [
      { word: "Hau", meaning: "Mount", image: mount },
      { word: "Hira", meaning: "Chat", image: chat },
      { word: "Hudu", meaning: "Four", image: number }
    ],
    practiceOptions: ["H", "K", "J"],
    culturalContext:
      'The “H” consonant introduces breathiness in many verbs and number words.'
  },
  {
    letter: "I",
    pronunciation: "/i/",
    examples: [
      { word: "Ina", meaning: "Where", image: where },
      { word: "Iya", meaning: "Ability", image: ability },
      { word: "Iko", meaning: "Power", image: power }
    ],
    practiceOptions: ["I", "E", "Y"],
    culturalContext:
      'The high front vowel "I" is integral in questions and expressions of capability.'
  },
  {
    letter: "J",
    pronunciation: "/d͡ʒ/",
    examples: [
      { word: "Jìyàrà", meaning: "Young girl", image: girl },
      { word: "Jini", meaning: "Blood", image: blood },
      { word: "Jiyo", meaning: "Tree", image: tree }
    ],
    practiceOptions: ["J", "G", "Y"],
    culturalContext:
      '“J” introduces action—used in verbs, time words, and bodily references.'
  },
  {
    letter: "K",
    pronunciation: "/k/",
    examples: [
      { word: "Kasa", meaning: "Land", image: land },
      { word: "Karya", meaning: "Lie/Broken", image: broken },
      { word: "Kira", meaning: "Call", image: ring }
    ],
    practiceOptions: ["K", "Ƙ", "G"],
    culturalContext:
      '“K” is a plosive letter often used in strong verbs and nouns.'
  },
  {
    letter: "Ƙ",
    pronunciation: "/ƙ/",
    examples: [
      { word: "Ƙasa", meaning: "Ground", image: land },
      { word: "Ƙoƙari", meaning: "Effort", image: effort },
      { word: "Ƙura", meaning: "Dust", image: dust }
    ],
    practiceOptions: ["Ƙ", "K", "G"],
    culturalContext:
      '“Ƙ” is an aspirated plosive unique to Hausa, essential for meaning differentiation.'
  },
  {
    letter: "L",
    pronunciation: "/l/",
    examples: [
      { word: "Lafiya", meaning: "Health", image: health },
      { word: "Layi", meaning: "Line", image: line },
      { word: "Lima", meaning: "Five", image: five }
    ],
    practiceOptions: ["L", "R", "N"],
    culturalContext:
      '“L” is used in many nouns and is soft in pronunciation, common in counting and descriptions.'
  },
  {
    letter: "M",
    pronunciation: "/m/",
    examples: [
      { word: "Maci", meaning: "Beginning", image: begin },
      { word: "Mata", meaning: "Women", image: mother },
      { word: "Mikiya", meaning: "Watch/Guard", image: guard }
    ],
    practiceOptions: ["M", "N", "B"],
    culturalContext:
      'Nasal “M” is frequent in plural forms and nouns related to people and roles.'
  },
  {
    letter: "N",
    pronunciation: "/n/",
    examples: [
      { word: "Noma", meaning: "Farming", image: farm },
      { word: "Naira", meaning: "Currency", image: currency },
      { word: "Nufi", meaning: "Intend", image: intend }
    ],
    practiceOptions: ["N", "M", "R"],
    culturalContext:
      'The “N” consonant is nasal and fundamental in verbs, nouns, and semantics.'
  },
  {
    letter: "O",
    pronunciation: "/o/",
    examples: [
      { word: "Oshi", meaning: "Name", image: me },
      { word: "Ona", meaning: "Mother", image: mother },
      { word: "Oro", meaning: "Money", image: currency }
    ],
    practiceOptions: ["O", "U", "Ƴ"],
    culturalContext:
      'The rounded vowel “O” appears in names and everyday objects.'
  },
  {
    letter: "R",
    pronunciation: "/r/",
    examples: [
      { word: "Rana", meaning: "Day", image: day },
      { word: "Ruwa", meaning: "Water", image: water },
      { word: "Roma", meaning: "Dominate", image: dominate }
    ],
    practiceOptions: ["R", "L", "D"],
    culturalContext:
      '“R” adds a trilled sound, giving rhythm to speech in many nouns and verbs.'
  },
  {
    letter: "S",
    pronunciation: "/s/",
    examples: [
      { word: "Suna", meaning: "Name/They are called", image: me },
      { word: "Sayi", meaning: "Buy", image: get },
      { word: "Samu", meaning: "Get", image: get }
    ],
    practiceOptions: ["S", "SH", "Z"],
    culturalContext:
      '“S” is sharp and prevalent in verbs and descriptive language.'
  },
  {
    letter: "SH",
    pronunciation: "/ʃ/",
    examples: [
      { word: "Shiga", meaning: "Enter", image: inside },
      { word: "Shanu", meaning: "Cattle", image: cattle },
      { word: "Shayi", meaning: "Tea", image: tea }
    ],
    practiceOptions: ["SH", "S", "CH"],
    culturalContext:
      '“SH” is essential for accurate Hausa phonetics and appears in many verbs and nouns.'
  },
  {
    letter: "T",
    pronunciation: "/t/",
    examples: [
      { word: "Tashi", meaning: "Rise/Get up", image: rise },
      { word: "Tura", meaning: "Push", image: effort },
      { word: "Taka", meaning: "Walk", image: walk }
    ],
    practiceOptions: ["T", "Ɗ", "D"],
    culturalContext:
      '“T” is a crisp consonant found in imperative verbs and common speech.'
  },
  {
    letter: "TS",
    pronunciation: "/t͡s/",
    examples: [
      { word: "Tsafta", meaning: "Cleanliness", image: clean },
      { word: "Tsuntsu", meaning: "Bird", image: bird },
      { word: "Tsari", meaning: "Order", image: order }
    ],
    practiceOptions: ["TS", "T", "S"],
    culturalContext:
      '“TS” is a unique affricate in Hausa, distinguishing meaning in nouns and adjectives.'
  },
  {
    letter: "U",
    pronunciation: "/u/",
    examples: [
      { word: "Uwargida", meaning: "First Lady", image: girl },
      { word: "Uba", meaning: "Father", image: father },
      { word: "Uje", meaning: "Bring", image: bring }
    ],
    practiceOptions: ["U", "O", "I"],
    culturalContext:
      'The “U” vowel is less common but important in formal titles and commands.'
  },
  {
    letter: "W",
    pronunciation: "/w/",
    examples: [
      { word: "Wata", meaning: "Month/Moon", image: moon },
      { word: "Wasan", meaning: "Game", image: game },
      { word: "Wuri", meaning: "Place", image: house }
    ],
    practiceOptions: ["W", "Y", "V"],
    culturalContext:
      'The liquid “W” is fluid and common in nouns and expressions.'
  },
  {
    letter: "Y",
    pronunciation: "/j/",
    examples: [
      { word: "Yara", meaning: "Children", image: child },
      { word: "Yini", meaning: "Yesterday", image: akara },
      { word: "Yanci", meaning: "Freedom", image: bird }
    ],
    practiceOptions: ["Y", "J", "I"],
    culturalContext:
      '“Y” softens pronunciation, often appearing in plurals and respectful terms.'
  },
  {
    letter: "Ƴ",
    pronunciation: "/ʔj/",
    examples: [
      { word: "Ƴaƴa", meaning: "Children", image: child },
      { word: "Ƴaƙi", meaning: "Fight", image: fight },
      { word: "Ƴaƙi", meaning: "War", image: fight }
    ],
    practiceOptions: ["Ƴ", "Y", "J"],
    culturalContext:
      '“Ƴ” is a palatal consonant specific to Hausa, vital in respectful and cultural words.'
  },
  {
    letter: "Z",
    pronunciation: "/z/",
    examples: [
      { word: "Zama", meaning: "Sit/Become", image: seat },
      { word: "Zuci", meaning: "Heart", image: heart },
      { word: "Zafi", meaning: "Heat", image: fire }
    ],
    practiceOptions: ["Z", "S", "TS"],
    culturalContext:
      '“Z” is a buzzing consonant, often found in emotions and states of being.'
  }
];

export default hausaAlphabet;
