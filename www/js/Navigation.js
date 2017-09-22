$(document).ready(function() {
  hideAllTopGamePanels();
  hideAllBottomGamePanels();
});

function hideAllTopGamePanels(){
  $('#team-sliders').hide();
  $('#line-management').hide();
}

function hideAllBottomGamePanels(){
  $('#action-tracker').hide();
  $('#game-stats').hide();
}

function teamSliders(){
  hideAllTopGamePanels();
  $('#team-sliders').show();
}

function lineManagement(){
  hideAllTopGamePanels();
  $('#line-management').show();
}

function actionTracker(){
  hideAllBottonmGamePanels();
  $('#action-tracker').show();
}

function gameStats(){
  hideAllBottonmGamePanels();
  $('#game-stats').show();
}
