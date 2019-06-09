/**
 * @see https://learn.javascript.ru/array-methods
 * @see https://learn.javascript.ru/array
 */
class Collection {

    constructor(url, modelClass) {
        this.url = url;
        this.modelClass = modelClass;
        this.models = [];
    }

    attrNames() {
        /** @see https://learn.javascript.ru/set-map */
        let attrNames = new Set(['id']);
        if (this.modelClass.attrNames()) {
            this.modelClass.attrNames().forEach((attrName) => attrNames.add(attrName));
        }
        return attrNames;
    }

    create(data) {
        let newModel = new this.modelClass;
        /** @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...of */
        for (let attrName of this.attrNames()) {
            /** @see https://learn.javascript.ru/object */
            newModel[attrName] = data[attrName];
        }
        return newModel;
    }

    load() {
        let me = this;
        this.clear();
        $.get(this.url, function (data) {
            for (let datum of data) {
                me.add(me.create(datum));
            }
            $(me).trigger('load_complete');
        });
    }

    save() {
        let data = this.models.map((m) => m.toJSON());
        $.ajax({
            type: 'POST',
            url: this.url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            processData: false
        });
    }

    find(id) {
        return this.models.find(function (model) {
            return model.id == id;
        });
    }

    findIndex(id) {
        return this.models.findIndex(function (model) {
            return model.id == id;
        });
    }

    add(model) {
        if (model.id != null && -1 !== this.findIndex(model.id)) {
            return;
        }
        if (model.id == null) {
            model.id = this.maxId() + 1;
        }
        this.models.push(model);
    }

    remove(model) {
        if (model.id != null && 1 !== this.findIndex(model.id)) {
            this.models.splice(this.findIndex(model.id), 1);
        }
    }

    clear() {
        if (Array.isArray(this.models)) {
            while (this.models.length > 0) {
                let model = this.models.pop();
                if ('function' === typeof model.destroy) {
                    model.destroy();
                }
            }
        }
    }

    maxId() {
        /** @see https://learn.javascript.ru/es-function */
        return this.models.reduce((a, b) => Math.max(a, b.id), 0)
    }
}

class Model {
    static load() {
        this.collection.load();
    }

    static save() {
        this.collection.save();
    }

    static on(event, callback) {
        $(this.collection).on(event, callback);
    }

    static off(event, callback) {
        $(this.collection).off(event, callback);
    }

    toJSON() {
        let jsonData = {};
        for (let attr of this.constructor.attrNames()) {
            jsonData[attr] = this[attr];
        }
        return jsonData;
    }
}

class CardModel extends Model {
    constructor(name, description, board) {
        super();
        this.name = name;
        this.description = description;
        this.board = board;
        this.deleted = false;
        this.id = cardList.length;
    }

    static attrNames() {
        return this.prototype._attrNames;
    }

    goToList(code) {
        this.board = code;
        getBoards();
    }
}

CardModel.collection = new Collection('/cards', CardModel);
CardModel.prototype._attrNames = new Set(['id', 'name', 'description', 'board', 'deleted']);

class BoardModel extends Model {
    constructor(name, id) {
        super();
        this.name = name;
        this.deleted = false;
        this.list = [];
        this.id = id;
    }

    static attrNames() {
        return this.prototype._attrNames;
    }
}

BoardModel.collection = new Collection('/boards', BoardModel);
BoardModel.prototype._attrNames = new Set(['id', 'name', 'deleted', 'list']);
