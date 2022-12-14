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
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex w-full flex-col rounded-md border-2 p-4"
      >
        <textarea
          className="w-full p-4 shadow"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-primary px-4 py-2 text-white"
            type="submit"
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTweet;
