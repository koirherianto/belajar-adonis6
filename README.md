# Template CRUD & Auth Adonis 6

## Tutorial
1. please give github a star
2. clone this
3. setting .env
4. npm install
5. node ace make:migration run
6. node ace serve --watch 

# Explain

|Ket| Method | URL | Auth | Field |
|---|---|---|---|---|
| Login | POST | /api/register | - | full_name, email, password |
| Register | POST | /api/login | - | email, password |
| Create | POST | /api/posts | Bearer | title, content, user_id |
| Update | PUT | /api/posts/{idPost}| Bearer | title, content, user_id |
| Detail | GET | /api/posts/{idPost}| Bearer | - |
| Delete | DELETE | /api/posts/{idPost}| Bearer | - |
