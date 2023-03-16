# FINAL PROJECT

This is our final project.

The idea is a shopping list App with catagorizations depending on type.

## INSTALLATION

`pnpm install`
`pnpm run dev`

## FIGMA FILE

Link to the Figma file: https://www.figma.com/file/MwSsIVfA5KQIZCdhIcASnC/Grocery-App?node-id=1%3A4&t=DtQdRXnNpxqWqUqN-1

## BACK_END / get started

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

- ask a team member for .env file contents.

## API REFERENCE

#### Example API backend

```http
  GET /api/items
```

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

###API-ENDPOINTS:
###updateListName.ts
...method: PATCH
...must receive:
  id: [id of the list as string]
  newName: [the newName as string]
via requestBody.

...will return smth. like this if successfull:
  [
  "data updated: ",
  {
    "id": "52d01211-1eb1-403d-9be3-ade3cf91a2f5",
    "listName": "brand new list name",
    "createdAt": "2023-03-15T14:53:45.768Z",
    "userIdentifier": "43b20ffc-ceea-43d5-b08c-9a1a6e4a1f98",
    "favorite": false
  }
]

###seeLists.ts
...Method: GET
...must receive:
   id: [the id of the currently logged in user]
...via http://localhost:3000/api/seeLists?id=43b20ffc-ceea-43d5-b08c-9a1a6e4a1f98
...will return 

###changeCategory.ts
...Method: PATCH
...must receive:
  id
  targetGategoryId
via request-body.
...will then pick then update the customCategoryId of Item

