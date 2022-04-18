const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

let savedCharactersSchema = mongoose.Schema({
  Portrait: { type: String },
  Name: { type: String, required: true },
  Gender: { type: String },
  Race: [{ type: String, ref: 'Races', required: true }],
  Class: [{ type: String, ref: 'Classes', required: true }],
  Strength: { type: String, required: true },
  StrengthModifier: { type: String, required: true },
  Dexterity: { type: String, required: true },
  DexterityModifier: { type: String, required: true },
  Constitution: { type: String, required: true },
  ConstitutionModifier: { type: String, required: true },
  Intelligence: { type: String, required: true },
  IntelligenceModifier: { type: String, required: true },
  Wisdom: { type: String, required: true },
  WisdomModifier: { type: String, required: true },
  Charisma: { type: String, required: true },
  CharismaModifier: { type: String, required: true },
  StrSavingThrow: { type: String, required: true },
  DexSavingThrow: { type: String, required: true },
  ConSavingThrow: { type: String, required: true },
  IntSavingThrow: { type: String, required: true },
  WisSavingThrow: { type: String, required: true },
  ChaSavingThrow: { type: String, required: true },
  Speed: { type: String, required: true },
  PassivePerception: { type: String, required: true },
  PassiveInvestigation: { type: String, required: true },
  PassiveInsight: { type: String, required: true },
  AddSenses: { type: Array },
  ArmorProficiencies: { type: Array },
  WeaponProficiencies: { type: Array },
  ToolProficiencies: { type: Array },
  Languages: { type: Array, required: true },
  Acrobatics: { type: String, required: true },
  AcrobaticsProf: { type: String, required: true },
  AcrobaticsModifier: { type: String, required: true },
  AcrobaticsBonus: { type: String, required: true },
  AnimalHanding: { type: String, required: true },
  AnimalHandingProf: { type: String, required: true },
  AnimalHandingModifier: { type: String, required: true },
  AnimalHandingBonus: { type: String, required: true },
  Arcana: { type: String, required: true },
  ArcanaProf: { type: String, required: true },
  ArcanaModifier: { type: String, required: true },
  ArcanaBonus: { type: String, required: true },
  Athletics: { type: String, required: true },
  AthleticsProf: { type: String, required: true },
  AthleticsModifier: { type: String, required: true },
  AthleticsBonus: { type: String, required: true },
  Deception: { type: String, required: true },
  DeceptionProf: { type: String, required: true },
  DeceptionModifier: { type: String, required: true },
  DeceptionBonus: { type: String, required: true },
  History: { type: String, required: true },
  HistoryProf: { type: String, required: true },
  HistoryModifier: { type: String, required: true },
  HistoryBonus: { type: String, required: true },
  Insight: { type: String, required: true },
  InsightProf: { type: String, required: true },
  InsightModifier: { type: String, required: true },
  InsightBonus: { type: String, required: true },
  Intimidation: { type: String, required: true },
  IntimidationProf: { type: String, required: true },
  IntimidationModifier: { type: String, required: true },
  IntimidationBonus: { type: String, required: true },
  Investigation: { type: String, required: true },
  InvestigationProf: { type: String, required: true },
  InvestigationModifier: { type: String, required: true },
  InvestigationBonus: { type: String, required: true },
  Medicine: { type: String, required: true },
  MedicineProf: { type: String, required: true },
  MedicineModifier: { type: String, required: true },
  MedicineBonus: { type: String, required: true },
  Nature: { type: String, required: true },
  NatureProf: { type: String, required: true },
  NatureModifier: { type: String, required: true },
  NatureBonus: { type: String, required: true },
  Perception: { type: String, required: true },
  PerceptionProf: { type: String, required: true },
  PerceptionModifier: { type: String, required: true },
  PerceptionBonus: { type: String, required: true },
  Performance: { type: String, required: true },
  PerformanceProf: { type: String, required: true },
  PerformanceModifier: { type: String, required: true },
  PerformanceBonus: { type: String, required: true },
  Persuasion: { type: String, required: true },
  PersuasionProf: { type: String, required: true },
  PersuasionModifier: { type: String, required: true },
  PersuasionBonus: { type: String, required: true },
  Religion: { type: String, required: true },
  ReligionProf: { type: String, required: true },
  ReligionModifier: { type: String, required: true },
  ReligionBonus: { type: String, required: true },
  SleightOfHand: { type: String, required: true },
  SleightOfHandProf: { type: String, required: true },
  SleightOfHandModifier: { type: String, required: true },
  SleightOfHandBonus: { type: String, required: true },
  Stealth: { type: String, required: true },
  StealthProf: { type: String, required: true },
  StealthModifier: { type: String, required: true },
  StealthBonus: { type: String, required: true },
  Survivial: { type: String, required: true },
  SurvivialProf: { type: String, required: true },
  SurvivialModifier: { type: String, required: true },
  SurvivialBonus: { type: String, required: true },
  Initiative: { type: Number, required: true },
  ArmorClass: { type: Number, required: true },
  ProficiencyBonus: { type: Number, required: true },
  HitPoints: { type: Array, required: true },
  Actions: { type: Array },
  BonusActions: { type: Array },
  Reactions: { type: Array },
  Background: [{ type: String, ref: 'Backgrounds' }],
  Inventory: [{ type: Array, ref: 'InventoryItem' }],
  Spells: [{ type: Array, ref: 'Spell' }],
  Feats: [{ type: Array, ref: 'Feat' }],
  Biography: { type: String },
  Defenses: { type: Array },
  Condidtions: { type: Array },
});

let usersSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  MyCharacters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
})

usersSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

usersSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
}

let racesSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  RacialTraits: [Array],
  Languages: [Array],
})

let characterClassesSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  ClassFeatures: { type: Array },
})

let inventoryItemsSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Value: { type: String, required: true },
  Description: { type: String, required: true }
})

let spellsSchema = mongoose.Schema({
  Name: { type: String, required: true },
  SpellLevel: { type: String, required: true },
  School: { type: String, required: true },
  Description: { type: String, required: true }
})

let spellLevelsSchema = mongoose.Schema({
  Name: { type: String, required: true },
  SpellLevel: { type: String, required: true },
  School: { type: String, required: true },
  Description: { type: String, required: true }
})

let featsSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true }
})

let SavedCharacters = mongoose.model('SavedCharacter', savedCharactersSchema);
let Users = mongoose.model('User', usersSchema);
let Races = mongoose.model('Race', racesSchema);
let CharacterClasses = mongoose.model('Classes', characterClassesSchema);
let InventoryItems = mongoose.model('Item', inventoryItemsSchema);
let Spells = mongoose.model('Spell', spellsSchema);
let SpellLevels = mongoose.model('SpellLevel', spellLevelsSchema);
let Feats = mongoose.model('Feat', featsSchema);

module.exports.SavedCharacters = SavedCharacters;
module.exports.Users = Users;
module.exports.Races = Races;
module.exports.CharacterClasses = CharacterClasses;
module.exports.InventoryItems = InventoryItems;
module.exports.Spells = Spells;
module.exports.SpellLevels = SpellLevels;
module.exports.Feats = Feats;