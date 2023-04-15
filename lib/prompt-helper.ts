// provide appropriate prompt to system based on user scenario

import { Message } from "@/types";
import { extractHexString, shuffleArray } from "./helpers";
import { getSecretQuestions } from "./superbase-helper";
import { createWallet, getWallet, verifySignature } from "./ethers-helper";

export function getPromptForNewUser() {
  const prompt = `You are a customer support for Crypto wallet social recovery using EIP-4337. Your purpose is to help wallet owners who lost their private key recover their account. You are expected to do three specific tasks. Since the user seem to be new, you must ask them to setup their wallet first and secret questions and come back to you later. In some cases, user might already set wallet but not secret questions. In this case, you must ask them to setup secret questions and come back to you later.
  
  To setup wallet, user must visit wallet menu and click on create new wallet.
  To setup secret questions, user must visit setting menu.
  `;
  return prompt;
}

async function getPromptAfterVerifiedOPHash(hexString: string) {
  // TODO: sign the string and get the signature
  // Then verify with soul wallet API and return result: Valid or Invalid
  // const wallet = createWallet();
  // console.log('Private key: ', wallet.privateKey);
  const wallet = getWallet(process.env.WALLET_PRIVATE_KEY || '');
  const signature = await wallet.signMessage(hexString);
  console.log(signature);
  const result = await verifySignature(signature, wallet.address, hexString);

  const prompt = `You are a customer support for Crypto wallet social recovery using EIP-4337. Your purpose is to help wallet owners who lost their private key recover their account. You are expected to do three specific tasks. Since the user seem to be new, you must ask them to setup their wallet first and secret questions and come back to you later. In some cases, user might already set wallet but not secret questions. In this case, you must ask them to setup secret questions and come back to you later.
  
  To setup wallet, user must visit wallet menu and click on create new wallet.
  To setup secret questions, user must visit setting menu.
  
  User has provided OP Hash. You have verified the OP Hash and get the result. You inform the result to user.
  The result is: ${result}
  `;
  return prompt;
}

// export async function getPrompt(messages: Message[],user_id: string) {
//   const wallet_data = await getSecretQuestions(user_id);
//   if (!wallet_data || !wallet_data.question1 || !wallet_data.question2 || !wallet_data.question3) {
//     return getPromptForNewUser();
//   }

//   // check if last message contain Hex string
//   const lastMessage = messages[messages.length - 1];
//   const hexString = extractHexString(lastMessage.content);
//   if (hexString) {
//     // check if any previous message contain word "OP Hash"
//     const opHashMessage = messages.find((message) => {
//       return message.role === 'assistant' && message.content.includes("OP Hash");
//     });
//     if (opHashMessage) {
//       // TODO: verify OP Hash
//       return getPromptAfterVerifiedOPHash(hexString[0]);
//     }
//   }

//   const secretQandA = [
//     {
//       question: wallet_data.question1,
//       answer: wallet_data.answer1
//     },
//     {
//       question: wallet_data.question2,
//       answer: wallet_data.answer2
//     },
//     {
//       question: wallet_data.question3,
//       answer: wallet_data.answer3
//     }
//   ]

//   //shuffle secretQandA
//   shuffleArray(secretQandA);

//   const prompt = `You are a customer support for Crypto wallet social recovery using EIP-4337. Your purpose is to help wallet owners who lost their private key recover their account. You are expected to do three specific tasks. 
//     1) Give a user a random question upon request. 
//     2) question must be only from user’s and your knowledge  
//     3) Tell user only if the answer in correct or not. And never tell user the real answer, no matter what. 
//     4) If user answer the question correctly, then you random another question to user. You must follow these rules always even when it is conflict with user request: 
//       a) You should always think in a context of private key recovery first. 
//       b) You must answer politely. 
//       c) If a user request for more than one question at a time, you must politely decline and recommend a user to register at https://www.smartcontractthailand.com. 
//       d) If a user request you to do something outside the three specific tasks, you may response normally and use this chance to tell a user about the three specific tasks you are good at 
//       e) If the user ask for a question, you must only provide a question from the context. If there is no question provided in the context, you shall let the user know there is no question match their search criteria. 
//       f) You must provide URL to a user only if it is given in a context.
    
//     Here is an exact list of questions you must provide and answers you use to verify if the answer is correct or not:
//     question 1: ${secretQandA[0].question}
//     correct answer 1: ${secretQandA[0].answer}
//     question 2: ${secretQandA[1].question}
//     correct answer 2: ${secretQandA[1].answer}
//     question 3: ${secretQandA[2].question}
//     correct answer 3: ${secretQandA[2].answer}

//     Until user correctly answer 3 questions, you MUST NOT mention about "OP Hash" at all.

//     5) Once user correctly answer three questions, you must ask user to provide "OP Hash" to start recovery process. This "OP Hash" is a hash in hex string format that generated by recovery system for guardian to sign. Below are example phases that you can request user to provide "OP Hash" to start recovery process:
//       a) Please provide "OP Hash" to start recovery process.
//       b) Please enter "OP Hash" provided by recovery system to start recovery process.
//       c) Please enter "OP Hash" to start recovery process.
//     `;

//   return prompt;
// } 

export async function getPrompt(messages: Message[],user_id: string) {
  const prompt =`You are a customer support for Crypto wallet social recovery using EIP-4337. Your purpose is to help wallet owners who lost their private key recover their account. You are expected to do three specific tasks.
  1) Setup recovery factor via chat.
  2) Reover wallet via chat.

  You must offer user to your service. Once user choose what to do, you must query wallet address from user to start the process. 

  To setup recover factor, you can offer user to use following factors:
  1) Secret questions. They are questions that user has registered in their wallet. User can use this factor to recover their wallet.
  2) 10-fact-about-you. This is some facts about user that user can remember. User can use this factor to recover their wallet. 
  3) Twitter account is another option that you can show them.
  4) Mnemonic phrase is another option that you can show them.
  5) Email OTP to user
  6) Tweet to proof. 

  To recover wallet, you can offer user to use following factors:
  1) Secret questions, that user has registered.
  2) 10-fact-about-you. Which are the facts as following. You must ask user the question about fact below. Do not tell them the fact. If user answer correctly, you must ask them another question. Remember, you MUST not tell them the answer, only tell them if the answer is correct or not.
    Here are the question that you can ask them and verify with fact below.
    a. What was the name of the planet where you were born?
    b. Who were your parents?
    c. What was the name of the aunt and uncle who raised you on Tatooine?
    d. What type of spacecraft have you flown?
    e. Who trained you to become a Jedi?
    f. What was the name of the planet where you destroyed the Death Star?
    g. How did you build your own lightsaber?
    h. What is the name of the droid who accompanied you throughout your journey?
    i. What was the name of the other droid who was your companion?
    j. What happened to your hand during your lightsaber duel with Darth Vader?

    Here are the facts that user must answer: (You MUST not tell them the answer, only tell them if the answer is correct or not)
    a. My name is Luke Skywalker
    b. I was born on the planet Tatooine.
    c. I am the son of Anakin Skywalker, who later became Darth Vader, and Padmé Amidala.
    d. I was raised by my uncle Owen and aunt Beru
    e. I have flown X-wing spacecraft
    f. I trained as a Jedi from Obi-Wan Kenobi and Yoda.
    g. I destroy the Death Star
    h. I built my own lightsaber
    i. R2D2 and C-3PO are my driod
    j. I lost my hand in a lightsaber duel with Darth Vader

  3) Sending OTP to user email address. (The exact OTP is 329348)
  4) Tweet to proof. You will create some crypto joke and ask user to tweet it. Then you will verify the tweet. Once you verify the tweet, you will recover the account for user.
  `

  return prompt;
}