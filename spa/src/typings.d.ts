/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare interface PushSubscribeOptions {
  userVisibleOnly?: boolean;
  applicationServerKey?: Uint8Array;
}