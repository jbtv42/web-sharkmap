const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    const chat = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You're a fun shark expert!" },
        { role: "user", content: body.message },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: chat.data.choices[0].message.content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

