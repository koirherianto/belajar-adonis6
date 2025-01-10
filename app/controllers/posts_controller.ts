import Post from '#models/post'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createPostValidator, updatePostValidator } from '#validators/post'

export default class PostsController {
  async index({ response }: HttpContext) {
    const currentUser = response.ctx!.auth.user

    const posts = await currentUser!.related('posts').query()

    response.status(200).json({
      success: true,
      data: posts,
    })
  }

  async create({ request, response }: HttpContext) {
    await request.validateUsing(createPostValidator)

    const userId = response.ctx!.auth.user!.id
    const title = request.input('title')
    const content = request.input('content')

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const post = await Post.create({
      userId,
      title,
      content,
    })

    return response.status(201).json({
      success: true,
      data: post,
    })
  }

  async getById({ response, params }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    response.status(200).json({
      success: true,
      data: post,
    })
  }

  async update({ request, response, params }: HttpContext) {
    await request.validateUsing(updatePostValidator)

    const { title, content } = request.only(['title', 'content'])
    const userId = request.input('user_id') // ambil data lewat parameter
    // const userId = response.ctx!.auth.user!.id

    const user = await User.find(userId)

    if (!user) {
      response.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    const post = await Post.find(params.id)

    if (!post) {
      response.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    post.title = title
    post.content = content
    post.userId = userId

    await post.save()

    response.status(200).json({
      success: true,
      data: post,
    })
  }

  async delete({ response, params }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    await post.delete()

    response.status(200).json({
      success: true,
      data: post,
    })
  }
}
