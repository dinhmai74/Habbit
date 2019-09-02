// @flow
// @ts-nocheck
export type TimeShiftType = "morning" | "afternoon" | "evening";
export type TypeSchedule = "daily" | "weekly" | "monthly";
export type ArchivedTaskModel = "done" | "overdue" | "spending";

export interface IArchived {
  date: string;
  status: ArchivedTaskModel;
}

export interface ScheduleTaskModel {
  shift: TimeShiftType;
  times: number[];
  type: TypeSchedule;
}

export interface IconDisplayModel {
  color: string;
  name: string;
}

export interface TaskDisplayModel {
  date: string;
  icon: IconDisplayModel;
  quest: string;
  status: "complete" | "spending" | "skipped";
  schedule: ScheduleTaskModel;
  taskDuringTime: number;
}

export interface TaskRawModel {
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
  schedule: ScheduleTaskModel;
}

export interface TaskFormattedModel {
  quest: string;
  icon: {
    color: string;
    name: string;
  };
  date: string;
  status: ArchivedTaskModel;
  taskDuringTime: number;
  id: string;
  archived: IArchived[];
}
