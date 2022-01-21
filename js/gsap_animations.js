gsap.registerPlugin(ScrollTrigger)

gsap.from('.main_header_text', {
  duration: 1.3,
  opacity: 0.0,
  x: 70,
  ease: 'power4.out',
  delay: 0,
})

// animations for the elements in the image grid with delay
const third_img_grid = [
  '.th_img_1',
  '.th_img_2',
  '.th_img_3',
  '.th_img_4',
  '.th_img_5',
  '.th_img_6',
  '.th_img_7',
  '.th_img_8',
]

for (let i = 0; i < third_img_grid.length; i++) {
  let element = third_img_grid[i]

  gsap.from(element, {
    duration: 0.6,
    opacity: 0,
    x: 30,
    delay: i / 10,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.gallery_box',
    },
  })
}
