import { scaleOrdinal } from 'd3-scale';
import { schemeSet3 } from 'd3-scale-chromatic';

/* eslint-disable */
export const categories = {
  Command: [0],
  'White Magick':  [1,2,3,4,5,6,7,8,9,10,11,12,13],
  'Black Magick':  [14,15,16,17,18,19,20,21,22,23,24,25,26],
  'Time Magick':   [27,28,29,30,31,32,33,34,35,36],
  'Green Magick':  [37,38,39],
  'Arcane Magick': [40,41,42],
  'HP Augments':         [67,68,69,70,71,72,73,74,75,76,77,78],
  'Battle Lore':         [79,80,81,82],
  'Magick Lore':         [83,84,85,86],
  'Shield Augments':     [95,96,97],
  'Misc Augments':       [87,88,89,90,91,92,93,94,98,99,100,101,108],
  'Swiftness Augments':  [102,103,104],
  'Channeling Augments': [105,106,107],
  'Item Augments':       [109,110,111,112,113,114,115,116,117,118,119,120],
  'Shields':      [154,155,156,157,158,159,160,161,162,163],
  'Light Armor':  [164,165,166,167,168,169,170,171,172,173,174,175,176],
  'Heavy Armor':  [177,178,179,180,181,182,183,184,185,186,187,188],
  'Mystic Armor': [189,190,191,192,193,194,195,196,197,198,199,200,201],
  'Genji Armor':  [202],

  // This section is organized with ultimate weapons grouped by their type
  'Swords': [203,204,205,206,207,208,209,210,211,212,213],
  'Bows': [214,215,216,217,218,219,220,221,222],
  'Spears': [223,224,225,226,227,228,229,230],
  'Axes & Hammers': [231,232,233,234,235,236,237,238],
  'Katana': [239,240,241,242,243,244,245],
  'Greatswords': [246,247,248,249,250,251,252],
  'Rods': [253,254,255,256,257],
  'Staves': [258,259,260,261,262,263],
  'Maces': [264,265,266,267,268],
  'Measures': [269,270,271,272],
  'Daggers': [273,274,275,276,277,278,279],
  'Guns': [280,281,282,283,284,285,286],
  'Poles': [287,288,289,290,291,292,293,294],
  'Crossbows': [295,296,297,298],
  'Hand-bombs': [299,300,301,302],
  'Ninja Swords': [303,304,305,306],

  // This section is organized with ultimate weapons separated out
  //
  // 'Swords': [203,204,205,206,207,208,209,210,212],
  //   'Durandal, Simha': [211],
  //   'Karkata': [213],
  // 'Bows': [214,215,216,217,218,219,220,221],
  //   'Dhanusa': [222],
  // 'Spears': [223,224,225,226,227,228],
  //   'Vrsahba': [229],
  //   'Zodiac Spear': [230],
  // 'Axes & Hammers': [231,232,233,234,235,236,237],
  //   'Vrscika': [238],
  // 'Katana': [239,240,241,242,243,244],
  //   'Kumbha': [245],
  // 'Greatswords': [246,247,248,249,250,251,252],
  // 'Rods': [253,254,255,256,257],
  // 'Staves': [258,259,260,261,262,263],
  // 'Maces': [264,265,266,267,268],
  // 'Measures': [269,270,271,272],
  // 'Daggers': [273,274,275,276,277,278],
  //   'Shikari Nagasa & Mina': [279],
  // 'Guns': [280,281,282,283,284,285],
  //   'Mithuna': [286],
  // 'Poles': [287,288,289,290,291,292,293],
  //   'Kanya': [294],
  // 'Crossbows': [295,296,297],
  //   'Gastrophetes, Tula': [298],
  // 'Hand-bombs': [299,300,301],
  //   'Makara': [302],
  // 'Ninja Swords': [303,304,305],
  //   'Yagyu Darkblade & Mesa': [306],

  Technick: [43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],
  Accessories: [131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153],
  Gambit: [121,122,123,124,125,126,127,128,129,130],
  Summon: [307,308,309,310,311,312,313,314,315,316,317,318,319],
  Quickening: [320,321,322,323]
};
/* eslint-enable */

// See http://www.rpgsite.net/feature/5799-final-fantasy-xii-the-zodiac-age-weapons-ultimate-weapons-how-to-get-them
const ultimateWeaponIds = {
  211: 'Simha',
  213: 'Karkata',
  222: 'Dhanusa',
  229: 'Vrsahba',
  230: 'Zodiac Spear',
  238: 'Vrscika',
  245: 'Kumbha',
  279: 'Mina',
  286: 'Mithuna',
  294: 'Kanya',
  298: 'Tula',
  302: 'Makara',
  306: 'Mesa',
};
/**
 * Determine which ultimate weapons are accessible with the provided license IDs
 *
 * @param {number[]} ids Array of license IDs
 * @returns {string[]} Array of weapon names
 */
export const ultimateWeapons = ids => ids
  .filter(id => Boolean(ultimateWeaponIds[id]))
  .map(id => ultimateWeaponIds[id]);

export const isUltimateWeapon = id =>
  [211, 213, 222, 229, 230, 238, 245, 279, 286, 294, 298, 302, 306].includes(id);

const categoryCache = {};
export const getCategory = (id) => {
  if (!id && id !== 0) {
    return '';
  }
  if (categoryCache[id]) {
    return categoryCache[id];
  }
  const cats = Object.keys(categories);
  for (let i = 0; i < cats.length; i += 1) {
    if (categories[cats[i]].includes(id)) {
      categoryCache[id] = cats[i];
      return cats[i];
    }
  }
  console.error(`Cannot find category for id ${ id }!`);
  return '';
};

export const getMetaCategory = (category) => {
  switch (category) {
    case 'Black Magick':
    case 'Arcane Magick':
      return 'Black Magick';
    case 'Time Magick':
    case 'Green Magick':
      return 'Support Magick';
    case 'HP Augments':
    case 'Battle Lore':
    case 'Magick Lore':
    case 'Shield Augments':
    case 'Misc Augments':
    case 'Swiftness Augments':
    case 'Channeling Augments':
    case 'Item Augments':
      return 'Augments';
    case 'Light Armor':
    case 'Heavy Armor':
    case 'Mystic Armor':
    case 'Genji Armor':
      return 'Armor';
    case 'Swords':
    case 'Bows':
    case 'Spears':
    case 'Axes & Hammers':
    case 'Katana':
    case 'Greatswords':
    case 'Rods':
    case 'Staves':
    case 'Maces':
    case 'Measures':
    case 'Daggers':
    case 'Guns':
    case 'Poles':
    case 'Crossbows':
    case 'Hand-bombs':
    case 'Ninja Swords':
      return 'Weapons';
    default:
      return category;
  }
};
export const metaCategories = Object.keys(categories)
  .map(cat => getMetaCategory(cat))
  .reduce((unique, cat) => (
    unique.includes(cat) ? unique : unique.concat(cat)
  ), []);

export const isUnlock = category => category === 'Quickening' || category === 'Summon';

const colorScale = scaleOrdinal(schemeSet3);
const cellColorCache = {};
export const categoryColor = (category) => {
  let color;
  if (category === 'White Magick') {
    return '#fff';
  } else if (category === 'Black Magick') {
    return '#555';
  } else if (category === 'Summon') {
    color = '#9200a9'; // 'rgba(146, 0, 169, 0.4)';
  } else if (category === 'Quickening') {
    color = '#a90023'; // 'rgba(169, 0, 35, 0.4)';
  } else {
    color = colorScale(getMetaCategory(category));
  }
  return color;
};
export const cellCategoryColor = (id) => {
  if (cellColorCache[id]) {
    return cellColorCache[id];
  }
  const category = getCategory(id);
  let color;
  if (isUltimateWeapon(id)) {
    color = 'red';
  } else {
    color = categoryColor(category);
  }
  cellColorCache[id] = color;
  return color;
};
