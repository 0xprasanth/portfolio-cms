import type { CollectionConfig } from 'payload'
import { generateBlurDataUrl, isEligibleForBlurDataUrl } from './helper/generate-blur-data-url';

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'blurDataUrl',
            type: 'text',
            required: true,
            admin: {
                hidden: true
            }
        },
        
    ],
    upload: true,
    hooks: {
        beforeChange: [
            async ({ data, req , operation}) => {
                if (operation !== 'create')  return data;
                // 1. check for eligibility
                if(!isEligibleForBlurDataUrl(req.file?.mimetype)) return data;
                // 2. if eligible, generate blurDataUrl
                const base64 = await generateBlurDataUrl(req.file?.data);
                if(!base64) return data;
                // 3. set it to data.blurDataUrl
                data.blurDataUrl = base64;
                console.log('Generated blurDataUrl for', data.filename);
                // 4. return data
                return data;
            }
        ]
    }
}
