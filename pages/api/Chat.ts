import { Message } from "@/types";
import { OpenAIStream } from "@/utils";
import { getTokenInfo } from "@/lib/cookie-parser";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  const info = getTokenInfo(req);
  const { sub, email } = info;
  console.log(sub, email);
  if (!sub || !email) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { messages } = (await req.json()) as {
      messages: Message[];
    };

    const charLimit = 12000;
    let charCount = 0;
    let messagesToSend = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (charCount + message.content.length > charLimit) {
        break;
      }
      charCount += message.content.length;
      messagesToSend.push(message);
    }

    const stream = await OpenAIStream(messagesToSend, sub);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;