# Урок 15

## Цели

 - [x] Объекты в JS
 - [x] Замыкания в JS
 
## Про «функциональный» и «объектно-ориентированный» стиль

В прошлом [домашнем задании](https://jsfiddle.net/aminin/j35xfy14/10/) я упомянул 

 - **Функциональный стиль** и
 - **Объектно-ориентированный стиль**

Эти метафоры относятся к конструкторам объектов в JS, не стоит путать их с

 - [Объектно-ориентированным программированием](https://ru.wikipedia.org/wiki/Объектно-ориентированное_программирование) и
 - [Функциональным программированием](https://ru.wikipedia.org/wiki/Функциональное_программирование)

**Классом** в объектно-ориентированной разработке называют шаблон/программный код, 
предназначенный для создания объектов и методов.

В JavaScript классы можно организовать по-разному, используя:

 - **Функциональный стиль**
 - **Прототипный стиль**
 - **Объектно-ориентированный стиль** (настоящие калссы, которые появились в ES6)
 
## Объекты как асоциативные массивы

### Ассоциативные массивы

[Ассоциативный массив](http://ru.wikipedia.org/wiki/Ассоциативный массив) – структура данных, в которой можно хранить любые данные в формате ключ-значение.

### Создание объектов

```javascript
var person = new Object();
var person = {}
```

### Добавление и удаление свойств

```javascript
// Добавление свойтсв
person.name = 'Василий';
person.surname = 'Тёркин';
person.age = 25;

console.log(person);
// Обращение к свойствам через точку
console.log(person.name + ' ' + person.surname);
// Удаление свойств
delete person.age;
console.log(person);
```

### Проверка наличия свойств в объекте

```javascript
// С помощью оператора in
'name' in person; // true
// Результат обращения к насуществующемы свойству — undefined
undefined === person.color // true
undefined !== person.name  // true
// Но, свойство может существовать и иметь значение undefined
person.identity = undefined
// В этом случае оператор in и проверка на undefined дадут разный результат
undefined === person.identity // true — как будто свойства нет
'identity' in person // true — но оно есть
```

### Квадратные скобки

```javascript
// Запсиь и чтение свойств объекта
person['name'] = 'Андрей';
console.log(person['name']);
// Обращение к свойству, имя которого хранитсяв переменной
var attr = 'name';
console.log(person[attr]);
// Свойство с пробелами
person['любимое блюдо'] = 'Утка с яблоками' 
```

### Объявление объекта со свойствами

```javascript
var dish = 'блюдо';
var person = {
    name: 'Андрей',
    // Имя свойства в кавычках
    'surname': 'Тёркин',
    // Имя свойства в двойных кавычках
    "имя отца": 'Василий',
    // Имя свойства в кавычках-апострофах с интерполяцией переменной
    `любимое ${dish}`: 'Утка с яблоками'
};
``` 

### Методы объектов

```javascript
var person = {
    name: 'Василий',
    sayHi: function() {
        console.log('Привет!');
    }
}
```

## Прототипы объектов

У объектов в JavaScript есть свойство `__proto__`, в котором содержится объект-прототип.

```javascript
var foo = { a: 1, b: 2 };
console.log(foo.__proto__); // Какой-то объект
var bar = { x: 42, y: 43, __proto__: foo };
console.log(bar);
console.log(bar.__proto__); // Объект foo
console.log(bar.a); // a = 1
```

В данном примере `bar` прототипно наследует `foo`

```javascript
// Свойства прототипа доступны только для чтения
bar.a = 32; // Создаст новое свойство в bar
delete bar.a; // Не затронет foo.a, удалит bar.b
delete bar.b; // Не затронет foo.b 
```

### Метод hasOwnProperty

Метод hasOwnProperty проверяет является ли свойство собственным.

```javascript
'a' in bar; // true
bar.hasOwnProperty('a'); // false
```

### Создание объекта без `__proto__`

```javascript
// Казалось бы пустой объект
var emptyObj = {};
// На деле сожержит свойства и методы соего прототипа
console.log(emptyObj.toString); // Функция toString
console.log(emptyObj.constructor); // Object
```

Чтобы создать по-настоящему пустой объект, нужно воспользоваться методом `Object.create(null)`

```javascript
var reallyEmptyObj = Object.create(null);
console.log(reallyEmptyObj.__proto__); // null
console.log(reallyEmptyObj.constructor); // undefined
```

## Функции-конструкторы

Конструктором становится любая функция, вызванная через new.

Например:

```javascript
// см. Функциональный стиль конструктора ^
function Person(name) {
    this.name = name;
    this.surname = 'Тёркин';
}

let person = new Person('Василий');
console.log(person);
```

### Возвращаемое значение

```javascript
// При вызове конструктора через new, создаётся новый объект, доступный в конструкторе как this
// Если return отсутсвует, то конструктор возвращает this
// Если в return указан объект, то конструктор возвращает его вместо this
function implicitCounter() {
    let counter = 0;
    return {
        toString: function() {
            return '' + (++counter);
        }
    }
}
```

### Локальные переменные в конструкторе

Будут доступны методам объявленным в конструкторе, но недоступны извне.

```javascript
function implicitCounter() {
    // Локальная переменная
    let counter = 0;
    let incrementCouner = function() {
        return ++counter;
    };
    this.toString = function() {
        return '' + incrementCouner();
    }
}
```

Более подробные примеры с локальными переменными в конструкторе см. в главе [Внутренний и внешний интерфейс](https://learn.javascript.ru/internal-external-interface)

### Пример использования this в методах

```javascript
function implicitCounter() {
    this.counter = 0;
    let me = this;
    // В функции incrementCouner this недоступен или равен window
    // поэтому, вместо него используем me, переданное через замыкание (о замыканиях речь пойдёт ниже)
    let incrementCouner = function() {
        return ++me.counter;
    };
    this.toString = function() {
        return '' + incrementCouner();
    }
}
let cnt = new implicitCounter();
console.log('Один: ' + cnt);
console.log('Два: ' + cnt);
console.log('Три: ' + cnt);
console.log(cnt);
console.log(cnt.counter);
```

## F.prototype

см. «Прототипный стиль конструктора»

При создании объекта через «функцию конструктор», он получает прототип `__proto__` следующего вида:

```javascript
var foo = new Foo();
foo.__proto__ = {
    constructor: Foo,
    // __proto__: [object Object]
};
```

Мы можем изменить прототип содаваемого объекта, через свойство `prototype` конструктора.

```javascript
function Foo() {};
Foo.prototype = {
    constructor: Foo,
    bar: 'Baz'
}

var foo = new Foo();

console.log(foo);
```

### Изменение прототипа существующих объектов

Через свойство F.prototype мы можем менять прототип уже созданных объектов.

```javascript
// Превращение строки в дату
var dateStr = '2019-06-10'; // Объект String
console.log(dateStr.constructor); // String

dateStr.toDate(); // Ошибка -- нет такого метода

String.prototype.toDate = function () {
    return new Date(this);
};

dateStr.toDate(); // Объект Date
```

Пример использования прототипного стиля см. в [коде игры «Жизнь»](https://gist.github.com/aminin/f5eaf875e7a1f38dda5301a2fe31127b)

## Классы ES6

```javascript
// см. Объектно-ориентированный стиль конструктора ^
class Animal {
  constructor(name) {
      this.name = name;
  }
  
  canBreath() {
      return true;
  }
}

class Rabbit extends Animal {
    canJump() {
        return true;
    }
}

// Рыба — класс-потомок животного
class Fish extends Animal {
    canSwim() {
        return true;
    }
}

let fish = new Fish('Форель');
// Метод canBreath унаследован от Animal
console.log(fish.canBreath());
console.log(fish.canSwim());
```

### Геттеры и сеттеры

```javascript
class Person {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
    
    set fullName(fullName) {
        let [name, surname] = fullName.split(' ');
        return `${this.name} ${this.surname}`;
    }
}

// В отличие от функций-конструкторов, класс нельзя вызвать без new
// let person = Person();
let person = new Person('Василий', 'Тёркин');

console.log(person.fullName);
console.log(person.name);
console.log(person.surname);

// Изменит имя и фамилию одновременно
person.fullName = 'Василий Чапаев';
console.log(person.fullName);
console.log(person.name);
console.log(person.surname);
```

### Статические методы

Класс, как и функция, является объектом. Статические свойства класса User – это свойства непосредственно User,
то есть доступные из него «через точку».

Для их объявления используется ключевое слово static.

```javascript
class User {
  constructor(name, surname) {
       this.name = name;
       this.surname = surname;
  }
  
  static createUser() {
      return new User('Василий', 'Чапаев');
  }
}

User.createUser();
```

### Вычисляемые названия методов

```javascript
class TestDynamicMethod {
    ['foo-bar'.toUpperCase()] () {
        return 'baz';
    }
}
```

## Замыкания

[Замыкание](https://ru.wikipedia.org/wiki/Замыкание_(программирование)) — функция первого класса, в теле которой
присутствуют ссылки на свободные переменные. 

[Свободные переменные](https://en.wikipedia.org/wiki/Free_variables_and_bound_variables) — переменные объявленные вне тела функции в окружающем коде и не являющиеся её параметрами.

```javascript
// Простой пример
let name = 'Василий';
function sayHi() {
    console.log(`Привет ${name}`);
}
```

```javascript
// Функция — объект первого класса, а значит может использоваться как возварщаемое значение
function greeter(greeting) {
    // Для этой анонимной функции greeting — свободная переменная.
    return function(name) {
        console.log(`${greeting}, ${name}`);
    }
}
let hi = greeter('Привет');
let goodMorning = greeter('Доброе утро');

hi('Андрей');
goodMorning('Андрей Васильевич');
```

```javascript
// Пример со стрелочными функциями из ES6
const add = x => y => {
  const z = x + y;
  console.log(x + '+' + y + '=' + z);
  return z;
};

const res = add(3)(6); // вернёт 9 и выведет в консоль 3+6=9

console.log(res);
```

### Глобальные переменные, var и ES6

В ES6 нет необходимости использовать `var`, вместо этого следует использовать `let` и `const`.

#### Как создавать глобальные переменные без `var`?

В JS глобавльные переменные — это свойства глобавльного объекта. В браузере глобальный объект — `window`,
а в `node` — `global`.

```javascript
// Объявление переменной var вне тела функции
var foo = 42; // создаёт свойство window.foo
// Аналогично
window.foo = 42;

// Объявление переменной let вне тела функции или блока
let bar = 42; // не создаёт свойство window.bar
// но переменная bar будет видна внутри функций (в контексте замыкания)
// Для создания глобальной переменной без var можно использовать глобальный объект
window.bar = 43;
// или, в node
global.baz = 44;
```
