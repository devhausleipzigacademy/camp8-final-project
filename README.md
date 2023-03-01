# FINAL PROJECT

This is our final project.

The idea is a shopping list App with catagorizations depending on type.

## INSTALLATION

`pnpm install`
`pnpm run dev`

## FIGMA FILE

Link to the Figma file: https://www.figma.com/file/MwSsIVfA5KQIZCdhIcASnC/Grocery-App?node-id=1%3A4&t=DtQdRXnNpxqWqUqN-1

## COLOR REFERENCES

| Color         | Hex                                                              |
| ------------- | ---------------------------------------------------------------- |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |

## BACK_END

0. Make sure You have an .env file in root-Folder \* (!)

1. Stop other projects in Docker, if any are running.

2. Docker (requires to start the docker Application)
   `docker compose up -d`

3. Prototype your schema according to :
   `pnpx prisma db push`

4. To run .ts files (Endpoints) do nothing, next.js runs server.ts automatically due to the folder structure. All Zod filters should be at the bottom of their respective endpoints since each one is unique (or al least nearly)

5. To run prisma browser-interface :
   `pnpx prisma studio`

6. To add JSON data to prisma db run:
   `pnpm prisma db seed`
   This will run the seed.ts script

- .env must contain:

````
POSTGRES_USER=local_admin
POSTGRES_PASSWORD=unsafeLocalPassword0!

POSTGRES_HOST=localhost
POSTGRES_PORT=5432

POSTGRES_DB=main

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public&connect_timeout=300

SECRET_KEY=44fc12b9ef6f22f18ae6507e33ebc52e77f745fef6422a44a654886557ce015fef605917f919db105e63353388becd09
````

## API REFERENCE

#### Example API backend

```http
  GET /api/items
````

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

```http
  POST /api/addItem
```

| Body                 | Type               | Description                                                                                        |
| :------------------- | :----------------- | :------------------------------------------------------------------------------------------------- |
| `query`, `inputList` | `string`, `string` | query is the item you want to add to a list. inputList is the ID of the list you want to add it to |

Possible responses from system:

-201 Item was added to list in category Other.

-405 Item was already added to list.

-200 Item added to list correctly.

#### add(num1, num2)

Takes two numbers and returns the sum.