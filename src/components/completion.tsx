import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import Markdown from "react-markdown";

type ChatGPTResponse = {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      refusal: null;
    };
    logprobs: null;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: {
      cached_tokens: number;
    };
    completion_tokens_details: {
      reasoning_tokens: number;
    };
  };
  system_fingerprint: null;
};

export default function Completion({
  model,
  apiKey,
  prompt,
}: {
  model: string;
  apiKey: string;
  prompt: string;
}) {
  const { mutateAsync, data, error, isPending, submittedAt } = useMutation<
    ChatGPTResponse,
    Error
  >({
    mutationFn: async () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
        }),
      };

      return fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions,
      ).then((response) => response.json());
    },
  });

  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);

  if (error) {
    return (
      <div className="w-64 md:w-80 lg:w-96 rounded-lg p-6 bg-amber-500/50 prose shrink-0">
        <p>{error.message}</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="w-64 md:w-80 lg:w-96 rounded-lg p-6 bg-amber-500/50 prose shrink-0">
        <ShimmerLoading />
      </div>
    );
  }

  return (
    <div className="w-64 md:w-80 lg:w-96 rounded-lg p-6 bg-amber-500/50 prose-invert shrink-0">
      <h3 className="text-xl mb-2">{data?.model}</h3>
      <Markdown>{data?.choices[0].message.content}</Markdown>

      <p className="font-bold mt-2">
        This model costed you: {data?.usage.total_tokens} tokens and took{" "}
        {((Date.now() - submittedAt) / 1000).toFixed(2)} seconds
      </p>
    </div>
  );
}

const loadingSentences = [
  "Warming up the AI circuits...",
  "Sharpening the virtual pencils...",
  "Polishing the algorithmic gears...",
  "Training neurons for your request...",
  "Loading brilliance, please wait...",
  "Summoning intelligent responses...",
  "Connecting to the thinking cloud...",
  "Bringing creativity to life...",
  "Unleashing AI-powered magic...",
  "Thinking deep thoughts for you...",
];

function ShimmerLoading() {
  return (
    <div className="mt-4 max-h-8 overflow-hidden">
      <div
        /** @ts-expect-error we are using css props the proper way */
        style={{ "--loading-steps": loadingSentences.length }}
        className="animate-loading"
      >
        {loadingSentences.map((s) => (
          <p
            /** @ts-expect-error we are using css props the proper way */
            style={{ "--to": s.length }}
            className="h-8 m-0 relative overflow-hidden thinking w-max text-gray-600"
            key={s}
          >
            {s}
          </p>
        ))}
      </div>
    </div>
  );
}
