const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  },
  on_data_update: function (data) {
    console.log('Just added new data. The contents of the data are: ' + JSON.stringify(data));
  },
  extensions: [
    { type: jsPsychExtensionMouseTracking, params: { minimum_sample_time: 0, events: ['mousemove', 'mouseleave'] } }
  ]
});


let timeline = [];


var preload = {
  type: jsPsychPreload,
  images: ['img/blue.png', 'img/orange.png']
};

timeline.push(preload)


var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true
}

// timeline.push(enter_fullscreen)


const stim_change_test = {
  type: jsPsychHtmlButtonResponsePES,
  stimulus: `<b> stim_temp </b>`,
  choices: ['button <br>1', 'button <br>2'],
  adjust_aspect_ratio: false,
  button_html: ['<button class="jspsych-btn mt-response-btn" id="left_response" style = "position:absolute; left: 0px; top: 0px">%choice%</button>', '<button class="jspsych-btn mt-response-btn" id="right_response" style = "position:absolute; right:0px; top: 0px">%choice%</button>'],
  slowmouse_message: `Please begin moving your mouse<br>as soon as the image appears`,
  mouseout_message: `Please keep your mouse<br>in the browser window`,
  extensions: [
    { type: jsPsychExtensionMouseTracking }
  ]
  /*on_load: function(trial) {
    load_time = performance.now()
    window.addEventListener("mousemove", function ({ clientX: x, clientY: y }) { 
      event_t = performance.now()
      console.log(`move: ${event_t}, load: ${load_time}`); // okay so one hack would be  to check if the out is occuring outside of the bounds of the screen. that's not ideal though
    });*/
  /*
  trial.stimulus = 'Let us see if this works'; // this will change what stimulus is displayed in the trial
  window.addEventListener("mousemove", function ({ clientX: x, clientY: y }) { // okay so mouseout works, but mouseleave doesn't. For reasons that probably make sense
    //mouse out though triggers whenever I leave any element
    console.log(`Moved! x:${x}, y:${y}`); */
  // });
  //}
};




const button_test = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `stim_temp`,
  choices: ['button 1', 'button 2'],
  button_html: ['<button class="jspsych-btn mt-response-btn" style = "position:absolute; left: 0px; top: 0px">%choice%</button>', '<button class="jspsych-btn mt-response-btn" style = "position:absolute; right:0px; top: 0px">%choice%</button>'],
  extensions: [
    { type: jsPsychExtensionMouseTracking }
  ]
  /*on_start: function(trial) {
    // temp = jsPsych.getDisplayElement()
    window.addEventListener("mouseleave", function ({ clientX: x, clientY: y }) { // okay so mouseout works, but mouseleave doesn't. For reasons that probably make sense
      //mouse out though triggers whenever I leave any element
      console.log(`left! x:${x}, y:${y}`); 
    });
    window.addEventListener("mouseout", function ({ clientX: x, clientY: y }) { // okay so mouseout works, but mouseleave doesn't. For reasons that probably make sense
      //mouse out though triggers whenever I leave any element
      console.log(`Out! x:${x}, y:${y}`); // okay so one hack would be  to check if the out is occuring outside of the bounds of the screen. that's not ideal though
    });
    /*
    trial.stimulus = 'Let us see if this works'; // this will change what stimulus is displayed in the trial
    window.addEventListener("mousemove", function ({ clientX: x, clientY: y }) { // okay so mouseout works, but mouseleave doesn't. For reasons that probably make sense
      //mouse out though triggers whenever I leave any element
      console.log(`Moved! x:${x}, y:${y}`); */
  // });
  // } 
};

const start_screen = {
  type: jsPsychHtmlButtonResponsePES,
  stimulus: ``,
  choices: ['START'],
  button_html: '<button class="jspsych-btn" style = "position:absolute; bottom: 0px; left: 50%">%choice%</button>',
};



/*
function createBoundedRectangle() {
  var canvas = document.createElement("canvas");
  canvas.className = "canvas";
  canvas.width = 400;
  canvas.height = 300;

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(50, 50, 300, 200); // Adjust the coordinates and size as needed
  return canvas;
}

var displayRectangleTrial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: function() {
    var canvas = createBoundedRectangle();
    return canvas.outerHTML;
  },
  choices: 32 // Prevent keyboard input
};

timeline.push(displayRectangleTrial);
*/
timeline.push(start_screen)
timeline.push(stim_change_test)
// timeline.push(start_screen)
// timeline.push(button_test)
// timeline.push(start_screen)
// timeline.push(button_test)

/*
const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <p>In this experiment, a circle will appear in the center 
      of the screen.</p><p>If the circle is <strong>blue</strong>, 
      press the letter F on the keyboard as fast as you can.</p>
      <p>If the circle is <strong>orange</strong>, press the letter J 
      as fast as you can.</p>
      <div style='width: 700px;'>
      <div style='float: left;'><img src='img/blue.png'></img>
      <p class='small'><strong>Press the F key</strong></p></div>
      <div style='float: right;'><img src='img/orange.png'></img>
      <p class='small'><strong>Press the J key</strong></p></div>
      </div>
      <p>Press any key to begin.</p>
    `,
    post_trial_gap: 2000
  };
  
  timeline.push(instructions);

var test_stimuli = [
    { stimulus: "img/blue.png", correct_response: 'f'},
    { stimulus: "img/orange.png", correct_response: 'j'}
  ];
  


  var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: function(){
      return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
    },
    data: {
      task: 'fixation'
    }
  }
  
  
var test = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    data: {
      task: 'response',
      correct_response: jsPsych.timelineVariable('correct_response')
    },
    on_finish: function(data){
      data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    }
  }
  
var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 5
  };
  


timeline.push(test_procedure);

var debrief_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {

    var trials = jsPsych.data.get().filter({task: 'response'});
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(correct_trials.select('rt').mean());

    return `<p>You responded correctly on ${accuracy}% of the trials.</p>
      <p>Your average response time was ${rt}ms.</p>
      <p>Press any key to complete the experiment. Thank you!</p>`;

  }
};
timeline.push(debrief_block);
*/
jsPsych.run(timeline);
