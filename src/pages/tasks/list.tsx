import React from "react";
import {
  KanbanBoardContainer,
  KanbanBoard,
} from "@/component/tasks/kanban/board";
import KanbanColumn from "@/component/tasks/kanban/column";
import KanbanItem from "@/component/tasks/kanban/item";
import { useList, useGo, useUpdate } from "@refinedev/core";
import { TASK_STAGES_QUERY, TASKS_QUERY } from "@/component/graphql/queries";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { TasksQuery, TaskStagesQuery } from "@/graphql/types";
import KanbanAddCardButton from "@/component/tasks/kanban/add-card-button";
import { KanbanColumnSkeleton, ProjectCardSkeleton } from "@/component";
import { ProjectCardMemo } from "@/component/tasks/kanban/card";
import { DragEndEvent } from "@dnd-kit/core";
import { UPDATE_TASK_STAGE_MUTATION } from "@/component/graphql/mutations";


// ✅ Types
type Task = GetFieldsFromList<TasksQuery>;
type TaskStage = GetFieldsFromList<TaskStagesQuery> & { tasks: Task[] };

const List: React.FC<React.PropsWithChildren> = ({ children }) => {
   const go = useGo();
  const { mutate: updateTask } = useUpdate();

  // ✅ Fetch stages
  const { query: stagesQuery } = useList<TaskStage>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [{ field: "createdAt", order: "asc" }],
    meta: { gqlQuery: TASK_STAGES_QUERY },
  });

  // ✅ Fetch tasks
  const { query: tasksQuery } = useList<GetFieldsFromList<TasksQuery>>({
    resource: "tasks",
    sorters: [{ field: "dueDate", order: "asc" }],
    queryOptions: { enabled: !!stagesQuery.data },
    pagination: { mode: "off" },
    meta: { gqlQuery: TASKS_QUERY },
  });

  // ✅ Extract data
  const stages = stagesQuery.data?.data ?? [];
  const tasks = tasksQuery.data?.data ?? [];
  const isLoading = stagesQuery.isLoading || tasksQuery.isLoading;

  // ✅ Group tasks by stage (fix for ESLint warnings)
  const taskStages = React.useMemo(() => {
    if (!tasks.length || !stages.length) {
      return { unassignedStage: [], columns: [] };
    }

    const unassignedStage = tasks.filter((task) => !task.stageId);

    const grouped: TaskStage[] = stages.map((stage) => ({
      ...stage,
      tasks: tasks.filter((task) => String(task.stageId) === String(stage.id)),
    }));

    return { unassignedStage, columns: grouped };
  }, [stages, tasks]);

  // ✅ Add card handler
  const handleAddCard = (args: { stageId: string}) => {
    const path = args.stageId === 'unassigned' 
      ? '/tasks/new'
      : `/tasks/new?stageId=${args.stageId}` 

      go({ to: path });
  }

  // ✅ Drag handler
  const handleOnDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      let stageId = event.over?.id as undefined | string | null;
      const taskId = event.active.id as string;
      const taskStageId = event.active.data.current?.stageId;

      if (taskStageId === stageId) return;

      if (stageId === "unassigned") {
        stageId = null;
      }

      updateTask({
        resource: "tasks",
        id: taskId,
        values: { stageId },
        successNotification: false,
        mutationMode: "optimistic",
        meta: { gqlMutation: UPDATE_TASK_STAGE_MUTATION },
      });
    },
    [updateTask]
  );

  // ✅ Loading fallback
  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          {/* Unassigned tasks column */}
          <KanbanColumn
            id="unassigned"
            title="Unassigned"
            count={taskStages.unassignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unassigned" })}
          >
            {taskStages.unassignedStage.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stageId: "unassigned" }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}

            {!taskStages.unassignedStage.length && (
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: "unassigned" })}
              />
            )}
          </KanbanColumn>

          {/* Stage columns */}
          {taskStages.columns?.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: column.id })}
            >
              {column.tasks.map((task) => (
                <KanbanItem key={task.id} id={task.id} data={task}>
                  <ProjectCardMemo
                    {...task}
                    dueDate={task.dueDate || undefined}
                  />
                </KanbanItem>
              ))}

              {!column.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: column.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

export default List;

// ✅ Skeleton Loader
const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: itemCount }).map((_, idx) => (
            <ProjectCardSkeleton key={idx} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  );
};
