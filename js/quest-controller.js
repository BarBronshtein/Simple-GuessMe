'use strict';

var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
  $('.quest').hide();
}

function onStartGuessing() {
  $('.game-start').hide();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  gCurrQuest = getCurrQuest();
  console.log(gCurrQuest.txt);
  $('.quest h2').text(gCurrQuest.txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      $('.again').show();
      $('.btn-again').on('click', onRestartGame);
    } else {
      alert('I dont know...teach me!');
      // Hides and show new-quest section
      $('.new-quest').show();
      $('.quest').hide();
    }
    $('.btn-again').on('click', onRestartGame);
  } else {
    console.log('hi');
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

// function onUserResponse(ev) {
//   var res = ev.data.ans;
//   // If this node has no children
//   if (isChildless(getCurrQuest())) {
//     if (res === 'yes') {
//       alert('Yes, I knew it!');
//       // TODO: improve UX
//       $('.again').show();
//       $('.btn-again').on('click', onRestartGame);
//     } else {
//       alert('I dont know...teach me!');
//       // TODO: hide and show new-quest section
//       gLastRes = getCurrQuest().txt;
//       $('.new-quest').show();
//       $('.quest').hide();
//     }
//     $('.btn-again').on('click', onRestartGame);
//   } else {
//     // TODO: update the lastRes global var
//     console.log('hi');
//     gLastRes = getCurrQuest().txt;
//     moveToNextQuest(res);
//     renderQuest();
//   }
// }

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();

  addGuess(newQuest, newGuess, gLastRes);
  $('.again').show();
  $('.new-quest').hide();
}

function onRestartGame() {
  $('.again').hide();
  $('.new-quest').hide();
  $('.game-start').show();
  $('.quest h2').text('');
  $('.quest').show();
  gLastRes = null;
  restartGame();
}
