import { HttpHandler } from "msw";
import { NotificationsHandlers } from "./handlers/api/Notifications.handlers";


export const handlers: HttpHandler[] = [
  ...NotificationsHandlers,
];
