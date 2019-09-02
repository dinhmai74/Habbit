import { IconDisplayModel } from "app/model/TaskModel";

export type NativeBaseIconType =
  | "AntDesign"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

export interface IconAndNameModel {
  taskId: string;
  quest: string;
  icon: IconDisplayModel;
}
