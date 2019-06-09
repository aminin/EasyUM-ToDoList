class BoardController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    display() {
        this.model.on('load_complete', () => {
            this.view.data = this.model.collection.models;
            this.view.render();
        });
        this.model.load();
    }

    createBoard(name) {
        this.model.collection.add(this.model.collection.create({name: name}));
        this.model.save();
        this.view.render();
    }
}


function getBoards() {
    getActiveList();
    boardList.forEach(function (item) {
        item.list = activeCardList.filter(n => n['board'] == item.id);
    });
}

function createBoard(name, id) {
    boardList.push(new BoardModel(name, boardList.length));
    render();
}

function createCard(name, description, board) {
    if (board === undefined) {
        board = 0;
    }
    cardList.push(new CardModel(name, description, board));
    getBoards();
    saveApp();
    render();
}

function getActiveList() {
    activeCardList = cardList.filter(n => n.deleted == false);
    archiveList = cardList.filter(n => n.deleted == true);
}
