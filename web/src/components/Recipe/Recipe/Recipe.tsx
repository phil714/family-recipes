import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "src/components/Card";
import TagDisplay from "src/components/TagDisplay/TagDisplay";
import TextEditor from "src/components/TextEditor/TextEditor";
import type { FindRecipeById } from 'types/graphql';

import tomato from './tomato.jpeg'
import { t } from "i18next";

interface Props {
  recipe: NonNullable<FindRecipeById['recipe']>;
}

const Recipe = ({ recipe }: Props) => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <img
          src={tomato} // TODO: replace with recipe image
          alt={recipe.name}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
      </div>
      <Card className="shadow-lg mb-6 h-fit">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-2">
            {recipe.name}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {recipe.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-bold">{t("recipe:preparation-time")}</h3>
              <p>{recipe.preparationTimeMinutes} {t("recipe:minutes")}</p>
            </div>
            <div>
              <h3 className="font-bold">{t("recipe:cook-time")}</h3>
              <p>{recipe.cookingTimeMinutes} {t("recipe:minutes")}</p>
            </div>
            <div>
              <h3 className="font-bold">{t('glossary:family')}</h3>
              <p>{recipe.family.name}</p>
            </div>
            <div className="col-span-3 flex gap-2">
              {recipe.tags.map((tag) => <TagDisplay tag={tag} />)}
              {recipe.ingredients.map((ingredient) => <TagDisplay tag={ingredient} />)}
            </div>
          </div>
        </CardContent>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">{t("recipe:instructions")}</h2>
          <TextEditor editable={false} value={recipe.instructions} onChange={() => {}} className="w-full bg-white h-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Recipe;
