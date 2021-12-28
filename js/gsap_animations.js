gsap.registerPlugin(ScrollTrigger)

gsap.from('.main_header_text', {
  duration: 1.3,
  opacity: 0.0,
  x: 70,
  ease: 'power4.out',
  delay: 0,
})

// animations for the elements in the image grid with delay
const third_img_grid = ['.th_img_1', '.th_img_2', '.th_img_3', '.th_img_4']

for (let i = 0; i < third_img_grid.length; i++) {
  let element = third_img_grid[i]

  gsap.from(element, {
    duration: 0.9,
    opacity: 0,
    x: 50,
    delay: i / 6,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.third_img',
    },
  })
}
