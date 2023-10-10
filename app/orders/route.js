import {MongoClient} from 'mongodb'

const client = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

export async function GET(request) {

    const {searchParams} = new URL(request.url)
    const order_id = searchParams.get('id')
    console.log('search-params', order_id)

    let items = []

    try {
        await client.connect()
        const db = client.db()
        const raw_items = await db.collection('order').find().toArray()
        items = (!order_id) ? raw_items : raw_items.filter((item) => item.id === order_id)
    } finally {
        await client.close()
    }

    return new Response(JSON.stringify({
        items,
    }), {
        status: 200,
    })

}

export async function POST(request) {
    const {order} = await request.json()

    try {
        await client.connect()
        const db = client.db()
        const retval = await db.collection('order').insertOne({...order})
        console.log(retval)

        //const retval = await db.collection('order).deleteOne({ id, payload })
        //retval.deletedCount

        //const retval = await db.collection("order").updateOne({ id }, {$set: neworder });
        //retval.modifiedCount === 0

    } finally {
        await client.close()
    }

    return new Response(JSON.stringify({
        message: 'Add successful',
    }), {
        status: 200,
    })
}