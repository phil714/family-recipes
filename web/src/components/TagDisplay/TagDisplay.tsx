import { twMerge } from 'tailwind-merge'

import { isDarkBackground } from 'src/helpers/colors'

import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip/Tooltip'

interface Tag {
  id: string
  name: string
  color: string
  description: string
}

interface Props {
  tag: Tag
  size?: 'md'
}

const TagDisplay = (props: Props) => {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger>
        <div
          key={props.tag.id}
          style={{ backgroundColor: props.tag.color }}
          className={twMerge(
            'flex w-min flex-none whitespace-nowrap rounded-full p-2 text-sm leading-none',
            isDarkBackground(props.tag.color) && 'text-white'
          )}
        >
          {props.tag.name}
        </div>
      </TooltipTrigger>
      <TooltipContent>{props.tag.description}</TooltipContent>
    </Tooltip>
  )
}

export default TagDisplay
