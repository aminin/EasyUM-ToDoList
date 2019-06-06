class Card {
    constructor(name, description, board) {
        this.name = name
        this.description = description;
        this.board = board;
        this.deleted = false;
        this.id = cardList.length;
    }

    drop() {
        this.deleted = true;
        saveApp();
    }

    goToList(code) {
        this.board = code;
        saveApp();
        getBoards();
    }

    setAttr(key, value) {
        let permitted = ['name', 'description'];
        let obj = this;
        permitted.forEach(function (item) {
            if (item == key) {
                obj[key] = value;

            }
        });
        saveApp();
    }
}

class Board {
    constructor(name, id) {
        this.name = name;
        this.deleted = false;
        this.list = [];
        this.id = id;
    }

    drop() {
        this.deleted = true;
        getBoards();
    }
}