import { CollectionConfig } from "payload";
import { generateUsernameHook } from "./hooks/generate-username-hooks";

export const ArticleAuthors: CollectionConfig = {
    slug: 'article-authors',
    fields: [
        {
            name: "avatar",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "username",
            type: "text",
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [generateUsernameHook],
            },
        },
        {
            name: "role",
            type: "select",
            options: [
                "Guest Writer",
                "Human Writer",
                "Super Human Writer",
                "AI Writer",
                "Editor",
                "Admin",
            ],
            defaultValue: "Guest Writer",
            required: true,
        }
    ]
}