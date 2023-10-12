import {MongoClient} from 'mongodb'

const client = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

export async function getUsers(request) {

    const {searchParams} = new URL(request.url)
    const user_id = searchParams.get('id')
    console.log('search-params', user_id)

    let users = []

    try {
        await client.connect()
        const db = client.db()
        const raw_items = await db.collection('users').find().toArray()
        users = (!user_id) ? raw_items : raw_items.filter((item) => item.id === user_id)
    } finally {
        await client.close()
    }

    return new Response(JSON.stringify({
        items: users,
    }), {
        status: 200,
    })

}

export async function addUsers(request) {
    const {users} = await request.json()

    try {
        await client.connect()
        const db = client.db()
        const retval = await db.collection('users').insertOne({...users})
        console.log(retval)
    } finally {
        await client.close()
    }

    return new Response(JSON.stringify({
        message: 'Add successful',
    }), {
        status: 200,
    })
}