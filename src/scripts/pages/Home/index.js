import each from "lodash/each"
import Page from "../../classes/Page"


export default class Home extends Page {
    constructor() {
        super({
            id: 'home',
            element: '.home',
            elements: [
                '.home_gallery_figure',
                '.home_gallery_image'
            ]
        })

    }

    onWheel(e) {

    }
}


