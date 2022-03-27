AFRAME.registerComponent("cursor-listener",{
    schema:{
        selectedItemId:{default:"",type:"string"},
    },
    init:function(){
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
        this.handleClickEvents();
    },
    handleMouseEnterEvents:function(){
        this.el.addEventListener("mouseenter",()=>{
            const placesContainer = document.querySelector("#places-container");
            const {state} = placesContainer.getAttribute("tour");
            if(state === "places-list"){
                this.handlePlacesListState();
            }
        });
    },
    handlePlacesListState:function(){
        const id = this.el.getAttribute("id")
        const placesId = ["main_gate","living_room","kitchen","room","kids_room"]
        if(placesId.includes(id)){
            const placesContainer = document.querySelector("#places-container");
            placesContainer.setAttribute("cursor-listener",{
                selectedItemId:id
            });
            this.el.setAttribute("material",{
                opacity:1
            })
        }
    },
    handleMouseLeaveEvents:function(){
        this.el.addEventListener("mouseleave",()=>{
            const {selectedItemId} = this.data;
            if(selectedItemId){
                const el = document.querySelector(`#${selectedItemId}`)
                const id = el.getAttribute("id")
                if(id == selectedItemId){
                    el.setAttribute("material",{
                        color:"#0077cc",
                        opacity:1
                    })
                }
            }
        })
    },
    handleClickEvents:function(){
        this.el.addEventListener("click",evt=>{
            const placeContainer = document.querySelector("#places-container")
            const {state} = placeContainer.getAttribute("tour")
            if(state=="places-list"){
                const id = this.el.getAttribute("id")
                const placeId = [
                    "main_gate",
                    "living_room",
                    "kitchen",
                    "room",
                    "kids_room"
                ]
                if(placeId.includes(id)){
                    placeContainer.setAttribute("tour",{
                        state:"view",
                        selectedCard:id
                    })
                }
            }
        })
    },
    handleViewState:function(){
        const el = this.el;
        const id = el.getAttribute("id")
        const placeContainer = document.querySelector("#places-container")
        const {selectedItemId} = placeContainer.getAttribute("cursor-listener")
        const sideViewPlacesId = ["place-0"]
        if(sideViewPlacesId.includes(id)){
            placeContainer.setAttribute("tour",{
                state:"change-view"
            })
            const skyEl = document.querySelector("#main-container")
            skyEl.setAttribute("material",{
                src:`./assets/360_images/${selectedItemId}/${id}.jpg`,
                color:"#fff"
            })
        }
    }
})