// @flow
// @ts-nocheck
export type TimeShift = "morning" | "afternoon" | "evening";
export type TypeSchedule = "daily" | "weekly" | "monthly";
export type TArchivedStatus = "done" | "overdue" | "spending";
export interface IArchived {
  date: string;
  status: TArchivedStatus;
}

export interface ISchedule {
  shift: TimeShift;
  times: number[];
  type: TypeSchedule;
}

export interface IIconHabit {
  color: string;
  name: string;
}

export interface ITask {
  date: string;
  icon: IIconHabit;
  quest: string;
  status: "complete" | "spending" | "skipped";
  schedule: ISchedule;
  taskDuringTime: number;
}

export interface IHabitRawItem {
  quest: string;
  icon: {
    color: string;
    name: string;
  };
  archived: IArchived[];
  id: string;
  taskDuringTime: number;
  createdDate: string;
  uid: string;
  schedule: ISchedule;
}

export interface IHabitItem {
  quest: string;
  icon: {
    color: string;
    name: string;
  };
  date: string;
  status: TArchivedStatus;
  taskDuringTime: number;
  id: string;
  archived: IArchived[];
}
