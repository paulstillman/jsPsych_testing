const jsPsych = initJsPsych();

let timeline = [];

const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to begin."
  };


timeline.push(welcome);

jsPsych.run(timeline);