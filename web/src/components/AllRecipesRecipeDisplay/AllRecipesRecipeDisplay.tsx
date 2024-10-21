import { Link, routes } from '@redwoodjs/router'

import TagDisplay from '../TagDisplay/TagDisplay'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Card'

interface Recipe {
  id: string
  name: string
  description: string
  family: {
    id: string
    name: string
  }
  ingredients: {
    id: string
    name: string
    description: string
    color: string
  }[]
  tags: {
    id: string
    name: string
    description: string
    color: string
  }[]
}

interface Props {
  recipe: Recipe
}

import tomato from '../Recipe/Recipe/tomato.jpeg'

const AllRecipesRecipeDisplay = ({ recipe }: Props) => {
  return (
    <Link
      to={routes.recipe({ id: recipe.id })}
      title={'Show recipe ' + recipe.name + ' detail'}
      className="h-80 w-80"
    >
      <Card className="h-fit shadow-md hover:bg-slate-100">
        <CardHeader className="p-4 pb-0">
          <img
            src={tomato} // TODO: replace with recipe image
            alt={recipe.name}
            className="h-40 w-full rounded-lg object-cover pb-2"
          />
          <CardTitle className="text-xl font-bold">{recipe.name}</CardTitle>
          <CardDescription className="line-clamp-4 text-gray-600">
            {recipe.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-2 pt-2">
            {recipe.tags.map((tag) => (
              <TagDisplay tag={tag} key={tag.id} />
            ))}
            {recipe.ingredients.map((ingredient) => (
              <TagDisplay tag={ingredient} key={ingredient.id} />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default AllRecipesRecipeDisplay
