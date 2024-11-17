import { t } from 'i18next'
import type { FindRecipeById } from 'types/graphql'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/Card'
import MainRecipeImage from 'src/components/MainRecipeImage/MainRecipeImage'
import TagDisplay from 'src/components/TagDisplay/TagDisplay'
import TextEditor from 'src/components/TextEditor/TextEditor'

interface Props {
  recipe: NonNullable<FindRecipeById['recipe']>
}

const Recipe = ({ recipe }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <MainRecipeImage recipe={recipe} />
      </div>
      <Card className="mb-6 h-fit shadow-lg">
        <CardHeader>
          <CardTitle className="mb-2 text-4xl font-bold">
            {recipe.name}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {recipe.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-bold">{t('recipe:preparation-time')}</h3>
              <p>
                {recipe.preparationTimeMinutes} {t('recipe:minutes')}
              </p>
            </div>
            <div>
              <h3 className="font-bold">{t('recipe:cook-time')}</h3>
              <p>
                {recipe.cookingTimeMinutes} {t('recipe:minutes')}
              </p>
            </div>
            <div>
              <h3 className="font-bold">{t('glossary:family')}</h3>
              <p>{recipe.family.name}</p>
            </div>
            <div className="col-span-3 flex gap-2">
              {recipe.tags.map((tag) => (
                <TagDisplay tag={tag} key={tag.id} />
              ))}
              {recipe.ingredients.map((ingredient) => (
                <TagDisplay tag={ingredient} key={ingredient.id} />
              ))}
            </div>
          </div>
        </CardContent>
        <CardContent>
          <h2 className="mb-2 text-2xl font-semibold">
            {t('recipe:instructions')}
          </h2>
          <TextEditor
            editable={false}
            value={recipe.instructions}
            onChange={() => {}}
            className="h-full w-full bg-white"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Recipe
