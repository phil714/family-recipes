import type { Prisma, Ingredient } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.IngredientCreateArgs>({
  ingredient: {
    one: { data: { name: "String", description: "String" } },
    two: { data: { name: "String", description: "String" } },
  },
});

export type StandardScenario = ScenarioData<Ingredient, "ingredient">;
