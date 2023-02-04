var creationID = 0;
var creations = [];
var saved = [];
var pageDivs = [
    'saved-div',
    'town-div',
    'castle-div',
    'dungeon-div'
]

function DeleteCreation(creationID) {

    //Delete the div displaying the object
    var div = document.getElementById('outer-div-' + creationID);
    var span = div.parentElement;
    span.removeChild(div);

    //Get rid of the object from the creations and saved lists
    creations = creations.filter(creation => creation[0] != creationID);
    saved = saved.filter(creation => creation[0] != creationID);
    
    //Reset the count on the Saved link
    var savedLink = document.getElementById('savedNav');
    savedLink.textContent = "Saved (" + saved.length.toString() + ")";
}

function CreateSite(siteType, sizeOption='Any') {
    var creation;
    if (siteType == 'Town'){
        creation = new Town(sizeOption);
        display_span = 'town-span';
    }
    //Find the state of the settlement size option
    creations.push([creationID, creation]);
    DisplayCreation(creation, creationID, display_span);
    creationID++;
}
    
function HandleNav(sender) {
    var targetNav = sender.getAttribute('nav');
    pageDivs.forEach((divID) => { 
        var div = document.getElementById(divID); 
        if (divID == targetNav) {
            div.hidden = false;
        }
        else {
            div.hidden = true;
        }
    }); 

    var navLinks = document.getElementsByClassName('nav-link');
    for (var link of navLinks) {
        link.classList.remove('active');
    }
    sender.classList.add('active')
}

function Save(objectID) {
    var foundCreation = creations.find(creation => creation[0] == objectID);
    if (foundCreation != null && !saved.includes(foundCreation)){
        saved.push(foundCreation);
    }
    
    //Remove the creation from its current page and move it to the saved page
    var currentDisplay = document.getElementById('outer-div-' + objectID);
    currentDisplay.parentElement.removeChild(currentDisplay);
    DisplayCreation(foundCreation[1], foundCreation[0], 'saved-creations');    
    
    //Reset the count on the Saved link
    var savedLink = document.getElementById('savedNav');
    savedLink.textContent = "Saved (" + saved.length.toString() + ")";
}
function Download() {
    if (saved.length > 0){
        var data = '';
        for (var row of saved) {
            data += row[1].SummaryString() + "\n\n";
        }
        var element = document.createElement('a');
        data = encodeURIComponent(data);
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
        element.setAttribute('download', 'creations.txt');
        element.click();
    }
}