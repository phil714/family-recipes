import type { Prisma, Tag } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TagCreateArgs>({
  tag: {
    one: { data: { name: 'String', color: 'String' } },
    two: { data: { name: 'String', color: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Tag, 'tag'>
