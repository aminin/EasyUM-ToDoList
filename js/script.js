


var cardList = [];
var activeCardList = [];
var boardList = [];
var archive = [];


getBoards();


$(document).ready(function () {

    $('.showModal').click(function () {
        $(this).next().find('input').val('');
        $(this).next().toggleClass('hidden');
    });

    $('#createCard').click(function () {
        if ($(this).closest('.modal_form').find('.card_name').val() != '') {
            createCard(
                $(this).closest('.modal_form').find('.card_name').val(),
                $(this).closest('.modal_form').find('.card_description').val(),
                +$(this).closest('.modal_form').find('.card_id').val()
            );

            $(this).closest('.modal_form').addClass('hidden');
        }
    });

    $('#createBoard').click(function () {
        if ($('.board_name').val() != '') {
            createBoard($('.board_name').val());
            $(this).closest('.modal_form').addClass('hidden');
        }
    });

    $('.custom_input').click(function () {
        $(this).closest('.select').find('.select_list').toggleClass('hidden');
    });

    $('.close-btn').click(function () {
        $(this).closest('.modal_form').addClass('hidden');
    });

    $('#editCard').click(function () {
        let id = $('#edit_card').attr('data-id');
        let card = cardList.find(n => n.id == id);
        card.name = $('#edit_card').find('.card_name').val();
        card.description = $('#edit_card').find('.card_description').val();
        card.goToList($('#edit_card').find('.card_id').val());

        $(this).closest('.modal_form').addClass('hidden');
        render();
    });

    let boardController = new BoardController(BoardModel, new BoardView($));
    boardController.display();

    function createBoard(name) {
        boardController.createBoard(name);
    }
});
