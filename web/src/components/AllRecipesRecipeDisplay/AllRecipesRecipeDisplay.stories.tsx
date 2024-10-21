import type { Meta, StoryObj } from '@storybook/react'

import AllRecipesRecipeDisplay from './AllRecipesRecipeDisplay'
import { AllRecipesRecipeDisplaySkeleton } from './AllRecipesRecipeDisplay.skeleton'

const meta: Meta<typeof AllRecipesRecipeDisplay> = {
  component: AllRecipesRecipeDisplay,
  tags: ['autodocs'],
  args: {
    recipe: {
      id: '1',
      name: 'Tomato and Egg Stir-Fry',
      description:
        "A quick and simple stir-fry combining fresh tomatoes and scrambled eggs. This classic dish is packed with flavor and comes together in just a few minutes. It's perfect for a light meal or as a side to rice.",
      family: {
        id: '1',
        name: 'Deschesnes',
      },
      ingredients: [],
      tags: [],
    },
  },
}

export default meta

type Story = StoryObj<typeof AllRecipesRecipeDisplay>

export const Primary: Story = {}

export const Skeleton: Story = {
  render: () => <AllRecipesRecipeDisplaySkeleton />,
}
