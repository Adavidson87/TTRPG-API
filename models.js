const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

let savedCharactersSchema = mongoose.Schema({
  Portrait: { type: String },
  Name: { type: String, required: true },
  Class: { type: String, required: true },
  Race: { type: String, required: true },
  Strength: { type: String, required: true },
  Dexterity: { type: String, required: true },
  Constitution: { type: String, required: true },
  Intelligence: { type: String, required: true },
  Wisdom: { type: String, required: true },
  Charisma: { type: String, required: true },
  Gender: { type: String },
  Inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }],
  Spells: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spell' }],
  Feats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feat' }],
  Biography: { type: String },
  ImagePath: { type: String },
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