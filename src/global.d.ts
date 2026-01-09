/** biome-ignore-all lint/style/noDefaultExport: < THis is needed > */
declare module "*.module.css" {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
declare module "*.module.scss" {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
