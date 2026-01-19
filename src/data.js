export const STATUS = {
  NEW: "new",
  PLANNING: "planning",
  ACTIVE: "active",
  REVISING: "revising",
  OVERDUE: "overdue",
  CLOSURE: "closure"
};

export const items = [
  {
    id: 1,
    title: "First content idea",
    status: STATUS.ACTIVE
  },
  {
    id: 2,
    title: "Second content idea",
    status: STATUS.PLANNING
  },
  {
    id: 3,
    title: "Write project documentation",
    status: STATUS.NEW
  },
  {
    id: 4,
    title: "Review final deliverables",
    status: STATUS.REVISING
  },
  {
    id: 5,
    title: "Overdue task example",
    status: STATUS.OVERDUE
  },
  {
    id: 6,
    title: "Completed project",
    status: STATUS.CLOSURE
  }
];
