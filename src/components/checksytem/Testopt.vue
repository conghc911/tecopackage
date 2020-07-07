<template>
  <div>
    <main-app>
      <div id="content-testopt">
        <b-container>
          <div class="content-testopt" style="display:none;">
            <div class="item-test">
              <h3>Kiểm trả server 3C</h3>
              <div class="result-t">
                Trạng thái: <span class="alert-check alert-none">Không</span>
              </div>
              <button>Kiểm tra</button>
            </div>
          </div>

          <div class="content-testopt" style="display:none;">
            <div class="item-test">
              <h3>Kiểm trả Mic</h3>
              <div class="result-t">
                <!-- Trạng thái: <span class="alert-check alert-none">{{ textMic }}</span> -->
                <canvas id="canvas" width="150" height="300" v-if="isMic == true" ></canvas>
              </div>
              <button @click="handleMic" v-if="isMic == false" >Kiểm tra</button>
              <button @click="handleMicStop" v-if="isMic == true">Dừng...</button>
            </div>
          </div>

          <div class="content-testopt">
            <div class="item-test">
              <h3>Kiểm trả Microphone</h3>
              <div class="result-t">
                <!-- Trạng thái: <span class="alert-check alert-none">{{ textMic }}</span> -->
                <canvas id="canvas" width="150" height="300" v-if="isMic == true" ></canvas>
                <div id="images">
                   <div id="contentc"></div>
                   <div id="controls"></div>
                </div>
                
                <div v-if="stop" id="stopbuttons" class="result-t">
                  <input value="Hủy bỏ" @click="stopMedia();" type="button">
                  <input value="Tạm dừng" @click="pauseMedia();" type="button">
                </div>
                <div id="message" v-html="message"></div>
              </div>
              <div id="startbuttons" v-if="start">
                <button @click="handleMicrophone()" v-if="isMic == false" >Kiểm tra</button>
                <button @click="handleMicrophoneStop()" v-if="isMic == true">Dừng...</button>
              </div>  
            </div>
          </div>

          <div class="content-testopt" style="display:none;">
            <div class="item-test">
              <h3>Kiểm trả Audio</h3>
              <div class="result-t">
                Trạng thái: <span class="alert-check alert-none">{{ !isAudio ? "Ngưng" : "Đang chạy..."}}</span>
              </div>
              <button @click="handleAudio()" v-if="isAudio == false" >Kiểm tra</button>
              <button @click="handleAudioStop()" v-if="isAudio == true" >Dừng...</button>
            </div>
          </div>

          <div class="content-testopt" style="display:none;">
            <div class="item-test">
              <h3>Kiểm trả tốc độ đường truyền</h3>
              <div class="result-t">
                Trạng thái: <span class="alert-check alert-none">Không</span>
              </div>
              <button @click="handleSpeed()"  >Kiểm tra</button>
            </div>
          </div>


        </b-container>
      </div>
    </main-app>
  </div>
</template>

<script>
import Main from "../Main.vue";
// test speed

// var speedTest = require('speedtest-net');
// var test = speedTest({maxTime: 5000});

  const audios = document.createElement("audio");
  audios.setAttribute("controls", true);

  // const content = document.getElementById("contentc");
  
  // let saved_stream = null;
  // let running = false;
  if (!navigator.mediaDevices.getUserMedia) {
    document.getElementById("mic_warn").style.display = "none";
  }
export default {
  mounted(){
    this.setTitlePage();
  },
  data() {
    return {
      isAudio:false,
      isMic:false,
      textMic:'Không',
      stop:false,
      start:true,
      message:'',
      saved_stream : null,
      running : false
    };
  },
  filters: {
    
  },
  methods: {
    handleSpeed(){
      console.log( 'handleSpeed' );
    },
    handleMicStop(){
      this.isMic = false;
    },
    handleMic(){
      let that = this;
      var constraints = {
        audio: true,
        video: false
      };
      navigator.getUserMedia =  navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia;
       if (navigator.getUserMedia) {
          this.isMic = true;
          navigator.getUserMedia({
              audio: true
            },
            function(stream) {
              //
              let audioContext = new AudioContext();
              let analyser = audioContext.createAnalyser();
              let microphone = audioContext.createMediaStreamSource(stream);
              let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

              analyser.smoothingTimeConstant = 0.8;
              analyser.fftSize = 1024;

              microphone.connect(analyser);
              analyser.connect(javascriptNode);
              javascriptNode.connect(audioContext.destination);

              let canvasContext = $("#canvas")[0].getContext("2d");

              javascriptNode.onaudioprocess = function() {
                  var array = new Uint8Array(analyser.frequencyBinCount);
                  analyser.getByteFrequencyData(array);
                  var values = 0;

                  var length = array.length;
                  for (var i = 0; i < length; i++) {
                    values += (array[i]);
                  }

                  var average = values / length;

        //          console.log(Math.round(average - 40));

                  canvasContext.clearRect(0, 0, 150, 300);
                  canvasContext.fillStyle = '#69ce2b';
                  canvasContext.fillRect(0, 300 - average, 150, 300);
                  canvasContext.fillStyle = '#333 ';
                  canvasContext.font = "48px impact";
                  canvasContext.fillText(Math.round(average - 40), 40, 150);
                  // console.log (average);
                } // end fn stream
              //
            },
            function(err) {
              console.log("The following error occured: " + err.name)
            });
        } else {
          this.textMic = 'getUserMedia not supported';
        }
        // console.log( 'mic' );
    },
    handleAudio(){
      console.log( 'handleAudio' );
      let x = document.getElementById("myAudio");
      this.isAudio = true;
      // longth
      // let testVideo = document.getElementById("my-video");
      // testVideo.autoplay = true;
      // testVideo.load();

      x.play();
      setTimeout(() => {
        this.isAudio = false;
      }, 5800);
    },
    handleAudioStop(){
      console.log( 'handleAudioStop' );
      let x = document.getElementById("myAudio");
      this.isAudio = false;
      x.pause();
    },
    handleMicrophone(){
      // console.log(audio);
      const content = document.getElementById("contentc");
      // console.log(content);
      content.appendChild(audios);
      this.startMedia("getUserMedia", {audio: true});
    },


    async startMedia(gum, constraints) {
      const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
      const content = document.getElementById("contentc");
      this.stop = true;
      this.start = false;
      try {
        const stream = await navigator.mediaDevices[gum](constraints);
        
        content.appendChild(audios);
        audios.srcObject = stream;
        audios.play();
        
      this.running = true;
      } catch (err) {
        if (location.protocol != "https:") {
          this.message = `<p class='error'>${err}</p>
            <p>getUserMedia and getDisplayMedia now require the site be loaded from an https URL</p>
            <p>Reloading page in https in 10 seconds</p>`;
          // await wait(10000);
          // window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
        } else {
          this.message = `<p class='error'>${err}</p>`;
        }
        this.stopMedia();
      }
    },
    stopMedia() {
      const content = document.getElementById("contentc");
      if (audios.srcObject) {
        for (const track of audios.srcObject.getTracks()) {
          track.stop();
        }
        audios.srcObject = null;
        
      }
      content.removeChild(audios);
    
      this.saved_stream = null;
      this.stop = false;
      this.start = true;
      this.message = '';
      this.running = false;
    },
    pauseMedia() {
      if (this.saved_stream) {   // paused
        audios.srcObject = this.saved_stream;
        audios.play();
        this.saved_stream = null;
      } else {        // playing
        audios.pause();
        this.saved_stream = audios.srcObject;
        audios.srcObject = null;
      }
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Kiểm tra hệ thống";
    },
  },
  components: {
    "main-app": Main
  },
  computed: {
  },
  watch:{
    
  },
};
</script>

<style scoped>
#canvas {
    background: #f6f6f6 !important;
    width: 150px;
    height: 100px;
    top: 150px;
    text-align: center;
}
.item-test input {
    border: 0;
    background: #FF5722;
    padding: 4px 20px 6px 20px;
    color: #fff;
    display: inline-block;
    border-radius: 4px;
    margin-top: 15px;
}
div#content-testopt .container {
    display: flex;
    flex-direction: column;
}
div#message {
    float: left;
    width: 100%;
    margin-top: 15px;
}
</style>