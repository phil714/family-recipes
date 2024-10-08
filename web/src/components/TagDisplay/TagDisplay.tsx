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
    <div key={props.tag.id} style={{ backgroundColor: props.tag.color }} className="p-2">
      {props.tag.name}
    </div>
  );
};

export default TagDisplay;
