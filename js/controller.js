class BoardController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    dislplay() {
        data = this.model.loadData();
        data = this.model.loadData();
    }
}


function getBoards() {
    getActiveList();
    boardList.forEach(function (item) {
        item.list = activeCardList.filter(n => n['board'] == item.id);
    });
}

function createBoard(name, id) {
    boardList.push(new Board(name, boardList.length));
    saveApp();
    render();
}

function createCard(name, description, board) {
    if (board === undefined) {
        board = 0;
    }
    cardList.push(new Card(name, description, board));
    getBoards();
    saveApp();
    render();
}

function getActiveList() {
    activeCardList = cardList.filter(n => n.deleted == false);
    archiveList = cardList.filter(n => n.deleted == true);
}

function saveApp() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/boards',
        data: JSON.stringify(boardList),
        contentType: 'application/json',
        dataType: 'json'
    });
    console.log(JSON.stringify(cardList));
}
