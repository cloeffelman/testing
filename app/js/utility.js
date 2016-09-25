$(function() {

});

$(window).resize(function(){ //Window resize function

});

function emptyElement($element){
  $element.empty();
}

function getPixelsAsNumeric(pixels){
  return parseInt(pixels, 10);
}

function getTotalElementHeight(element){
  return element.height() + (getPixelsAsNumeric(element.css("padding-top")) * 2);
}

function getTotalElementWidth(element){
  return element.width() + (getPixelsAsNumeric(element.css("padding-left")) * 2);
}

function lockWindowInput(){
  var $lockWindowElement = $("<div class = 'lock-window-input'></div>");
  $(document.body).append($lockWindowElement);
}

function unlockWindowInput(){
  if($(document.body).find(".lock-window-input").length != 0){
    var $lockWindowElement = $(document.body).find(".lock-window-input");
    $lockWindowElement.remove();
  }
}
