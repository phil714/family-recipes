import type { Prisma, User } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: "String5507439",
        name: "String",
        hashedPassword: "String",
        salt: "String",
      },
    },
    two: {
      data: {
        email: "String3977722",
        name: "String",
        hashedPassword: "String",
        salt: "String",
      },
    },
  },
});

export type StandardScenario = ScenarioData<User, "user">;
