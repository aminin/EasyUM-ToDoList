# Методы API

## Доски 

### Создать доску

```
POST    /boards
```

### Список досок

```
GET     /boards
```

### Инфо о доске

```
GET     /boards/:id
```

### Удаление доски

```
DELETE  /boards/:id
```

### Список карточек доски

```
/boards/:id/cards
```

## Карточки 

### Создание карточек

```
POST    /boards/:id/cards
```

### Список карточек доски

```
/boards/:id/cards
```

### Инфо о карточке

```
GET /boards/:id/cards/:id
```

### Удаление карточки

```
DELETE /boards/:id/cards/:id
```
