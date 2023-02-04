function DisplayCreation(creation,creationID,targetDivID) {
    //Locate the span that we'll attach to on the page
    var span = document.getElementById(targetDivID);

    //Create the elements we'll use
    var div = document.createElement('div');
    var delete_creation = document.createElement('button');
    var creation_paragraph = document.createElement('p');
    span.prepend(div);
    div.appendChild(delete_creation);

    //Is this a saved item?
    if (targetDivID.slice(0,5) != 'saved') {
        var save_creation = document.createElement('button');
        save_creation.textContent = "Save";
        save_creation.setAttribute('class', 'save-button');
        save_creation.setAttribute('onclick', `Save('${creationID}')`)
        div.appendChild(save_creation);
    }

    div.appendChild(creation_paragraph);
    
    //Configure the outer div and the close button
    div.setAttribute('class','town');
    div.setAttribute('id','outer-div-' + creationID);
    delete_creation.setAttribute('class', 'x-button');
    delete_creation.textContent = "X";
    delete_creation.setAttribute('onclick',`DeleteCreation('${creationID}')`);
    
    
    //Get the text from our creation
    creation_paragraph.textContent = creation.SummaryString();
}