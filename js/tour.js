AFRAME.registerComponent("tour",{
    schema:{
        state:{type:"string", default:"places-list"},
        selectedCard:{type:"string", default:"#card1"}
    },
    tick:function(){
        const {state} = this.el.getAttribute("tour")
        if (state==="view"){
            this.hideEl([this.placesContainer]);
            this.showView()
        }
    },
    hideEl:function(elList){
        elList.map(el=>{
            el.setAttribute("visible",false)
        })
    },
    showView:function(){
        const {selectedCard} = this.data
        const skyEl = document.querySelector("#main-container")
        skyEl.setAttribute("material",{
            src:`./images/360_images/${selectedCard}/place-0.jpg`,
            color:"#fff"
        })
    },
    init:function(){
        this.placesContainer = this.el  
        this.createCards();
    },
    createCards:function(){
        const thumbnailRef = [
            {
                id:"main_gate",
                title:"Main Gate",
                url:"./images/thumbnails/main_gate.jpg"
            },
            {
                id:"living_room",
                title:"Living Room",
                url:"./images/thumbnails/living_room.jpg"
            },
            {
                id:"kitchen",
                title:"Kitchen",
                url:"./images/thumbnails/kitchen.jpg"
            },
            {
                id:"room",
                title:"Room",
                url:"./images/thumbnails/room.jpg"
            },
            {
                id:"kids_room",
                title:"Kids Room",
                url:"./images/thumbnails/kids_room.jpg"
            }
        ]
        let previousXPosition = -75
        for(var item of thumbnailRef){
            const posX = previousXPosition + 25
            const posY = 10
            const posZ = -40
            const position = {x:posX,y:posY,z:posZ}
            previousXPosition = posX
            const borderEl = this.createBorder(position,item.id)
            const thumbnail = this.createThumbnail(item)
            borderEl.appendChild(thumbnail)
            const titleEl = this.createTitleEl(position,item)
            borderEl.appendChild(titleEl)
            this.placesContainer.appendChild(borderEl)
        }
    },

    createBorder:function(position,id){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("id",id)
        entityEl.setAttribute("visible",true)
        entityEl.setAttribute("geometry",{
            primitive:"ring",
            radiusInner:9,
            radiusOuter:10
        })
        entityEl.setAttribute("position",position)
        entityEl.setAttribute("material",{
            color:"#0077cc",
            opacity:1
        })
        entityEl.setAttribute("cursor-listener",{})
        return entityEl
    },
    createThumbnail:function(item){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("visible",true)
        entityEl.setAttribute("geometry",{
            primitive:"circle",
            radius:9
        })
        entityEl.setAttribute("material",{src:item.url})
        return entityEl
    },
    createTitleEl:function(position,item){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("text",{
            font:"exo2bold",
            align:"center",
            width:70,
            color:"#e65100",
            value:item.title
        })
        const elPosition = position;
        elPosition.y=-20
        entityEl.setAttribute("position",elPosition)
        entityEl.setAttribute("visible",true)
        return entityEl
    }
})