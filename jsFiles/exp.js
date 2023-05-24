

const exp = (function() {


    var p = {};


   /*
    *
    *   INSTRUCTIONS
    *
    */

    const html = {
        intro: [
            `<div class='parent'>
                <p><strong>Welcome to Spin the Wheel!</strong></p>
                <p>In Spin the Wheel, you'll spin a series of prize wheels.</p>
                <p>Each time you spin a prize wheel, you'll earn points.
                <br>The number of points you earn depends on where the wheel lands.</p>
                <p>Your goal is to earn as many points as possible by spinning the prize wheels!</p>
            </div>`,

            `<div class='parent'>
                <p>To spin a prize wheel, just grab it with your cursor and give it a spin!
                <br>Watch the animation below to see how it's done.</p>
                <img src="./img/spinGif.gif" style="width:60%; height:60%">
            </div>`,

            `<div class='parent'>
                <p>Throughout Spin the Wheel, you'll answer questions about your feelings.</p>
                <p>Specifically, you'll report how <strong>immersed and engaged</strong> you feel while spinning each wheel,<br>
                as well as how <strong>happy</strong> you currently feel.</p>
            </div>`,      

            `<div class='parent'>
                <p>You're ready to start playing Spin the Wheel!</p>
                <p>Continue to the next screen to begin.</p>
            </div>`,      
        ],

        postTask: [
            `<div class='parent'>
                <p>Spin the Wheel is now complete!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ],
    };

    p.consent = {
        type: jsPsychExternalHtml,
        url: "./html/consent.html",
        cont_btn: "advance",
    };

    p.intro = {
        type: jsPsychInstructions,
        pages: html.intro,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    
   /*
    *
    *   TASK
    *
    */


    // define each wedge
    const wedges = {
        one: {color:"#fe0000", label:"1"},
        two: {color:"#800001", label:"2"},
        three: {color:"#fe6a00", label:"3"},
        four: {color:"#803400", label:"4"},
        five: {color:"#ffd800", label:"5"},
        six: {color:"#806b00", label:"6"},
        seven: {color:"#00fe21", label:"7"},
        eight: {color:"#007f0e", label:"8"},
        nine: {color:"#0094fe", label:"9"},
        ten: {color:"#00497e", label:"10"},
        eleven: {color:"#0026ff", label:"11"},
        twelve: {color:"#001280", label:"12"},
        thirteen: {color:"#b100fe", label:"13"},
    };


    // define each wheel
    const wheels = [

        /*  1 1 1 1
            3 4 5 6    ev = 4.5; v = 1.67
            7 8 9 10   ev = 8.5; v = 1.67
            1 3 6 8    ev = 4.5; v = 9.67
            5 7 10 12  ev = 8.5; v = 9.67
        */
            {sectors: [ wedges.three, wedges.four, wedges.five, wedges.six ], ev: 4.5, var: 1.67, arrangement: 1111},
            {sectors: [ wedges.seven, wedges.eight, wedges.nine, wedges.ten ], ev: 8.5, var: 1.67, arrangement: 1111},
            {sectors: [ wedges.one, wedges.three, wedges.six, wedges.eight ], ev: 4.5, var: 9.67, arrangement: 1111},
            {sectors: [ wedges.five, wedges.seven, wedges.ten, wedges.twelve ], ev: 8.5, var: 9.67, arrangement: 1111},

        /*  2 1 1 
            3 3 5 7     ev = 4.5; v = 2.25
            7 7 9 11    ev = 8.5; v = 2.25
            2 2 6 8     ev = 4.5; v = 9
            6 6 10 12    ev = 8.5; v = 9
        */
            {sectors: [ wedges.three, wedges.three, wedges.five, wedges.seven ], ev: 4.5, var: 3.67, arrangement: 211},
            {sectors: [ wedges.seven, wedges.seven, wedges.nine, wedges.eleven ], ev: 8.5, var: 3.67, arrangement: 211},
            {sectors: [ wedges.two, wedges.two, wedges.six, wedges.eight ], ev: 4.5, var: 9, arrangement: 211},
            {sectors: [ wedges.six, wedges.six, wedges.ten, wedges.twelve ], ev: 8.5, var: 9, arrangement: 211},

        /*  2 2
            3 3 6 6    ev = 4.5; v = 3
            7 7 10 10  ev = 8.5; v = 3
            2 2 7 7    ev = 4.5; v = 8.33
            6 6 11 11  ev = 4.5; v = 8.33
        */
            {sectors: [ wedges.three, wedges.three, wedges.six, wedges.six ], ev: 4.5, var: 3, arrangement: 22},
            {sectors: [ wedges.seven, wedges.seven, wedges.ten, wedges.ten ], ev: 8.5, var: 3, arrangement: 22},
            {sectors: [ wedges.two, wedges.two, wedges.seven, wedges.seven ], ev: 4.5, var: 8.33, arrangement: 22},
            {sectors: [ wedges.six, wedges.six, wedges.eleven, wedges.eleven ], ev: 8.5, var: 8.33, arrangement: 22},

        /*  3 1
            4 4 4 6    ev = 4.5; v = 1
            8 8 8 10   ev = 8.5; v = 1
            3 3 3 9    ev = 4.5; v = 9
            7 7 7 13   ev = 8.5; v = 9
        */
            {sectors: [ wedges.four, wedges.four, wedges.four, wedges.six ], ev: 4.5, var: 1, arrangement: 31},
            {sectors: [ wedges.eight, wedges.eight, wedges.eight, wedges.ten ], ev: 8.5, var: 1, arrangement: 31},
            {sectors: [ wedges.three, wedges.three, wedges.three, wedges.nine ], ev: 4.5, var: 9, arrangement: 31},
            {sectors: [ wedges.seven, wedges.seven, wedges.seven, wedges.thirteen ], ev: 8.5, var: 9, arrangement: 31},

        /*  4
            5 5 5 5 5   ev = 5; v = 0
            9 9 9 9 9   ev = 9; v = 0
        */
            {sectors: [ wedges.four, wedges.four, wedges.four, wedges.four ], ev: 4, var: 0, arrangement: 4},
            {sectors: [ wedges.nine, wedges.nine, wedges.nine, wedges.nine ], ev: 9, var: 0, arrangement: 4},
        ];

    let scoreTracker = 0; // track current score

    let round = 1;  // track current round

    // trial: spinner
    const spin = {
        type: jsPsychCanvasButtonResponse,
        stimulus: function(c, spinnerData) {
            createSpinner(c, spinnerData, scoreTracker, jsPsych.timelineVariable('sectors'));
        },
        canvas_size: [500, 500],
        score: function() {
            return scoreTracker
        },
        post_trial_gap: 1000,
        data: {ev: jsPsych.timelineVariable('ev'), var: jsPsych.timelineVariable('var'), arrangement: jsPsych.timelineVariable('arrangement')},
        on_finish: function(data) {
            data.round = round;
            scoreTracker = data.score
        }
    };

    // trial: flow DV
    const flowMeasure = {
        type: jsPsychSurveyLikert,
        questions: [
            {prompt: `During the last round of Spin the Wheel,<br>to what extent did you feel immersed and engaged in what you were doing?`,
            name: `flow`,
            labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
        ],
        randomize_question_order: false,
        scale_width: 600,
        data: {ev: jsPsych.timelineVariable('ev'), var: jsPsych.timelineVariable('var'), arrangement: jsPsych.timelineVariable('arrangement')},
        on_finish: function(data) {
            data.round = round;
            let scoreArray = jsPsych.data.get().select('score').values;
            let outcomesArray = jsPsych.data.get().select('outcomes').values;
            data.score = scoreArray[scoreArray.length - 1];
            data.outcomes = outcomesArray[outcomesArray.length - 1];
            saveSurveyData(data);
        }
    };

    // trial: happiness DV
    const happinessMeasure = {
        type: jsPsychSurveyLikert,
        questions: [
            {prompt: `How happy are you right now?`,
            name: `happiness`,
            labels: ['0<br>Very unhappy', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Very happy']},
        ],
        randomize_question_order: false,
        scale_width: 600,
        data: {ev: jsPsych.timelineVariable('ev'), var: jsPsych.timelineVariable('var'), arrangement: jsPsych.timelineVariable('arrangement')},
        on_finish: function(data) {
            data.round = round;
            let scoreArray = jsPsych.data.get().select('score').values;
            let outcomesArray = jsPsych.data.get().select('outcomes').values;
            data.score = scoreArray[scoreArray.length - 2];
            data.outcomes = outcomesArray[outcomesArray.length - 2];
            saveSurveyData(data);
            round++;
        }
    };

    // timeline: main task
    p.task = {
        timeline: [spin, flowMeasure, happinessMeasure],
        repetitions: 1,
        timeline_variables: wheels,
        randomize_order: true,
    };

   /*
    *
    *   Demographics
    *
    */

    p.demographics = (function() {


        const taskComplete = {
            type: jsPsychInstructions,
            pages: html.postTask,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const gender = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your gender?</p>',
            choices: ['Male', 'Female', 'Other'],
            on_finish: (data) => {
                data.gender = data.response;
            }
        };

        const age = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Age:", name: "age"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const ethnicity = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your race?</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
            on_finish: (data) => {
                data.ethnicity = data.response;
            }
        };

        const english = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
            on_finish: (data) => {
                data.english = data.response;
            }
        };  

        const finalWord = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Questions? Comments? Complains? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [taskComplete, gender, age, ethnicity, english, finalWord]
        };

        return demos;

    }());


   /*
    *
    *   SAVE DATA
    *
    */

    p.save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "WL2m4UnXKCIJ",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [exp.consent, exp.intro, exp.task, exp.demographics, exp.save_data];

jsPsych.run(timeline);
