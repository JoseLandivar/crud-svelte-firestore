<script>
  import {
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { onDestroy } from "svelte";
  import { db } from "./firebase";
  import Toastify from "toastify-js";

  let task = {
    title: "",
    description: "",
  };

  let tasks = [];
  let editStatus = false;
  let currentId = "";

  const addTask = async () => {
    await addDoc(collection(db, "tasks"), {
      ...task,
      createdAt: new Date(),
    });
    console.log("task delete");
    Toastify({
      text: "New task create",
    }).showToast();
  };

  const updateTask = async () => {
    await updateDoc(doc(db, "tasks", currentId), task);
  };

  const handleSubmit = async () => {
    try {
      if (!editStatus) {
        addTask();
      } else {
        updateTask();
      }
    } catch (error) {
      console.log(error);
    }

    task = {
      title: "",
      description: "",
    };
    editStatus = false;
    currentId = "";
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      Toastify({
        style: {
          background: "#f44336",
        },
        text: "Task Delete",
      }).showToast();
      console.log("task delete");
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (currentTask) => {
    task.title = currentTask.title;
    task.description = currentTask.description;
    currentId = currentTask.id;
    editStatus = true;
  };

  const unsub = onSnapshot(
    collection(db, "tasks"),
    (querySnapshot) => {
      tasks = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    },
    (err) => {
      console.log(err);
    }
  );
  onDestroy(unsub);
</script>

<main>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-6">
        <form
          on:submit|preventDefault={handleSubmit}
          class="card card-body p-5"
        >
          <div class="mb-3">
            <label for="title">Title</label>
            <input
              bind:value={task.title}
              type="text"
              placeholder="Write a title"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label for="description">Description</label>
            <textarea
              bind:value={task.description}
              id="description"
              rows="3"
              placeholder="Write a description"
              class="form-control"
            />
          </div>

<div> 
           <button class="btn btn-primary"> Save </button>
</div>
        </form>
      </div>
      <div class="col-md-6">
        {#each tasks as task}
          <div class="card card-body mt-2">
            <div class="d-flex justify-content-between">
              <h5>{task.title}</h5>
              <i class="material-icons" on:click={editTask(task)}>edit</i>
            </div>

            <p>{task.description}</p>
            <div>
              <button class="btn btn-danger" on:click={deleteTask(task.id)}>
                <i class="material-icons" style="vertical-align: middle;"
                  >delete_forever</i
                > Delete
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
</style>
