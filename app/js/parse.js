/* -- objects -- */
function elementObject(element){
  var children = getChildren(element);
  var classes = getClasses(element.className);
  var id = element.getAttribute("id");
  var name = element.getAttribute("name");
  var tagName = element.tagName;
  var type = element.getAttribute("type");

  this.children = children;
  this.classes = classes;
  this.id = setValueOrEmpty(id);
  this.name = setValueOrEmpty(name);
  this.tagName = setValueOrEmpty(tagName);
  this.type = setValueOrEmpty(type);
}
/* -- end objects -- */

function getChildren(element){
  var children = element.childNodes;
  var desiredChildren = new Array();

  if(children !== undefined){
    for(var i = 0; i < children.length; i++){
      var currentChild = children[i];
      if(isDesiredElement(currentChild)){
        desiredChildren.push(new elementObject(currentChild));
      }
    }
  }

  return desiredChildren;
}

function getClasses(classList){ // Returns a list of classes as an array
  var classes = " ";
  if(classList !== undefined){
    var classes = classList.split(" ");
  }
  return classes;
}

function isDesiredElement(element){ // Checks if an element is a valid html element and is not a script
  return (
    typeof HTMLElement === "object" ? element instanceof HTMLElement && element.tagName.toLowerCase() !== "script": //DOM2
    element && typeof element === "object" && element !== null && element.nodeType === 1 && typeof element.nodeName === "string" && element.tagName.toLowerCase() !== "script"
  );
}

function isNotNullOrUndefined(element){ //Checks if an element is null or undefined
  var isNotNullOrUndefined = false;

  if ((typeof(element) !== 'undefined') && (element !== null)) {
    isNotNullOrUndefined =  true;
  }

  return isNotNullOrUndefined;
}

function parseBody(){
  var bodyElements = document.body.children;
  var desiredElementObjects = new Array();

  for(var i = 0; i < bodyElements.length; i++){
    var currentElement = bodyElements[i];
    if(isDesiredElement(currentElement)){
      desiredElementObjects.push(new elementObject(currentElement));
    }
  }

  return desiredElementObjects;
}

function setValueOrEmpty(value){ //Returns the value if its not null/undefined. Otherwise returns an empty string
  if(value instanceof Array){
    return value;
  }
  else{
    return isNotNullOrUndefined(value) ? value : "";
  }
}
