import { defineCollection, z } from "astro:content";

const grads = defineCollection({
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    role: z.array(
      z.enum([
        "Creative Director",
        "Art Director",
        "Copywriter",
        "Strategist",
        "Brand Designer",
        "Designer",
        "Artist",
      ])
    ),
    image: z.string(),
    color: z.enum(["red", "yellow", "purple", "green", "pink", "blue"]),
    quote: z.string(),
    website: z.array(z.string().url()).optional(),
    instagram: z.array(z.string().url()).optional(),
    linkedin: z.string().url().optional(),
    pronouns: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const collections = {
  grads,
};
