import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Completion from "./components/completion";

const schema = z.object({
  key: z.string(),
  models: z.array(z.string()),
  prompt: z.string(),
});

const MODELS = [
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
    value: "tts-1",
    label: "Text to Speech (TTS-1)",
    company: "openai",
  },
  {
    value: "tts-1-1106",
    label: "Text to Speech (TTS-1-1106)",
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
    value: "text-embedding-ada-002",
    label: "Text Embedding Ada 002",
    company: "openai",
  },
  {
    value: "gpt-3.5-turbo-16k",
    label: "GPT-3.5 Turbo 16k",
    company: "openai",
  },
  {
    value: "text-embedding-3-small",
    label: "Text Embedding 3 Small",
    company: "openai",
  },
  {
    value: "text-embedding-3-large",
    label: "Text Embedding 3 Large",
    company: "openai",
  },
  {
    value: "whisper-1",
    label: "Whisper 1",
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
] as const;

function App() {
  const [completions, setCompletions] = useState<
    {
      apiKey: string;
      prompt: string;
      model: string;
    }[]
  >([]);
  const [checkedModels, setCheckedModels] = useState<{
    [key: string]: boolean;
  }>(MODELS.reduce((acc, model) => ({ ...acc, [model.value]: false }), {}));
  function checked(model: string) {
    return checkedModels[model];
  }

  function setChecked(model: string) {
    return () => {
      setCheckedModels((old) => ({ ...old, [model]: !old[model] }));
    };
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { key: "", models: [], prompt: "" },
  });

  const selectedModels = Object.keys(checkedModels).filter(
    (model) => checkedModels[model],
  );

  async function onSubmit(values: z.infer<typeof schema>) {
    if (values.key && values.prompt) {
      const comp = selectedModels.map((model) => ({
        ...values,
        model,
        apiKey: values.key,
      }));
      setCompletions(comp);
    }
  }

  return (
    <div className="container mx-auto pt-36 flex flex-col items-center justify-start gap-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {selectedModels.map((model) => (
            <input type="hidden" name="models" value={model} key={model} />
          ))}
          <FormField
            control={form.control}
            name="models"
            render={() => (
              <FormItem>
                <FormLabel>Models</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      {selectedModels.length > 0
                        ? selectedModels.length + " models selected"
                        : "Select a model"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.map((model) => (
                        <DropdownMenuCheckboxItem
                          key={model.value}
                          checked={checked(model.value)}
                          onCheckedChange={setChecked(model.value)}
                        >
                          {model.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormDescription>
                  Select all the models to compare.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OpenAI Key</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This key is not stored in any way
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What can I cook with these ingredients..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is the prompt to compare</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {completions.length > 0 ? (
        <div className="overflow-x-scroll container">
          <div className="gap-4 flex">
            {completions.map((comp) => (
              <Completion key={comp.model} {...comp} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
