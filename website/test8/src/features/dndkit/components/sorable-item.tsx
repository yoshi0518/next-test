import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaArrowsUpDownLeftRight } from 'react-icons/fa6';

export const SotableItem: React.FC<{ id: number }> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id });
  const style = {
    width: '200px',
    height: '50px',
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid black',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span>
        <FaArrowsUpDownLeftRight />
        Item {id}
      </span>
    </div>
  );
};
