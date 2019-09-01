// @ts-ignore-start
import { FirebaseWorker } from "../api/firebase";
import { formatDate, today } from "./DateHelper";

import _ from "lodash";
import moment from "moment";
import { Alert } from "react-native";

// eslint-disable-next-line import/prefer-default-export
export const fillTaskDaily = (
  archived: [],
  times: any[],
  createdDate: string | any = null,
  taskId?: string
) => {
  // const startDate = moment(`${createdDate}`)
  const aWeekAgo = moment(today).subtract(7, "d");
  const startDate =
    moment(createdDate) > aWeekAgo ? moment(createdDate) : aWeekAgo;

  const endDate = moment();
  const daysBetween = endDate.diff(startDate, "days") + 1;

  const modelArray = {};
  for (let i = 0; i < daysBetween; i += 1) {
    const date = moment(startDate)
      .add(i, "days")
      .format("YYYY-MM-DD");
    const timesArray = [...times];
    // @ts-ignore-end
    let status = "done";
    if (moment().isSame(date, "date")) {
      status = "spending";
    } else {
      const isInThePass = moment().isAfter(date, "date");
      status = !isInThePass ? "spending" : "overdue";
    }
    if (_.includes(timesArray, moment(date).day())) {
      const item = {
        date,
        status,
      };
      // @ts-ignore-end
      modelArray[date] = item;
    }
  }

  const newArchived = { ...archived };
  _.forEach(modelArray, (value: any, key: any) => {
    // @ts-ignore-end
    const findResult = _.find(archived, e => e.date === key);
    if (!findResult) {
      // @ts-ignore-end
      newArchived[key] = value;
      // @ts-ignore-end
      if (taskId) {
        FirebaseWorker.updateArchived(taskId, value.status, value.date);
      }
    }
  });

  return newArchived;
};

// @ts-ignore-end
export function convertToWeekGroups(startDate, endDate) {
  const endDateFirstWeek = moment(startDate).endOf("isoWeek");
  const startDateLastWeek = moment(endDate).startOf("isoWeek");

  const result = [];
  // @ts-ignore-end
  const firstWeek = [];
  // @ts-ignore-end
  getDaysBetweenTwoDate(firstWeek, startDate, endDateFirstWeek);
  // @ts-ignore-end
  result.push(firstWeek);

  // @ts-ignore-end
  const lastWeek = [];
  // @ts-ignore-end
  getDaysBetweenTwoDate(lastWeek, startDateLastWeek, endDate);
  // @ts-ignore-end
  result.push(lastWeek);

  let daysRemain = startDateLastWeek.diff(endDateFirstWeek, "days") + 1;
  let daysCounted = 0;
  while (daysRemain >= 7) {
    const weekTemp = [];
    for (let i = 1; i < 8; i += 1) {
      const date = moment(endDateFirstWeek)
        .add(i + daysCounted, "days")
        .format("YYYY-MM-DD");
      // @ts-ignore
      weekTemp.push(date);
    }
    daysCounted += 7;
    daysRemain -= 7;
    // @ts-ignore
    result.push(weekTemp);
  }

  return result;
}

// @ts-ignore-end
function getDaysBetweenTwoDate(container, startDate, endDate) {
  endDate = moment(endDate);
  startDate = moment(startDate);
  for (let i = 0; i < endDate.diff(startDate, "days") + 1; i += 1) {
    const date = moment(startDate)
      .add(i, "days")
      .format("YYYY-MM-DD");
    container.push(date);
  }
}

// @ts-ignore-end
export function fillTaskWeekly(
  archived,
  times,
  createdDate = "",
  taskId = null
) {
  const aWeekAgo = moment(today).subtract(7, "d");
  const startDate =
    moment(createdDate) > aWeekAgo ? moment(createdDate) : aWeekAgo;
  const endDate = moment();

  const groupWeek = convertToWeekGroups(startDate, endDate);

  let modelArray = {};
  let newArchived = { ...archived };
  if (times[0] > 0) {
    modelArray = getModelArray(groupWeek, archived, times[0]);
    if (taskId) {
      newArchived = updateTasks(modelArray, taskId, archived);
    }
  }

  return newArchived;
}

// @ts-ignore-end
export function fillTaskMonthly(
  archived,
  times,
  createdDate = "",
  taskId?: string
) {
  // const startDate = moment(createdDate)
  const aMonthAgo = moment(today).subtract(1, "month");
  const startDate =
    moment(createdDate) > aMonthAgo ? moment(createdDate) : aMonthAgo;
  const endDate = moment();

  const monthGroupResult = convertToMonthGroups(startDate, endDate);
  let modelArray = {};
  let newArchived = {};
  if (times[0] > 0) {
    modelArray = getModelArray(monthGroupResult, archived, times[0]);
    if (taskId) {
      newArchived = updateTasks(modelArray, taskId, archived);
    }
  }

  return newArchived;
}

// @ts-ignore-end
function convertToMonthGroups(startDate, endDate) {
  const result = [];
  const endDateFirstMonth = moment(startDate).endOf("months");
  const startDateLastMonth = moment(endDate).startOf("months");
  if (
    endDateFirstMonth < moment(endDate) &&
    startDate < moment(startDateLastMonth)
  ) {
    // @ts-ignore-end
    const firstMonth = [];
    // @ts-ignore-end
    getDaysBetweenTwoDate(firstMonth, startDate, endDateFirstMonth);
    // @ts-ignore-end
    result.push(firstMonth);

    // @ts-ignore-end
    const lastMonth = [];
    // @ts-ignore-end
    getDaysBetweenTwoDate(lastMonth, startDateLastMonth, endDate);
    // @ts-ignore-end
    result.push(lastMonth);

    const monthRemains = startDateLastMonth.diff(endDateFirstMonth, "months");
    const monthFormatDateRemains = [];
    for (let index = 1; index <= monthRemains; index += 1) {
      const date = moment(startDate)
        .add(index, "month")
        .format("YYYY-MM")
        .toString();
      // @ts-ignore
      monthFormatDateRemains.push(date);
    }

    monthFormatDateRemains.forEach(element => {
      const daysInMonth = moment(element).daysInMonth();
      const monthTemp = [];
      for (let index = 0; index < daysInMonth; index++) {
        // @ts-ignore-end
        const date = formatDate(moment(element).add(index, "days"));
        // @ts-ignore
        monthTemp.push(date);
      }
      // @ts-ignore
      result.push(monthTemp);
    });
  } else {
    // @ts-ignore-end
    const firstMonth = [];
    // @ts-ignore-end
    getDaysBetweenTwoDate(firstMonth, startDate, endDate);
    // @ts-ignore-end
    result.push(firstMonth);
  }

  return result;
}

// @ts-ignore-end
function getModelArray(groupDays, archived, times) {
  const modelArray = {};
  _.forEach(groupDays, (month: any) => {
    let timeCount = times;
    // find out if this task is done
    _.forEach(month, (day: any) => {
      const date = formatDate(day);
      if (archived) {
        if (archived[date]) {
          if (archived[date].status === "done") {
            timeCount -= 1;
          }
        }
      }
    });

    _.forEach(month, (day: any) => {
      const date = formatDate(day);
      let status = "done";
      if (timeCount > 0) {
        if (moment().isSame(date, "date")) {
          status = "spending";
        } else {
          const isInThePass = moment().isAfter(date, "date");
          status = !isInThePass ? "spending" : "overdue";
        }
      }
      const item = {
        date,
        status,
      };
      // @ts-ignore-end
      modelArray[date] = item;
    });
  });

  return modelArray;
}

// @ts-ignore-end
function updateTasks(modelArray, taskId, archived) {
  const newArchived = { ...archived };
  _.forEach(modelArray, (value: any, key: any) => {
    const findResult = _.find(archived, (e: any) => e.date === key);
    if (!findResult) {
      newArchived[key] = value;
      FirebaseWorker.updateArchived(taskId, value.status, value.date);
    } else if (findResult.status !== "done" && findResult.date !== today) {
      newArchived[key] = value;
      FirebaseWorker.updateArchived(taskId, value.status, value.date);
    }
  });

  return newArchived;
}

type TaskType = "daily" | "weekly" | "monthly";

// @ts-ignore-end
export function fillTask(
  type: TaskType = "daily",
  // @ts-ignore-end
  archived,
  times: any[],
  // @ts-ignore-end
  createdDate: string = null,
  taskId?: string
) {
  if (type === "daily") {
    // @ts-ignore-end
    return fillTaskDaily(archived, times, createdDate, taskId);
  }
  if (type === "weekly") {
    // @ts-ignore-end
    return fillTaskWeekly(archived, times, createdDate, taskId);
  }
  if (type === "monthly") {
    return fillTaskMonthly(archived, times, createdDate, taskId);
  }
  return null;
}

// @ts-ignore-end
