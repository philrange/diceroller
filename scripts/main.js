
var anyRules = [];
var startingDelay = 250;
var successes = 0;
var rerolls = 0;


function go() {

	console.log("roll");
	clearResults();

	debug = $('#debug');

	numberOfDice = $('#numberOfDice').val();
	neededForSuccess = $('#successOn').val();
	canReroll = $('#canReroll').val();
	if (canReroll < 0) {
		canReroll = neededForSuccess - 1;
	}

	rolledDiceOutput = $('#rolledDice');

	delay = 0;	

    for (i = 0; i < numberOfDice; i++) {
    	    
    	delay = delay + getDelay(i);
	    console.log("delay " + delay);

    	setTimeout(function() {
    		diceResult = rollDice(6, neededForSuccess, canReroll);
			rolledDiceOutput.append(diceResult.getHtml());
			console.log(diceResult);
			if (diceResult.success) {
				successes++;
			}			
			if (diceResult.rerollable) {
				rerolls++;
			}

			updateTotalsDisplay();

		}, delay);
	}
}

function reroll() {
	console.log("reroll");

	neededForSuccess = $('#successOn').val();
	rerolledDiceOutput = $('#rerolledDice');

  	delay = 0;

	    for (i = 0; i < rerolls; i++) {

	    delay = delay + getDelay(i);
	    console.log("delay " + delay);
    	
    	setTimeout(function() {
    		diceResult = rollDice(6, neededForSuccess, false);
			rerolledDiceOutput.append(diceResult.getHtml());
			// console.log(diceResult);
			if (diceResult.success) {
				successes++;
			}			

			rerolls--;

			updateTotalsDisplay();

		}, delay);
	}
}

function getDelay(n) {
	console.log("hello");
	delay = startingDelay * Math.pow(0.95, n);
	console.log(delay);
	return delay;
}

function clearResults() {

	console.log("clear");

	successes = 0;
	rerolls = 0;
	$('#rolledDice').html("");
	$('#rerolledDice').html("");
	updateTotalsDisplay();
}

function updateTotalsDisplay() {
	$('#successes').text(successes);
	$('#rerolls').text(rerolls);
	if (rerolls > 0) {
		$('#rerollButton').prop("disabled", false);
	} else {
		$('#rerollButton').prop("disabled", true);
	}
}

function DiceResult (score, success, rerollable) {
    this.score = score;
    this.success = success;
    this.rerollable = rerollable;
}
 
DiceResult.prototype.getHtml = function() {

	className = this.success ? " success" : this.rerollable ? " rerollable" : "";
    return "<span class='dice" + className + "'>" + this.score + "</span> ";
};


function rollDice(sides, neededForSuccess, canReroll) {
	result = Math.floor(Math.random() * sides) + 1;
	success = result >= neededForSuccess;
	canReroll = !success && result <= canReroll;
	return new DiceResult(result, success, canReroll);
}

function about() {
    $('#aboutModal').modal("show");
}



function toggleRule(phase, id, enabled) {
    eval(phase.toLowerCase() + 'Rules')[id].enabled = enabled;
}