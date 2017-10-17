var Game = {
    header : document.querySelector(".header"),
    info : document.querySelector('#status'),
    list : document.querySelectorAll(".mode"),
    newGame : document.querySelector("#newGame"),
    result_rgb: document.querySelector("#result_rgb"),
    modes : document.querySelectorAll(".mode"),
    result:'',
    reset : function(){
        Color.colors = Color.randColor(Item.numItems);   
        this.result = Color.pickColor();
        this.result_rgb.textContent = this.result;
        this.info.textContent = '';
        for(var i =0 ; i<Item.list.length ;i++){
            if(Color.ListCorlor[i]){
                Item.list[i].style.display = "block";
                Item.list[i].style.background = Color.ListCorlor[i];
            } else {
                Item.list[i].style.display = "none";
            }
        }
        this.newGame.textContent = "NEW COLORS";
        this.header.style.background = "rgb(57, 188, 228)";
    },
    setMode: function(){    
        for(var i =0 ; i< Game.modes.length;i++){
            Game.modes[i].addEventListener("click",function(){
                for(var j=0 ; j<Game.modes.length;j++){
                    Game.modes[j].classList.remove('selected');
                }
                this.classList.add('selected');    
                this.textContent === "Easy" ? Item.numItems =3  : Item.numItems =6;
                Game.reset();
            })
        }
    },
    setNewgame : function(){
        Game.newGame.addEventListener("click",function(){    
            Game.reset();
        });
    }
}

var Color = {
    ListCorlor :[],
   
    randColor : function(num){
        this.ListCorlor=[]; 
        for(var i =0 ; i<num ; i++){
            this.ListCorlor.push(this.generateColor());
        }   
    },
    generateColor : function(){
        var rd_1 = Math.floor(Math.random()*255);
        var rd_2 = Math.floor(Math.random()*255);
        var rd_3 = Math.floor(Math.random()*255);
        var color = "rgb("+rd_1+", "+rd_2+", "+rd_3+")";
        return color;
    },

    pickColor : function (){
        return this.ListCorlor[Math.floor(Math.random()*this.ListCorlor.length)]
    },
    changeColor : function(color) {
        for(var i =0 ; i < Item.list.length ; i++){
            Item.list[i].style.background = color;
            Game.header.style.background = color;            
        }
    },
}

var Item = {
    numItems : 6,

    list : document.querySelectorAll(".item"),
    
    setItem:function(){
        for(var i =0 ; i < this.list.length ; i++){
            this.list[i].style.background = Color.ListCorlor[i];    
            this.list[i].addEventListener("click",function(){
                if(this.style.background != Game.result){
                    this.style.background="#232323";
                    Game.info.textContent = 'Try again'
                } else {
                    Color.changeColor(Game.result);
                    Game.info.textContent = 'Success'
                    Game.newGame.textContent = "Try Again?"
                }
            });
        }
    }

}

Game.reset();

Game.setMode();

Item.setItem();

Game.setNewgame();
