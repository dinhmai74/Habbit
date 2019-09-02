import { TaskLifelogModel, TaskRawModel, TypeSchedule } from "app/model";
import { strings } from "app/themes";
import _ from "lodash";
import moment from "moment";

/**
 * today helper
 * @param todayTasks
 */
export function filterTodayTasks(todayTasks) {
  todayTasks = _.filter(todayTasks, (task: TaskRawModel) => {
    let result = 0;
    _.forEach(task.archived, arc => {
      if (moment(arc.date).isSame(moment(), "day")) {
        result++;
      }
    });

    return result > 0;
  });
  return todayTasks;
}

export function countTheDoneTasksInToday(todayTasks) {
  let done = 0;
  _.forEach(todayTasks, task => {
    if (task.archived[moment().format(strings.format.date)].status === "done") {
      done += 1;
    }
  });
  return done;
}

/**
 * get task base on type helpers
 * @param tasks
 * @param inputType
 */
export function getTaskBaseOnType(
  tasks: TaskLifelogModel[],
  inputType: TypeSchedule
) {
  return _.filter(tasks, (e: TaskLifelogModel) => {
    if (e.schedule) {
      const { type } = e.schedule;
      if (type === inputType) {
        return true;
      }
    }
    return false;
  });
}

export function mapDoneAndTotalStatus(
  tasks: TaskLifelogModel[],
  type: "month" | "week" = "week"
) {
  tasks = _.forEach(tasks, task => {
    task.done = countDoneTaskFromOriginTask(task, type);
    task.total = task.schedule.times[0];
  });

  return tasks;
}

export function countDoneTaskFromOriginTask(task, type) {
  let done = 0;
  _.forEach(task.archived, archive => {
    const isThisArchiveInDiff = moment().isSame(archive.date, type);
    if (isThisArchiveInDiff) {
      if (archive.status === "done") {
        done++;
      }
    }
  });

  return done;
}

export function mapDoneAndTotalStatusForDailyTasks(tasks: TaskLifelogModel[]) {
  tasks = _.forEach(tasks, task => {
    let done = 0;
    _.forEach(task.archived, archive => {
      const day = moment(archive.date).day();
      if (_.includes(task.schedule.times, day)) {
        if (archive.status === "done") {
          done++;
        }
      }
    });
    task.done = done;
    task.total = task.schedule.times.length;
  });
  return tasks;
}

/***
 montly helper
 **/
export const getTheMonthlyTasks = (tasks: TaskLifelogModel[]) => {
  return _.filter(tasks, (e: TaskLifelogModel) => {
    if (e.schedule) {
      const { type } = e.schedule;
      if (type === "monthly") {
        return true;
      }
    }
    return false;
  });
};
