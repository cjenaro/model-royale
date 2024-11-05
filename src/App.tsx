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
import { CompletionProps, Model, MODELS } from "./lib/models";
import { Link } from "react-router-dom";

const schema = z.object({
  openAiKey: z.string().optional(),
  googleKey: z.string().optional(),
  anthropicKey: z.string().optional(),
  models: z.array(z.string()),
  prompt: z.string(),
});

function isCompanySelected(
  company: Model["company"],
  models: {
    [key: string]: Model & { checked: boolean };
  },
) {
  return Object.keys(models).some(
    (key) => company === models[key].company && models[key].checked,
  );
}

function App() {
  const [completions, setCompletions] = useState<CompletionProps[]>([]);
  const [checkedModels, setCheckedModels] = useState<{
    [key: string]: Model & { checked: boolean };
  }>(
    MODELS.reduce(
      (acc, model) => ({ ...acc, [model.value]: { ...model, checked: false } }),
      {},
    ),
  );
  const isOpenAIChecked = isCompanySelected("openai", checkedModels);
  const isGoogleChecked = isCompanySelected("google", checkedModels);
  const isAnthropicChecked = isCompanySelected("anthropic", checkedModels);

  function checked(model: string) {
    return checkedModels[model].checked;
  }

  function setChecked(model: string) {
    return () => {
      setCheckedModels((old) => ({
        ...old,
        [model]: { ...old[model], checked: !old[model].checked },
      }));
    };
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { openAiKey: "", models: [], prompt: "" },
  });

  const selectedModels = Object.keys(checkedModels).filter(
    (model) => checkedModels[model].checked,
  );

  async function onSubmit(values: z.infer<typeof schema>) {
    if (isOpenAIChecked && !values.openAiKey) {
      form.setError(
        "openAiKey",
        { message: "OpenAI key is required when using OpenAI models" },
        { shouldFocus: true },
      );
      return;
    }

    if (isGoogleChecked && !values.googleKey) {
      form.setError(
        "googleKey",
        { message: "Google key is required when using Google models" },
        { shouldFocus: true },
      );
      return;
    }

    if (isAnthropicChecked && !values.anthropicKey) {
      form.setError(
        "anthropicKey",
        { message: "Anthropic key is required when using Anthropic models" },
        { shouldFocus: true },
      );
      return;
    }

    if (values.prompt) {
      const comp = selectedModels.map((model) => ({
        ...values,
        model,
        openaiKey: values.openAiKey,
        googleKey: values.googleKey,
        anthropicKey: values.anthropicKey,
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
                    <DropdownMenuContent className="overflow-y-scroll max-h-96">
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
          {isOpenAIChecked ? (
            <FormField
              control={form.control}
              name="openAiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAI Key</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    This key is not stored in any way
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          {isGoogleChecked ? (
            <FormField
              control={form.control}
              name="googleKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Key</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    This key is not stored in any way
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          {isAnthropicChecked ? (
            <FormField
              control={form.control}
              name="anthropicKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anthropic Key</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    This key is not stored in any way
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
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
          <div className="gap-4 flex mb-4">
            {completions.map((comp) => (
              <Completion
                key={comp.model + form.formState.submitCount}
                {...comp}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;

export function AppErrorElement() {
  return (
    <div className="container mx-auto pt-36 flex flex-col items-center justify-start gap-10">
      <h2>There was an unexpected error :(</h2>
      <Link to="/app">&larr; go back</Link>
    </div>
  );
}
