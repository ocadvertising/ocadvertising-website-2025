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
    color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i),
    quote: z.string(),
  }),
});

export const collections = {
  grads,
};
