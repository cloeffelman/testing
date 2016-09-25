$(function(){
  var $outputWrapper = $(".output-wrapper");
  showOutput();

  $(document).keyup(function(e) {
    var $close = $(".output .header .close");
    if($outputWrapper.hasClass("open")){
      if (e.keyCode == 27) {
        $close.click();
      }
    }
  });

  $('.input-url').keypress(function(e){
    if(e.keyCode==13){
      $('.input-url').blur();
      $('.input-url-wrapper .parse').click();
    }
  });
});

function appendGridlines(level, indent){
  var $outputBody = $(".output-body .views");

  var $gridline = $("<div class = 'gridline'></div>");
  $gridline.css("left", 20 + (indent * level) + "px");
  $outputBody.after($gridline);
}

function appendHTMLStructure(element, level, highestLevel){
  var indent = 40;

  var $htmlStructure = $(".html-structure");
  var $DOMElement = createDOMElement(element, level, indent);

  var children = element.children;

  $htmlStructure.append($DOMElement);
  level++;

  if(children !== undefined && children.length > 0){
    for(var i = 0; i < children.length; i++){
      highestLevel = appendHTMLStructure(children[i], level, highestLevel);
    }
    level--;
  }

  if(level > highestLevel){
    appendGridlines(highestLevel, indent);
    highestLevel++;
  }

  return highestLevel;
}

function appendOutputContainer(){
  var $outputWrapper = $(".output-wrapper");
  var $output = $(".output");
  var $inputUrl = $(".input-url");

  var offset = "2.5%";
  var size = "95%";

  $outputWrapper.css({
    "height"  : getTotalElementHeight($inputUrl) + "px",
    "left"    : $inputUrl.offset().left,
    "top"     : $inputUrl.offset().top,
    "width"   : getTotalElementWidth($inputUrl) + "px"
  })
  .removeClass("hidden")
  .addClass("open")
  .animate({
    "height"  : size,
    "left"    : offset,
    "top"     : offset,
    "width"   : size
  }, 500, function(){
    $output.animate({
      "opacity" : "1"
    }, 100);
  });
}

function clearGridlines(){
  $(".gridline").remove();
}

function createDOMElement(element, level, indent){
  var $DOMElementWrapper = $("<div class = 'element-wrapper'></div>");
  var $DOMElement = $("<p class = 'element'></p>");

  var $tag = $("<span class = 'attribute tag'></span>");
  var $id = $("<span class = 'attribute id'></span>");
  var $classes = $("<span class = 'attribute classes'></span>");
  var $name = $("<span class = 'attribute name'></span>");

  if(element !== undefined && element !== null && element !== ""){
    var tag = element.tagName.toLowerCase();
    var id = element.id;
    var classes = getClassesAsString(element.classes);
    var name = element.name;
    var type = element.type.toLowerCase();

    var spacing = "&nbsp;";

    if(tag == "input"){
      $tag.html(returnValueOrNone(tag) + " (" + type + ")");
    }
    else{
      $tag.html(returnValueOrNone(tag));
    }
    $id.html(returnValueOrNone(id));
    $classes.html(returnValueOrNone(classes) + spacing);
    $name.html(returnValueOrNone(name));

    $DOMElement.css("margin-left", (indent * level) + "px");
    $DOMElement.append($tag).append($id).append($classes);
    if(tag === "input"){
      var $input = createInputElement(element.type);

      $DOMElement.append($name);
      $DOMElementWrapper.append($DOMElement);
      $DOMElementWrapper.append($input);
    }
    else{
      $DOMElementWrapper.append($DOMElement);
    }
  }

  return $DOMElementWrapper;
}

function createInputElement(type){
  var $input = $("<input class = 'script-input'>");
  switch(type){
    case "text":
      $input.addClass("text");
      $input.attr("type", "text");
      break;
    case "url":
      $input.addClass("url");
      $input.attr("type", "url");
      break;
    default:
    break;
  }

  return $input;
}

function getClassesAsString(classes){
  var classList = "";

  for(var i = 0; i < classes.length; i++){
    classList += classes[i] + " ";
  }

  return classList != " " ? classList : "n/a";
}

function hideOutput(){
  var $outputWrapper = $(".output-wrapper");
  var $output = $(".output");
  var $inputUrl = $(".input-url");
  var $htmlStructure = $(".html-structure");

  $htmlStructure.empty();
  clearGridlines();

  $output.animate({
    "opacity" : "0"
  }, 100, function(){
    $outputWrapper.animate({
      "height"  : getTotalElementHeight($inputUrl) + "px",
      "left"    : $inputUrl.offset().left,
      "top"     : $inputUrl.offset().top,
      "width"   : getTotalElementWidth($inputUrl) + "px"
    }, 500, function(){
      $outputWrapper.addClass("hidden")
      .removeClass("open");
    });
  });
}

function indentElementByLevel(level, offset){
  var indent = "";

  for(var i = 0; i < level; i++){
    indent += "";
    for(var j = 0; j < offset; j++){
      indent += "&nbsp;";
    }
  }
  return indent;
}

function returnValueOrNone(value){
  return value !== "" ? value : "n/a";
}

function setURLTitle(url){
  $(".url .text").text(url);
}

function showOutput(){
  var body = "";
  var highestLevel = 0;
  var url = $(".input-url-wrapper .input-url").val();

  //url = "example";
  url = "https://www.le.ac.uk/oerresources/bdra/html/page_09.htm";

  if(url === "example"){
    body = new elementObject(document.body);
  }
  else{
    var $response = $(".response");
    $.ajaxPrefilter( function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
        //options.url = "http://cors.corsproxy.io/url=" + options.url;
      }
    });

    $.get(url,
      function (response) {
        response = response.replace(/<img[^>]*>/g, '');
        response = response.replace(/<link[^>]*>/g, '');
        response = response.replace(/<meta[^>]*>/g, '');
        response = response.replace(/<script[^>]*>/g, '');
        response = response.replace(/<\/script[^>]*>/g, '');
        response = response.replace(/<a[^>]*>/g, '<a>');
        $response.html(response);

        body = new elementObject(document.body);
    });
  }

  setURLTitle(url);
  clearGridlines();
  appendHTMLStructure(body, 0, highestLevel);
  appendOutputContainer();
}
