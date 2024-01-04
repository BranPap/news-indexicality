// Preliminary Functions //

// Define Function Using the Fisher-Yates (Knuth) Shuffle Algorithm to randomize stimulus selection //
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

// Defining the critical item options //

const GenderOption =["m","f"]
shuffleArray(GenderOption)

const GenderSelection = GenderOption.pop()

if (GenderSelection == "f") {
    var CriticalTermOptions = ["Transgender woman", "Trans woman", "Biological male"]
    var GenderMod = "women's"
} else if (GenderSelection == "m") {
    var CriticalTermOptions = ["Transgender man", "Trans man", "Biological female"]
    var GenderMod = "men's"
}

shuffleArray(CriticalTermOptions) // Shuffle the items
const CriticalTerm = CriticalTermOptions.pop() // Select the variable

const jsPsych = initJsPsych({
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()});
    }
});

let timeline = [];
// push experiment logic the timeline here...
// ......

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
    stimulus: "In this experiment, you will read a series of short headlines from American news sources. You will then be asked to indicate whether you believe the headlines come from a politically left-leaning publication, a politically right-leaning publication, or a politically neutral or apolitical news source. Please try and answer as honestly as possible; if you are unsure about the political leaning of the publication, that is okay. Pick the description that you find <em>most appropriate</em>.<br><br>When you're ready to begin, press the space bar.",
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions"
    }
};
timeline.push(instructions);

// TRIALS //

var ChoiceArray = jsPsych.randomization.shuffle(['Progressive News Source', 'Conservative News Source', 'Neutral News Source'])

const trials = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            choices: ChoiceArray,
            stimulus: jsPsych.timelineVariable('stimulus'),
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data) {
                record_response(data),
                data.category = data.category,
                data.condition = GenderSelection
            }
        }
    ],
    timeline_variables: [
        {stimulus: CriticalTerm + ' places first in '+GenderMod+' trivia championship<br><br>', data: {category: "critical", ChoiceArray: ChoiceArray}},
        {stimulus: 'Orange tabby cat named Taters steals the show in first video sent by laser from deep space<br><br>', data: {category: "AP", ChoiceArray: ChoiceArray}},
        {stimulus: 'Extremely rare white alligator at a Florida reptile park<br><br>', data: {category: "AP", ChoiceArray: ChoiceArray}},
        {stimulus: 'Penguin parents sleep for just a few seconds at a time to guard newborns, study shows<br><br>', data: {category: "AP", ChoiceArray: ChoiceArray}},
        {stimulus: 'Taylor Swift busted as woke hypocrite on 5 activist issues: Climate, LGBTQQIAAP2S+, feminism<br><br>', data: {category: "BB", ChoiceArray: ChoiceArray}},
        {stimulus: 'Elon Musk’s ‘Grok’ AI is just as woke as other chatbots<br><br>', data: {category: "BB", ChoiceArray: ChoiceArray}},
        {stimulus: 'Sofia Coppola plays victim: ‘I’m fighting for a tiny fraction’ of male directors’ budgets<br><br>', data: {category: "BB", ChoiceArray: ChoiceArray}},
        {stimulus: 'Sofia Coppola gets real on `fighting for a tiny fraction’ of what male directors get<br><br>', data: {category: "PN", ChoiceArray: ChoiceArray}}, 
        {stimulus: 'Elon Musk unveils `Grok’ AI chatbot as alternative to `woke’ rivals like ChatGPT<br><br>', data: {category: "PN", ChoiceArray: ChoiceArray}},
        {stimulus: 'Megyn Kelly calls for boycott of Taylor Swift after singer attends Gaza relief comedy show<br><br>', data: {category: "PN", ChoiceArray: ChoiceArray}}
    ],
    randomize_order: true
}
timeline.push(trials)
console.log(ChoiceArray)
// QUESTIONNAIRE //

const questionnaire = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'html',
                prompt: "Please answer the following questions:"
            },
            {
                type: 'multi-choice',
                prompt: 'Did you read the instructions and do you think you did the task correctly?', 
                name: 'correct', 
                options: ['Yes', 'No', 'I was confused']
            },
            {
                type: 'drop-down',
                prompt: 'Gender:',
                name: 'gender',
                options: ['Female', 'Male', 'Non-binary/Non-conforming', 'Other']
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
                type: 'text',
                prompt: "Native language(s)? (What was/were the language(s) spoken at home when you were growing up?)",
                name: 'language',
                textbox_columns: 20
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