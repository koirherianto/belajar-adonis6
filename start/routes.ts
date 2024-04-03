/* eslint-disable prettier/prettier */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
const PostsController = () => import('#controllers/posts_controller')

// router.get('/', async () => {
//   return {
//     hello: 'world',
//   }
// })

router.group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    router.group(() => {
        router.post('/posts', [PostsController, 'create'])
        router.get('/posts/:id', [PostsController, 'getById'])
        router.put('/posts/:id', [PostsController, 'update'])
        router.delete('/posts/:id', [PostsController, 'delete'])
    }).use(middleware.auth())
}).prefix('api')


router.on('/').render('pages/home')