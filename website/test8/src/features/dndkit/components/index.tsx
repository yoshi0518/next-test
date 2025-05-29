'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SotableItem } from './sorable-item';

export const Dndkit1: React.FC = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over?.id as number);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">dnd-kit 1</h2>
      <div style={{ width: '500px', height: '100vh', cursor: 'pointer' }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={verticalListSortingStrategy}
          >
            {items.map((id) => (
              <SotableItem
                key={id}
                id={id}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};
