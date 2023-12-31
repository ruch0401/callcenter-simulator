import { chatCompletion } from "../../services/openai"

export async function POST(request) {
    
    const { contents, rating, language } = await request.json()
    
    if (!contents) {
        return new Response('Bad question', {
            status: 400,
        })
    }

    const rate = typeof rating !== 'undefined' ? parseInt(rating) : 0

    const lang = typeof language !== 'undefined' ? parseInt(language) : 0
    
    let text = ''

    try {
        
        let system_prompt = `Evaluate the following conversations between a customer support agent and a customer.\n` +
            `Provide analysis and make suggestion if necessary.\n`

        if(lang > 0) system_prompt += `Please write the reply in Hindi.\n`

        let messages = [
            { role: 'system', content: system_prompt },
        ]

        messages.push({ role: 'user', content: `Customer Rating: ${rate}\n${contents}` })

        text = await chatCompletion({
            messages,
        })

    } catch(err) {
        console.log(err)
    }

    return new Response(JSON.stringify({
        text,
    }), {
        status: 200,
    })

}