import gsap from 'gsap'
import { each, map } from 'lodash'

import { calculate, split } from '../utils/text'

export default class Menu{
    constructor() {
        this.menu = document.querySelector('.menu')
        this.menuWrapper = document.querySelector('.menu_wrapper')
        this.nav = document.querySelector('.navigation')
        this.menuBG = document.querySelector('.menu_wrapper_bg')
        
        this.linkitem = document.querySelectorAll('[data-animations="menu-link"]')
        this.linkWord = document.querySelectorAll('[data-animations="menu-words"]')

        this.linkSpansArray = []

        this.linkSpansItem = map(this.linkitem, link => {
            split({ element: link, expression: '', append: true })
            this.linkSpans = link.querySelectorAll('span')
            
            return this.linkSpans           
        })

        console.log(this.linkSpansItem)
    }

    open() {            
        let timeline = gsap.timeline({
            ease: 'Expo.easeInOut'
        })

        timeline.to(this.nav, {
            autoAlpha: 0,
            duration: 0.4,
            onComplete: _ => {
                this.menu.style.display = 'block'
            }
        })
        timeline.to(this.menu, {
            autoAlpha: 1,
            duration: 0.4,
            onComplete: _ => {
                this.linkAnimation()
            }
        })
        timeline.fromTo(this.menuBG, {
            y: '100%'
        },{
            y: '0%',
            duration: 0.8,
            ease: 'Expo.easeInOut',
        })
        
    }

    close() {
            
        let timeline = gsap.timeline({
            ease: 'Expo.easeInOut'
        })

        timeline.to(this.menuBG, {
            y: '-100%',
            duration: 0.8,
            ease: 'Expo.easeInOut'
        })
        timeline.to(this.menu, {
            autoAlpha: 0,
            duration: 0.4,
            onComplete: _ => {
                this.menu.style.display = 'block'
                each(this.linkSpansItem, link => {
                    gsap.set(link, {
                        autoAlpha: 0
                    })
                })
            }
        },'-=0.5')
        timeline.to(this.nav, {
            autoAlpha: 1,
            duration: 0.4,
        },'-=0.5')
        
    }

    linkAnimation() {
        
        this.linktimeline = gsap.timeline()

        each(this.linkSpansItem, link => {
            gsap.set(link, {
                autoAlpha: 1
            })
            
            each(link, (letter, index) => {
                this.linktimeline.fromTo(letter, {
                  y: '120%'
                }, {
                  y: '0%',
                  delay: 0.2 + index * 0.1,
                  duration: 1.5,
                  ease: 'Expo.easeInOut'
                }, 0)
            })
        })
        

        each(this.linkWord, word => {
            split({ element: word, expression: ' ', append: true })
            
            this.wordSpans = word.querySelectorAll('span')
            
            this.wordtimeline = gsap.timeline()
            
            this.wordtimeline.set(word, {
                autoAlpha: 1
            })
            each(this.wordSpans, (wordL, index) => {
                this.wordtimeline.fromTo(wordL, {
                  y: '120%'
                }, {
                  y: '0%',
                  delay: 0.2 + index * 0.1,
                  duration: 1.5,
                  ease: 'Expo.easeInOut'
                }, 0)
            })
        })
        calculate(this.linkSpans || linkSpans)
    }

    onResize(linkSpans) {
        console.log(linkSpans)
        // this.elementLines = 
    }
}
