declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "swiper/css";
