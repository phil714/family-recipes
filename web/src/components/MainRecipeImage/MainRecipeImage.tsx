interface Props {
  recipe: {
    name: string
    mainImageUrl: string
  }
}

const MainRecipeImage: React.FC<Props> = ({ recipe }) => {
  return (
    <img
      src={recipe.mainImageUrl} // TODO: transform based on screen size ?
      alt={recipe.name}
      className="h-96 w-full rounded-lg object-cover shadow-md"
    />
  )
}

export default MainRecipeImage
