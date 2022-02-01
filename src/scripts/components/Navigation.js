import gsap from 'gsap'
import each from 'lodash/each'


import {COLOR_ECRU_WHITE, COLOR_BLACK} from '../utils/color'

export default class Navigation{
    constructor({ template }) {
        
        this.element = document.querySelector('.navigation'),
        this.elements = {
            logo: document.querySelector('.navigation_link'),
            links: document.querySelector('.navigation_list_link'),
            items: document.querySelectorAll('.navigation_list_item'),
            ham: document.querySelectorAll('.menu_one')
        }

        this.onChange(template)
    }

    onChange(template) {
    }
}