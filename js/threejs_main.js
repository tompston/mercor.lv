import * as THREE from 'three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from '../node_modules/three/examples/jsm/loaders/DRACOLoader.js'
// import Stats from '../node_modules/three/examples/jsm/libs/stats.module'

import matcap_1_link from '/models/wood.png'

export function init_camera(container_width, container_height) {
  const fov = 40
  const aspect = container_width / container_height // the canvas default
  const near = 1
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  let cam_cord = 13
  camera.position.set(cam_cord, 18, cam_cord)

  return camera
}
export function helper_grid(scene, size, divisions) {
  let gridHelper = new THREE.GridHelper(size, divisions)
  return scene.add(gridHelper)
}

export function resizeCanvasToDisplaySize(camera, renderer) {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
}

// const stats = new Stats()
// const clock = new THREE.Clock()

const model_name = 'models/mercor_model.glb'
const container_name = '.top_content_right'
const canvas_name = '#mercor_model'

const container_element = document.querySelector(container_name)
let container_height = container_element.clientHeight
let container_width = container_element.clientWidth

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector(canvas_name),
})

renderer.physicallyCorrectLights = true
renderer.shadowMap = THREE.PCFSoftShadowMap
renderer.setPixelRatio(window.devicePixelRatio) // antialias for mobile
renderer.outputEncoding = THREE.sRGBEncoding
container_element.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

let mixer
const camera = init_camera(container_width, container_height)

// -- initialize controls for interactivity
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(1, 1, 1) // controls.update();
controls.enablePan = true
controls.minDistance = 5
controls.maxDistance = 40
controls.enableDamping = true
controls.dampingFactor = 0.025

// - light source
const lightsource = new THREE.SpotLight(0xffffff, 50, 24)
lightsource.position.set(-2, 10, 0)
lightsource.angle = 1
lightsource.castShadow = true
scene.add(lightsource)

// loading gltf models
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('js/libs/draco/gltf/')
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)

// -- laod the matcap with TextureLoader
const textureLoader = new THREE.TextureLoader()
const matcap_1 = textureLoader.load(matcap_1_link)

loader.load(
  model_name,
  function (gltf) {
    let model = gltf.scene

    const SCALE = 1.4
    model.scale.set(SCALE, SCALE, SCALE)

    model.castShadow = true
    model.position.set(0, 0, 0)

    mixer = new THREE.AnimationMixer(model)

    scene.add(model)

    let main_mesh = model.children[0]

    // assign the imported matcap to the model
    main_mesh.material = new THREE.MeshMatcapMaterial({
      // normalMap: normalmap
      matcap: matcap_1,
    })

    animate()
  },
  undefined,
  function (e) {
    console.error(e)
  },
)

function animate() {
  requestAnimationFrame(animate)
  //   const delta = clock.getDelta()

  resizeCanvasToDisplaySize(camera, renderer)

  //   mixer.update(delta)
  controls.update()
  //   stats.update()

  renderer.render(scene, camera)
}

let temp_grid = helper_grid(scene, 20, 20)
