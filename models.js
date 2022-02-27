const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');
const { stringify } = require('uuid');

let characterSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Class: { type: String, required: true },
  Race: { type: String, required: true },
  Strength: { type: Number, required: true },
  Dexterity: { type: Number, required: true },
  Constitution: { type: Number, required: true },
  Intelligence: { type: Number, required: true },
  Wisdom: { type: Number, required: true },
  Charisma: { type: Number, required: true },
  Gender: { type: String, required: true },
  Inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }],
  Spells: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spell' }],
  Feats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feat' }],
  Biography: String,
  ImagePath: String,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  SavedCharacters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
})

let raceSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  RacialTraits: [String],
  Languages: [String],
  FavoredClass: { type: String }
})

let classSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  Proficiencies: [String],
  ClassAbilities: [String],
})

let inventoryItemsSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Value: { type: String, required: true },
  Description: { type: String, required: true }
})

let spellsSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  School: { type: String, required: true },
  Description: { type: String, required: true }
})

let featSchema = mongoose.Schema({
  Name: { type: String, required: true},
  Description: {type: String, required: true}
})

let Character = mongoose.model('Character', characterSchema);
let User = mongoose.model('User', userSchema);
let Race = mongoose.model('Race', raceSchema);
let Class = mongoose.model('Class', classSchema);
let Item = mongoose.model('Item', inventoryItemsSchema);
let Spell = mongoose.model('Spell', spellsSchema);
let Feat = mongoose.model('Feat', featSchema);

module.exports.Character = Character;
module.exports.User = User;
module.exports.Race = Race;
module.exports.Class = Class;
module.exports.Item = Item;
module.exports.Spell = Spell;
module.exports.Feat = Feat;