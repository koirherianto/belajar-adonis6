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

router.post('/tes', async () => {
  return {
    hello: 'world tes',
  }
})

router.on('/').render('home')


router.group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    router.group(() => {
        router.get('/me', [AuthController, 'me'])

        router.get('/posts', [PostsController, 'index'])
        router.post('/posts', [PostsController, 'create'])
        router.get('/posts/:id', [PostsController, 'getById'])
        router.put('/posts/:id', [PostsController, 'update'])
        router.delete('/posts/:id', [PostsController, 'delete'])
    }).use(middleware.auth())
}).prefix('api')


