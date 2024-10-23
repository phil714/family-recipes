// Define your own mock data here:

const tags = [
  {
    id: '1',
    name: 'Tag 1',
    color: '#FF0000',
    description: 'Tag Description 1',
  },
]
const ingredients = [
  {
    id: '1',
    name: 'Ingredient 1',
    color: '#FF0000',
    description: 'Ingredient Description 1',
  },
]

export const standard = (/* vars, { ctx, req } */) => ({
  allRecipes: [
    {
      id: '1',
      name: 'Recipe 1',
      description: 'Description 1',
      family: {
        id: '1',
        name: 'Family 1',
      },
      tags,
      ingredients,
    },
    {
      id: '2',
      name: 'Recipe 2',
      description: 'Description 2',
      family: {
        id: '1',
        name: 'Family 1',
      },
      tags,
      ingredients,
    },
    {
      id: '3',
      name: 'Recipe 3',
      description: 'Description 3',
      family: {
        id: '2',
        name: 'Family 2',
      },
      tags,
      ingredients,
    },
  ],
})
