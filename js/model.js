function Roll(maxNumber) {
    return Math.floor(Math.random() * maxNumber) + 1;
}

function RollForEncounterType() {
    const EncounterTypes = ['CASTLE', 'DUNGEON', 'TOWN'];
    return EncounterTypes[Roll(3)];
}

function AorAN(word) {
    return (['A','E','I','O','U'].includes(word[0].toUpperCase()) ? 'an ' : 'a ') + word;
}

function Between(num, min, max) {
    if (num >= min && num <= max) {
        return true;
    }
    else {
        return false;
    }
}

//#region Towns

class Town {
    static sizeTable = [
        ['Outpost', 5, 20],
        ['Hamlet', 21, 100],
        ['Village', 101, 400]
    ];
    static ageTable = [
        [1, 6, 'before the Blood Mist', 300, 1100],
        [7, 11, 'during the Alder Wars', 305, 360],
        [12, 30, 'during the Blood Mist', 5, 280],
        [31, 36, 'after the Blood Mist', 1, 6]
    ];
    static leaderTable = [
        ['Bickering', 'Council'],
        ['Cruel', 'Despot'],
        ['Weak', 'Elder'],
        ['Greedy', 'Mayor'],
        ['Wise', 'Druid'],
        ['Eccentric', 'Sorcerer'],
        ['Confused', 'Anarchy'],
        ['Brutal', 'Commander'],
        ['Cunning', 'Trader'],
        ['Stern', 'Rust Brother'],
        ['Secretive', 'Artisan'],
        ['Drunkard', 'Bandit Chief']
    ];
    static problemTable = [
        "nightwargs",
        "widespread drunkenness",
        "a powerstruggle",
        "a secret cult",
        "a schism",
        "the undead",
        "a disease",
        "a sinkhole",
        "bandits",
        "a monster",
        "raids",
        "a ghost or ghoul"
    ];
    static institutionsTable = [
        [1, 6, "Nothing"],
        [7, 12, "Inn"],
        [13, 17, "Mill"],
        [18, 21, "Smith"],
        [22, 24, "Forester"],
        [25, 27, "Trading Post"],
        [28, 29, "Temple"],
        [30, 32, "Militia"],
        [33, 34, "Tavern"],
        [35, 36, "Stable"]
    ];
    static notorietyTable = [
        "excellent wine",
        "delicious bread",
        "craftsmanship",
        "beautiful location",
        "horrible massacre",
        "decadence",
        "well-brewed beer",
        "hidden riches",
        "strange disappearances",
        "worshipping demons",
        "suspicion of strangers",
        "hospitality"
    ];
    static oddityTable = [
        [1, 3, "has weird clothes"],
        [3, 5, "has an incomprehensible accent"],
        [6, 7, "has a bad smell"],
        [8, 9, "is full of flowers"],
        [10, 11, "is muddy"],
        [12, 13, 'is full of strange building materials'],
        [14, 14, 'has a tent village'],
        [15, 16, 'is built on a steep slope'],
        [17, 17, 'is built around an old tower'],
        [18, 18, 'has a grand building'],
        [19, 21, 'is windy'],
        [22, 22, 'is badly inbred'],
        [23, 24, 'has strange eating habits'],
        [25, 26, 'is built on marshland'],
        [27, 27, 'is carved into a cliff'],
        [28, 29, 'is an ancient burial site'],
        [30, 31, 'is full of wandering cattle'],
        [32, 33, 'is mostly full of women'],
        [34, 35, 'is allied with a monster'],
        [36, 36, 'is preparing for a large wedding']
    ];
    //#region Properties
    pop; 
    size; 
    age; 
    founded; 
    leader; 
    problem;
    notoriety;
    oddity;
    inns  = [];
    temples = [];
    amenities = [];
    //#endregion

    //#region Constructor
    constructor(size="Any") {
        var size_roll = Roll(3);
        if (size == "Outpost"){
            size_roll = 1;
        }
        else if (size == "Hamlet") {
            size_roll = 2;
        }
        else if (size == "Village") {
            size_roll = 3;
        }
        this.RollForTownSize(size_roll);
        this.RollForTownAge(Roll(36));
        this.RollForTownLeader(Roll(12), Roll(12));
        this.RollForTownProblem(Roll(12));
        this.RollForTownNotoriety(Roll(12));
        this.RollForTownOddity(Roll(36));
        this.RollForTownInstitutions();
    } 
    //#endregion

    //#region Methods
    RollForTownSize(roll) {   
        var row = Town.sizeTable[roll-1];
        this.pop = row[1] + Roll(row[2] - row[1]);
        this.size = row[0];
    }

    RollForTownAge(roll) {    
        for (var row of Town.ageTable) {
            if (Between(roll, row[0], row[1])) {
                this.age = row[3] + Roll(row[4] - row[3]);
                this.founded = row[2];
            }
        }
    }

    RollForTownLeader(adjectiveRoll, entityRoll) {  
        var adjective = Town.leaderTable[adjectiveRoll-1][0];
        var entity = Town.leaderTable[entityRoll-1][1];
        this.leader = adjective + ' ' + entity;
    }

    RollForTownProblem(roll) {
        this.problem = Town.problemTable[roll-1];
    }

    RollForTownInstitutions() {
        this.institutions = [];
        var rolls = 0;
        if (this.size == 'Outpost') {
            rolls = 1;
        }
        else if (this.size == 'Hamlet') {
            rolls = 3;
        }
        else {
            rolls = Roll(6) + 5;
        }
        for (var count = 0; count < rolls; count++) {
            var roll = Roll(36);
            for (var row of Town.institutionsTable) {
                if (Between(roll, row[0], row[1])) {
                    if (row[2] == 'Inn'){
                        this.inns.push(new Inn());
                    }
                    else if (row[2] == 'Temple'){
                        this.temples.push(new Temple());
                    }
                    else if (row[2] != 'Nothing') {
                        this.amenities.push(new Amenity(row[2]));
                    }
                }
            }
        }
    }

    RollForTownNotoriety(roll) {
        this.notoriety = Town.notorietyTable[roll-1];
    }

    RollForTownOddity(roll) {
        for (var row of Town.oddityTable) {
            if (Between(roll, row[0], row[1])) {
                this.oddity = row[2];
            }
        }
    }

    SummaryString() {
        var text = `${AorAN(this.size)} with ${this.pop} people, founded ${this.age} years ago ${this.founded}.`
        if (this.amenities.length > 0){
            text += "\nIt has "
            var amenityIndex = 0;
            while (amenityIndex < this.amenities.length) {
                text += this.amenities[amenityIndex].SummaryString();
                if (amenityIndex + 2 == this.amenities.length) {
                    text += ' and ';
                }
                else if (this.amenities.length > 2 && amenityIndex + 1 != this.amenities.length) {
                    text += ', ';
                }
                amenityIndex++;
            }
            text += '.';
        }
        if (this.inns.length > 0){
            for (var inn of this.inns){
                text += "\nIt has " + inn.SummaryString() + ".";
            }
        }
        if (this.temples.length > 0) {
            for (var temple of this.temples){
                text += "\nIt has " + temple.SummaryString() + ".";
            }
        }
            
        return text;
    }
    //#endregion
}

//#endregion

//#region Inns

class Inn {
    static qualitiesTable = [
        [1, 3, 'violence in the air', 'cheap, diluted beer', 'escaped criminal'],
        [4, 5, 'barrels and planks for furniture', 'meat stew', 'unhappy farmer'],
        [6, 8, 'a big fireplace', 'grilled rodent meat', 'scarred treasure hunter'],
        [9, 11, 'pelts on the walls', 'stewed turnips', 'dirty and sullen hunter'],
        [12, 14, 'a long communal table', 'salt bird', 'silent Raven sister'],
        [15, 17, 'a gambling den', 'blood soup', 'noisy bandit'],
        [18, 20, 'a mediocre bard', 'fiery spice wine', 'old veteran'],
        [21, 23, 'a nice dog', 'roasted piglet', 'noble in disguise'],
        [24, 26, 'a grumpy owner', 'swamp stew', 'secretive spellbinder'],
        [27, 28, 'a monster head trophy', 'vegetable mush', 'annoying jester'],
        [29, 30, 'a singing waiter', 'salted fish', 'dusty traveller'],
        [31, 32, 'a stomped floor', 'cooked crow', 'hungry dwarf'],
        [33, 34, 'a birthday party', 'bear stew', 'frosty elf'],
        [35, 36, 'drunk adventurers', 'strong, dwarven ale', 'scouting thief']
    ]

    //#region Properties
    oddity;
    speciality;
    guest;
    //#endregion

    constructor(){
        this.RollForOddity(Roll(36));
        this.RollForSpeciality(Roll(36));
        this.RollForGuest(Roll(36));
    }

    RollForOddity(roll) {
        for (var row of Inn.qualitiesTable){
            if (Between(roll, row[0], row[1])) {
                this.oddity = row[2];
            }
        }
    }

    RollForSpeciality(roll) {
        for (var row of Inn.qualitiesTable){
            if (Between(roll, row[0], row[1])) {
                this.speciality = row[3];
            }
        }
    }

    RollForGuest(roll) {
        for (var row of Inn.qualitiesTable){
            if (Between(roll, row[0], row[1])) {
                this.guest = row[4];
            }
        }
    }

    SummaryString() {
        return `an inn with ${this.speciality}, ${this.oddity}, and a ${this.guest}`
    }
}

class Temple {
    static Faiths = [
        [1, 6, 'the Rust Church'],
        [7, 12, 'the Raven Church'],
        [13, 18, 'the Congregation of the Serpent'],
        [19, 20, 'the Reapenters'],
        [21, 23, 'Huge, the smith'],
        [24, 26, 'Clay, the creator'],
        [27, 29, 'the Order of Maidens'],
        [30, 31, 'Flow, the water goddess'],
        [32, 33, 'Wail, the air and weather goddess'],
        [34, 34, 'the Nightwalker, the god of primordial Chaos'],
        [35, 36, 'Horn, the volcano and god of fire']
    ]

    faith;
    constructor () {
        this.RollForFaith(Roll(36));
    }
    
    RollForFaith(roll){
        for (var row of Temple.Faiths) {
            if (Between(roll, row[0], row[1])) {
                this.faith = row[2];
            }
        }
    }

    SummaryString() {
        return "a temple of " + this.faith;
    }
}

class Amenity {
    type;
    constructor (type) {
        this.type = type;
    }

    SummaryString () {
        return AorAN(this.type);
    }
}

class Dungeon {
    
}