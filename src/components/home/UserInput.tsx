"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetaIcon from "../icons/Meta";
import MixtralIcon from "../icons/Mixtral";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "@/components/ui/switch";
import { generateBio } from "@/app/actions";
import { BioContext } from "@/context/BioContext";

const formSchema = z.object({
  model: z.string().min(1, "Model is required!"),
  temperature: z
    .number()
    .min(0, "Temperature must be at least 0")
    .max(2, "Temperature must be at most 2"),
  content: z
    .string()
    .min(50, "Content should at least have 50 characters.")
    .max(1000, "Content should not exceed 1000 character limit."),
  type: z.enum(["personal", "brand"], {
    errorMap: () => ({ message: "Type is required!" }),
  }),
  tone: z.enum(
    [
      "arrogant",
      "casual",
      "comedy",
      "confident",
      "elegant",
      "epic",
      "friendly",
      "funny",
      "inspirational",
      "motivational",
      "passionate",
      "passive",
      "poetic",
      "professional",
      "quirky",
      "romantic",
      "sarcastic",
      "shocking",
      "silly",
      "thoughtful",
      "witty",
    ],
    {
      errorMap: () => ({ message: "Tone is required!" }),
    }
  ),
  emojis: z.boolean(),
});

const UserInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-8b-8192",
      temperature: 1,
      content: "",
      type: "personal",
      tone: "professional",
      emojis: false,
      // Platform: "LinkedIn",
    },
  });

  const { setOutput, setLoading, loading } = useContext(BioContext);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    setLoading(true);

    const userInputValues = `
    User Input: ${values.content},
    Bio Tone: ${values.tone},
    Bio Type: ${values.type},
    Add Emojis: ${values.emojis},
    `;

    try {
      const { data } = await generateBio(
        userInputValues,
        values.temperature,
        values.model
      );
      //console.log(data);
      setOutput(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col items-start gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6"
        >
          {/* Settings */}
          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            {/* TODO: Model UI */}
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="llama3-8b-8192">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MetaIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Meta Llama 3
                                  </span>
                                  8B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="mixtral-8x7b-32768">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MixtralIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Mixtral
                                  </span>
                                  8x7B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="llama3-70b-8192">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MetaIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Meta Llama 3
                                  </span>
                                  70B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* TODO: Creativity UI*/}
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      <span className="flex items-center justify-center">
                        Creativity
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 ml-1 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={25}
                            collisionPadding={20}
                            className="max-w-sm"
                          >
                            <p>
                              Higher settings create more creative bios, lower
                              settings keep it simple and predictable.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                      <span>{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[1]}
                        min={0}
                        max={2}
                        step={0.01}
                        onValueChange={(val) => onChange(val[0])}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/**/}
            </div>
          </fieldset>

          {/* About input */}
          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="-ml-1 px-1 text-sm font-medium">
              About Yourself
            </legend>

            {/* TODO: Write something */}
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      Who are you?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell me something about yourself..."
                        className="min-h-[10rem]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* TODO: type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="brand">Brand</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TODO: tone */}
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Tone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="arrogant">Arrogant</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="comedy">Comedy</SelectItem>
                        <SelectItem value="confident">Confident</SelectItem>
                        <SelectItem value="elegant">Elegant</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="funny">Funny</SelectItem>
                        <SelectItem value="inspirational">
                          Inspirational
                        </SelectItem>
                        <SelectItem value="motivational">
                          Motivational
                        </SelectItem>
                        <SelectItem value="passionate">Passionate</SelectItem>
                        <SelectItem value="passive">Passive</SelectItem>
                        <SelectItem value="poetic">Poetic</SelectItem>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="quirky">Quirky</SelectItem>
                        <SelectItem value="romantic">Romantic</SelectItem>
                        <SelectItem value="sarcastic">Sarcastic</SelectItem>
                        <SelectItem value="shocking">Shocking</SelectItem>
                        <SelectItem value="silly">Silly</SelectItem>
                        <SelectItem value="thoughtful">Thoughtful</SelectItem>
                        <SelectItem value="witty">Witty</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* TODO: Posted PLatform */}

            {/* TODO: emoji toggle */}
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="emojis"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="text-sm mr-4">Add Emojis</FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="!my-0"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <Button className="rounded" type="submit" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
