import { STATUS, items } from "./data.js";

let currentItems = [...items];
let nextId = Math.max(...items.map(item => item.id)) + 1;

// Get DOM containers
const frameContainer = document.getElementById("col-frame");
const conceptContainer = document.getElementById("col-concept");
const prototypeContainer = document.getElementById("col-prototype");
const marketTestContainer = document.getElementById("col-market-test");
const commercializeContainer = document.getElementById("col-commercialize");
const enhanceContainer = document.getElementById("col-enhance");
const statusGrid = document.getElementById("status-grid");

// Function to get next status
function getNextStatus(currentStatus) {
  const statusFlow = {
    [STATUS.FRAME]: STATUS.CONCEPT,
    [STATUS.CONCEPT]: STATUS.PROTOTYPE,
    [STATUS.PROTOTYPE]: STATUS.MARKET_TEST,
    [STATUS.MARKET_TEST]: STATUS.COMMERCIALIZE,
    [STATUS.COMMERCIALIZE]: STATUS.ENHANCE,
    [STATUS.ENHANCE]: STATUS.ENHANCE
  };
  return statusFlow[currentStatus];
}

// Function to get status display name
function getStatusDisplayName(status) {
  const statusNames = {
    [STATUS.FRAME]: "Frame",
    [STATUS.CONCEPT]: "Concept",
    [STATUS.PROTOTYPE]: "Prototype",
    [STATUS.MARKET_TEST]: "Market Test",
    [STATUS.COMMERCIALIZE]: "Commercialize",
    [STATUS.ENHANCE]: "Enhance"
  };
  return statusNames[status];
}

// Function to get current date in YYYY-MM-DD format
function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Function to get button text
function getButtonText(status) {
  const buttonTexts = {
    [STATUS.FRAME]: "Conceptualize",
    [STATUS.CONCEPT]: "Build",
    [STATUS.PROTOTYPE]: "Test",
    [STATUS.MARKET_TEST]: "Launch",
    [STATUS.COMMERCIALIZE]: "Improve",
    [STATUS.ENHANCE]: null
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
    status: STATUS.FRAME,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate()
  };
  
  currentItems.push(newItem);
  input.value = "";
  renderItems();
}

// Function to delete item
function deleteItem(itemId) {
  if (confirm("Are you sure you want to delete this item?")) {
    const index = currentItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      currentItems.splice(index, 1);
      renderItems();
    }
  }
}

// Function to update item status
function updateItemStatus(itemId) {
  const item = currentItems.find(item => item.id === itemId);
  if (item) {
    const nextStatus = getNextStatus(item.status);
    if (nextStatus) {
      item.status = nextStatus;
      item.updatedAt = getCurrentDate();
      renderItems();
    }
  }
}

// Function to render all items
function renderItems() {
  // Clear all containers
  frameContainer.innerHTML = "";
  conceptContainer.innerHTML = "";
  prototypeContainer.innerHTML = "";
  marketTestContainer.innerHTML = "";
  commercializeContainer.innerHTML = "";
  enhanceContainer.innerHTML = "";
  
  // Count items by status
  const frameCount = currentItems.filter(item => item.status === STATUS.FRAME).length;
  const conceptCount = currentItems.filter(item => item.status === STATUS.CONCEPT).length;
  const prototypeCount = currentItems.filter(item => item.status === STATUS.PROTOTYPE).length;
  const marketTestCount = currentItems.filter(item => item.status === STATUS.MARKET_TEST).length;
  const commercializeCount = currentItems.filter(item => item.status === STATUS.COMMERCIALIZE).length;
  const enhanceCount = currentItems.filter(item => item.status === STATUS.ENHANCE).length;
  
  // Update column headers with counts
  const headers = document.querySelectorAll(".column h2");
  headers[0].textContent = `Frame (${frameCount})`;
  headers[1].textContent = `Concept (${conceptCount})`;
  headers[2].textContent = `Prototype (${prototypeCount})`;
  headers[3].textContent = `Market Test (${marketTestCount})`;
  headers[4].textContent = `Commercialize (${commercializeCount})`;
  headers[5].textContent = `Enhance (${enhanceCount})`;
  
  // Render items to appropriate containers
  currentItems.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    
    // Add "X" delete button in top-right corner
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.className = "btn-delete";
    deleteButton.onclick = () => deleteItem(item.id);
    itemElement.appendChild(deleteButton);
    
    const titleSpan = document.createElement("span");
    titleSpan.textContent = item.title;
    itemElement.appendChild(titleSpan);
    
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "item-actions";
    
    // Add progress button if not in closure status
    const buttonText = getButtonText(item.status);
    if (buttonText) {
      const button = document.createElement("button");
      button.textContent = buttonText;
      button.style.backgroundColor = "#c9a96e";
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
      [STATUS.FRAME]: frameContainer,
      [STATUS.CONCEPT]: conceptContainer,
      [STATUS.PROTOTYPE]: prototypeContainer,
      [STATUS.MARKET_TEST]: marketTestContainer,
      [STATUS.COMMERCIALIZE]: commercializeContainer,
      [STATUS.ENHANCE]: enhanceContainer
    };
    
    containers[item.status].appendChild(itemElement);
  });
  
  // Render project status cards
  renderProjectStatus();
}

// Function to render project status overview
function renderProjectStatus() {
  statusGrid.innerHTML = "";
  
  currentItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "status-card";
    
    const title = document.createElement("div");
    title.className = "status-card-title";
    title.textContent = item.title;
    card.appendChild(title);
    
    const stage = document.createElement("div");
    stage.className = "status-card-stage";
    stage.textContent = getStatusDisplayName(item.status);
    card.appendChild(stage);
    
    const dates = document.createElement("div");
    dates.className = "status-card-dates";
    dates.innerHTML = `
      <div>Created: ${item.createdAt || getCurrentDate()}</div>
      <div>Updated: ${item.updatedAt || getCurrentDate()}</div>
    `;
    card.appendChild(dates);
    
    statusGrid.appendChild(card);
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
