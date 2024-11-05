export const MODELS = [
  {
    value: "gpt-4-turbo",
    label: "GPT-4 Turbo",
    company: "openai",
  },
  {
    value: "gpt-4-turbo-2024-04-09",
    label: "GPT-4 Turbo (2024-04-09)",
    company: "openai",
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
    company: "openai",
  },
  {
    value: "chatgpt-4o-latest",
    label: "ChatGPT-4o Latest",
    company: "openai",
  },
  {
    value: "gpt-4-turbo-preview",
    label: "GPT-4 Turbo Preview",
    company: "openai",
  },
  {
    value: "gpt-3.5-turbo-instruct",
    label: "GPT-3.5 Turbo Instruct",
    company: "openai",
  },
  {
    value: "gpt-4-0125-preview",
    label: "GPT-4 0125 Preview",
    company: "openai",
  },
  {
    value: "gpt-3.5-turbo-0125",
    label: "GPT-3.5 Turbo (0125)",
    company: "openai",
  },
  {
    value: "gpt-3.5-turbo",
    label: "GPT-3.5 Turbo",
    company: "openai",
  },
  {
    value: "gpt-4o-realtime-preview-2024-10-01",
    label: "GPT-4o Realtime Preview (2024-10-01)",
    company: "openai",
  },
  {
    value: "gpt-4o-realtime-preview",
    label: "GPT-4o Realtime Preview",
    company: "openai",
  },
  {
    value: "gpt-4o-2024-08-06",
    label: "GPT-4o (2024-08-06)",
    company: "openai",
  },
  {
    value: "gpt-4o-mini",
    label: "GPT-4o Mini",
    company: "openai",
  },
  {
    value: "gpt-4o-2024-05-13",
    label: "GPT-4o (2024-05-13)",
    company: "openai",
  },
  {
    value: "gpt-4o-mini-2024-07-18",
    label: "GPT-4o Mini (2024-07-18)",
    company: "openai",
  },
  {
    value: "gpt-4-1106-preview",
    label: "GPT-4 1106 Preview",
    company: "openai",
  },
  {
    value: "gpt-3.5-turbo-16k",
    label: "GPT-3.5 Turbo 16k",
    company: "openai",
  },
  {
    value: "gpt-4-0613",
    label: "GPT-4 (0613)",
    company: "openai",
  },
  {
    value: "gpt-4",
    label: "GPT-4",
    company: "openai",
  },
  {
    value: "gpt-3.5-turbo-instruct-0914",
    label: "GPT-3.5 Turbo Instruct (0914)",
    company: "openai",
  },
  {
    value: "models/gemini-1.5-flash",
    label: "Gemini 1.5 Flash",
    company: "google",
  },
  {
    value: "models/gemini-1.5-flash-8b",
    label: "Gemini 1.5 Flash-8B",
    company: "google",
  },
  {
    value: "models/gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    company: "google",
  },
  {
    value: "models/gemini-1.0-pro",
    label: "Gemini 1.0 Pro",
    company: "google",
  },
  {
    value: "claude-3-5-sonnet-latest",
    label: "Claude 3.5 Sonnet Latest",
    company: "anthropic",
  },
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet 20241022",
    company: "anthropic",
  },
  {
    value: "claude-3-5-sonnet-20240620",
    label: "Claude 3.5 Sonnet 20240620",
    company: "anthropic",
  },
  {
    value: "claude-3-opus-latest",
    label: "Claude 3 Opus Latest",
    company: "anthropic",
  },
  {
    value: "claude-3-opus-20240229",
    label: "Claude 3 Opus 20240229",
    company: "anthropic",
  },
  {
    value: "claude-3-sonnet-20240229",
    label: "Claude 3 Sonnet 20240229",
    company: "anthropic",
  },
  {
    value: "claude-3-haiku-20240307",
    label: "Claude 3 Haiku 20240307",
    company: "anthropic",
  },
] as const;

export type Model = {
  value: string;
  label: string;
  company: "openai" | "google" | "anthropic";
};

export type CompletionProps = {
  model: string;
  googleKey?: string;
  openaiKey?: string;
  anthropicKey?: string;
  prompt: string;
};

export function isGoogleModel(model: string) {
  return MODELS.find((m) => m.value === model)?.company === "google";
}

export function isOpenAIModel(model: string) {
  return MODELS.find((m) => m.value === model)?.company === "openai";
}

export function isAnthropicModel(model: string) {
  return MODELS.find((m) => m.value === model)?.company === "anthropic";
}
