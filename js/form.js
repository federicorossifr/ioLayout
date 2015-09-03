/* REGEXPS regexp per il matching di particolari input */
var emailReg = /\b[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b/;
var phoneReg = /^([+]39)?((38[{8,9}|0])|(34[{7-9}|0])|(36[6|8|0])|(33[{3-9}|0])|(32[{8,9}]))([\d]{7})$/; /*italy mobile format*/
var dateReg = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/; /* yyyy-mm-dd */
/**********/





function check(form) {  /*FUNZIONE PRINCIPALE per il check di un form */
        /*console.log("Init...");*/

        var global = true; //variabile globale di correttezza del form
        var formInputs = form.children; //ottengo i nodi figli del form
        var inputArray = collectionToArray(formInputs); //converto la collection in array
        var formButton = form.getElementsByClassName('form-submit')[0]; //ottengo il button per il submit del form

        /*console.log(form);
        console.log(inputArray);
        console.log(formButton);*/

        for(var j = 0; j < inputArray.length; ++j ) {
              var thisInput = inputArray[j]; //ciclo i figli in cerca di input da validare
              var inputId = thisInput.getAttribute('id'); //ottengo l'id di un figlio
              var inputHint = getElementByAttrVal(form,'for',inputId); //ottengo l'hint se esiste

              /*console.log(thisInput);
              console.log(inputHint);*/

              var result; //variabile globale per la correttezza dell'input
              var regResult = true; //variabile per il test della REGEXP
              var checkField = thisInput.getAttribute('check'); // ottengo il tipo di campo da valiadre
              var contentField = thisInput.value; //ottengo il contenuto del nodo

              if (checkField != 'submit' && checkField != null) { //se il nodo è da validare e non è il tasto di invio del form
                var nullField = thisInput.getAttribute('null');  //controllo se il campo può assumere valori nulli
                  switch (checkField) {  //scelgo la REGEXP adatta
                      case 'email':
                          regResult = emailReg.test(contentField);
                          break;
                      case 'date' :
                          regResult = dateReg.test(contentField);
                          break;
                      case 'phone' :
                          regResult = phoneReg.test(contentField);
                          break;
                      default :
                          regResult = true;
                  }


                  if (nullField == 'no')  result = regResult && (contentField != ''); // se il campo deve essere nonnullo
                  else result = regResult || (contentField = '');                      // sia la regexp che il controllo sul campo
                                                                                     // devono essere true
                                                                                    //se il campo può essere nullo
                                                                                    // O risulta nullo, altrimenti la regexp deve essere true

                  if (!result) {  //se il risultato globale dell'input è false
                      formButton.setAttribute('disabled', 'disabled'); //disattivo il pulsante di invio form
                      addClass(thisInput,'hasError'); //aggiungo segnali di errore
                      removeClass(thisInput,'hasSuccess'); //
                      inputHint.style.borderColor = 'red'; //
                      inputHint.style.color = 'red'; //
                      global = false; //pongo a false la validità dell'intero form
                  }
                  else { //altrimenti, se l'input è valido
                      addClass(thisInput,'hasSuccess'); //aggiungo segnali di successo
                      removeClass(thisInput,'hasError');
                      inputHint.style.borderColor = 'green';
                      inputHint.style.color = 'green';
                  }
              }
        }
        if(global) formButton.removeAttribute('disabled'); //se ogni input del form ha esito positivo, global sarà true,
                                                          // quindi si rende disponibile il pulsante di invio form

}



var formChecks = document.getElementsByClassName('hasChecks');  // ottengo tutti i form che necessitano validazione
var MyformArray = collectionToArray(formChecks); // converto la collection in array



for(var i = 0; i < MyformArray.length; ++i) {  //per ogni form da validare
    var form = MyformArray[i];
    check(form); //eseguo una validazione iniziale
    var formChildren = form.children; // ottengo i nodi figli
    var childrenArray = collectionToArray(formChildren); // converto in array
    for(var j = 0; j < childrenArray.length; ++j) { // per ogni nodo figlio
        var child = childrenArray[j];
        child.addEventListener('input',function() {check(form);}); //aggiungo eventi per la modifica del figlio
        child.addEventListener('propertychange',function() {check(form);});// in modo da richiamare la funzione principale ad ogni
                                                                          //modifica di uno degli input del form
    }
}
