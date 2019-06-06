# Методы API

## Доски 

### Создание доски

```
POST /boards
```

### Список досок

```
GET /boards
```

### Информация о доске

```
GET /boards/:id
```

### Удаление доски

```
DELETE /boards/:id
```

## Карточки 

### Создание карточек

```
POST /boards/:board_id/cards
```

### Список карточек доски

```
GET  /boards/:board_id/cards
```

### Инфо о карточке

```
GET /boards/:board_id/cards/:id
```

### Удаление карточки

```
DELETE /boards/:board_id/cards/:id
```
