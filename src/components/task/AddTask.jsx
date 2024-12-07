import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { app } from "../../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import { dateFormatter } from "../../utils";
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task, refetch }) => {
  // console.log(task);
  const defaultValues = {
    title: task?.title || "",
    data: dateFormatter(task?.date || new Date()),
    team: [],
    stage: "",
    priority: "",
    assets: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  console.log(task?.team);
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task.assets] : [];

  const submitHandler = async (data) => {
    try {
      const newData = {
        ...data,
        team,
        stage,
        priority,
      };
      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();
      refetch();
      setOpen(false);
      toast.success("Task Added");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err?.message);
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  // const uploadFile = async (file) => {
  //   const storage = getStorage(app);
  //   const name = new Date().getTime() + file?.name;
  //   const storageRef = ref(storage, name);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   return new Promise((resolve, reject) => {
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         console.log("uploading");
  //       },
  //       (error) => {
  //         reject(error);
  //       },
  //       () => {
  //         getDownloadUrl(uploadTask.snapshot.ref)
  //           .then((downloadUrl) => {
  //             uploadedFileURLs.push(downloadUrl);
  //             resolve();
  //           })
  //           .catch((error) => {
  //             reject(error);
  //           });
  //       }
  //     );
  //   });
  // };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              className="w-full rounded"
              register={register("title", {
                required: "Title is required", // Regular validation
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/, // Regex that allows only alphanumeric characters and spaces
                  message: "Special characters are not allowed", // Custom error message for invalid input
                },
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className="flex gap-4">
              <SelectList
                label="Task Stage"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className="w-full">
                <Textbox
                  placeholder="Date"
                  type="date"
                  name="date"
                  label="Task Date"
                  className="w-full rounded"
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <SelectList
                label="Priority Level"
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
