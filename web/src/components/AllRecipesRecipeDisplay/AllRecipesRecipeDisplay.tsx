import TagDisplay from "../TagDisplay/TagDisplay";

interface Recipe {
  id: string;
  name: string;
  description: string;
  family: {
    id: string;
    name: string;
  }
  ingredients: {
    id: string;
    name: string;
  }[]
  tags: {
    id: string;
    name: string;
    color: string;
  }[]
}

interface Props {
  recipe: Recipe;
}

const AllRecipesRecipeDisplay = (props: Props) => {
  return (
    <div className="w-80 h-80 p-4">
      <h2>{props.recipe.name}</h2>
      <ul>
        {props.recipe.tags.map((tag) => <TagDisplay tag={tag} />)}
      </ul>
      <ul>
        {props.recipe.ingredients.map((ingredient) => <TagDisplay tag={{ ...ingredient, color: '#FFFFFF' }} />)}
      </ul>
    </div>
  );
};

export default AllRecipesRecipeDisplay;
