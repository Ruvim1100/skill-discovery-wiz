import React, { useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { INDUSTRY_CATEGORIES } from "./constants";

interface InterestRankingProps {
  ranking: string[]; // category IDs in order
  selections: Record<string, string[]>;
  onChange: (newRanking: string[]) => void;
}

const SortableItem: React.FC<{
  id: string;
  rank: number;
  label: string;
  subfieldCount: number;
  isMobile: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}> = ({ id, rank, label, subfieldCount, isMobile, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card px-4 py-3.5 transition-shadow duration-200",
        isDragging ? "shadow-lg border-primary z-10 relative" : "border-border"
      )}
    >
      <button
        type="button"
        className="shrink-0 cursor-grab active:cursor-grabbing touch-none text-muted-foreground hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2"
        {...attributes}
        {...listeners}
        aria-label={`Drag to reorder ${label}`}
      >
        <GripVertical size={18} />
      </button>

      <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
        {rank}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{label}</p>
      </div>

      <span className="shrink-0 text-xs text-muted-foreground">
        {subfieldCount} subfield{subfieldCount !== 1 ? "s" : ""}
      </span>

      {isMobile && (
        <div className="flex flex-col shrink-0">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
            aria-label={`Move ${label} up`}
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
            aria-label={`Move ${label} down`}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export const InterestRanking: React.FC<InterestRankingProps> = ({
  ranking,
  selections,
  onChange,
}) => {
  const isMobile = useIsMobile();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = ranking.indexOf(active.id as string);
        const newIndex = ranking.indexOf(over.id as string);
        onChange(arrayMove(ranking, oldIndex, newIndex));
      }
    },
    [ranking, onChange]
  );

  const moveItem = useCallback(
    (index: number, direction: -1 | 1) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= ranking.length) return;
      onChange(arrayMove(ranking, index, newIndex));
    },
    [ranking, onChange]
  );

  if (ranking.length < 3) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Rank your interests by importance</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select interests from at least 3 different categories to rank them.
          </p>
        </div>
        <div className="rounded-lg border-2 border-dashed border-border flex items-center justify-center h-32">
          <p className="text-sm text-muted-foreground text-center px-4">
            Go back and select subfields from at least 3 categories
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Rank your interests by importance</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag to reorder — your top choices carry more weight in matching
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">1 = most important to you</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ranking} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {ranking.map((catId, index) => {
              const cat = INDUSTRY_CATEGORIES.find((c) => c.id === catId);
              const count = (selections[catId] ?? []).length;
              return (
                <SortableItem
                  key={catId}
                  id={catId}
                  rank={index + 1}
                  label={cat?.label ?? catId}
                  subfieldCount={count}
                  isMobile={isMobile}
                  onMoveUp={() => moveItem(index, -1)}
                  onMoveDown={() => moveItem(index, 1)}
                  isFirst={index === 0}
                  isLast={index === ranking.length - 1}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
