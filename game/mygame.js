var createApp = function(canvas){
        var c = canvas.getContext("2d");
        const restart = document.getElementById("restart");
        restart.addEventListener("click",reload)
        function reload(){
                // when we click restart, we need to update the score and survive time if the current is the best.

                alive = false;
                mytime = Math.ceil(((new Date()).getTime()-starttime)/1000);
                if(localStorage.getItem("bestscore")===null){
                        localStorage.setItem("bestscore",score);
                        document.getElementById('bs').innerHTML = score;
                        localStorage.setItem("besttime",mytime);
                        document.getElementById('bt').innerHTML = mytime;
                } else {
                        if(localStorage.getItem("bestscore")<score) {
                                localStorage.setItem("bestscore", score);
                                document.getElementById('bs').innerHTML = score;
                        }

                        if(localStorage.getItem("besttime")<mytime) {
                                localStorage.setItem("besttime", mytime);
                                document.getElementById('bt').innerHTML = mytime;
                        }
                }

                window.location.reload();
        }

        // initial variable


        var HP = 100;
        var score = 0;
        var bomb_array = [];
        var candy_array = [];
        var alive = true;
        var starttime = (new Date()).getTime();
        var mytime;
        var survivetime = 0;
        var survivelevel = 0;
        var diff = "Easy";
        if(localStorage.getItem("bestscore")===null){
                var bestscore = 0;
                var besttime = 0;
        } else{
                var bestscore = localStorage.getItem("bestscore");
                var besttime = localStorage.getItem("besttime");
        }
        document.getElementById('bs').innerHTML = bestscore;
        document.getElementById('bt').innerHTML = besttime;
        // speed of falling candy and bomb
        var cSpeed = 2;
        var bSpeed = 2;
        // threshold of possibility of a bomb
        var pb = 0.98;
        var pc = 0.96;
        // movement of each mouse click to move the basket
        var movement = 30;
        document.getElementById('hp').innerHTML = HP;
        document.getElementById('score').innerHTML = score;
        document.getElementById('st').innerHTML = survivetime;
        document.getElementById("diff").innerHTML = survivelevel;
        var basket = {
                x:0.5*canvas.width,
                y:canvas.height-20,
                width:63,
                height:40,
                basketimg:new Image()
        }
        basket.basketimg.src = "basket.png";

        c.drawImage(basket.basketimg,basket.x-0.5*basket.width,basket.y-0.5*basket.height);

        function random_candy(){
                if(Math.random()>pc){
                        var aCandy = {};
                        aCandy.x = Math.random()*canvas.width;
                        aCandy.y = 12;
                        aCandy.width = 24;
                        aCandy.height =24;
                        aCandy.score = 10;
                        aCandy.candyimg=new Image();
                        aCandy.candyimg.src = "candy.png";
                        c.drawImage(aCandy.candyimg,aCandy.x-0.5*aCandy.width,aCandy.y-0.5*aCandy.height);
                        candy_array.push(aCandy);
                }
        }

        function random_bomb(){
                if(Math.random()>pb){
                        var aBomb = {};
                        aBomb.x = Math.random()*canvas.width;
                        aBomb.y = 12;
                        aBomb.width = 24;
                        aBomb.height =24;
                        aBomb.damage = -10;
                        aBomb.bombimg=new Image();
                        aBomb.bombimg.src = "bomb.png";
                        c.drawImage(aBomb.bombimg,aBomb.x-0.5*aBomb.width,aBomb.y-0.5*aBomb.height);
                        bomb_array.push(aBomb);
                }
        }


        function falling(type){

                if(type === 'candy'){
                        candy_array.forEach(function(e){
                                e.y+=cSpeed;
                        })
                } else if(type ==='bomb'){
                        bomb_array.forEach(function(e){
                                e.y+=bSpeed;
                        })
                }
        }

        function check_collision(){
                let i =0;
                let j =0;
                let cl = candy_array.length;
                let bl = bomb_array.length;
                let ci = 0;
                let bi = 0;
                for(;ci<cl;ci++){
                        let e = candy_array[i];
                        if((e.x<=(basket.x+0.5*basket.width+0.5*e.width))&&
                            (e.x>=(basket.x-0.5*basket.width-0.5*e.width))&&
                            (e.y<=(basket.y+0.5*basket.height+0.5*e.height))&&
                            (e.y>=(basket.y-0.5*basket.height-0.5*e.height))){
                                // if collide with basket, update score
                                score+=e.score;
                                document.getElementById('score').innerHTML = score;
                                candy_array.splice(i,1);
                        } else if((e.y+0.5*e.height)>=canvas.height) {
                                //if it falls out of canvas, just delete
                                candy_array.splice(i,1);
                        } else {i++;}

                }

                for(;bi<bl;bi++){
                        let e =bomb_array[j];
                        if(alive) {
                                if ((e.x <= (basket.x + 0.5 * basket.width + 0.5 * e.width)) &&
                                    (e.x >= (basket.x - 0.5 * basket.width - 0.5 * e.width)) &&
                                    (e.y <= (basket.y + 0.5 * basket.height + 0.5 * e.height)) &&
                                    (e.y >= (basket.y - 0.5 * basket.height - 0.5 * e.height))) {
                                        // if collide with basket, update HP and check alive or not
                                        let a = new Image();
                                        a.src = 'bombeffect.png';
                                        let b = setInterval(function(){c.drawImage(a,e.x-32,e.y-32)});
                                        setTimeout(function(){clearInterval(b);},100)
                                        HP += e.damage;
                                        document.getElementById('hp').innerHTML = HP;
                                        if(HP == 0) {alive = false;}
                                        bomb_array.splice(j, 1);
                                } else if ((e.y + 0.5 * e.height) >= canvas.height) {
                                        //if it falls out of canvas, just delete
                                        bomb_array.splice(j, 1);
                                } else {
                                        j++;
                                }
                        }
                }

        }


        function draw_update(){
                check_collision();
                c.clearRect(0,0,canvas.width,canvas.height);
                c.drawImage(basket.basketimg,basket.x-0.5*basket.width,basket.y-0.5*basket.height);
                candy_array.forEach(function (e){
                        e.candyimg = new Image();
                        e.candyimg.src = 'candy.png';
                        c.drawImage(e.candyimg,e.x-0.5*e.width,e.y-0.5*e.height);
                })
                bomb_array.forEach(function(e){
                        e.bombimg = new Image();
                        e.bombimg.src = 'bomb.png';
                        c.drawImage(e.bombimg,e.x-0.5*e.width,e.y-0.5*e.height)
                })
                survivetime = Math.ceil(((new Date()).getTime()-starttime)/1000);
                survivelevel = Math.floor(survivetime/30);
                document.getElementById('st').innerHTML = survivetime;
                document.getElementById('diff').innerHTML = survivelevel;

                // update difficulty, when survive time increases, more bombs, less candies and increase bomb falling speed
                pb = 0.98-survivelevel*0.004;
                pc = 0.96+survivelevel*0.002;
                bSpeed= 2 +Math.floor(survivelevel/5);


        }


        function repeat(){
                if(alive) {

                        random_candy();
                        random_bomb();
                        falling("candy");
                        falling("bomb");
                        draw_update();
                        setTimeout(function () {
                                requestAnimationFrame(repeat)
                        }, 1000 / 30);
                } else{
                        mytime = Math.ceil(((new Date()).getTime()-starttime)/1000);
                        if(localStorage.getItem("bestscore")===null){
                                localStorage.setItem("bestscore",score);
                                document.getElementById('bs').innerHTML = score;
                                localStorage.setItem("besttime",mytime);
                                document.getElementById('bt').innerHTML = mytime;
                        } else {
                                if(localStorage.getItem("bestscore")<score)
                                        {localStorage.setItem("bestscore",score);
                                        document.getElementById('bs').innerHTML = score;}

                                if(localStorage.getItem("besttime")<mytime)
                                        {localStorage.setItem("besttime",mytime);
                                        document.getElementById('bt').innerHTML = mytime;}

                        }

                        alert("Game Over!\n"+"Your score is " + score + " and your alive time is "+mytime+" seconds");
                }
        }
        requestAnimationFrame(repeat);

        // use mouse to control the basket

        canvas.addEventListener('mousemove', e => {
                var cPosition = canvas.getBoundingClientRect();
                var mousex = e.clientX;
                var mousey = e.clientY;
                if((mousex<=(cPosition.x+canvas.width))&&
                    (mousex>=cPosition.x)&&(mousey>=cPosition.y)&&
                    (mousey<=cPosition.y+canvas.height)){
                        basket.x = mousex-cPosition.x;
                }
        });





}

window.onload = function() {
        var app = createApp(document.querySelector("canvas"));

};

