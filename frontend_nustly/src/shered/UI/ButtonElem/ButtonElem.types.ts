export type ButtonPropsType = {
  clName: string | null;
  title: string | null;
  handler: (data?: any) => Promise<void> | void | null;
  width: string | null;
  height: string | null;
  background: string | null;
  textColor: string | null;
  fontSize: string | null;
  fontWeight: string | null;
  margin: string | null;
  borderRadius: string | null;
  icon: Element | null;
};