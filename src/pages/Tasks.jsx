import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import {
  useGetAllTasksQuery,
  // useGetStatsQuery,
} from "../redux/slices/api/taskApiSlice";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const status = params?.status || "";

  const {
    data,
    error,
    isLoading,
    refetch: refetchTasks,
  } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: searchQuery,
  });

  useEffect(() => {
    refetchTasks();
  }, [status]);
  !isLoading && console.log(data, error, isLoading);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = data?.tasks.filter((task) => {
    // Get the user information from local storage
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage

    // Check if the user is an admin
    const isAdmin = user?.isAdmin; // Assuming user has an isAdmin field

    // Check if the task title matches the search query
    const matchesSearch = task?.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (isAdmin) {
      // If user is admin, allow all tasks that match the search query
      return matchesSearch;
    } else {
      // If user is not admin, check if the user's ID is in the task's team array
      const userId = user?._id; // Assuming user ID is available
      const taskHasUser = task?.team?.includes(userId);

      return matchesSearch && taskHasUser;
    }
  });

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300"
        />
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label="completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={filteredTasks} refetch={refetchTasks} />
        ) : (
          <div className="w-full">
            <Table tasks={filteredTasks} refetch={refetchTasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} refetch={refetchTasks} />
    </div>
  );
};

export default Tasks;
