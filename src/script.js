import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
 
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const flagTexture = textureLoader.load('/textures/flag-french.jpg');

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        // uFrequency: { value: 10 } // initial value
        uFrequency :{value: new THREE.Vector2(10,5)},
        uTime: { value: 0 },
        uColor:{value : new THREE.Color('orange')},
        uTexture: { value: flagTexture }
    },
    // side:THREE.DoubleSide,
    // wireframe:true,
    // transparent:true
})

gui.add(material.uniforms.uFrequency.value,'x').min(0).max(10).step(0.01)
gui.add(material.uniforms.uFrequency.value,'y').min(0).max(10).step(0.01)


// How many vertices?
const count = geometry.attributes.position.count

// Create an array for random values
const randoms = new Float32Array(count)

// Fill array with random values
for(let i = 0; i < count; i++) {
    randoms[i] = Math.random()
}

// Add array as an attribute to the geometry
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))



// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.scale.y=2/3
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
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

    //Update MAterial
    material.uniforms.uTime.value=elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()