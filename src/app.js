import { STATUS, items, moveToPrevious } from "./data.js";

let currentItems = [...items];
let nextId = Math.max(...items.map(item => item.id)) + 1;

// Get DOM containers
const newContainer = document.getElementById("col-new");
const planningContainer = document.getElementById("col-planning");
const activeContainer = document.getElementById("col-active");
const revisingContainer = document.getElementById("col-revising");
const overdueContainer = document.getElementById("col-overdue");
const closureContainer = document.getElementById("col-closure");

// Function to get next status
function getNextStatus(currentStatus) {
  const statusFlow = {
    [STATUS.NEW]: STATUS.PLANNING,
    [STATUS.PLANNING]: STATUS.ACTIVE,
    [STATUS.ACTIVE]: STATUS.REVISING,
    [STATUS.REVISING]: STATUS.CLOSURE,
    [STATUS.OVERDUE]: STATUS.ACTIVE,
    [STATUS.CLOSURE]: STATUS.CLOSURE
  };
  return statusFlow[currentStatus];
}

// Function to get button text
function getButtonText(status) {
  const buttonTexts = {
    [STATUS.NEW]: "Plan",
    [STATUS.PLANNING]: "Start",
    [STATUS.ACTIVE]: "Review",
    [STATUS.REVISING]: "Complete",
    [STATUS.OVERDUE]: "Resume",
    [STATUS.CLOSURE]: null
  };
  return buttonTexts[status];
}

// Function to add new item
function addItem() {
  const input = document.getElementById("newTitle");
  const title = input.value.trim();
  
  if (!title) {
    alert("Please enter a content title");
    return;
  }
  
  const newItem = {
    id: nextId++,
    title: title,
    status: STATUS.NEW
  };
  
  currentItems.push(newItem);
  input.value = "";
  renderItems();
}

// Function to move item to previous status
function moveItemToPrevious(itemId) {
  if (moveToPrevious(itemId)) {
    renderItems();
  }
}

// Function to update item status
function updateItemStatus(itemId) {
  const item = currentItems.find(item => item.id === itemId);
  if (item) {
    const nextStatus = getNextStatus(item.status);
    if (nextStatus) {
      item.status = nextStatus;
      renderItems();
    }
  }
}

// Function to render all items
function renderItems() {
  // Clear all containers
  newContainer.innerHTML = "";
  planningContainer.innerHTML = "";
  activeContainer.innerHTML = "";
  revisingContainer.innerHTML = "";
  overdueContainer.innerHTML = "";
  closureContainer.innerHTML = "";
  
  // Count items by status
  const newCount = currentItems.filter(item => item.status === STATUS.NEW).length;
  const planningCount = currentItems.filter(item => item.status === STATUS.PLANNING).length;
  const activeCount = currentItems.filter(item => item.status === STATUS.ACTIVE).length;
  const revisingCount = currentItems.filter(item => item.status === STATUS.REVISING).length;
  const overdueCount = currentItems.filter(item => item.status === STATUS.OVERDUE).length;
  const closureCount = currentItems.filter(item => item.status === STATUS.CLOSURE).length;
  
  // Update column headers with counts
  const headers = document.querySelectorAll(".column h2");
  headers[0].textContent = `New (${newCount})`;
  headers[1].textContent = `Planning (${planningCount})`;
  headers[2].textContent = `Active (${activeCount})`;
  headers[3].textContent = `Revising (${revisingCount})`;
  headers[4].textContent = `Overdue (${overdueCount})`;
  headers[5].textContent = `Closure (${closureCount})`;
  
  // Render items to appropriate containers
  currentItems.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    
    const titleSpan = document.createElement("span");
    titleSpan.textContent = item.title;
    itemElement.appendChild(titleSpan);
    
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "item-actions";
    
    // Add "Go Back" button for items that can go back
    if (item.status !== STATUS.NEW && item.status !== STATUS.OVERDUE) {
      const backButton = document.createElement("button");
      backButton.textContent = "Go Back";
      backButton.className = "btn-back";
      backButton.onclick = () => moveItemToPrevious(item.id);
      actionsDiv.appendChild(backButton);
    }
    
    // Add progress button if not in closure status
    const buttonText = getButtonText(item.status);
    if (buttonText) {
      const button = document.createElement("button");
      button.textContent = buttonText;
      button.style.backgroundColor = item.status === STATUS.OVERDUE ? "#d32f2f" : "#c9a96e";
      button.style.color = "#ffffff";
      button.style.border = "none";
      button.style.padding = "6px 12px";
      button.style.borderRadius = "4px";
      button.style.fontSize = "12px";
      button.style.cursor = "pointer";
      button.style.fontWeight = "500";
      button.onclick = () => updateItemStatus(item.id);
      actionsDiv.appendChild(button);
    }
    
    if (actionsDiv.children.length > 0) {
      itemElement.appendChild(actionsDiv);
    }
    
    // Place item in correct container
    const containers = {
      [STATUS.NEW]: newContainer,
      [STATUS.PLANNING]: planningContainer,
      [STATUS.ACTIVE]: activeContainer,
      [STATUS.REVISING]: revisingContainer,
      [STATUS.OVERDUE]: overdueContainer,
      [STATUS.CLOSURE]: closureContainer
    };
    
    containers[item.status].appendChild(itemElement);
  });
}

// Event listeners
document.getElementById("addBtn").addEventListener("click", addItem);
document.getElementById("newTitle").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addItem();
});

// Initial render
renderItems();

console.log("App loaded", currentItems);
