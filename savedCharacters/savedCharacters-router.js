const express = require('express'),
  SavedCharactersRouter = express.Router(),
  Models = require('../models.js'),
  SavedCharacters = Models.SavedCharacters,
  passport = require('passport'),
  { check, validationResult } = require('express-validator');

// mongoose.connect('mongodb://localhost:27017/TTRPG', { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Gets list of characters
 */
SavedCharactersRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  SavedCharacters.find().then((savedCharacter) => {
    res.status(201).json(savedCharacter);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

/**
 * GETS characters by name
 */
SavedCharactersRouter.get('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  SavedCharacters.findOne({ Name: req.params.Name }).then((savedCharacter) => {
    res.status(201).json(savedCharacter);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

/**
 * Creates characters
 */
SavedCharactersRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name', 'Name cannot contain non alphanumeric characters.').isAlphanumeric(),
  check('Class', 'Class is required').not().isEmpty(),
  check('Race', 'Race is required').not().isEmpty(),
  check('Attributes', 'Attributes is required').not().isEmpty(),
], passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  SavedCharacters.findOne({ Name: req.body.Name })
    .then((savedCharacter) => {
      if (savedCharacter) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        SavedCharacters.create({
          Portrait: req.body.Portrait,
          Name: req.body.Name,
          Gender: req.body.Gender,
          Race: req.body.Race,
          Class: req.body.Class,
          Strength: req.body.Strength,
          StrengthModifier: req.body.StrengthModifier,
          Dexterity: req.body.Dexterity,
          DexterityModifier: req.body.DexterityModifier,
          Constitution: req.body.Constitution,
          ConstitutionModifier: req.body.ConstitutionModifier,
          Intelligence: req.body.Intelligence,
          IntelligenceModifier: req.body.IntelligenceModifier,
          Wisdom: req.body.Wisdom,
          WisdomModifier: req.body.WisdomModifier,
          Charisma: req.body.Charisma,
          CharismaModifier: req.body.CharismaModifier,
          StrSavingThrows: req.body.StrSavingThrows,
          DexSavingThrows: req.body.DexSavingThrows,
          ConSavingThrows: req.body.ConSavingThrows,
          IntSavingThrows: req.body.IntSavingThrows,
          WisSavingThrows: req.body.WisSavingThrows,
          ChaSavingThrows: req.body.ChaSavingThrows,
          PassivePerception: req.body.PassivePerception,
          PassiveInvestigation: req.body.PassiveIvenstigation,
          PassiveInsight: req.body.PassiveInsight,
          AddSenses: req.body.AddSenses,
          ArmorProficiencies: req.body.ArmorProficiencies,
          WeaponProficiencies: req.body.WeaponProficiencies,
          ToolProficiences: req.body.ToolProficiences,
          Languages: req.body.Languages,
          Acrobatics: req.body.Acrobatics,
          AcrobaticsProf: req.body.AcrobaticsProf,
          AcrobaticsModifier: req.body.AcrobaticsModifier,
          AcrobaticsBonus: req.body.AcrobaticsBonus,
          AnimalHandling: req.body.AnimalHandling,
          AnimalHandlingProf: req.body.AnimalHandlingProf,
          AnimalHandlingModifier: req.body.AnimalHandlingModifier,
          AnimalHandlingBonus: req.body.AnimalHandlingBonus,
          Arcana: req.body.Arcana,
          ArcanaProf: req.body.ArcanaProf,
          ArcanaModifier: req.body.ArcanaModifier,
          ArcanaBonus: req.body.ArcanaBonus,
          Athletics: req.body.Athletics,
          AthleticsProf: req.body.AthleticsProf,
          AthleticsModifier: req.body.AthleticsModifier,
          AthleticsBonus: req.body.AthleticsBonus,
          Deception: req.body.Deception,
          DeceptionProf: req.body.DeceptionProf,
          DeceptionModifier: req.body.DeceptionModifier,
          DeceptionBonus: req.body.DeceptionBonus,
          History: req.body.History,
          HistoryProf: req.body.HistoryProf,
          HistoryModifier: req.body.HistoryModifier,
          HistoryBonus: req.body.HistoryBonus,
          Insight: req.body.Insight,
          InsightProf: req.body.InsightProf,
          InsightModifier: req.body.InsightModifier,
          InsightBonus: req.body.InsightBonus,
          Intimidation: req.body.Intimidation,
          IntimidationProf: req.body.IntimidationProf,
          IntimidationModifier: req.body.IntimidationModifier,
          IntimidationBonus: req.body.IntimidationBonus,
          Investigation: req.body.Investigation,
          InvestigationProf: req.body.InvestigationProf,
          InvestigationModifier: req.body.InvestigationModifier,
          InvestigationBonus: req.body.InvestigationBonus,
          Medicine: req.body.Medicine,
          MedicineProf: req.body.MedicineProf,
          MedicineModifier: req.body.MedicineModifier,
          MedicineBonus: req.body.MedicineBonus,
          Nature: req.body.Nature,
          NatureProf: req.body.NatureProf,
          NatureModifier: req.body.NatureModifier,
          NatureBonus: req.body.NatureBonus,
          Perception: req.body.Perception,
          PerceptionProf: req.body.PerceptionProf,
          PerceptionModifier: req.body.PerceptionModifier,
          PerceptionBonus: req.body.PerceptionBonus,
          Performance: req.body.Performance,
          PerformanceProf: req.body.PerformanceProf,
          PerformanceModifier: req.body.PerformanceModifier,
          PerformanceBonus: req.body.PerformanceBonus,
          Persuasion: req.body.Persuasion,
          PersuasionProf: req.body.PersuasionProf,
          PersuasionModifier: req.body.PersuasionModifier,
          PersuasionBonus: req.body.PersuasionBonus,
          Religion: req.body.Religion,
          ReligionProf: req.body.ReligionProf,
          ReligionModifier: req.body.ReligionModifier,
          ReligionBonus: req.body.ReligionBonus,
          SleightofHand: req.body.SleightofHand,
          SleightofHandProf: req.body.SleightofHandProf,
          SleightofHandModifier: req.body.SleightofHandModifier,
          SleightofHandBonus: req.body.SleightofHandBonus,
          Stealth: req.body.Stealth,
          StealthProf: req.body.StealthProf,
          StealthModifier: req.body.StealthModifier,
          StealthBonus: req.body.StealthBonus,
          Survival: req.body.Survival,
          SurvivalProf: req.body.SurvivalProf,
          SurvivalModifier: req.body.SurvivalModifier,
          SurvivalBonus: req.body.SurvivalBonus,
          Initiative: req.body.Initiative,
          ArmorClass: req.body.ArmorClass,
          ProficiencyBonus: req.body.ProficiencyBonus,
          Speed: req.Body.Speed,
          HitPoints: req.body.HitPoints,
          Actions: req.body.Actions,
          BonusActions: req.body.BonusActions,
          Reactions: req.body.Reactions,
          Background: req.body.Background,
          Biography: req.body.Biography,
          Inventory: req.body.Inventory,
          Spells: req.body.Spells,
          Feats: req.body.Feats,
          Defenses: req.body.Defenses,
          Condidtions: req.body.Conditions
        })
          .then((savedCharacter) => { res.status(201).json(savedCharacter) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

/**
 * Updates characters
 */
SavedCharactersRouter.put('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  let obj = {};
  if (req.body.Portrait) {
    obj.Portrait = req.body.Portrait
  }
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.Class) {
    obj.Class = req.body.Class
  }
  if (req.body.Race) {
    obj.Class = req.body.Class
  }
  if (req.body.Gender) {
    obj.Class = req.body.Gender
  }
  if (req.body.Strength) {
    obj.Strength = req.body.Strength
  }
  if (req.body.Dexterity) {
    obj.Dexterity = req.body.Dexterity
  }
  if (req.body.Constitution) {
    obj.Constitution = req.body.Constitution
  }
  if (req.body.Intelligence) {
    obj.Intelligence = req.body.Intelligence
  }
  if (req.body.Wisdom) {
    obj.Wisdom = req.body.Wisdom
  }
  if (req.body.Charisma) {
    obj.Charisma = req.body.Charisma
  }
  if (req.body.Biography) {
    obj.Biography = req.body.Biography
  }
  if (req.body.Inventory) {
    obj.Inventory = req.body.Inventory
  }
  if (req.body.Spells) {
    obj.Spells = req.body.Spells
  }
  if (req.body.Feats) {
    obj.Feats = req.body.Feats
  }
  SavedCharacters.findOneAndUpdate({ Name: req.params.Name }, { $set: obj },
    { new: true },
    (err, updatedSavedCharacter) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedSavedCharacter);
      }
    });
});

/**
 * Deletes characters
 */
SavedCharactersRouter.delete('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  SavedCharacters.findOneAndDelete({ Name: req.params.Name })
    .then((savedCharacter) => {
      if (!savedCharacter) {
        res.status(400).send(req.params.Name + ' was not found.');
      } else {
        res.status(200).send(req.params.Name + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

module.exports = SavedCharactersRouter