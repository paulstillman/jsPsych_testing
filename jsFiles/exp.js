const jsPsych = initJsPsych();



let timeline = [];

var preload = {
    type: jsPsychPreload,
    images: ['img/blue.png', 'img/orange.png']
  };
  
timeline.push(preload)

const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to begin."
  };


timeline.push(welcome);

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


  var blue_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'img/blue.png',
    choices: ['f', 'j']
  };
  
  var orange_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'img/orange.png',
    choices: ['f', 'j']
  };
  
timeline.push(blue_trial, orange_trial);

jsPsych.run(timeline);
