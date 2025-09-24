import { useForm, useFieldArray } from "react-hook-form";
export default function TaskList() {
    
  const { control, register, handleSubmit, watch } = useForm({
    defaultValues: {
      tasks: [
        { text: "Aprender React Hook Form", completed: false },
        { text: "Criar componente TaskList", completed: false },
        { text: "Exemplo de tarefa concluída", completed: true },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  // Observa todas as tasks para reagir às mudanças dos checkboxes
  const watchedTasks = watch("tasks");
    const onSubmit = (data) => {
        console.log(JSON.stringify(data, null, 2));
        window.alert(JSON.stringify(data,null,2))
  };

  const addNewTask = () => {
    append({ text: "Nova tarefa", completed: false });
  };

  return (
    <div>
      <h1 className="text-xl text-center">Lista de Tarefas</h1>

      {/* Botão para adicionar nova tarefa */}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button className="btn-success" type="button" onClick={addNewTask}>
            Adicionar Tarefa
          </button>

          {/* Botão para submeter o formulário */}
          <button type="submit" className="btn-success">
            Guardar Lista
          </button>
        </div>

        <ul className="flex flex-col gap-2 w-full">
          {fields.map((field, index) => {
            const isCompleted = watchedTasks[index]?.completed;

            return (
              <li className="flex gap-2 items-center" key={field.id}>
                {/* Checkbox para marcar como concluído */}
                <input
                  type="checkbox"
                  {...register(`tasks.${index}.completed`)}
                />

                {/* Renderização condicional: input editável ou texto riscado */}
                {isCompleted ? (
                  <span style={{ textDecoration: "line-through" }}>
                    {watchedTasks[index]?.text}
                  </span>
                ) : (
                  <input
                    {...register(`tasks.${index}.text`)}
                    placeholder="Digite a tarefa..."
                  />
                )}

                {/* Botão para remover a tarefa */}
                <button
                  className="btn"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remover
                </button>
              </li>
            );
          })}
        </ul>
      </form>

      {/* Informações para debug */}
      <div>
        <h3>Estado Atual:</h3>
        <p>Total de tarefas: {fields.length}</p>
        <p>
          Concluídas: {watchedTasks.filter((task) => task?.completed).length}
        </p>
        <p>
          Pendentes: {watchedTasks.filter((task) => !task?.completed).length}
        </p>
      </div>
    </div>
  );
}
