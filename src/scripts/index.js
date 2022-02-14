import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import { each } from 'lodash'

import barba from '@barba/core'

// import Canvas from './components/Canvas'
import Navigation from './components/Navigation'
import Menu from './animations/Menu'

import Home from './pages/Home/index'
import About from './pages/About/index'

class App {
    constructor() {
        
        this.createContent()
        
        this.createNavigation()
        this.createPages()
        
        this.onPreloaded()
        // this.createCanvas()

        this.createMenu()

        this.addEventListeners()
        
        this.onResize()
        
        // this.update()      
        
        this.addLinkListeners()

        this.scroll = null
        
    }

    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }
    
    createMenu() {
        this.menu = new Menu()
        this.menuClose = document.querySelector('.menu_close')
        this.menuOpen = document.querySelector('.navigation_list_item')
    }

    createNavigation () {
        this.navigation = new Navigation({
          template: this.template
        })
    }

    createPages () {
        this.pages = {
          home: new Home(),
          about: new About()
        }
        
        this.page = this.pages[this.template]
        this.page.create()
    }
    
    createCanvas() {
        this.canvas = new Canvas({
            template: this.template
        })
    }

    startBarba(){
        
        barba.init({
            transitions: [{
              name: 'default-transition',
              leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0
                });
              },
              enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0
                });
              }
            }]
        });

        barba.hooks.after(() => {
            this.scroll.update();
        });
    }


    onPreloaded () {
        
        let LOAD_FLAG = false
        this.onResize()
        const imgLoad = imagesLoaded('.content')

        let images = this.content.querySelectorAll("img").length,
            loadedCount = 0,
            loadingProgress = 0
        
        const percentText = document.querySelector('.preloader_loading_percent')
        imgLoad.on( 'progress', function( instance, image ) {
            loadProgress()
        })
        
        function loadProgress(imgLoad, image) {

            loadedCount++
        
            loadingProgress = (loadedCount/images)
            let percent = `${loadingProgress*100}%`
            let circlePC = percent

            if(loadingProgress > 0.9){
                circlePC = `${loadingProgress*100 - 0.7}%`
            } else {
                circlePC = percent
            }

            gsap.to('.preloader_loading_bar', {
                x: percent,
                ease: 'Power2.easeInOut',
                progress: loadingProgress
            })

            gsap.to('.preloader_loading_bar_circle_motion', {
                left: circlePC,
                ease: 'Power2.easeInOut',
                progress: loadingProgress
            })

            percentText.textContent = percent

            if(percent == '100%'){
  
                LOAD_FLAG = true
                Complete()
            }
        }
        
        const Complete= () => {
            this.scroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true,
                lerp: 0.1,
                smartphone: {
                    smooth: true
                },
                tablet: {
                    smooth: true
                }
            })

            if(LOAD_FLAG === true) this.startBarba()

            window.setTimeout(_ => {
                gsap.to('.preloader', {
                    autoAlpha: 0,
                    ease: 'Power2.easeInOut',
                    duration: 1,
                    onComplete: () => {
                        document.querySelector('.preloader').style.display = 'none'
                    }
                })
                
            }, 1000)

            this.update()

        }
        
        this.page.show()
        // this.canvas.onPreloaded(this.template)
    }

    onChange(template) {

        this.page = this.pages[template]
        this.page.create()

        // this.canvas.onChange(template)
        this.navigation.onChange(template)
        
        
        this.page.show()
        
        this.onResize()
        this.addLinkListeners()
    }

    onResize () {
        requestAnimationFrame(_ => {
          if(this.canvas && this.canvas.onResize) {
            this.canvas.onResize()
          }
        })
    
        if(this.page && this.page.onResize) {
          this.page.onResize()
        }

        if(this.menu && this.menu.onResize){
            this.menu.onResize()
        }
    }

    onMouseMove( e ) {
        if(this.canvas && this.canvas.onMouseMove) {
            this.canvas.onMouseMove(e)
        }
    }

    update(a) {
        if(this.page && this.page.update) {
            this.page.update()
        }
    
        if(this.canvas && this.canvas.update) {
            this.canvas.update(this.y)
        }
        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

      /**
   * Listeners
   */

    addEventListeners() {
        window.addEventListener( 'mousemove', this.onMouseMove.bind(this))

        window.addEventListener('resize', this.onResize.bind(this))

        this.menuOpen.addEventListener('click', _ => {
            this.menu.open()
        })

        this.menuClose.addEventListener('click', _ => {
            this.menu.close()
        })

        this.menuLinks = document.querySelectorAll('.menu_list_link')
        each(this.menuLinks, ( link )=> {
            link.addEventListener('click', _ => {
                this.menu.close()
            })
        })
        
        this.menuHome = document.querySelector('.menu_logo_img')
        this.menuHome.addEventListener('click', _ => {
            this.menu.close()
        })
    }


    addLinkListeners () {
        // const home = document.querySelector('.navigation_link')
        // const nav = document.querySelectorAll('.navigation_list_link')

        // each(nav, link => {
        //     link.addEventListener('click', (e) => {
        //         if(e.currentTarget.href === window.location.href) {
        //           e.preventDefault();
        //           e.stopPropagation();
        //         }
        //     })
        // })
    }
}

new App()