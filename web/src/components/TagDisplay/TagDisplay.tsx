import { isDarkBackground } from "src/helpers/colors";
import { twMerge } from "tailwind-merge";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Props {
  tag: Tag;
  size?: 'md';
}


const TagDisplay = (props: Props) => {
  return (
    <div
      key={props.tag.id}
      style={{ backgroundColor: props.tag.color }}
    className={twMerge('text-sm p-1 rounded-full flex flex-none w-min',
      isDarkBackground(props.tag.color) && 'text-white',
    )}
    >
      {props.tag.name}
    </div>
  );
};

export default TagDisplay;
