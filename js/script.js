'use strict';


(function () {

	function StopWatch(node) {
        this.STARTSTOP_KEYCODE=83;
        this.LAP_KEYCODE=76;
        this.RESET_KEYCODE=82;
		this.structure=this.CreatDomForTimer();
		node.appendChild(this.structure);
		this.show=true;
		this.laps = [];
		this.node = node;
		var _this=this;

		this.timeIndicatorNode =this.node.querySelector('.stopwatch-current');
		this.lapsListNode = this.node.querySelector('.stopwatch-laps');
		this.startStopButtonNode=this.node.querySelector('.start');
		this.lapButtonNode = this.node.querySelector('.lap');
		this.resetButtonNode= this.node.querySelector('.reset');
		this.elapsedTime=0;
		this.intervalId=null;
	

		this.startStopButtonNode.addEventListener('click', this.startStop.bind(this), false);
		this.lapButtonNode .addEventListener('click', this.lap.bind(this), false);
		this.resetButtonNode.addEventListener('click', this.reset.bind(this), false);
		document.documentElement.addEventListener('keyup', this._onKeyup.bind(this), false);

	}
 	


	StopWatch.prototype._onKeyup = function (event) {
			if(this.node.querySelector(".active")) {

	 			if(event.keyCode===this.STARTSTOP_KEYCODE) {
	 				this.startStop();
	 			}
	 			if(event.keyCode===this.LAP_KEYCODE) {
	 				this.lap();
	 			}
	 			if(event.keyCode===this.RESET_KEYCODE){
	 				this.reset();
	 			}
 			}
 		}


	StopWatch.prototype.CreatDomForTimer = function () {
			var contain1=document.createElement("div"); 
					contain1.className='container';
					contain1.addEventListener ('mouseover', function () {
						var AllContainers=document.querySelectorAll(".container");
						var arrayOfContainer;
						arrayOfContainer= Array.prototype.slice.call(AllContainers);
			      		arrayOfContainer.forEach(function (elem) {
			      			elem.classList.remove("active");
			      		})
					
						contain1.className+=' active';		
						}, false); 

				var contain2=document.createElement("div"); 
						contain2.className='row';
						contain1.appendChild(contain2);
					var column1=document.createElement("div");
						column1.className='col-xs-4';
						contain2.appendChild(column1);
						var  scoreboard=document.createElement("h2");
							 scoreboard.className="stopwatch-current";
							 column1.appendChild(scoreboard);
							 scoreboard.appendChild(document.createTextNode("00:00:00:000"));
						var  listLap=document.createElement("div")
							 listLap.className="stopwatch-laps";
							 column1.appendChild(listLap);


					var column2=document.createElement("div");
						column2.className='col-xs-4 stopwatch-controls';
						contain2.appendChild(column2);	
						var buttons=document.createElement("div");
							buttons.className='btn-group btn-group-lg';
							column2.appendChild(buttons);
							var buttonStart=document.createElement("button");
								buttonStart.className ='btn btn-primary start';
								buttons.appendChild(buttonStart);
								buttonStart.appendChild(document.createTextNode("Start"));

							
							var buttonLap=document.createElement("button");
								buttonLap.className ='btn btn-info lap';
								buttons.appendChild(buttonLap);
								buttonLap.appendChild(document.createTextNode("Lap"));	
						var buttonReset=document.createElement("button");
								buttonReset.className ='btn btn-danger btn-sm reset';
								column2.appendChild(buttonReset);
								buttonReset.appendChild(document.createTextNode("Reset"));	
	return contain1;
	}

    StopWatch.prototype.drawTime = function () {
    this.timeIndicatorNode.innerText=this.formatTime(this.elapsedTime);
	} 

	StopWatch.prototype.formatTime = function (timeInSeconds) {
		var miliSec;
		var time;
		var secondsWithoutMiliseconds;
		var hour;
		var minute; 
		var seconds;
		miliSec =  +((timeInSeconds/1000) % 1).toFixed(6)*1000;
		
		secondsWithoutMiliseconds=(timeInSeconds-miliSec)/1000;
		 hour = ~~(secondsWithoutMiliseconds/3600);
		 minute = ~~((secondsWithoutMiliseconds%3600)/60);
		 seconds = secondsWithoutMiliseconds%3600%60;
 		 if (seconds<10) { seconds="0"+seconds;}
	     if (minute<10) { minute="0"+minute;} 
	     if (hour<10) { hour="0"+hour;}
	     if (miliSec<10) {
	     	miliSec="00"+miliSec
	     } else if(miliSec<100) {
	     	miliSec="0"+miliSec
	     }
 
		time = hour + ':' + minute + ':' +seconds+':'+ miliSec;;
		return time;
		}

	
	StopWatch.prototype.startStop = function () {
			
        if (this.show==true) {
			this.start();
			this.show=false;
		} else {
			this.stop();
			this.show=true;
		}
	}

	StopWatch.prototype.stop = function () {
		clearInterval(this.intervalId);
		this.intervalId=null;
	} 


	StopWatch.prototype.start = function () {
		var _this=this;
		var lastUpdateTime= (new Date()).getTime();

		this.intervalId = setInterval(function() {
			var show=true;
			var nextTicTime= (new Date()).getTime()				
			_this.elapsedTime+=(nextTicTime - lastUpdateTime);
			lastUpdateTime=nextTicTime;
			_this.drawTime();
		}, 16);
	}
	StopWatch.prototype.reset = function () {
		this.elapsedTime=0;
		this.drawTime();
		this.stop();
		this.laps=[];
		this.drawLaps();
	}
	StopWatch.prototype.drawLaps = function () {
		var _this=this;
		_this.lapsListNode.innerHTML='';
		_this.laps.forEach(function (lap, lapsIndex) {
									// Creat DOM for lap
									var lapNode = document.createElement('div');
										lapNode.className='alert alert-info';
										var lapIndicator=document.createElement('p');
											lapIndicator.className='lapScoreboard';
											lapNode.appendChild(lapIndicator);
											var closeElem=document.createElement('span');
												closeElem.className="label label-danger remove";
												lapNode.appendChild(closeElem);
												closeElem.appendChild(document.createTextNode("×"));

									lapIndicator.innerText=_this.formatTime(lap);
									
									closeElem.addEventListener('click', function(){
										_this.removeLap(lapsIndex)
									}, false);
								 	
								 	_this.lapsListNode.appendChild(lapNode);

		}); 
	}


	StopWatch.prototype.lap = function () {
		this.laps.unshift(this.elapsedTime);
	    this.drawLaps();
	}
	StopWatch.prototype.removeLap = function (index) {
		this.laps.splice(index, 1);
		this.drawLaps();
	}



window.StopWatch=StopWatch;

 } ()); 






















/*

	var current = document.querySelector('.stopwatch-current');
	var init=0;
	var dateObj;
	var min=1;
	var ts,dh,dm;
	var hour=1;
	var show=true;
	var sec=0;
	var readout;
	var clocktimer;
	var base=60;
	var fixSec, fixHour;
	var fixMin=0;


	    function findTIME() {
	        if (init==0) {
	        dateObj = new Date();
	        startTIME();
	        init=1;
	        } else {
	              if(show==true) {
	              show=false;
	              } else {
	                show=true;  
	              }
	        }
	    }

	    function startTIME() {
	      var cdateObj = new Date();
	      var miliSec = (cdateObj.getTime() - dateObj.getTime())-(sec*1000);
	      // miliSec
	      if (miliSec>999) {sec+=1; }
	      // seconds
	      if (sec>=(min*base)) {
	       min+=1;
	        fixSec=0;
	      } else{
	        fixSec=sec;
	          if(fixSec>=base) {fixSec=sec-(min-1)*base}
	      }
	      // minute
	      if (min>(hour*base)) {
	        hour+=1;
	        fixMin=0;
	      } else {
	        fixMin=Math.floor(parseInt(sec/base));
	         if(fixMin>=base) {fixMin=min-(hour-1)*base}
	      }
	      // hour
	        fixHour=hour-1;
	      // output values
	      if (fixSec<10) { fixSec="0"+fixSec;}
	      if (fixMin<10) { fixMin="0"+fixMin;} 
	      if (fixHour<10) { fixHour="0"+fixHour;}

	      readout = fixHour + ':' + fixMin + ':' +fixSec+':'+ miliSec;
	      
	      if (show==true) {
	     
		  current.innerHTML=String(readout);
	      console.log('sec',sec);
	      }
	      clocktimer = setTimeout("startTIME()",16);
	    }

	    function clearAll() {
	       clearTimeout(clocktimer);
	       hour=1;
	       min=1;
	       sec=0;
	       readout='00:00:00.00';
	       init=0;
	       show=true;
	       current.innerHTML=String(readout);
	    }


		function addLap() {
			if (init>0) {
		
			var Lap1 = document.querySelector('.Lap1');
			Lap1.innerHTML=String(readout);


			}
		}

*/