import { getPayload } from 'payload'
import config from '@/payload.config'
import { isDuplicateError } from '../lib/is-duplicate-error'
export async function seedAdmin() {
    const payload = await getPayload({ config })
    try {
        // create first users
        const response = await payload.create({
            collection: 'users',
            data: {
                email: 'admin@arprasanth.com',
                password: 'P@$$w0rd1',
            },
        })
        console.log('Admin user created', response)
    } catch (error) {
        if (!isDuplicateError(error, 'email')) {
            console.log('Admin user already exists')
        } else console.error('Seed Admin Error: ', JSON.stringify(error, null, 2))
    }
}
