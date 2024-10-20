
import { isDarkBackground } from "src/helpers/colors";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip/Tooltip";

interface Tag {
  id: string;
  name: string;
  color: string;
  description: string;
}

interface Props {
  tag: Tag;
  size?: 'md';
}


const TagDisplay = (props: Props) => {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger>
        <div
          key={props.tag.id}
          style={{ backgroundColor: props.tag.color }}
          className={twMerge('text-sm p-1 rounded-full flex flex-none w-min whitespace-nowrap',
            isDarkBackground(props.tag.color) && 'text-white',
          )}
        >
          {props.tag.name}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {props.tag.description}
      </TooltipContent>
    </Tooltip>
  );
};

export default TagDisplay;
