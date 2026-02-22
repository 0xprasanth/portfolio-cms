import { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/generate-slug-hooks'
import { generateContentSummaryHook } from './hooks/generate-content-summary-hooks'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';


/**
 * fields
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
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: {
                beforeValidate: [generateContentSummaryHook],
            },
        },
        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
            hooks: {
                beforeChange: [
                    ({ siblingData }) => {
                        delete siblingData.readTimeInMins;
                    }
                ],
                afterRead: [ ({data}) => {
                    // data.content is a LexicalEditorValue object
                    const text = convertLexicalToPlaintext({data: data?.content}).trim();
                    const wordsPerMinute = 200;
                    const words = text.trim().split(/\s+/).length;
                    return Math.max(1, Math.ceil(words / wordsPerMinute));
                }]
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'article-authors',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            options: [
                "Draft",
                "Published",
                "Archived",
            ],
            defaultValue: "Draft",
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            admin: {
                condition: (data) => data?.status === 'Published',
                date: {pickerAppearance: 'dayAndTime'},
            },
        }
    ],
}
 