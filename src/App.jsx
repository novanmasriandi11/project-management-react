import { useState } from "react";
import NewProject from "./components/NewProject";
import NoneProjectView from "./components/NoneProjectView";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectProject from "./components/SelectProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject_id: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddStartProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject_id: null,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject_id: id,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.floor(Math.random() * 100000),
      };
      return {
        ...prevState,
        selectedProject_id: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject_id: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject_id: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProject_id
        ),
      };
    });
  }

  function handleAddTask(taskData) {
    setProjectsState((prevState) => {
      const newTask = {
        taskData: taskData,
        projectId: prevState.selectedProject_id,
        id: Math.floor(Math.random() * 100000),
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const selected = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProject_id
  );

  let content = (
    <SelectProject
      project={selected}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProject_id === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProject_id === undefined) {
    content = <NoneProjectView onStartAddProject={handleAddStartProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleAddStartProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProject_id={projectsState.selectedProject_id}
      />
      {content}
    </main>
  );
}

export default App;
