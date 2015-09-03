function collectionToArray(collection) { /*funzione di 'libreria' per convertire htmlcollections in array*/
  var array = []
  for(var i = 0; i < collection.length; ++i) {
    var tmp = collection[i];
    array.push(tmp);
  }
  return array;
}

function getElementByAttrVal(container,attrName,attrVal) {    /* funzione per il match di elementi in base al valore di un attributo */
    var testElements = container.getElementsByTagName('*');
    var elementArray = collectionToArray(testElements);
    var matchingElement;
    for(var i = 0; i < elementArray.length; ++i) {
        var toTest = elementArray[i];
        if(toTest.hasAttribute(attrName)) {
          var testVal = toTest.getAttribute(attrName);
          if(attrVal == testVal) matchingElement = toTest;
        }
    }

    return matchingElement;
}

function addClass(obj,newClass) {   /* funzione per l'aggiunta di una classe CSS */
  var classString = obj.getAttribute('class');
  obj.setAttribute('class',classString+' '+newClass);
}

function removeClass(obj,delClass) { /* funzione per la rimozione di una classe CSS tramite REGEXP */
  var classString = obj.getAttribute('class');
  var pattern = "\\b"+delClass+"\\b";
  var reg = new RegExp(pattern);
  var newClassString = classString.replace(reg,'');
  obj.setAttribute('class',newClassString);
}
