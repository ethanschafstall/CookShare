import * as z from "zod";

const RecipeSchema = z.object({
  // recipes table
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  servings: z.number().int().nullable(),
  prepTimeMin: z.number().int().nullable(),
  cookTimeMin: z.number().int().nullable(),
  difficulty: z.enum(["easy", "medium", "hard"]),

  // recipe_steps
  steps: z
    .array(
      z.object({
        stepNumber: z.number().int(),
        instruction: z.string().min(1),
      }),
    )
    .min(1),

  // recipe_ingredients
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1).max(255),
        displayOrder: z.number().int(),
        quantityG: z.number().nullable(),
        quantityNumeric: z.number().nullable(),
        displayUnit: z.string().max(255).nullable(),
        note: z.string().max(255).nullable(),
      }),
    )
    .min(1),
});

const RecipeImageSchema = z.object({
  /* FormData sends data as string, so a transform is needed in order to convert it to correct type */
  altText: z.string().max(255),
  isCover: z.string().transform((v) => v === "true"),
  displayOrder: z.number().int().optional(),
});

type RecipeInput = z.infer<typeof RecipeSchema>;
type RecipeImageInput = z.infer<typeof RecipeImageSchema>;

export default { RecipeSchema, RecipeImageSchema };
export type { RecipeImageInput, RecipeInput };

