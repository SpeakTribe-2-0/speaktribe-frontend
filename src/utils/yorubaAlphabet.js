import akara from '../assets/akara.png'


const alphabets = [
    {
      letter: "A",
      pronunciation: "/a/",
      examples: [
        { word: "Àkàrà", meaning: "Bean Cake", image: akara },
        { word: "Àgbo", meaning: "Herbal Drink", image: akara },
        { word: "Àdà", meaning: "Cutlass", image: akara }
      ],
      practiceOptions: ["A", "H", "B"],
      culturalContext:
        'In Yoruba culture, the "A" sound is fundamental, often appearing in names and greetings, symbolizing foundation and origin.'
    },
    {
      letter: "B",
      pronunciation: "/b/",
      examples: [
        { word: "Bàtà", meaning: "Shoe", image: akara },
        { word: "Búrẹ́dì", meaning: "Bread", image: akara },
        { word: "Bẹ́lú", meaning: "Bell", image: akara }
      ],
      practiceOptions: ["B", "A", "D"],
      culturalContext:
        'The letter "B" appears in many Yoruba words, often representing warmth, welcome, and daily objects.'
    },
    {
      letter: "D",
      pronunciation: "/d/",
      examples: [
        { word: "Dúdú", meaning: "Black", image: akara },
        { word: "Dáńdógó", meaning: "Traditional Robe", image: akara },
        { word: "Dán", meaning: "To Shine", image: akara }
      ],
      practiceOptions: ["D", "F", "E"],
      culturalContext:
        'The "D" sound is common in Yoruba descriptive words, often conveying strength and identity.'
    },
    {
      letter: "E",
      pronunciation: "/e/",
      examples: [
        { word: "Ẹja", meaning: "Fish", image: akara },
        { word: "Ẹ̀fọ́", meaning: "Vegetable", image: akara },
        { word: "Ẹbọ", meaning: "Sacrifice", image: akara }
      ],
      practiceOptions: ["E", "Ẹ", "A"],
      culturalContext:
        'The letter "E" is widely used in Yoruba and often marks verbs and nouns tied to daily life.'
    },
    {
      letter: "Ẹ",
      pronunciation: "/ɛ/",
      examples: [
        { word: "Ẹni", meaning: "Person", image: akara },
        { word: "Ẹ̀gbọ́n", meaning: "Elder Sibling", image: akara },
        { word: "Ẹbọra", meaning: "Spirit", image: akara }
      ],
      practiceOptions: ["Ẹ", "E", "I"],
      culturalContext:
        'Ẹ is unique to Yoruba orthography and carries sounds not found in English, central to clear expression.'
    },
    {
      letter: "F",
      pronunciation: "/f/",
      examples: [
        { word: "Fẹ́", meaning: "Love", image: akara },
        { word: "Fàdákà", meaning: "Silver", image: akara },
        { word: "Fọ", meaning: "Wash", image: akara }
      ],
      practiceOptions: ["F", "P", "V"],
      culturalContext:
        'The "F" sound often conveys actions and descriptions, appearing in verbs and adjectives.'
    },
    {
      letter: "G",
      pronunciation: "/g/",
      examples: [
        { word: "Gbẹ̀", meaning: "Dry", image: akara },
        { word: "Gbogbo", meaning: "All", image: akara },
        { word: "Gàárì", meaning: "Cassava Granules", image: akara }
      ],
      practiceOptions: ["G", "GB", "K"],
      culturalContext:
        'The "G" sound in Yoruba is a hard consonant often associated with descriptive and emphatic words.'
    },
    {
      letter: "GB",
      pronunciation: "/ɡ͡b/",
      examples: [
        { word: "Gbẹ̀kẹ̀lé", meaning: "Trust", image: akara },
        { word: "Gbádùn", meaning: "Enjoy", image: akara },
        { word: "Gbárí", meaning: "Accept", image: akara }
      ],
      practiceOptions: ["GB", "G", "B"],
      culturalContext:
        'The GB sound is unique to Yoruba and some African languages, a co-articulated consonant crucial for meaning.'
    },
    {
      letter: "H",
      pronunciation: "/h/",
      examples: [
        { word: "Hà", meaning: "Exclaim", image: akara },
        { word: "Hàkì", meaning: "Hacking", image: akara },
        { word: "Hàlò", meaning: "Hello", image: akara }
      ],
      practiceOptions: ["H", "A", "E"],
      culturalContext:
        'The letter "H" is less common in Yoruba but appears in expressive sounds and borrowed words.'
    },
    {
      letter: "I",
      pronunciation: "/i/",
      examples: [
        { word: "Ìwé", meaning: "Book", image: akara },
        { word: "Ìlú", meaning: "Town", image: akara },
        { word: "Ìbà", meaning: "Greeting", image: akara }
      ],
      practiceOptions: ["I", "E", "O"],
      culturalContext:
        'The "I" vowel is a high front vowel, key to many Yoruba nouns and verbs.'
    },
    {
      letter: "J",
      pronunciation: "/ʤ/",
      examples: [
        { word: "Jẹ", meaning: "Eat", image: akara },
        { word: "Jù", meaning: "Throw", image: akara },
        { word: "Jin", meaning: "Fry", image: akara }
      ],
      practiceOptions: ["J", "Y", "CH"],
      culturalContext:
        'The "J" sound is common in action words in Yoruba, especially related to food and movement.'
    },
    {
      letter: "K",
      pronunciation: "/k/",
      examples: [
        { word: "Kà", meaning: "Read", image: akara },
        { word: "Kọ́", meaning: "Teach", image: akara },
        { word: "Kún", meaning: "Fill", image: akara }
      ],
      practiceOptions: ["K", "C", "Q"],
      culturalContext:
        'K is a strong consonant sound in Yoruba, used in many verbs and imperative forms.'
    },
    {
  letter: "L",
  pronunciation: "/l/",
  examples: [
    { word: "Lẹ́tà", meaning: "Letter (mail)", image: akara },
    { word: "Láti", meaning: "From", image: akara },
    { word: "Lẹ́hìn", meaning: "Behind", image: akara }
  ],
  practiceOptions: ["L", "R", "N"],
  culturalContext:
    'The "L" sound in Yoruba is soft and common in polite expressions, greetings, and formal speech.'
},
{
  letter: "M",
  pronunciation: "/m/",
  examples: [
    { word: "Má", meaning: "Don’t", image: akara },
    { word: "Mọ́", meaning: "Know", image: akara },
    { word: "Mí", meaning: "Me", image: akara }
  ],
  practiceOptions: ["M", "N", "B"],
  culturalContext:
    'M is a nasal sound in Yoruba, often carrying emphasis in personal pronouns and commands.'
},
{
  letter: "N",
  pronunciation: "/n/",
  examples: [
    { word: "Nà", meaning: "Beat", image: akara },
    { word: "Ní", meaning: "Have/At", image: akara },
    { word: "Nínú", meaning: "Inside", image: akara }
  ],
  practiceOptions: ["N", "M", "R"],
  culturalContext:
    'The "N" sound is nasal and is a key consonant in many Yoruba verbs and prepositions.'
},
{
  letter: "O",
  pronunciation: "/o/",
  examples: [
    { word: "Oúnjẹ", meaning: "Food", image: akara },
    { word: "Ọmọ", meaning: "Child", image: akara },
    { word: "Òjò", meaning: "Rain", image: akara }
  ],
  practiceOptions: ["O", "Ọ", "U"],
  culturalContext:
    'The "O" vowel is rounded and open, appearing in many nouns, greetings, and descriptive words.'
},
{
  letter: "Ọ",
  pronunciation: "/ɔ/",
  examples: [
    { word: "Ọbà", meaning: "King", image: akara },
    { word: "Ọjọ́", meaning: "Day", image: akara },
    { word: "Ọkùnrin", meaning: "Man", image: akara }
  ],
  practiceOptions: ["Ọ", "O", "E"],
  culturalContext:
    'Ọ is a distinct Yoruba vowel sound, deeper than "O", often used in royal titles and cultural expressions.'
},
{
  letter: "P",
  pronunciation: "/p/",
  examples: [
    { word: "Pà", meaning: "Kill", image: akara },
    { word: "Pé", meaning: "Call/Invite", image: akara },
    { word: "Pupa", meaning: "Red", image: akara }
  ],
  practiceOptions: ["P", "B", "F"],
  culturalContext:
    'P is a forceful sound in Yoruba, often used in descriptive words and commands.'
},
{
  letter: "R",
  pronunciation: "/r/",
  examples: [
    { word: "Rìn", meaning: "Walk", image: akara },
    { word: "Rọ̀", meaning: "Bend", image: akara },
    { word: "Rẹ́rìn", meaning: "Laugh", image: akara }
  ],
  practiceOptions: ["R", "L", "N"],
  culturalContext:
    'The Yoruba "R" is rolled or tapped, adding rhythm and musicality to speech.'
},
{
  letter: "S",
  pronunciation: "/s/",
  examples: [
    { word: "Sùn", meaning: "Sleep", image: akara },
    { word: "Sọ", meaning: "Speak", image: akara },
    { word: "Sán", meaning: "Pay", image: akara }
  ],
  practiceOptions: ["S", "Ṣ", "Z"],
  culturalContext:
    'S is a sharp consonant in Yoruba, used widely in commands, actions, and descriptive phrases.'
},
{
  letter: "Ṣ",
  pronunciation: "/ʃ/",
  examples: [
    { word: "Ṣe", meaning: "Do", image: akara },
    { word: "Ṣọ́ọ̀ṣì", meaning: "Church", image: akara },
    { word: "Ṣí", meaning: "Open", image: akara }
  ],
  practiceOptions: ["Ṣ", "S", "Sh"],
  culturalContext:
    'Ṣ is a unique Yoruba sound similar to "sh" in English, and is vital in many cultural and religious terms.'
},
{
  letter: "T",
  pronunciation: "/t/",
  examples: [
    { word: "Tà", meaning: "Sell", image: akara },
    { word: "Tún", meaning: "Again", image: akara },
    { word: "Tí", meaning: "That/Which", image: akara }
  ],
  practiceOptions: ["T", "D", "P"],
  culturalContext:
    'T is a crisp consonant in Yoruba, common in action words and sentence connectors.'
},
{
  letter: "U",
  pronunciation: "/u/",
  examples: [
    { word: "U", meaning: "Loanword usage", image: akara },
    { word: "Ùgbó", meaning: "Farm", image: akara },
    { word: "Ùdẹ̀", meaning: "Hunter", image: akara }
  ],
  practiceOptions: ["U", "O", "Ọ"],
  culturalContext:
    'U is less common in native Yoruba words but appears in borrowed terms and regional dialects.'
},
{
  letter: "W",
  pronunciation: "/w/",
  examples: [
    { word: "Wí", meaning: "Say", image: akara },
    { word: "Wà", meaning: "Be/Exist", image: akara },
    { word: "Wẹ̀", meaning: "Bathe", image: akara }
  ],
  practiceOptions: ["W", "Y", "V"],
  culturalContext:
    'W is smooth and flowing, common in verbs and descriptive expressions in Yoruba.'
},
{
  letter: "Y",
  pronunciation: "/j/",
  examples: [
    { word: "Yà", meaning: "Separate", image: akara },
    { word: "Yí", meaning: "Turn", image: akara },
    { word: "Yẹ́", meaning: "Be Worthy", image: akara }
  ],
  practiceOptions: ["Y", "I", "J"],
  culturalContext:
    'The Yoruba "Y" is a palatal sound that adds softness and flow to names and verbs.'
}

  ];

  export default alphabets;
