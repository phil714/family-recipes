// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from "@storybook/react";

import RecipeStatusSelect from "./RecipeStatusSelect";

const meta: Meta<typeof RecipeStatusSelect> = {
  component: RecipeStatusSelect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RecipeStatusSelect>;

export const Primary: Story = {};
