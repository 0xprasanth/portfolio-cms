import { Article } from '@/payload-types'
import { CollectionConfig, FieldHook } from 'payload'
import { slugify } from 'payload/shared'

const generateSlugHook: FieldHook<Article, string> = ({ value, data }) => {
    if (value) return slugify(value.trim()) || ''
    return slugify(data?.title?.trim() || '') || ''
}

/**
 * fields
 * - title
 * - slug (auto-gen from title)
 * - content (rich-text, WYSIWYG editor)
 * - content_summary (auto-filled from content, for SEO and article cards)
 * - read_time_in_mins (auto-gen content)
 * - cover_image
 * - author (user relations)
 * - status (draft, published)
 * - published_at (only visible when status is published)
 */
export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        { name: 'title', type: 'text', required: true, unique: true },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [generateSlugHook],
            },
        },
    ],
}
