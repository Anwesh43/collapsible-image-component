class CollapsibleImageComponent {
    drawBtn() {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth/20
        canvas.height = window.innerWidth/20
        const context = canvas.getContext('2d')
        const r = window.innerWidth/40
        context.fillStyle = '#BDBDBD'
        context.beginPath()
        context.arc(canvas.width/2,canvas.height/2,r,0,2*Math.PI)
        context.fill()
        context.strokeStyle = 'black'
        context.lineWidth = canvas.width/10
        for(var i=0;i<2;i++) {
            context.save()
            context.translate(canvas.width/2,canvas.height/2)
            context.rotate((this.deg)+i*Math.PI/2)
            context.beginPath()
            context.moveTo(0,-h/3)
            context.lineTo(0,h/3)
            context.stroke()
            context.restore()
        }
        this.btn.src = canvas.toDataURL()
    }
    drawImg() {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const context = canvas.getContext('2d')
        context.save()
        context.translate(canvas.width/2,0)
        context.scale(1,this.scale)
        context.drawImage(this.image,0,0,canvas.width,canvas.height)
        context.restore()
        this.img.src = canvas.toDataURL()
    }
    constructor() {
        super()
        this.img = document.createElement('img')
        this.image = new Image()
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
        this.btn = document.createElement('img')
        shadow.appendChild(this.img)
        shadow.appendChild(this.btn)
        this.scale = 0
        this.dir = 0
        this.rot = 0
    }
    render() {
        this.dir = this.scale <=0 ?1 :-1
        const interval = setInterval(()=>{
            this.drawBtn()
            this.drawImg()
            this.scale += this.dir*0.2
            this.rot += this.dir*9
            if(this.scale > 1) {
                this.dir = 0
            }
            if(this.scale < 0) {
                this.dir = 0
            }
            if(this.dir == 0) {
                clearInterval(interval)
            }
        },100)
    }
    connectedCallback() {
        this.drawImg()
        this.drawBtn()
        this.btn.onmousedown = () => {
            this.render()
        }
    }
}
customElements.define('collapsible-image-component',CollapsibleImageComponent)
