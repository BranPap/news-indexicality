function evaluate_response(data) {
    if (data.response == '0' & data.correct == 'NEW') {
        data.result = "correct_rejection"
    } else if (data.response == 'k' & data.correct == 'NEW') {
        data.result = "false_alarm"
    } else if (data.response == 'd' & data.correct == 'OLD') {
        data.result = "miss"
    } else  {
        data.result = "hit"
    }
}

function record_response(data, ChoiceArray) {
    if (data.response == "0") {
        data.result = data.ChoiceArray[0]
    } else if (data.response == "1") {
        data.result = data.ChoiceArray[1]
    } else if (data.response == "2") {
        data.result = data.ChoiceArray[2]
    }
}