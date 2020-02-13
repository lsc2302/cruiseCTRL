function clickQuestion_3(){
    $('#middle').html(
        `
        <div id="middle-question-3">
<!--        <img src="images/back-active.png" id="page-back" alt="back"/>                   -->
            <div class="audio">
                  <div id="audio-visualization">
                  <div class="waveform">
<!--                  <div id="waveform"></div>-->
                    <canvas class="waveform" width=(document.body.offsetWidth*0.7).toString() height="250" id="cvs"></canvas>
                  </div>
                  </div>
                  <div class="audio-records">
                        <div class="card bg-primary text-white">
                        <div class="card-body">
                            audio1xxxxxxxx
                        </div>
                        <div class="card-body">
                            Create-time: xxxx:xx:xx:xx:xx:xx
                        </div>
                        <img src="images/audio-play.png" class="record-play">
                        <img src="images/close.png" class="record-delete">      
                        </div>
                        <div class="card bg-primary text-white">
                        <div class="card-body">
                            audio2xxxxxxxx
                        </div>
                        <div class="card-body">
                            Create-time: xxxx:xx:xx:xx:xx:xx
                        </div>
                        <img src="images/audio-play.png" class="record-play">
                        <img src="images/close.png" class="record-delete">     
                        </div>
                        <div class="card bg-primary text-white">
                        <div class="card-body">
                            audio3xxxxxxxx
                        </div>
                        <div class="card-body">
                            Create-time: xxxx:xx:xx:xx:xx:xx
                        </div>
                        <img src="images/audio-play.png" class="record-play">
                        <img src="images/close.png" class="record-delete">     
                        </div>
                        <div class="card bg-primary text-white">
                        <div class="card-body">
                            audio4xxxxxxxx
                        </div>
                        <div class="card-body">
                            Create-time: xxxx:xx:xx:xx:xx:xx
                        </div>
                        <img src="images/audio-play.png" class="record-play"> 
                        <img src="images/close.png" class="record-delete">    
                        </div>
                        <div class="card bg-primary text-white">
                        <div class="card-body" >
                            audio5xxxxxxxx
                        </div>
                        <div class="card-body">
                            Create-time: xxxx:xx:xx:xx:xx:xx
                        </div>
                        <img src="images/audio-play.png" class="record-play">
                        <img src="images/close.png" class="record-delete">    
                        </div>
                                                            
                  </div>
                  <div id="record-status">
                  <img src="images/audio-play.png" />
                  </div>
            </div>
            <div class="progress">
            <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style="width:75%">60%</div>
            </div>
<!--        <img src="images/next-active.png" id="page-next" alt="next"/>-->
        </div>
        `
    );
    // $('#page-back').click(clickQuestion_2);
    // $('#page-next').click(clickQuestion_4);

    // var wavesurfer = WaveSurfer.create({
    //     container: '#waveform',
    //     waveColor: 'green',
    //     progressColor: 'green'
    // });
    // wavesurfer.load('user-data/sample.wav');

    var btn = document.getElementById('record-status');
    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');

    var bell = new WaveBell();
    btn.addEventListener('click', function (e) {
        // console.log(bell.state);
        if (bell.state === 'inactive') {
            bell.start(1000 / 25);
        } else {
            bell.stop();
        }
    });

    var currentValue = 0;

    // buffered wave data
    var BUF_SIZE = 200;
    var buffer = new Array(BUF_SIZE).fill(0);
    var cursor = 0;

    bell.on('wave', function (e) {
        // update current wave value
        currentValue = e.value;
    });

    bell.on('start', function () {
        btn.innerHTML = `<img src="images/audio-stop.png" />`;
    });
    bell.on('stop', function () {
        btn.innerHTML = `<img src="images/audio-play.png" />`;
        currentValue = 0;
    });

    function updateBuffer () {
        // loop update buffered data
        buffer[cursor++ % BUF_SIZE] = currentValue;
    }

    function drawFrame () {
        ctx.save();
        // empty canvas
        ctx.clearRect(0, 0, document.body.offsetWidth*0.7, 250);
        // draw audio waveform
        ctx.strokeStyle = '#1e90ff';
        for (var i = 0; i < BUF_SIZE; i++) {
            var h = 100 * buffer[(cursor + i) % BUF_SIZE];
            var x = 2*i;
            ctx.beginPath();
            ctx.moveTo(x, 100.5 - 0.5 * h);
            ctx.lineTo(x, 100.5 + 0.5 * h);
            ctx.stroke();
        }
        // draw middle line
        ctx.beginPath();
        ctx.moveTo(0, 100.5);
        ctx.lineTo(document.body.offsetWidth*0.7, 100.5);
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.restore();
    }

    function animate () {
        requestAnimationFrame(animate);
        // update wave data
        updateBuffer();
        // draw next frame
        drawFrame();
    }

    animate();
}
