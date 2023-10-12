import {MongoClient} from 'mongodb'

const client = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

export async function POST(request) {
    const users = await request.json()
    console.log('Trying to add a user with the following information', users);
    try {
        await client.connect()
        const db = client.db()
        const retval = await db.collection('users').insertOne({ ...users })
        console.log(retval)
        return new Response(JSON.stringify({
            message: 'Successfully added a user to the database',
        }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error inserting data:', error)
        return new Response(JSON.stringify({
            message: 'Error adding data',
            error: error.message,
        }), {
            status: 500, // Internal Server Error
        })
    } finally {
        await client.close()
    }
}