// $.on();
// $.off();
// $.one();
// $.trigger();

class Observable {

    constructor(observer) {
        this.observers = [observer];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObeserver() {
        if (this.observers.length > 0) {
            for (let o of this.observers) {
                o.notify('Hello, Observer!');
            }
        }
    }

    subscribeToSomeEvent(subscriber) {
        $(this).on('some-event', subscriber);
    }

    subscribeToOneSomeEvent(subscriber) {
        $(this).one('some-event', subscriber);
    }

    triggerSomeEvent() {
        $(this).trigger('some-event', 'Привет');
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }

    notify(message) {
        console.log(this.name);
        console.log('Observable says: ' + message);
    }
}

observer1 = new Observer('Первый');
observer2 = new Observer('Второй');
observable = new Observable(observer1);
observable.addObserver(observer2);
observable.subscribeToSomeEvent(function(ev, message) {
    console.log(`Третий подписчик ${message}`);
});
observable.subscribeToOneSomeEvent(function(ev, message) {
    console.log(`Четвёртый подписчик ${message}`);
});
observable.subscribeToOneSomeEvent((...args) => { console.log(args); });
