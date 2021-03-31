import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug panel
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object 1
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 )
//const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64)
const geometry = new THREE.BoxGeometry( 3, 3, 3 )

// Material 1
const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0x0000ff)
material.opacity = 0.1
material.transparent = true
//material.wireframe = true

// Mesh 1
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
scene.add( line );

const cube = new THREE.Mesh(geometry,material)
scene.add(cube)

// Object 2
const deadzone = new THREE.BoxGeometry(1, 1, 1)

// Material 2
const deadZoneMaterial = new THREE.MeshBasicMaterial()
deadZoneMaterial.color = new THREE.Color(0xff0000)
//deadZoneMaterial.transparent = true
deadZoneMaterial.opacity = 0.5

// Mesh 2
const deadZoneMesh = new THREE.Mesh(deadzone, deadZoneMaterial)
scene.add(deadZoneMesh)


// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// When browser is resized
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

// Position the bin
cube.position.y = 1
cube.position.z = -1
line.position.y = 1
line.position.z = -1

// Position the deadzone
//deadzone.position.y = -1

// Grid lines
const size = 10
const divisions = 100
const colorCenterLine = 0x000000
const colorGrid = 0x888888

const gridHelper = new THREE.GridHelper( size, divisions, colorCenterLine, colorGrid )
scene.add( gridHelper )

// Position the grid
gridHelper.position.y = -0.5

// Mouse control
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.update()


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, //white canvas if true
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
