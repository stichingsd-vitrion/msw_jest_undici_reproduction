
import { http, HttpHandler } from "msw";
import { generateCollection } from "../../mock.helpers";


export const notificationsMocked: any[] = [
  {
    "@id": "/api/v1/notifications/164374",
    "@type": "Notification",
    active: 1,
    activity: "/api/v1/activities/1624500",
    alert: false,
    createdAt: "2024-03-26T11:17:15+01:00",
    createdBy: "/api/v1/users/1624500",
    deletedAt: null,
    id: 164374,
    location: "/api/v1/locations/1624500",
    message: "Dion heeft deze taak aan jou toegewezen.",
    messageApp: "Dion heeft deze taak aan jou toegewezen.",
    messageWeb: "Dion heeft deze taak aan jou toegewezen.",
    readAt: null,
    report: null,
    sentAt: null,
    task: "/api/v1/tasks/1624500",
    title: "asdasdasd",
    type: "TYPE_TASK_ASSIGNED",
    updatedAt: "2024-03-26T11:17:15+01:00",
  },
];
export const notificationsHideMocked: any[] = [
  {
    "@id": "/api/v1/notifications/164439",
    "@type": "Notification",
    active: 0,
    activity: "/api/v1/activities/1624500",
    alert: false,
    createdAt: "2024-03-26T13:18:56+01:00",
    createdBy: "/api/v1/users/1624500",
    deletedAt: null,
    id: 164439,
    location: "/api/v1/locations/1624500",
    message: "Dion heeft jou verwijderd van de toewijzing.",
    messageApp: "Dion heeft jou verwijderd van de toewijzing.",
    messageWeb: "Dion heeft jou verwijderd van de toewijzing.",
    readAt: "2024-03-31T15:47:30+02:00",
    report: null,
    sentAt: null,
    task: "/api/v1/tasks/1624500",
    title: "Test",
    type: "TYPE_TASK_ASSIGNED",
    updatedAt: "2024-03-26T13:18:56+01:00",
  },
];
export const generateNotification = (
  id: number,
  override?: Partial<any>,
): any => ({
  ...notificationsMocked[id - 1],
  ...override,
});

export const UserNotificationsGetHandler = ({
  getItem = generateNotification,
  itemCount = notificationsMocked.length,
}: {
  getItem?: (id: number) => any;
  itemCount?: number;
} = {}) =>
  http.get(
    "https://api.verbleif.dev/api/v1/users/:userId/notifications",
    ({ request, params }) => {
      const { userId } = params;
      return generateCollection<any>({
        baseUri: `https://api.verbleif.dev/api/v1/users/${userId}/notifications`,
        request,
        itemCount,
        getItem,
      });
    },
  );

export const NotificationsHandlers: HttpHandler[] = [
  UserNotificationsGetHandler(),
];
