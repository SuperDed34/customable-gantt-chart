export const scrollToElement = (id) => {
  const element = document.getElementById(id);
  const viewPort = document.querySelector('.field')
  if (element) {
    const elementPosition = element.getBoundingClientRect().left + window.pageXOffset;
    const offsetPosition = elementPosition - (window.innerWidth / 2) + (element.clientWidth / 2);

    viewPort.scrollTo({
      left: offsetPosition,
      behavior: "smooth"
    });
  }
};