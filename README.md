# MERN Stack Task APP using Redux Toolkit Query and Tailwind CSS 

Made with all requred features such as input validation and restricting certain charecters on title field, toggle b/w taled and card view , edit tasks and user management and 2 additional features of of Adding Subtaks and Task History and Tracking 


# API Slices Documentation

This documentation explains the functionality of three Redux slices: `authApiSlice`, `taskApiSlice`, and `userApiSlice`. These slices handle interactions with APIs related to authentication, task management, and user management.

## `authApiSlice`

Handles user authentication, registration, and logout.

### Endpoints

- **login**
  - **URL**: `/user/login`
  - **Method**: `POST`
  - **Body**: User credentials (`email`, `password`)
  - **Description**: Logs in the user.
  - **Credentials**: `include`
  
- **register**
  - **URL**: `/user/register`
  - **Method**: `POST`
  - **Body**: User registration details (`name`, `email`, `password`, `role`)
  - **Description**: Registers a new user.
  - **Credentials**: `include`
  
- **logout**
  - **URL**: `/user/logout`
  - **Method**: `POST`
  - **Description**: Logs out the user.
  - **Credentials**: `include`

### Exported Hooks
- `useLoginMutation`
- `useRegisterMutation`
- `useLogoutMutation`

---

## `taskApiSlice`

Manages tasks, including creation, updating, deletion, and related functionalities like subtasks and task activities.

### Endpoints

- **getStats**
  - **URL**: `/task/dashboard`
  - **Method**: `GET`
  - **Description**: Fetches task statistics.
  - **Credentials**: `include`

- **getAllTasks**
  - **URL**: `/task`
  - **Method**: `GET`
  - **Query Params**: `stage`, `isTrashed`, `search`
  - **Description**: Fetches tasks with filters.
  - **Credentials**: `include`

- **createTask**
  - **URL**: `/task/create`
  - **Method**: `POST`
  - **Body**: Task data (`title`, `description`, `stage`)
  - **Description**: Creates a new task.
  - **Credentials**: `include`

- **duplicateTask**
  - **URL**: `/task/duplicate/{id}`
  - **Method**: `POST`
  - **Description**: Duplicates a task.
  - **Credentials**: `include`

- **updateTask**
  - **URL**: `/task/update/{id}`
  - **Method**: `PUT`
  - **Body**: Updated task data.
  - **Description**: Updates a task.
  - **Credentials**: `include`

- **trashTask**
  - **URL**: `/task/trash`
  - **Method**: `PUT`
  - **Body**: Task ID
  - **Description**: Moves a task to trash.
  - **Credentials**: `include`

- **createSubTask**
  - **URL**: `/task/create-subtask/{id}`
  - **Method**: `PUT`
  - **Body**: Subtask data
  - **Description**: Creates a subtask.
  - **Credentials**: `include`

- **getSingleTask**
  - **URL**: `/task/{id}`
  - **Method**: `GET`
  - **Description**: Fetches a task by ID.
  - **Credentials**: `include`

- **postTaskActivity**
  - **URL**: `/task/activity`
  - **Method**: `POST`
  - **Body**: Activity data
  - **Description**: Posts task activities.
  - **Credentials**: `include`

### Exported Hooks
- `useGetStatsQuery`
- `useGetAllTasksQuery`
- `useCreateTaskMutation`
- `useDuplicateTaskMutation`
- `useUpdateTaskMutation`
- `useTrashTaskMutation`
- `useCreateSubTaskMutation`
- `useGetSingleTaskQuery`
- `usePostTaskActivityMutation`

---

## `userApiSlice`

Manages user profile updates, fetching team lists, and user actions.

### Endpoints

- **updateUser**
  - **URL**: `/user/profile`
  - **Method**: `PUT`
  - **Body**: User profile data
  - **Description**: Updates the current user's profile.
  - **Credentials**: `include`

- **getTeamList**
  - **URL**: `/user/get-team`
  - **Method**: `GET`
  - **Description**: Fetches team members.
  - **Credentials**: `include`

- **deleteUser**
  - **URL**: `/user/{id}`
  - **Method**: `DELETE`
  - **Description**: Deletes a user by ID.
  - **Credentials**: `include`

- **userAction**
  - **URL**: `/user/{id}`
  - **Method**: `PUT`
  - **Body**: User action data (e.g., role updates)
  - **Description**: Updates user data (role/permissions).
  - **Credentials**: `include`

### Exported Hooks
- `useUpdateUserMutation`
- `useGetTeamListQuery`
- `useDeleteUserMutation`
- `useUserActionMutation`

---

## Summary

- **`authApiSlice`**: Manages user authentication (login, register, logout).
- **`taskApiSlice`**: Manages tasks (create, update, delete, subtasks, etc.).
- **`userApiSlice`**: Manages users (update, delete, perform actions on users).

These slices provide hooks for interacting with the backend API using Redux Toolkit's `createApi` to simplify API calls and state management in the React application.
