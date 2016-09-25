$(function() {
  var $settings = $(".settings-wrapper");
  var $settingsButton = $(".settings-button");

  var $settingsLayoutButton = $(".button.layout");

  $settingsButton.click(function(){
    $settings.removeClass("zoomOut hidden");
  });

  $settingsLayoutButton.click(function(){
    selectLayoutButton($(this));
  });

  $(document).mousedown(function(e) {
    var targetClass = $(e.target).attr('class');

    if(!$settings.hasClass("hidden")){
      if(targetClass != null
          && !targetClass.includes("settings")
          && $settings.find(e.target).length != 1){
        $settings.addClass("zoomOut");
        setTimeout(function(){
          $settings.addClass("hidden");
        }, 500);
      }
    }
  });
});

function animateCozyLayout(speed){
  $(".element-wrapper").clearQueue().animate({
    "padding" : "4px 0px"
  }, speed);
  $(".element").clearQueue().animate({
    "border-radius" : "2px",
    "height" : "24px"
  }, speed);
  $(".element span.attribute").clearQueue().animate({
    "padding" : "4px 8px"
  }, speed);
  $("span.attribute").addClass("hidden");
  $(".element span.attribute:first-child").clearQueue().animate({
    "border-bottom-left-radius" : "2px",
    "border-top-left-radius" : "2px"
  }, speed);
  $(".element span.attribute:last-child").clearQueue().animate({
    "border-bottom-right-radius" : "2px",
    "border-top-right-radius" : "2px"
  }, speed);
  $(".script-input.url").clearQueue().animate({
    "padding" : "4px"
  }, speed);
}

function animateComfyLayout(speed){
  $(".element-wrapper").clearQueue().animate({
    "padding" : "10px 0px"
  }, speed);
  $(".element").clearQueue().animate({
    "border-radius" : "4px",
    "height" : "42px"
  }, speed);
  $(".element span.attribute").clearQueue().animate({
    "padding" : "10px",
    "padding-bottom" : "16px"
  }, speed);
  $("span.attribute").removeClass("hidden");
  $(".element span.attribute:first-child").clearQueue().animate({
    "border-bottom-left-radius" : "4px",
    "border-top-left-radius" : "4px"
  }, speed);
  $(".element span.attribute:last-child").clearQueue().animate({
    "border-bottom-right-radius" : "4px",
    "border-top-right-radius" : "4px"
  }, speed);
  $(".script-input.url").clearQueue().animate({
    "padding" : "13px 10px"
  }, speed);
}

function changeLayout(layout){
  var speed = 300;
  if(layout == "cozy"){
    animateCozyLayout(speed);
  }
  else if (layout == "comfy"){
    animateComfyLayout(speed);
  }
}

function selectLayoutButton($selectedLayout){
  var $layoutLabel = $(".settings-label.layout span");
  var layout = $selectedLayout.attr("data-layout");

  $( ".button.layout" ).each(function() {
    if($(this).hasClass("selected")){
      $(this).removeClass("selected");
    }
  });

  $selectedLayout.addClass("selected");
  $layoutLabel.html(layout);

  changeLayout(layout);
}
