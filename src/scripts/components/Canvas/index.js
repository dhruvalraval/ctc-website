import * as THREE from 'three'
import gsap from 'gsap'

export default class Canvas {
	constructor ({ template}) {
			this.template = template

			this.y = {
			start: 0,
			distance: 0,
			end: 0
			}

			this.clock = new THREE.Clock()

			this.createRenderer()
			this.createScene()
			this.createCamera()
			this.createGeometry()
			this.createLights()

			this.onResize()
			this.onChange(template)
	}

	createRenderer () {
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio || 1)
		this.renderer.autoClear = true
		document.body.appendChild(this.renderer.domElement)
	}

	createCamera () {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
		this.camera.position.z = 5
	}

	createScene() {
		this.scene = new THREE.Scene()
	}

	createGeometry() {
		let blobGeometry
		if(window.innerWidth < 750){
			blobGeometry = new THREE.SphereGeometry(1.2, 10, 10)
		} else {
			blobGeometry = new THREE.SphereGeometry(1.2, 40, 40)
		}

		const blobMaterial = new THREE.MeshPhongMaterial( {
			color: 0xEBAD3C,
			shininess: 100,
			transparent: true,
			opacity: 1
		})
		this.mesh = new THREE.Mesh(blobGeometry, blobMaterial)
		this.mesh.position.set(-1, -0.8, 0.6)
		this.scene.add(this.mesh)

	}

	createLights() {
		this.lightTop = new THREE.DirectionalLight(0xFFFFFF, .7)
		this.lightTop.position.set(0, 500, 200)
		this.scene.add(this.lightTop)
	  
		this.lightBottom = new THREE.DirectionalLight(0xFFFFFF, .25)
		this.lightBottom.position.set(0, -500, 400)
		this.scene.add(this.lightBottom)
	  
		this.ambientLight = new THREE.AmbientLight(0x798296)
		this.scene.add(this.ambientLight)
	}

  /**
   * Events
   */

	onPreloaded(template) {
		this.template = template
		this.onChange(this.template)
	}


	onChange(template) {
		this.template = template

		

	}

	onResize() {
		const windowWidth = window.innerWidth
		const windowHeight = window.innerHeight

		this.camera.aspect = windowWidth/windowHeight
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(windowWidth, windowHeight)
	}

	onMouseMove( e ) {


	}
	/**
	 * Loop
	 */

	update(scroll) {
		this.renderer.render(this.scene, this.camera)
		this.composer.render()
	}
}


