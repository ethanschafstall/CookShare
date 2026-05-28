import * as z from "zod";
const ImageMetadataSchema = z.object({
  altText: z.string(),
  isCover: z.boolean(),
  displayOrder: z.number().int(),
});

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

// TECH DEBT: RecipeImageSchema only validates req.body fields (altText, isCover, displayOrder).
// Fields like filename and storagePath come from req.files (multer) and can't be part of the schema.
// Because of this, RecipeImageInput cannot be inferred from RecipeImageSchema and must be maintained manually.
// z.infer only reflects what Zod validates, it has no awareness of data coming from other parts of the request.
const RecipeImageSchema = z.object({
  metadata: z.string().transform((s, ctx) => {
    try {
      const parsed = JSON.parse(s);
      const result = z
        .array(ImageMetadataSchema)
        .min(1)
        .max(10)
        .safeParse(parsed);
      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid metadata structure",
        });
        return z.NEVER;
      }
      return result.data;
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Invalid metadata JSON",
      });
      return z.NEVER;
    }
  }),
});

type RecipeInput = z.infer<typeof RecipeSchema>;
type RecipeImageInput = {
  altText: string;
  isCover: boolean;
  displayOrder: number;
  filename: string;
  storagePath: string;
  recipeId: number;
};

export default { RecipeSchema, RecipeImageSchema };
export type { RecipeImageInput, RecipeInput };
