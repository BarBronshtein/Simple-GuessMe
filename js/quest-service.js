var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = 'questsDB';

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY);
  if (gQuestsTree) return (gCurrQuest = gQuestsTree);
  gQuestsTree = createQuest('Male?');
  gQuestsTree.yes = createQuest('Gandhi');
  gQuestsTree.no = createQuest('Rita');
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  // update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest;
  gCurrQuest = res === 'yes' ? gCurrQuest.yes : gCurrQuest.no;
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // Create and Connect the 2 Quests to the quetsions tree
  var newQuest = createQuest(newQuestTxt);
  newQuest.yes = createQuest(newGuessTxt);
  newQuest.no = gCurrQuest;
  console.log(gPrevQuest);
  gPrevQuest[lastRes] = newQuest;
  saveToStorage(STORAGE_KEY, gQuestsTree);
}
// function addGuess(newQuestTxt, newGuessTxt, lastRes) {
//   Create and Connect the 2 Quests to the quetsions tree

//   gCurrQuest.no = createQuest(lastRes);
//   gCurrQuest.yes = createQuest(newGuessTxt);
//   gCurrQuest.txt = newQuestTxt;

//   // gCurrQuest.no = { txt: lastRes, no: null, yes: null };
//   // gCurrQuest.txt = newQuestTxt;
//   // gCurrQuest.yes = { txt: newGuessTxt, no: null, yes: null };
//   saveToStorage(STORAGE_KEY, gQuestsTree);
// }

function getCurrQuest() {
  return gCurrQuest;
}

function restartGame() {
  gCurrQuest = gQuestsTree;
}
