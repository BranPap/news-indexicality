// Preliminary Calls //

const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()});
        // jsPsych.data.displayData('csv');
    }
});

let timeline = [];

// IRB FORM //

const irb = {
    // Which plugin to use
    type: jsPsychHtmlButtonResponse,
    // What should be displayed on the screen
    stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
    // What should the button(s) say
    choices: ['Continue'],
    on_finish: function(data) {
        data.category = "irb"
    }
};

timeline.push(irb)

// INSTRUCTIONS //

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "In this experiment, you will read a series of short headlines from a variety of American news sources. You will then be asked to indicate whether you believe the headlines come from MSNBC, Fox News, or NPR. Please try and answer as honestly as possible; if you are unsure about the origin of the publication, that is okay. Pick the source that you find <em>most appropriate</em>.<br><br>When you're ready to begin, press the space bar.<br><br><strong>Content Warning: This experiment contains discussions some participants may find distressing. These include, but are not limited to: natural disasters, violence and death, and discrimination. You may close the window at any time.",
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions"
    }
};
timeline.push(instructions);

// TRIALS //

/// Define Trial Data ///

let stimuli = create_tv_array(stimuliArray)
// console.log("stiuli.unmodded.length "+stimuli.length)
// console.log("stimuli: "+stimuli[15].data.text)

final_array = check_dupes(stimuli)
// console.log("stimuli.modded.length: "+final_array.length)

let choiceArray = shuffleArray(['MSNBC','NPR','Fox News'])


const trials = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            prompt: "Please select the news source you believe the headline comes from",
            choices: choiceArray,
            margin_vertical: '50px',
            stimulus: jsPsych.timelineVariable('text'),
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + final_array.length));
                record_response(data, choiceArray)
                data.category = "trials"
            }
        }
    ],
    timeline_variables: final_array,
    randomize_order: true
}
timeline.push(trials)

// MEDIA QUESTIONS //

const mediaQuestions = {
    type: jsPsychSurveyLikert,
    on_finish: function(data) {
        data.category = "media";
        jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + final_array.length));
    },
    preamble: "Please answer the following questions about your media consumption practices and political preferences. All questions are optional.",
    questions: [
        {
            prompt: "How would you describe your political identity? If you wish to specify, you can do so in the 'comments' section on the following page.",
            labels: [
                "Strong Democrat",
                "Moderate Democrat",
                "Moderate",
                "Moderate Republican",
                "Strong Republican"
            ]
        },
        {
            prompt: "How often do you consume Fox News?",
            labels: [
                "Never",
                "Rarely",
                "Sometimes",
                "Often",
                "Daily"
            ]
        },
        {
            prompt: "How often do you consume MSNBC?",
            labels: [
                "Never",
                "Rarely",
                "Sometimes",
                "Often",
                "Daily"
            ]
        },
        {
            prompt: "How often do you consume NPR?",
            labels: [
                "Never",
                "Rarely",
                "Sometimes",
                "Often",
                "Daily"
            ]
        },
    ]
}
timeline.push(mediaQuestions)

// QUESTIONNAIRE //

const questionnaire = {
    type: jsPsychSurvey,
    title: "Please answer the following optional questions. If you would like to elaborate on any of your answers, you may do so in the comment box.",
    pages: [
        [
            // {
            //     type: 'html',
            //     prompt: "Please answer the following questions:"
            // },
            {
                type: 'multi-choice',
                prompt: 'Did you read the instructions and do you think you did the task correctly?', 
                name: 'correct', 
                options: ['Yes', 'No', 'I was confused']
            },
            {
                type: 'multi-choice',
                prompt: 'How would you describe your political beliefs?', 
                name: 'political', 
                options: ['Progressive', 'Moderate','Conservative', 'Independent']
            },
            {
                type: 'drop-down',
                prompt: 'Gender:',
                name: 'gender',
                options: ['Female', 'Male', 'Non-binary/Non-conforming', 'Other']
            },
            {
                type: 'multi-choice',
                prompt: "Do you identify as transgender or non-binary?",
                name: 'transgender',
                options: ['Yes', 'No', 'Decline to state']
            },
            {
                type: 'multi-choice',
                prompt: "Do you identify as part of the LGBT+ community?",
                name: 'lgbt',
                options: ['Yes', 'No', 'Decline to state']
            },
            {
                type: 'text',
                prompt: 'Age:',
                name: 'age',
                textbox_columns: 10
            },
            {
                type: 'drop-down',
                prompt: 'Level of education:',
                name: 'education',
                options: ['Some high school', 'Graduated high school', 'Some college', 'Graduated college', 'Hold a higher degree']
            },
            {
                type: 'drop-down',
                prompt: 'Do you think the payment was fair?',
                name: 'payment',
                options: ['The payment was too low', 'The payment was fair']
            },
            {
                type: 'drop-down',
                prompt: 'Did you enjoy the experiment?',
                name: 'enjoy',
                options: ['Worse than the average experiment', 'An average experiment', 'Better than the average experiment']
            },
            {
                type: 'text',
                prompt: "Do you have any other comments about this experiment?",
                name: 'comments',
                textbox_columns: 30,
                textbox_rows: 4
            }
        ]
    ],
    on_finish: function(data) {
        data.category = "demographics"
    }
};
timeline.push(questionnaire)

// THANKS //

const thanks = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Continue'],
    stimulus: "Thank you for your time! Please click 'Continue' and then wait a moment until you're directed back to Prolific.<br><br>",
    on_finish: function(data) {
        data.category = "thanks"
    }
}
timeline.push(thanks)

// FINAL FUNCTION CALL //

jsPsych.run(timeline)