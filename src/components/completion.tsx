import {
  CompletionProps,
  isAnthropicModel,
  isGoogleModel,
  isOpenAIModel,
} from "@/lib/models";
import { useMutation } from "@tanstack/react-query";
import { CoreTool, generateText, GenerateTextResult } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { createAnthropic } from "@ai-sdk/anthropic";

export default function Completion({
  model,
  googleKey,
  openaiKey,
  anthropicKey,
  prompt,
}: CompletionProps) {
  const { mutateAsync, data, error, isPending, submittedAt } = useMutation<
    GenerateTextResult<Record<string, CoreTool>>,
    Error
  >({
    mutationFn: async () => {
      if (isGoogleModel(model)) {
        const google = createGoogleGenerativeAI({
          apiKey: googleKey,
        });

        return generateText({
          model: google(model),
          prompt,
        });
      }

      if (isOpenAIModel(model)) {
        const openai = createOpenAI({
          apiKey: openaiKey,
        });
        return generateText({
          model: openai(model),
          prompt,
        });
      }

      if (isAnthropicModel(model)) {
        const anthropic = createAnthropic({
          apiKey: anthropicKey,
          headers: {
            "anthropic-dangerous-direct-browser-access": "true",
          },
        });

        return generateText({
          model: anthropic(model),
          prompt,
        });
      }

      throw new Error("Should never reach");
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
      <h3 className="text-xl mb-2">{data?.response.modelId}</h3>
      <Markdown>{data?.text}</Markdown>

      <p className="font-bold mt-2">
        This model costed you: {data?.usage.totalTokens} tokens and took{" "}
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
