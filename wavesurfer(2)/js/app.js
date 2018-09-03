// Create a WaveSurfer instance
var wavesurfer = Object.create(WaveSurfer);


// Init on DOM ready
document.addEventListener('DOMContentLoaded', function () {
    wavesurfer.init({
        container: '#waveform',
        waveColor: '#428bca',
        progressColor: '#31708f',
        height: 120,
        barWidth: 3,
        hideScrollbar:false
    });
    
});

// Bind controls
document.addEventListener('DOMContentLoaded', function () {
    var playPause = document.querySelector('#playPause');
    var newSpan = document.getElementById('newSpan');
    var timeSpan = document.getElementById('timeSpan');
    var speedId = document.getElementById('speedId');
    var speedSpan = document.getElementsByClassName('speedSpan');
//  var toggleMute = document.getElementById('toggleMute');
    var volumeLength = document.getElementById('volumeLength');
    //时间显示
    
	    function formatTime(seconds) {
		    var min = Math.floor(seconds / 60),
		        second = seconds % 60,
		        hour, newMin, time;
		
		    if (min > 60) {
		        hour = Math.floor(min / 60);
		        newMin = min % 60;
		    }
		
		    if (second < 10) { second = '0' + second;}
		    if (min < 10) { min = '0' + min;}
		
		    return time = hour? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
		}
    
    	function showTime(){
    		var time = parseInt(wavesurfer.getCurrentTime());
	    	newSpan.innerHTML=formatTime(time)
    	}
    	setInterval(showTime,1000);

    //播放按键
    playPause.addEventListener('click', function () {
        wavesurfer.playPause();
    });
    //更改倍速

    speedId.onclick = function(ev){
    	var ev = ev || window.event;
　　　　var target = ev.target || ev.srcElement;
　　　　if(target.nodeName.toLowerCase() == 'span'){
			var speed = parseFloat(target.innerHTML);
　　　　　　　  	 wavesurfer.setPlaybackRate(speed)
			$(target).addClass('speedStyle').siblings().removeClass('speedStyle')
　　　　}
   };
    
    //音量调节
    volumeLength.addEventListener('click', function (e) {
		var e = e.event || event;
		$('#volumeLength').css('background','#fff');
		$('.volume_span').hide();
		console.log(e.clientX)
		console.log($("#volumeLength").offset())
		var length1 = parseInt($("#volumeLength").offset().left)+100;
		var num = 100-(length1-e.clientX);
		$('#volumeLength').empty();
		var span = document.createElement("span");
		span.setAttribute("id", "volumeSpan");
		span.style.width = num+'px';
		volumeLength.appendChild(span);
		wavesurfer.addVolume(num/100);
		var Ospan = document.createElement("span");
		Ospan.setAttribute("class", "volume_span");
		span.appendChild(Ospan)
			
    });
    
    // Toggle play/pause text
    wavesurfer.on('play', function () {
        document.querySelector('#play').style.display = 'none';
        document.querySelector('#pause').style.display = '';
    });
    wavesurfer.on('pause', function () {
        document.querySelector('#play').style.display = '';
        document.querySelector('#pause').style.display = 'none';
    });


    // The playlist links
    var links = document.querySelectorAll('#playlist a');
    var currentTrack = 0;

    // Load a track by index and highlight the corresponding link
    var setCurrentSong = function (index) {
        links[currentTrack].classList.remove('active');
        currentTrack = index;
        links[currentTrack].classList.add('active');
        wavesurfer.load(links[currentTrack].href);
    };

    // Load the track on click
    Array.prototype.forEach.call(links, function (link, index) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            setCurrentSong(index);
        });
    });

    // Play on audio load
    wavesurfer.on('ready', function () {
        wavesurfer.play();
        timeSpan.innerHTML=formatTime(parseInt(wavesurfer.getDuration()));
    });

    // Go to the next track on finish
//  wavesurfer.on('finish', function () {
//      setCurrentSong((currentTrack + 1) % links.length);
//  });

    // Load the first track
    setCurrentSong(currentTrack);
});
