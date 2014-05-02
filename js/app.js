window.app = {};
app.coolPlaying = false;

$(document).ready(function () {
	$(document).on('mouseenter', '.ryu', doAction);
	$(document).on('mouseleave', '.ryu', doAction);
	$(document).on('mousedown', '.ryu', doAction);
	$(document).on('mouseup', '.ryu', doAction);
	$(document).on('keydown', doAction);
	$(document).on('keyup', doAction);
});

function doAction(event) {
	var ryuStill = $('.ryu-still'),
		ryuReady = $('.ryu-ready'),
		ryuThrowing = $('.ryu-throwing'),
		ryuCool = $('.ryu-cool');

	switch (event.type) {
	case 'mouseenter':
		if (app.coolPlaying) return false;
		showHide(ryuReady);
		break;
	case 'mouseleave':
		if (app.coolPlaying) return false;
		showHide(ryuStill);
		break;
	case 'mousedown':
		showHide(ryuThrowing);
		playHadouken();
		break;
	case 'mouseup':
		if (app.coolPlaying) showHide(ryuCool);
		else showHide(ryuReady);
		break;
	case 'keydown':
		if (event.keyCode == 88 && !app.coolPlaying) {
			showHide(ryuCool);
			coolJams(true);
		}
		break;
	case 'keyup':
		if (event.keyCode == 88) {
			showHide(ryuStill);
			coolJams(false);
		}
		break;
	}
}

function showHide(toShow) {
	$('.ryu-img').hide();
	toShow.show();
}

function playHadouken() {
	var hadouken = $('#hadouken-sound')[0];

	$('.hadouken')
		.finish()
		.show()
		.animate({
				'margin-left': '500px'
			},
			800,
			function () {
				$(this).hide();
				$(this).css('margin-left', '-10px');
			}
	);

	hadouken.volume = 0.3;
	hadouken.load();
	hadouken.play();
}

function coolJams(play) {
	var smoothJams = $('#smoothJams')[0];
	app.coolPlaying = play;

	if (play) {
		smoothJams.volume = 0.3;
		smoothJams.load();
		smoothJams.play();
	}
	else {
		smoothJams.pause();
	}
}