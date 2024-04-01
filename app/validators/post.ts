import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    user_id: vine.number().positive(),
    title: vine.string().trim().minLength(6),
    content: vine.string().trim().minLength(6),
  })
)

/**
 * Validates the post's update action
 */
export const updatePostValidator = vine.compile(
  vine.object({
    user_id: vine.number().positive(),
    title: vine.string().trim().minLength(6),
    content: vine.string().trim().minLength(6),
  })
)

export const idValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)
