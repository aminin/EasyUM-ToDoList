class BoardView {
    constructor($) {
        this.$ = $;
        this.data = [];
    }

    render() {
        const $app = this.$('#app');
        const boardList = this.data;
        $app.empty();

        boardList.forEach(function (element) {
            let cardsHTML = '';

            (element.list || []).forEach(function (element) {
                cardsHTML += '<div class="card" data-id="' + element.id + '">' +
                    '<div class="title">' + element.name + '</div>' +
                    '<div class="description">' + element.description + '</div>' +
                    '</div>';
            });

            $('#app').append(
                '<div class="board" data-name="' + element.name + '" data-id="' + element.id + '">' +
                '<h5 class="nn">' + element.name + '</h5>' +
                cardsHTML +
                '<div class="add-btn"> Создать карточку </div>' +
                '</div>'
            );
        });

        $('.selectBoard .select_list').html('');
        boardList.forEach(function (element) {
            $('.selectBoard .select_list').append(
                '<li data-id="' + element.id + '"data-value="' + element.name + '">' + element.name + '</li>'
            );
        });

        $('.select_list li').click(function () {
            $(this).closest('.select_list').toggleClass('hidden');
            $(this).closest('.select').find('.custom_input').text($(this).data('value'));
            $(this).closest('.select').find('input').val($(this).data('id'));
        });

        $('.add-btn').click(function () {
            var boardID = $(this).closest('.board').data('id');
            var boardName = $(this).closest('.board').data('name');
            $('#create_card').removeClass('hidden');
            $('#create_card input').val('');

            $('#create_card .select .card_id').val(boardID);
            $('#create_card .select .custom_input').text(boardName);
        });

        $('.card').click(function () {
            let id = $(this).data('id');
            let card = cardList.find(n => n.id == id);
            let board = boardList.find(n => n.id == card.board);

            $('#edit_card').attr('data-id', id);
            $('#edit_card').removeClass('hidden');
            $('#edit_card').find('.card_name').val(card.name);
            $('#edit_card').find('.card_description').val(card.description);
            $('#edit_card').find('.card_id').val(board.id);
            $('#edit_card').find('.custom_input').text(board.name);
        })
    }
}
