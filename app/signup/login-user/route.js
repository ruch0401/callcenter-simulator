import {MongoClient} from 'mongodb'

const client = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

export async function POST(request) {
    const userLoginInfo = await request.json()
    console.log('User to search for: ', userLoginInfo);
    let items = []
    try {
        await client.connect()
        const db = client.db()
        items = await db.collection('users').find({
            $and: [
                { email: userLoginInfo.email },
                { password: userLoginInfo.password }
            ]
        }).toArray()
        console.log('Filtered items are: ', items);
        if (items.length === 0) {
            return new Response(JSON.stringify({
                message: 'No user found with the given email and password',
            }), {
                status: 404,
            });
        }

        if (items.length > 1) {
            return new Response(JSON.stringify({
                message: 'More than one user found with the given email and password',
            }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({
            message: 'Login Successful!',
        }), {
            status: 200,
        });
    } finally {
        await client.close()
    }

    return new Response(JSON.stringify({
        items,
    }), {
        status: 200,
    })
}