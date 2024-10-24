import type { Prisma, Tag } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TagCreateArgs>({
  tag: {
    one: { data: { name: 'String', color: 'String', description: 'String' } },
    two: { data: { name: 'String', color: 'String', description: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Tag, 'tag'>
