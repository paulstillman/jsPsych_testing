const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
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
  adjust_aspect_ratio: 0,
  button_html: ['<button class="jspsych-btn mt-response-btn" id="left_response" style = "position:absolute; left: 0px; top: 0px">%choice%</button>', '<button class="jspsych-btn mt-response-btn" id="right_response" style = "position:absolute; right:0px; top: 0px">%choice%</button>'],
  slowmouse_message: `Please begin moving your mouse<br>as soon as the image appears`,
  mouseout_message: `Please keep your mouse<br>in the browser window`,
  data: {
    task: 'MT'
  },
  extensions: [
    { type: jsPsychExtensionMouseTracking }
  ]
};


const start_screen = {
  type: jsPsychHtmlButtonResponsePES,
  stimulus: ``,
  choices: ['START'],
  data: {
    task: 'start'
  },
  button_html: '<button class="jspsych-btn" style = "position:absolute; bottom: 0px; left: 50%; transform:translate(-50%); font-weight: bold">%choice%</button>',
};


timeline.push(start_screen)
timeline.push(stim_change_test)
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
