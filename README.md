# Тестовое задание STM Labs: Таблица пользователей с фильтрацией

## Описание проекта

Этот проект представляет собой тестовое задание для компании STM Labs. Задача заключается в реализации таблицы пользователей с возможностью фильтрации по имени.

По заданию требуется реализовать следующие компоненты:

- [x] Индикатор загрузки
- [x] Фильтр по имени пользователя – поле ввода + кнопка сброса
- [x] Таблица с пользователями

В качестве сервера использовать сервис https://randomuser.me/api/?results=15

## Использованные технологии

- React
- TypeScript
- Vite
- ESLint

## Установка и настройка

### Требования

- Node.js (версия 14 или выше)
- Yarn или npm (менеджер пакетов)

### Установка

Вы можете настроить этот проект, используя либо Yarn, либо npm. Выберите предпочтительный для вас метод.

#### Использование Yarn

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/hongHONK/stm-test-task.git
   ```

2. Установите зависимости:

   ```bash
   yarn install
   ```

3. Запустите сервер разработки:

   ```bash
   yarn dev
   ```

4. Откройте браузер и перейдите по адресу http://localhost:5173, чтобы увидеть приложение.

#### Использование npm

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/hongHONK/stm-test-task.git
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите сервер разработки:

   ```bash
   npm run dev
   ```

4. Откройте браузер и перейдите по адресу http://localhost:5173, чтобы увидеть приложение.

### Сборка для продакшена

Для сборки проекта для продакшена выполните:

```bash
yarn build
```

или

```bash
npm run build
```

Собранные файлы будут находиться в директории `dist`, готовые к развертыванию.

### Дополнительные команды

- Проверка кода с помощью линтера:

  - Yarn: `yarn lint`
  - npm: `npm run lint`

- Предварительный просмотр продакшен-сборки:
  - Yarn: `yarn preview`
  - npm: `npm run preview`

## Компоненты

### Компонент App

Это главный компонент приложения. Он хранит в себе данные о текущем поисковом запросе,
обрабатывает загрузку и хранение данных с сервера, а также отрисовывает основные компоненты пользовательского интерфейса.

#### Состояния:

- searchQuery: string - Хранит текущий поисковый запрос, введенный пользователем.
- users: UserState - Объект, содержащий следующие свойства:
  - data: User[] - Массив объектов пользователей.
  - isLoaded: boolean - Указывает, загружены ли данные.
  - error: null | Error - Хранит ошибку, если она возникла при загрузке данных.

#### Эффекты:

- Загружает данные пользователей из API при первичном рендере.
- Использует `AbortController` для отмены запроса, если компонент размонтируется до завершения запроса.

### Компонент Loader

Этот компонент отображает индикатор загрузки. Используется для визуального отображения процесса загрузки.

#### Пример использования:

```jsx
import React from "react";
import { Loader } from "./components/loader/Loader";

function MyComponent() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Имитация асинхронной операции
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return <div>{isLoading ? <Loader /> : <p>Данные загружены!</p>}</div>;
}
```

### Компонент SearchInput

Этот компонент представляет собой форму поиска с полем ввода и кнопкой сброса.
Он использует debounce для оптимизации производительности при вводе текста.

#### Props:

- className: string - Дополнительный CSS класс для формы поиска.
- setSerchQwery: function - Функция для установки поискового запроса в родительском компоненте.

#### Особенности:

- Использует кастомный хук `useDebounce` для задержки обновления поискового запроса.

#### Пример использования:

```jsx
import React from "react";
import { SearchInput } from "./components/search-input/SearchInput";

function MyComponent() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div>
      <h2>Поиск пользователей</h2>
      <SearchInput className="custom-search" setSerchQwery={setSearchQwery} />
      <p>Текущий поисковый запрос: {searchQuery}</p>
    </div>
  );
}
```

### Компонент UsersTable

Этот компонент отображает таблицу пользователей с их данными.

#### Props:

- className?: string - Дополнительный CSS класс для таблицы.
- data: User[] - Массив объектов пользователей для отображения.

#### Особенности:

- Использует компонент WithTooltipImg для отображения изображений пользователей с всплывающей подсказкой.
- Форматирует дату регистрации с помощью функции formatDate.

#### Пример использования:

```jsx
import React from "react";
import { UsersTable } from "./components/users-table/UsersTable";

function MyComponent() {
  const users = [
    {
      login: { uuid: "123e4567-e89b-12d3-a456-426614174000" },
      name: { first: "John", last: "Doe" },
      picture: {
        thumbnail: "https://example.com/thumbnail.jpg",
        medium: "https://example.com/medium.jpg",
      },
      location: { state: "California", city: "Los Angeles" },
      email: "john@example.com",
      phone: "123-456-7890",
      registered: { date: "2021-01-01T00:00:00Z" },
    },
    // ... другие пользователи
  ];

  return (
    <div>
      <h2>Таблица пользователей</h2>
      <UsersTable className="custom-table" data={users} />
    </div>
  );
}
```

## HOC (Higher-Order Components)

### withTooltip

`withTooltip` - это HOC, который добавляет функциональность всплывающей подсказки к любому компоненту.

#### Props

- `WrappedComponent: ComponentType<P>` - Компонент, который нужно обернуть
- `tooltipContent: ReactNode` - Содержимое всплывающей подсказки

#### Пример использования

```jsx
import { withTooltip } from "./components/hocs/with-tooltip/withTooltip";

const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const ButtonWithTooltip = withTooltip(Button);

function MyComponent() {
  return (
    <ButtonWithTooltip
      tooltipContent={<span>Это подсказка для кнопки</span>}
      onClick={() => console.log("Кнопка нажата")}
    >
      Наведите на меня
    </ButtonWithTooltip>
  );
}
```

## Вспомогательные функции

### clsx

Функция `clsx` принимает произвольное количество аргументов, которые могут быть строками, `undefined` или `false`, и объединяет все строковые значения в одну строку, разделенную пробелами. Это полезно для динамического формирования классов CSS в компонентах React.

#### Параметры

- `...classes: (string | undefined | false)[]` - Список классов для объединения

#### Возвращаемое значение

Возвращает строку, содержащую все переданные классы, разделенные пробелами. Если передано пустое значение или все значения являются `false` или `undefined`, возвращает пустую строку.

#### Пример использования

```jsx
import clsx from "../utils/clsx";

function MyComponent({ isActive, isDisabled, customClass }) {
  return (
    <div
      className={clsx(
        "base-class",
        isActive && "active",
        isDisabled && "disabled",
        customClass
      )}
    >
      Содержимое компонента
    </div>
  );
}
```

### formatDate

Функция `formatDate` принимает строку с датой в формате ISO 8601 и преобразует ее в строку с датой в формате "ДД.ММ.ГГГГ".

#### Параметры

- `dateString: string` - Строка с датой в формате ISO 8601 (например, "2023-06-15T10:30:00Z")

#### Возвращаемое значение

Возвращает строку с отформатированной датой в формате "ДД.ММ.ГГГГ".

#### Пример использования

```typescript
import formatDate from "../utils/formatDate";

const isoDate = "2023-06-15T10:30:00Z";
const formattedDate = formatDate(isoDate);
console.log(formattedDate); // Выведет: "15.06.2023"
```

## Типы данных

```typescript
type User = {
  name: {
    first: string;
    last: string;
  };
  location: {
    state: string;
    city: string;
  };
  email: string;
  phone: string;
  registered: {
    date: string;
  };
  picture: {
    thumbnail: string;
    medium: string;
  };
  login: {
    uuid: string;
  };
};
```
