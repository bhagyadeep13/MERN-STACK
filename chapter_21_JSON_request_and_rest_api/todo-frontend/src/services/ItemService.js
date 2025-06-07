export const addItemtoServer = async (task, date) => {
  const response = await fetch("http://localhost:3000/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Added this line
    },
    body: JSON.stringify({ task, date }),
  });
  
  const item = await response.json();
  return mapServerItemToClientItem(item);
};

const mapServerItemToClientItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};
