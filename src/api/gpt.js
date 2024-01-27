export const CallGPT = async( prompt ) => {
    console.log(">>CallGPT");

    //GPT API Call
    /*
    curl https://api.openai.com/v1/chat/completions   -H "Content-Type: application/json"   -H "Authorization: Bearer $OPENAI_API_KEY"   -d '{
        "model": "gpt-3.5-turbo",
        "messages": [
        {
            "role": "system",
            "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."
        },
        {
            "role": "user",
            "content": "Compose a poem that explains the concept of recursion in programming."
        }
        ]
    }'
    */

    /*
## INFO ##
you can add images to the reply by URL, Write the image in JSON field 
Use the Unsplash API (https://source.unsplash.com/1600x900/?). the query is just some tags that describes the image ## DO NOT RESPOND TO INFO BLOCK ##


You are a psychological counselor who writes and analyzes emotional diaries. Proceed in the following order.

1. [title] : Think of the diary title after understanding the [events] separated by """ at the bottom.
2. [summarize] : summarize events in order with one line sentence.
3. [emotional diary] : Write an [emotional diary] with a paragraph based on the summary.
4. [evaluates] : The written emotional [evaluates], using explore the unconscious based on the contents of the [emotional diary].
6. [Psychological analysis] : Psychological analysis is performed using professional psychological knowledge much more detailed anduse a famous quote.
7. [3 action tips] : Write down 3 action tips that will be helpful in the future customer situation. The three action tips must beconverted into JSON Array format.
8. [image] : Create an image by making the contents so far into one keyword.


Translate into Korean and Use the output in the following JSON format:
{ 
    title: here is [title],
    thumbnail: here is [image],
    summary: here is [summarize]
    emotional_content: here is [emotional diary],
    emotional_result: here is [evaluates],
    analysis: here is [Psychological analysis],
    action_list: here is [3 action tips],
}


[events]: 
"""
코딩 강의를 들었다. 프로젝트에 버그가 많이 나왔음. 스택오버플로에서 검색했지만 해결 안되었어.
역시 gpt를 통해서 해결했다. 근데 이렇게 해결하는게 개발실력에 도움 될까..?
"""
    */

    const messages= [
        {
            role : "system", 
            content: `## INFO ##
            you can add images to the reply by URL, Write the image in JSON field 
            Use the Unsplash API (https://source.unsplash.com/1600x900/?). the query is just some tags that describes the image ## DO NOT RESPOND TO INFO BLOCK ##`
        },
        {
            role : "system", 
            content: `You are a psychological counselor who writes and analyzes emotional diaries. Proceed in the following order.`
        },
        {
            role : "user", 
            content: `1. [title] : Think of the diary title after understanding the [events] separated by """ at the bottom.
            2. [summarize] : summarize events in order with one line sentence.
            3. [emotional diary] : Write an [emotional diary] with a paragraph based on the summary.
            4. [evaluates] : The written emotional [evaluates], using explore the unconscious based on the contents of the [emotional diary].
            6. [Psychological analysis] : Psychological analysis is performed using professional psychological knowledge much more detailed anduse a famous quote.
            7. [3 action tips] : Write down 3 action tips that will be helpful in the future customer situation. The three action tips must beconverted into JSON Array format.
            8. [image] : Create an image by making the contents so far into one keyword.
            
            
            Translate into Korean and Use the output in the following JSON format:
            { 
                title: here is [title],
                thumbnail: here is [image],
                summary: here is [summarize]
                emotional_content: here is [emotional diary],
                emotional_result: here is [evaluates],
                analysis: here is [Psychological analysis],
                action_list: here is [3 action tips],
            }`
        },
        {
            role : "user",
            content : `"""
            ${prompt}
            """`
        }
    ]
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
        },
        body : JSON.stringify({
            model : "gpt-3.5-turbo",
            messages,
            temperature : 0.7,
            max_tokens : 1000,
        }),

    });

    const responseData = await response.json();
    console.log(">>responseData", responseData);

    //const message = responseData.choice[0].message.content;
    //현재 
    const message = responseData.error.message;

    return message;
}

