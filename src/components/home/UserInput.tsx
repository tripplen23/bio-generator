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
import MetaIcon from "../icons/models/Meta";
import MixtralIcon from "../icons/models/Mixtral";
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
import BadooIcon from "../icons/platforms/Badoo";
import BehanceIcon from "../icons/platforms/Behance";
import DiscordIcon from "../icons/platforms/Discord";
import DribbleIcon from "../icons/platforms/Dribble";
import FacebookIcon from "../icons/platforms/Facebook";
import GitHubIcon from "../icons/platforms/GitHub";
import InstagramIcon from "../icons/platforms/Instagram";
import LinkedInIcon from "../icons/platforms/LinkedIn";
import MediumIcon from "../icons/platforms/Medium";
import OnlyFansIcon from "../icons/platforms/OnlyFans";
import PinterestIcon from "../icons/platforms/Pinterest";
import RedditIcon from "../icons/platforms/Reddit";
import SnapchatIcon from "../icons/platforms/Snapchat";
import SpotifyIcon from "../icons/platforms/Spotify";
import SteamIcon from "../icons/platforms/Steam";
import TelegramIcon from "../icons/platforms/Telegram";
import ThreadsIcon from "../icons/platforms/Threads";
import TikTokIcon from "../icons/platforms/TikTok";
import TinderIcon from "../icons/platforms/Tinder";
import TumblrIcon from "../icons/platforms/Tumblr";
import TwitchIcon from "../icons/platforms/Twitch";
import TwitterIcon from "../icons/platforms/Twitter";
import VimeoIcon from "../icons/platforms/Vimeo";
import WeChatIcon from "../icons/platforms/WeChat";
import WhatsAppIcon from "../icons/platforms/WhatsApp";
import YouTubeIcon from "../icons/platforms/YouTube";
import ZaloIcon from "../icons/platforms/Zalo";

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
      "flirty",
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
  platform: z.enum(
    [
      "Badoo",
      "Behance",
      "Discord",
      "Dribbble",
      "Facebook",
      "GitHub",
      "Instagram",
      "LinkedIn",
      "Medium",
      "OnlyFans",
      "Pinterest",
      "Reddit",
      "Snapchat",
      "Spotify",
      "Steam",
      "Telegram",
      "Threads",
      "TikTok",
      "Tinder",
      "Tumblr",
      "Twitch",
      "Twitter",
      "Vimeo",
      "WeChat",
      "WhatsApp",
      "YouTube",
      "Zalo",
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
      platform: "LinkedIn",
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
    Platform: ${values.platform},
    Add Emojis: ${values.emojis},
    `;

    try {
      const { data } = await generateBio(
        userInputValues,
        values.temperature,
        values.model,
        values.platform
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
                        <SelectItem value="flirty">Flirty</SelectItem>
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

            {/* TODO: PLatform */}
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Badoo">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <BadooIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Badoo
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Behance">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <BehanceIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Behance
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Discord">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <DiscordIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Discord
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Dribble">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <DribbleIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Dribble
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Facebook">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <FacebookIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Facebook
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="GitHub">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <GitHubIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    GitHub
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Instagram">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <InstagramIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Instagram
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="LinkedIn">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <LinkedInIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    LinkedIn
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Medium">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MediumIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Medium
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="OnlyFans">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <OnlyFansIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    OnlyFans
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Pinterest">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <PinterestIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Pinterest
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Reddit">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <RedditIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Reddit
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Snapchat">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <SnapchatIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Snapchat
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Spotify">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <SpotifyIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Spotify For Artists
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Steam">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <SteamIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Steam
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Telegram">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <TelegramIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Telegram
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Threads">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <ThreadsIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Threads
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="TikTok">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <TikTokIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    TikTok
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Tinder">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <TinderIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Tinder
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Tumblr">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <TumblrIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Tumblr
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Twitch">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <TwitchIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Twitch
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Twitter">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <TwitterIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    X
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Vimeo">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <VimeoIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Vimeo
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="WeChat">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <WeChatIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    WeChat
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="WhatsApp">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <WhatsAppIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    WhatsApp
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="YouTube">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <YouTubeIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    YouTube
                                  </span>
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Zalo">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <ZaloIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-bold mr-2">
                                    Zalo
                                  </span>
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
