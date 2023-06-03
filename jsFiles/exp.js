          
const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
    // console.log(jsPsych.data.get().csv());
  },
  extensions: [
    { type: jsPsychExtensionMouseTracking, params: { minimum_sample_time: 0, events: ['mousemove', 'mouseleave'] } }
  ]
});


let sub_id = jsPsych.data.getURLVariable('workerId');
if (sub_id === undefined) {
  sub_id = jsPsych.randomization.randomID(10);
}
jsPsych.data.addProperties({subject_id: sub_id});
const fname = `${sub_id}.csv`;
console.log(fname)
let timeline = [];

var preload = {
  type: jsPsychPreload,
  images: ['./img/Wall-e.png', 
  './img/Taylor.png',
  './img/Spongebob.png',
  './img/Sandy.png',
  './img/R2D2.png',
  './img/Mickey.png',
  './img/luigi.png',
  './img/Lisa.png',
  './img/C3P-0.png',
  './img/Bugs.png',
  './img/Baxter_nf.png',
  './img/Bart.png'
]
};



timeline.push(preload)

var competent_right = Math.floor(Math.random()*2);
let choices_competent;
let choices_knowledgeable;
let choices_capable;
let choices_reliable;
if (competent_right === 1) {
  choices_competent = ['Mostly<br>Incompetent', 'Mostly<br>Competent'];
  choices_knowledgeable = ['Mostly<br>Unknowledgeable', 'Mostly<br>Knowledgeable'];
  choices_capable = ['Mostly<br>Incapable', 'Mostly<br>Capable'];
  choices_reliable = ['Mostly<br>Unreliable', 'Mostly<br>Reliable'];
} else {
  choices_competent = ['Mostly<br>Competent', 'Mostly<br>Incompetent'];
  choices_knowledgeable = ['Mostly<br>Knowledgeable', 'Mostly<br>Unknowledgeable'];
  choices_capable = ['Mostly<br>Capable', 'Mostly<br>Incapable'];
  choices_reliable = ['Mostly<br>Reliable', 'Mostly<br>Unreliable'];
}


var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: "You will now enter full screen"
}

timeline.push(enter_fullscreen)
/*
const target_list = [
  {stimulus: 'Wall-e'},
  {stimulus: 'Taylor'},
  {stimulus: 'Spongebob'},
  {stimulus: 'Sandy'},
  {stimulus: 'R2D2'},
  {stimulus: 'Mickey'},
  {stimulus: 'luigi'},
  {stimulus: 'Lisa'},
  {stimulus: 'C3P-0'},
  {stimulus: 'Bugs'},
  {stimulus: 'Baxter_nf'},
  {stimulus: 'Bart'}]; */

  const target_list = [
    {stimulus: '<img src="./img/Wall-e.png">'},
    {stimulus: '<img src="./img/Taylor.png">'},
    {stimulus: '<img src="./img/Spongebob.png">'},
    {stimulus: '<img src="./img/Sandy.png">'},
    {stimulus: '<img src="./img/R2D2.png">'},
    {stimulus: '<img src="./img/Mickey.png">'},
    {stimulus: '<img src="./img/luigi.png">'},
    {stimulus: '<img src="./img/Lisa.png">'},
    {stimulus: '<img src="./img/C3P-0.png">'},
    {stimulus: '<img src="./img/Bugs.png">'},
    {stimulus: '<img src="./img/Baxter_nf.png">'},
    {stimulus: '<img src="./img/Bart.png">'}];
  

const mt_trial_competent = {
  type: jsPsychHtmlButtonResponsePES,
  // stimulus: '<img src="./img/' + jsPsych.timelineVariable('stimulus') + '.png">',
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: choices_competent,
  adjust_aspect_ratio: 0,
  button_html: ['<button class="jspsych-btn mt-response-btn" id="left_response" style = "position:absolute; left: 0px; top: 0px">%choice%</button>', '<button class="jspsych-btn mt-response-btn" id="right_response" style = "position:absolute; right:0px; top: 0px">%choice%</button>'],
  slowmouse_message: `Please begin moving your mouse<br>as soon as the image appears`,
  mouseout_message: `Please keep your mouse<br>in the browser window`,
  data: {
    task: 'MT',
    competent_right: competent_right
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

var test_procedure = {
  timeline: [start_screen, mt_trial_competent],
  timeline_variables: target_list
}

timeline.push(test_procedure)

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

var leave_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  message: "You will now leave full screen"
}

timeline.push(leave_fullscreen)


const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: "v2ui0QxWeayJ",
  filename: fname,
  data_string: ()=>jsPsych.data.get().csv()
};
timeline.push(save_data);


jsPsych.run(timeline);

// console.log(jsPsych.data.get().csv());

