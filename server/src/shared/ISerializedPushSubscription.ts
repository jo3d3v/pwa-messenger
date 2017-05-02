/**
 * Interface for PushSubscriptions.
 */
export interface ISerializedPushSubscription {
    endpoint: string;
    auth: string;
    p256dh: string;
}