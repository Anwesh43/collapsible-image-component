class CollapsibleImageComponent extends HTMLElement {
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
            context.rotate((this.state.deg+i*90)*Math.PI/180)
            context.beginPath()
            context.moveTo(0,-canvas.height/3)
            context.lineTo(0,canvas.height/3)
            context.stroke()
            context.restore()
        }
        this.btn.src = canvas.toDataURL()
    }
    drawImg() {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth/5
        canvas.height = window.innerWidth/5
        const context = canvas.getContext('2d')
        context.save()
        context.translate(canvas.width/2,0)
        context.scale(1,this.state.scale)
        context.drawImage(this.image,0,0,canvas.width,canvas.height)
        context.restore()
        this.img.src = canvas.toDataURL()
    }
    constructor() {
        super()
        this.img = document.createElement('img')
        this.image = new Image()
        const shadow = this.attachShadow({mode:'open'})
        this.btn = document.createElement('img')
        this.state = {scale:0,deg:0,dir:0}
        this.btn.style.position = 'absolute'
        this.btn.style.left =  window.innerWidth/2 - window.innerWidth/40
        this.btn.style.top = window.innerHeight/10
        this.img.style.position = 'absolute'
        this.img.style.left =  window.innerWidth/2 - window.innerWidth/10
        this.img.style.top = window.innerHeight/10 + window.innerWidth/20 + window.innerHeight/20
        shadow.appendChild(this.img)
        shadow.appendChild(this.btn)
        console.log(`the dir is ${this.state}`)
    }
    render() {
        if(this.state.scale<=0) {
            this.state.dir = 1
            console.log(`the dir is ${this.dir}`)
        }
        else {
            this.state.dir = -1
        }
        const interval = setInterval(()=>{
            this.drawBtn()
            this.drawImg()
            this.state.scale += this.state.dir*0.2
            this.state.deg += this.state.dir*9
            if(this.state.scale > 1) {
                this.state.dir = 0
            }
            if(this.state.scale < 0) {
                this.state.dir = 0
            }

            if(this.state.dir == 0) {
                clearInterval(interval)
            }
        },100)
    }
    connectedCallback() {
      this.drawImg()
      this.drawBtn()
      this.btn.onmousedown = () => {
            console.log("clicked")
            this.render()
        }
    }
}
customElements.define('collapsible-image',CollapsibleImageComponent)
