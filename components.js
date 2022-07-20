class StarBorder extends HTMLElement {
    constructor () {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="inner-template">
                <slot></slot>
            </div>`;

        const style = document.createElement('style');
        style.innerHTML = `div {
                                /*star border*/
                                border: 1em solid;
                                border-image-source: url(media/9stars.gif);
                                border-image-slice: 33.33%;
                                border-image-repeat: round;
                                /*inner elements*/
                                display: inline-block;
                                text-align: center;
                                }`;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

//TODO: this button doesnt work yet lol, not sure how to nest the custom star-border within it
class HomePageButton extends HTMLLIElement {
    constructor () {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <star-border>
             <div class="inner-template">
                <slot></slot>
             </div>
            </star-border>`;

        const style = document.createElement('style');
        style.innerHTML = `slot {
                                  flex-basis: 40%;
                                  aspect-ratio: 1 / 1;
                                  flex-grow: 1;
                                  max-width: 50%;
                                  padding-left: 0.5%;
                                  padding-right: 0.5%;
                                  padding-top: 0.5%;
                                  box-sizing: border-box;
                                  height: 25%;
                                  padding: 1em;
                                  }`;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

