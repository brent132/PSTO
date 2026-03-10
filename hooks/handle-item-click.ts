export function HandleItemClick(
  isMobile: boolean,
  setOpenMobile: (open: boolean) => void,
) {
  if (isMobile) {
    setOpenMobile(false);
  }
}
