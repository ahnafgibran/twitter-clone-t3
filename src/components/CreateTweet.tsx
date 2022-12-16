import React, { useState } from "react";
import { object, string } from "zod";
import { trpc } from "../utils/trpc";

export const tweetSchema = object({
  text: string({
    required_error: "Tweet text is required",
  })
    .min(10)
    .max(280),
});

const CreateTweet = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const mutation = trpc.tweet.create.useMutation().mutateAsync;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await tweetSchema.parse({ text });
      mutation({ text });
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };
  return (
    <>
      {error && JSON.stringify(error)}
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => setText(e.target.value)} />
        <div>
          <button type="submit">Tweet</button>
        </div>
      </form>
    </>
  );
};

export default CreateTweet;
