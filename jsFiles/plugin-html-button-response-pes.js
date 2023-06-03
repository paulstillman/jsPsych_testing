var jsPsychHtmlButtonResponsePES = (function (jspsych) {
    'use strict';

    const info = {
        name: "html-button-response",
        parameters: {
            /** The HTML string to be displayed */
            stimulus: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Stimulus",
                default: undefined,
            },
            /** Array containing the label(s) for the button(s). */
            choices: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Choices",
                default: undefined,
                array: true,
            },
            /** The HTML for creating button. Can create own style. Use the "%choice%" string to indicate where the label from the choices parameter should be inserted. */
            button_html: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Button HTML",
                default: '<button class="jspsych-btn">%choice%</button>',
                array: true,
            },
            /** Any content here will be displayed under the button(s). */
            prompt: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt",
                default: null,
            },
            /** How long to show the stimulus. */
            stimulus_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Stimulus duration",
                default: null,
            },
            /** How long to show the trial. */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            /** The vertical margin of the button. */
            margin_vertical: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Margin vertical",
                default: "0px",
            },
            /** The horizontal margin of the button. */
            margin_horizontal: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Margin horizontal",
                default: "8px",
            },
            /** If true, then trial will end when user responds. */
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
            slowmouse_message: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Message on slow start",
                default: null
            },
            mouseout_message: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Message on out",
                default: null
            },
            adjust_aspect_ratio: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Adjust aspect ratio",
                default: 0
            },
        },
    };
    /**
     * html-button-response
     * jsPsych plugin for displaying a stimulus and getting a button response
     * @author Josh de Leeuw
     * @see {@link https://www.jspsych.org/plugins/jspsych-html-button-response/ html-button-response plugin documentation on jspsych.org}
     */
    class HtmlButtonResponsePluginPES {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            // console.log(display_element) 
            let html = '';    
            if (trial.mouseout_message !== null) {
                html += '<div class="mouseout-warning-msg" id="mouseout_message">' + trial.mouseout_message + "</div>";
            } 
            if (trial.mouseout_message !== null) {
                html += '<div class="mousemove-warning-msg" id="mouseslow_message">' + trial.slowmouse_message + "</div>";
            } 

            // display stimulus
            html += '<div id="jspsych-html-button-response-stimulus">' + trial.stimulus + "</div>";
            //display buttons
            var buttons = [];
            if (Array.isArray(trial.button_html)) {
                if (trial.button_html.length == trial.choices.length) {
                    buttons = trial.button_html;
                }
                else {
                    console.error("Error in html-button-response plugin. The length of the button_html array does not equal the length of the choices array");
                }
            }
            else {
                for (var i = 0; i < trial.choices.length; i++) {
                    buttons.push(trial.button_html);
                }
            }
            html += '<div id="jspsych-html-button-response-btngroup">';



            for (var i = 0; i < trial.choices.length; i++) {
                var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
                html +=
                    '<div class="jspsych-html-button-response-button" style="display: inline-block; margin:' +
                    trial.margin_vertical +
                    " " +
                    trial.margin_horizontal +
                    '" id="jspsych-html-button-response-button-' +
                    i +
                    '" data-choice="' +
                    i +
                    '">' +
                    str +
                    "</div>";
            }
            html += "</div>";
            //show prompt if there is one
            if (trial.prompt !== null) {
                html += trial.prompt;
            }

            // add warning messages if using:
            


            display_element.innerHTML = html;
            // start time

            if (trial.adjust_aspect_ratio !== 0) {
                // height calculation
                // want the width of the buttons to be in 4:3 aspect ratio. y = 1.5, x = 2
                // responses: width = .3, height = .2
                
                var window_height = window.innerHeight
                var window_width = window.innerWidth
                // (god I hate this stuff)
                // (4/3) = (w/h) ==> 4h = 3w ==> w = (4/3)*h
                // need to take that height and convert to 1.5: h / x = 1.5 ==> h/1.5
                var desired_width = window_height * adjust_aspect_ratio
                console.log(`Width: ${window_width}, Height: ${window_height}, Desired Width: ${desired_width}`)
                
                // so now we have response box width and height, all we still need are the starting points to place the responses
                // height is easy: top. width is trickier. For the left option:
                // extra_width = (total_width - grand_width) / 2
                // so the left button starts at extra_width, 0 
                var extra_width = (window_width - desired_width) / 2 // I believe this is just the offset we're looking for (absolute)

                var resp_width = desired_width*.15
                var resp_height = window_height * (.2 / 1.5)
                
                document.getElementById('left_response').style.left = extra_width + "px"
                document.getElementById('right_response').style.right = extra_width + "px"

                document.getElementById('left_response').style.width = resp_width + "px"
                document.getElementById('right_response').style.width = resp_width + "px"
                document.getElementById('left_response').style.height = resp_height + "px"
                document.getElementById('right_response').style.height = resp_height + "px"
            }




            // display_element.getElementById('jspsych-html-button-response-stimulus').innerHTML = 'changedtothis'


            // add event listeners to buttons
            var start_time = performance.now();

            let final_x;
            let final_y;

            for (var i = 0; i < trial.choices.length; i++) {
                display_element
                    .querySelector("#jspsych-html-button-response-button-" + i)
                    .addEventListener("click", (e) => {
                        var btn_el = e.currentTarget;
                        var choice = btn_el.getAttribute("data-choice"); // don't use dataset for jsdom compatibility
                        final_x = e.clientX;
                        final_y = e.clientY;
                        after_response(choice);
                    });
            }
            // store response
            var response = {
                rt: null,
                button: null,
            };

            let mouse_left_flag = 0;
            let init_slow_flag = 0;

            var disp_el = document.getElementsByClassName("jspsych-display-element")[0];
            const mouseLeaveEventHandler = ({ clientX: x, clientY: y }) => {
                document.getElementById("mouseout_message").style.visibility = 'visible';
                disp_el.removeEventListener("mouseleave", mouseLeaveEventHandler)
                mouse_left_flag = 1;
            }

            if (trial.mouseout_message !== null) {
                disp_el.addEventListener("mouseleave", mouseLeaveEventHandler);
            } 
            
            const trial_start_time = performance.now();
            const mouseSlowEventHandler = ({ clientX: x, clientY: y }) => {
                const t_movement = performance.now() - trial_start_time; // how fast was the first movement
                if (t_movement > 500) {
                    document.getElementById("mouseslow_message").style.visibility = 'visible';
                    init_slow_flag = 1;
                }
                window.removeEventListener("mousemove", mouseSlowEventHandler);
            }

            if (trial.slowmouse_message !== null) {
                // This is important! It's for the later mouse listener (need to clean this all up)
                window.addEventListener("mousemove", mouseSlowEventHandler);
            }



            // function to end trial when it is time
            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();
                // gather the data to store for the trial
                var trial_data = {
                    rt: response.rt,
                    stimulus: trial.stimulus,
                    response: response.button,
                    final_x: final_x,
                    finaly_y: final_y,
                    mouse_left_flag: mouse_left_flag,
                    init_slow_flag: init_slow_flag
                };
                if (trial.choices.length === 2) {
                    trial_data.left_resp = trial.choices[0];
                    trial_data.right_resp = trial.choices[1];
                    trial_data.resp_txt = trial.choices[response.button];
                }
                disp_el.removeEventListener("mouseleave", mouseLeaveEventHandler)
                window.removeEventListener("mousemove", mouseSlowEventHandler);
                // clear the display
                display_element.innerHTML = "";
                // move on to the next trial
                this.jsPsych.finishTrial(trial_data);
            };
            // function to handle responses by the subject
            function after_response(choice) {
                // measure rt
                var end_time = performance.now();
                var rt = Math.round(end_time - start_time);
                response.button = parseInt(choice);
                response.rt = rt;
                // after a valid response, the stimulus will have the CSS class 'responded'
                // which can be used to provide visual feedback that a response was recorded
                display_element.querySelector("#jspsych-html-button-response-stimulus").className +=
                    " responded";
                // disable all the buttons after a response
                var btns = document.querySelectorAll(".jspsych-html-button-response-button button");
                for (var i = 0; i < btns.length; i++) {
                    //btns[i].removeEventListener('click');
                    btns[i].setAttribute("disabled", "disabled");
                }
                if (trial.response_ends_trial) {
                    end_trial();
                }
            }
            // hide image if timing is set
            if (trial.stimulus_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    display_element.querySelector("#jspsych-html-button-response-stimulus").style.visibility = "hidden";
                }, trial.stimulus_duration);
            }


            // end trial if time limit is set
            if (trial.trial_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
            }
        }
        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode == "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode == "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }
        create_simulation_data(trial, simulation_options) {
            const default_data = {
                stimulus: trial.stimulus,
                rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
                response: this.jsPsych.randomization.randomInt(0, trial.choices.length - 1),
            };
            const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
            this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }
        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }
        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            if (data.rt !== null) {
                this.jsPsych.pluginAPI.clickTarget(display_element.querySelector(`div[data-choice="${data.response}"] button`), data.rt);
            }
        }
    }
    HtmlButtonResponsePluginPES.info = info;

    return HtmlButtonResponsePluginPES;

})(jsPsychModule);
