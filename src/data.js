export const STATUS = {
  NEW: "new",
  PLANNING: "planning",
  ACTIVE: "active",
  REVISING: "revising",
  OVERDUE: "overdue",
  CLOSURE: "closure"
};

// Previous status mapping for "Go Back" functionality
const PREVIOUS_STATUS = {
  [STATUS.PLANNING]: STATUS.NEW,
  [STATUS.ACTIVE]: STATUS.PLANNING,
  [STATUS.REVISING]: STATUS.ACTIVE,
  [STATUS.CLOSURE]: STATUS.REVISING
};

export const items = [
  {
    id: 1,
    title: "Mobile App Redesign",
    status: STATUS.ACTIVE
  },
  {
    id: 2,
    title: "E-commerce Platform",
    status: STATUS.PLANNING
  },
  {
    id: 3,
    title: "AI Chatbot Integration",
    status: STATUS.NEW
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    status: STATUS.REVISING
  },
  {
    id: 5,
    title: "Cloud Migration Project",
    status: STATUS.OVERDUE
  },
  {
    id: 6,
    title: "User Authentication System",
    status: STATUS.CLOSURE
  }
];

export function moveToPrevious(itemId) {
  const item = items.find(item => item.id === itemId);
  if (!item) return false;
  
  const previousStatus = PREVIOUS_STATUS[item.status];
  if (!previousStatus) return false;
  
  item.status = previousStatus;
  return true;
}
