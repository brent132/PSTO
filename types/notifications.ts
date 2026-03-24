export type NotificationItem = {
  id: number; // notification_recipients.id
  is_read: boolean;
  read_at: string | null;
  delivered_at: string;
  notification: {
    id: number;
    title: string;
    message: string;
    type: string;
    priority: string;
    reference_type: string | null;
    reference_id: number | null;
    action_url: string | null;
    created_at: string;
    creator: {
      id: number;
      username: string;
      firstName: string;
      middleName: string;
      lastName: string;
      suffix: string;
    } | null;
  };
};
